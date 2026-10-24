import { describe, it, expect } from 'vitest';
import {
  getDayCountFactor,
  calculateSipProjections,
  calculateTermLadder,
  calculateFireLongevity,
  calculateLumpsumGrowth,
  calculateDebtAmortization,
  calculateRealReturn,
} from './actuarial';

describe('Meridian Actuarial Engine Tests', () => {
  it('should compute exact Day-Count convention factors', () => {
    expect(getDayCountFactor('ACTUAL_365')).toBe(1.0);
    expect(getDayCountFactor('ACTUAL_360')).toBeCloseTo(365 / 360, 4);
    expect(getDayCountFactor('THIRTY_360_BOND')).toBeCloseTo(360 / 365, 4);
  });

  it('should compute precision SIP compounding with step-up escalation', () => {
    const result = calculateSipProjections({
      monthlyAllocation: 10000,
      expectedCagr: 12,
      tenureYears: 10,
      annualStepUpPercent: 10,
      inflationHaircutPercent: 4,
      dayCount: 'ACTUAL_365',
    });

    expect(result.totalInvestedPrincipal).toBeGreaterThan(1200000);
    expect(result.terminalNominalCorpus).toBeGreaterThan(result.totalInvestedPrincipal);
    expect(result.totalCompoundAlpha).toBe(result.terminalNominalCorpus - result.totalInvestedPrincipal);
    expect(result.wealthMultiplier).toBeGreaterThan(1.5);
    expect(result.progression.length).toBe(10);
    // Real purchasing power should reflect inflation deflator
    expect(result.terminalRealCorpus).toBeLessThan(result.terminalNominalCorpus);
  });

  it('should properly structure Fixed Deposit / Term Certificate ladders', () => {
    const rungs = calculateTermLadder({
      principalAmount: 5000000,
      baseInterestRate: 5.0,
      compoundingFrequency: 'quarterly',
      ladderRungs: 5,
      spreadPerRungBps: 25,
    });

    expect(rungs.length).toBe(5);
    expect(rungs[0].allocatedPrincipal).toBe(1000000);
    expect(rungs[0].interestRate).toBe(5.0);
    expect(rungs[4].interestRate).toBe(6.0); // 5.0 + 4 * 0.25%
    expect(rungs[4].maturityValue).toBeGreaterThan(rungs[0].maturityValue);
  });

  it('should compute FIRE longevity and dynastic corpus requirements', () => {
    const fire = calculateFireLongevity({
      currentAge: 40,
      targetRetirementAge: 55,
      monthlyLivingExpenditure: 20000,
      inflationRate: 4.0,
      safeWithdrawalRate: 3.5,
      postRetirementReturnRate: 8.0,
      currentLiquidNetWorth: 2000000,
    });

    expect(fire.yearsToFire).toBe(15);
    expect(fire.monthlyFutureExpenseAtRetirement).toBeGreaterThan(20000);
    expect(fire.fireCorpusRequiredNominal).toBeGreaterThan(fire.fireCorpusRequiredReal);
    expect(fire.dynastyCorpusSizing).toBeGreaterThan(fire.fireCorpusRequiredNominal);
  });

  it('should compute Lumpsum growth and log-normal confidence bounds', () => {
    const lumpsum = calculateLumpsumGrowth({
      initialCapital: 1000000,
      expectedAnnualReturn: 10,
      timeHorizonYears: 10,
      volatilityRegime: 'balanced',
    });

    expect(lumpsum.terminalCorpus).toBeGreaterThan(2000000);
    expect(lumpsum.monteCarloConfidence95Low).toBeLessThan(lumpsum.terminalCorpus);
    expect(lumpsum.monteCarloConfidence95High).toBeGreaterThan(lumpsum.terminalCorpus);
  });

  it('should compute institutional debt amortization and prepayment interest decay', () => {
    const debt = calculateDebtAmortization({
      facilityPrincipal: 10000000,
      annualInterestRate: 6.0,
      termMonths: 120,
      extraMonthlyPrepayment: 20000,
      originationFeeBps: 50,
    });

    expect(debt.regularMonthlyPayment).toBeGreaterThan(100000);
    expect(debt.interestSavings).toBeGreaterThan(0);
    expect(debt.termReductionMonths).toBeGreaterThan(0);
  });

  it('should compute exact Fisher real returns net of tax and CPI drag', () => {
    const real = calculateRealReturn({
      nominalRate: 10.0,
      cpiInflationRate: 4.0,
      taxRatePercent: 20,
      goldInflationParity: 5.0,
    });

    // Nominal after 20% tax = 8%
    // Exact Fisher real rate: (1 + 0.08) / (1 + 0.04) - 1 = 1.08 / 1.04 - 1 ≈ 3.846% ≈ 3.85%
    expect(real.afterTaxRealReturn).toBeCloseTo(3.85, 1);
    expect(real.purchasingPowerLossTenYearsPercent).toBeGreaterThan(30);
  });
});
