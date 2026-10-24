/**
 * Meridian Finance — Actuarial & Financial Types
 * Strict type enforcement for institutional calculations, day-count basis, and simulation models.
 */

export type DayCountConvention = 'ACTUAL_365' | 'ACTUAL_360' | 'THIRTY_360_BOND';

export interface SipParameters {
  monthlyAllocation: number;
  expectedCagr: number; // percentage, e.g. 12 for 12%
  tenureYears: number;
  annualStepUpPercent: number; // percentage, e.g. 10 for 10%
  inflationHaircutPercent: number; // e.g. 4.5 for 4.5% CPI drag
  dayCount: DayCountConvention;
}

export interface YearMilestone {
  year: number;
  ageHorizon: number;
  monthlyAllocation: number;
  annualContribution: number;
  cumulativeInvested: number;
  compoundInterestYear: number;
  closingNominalCorpus: number;
  inflationDeflatedPurchasingPower: number;
  monthlyAnnuityYield: number; // calculated at 4% SWR
}

export interface SipCalculationResult {
  totalInvestedPrincipal: number;
  totalCompoundAlpha: number;
  terminalNominalCorpus: number;
  terminalRealCorpus: number;
  monthlyAnnuityYield: number;
  annualAnnuityYield: number;
  wealthMultiplier: number;
  effectiveAnnualRate: number;
  progression: YearMilestone[];
}

export interface TermLadderParameters {
  principalAmount: number;
  baseInterestRate: number; // e.g. 5.5%
  compoundingFrequency: 'monthly' | 'quarterly' | 'semi-annually' | 'annually';
  ladderRungs: number; // e.g. 5 tranches (1y to 5y)
  spreadPerRungBps: number; // e.g. 25 bps per annual tenor
}

export interface LadderRungResult {
  rungIndex: number;
  tenorMonths: number;
  allocatedPrincipal: number;
  interestRate: number;
  maturityValue: number;
  interestEarned: number;
  liquidityDateText: string;
}

export interface FireParameters {
  currentAge: number;
  targetRetirementAge: number;
  monthlyLivingExpenditure: number; // in present dollars
  inflationRate: number; // e.g. 4.5%
  safeWithdrawalRate: number; // e.g. 3.5%
  postRetirementReturnRate: number; // e.g. 8%
  currentLiquidNetWorth: number;
}

export interface FireCalculationResult {
  fireCorpusRequiredNominal: number;
  fireCorpusRequiredReal: number;
  monthlyFutureExpenseAtRetirement: number;
  additionalCorpusRequired: number;
  yearsToFire: number;
  sustainableLongevityYears: number;
  dynastyCorpusSizing: number;
}

export interface LumpsumParameters {
  initialCapital: number;
  expectedAnnualReturn: number;
  timeHorizonYears: number;
  volatilityRegime: 'conservative' | 'balanced' | 'aggressive' | 'sovereign_stress';
}

export interface LumpsumResult {
  terminalCorpus: number;
  totalGain: number;
  multipleOfCapital: number;
  monteCarloConfidence95Low: number;
  monteCarloConfidence95High: number;
  realPurchasingPower: number;
}

export interface DebtAmortizationParameters {
  facilityPrincipal: number;
  annualInterestRate: number;
  termMonths: number;
  extraMonthlyPrepayment: number;
  originationFeeBps: number;
}

export interface DebtAmortizationResult {
  regularMonthlyPayment: number;
  totalInterestPaidStandard: number;
  totalInterestPaidAccelerated: number;
  interestSavings: number;
  termReductionMonths: number;
  effectiveBorrowingApy: number;
  closingDateStandardText: string;
  closingDateAcceleratedText: string;
}

export interface RealReturnParameters {
  nominalRate: number; // e.g. 8.5%
  cpiInflationRate: number; // e.g. 4.8%
  taxRatePercent: number; // e.g. 20%
  goldInflationParity: number; // e.g. 6.2%
}

export interface RealReturnResult {
  fisherRealReturnRate: number; // exact Fisher equation
  afterTaxNominalReturn: number;
  afterTaxRealReturn: number;
  goldEquivalentPreservationRatio: number;
  purchasingPowerLossTenYearsPercent: number;
}

export interface ScenarioComparison {
  scenarioName: string;
  strategyType: 'sip' | 'lumpsum' | 'ladder';
  totalCapitalCommitted: number;
  terminalValue15Years: number;
  wealthMultiple: number;
  liquidityScore: string;
  volatilityTolerance: string;
}
