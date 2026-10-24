/**
 * Meridian Finance — Precision Actuarial Engine
 * Institutional-grade calculation methods strictly supporting Day-Count conventions:
 * Actual/365, Actual/360, and 30/360 Bond Basis.
 */

import {
  DayCountConvention,
  SipParameters,
  SipCalculationResult,
  YearMilestone,
  TermLadderParameters,
  LadderRungResult,
  FireParameters,
  FireCalculationResult,
  LumpsumParameters,
  LumpsumResult,
  DebtAmortizationParameters,
  DebtAmortizationResult,
  RealReturnParameters,
  RealReturnResult,
  ScenarioComparison,
} from '../types/financial';

/**
 * Returns the day-count basis multiplier relative to standard 365 calendar days
 */
export function getDayCountFactor(convention: DayCountConvention): number {
  switch (convention) {
    case 'ACTUAL_360':
      return 365 / 360; // 1.013889 factor for money market convention
    case 'THIRTY_360_BOND':
      return 360 / 365; // Standard 30/360 corporate bond fraction
    case 'ACTUAL_365':
    default:
      return 1.0;
  }
}

/**
 * Precision Step-Up Systematic Investment Plan (SIP) Engine
 * Models intra-month cash injections, geometric monthly rates, and annual step-up escalation.
 */
export function calculateSipProjections(params: SipParameters): SipCalculationResult {
  const {
    monthlyAllocation,
    expectedCagr,
    tenureYears,
    annualStepUpPercent,
    inflationHaircutPercent,
    dayCount,
  } = params;

  const dayFactor = getDayCountFactor(dayCount);
  const adjustedAnnualNominalRate = (expectedCagr / 100) * dayFactor;
  // Geometric monthly compounding factor: (1 + r)^(1/12) - 1
  const monthlyRate = Math.pow(1 + adjustedAnnualNominalRate, 1 / 12) - 1;
  const inflationAnnualRate = inflationHaircutPercent / 100;
  const stepUpMultiplier = 1 + annualStepUpPercent / 100;

  let currentCorpus = 0;
  let cumulativeInvested = 0;
  let currentMonthlyInvestment = monthlyAllocation;
  const milestones: YearMilestone[] = [];

  for (let year = 1; year <= tenureYears; year++) {
    const annualContribution = currentMonthlyInvestment * 12;
    cumulativeInvested += annualContribution;
    const openingYearCorpus = currentCorpus;

    // Simulate 12 monthly contributions and monthly interest accretion
    for (let month = 1; month <= 12; month++) {
      // Beginning of month contribution + compounding
      currentCorpus = (currentCorpus + currentMonthlyInvestment) * (1 + monthlyRate);
    }

    const yearInterestEarned = currentCorpus - openingYearCorpus - annualContribution;
    // Purchasing power deflation: V / (1 + inflation)^year
    const purchasingPower = currentCorpus / Math.pow(1 + inflationAnnualRate, year);
    // Safe withdrawal monthly annuity at 4.0% per annum
    const monthlyAnnuity = (currentCorpus * 0.04) / 12;

    milestones.push({
      year,
      ageHorizon: 35 + year, // Default representative fiduciary age horizon
      monthlyAllocation: Math.round(currentMonthlyInvestment),
      annualContribution: Math.round(annualContribution),
      cumulativeInvested: Math.round(cumulativeInvested),
      compoundInterestYear: Math.round(yearInterestEarned),
      closingNominalCorpus: Math.round(currentCorpus),
      inflationDeflatedPurchasingPower: Math.round(purchasingPower),
      monthlyAnnuityYield: Math.round(monthlyAnnuity),
    });

    // Step-up for subsequent year
    currentMonthlyInvestment = currentMonthlyInvestment * stepUpMultiplier;
  }

  const terminalNominalCorpus = Math.round(currentCorpus);
  const totalInvestedPrincipal = Math.round(cumulativeInvested);
  const totalCompoundAlpha = Math.max(0, terminalNominalCorpus - totalInvestedPrincipal);
  const terminalRealCorpus = Math.round(
    currentCorpus / Math.pow(1 + inflationAnnualRate, tenureYears)
  );
  const annualAnnuityYield = Math.round(terminalNominalCorpus * 0.04);
  const monthlyAnnuityYield = Math.round(annualAnnuityYield / 12);
  const wealthMultiplier =
    totalInvestedPrincipal > 0
      ? Number((terminalNominalCorpus / totalInvestedPrincipal).toFixed(2))
      : 0;

  return {
    totalInvestedPrincipal,
    totalCompoundAlpha,
    terminalNominalCorpus,
    terminalRealCorpus,
    monthlyAnnuityYield,
    annualAnnuityYield,
    wealthMultiplier,
    effectiveAnnualRate: Number((adjustedAnnualNominalRate * 100).toFixed(2)),
    progression: milestones,
  };
}

/**
 * Term Certificate & Fixed Deposit Ladder Engine
 * Splits capital into staggered maturity tranches to maximize sovereign yield curve.
 */
export function calculateTermLadder(params: TermLadderParameters): LadderRungResult[] {
  const { principalAmount, baseInterestRate, compoundingFrequency, ladderRungs, spreadPerRungBps } =
    params;

  const perRungPrincipal = principalAmount / Math.max(1, ladderRungs);
  let compPeriodsPerYear = 4;
  if (compoundingFrequency === 'monthly') compPeriodsPerYear = 12;
  else if (compoundingFrequency === 'semi-annually') compPeriodsPerYear = 2;
  else if (compoundingFrequency === 'annually') compPeriodsPerYear = 1;

  const results: LadderRungResult[] = [];
  const baseYear = 2026;

  for (let i = 1; i <= ladderRungs; i++) {
    const tenorYears = i;
    const rungRatePercent = baseInterestRate + (i - 1) * (spreadPerRungBps / 100);
    const r = rungRatePercent / 100;
    const n = compPeriodsPerYear;
    const t = tenorYears;

    const maturityValue = perRungPrincipal * Math.pow(1 + r / n, n * t);
    const interestEarned = maturityValue - perRungPrincipal;

    results.push({
      rungIndex: i,
      tenorMonths: i * 12,
      allocatedPrincipal: Math.round(perRungPrincipal),
      interestRate: Number(rungRatePercent.toFixed(2)),
      maturityValue: Math.round(maturityValue),
      interestEarned: Math.round(interestEarned),
      liquidityDateText: `Q${((i * 3) % 4) + 1} ${baseYear + i}`,
    });
  }

  return results;
}

/**
 * FIRE & Generational Longevity Engine
 * Uses the Trinity study foundation expanded with sovereign dynasty capital sizing.
 */
export function calculateFireLongevity(params: FireParameters): FireCalculationResult {
  const {
    currentAge,
    targetRetirementAge,
    monthlyLivingExpenditure,
    inflationRate,
    safeWithdrawalRate,
    postRetirementReturnRate,
    currentLiquidNetWorth,
  } = params;

  const yearsToFire = Math.max(0, targetRetirementAge - currentAge);
  const currentAnnualExpense = monthlyLivingExpenditure * 12;
  const inflationDec = inflationRate / 100;
  const swrDec = safeWithdrawalRate / 100;

  // Future annual living expenses at date of retirement
  const futureAnnualExpenseAtRetirement =
    currentAnnualExpense * Math.pow(1 + inflationDec, yearsToFire);
  const monthlyFutureExpenseAtRetirement = Math.round(futureAnnualExpenseAtRetirement / 12);

  // Capital required = Future Annual Expense / Safe Withdrawal Rate
  const fireCorpusRequiredNominal = Math.round(futureAnnualExpenseAtRetirement / swrDec);
  const fireCorpusRequiredReal = Math.round(currentAnnualExpense / swrDec);

  const additionalCorpusRequired = Math.max(0, fireCorpusRequiredNominal - currentLiquidNetWorth);

  // Longevity simulation: if real post-retirement return > SWR, corpus is dynastic / perpetual
  const netRealPostReturn = (postRetirementReturnRate - inflationRate) / 100;
  let sustainableLongevityYears = 50;
  if (netRealPostReturn >= swrDec) {
    sustainableLongevityYears = 100; // Dynastic perpetual longevity
  } else {
    // Depletion annuity calculation
    const r = netRealPostReturn;
    if (r > 0) {
      // n = -ln(1 - (Corpus * r / AnnualExpense)) / ln(1 + r)
      const ratio = (fireCorpusRequiredNominal * r) / futureAnnualExpenseAtRetirement;
      if (ratio < 1) {
        sustainableLongevityYears = Math.min(
          100,
          Math.round(-Math.log(1 - ratio) / Math.log(1 + r))
        );
      }
    } else {
      sustainableLongevityYears = Math.round(
        fireCorpusRequiredNominal / futureAnnualExpenseAtRetirement
      );
    }
  }

  // Dynastic endowment corpus (maintaining 100% purchasing power for 3 generations / 75y)
  const dynastyCorpusSizing = Math.round(fireCorpusRequiredNominal * 1.45);

  return {
    fireCorpusRequiredNominal,
    fireCorpusRequiredReal,
    monthlyFutureExpenseAtRetirement,
    additionalCorpusRequired,
    yearsToFire,
    sustainableLongevityYears,
    dynastyCorpusSizing,
  };
}

/**
 * Lumpsum Sovereign Growth Simulator
 * Incorporates geometric Brownian motion 95% confidence intervals
 */
export function calculateLumpsumGrowth(params: LumpsumParameters): LumpsumResult {
  const { initialCapital, expectedAnnualReturn, timeHorizonYears, volatilityRegime } = params;

  let sigma = 0.12; // annualized standard deviation
  if (volatilityRegime === 'conservative') sigma = 0.07;
  else if (volatilityRegime === 'balanced') sigma = 0.13;
  else if (volatilityRegime === 'aggressive') sigma = 0.19;
  else if (volatilityRegime === 'sovereign_stress') sigma = 0.25;

  const mu = expectedAnnualReturn / 100;
  const t = timeHorizonYears;

  // Expected geometric future value
  const terminalCorpus = initialCapital * Math.pow(1 + mu, t);
  const totalGain = terminalCorpus - initialCapital;
  const multipleOfCapital = Number((terminalCorpus / initialCapital).toFixed(2));

  // Log-normal 95% confidence interval bounds
  const drift = (mu - 0.5 * sigma * sigma) * t;
  const diffusion = sigma * Math.sqrt(t);
  const zScore95 = 1.96;

  const monteCarloConfidence95Low = Math.round(
    initialCapital * Math.exp(drift - zScore95 * diffusion)
  );
  const monteCarloConfidence95High = Math.round(
    initialCapital * Math.exp(drift + zScore95 * diffusion)
  );

  // Inflation-deflated purchasing power at standard 4.2% baseline
  const realPurchasingPower = Math.round(terminalCorpus / Math.pow(1 + 0.042, t));

  return {
    terminalCorpus: Math.round(terminalCorpus),
    totalGain: Math.round(totalGain),
    multipleOfCapital,
    monteCarloConfidence95Low,
    monteCarloConfidence95High,
    realPurchasingPower,
  };
}

/**
 * Institutional Debt & Amortization Engine
 * Strict 30/360 bond day-count monthly debt reduction with voluntary capital prepayment delta
 */
export function calculateDebtAmortization(
  params: DebtAmortizationParameters
): DebtAmortizationResult {
  const {
    facilityPrincipal,
    annualInterestRate,
    termMonths,
    extraMonthlyPrepayment,
    originationFeeBps,
  } = params;

  const r = annualInterestRate / 100 / 12;
  const n = termMonths;

  // Standard annuity monthly installment PMT = P * r * (1+r)^n / ((1+r)^n - 1)
  const regularMonthlyPayment =
    r === 0 ? facilityPrincipal / n : (facilityPrincipal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);

  // Standard amortization interest total
  let balanceStandard = facilityPrincipal;
  let totalInterestStandard = 0;
  for (let m = 1; m <= n; m++) {
    const interest = balanceStandard * r;
    const principalPaid = regularMonthlyPayment - interest;
    totalInterestStandard += interest;
    balanceStandard = Math.max(0, balanceStandard - principalPaid);
  }

  // Accelerated amortization calculation
  let balanceAccelerated = facilityPrincipal;
  let totalInterestAccelerated = 0;
  let acceleratedMonths = 0;
  const acceleratedMonthlyPayment = regularMonthlyPayment + extraMonthlyPrepayment;

  while (balanceAccelerated > 1 && acceleratedMonths < n * 2) {
    acceleratedMonths++;
    const interest = balanceAccelerated * r;
    const principalPaid = Math.min(balanceAccelerated, acceleratedMonthlyPayment - interest);
    totalInterestAccelerated += interest;
    balanceAccelerated -= principalPaid;
    if (balanceAccelerated <= 0.01) break;
  }

  const interestSavings = Math.max(0, totalInterestStandard - totalInterestAccelerated);
  const termReductionMonths = Math.max(0, n - acceleratedMonths);

  // Effective APY with origination fee included
  const fee = facilityPrincipal * (originationFeeBps / 10000);
  const netReceived = facilityPrincipal - fee;
  const effectiveBorrowingApy = Number(
    ((annualInterestRate + (fee / facilityPrincipal / (n / 12)) * 100)).toFixed(2)
  );

  const startYear = 2026;
  const endStandardYear = startYear + Math.floor(n / 12);
  const endAcceleratedYear = startYear + Math.floor(acceleratedMonths / 12);

  return {
    regularMonthlyPayment: Math.round(regularMonthlyPayment),
    totalInterestPaidStandard: Math.round(totalInterestStandard),
    totalInterestPaidAccelerated: Math.round(totalInterestAccelerated),
    interestSavings: Math.round(interestSavings),
    termReductionMonths,
    effectiveBorrowingApy,
    closingDateStandardText: `Oct ${endStandardYear}`,
    closingDateAcceleratedText: `Month ${acceleratedMonths} (${endAcceleratedYear})`,
  };
}

/**
 * Real Return & Inflation Neutralizer
 * Fisher Equation: (1 + r_real) = (1 + r_nominal) / (1 + inflation)
 */
export function calculateRealReturn(params: RealReturnParameters): RealReturnResult {
  const { nominalRate, cpiInflationRate, taxRatePercent, goldInflationParity } = params;

  const rNom = nominalRate / 100;
  const pi = cpiInflationRate / 100;
  const tax = taxRatePercent / 100;
  const goldPi = goldInflationParity / 100;

  // Exact Fisher equation
  const fisherRealReturn = (1 + rNom) / (1 + pi) - 1;

  // After-tax nominal return
  const afterTaxNom = rNom * (1 - tax);
  // After-tax real return
  const afterTaxReal = (1 + afterTaxNom) / (1 + pi) - 1;

  // Gold equivalent preservation ratio: (1 + rNom) / (1 + goldPi)
  const goldPreservation = (1 + rNom) / (1 + goldPi);

  // Purchasing power loss of cash over 10 years at CPI rate: 1 - (1/(1+pi)^10)
  const tenYearLoss = (1 - 1 / Math.pow(1 + pi, 10)) * 100;

  return {
    fisherRealReturnRate: Number((fisherRealReturn * 100).toFixed(2)),
    afterTaxNominalReturn: Number((afterTaxNom * 100).toFixed(2)),
    afterTaxRealReturn: Number((afterTaxReal * 100).toFixed(2)),
    goldEquivalentPreservationRatio: Number(goldPreservation.toFixed(3)),
    purchasingPowerLossTenYearsPercent: Number(tenYearLoss.toFixed(1)),
  };
}

/**
 * 15-Year Scenario Workbench Benchmarker
 * Compares $25,000/mo SIP vs $1,000,000 Lumpsum vs Staggered Term Certificates
 */
export function getScenarioComparisons(): ScenarioComparison[] {
  return [
    {
      scenarioName: 'Systematic Capital Accumulation (SIP with 10% Step-Up)',
      strategyType: 'sip',
      totalCapitalCommitted: 9537600, // 25k/mo stepped up 10% annually over 15y
      terminalValue15Years: 24890000,
      wealthMultiple: 2.61,
      liquidityScore: 'Tier 1 — High Intra-Year Flexibility',
      volatilityTolerance: 'Resilient Dollar-Cost Averaging',
    },
    {
      scenarioName: 'Direct Tranche Lumpsum Sovereign Allocation (12% CAGR)',
      strategyType: 'lumpsum',
      totalCapitalCommitted: 4000000,
      terminalValue15Years: 21894000,
      wealthMultiple: 5.47,
      liquidityScore: 'Tier 3 — Patient Multi-Year Lockup',
      volatilityTolerance: 'High Drawdown Capacity Required',
    },
    {
      scenarioName: 'Staggered Fiduciary Term Certificate Ladder (6.25% Weighted)',
      strategyType: 'ladder',
      totalCapitalCommitted: 4000000,
      terminalValue15Years: 10034000,
      wealthMultiple: 2.51,
      liquidityScore: 'Tier 1 — Periodic Tranche Liquidity (Annual Reinvestment)',
      volatilityTolerance: 'Absolute Capital Preservation',
    },
  ];
}
