import React, { useState } from 'react';
import {
  Calculator,
  Layers,
  Compass,
  TrendingUp,
  Percent,
  DollarSign,
  ArrowRight,
  Shield,
  HelpCircle,
  FileSpreadsheet,
  CheckCircle,
} from 'lucide-react';
import { ScreenId } from '../common/Header';
import {
  calculateTermLadder,
  calculateFireLongevity,
  calculateLumpsumGrowth,
  calculateDebtAmortization,
  calculateRealReturn,
  getScenarioComparisons,
} from '../../utils/actuarial';
import {
  TermLadderParameters,
  FireParameters,
  LumpsumParameters,
  DebtAmortizationParameters,
  RealReturnParameters,
} from '../../types/financial';
import { formatCurrency, formatPercent, formatCompactCurrency } from '../../utils/formatters';

interface OmniCalculatorHubScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const OmniCalculatorHubScreen: React.FC<OmniCalculatorHubScreenProps> = ({ onNavigate }) => {
  const [activeEngine, setActiveEngine] = useState<
    'sip' | 'ladder' | 'fire' | 'lumpsum' | 'debt' | 'real_return'
  >('ladder');

  // Term Ladder State
  const [ladderParams, setLadderParams] = useState<TermLadderParameters>({
    principalAmount: 5000000,
    baseInterestRate: 5.25,
    compoundingFrequency: 'quarterly',
    ladderRungs: 5,
    spreadPerRungBps: 25,
  });

  // FIRE State
  const [fireParams, setFireParams] = useState<FireParameters>({
    currentAge: 42,
    targetRetirementAge: 55,
    monthlyLivingExpenditure: 30000,
    inflationRate: 4.2,
    safeWithdrawalRate: 3.5,
    postRetirementReturnRate: 8.0,
    currentLiquidNetWorth: 4500000,
  });

  // Lumpsum State
  const [lumpsumParams, setLumpsumParams] = useState<LumpsumParameters>({
    initialCapital: 3000000,
    expectedAnnualReturn: 11.5,
    timeHorizonYears: 15,
    volatilityRegime: 'balanced',
  });

  // Debt Amortization State
  const [debtParams, setDebtParams] = useState<DebtAmortizationParameters>({
    facilityPrincipal: 10000000,
    annualInterestRate: 6.75,
    termMonths: 120, // 10 years
    extraMonthlyPrepayment: 25000,
    originationFeeBps: 50,
  });

  // Real Return State
  const [realParams, setRealParams] = useState<RealReturnParameters>({
    nominalRate: 9.5,
    cpiInflationRate: 4.5,
    taxRatePercent: 25,
    goldInflationParity: 6.8,
  });

  // Calculations
  const ladderResults = calculateTermLadder(ladderParams);
  const fireResults = calculateFireLongevity(fireParams);
  const lumpsumResults = calculateLumpsumGrowth(lumpsumParams);
  const debtResults = calculateDebtAmortization(debtParams);
  const realResults = calculateRealReturn(realParams);
  const scenarioComparisons = getScenarioComparisons();

  return (
    <div className="meridian-container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      {/* Screen Title */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div className="badge-gold" style={{ marginBottom: '0.65rem' }}>
          <span>Fiduciary Actuarial Suite</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.75rem)', lineHeight: 1.15, color: 'var(--text-primary)' }}>
          Omni-Calculator Hub
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', marginTop: '0.35rem' }}>
          Six precision institutional financial engines supporting day-count conventions, geometric step-up schedules, and real CPI deflators.
        </p>
      </div>

      {/* 6 Engine Navigation Selector */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '0.85rem',
          marginBottom: '2.5rem',
        }}
      >
        <button
          onClick={() => onNavigate('sip_studio')}
          className="meridian-card"
          style={{
            padding: '1.25rem',
            textAlign: 'left',
            cursor: 'pointer',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-gold)',
          }}
        >
          <div style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <Calculator size={20} />
            <span style={{ fontSize: '0.68rem', color: 'var(--text-gold)', fontWeight: 700 }}>STUDIO</span>
          </div>
          <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
            1. SIP & Step-Up Engine
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>
            Tactile curves & milestone ledger
          </div>
        </button>

        <button
          onClick={() => setActiveEngine('ladder')}
          className="meridian-card"
          style={{
            padding: '1.25rem',
            textAlign: 'left',
            cursor: 'pointer',
            backgroundColor: activeEngine === 'ladder' ? 'var(--accent-gold-subtle)' : 'var(--bg-card)',
            border: activeEngine === 'ladder' ? '1px solid var(--accent-gold)' : '1px solid var(--border-light)',
          }}
        >
          <div style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
            <Layers size={20} />
          </div>
          <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
            2. Term Certificate Ladder
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>
            Quarterly compounding & liquidity
          </div>
        </button>

        <button
          onClick={() => setActiveEngine('fire')}
          className="meridian-card"
          style={{
            padding: '1.25rem',
            textAlign: 'left',
            cursor: 'pointer',
            backgroundColor: activeEngine === 'fire' ? 'var(--accent-gold-subtle)' : 'var(--bg-card)',
            border: activeEngine === 'fire' ? '1px solid var(--accent-gold)' : '1px solid var(--border-light)',
          }}
        >
          <div style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
            <Compass size={20} />
          </div>
          <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
            3. FIRE & Dynasty Longevity
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>
            SWR safe withdrawal & endowment
          </div>
        </button>

        <button
          onClick={() => setActiveEngine('lumpsum')}
          className="meridian-card"
          style={{
            padding: '1.25rem',
            textAlign: 'left',
            cursor: 'pointer',
            backgroundColor: activeEngine === 'lumpsum' ? 'var(--accent-gold-subtle)' : 'var(--bg-card)',
            border: activeEngine === 'lumpsum' ? '1px solid var(--accent-gold)' : '1px solid var(--border-light)',
          }}
        >
          <div style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
            <TrendingUp size={20} />
          </div>
          <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
            4. Lumpsum Growth Simulator
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>
            Monte Carlo 95% confidence bands
          </div>
        </button>

        <button
          onClick={() => setActiveEngine('debt')}
          className="meridian-card"
          style={{
            padding: '1.25rem',
            textAlign: 'left',
            cursor: 'pointer',
            backgroundColor: activeEngine === 'debt' ? 'var(--accent-gold-subtle)' : 'var(--bg-card)',
            border: activeEngine === 'debt' ? '1px solid var(--accent-gold)' : '1px solid var(--border-light)',
          }}
        >
          <div style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
            <DollarSign size={20} />
          </div>
          <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
            5. Institutional Debt Engine
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>
            30/360 bond amortization & savings
          </div>
        </button>

        <button
          onClick={() => setActiveEngine('real_return')}
          className="meridian-card"
          style={{
            padding: '1.25rem',
            textAlign: 'left',
            cursor: 'pointer',
            backgroundColor: activeEngine === 'real_return' ? 'var(--accent-gold-subtle)' : 'var(--bg-card)',
            border: activeEngine === 'real_return' ? '1px solid var(--accent-gold)' : '1px solid var(--border-light)',
          }}
        >
          <div style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
            <Percent size={20} />
          </div>
          <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
            6. Real Return & Inflation
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>
            Fisher equation & gold parity
          </div>
        </button>
      </div>

      {/* Active Engine Tactical Sandbox Container */}
      <div className="meridian-card" style={{ padding: '2.5rem', marginBottom: '3.5rem' }}>
        {/* ENGINE 2: TERM CERTIFICATE LADDER */}
        {activeEngine === 'ladder' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
              <div>
                <span className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', letterSpacing: '0.12em' }}>
                  ENGINE 02 · FIXED INCOME CONVEXITY
                </span>
                <h3 style={{ fontSize: '1.45rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  Term Certificate & Staggered FD Ladder Engine
                </h3>
              </div>
              <div className="badge-gold">Staggered Liquidity Optimization</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
              {/* Inputs */}
              <div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Total Committed Principal:</span>
                    <strong className="tabular-nums" style={{ color: 'var(--accent-gold)' }}>
                      {formatCurrency(ladderParams.principalAmount)}
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={500000}
                    max={25000000}
                    step={250000}
                    value={ladderParams.principalAmount}
                    onChange={(e) => setLadderParams({ ...ladderParams, principalAmount: Number(e.target.value) })}
                    className="meridian-slider"
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Base 1-Year Certificate Coupon:</span>
                    <strong className="tabular-nums" style={{ color: 'var(--accent-gold)' }}>
                      {ladderParams.baseInterestRate.toFixed(2)}%
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={3.0}
                    max={8.5}
                    step={0.25}
                    value={ladderParams.baseInterestRate}
                    onChange={(e) => setLadderParams({ ...ladderParams, baseInterestRate: Number(e.target.value) })}
                    className="meridian-slider"
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Yield Spread Per Rung (Slope):</span>
                    <strong className="tabular-nums" style={{ color: 'var(--accent-gold)' }}>
                      +{ladderParams.spreadPerRungBps} bps / year
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={75}
                    step={5}
                    value={ladderParams.spreadPerRungBps}
                    onChange={(e) => setLadderParams({ ...ladderParams, spreadPerRungBps: Number(e.target.value) })}
                    className="meridian-slider"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Compounding Frequency Convention
                  </label>
                  <select
                    value={ladderParams.compoundingFrequency}
                    onChange={(e) =>
                      setLadderParams({
                        ...ladderParams,
                        compoundingFrequency: e.target.value as TermLadderParameters['compoundingFrequency'],
                      })
                    }
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-secondary)',
                    }}
                  >
                    <option value="quarterly">Quarterly Compounding (Institutional Standard)</option>
                    <option value="monthly">Monthly Geometric Accretion</option>
                    <option value="semi-annually">Semi-Annual Bond Coupon Basis</option>
                    <option value="annually">Annual Maturity Settlement</option>
                  </select>
                </div>
              </div>

              {/* Rung Output Table */}
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  Staggered Tranche Maturity Schedule
                </div>
                <div className="meridian-table-container">
                  <table className="meridian-table">
                    <thead>
                      <tr>
                        <th>Tranche</th>
                        <th>Coupon</th>
                        <th>Allocated</th>
                        <th>Interest Gain</th>
                        <th>Maturity Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ladderResults.map((rung) => (
                        <tr key={rung.rungIndex}>
                          <td style={{ fontWeight: 600 }}>Rung {rung.rungIndex} ({rung.tenorMonths}m)</td>
                          <td style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>{rung.interestRate.toFixed(2)}%</td>
                          <td>{formatCurrency(rung.allocatedPrincipal)}</td>
                          <td style={{ color: 'var(--gain-green)' }}>+{formatCurrency(rung.interestEarned)}</td>
                          <td style={{ fontWeight: 700 }}>{formatCurrency(rung.maturityValue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div
                  style={{
                    marginTop: '1.25rem',
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-secondary)',
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>
                    Total Interest Accretion: <strong>+{formatCurrency(ladderResults.reduce((acc, r) => acc + r.interestEarned, 0))}</strong>
                  </span>
                  <span>
                    Aggregate Portfolio Value: <strong>{formatCurrency(ladderResults.reduce((acc, r) => acc + r.maturityValue, 0))}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ENGINE 3: FIRE & GENERATIONAL LONGEVITY */}
        {activeEngine === 'fire' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
              <div>
                <span className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', letterSpacing: '0.12em' }}>
                  ENGINE 03 · PERPETUAL CAPITAL PRESERVATION
                </span>
                <h3 style={{ fontSize: '1.45rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  FIRE & Generational Dynasty Longevity Engine
                </h3>
              </div>
              <div className="badge-gold">Safe Withdrawal Rate (SWR) Stress Testing</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Current Fiduciary Age:</label>
                    <input
                      type="number"
                      value={fireParams.currentAge}
                      onChange={(e) => setFireParams({ ...fireParams, currentAge: Number(e.target.value) })}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-secondary)' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Target Retirement Age:</label>
                    <input
                      type="number"
                      value={fireParams.targetRetirementAge}
                      onChange={(e) => setFireParams({ ...fireParams, targetRetirementAge: Number(e.target.value) })}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-secondary)' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Monthly Family Living Expenditure:</span>
                    <strong className="tabular-nums" style={{ color: 'var(--accent-gold)' }}>
                      {formatCurrency(fireParams.monthlyLivingExpenditure)}/mo
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={10000}
                    max={150000}
                    step={2500}
                    value={fireParams.monthlyLivingExpenditure}
                    onChange={(e) => setFireParams({ ...fireParams, monthlyLivingExpenditure: Number(e.target.value) })}
                    className="meridian-slider"
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Safe Withdrawal Rate (SWR):</span>
                    <strong className="tabular-nums" style={{ color: 'var(--accent-gold)' }}>
                      {fireParams.safeWithdrawalRate.toFixed(2)}%
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={2.5}
                    max={5.0}
                    step={0.1}
                    value={fireParams.safeWithdrawalRate}
                    onChange={(e) => setFireParams({ ...fireParams, safeWithdrawalRate: Number(e.target.value) })}
                    className="meridian-slider"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Current Liquid Net Worth Under Custody:
                  </label>
                  <input
                    type="number"
                    step={100000}
                    value={fireParams.currentLiquidNetWorth}
                    onChange={(e) => setFireParams({ ...fireParams, currentLiquidNetWorth: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-secondary)' }}
                  />
                </div>
              </div>

              {/* Longevity Outcome */}
              <div
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '2rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', letterSpacing: '0.12em' }}>
                    ACTUARIAL CORPUS SIZING
                  </span>
                  <div
                    className="tabular-nums"
                    style={{
                      fontSize: '2.4rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-mono)',
                      marginTop: '0.25rem',
                    }}
                  >
                    {formatCurrency(fireResults.fireCorpusRequiredNominal)}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    Future monthly expense at retirement: <strong>{formatCurrency(fireResults.monthlyFutureExpenseAtRetirement)}/mo</strong>
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    margin: '1.5rem 0',
                    padding: '1rem 0',
                    borderTop: '1px solid var(--border-subtle)',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                      Additional Capital Delta
                    </div>
                    <div className="tabular-nums" style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--loss-red)' }}>
                      {formatCurrency(fireResults.additionalCorpusRequired)}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                      Dynasty Corpus (3 Generations)
                    </div>
                    <div className="tabular-nums" style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-gold)' }}>
                      {formatCurrency(fireResults.dynastyCorpusSizing)}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.82rem', color: 'var(--gain-green)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle size={15} />
                  <span>
                    Longevity Horizon: <strong>{fireResults.sustainableLongevityYears}+ Years (Dynastic Perpetual Survival)</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ENGINE 4: LUMPSUM GROWTH SIMULATOR */}
        {activeEngine === 'lumpsum' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
              <div>
                <span className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', letterSpacing: '0.12em' }}>
                  ENGINE 04 · SINGLE-TRANCHE MONTE CARLO
                </span>
                <h3 style={{ fontSize: '1.45rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  Lumpsum Sovereign Growth Simulator
                </h3>
              </div>
              <div className="badge-gold">Geometric Brownian Motion (95% CI)</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
              <div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Deployable Single Tranche:</span>
                    <strong className="tabular-nums" style={{ color: 'var(--accent-gold)' }}>
                      {formatCurrency(lumpsumParams.initialCapital)}
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={500000}
                    max={25000000}
                    step={500000}
                    value={lumpsumParams.initialCapital}
                    onChange={(e) => setLumpsumParams({ ...lumpsumParams, initialCapital: Number(e.target.value) })}
                    className="meridian-slider"
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Expected Annual Nominal Return:</span>
                    <strong className="tabular-nums" style={{ color: 'var(--accent-gold)' }}>
                      {lumpsumParams.expectedAnnualReturn.toFixed(1)}% p.a.
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={4.0}
                    max={25.0}
                    step={0.5}
                    value={lumpsumParams.expectedAnnualReturn}
                    onChange={(e) => setLumpsumParams({ ...lumpsumParams, expectedAnnualReturn: Number(e.target.value) })}
                    className="meridian-slider"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Volatility Regime Simulation
                  </label>
                  <select
                    value={lumpsumParams.volatilityRegime}
                    onChange={(e) =>
                      setLumpsumParams({
                        ...lumpsumParams,
                        volatilityRegime: e.target.value as LumpsumParameters['volatilityRegime'],
                      })
                    }
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-secondary)',
                    }}
                  >
                    <option value="conservative">Conservative Sovereign Reserve (σ = 7%)</option>
                    <option value="balanced">Balanced Endowment Allocation (σ = 13%)</option>
                    <option value="aggressive">Aggressive Private Equity & Tech (σ = 19%)</option>
                    <option value="sovereign_stress">Macro Stagflation Stress Shock (σ = 25%)</option>
                  </select>
                </div>
              </div>

              {/* Lumpsum Readout */}
              <div
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '2rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', letterSpacing: '0.12em' }}>
                    EXPECTED TERMINAL WEALTH
                  </span>
                  <div
                    className="tabular-nums"
                    style={{
                      fontSize: '2.4rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-mono)',
                      marginTop: '0.25rem',
                    }}
                  >
                    {formatCurrency(lumpsumResults.terminalCorpus)}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--gain-green)', marginTop: '0.2rem' }}>
                    +{formatCurrency(lumpsumResults.totalGain)} ({lumpsumResults.multipleOfCapital}x Capital Multiple)
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    margin: '1.5rem 0',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 600 }}>
                    95% Monte Carlo Confidence Band:
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                    <span style={{ color: 'var(--loss-red)', fontWeight: 600 }}>
                      Low Bound (5th %ile): {formatCurrency(lumpsumResults.monteCarloConfidence95Low)}
                    </span>
                    <span style={{ color: 'var(--gain-green)', fontWeight: 600 }}>
                      High Bound (95th %ile): {formatCurrency(lumpsumResults.monteCarloConfidence95High)}
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Real Inflation-Deflated Purchasing Power: <strong>{formatCurrency(lumpsumResults.realPurchasingPower)}</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ENGINE 5: INSTITUTIONAL DEBT & AMORTIZATION */}
        {activeEngine === 'debt' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
              <div>
                <span className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', letterSpacing: '0.12em' }}>
                  ENGINE 05 · 30/360 BOND BASIS
                </span>
                <h3 style={{ fontSize: '1.45rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  Institutional Debt & Amortization Engine
                </h3>
              </div>
              <div className="badge-gold">Voluntary Prepayment & Accelerated Decay</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
              <div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Credit Facility Principal:</span>
                    <strong className="tabular-nums" style={{ color: 'var(--accent-gold)' }}>
                      {formatCurrency(debtParams.facilityPrincipal)}
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={1000000}
                    max={50000000}
                    step={1000000}
                    value={debtParams.facilityPrincipal}
                    onChange={(e) => setDebtParams({ ...debtParams, facilityPrincipal: Number(e.target.value) })}
                    className="meridian-slider"
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Interest Rate (Spread over SOFR):</span>
                    <strong className="tabular-nums" style={{ color: 'var(--accent-gold)' }}>
                      {debtParams.annualInterestRate.toFixed(2)}%
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={3.5}
                    max={12.0}
                    step={0.25}
                    value={debtParams.annualInterestRate}
                    onChange={(e) => setDebtParams({ ...debtParams, annualInterestRate: Number(e.target.value) })}
                    className="meridian-slider"
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Monthly Accelerated Prepayment:</span>
                    <strong className="tabular-nums" style={{ color: 'var(--gain-green)' }}>
                      +{formatCurrency(debtParams.extraMonthlyPrepayment)}/mo
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100000}
                    step={5000}
                    value={debtParams.extraMonthlyPrepayment}
                    onChange={(e) => setDebtParams({ ...debtParams, extraMonthlyPrepayment: Number(e.target.value) })}
                    className="meridian-slider"
                  />
                </div>
              </div>

              {/* Debt Results */}
              <div
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '2rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', letterSpacing: '0.12em' }}>
                    MONTHLY SERVICING ANNUITY
                  </span>
                  <div
                    className="tabular-nums"
                    style={{
                      fontSize: '2.4rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-mono)',
                      marginTop: '0.25rem',
                    }}
                  >
                    {formatCurrency(debtResults.regularMonthlyPayment)}/mo
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    margin: '1.5rem 0',
                    padding: '1rem 0',
                    borderTop: '1px solid var(--border-subtle)',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                      Interest Savings Via Prepayment
                    </div>
                    <div className="tabular-nums" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gain-green)' }}>
                      +{formatCurrency(debtResults.interestSavings)}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                      Term Reduction
                    </div>
                    <div className="tabular-nums" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-gold)' }}>
                      {debtResults.termReductionMonths} Months Early
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Closing Date: Standard ({debtResults.closingDateStandardText}) vs Accelerated (<strong>{debtResults.closingDateAcceleratedText}</strong>)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ENGINE 6: REAL RETURN & INFLATION NEUTRALIZER */}
        {activeEngine === 'real_return' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
              <div>
                <span className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', letterSpacing: '0.12em' }}>
                  ENGINE 06 · PURCHASING POWER CONVEXITY
                </span>
                <h3 style={{ fontSize: '1.45rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  Real Return & Inflation Neutralizer Engine
                </h3>
              </div>
              <div className="badge-gold">Fisher Equation & Gold Parity</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
              <div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Gross Nominal Asset Yield:</span>
                    <strong className="tabular-nums" style={{ color: 'var(--accent-gold)' }}>
                      {realParams.nominalRate.toFixed(2)}%
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={3.0}
                    max={18.0}
                    step={0.25}
                    value={realParams.nominalRate}
                    onChange={(e) => setRealParams({ ...realParams, nominalRate: Number(e.target.value) })}
                    className="meridian-slider"
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Headline CPI Inflation Deflator:</span>
                    <strong className="tabular-nums" style={{ color: 'var(--loss-red)' }}>
                      {realParams.cpiInflationRate.toFixed(2)}% CPI
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={2.0}
                    max={10.0}
                    step={0.1}
                    value={realParams.cpiInflationRate}
                    onChange={(e) => setRealParams({ ...realParams, cpiInflationRate: Number(e.target.value) })}
                    className="meridian-slider"
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Sovereign Tax Drag Rate:</span>
                    <strong className="tabular-nums" style={{ color: 'var(--text-primary)' }}>
                      {realParams.taxRatePercent}%
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={45}
                    step={1}
                    value={realParams.taxRatePercent}
                    onChange={(e) => setRealParams({ ...realParams, taxRatePercent: Number(e.target.value) })}
                    className="meridian-slider"
                  />
                </div>
              </div>

              {/* Real Return Outcome */}
              <div
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '2rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', letterSpacing: '0.12em' }}>
                    EXACT FISHER REAL RETURN (AFTER TAX)
                  </span>
                  <div
                    className="tabular-nums"
                    style={{
                      fontSize: '2.4rem',
                      fontWeight: 700,
                      color: realResults.afterTaxRealReturn >= 0 ? 'var(--gain-green)' : 'var(--loss-red)',
                      fontFamily: 'var(--font-mono)',
                      marginTop: '0.25rem',
                    }}
                  >
                    {realResults.afterTaxRealReturn > 0 ? '+' : ''}{realResults.afterTaxRealReturn.toFixed(2)}%
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    Pre-tax Fisher real rate: <strong>+{realResults.fisherRealReturnRate}%</strong>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    margin: '1.5rem 0',
                  }}
                >
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    10-Year Cash Depreciation at this Inflation Drag:
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--loss-red)' }}>
                    -{realResults.purchasingPowerLossTenYearsPercent}% Purchasing Power Decay
                  </div>
                </div>

                <div style={{ fontSize: '0.82rem', color: 'var(--text-gold)' }}>
                  Gold Parity Preservation Ratio: <strong>{realResults.goldEquivalentPreservationRatio}x</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 15-Year Scenario Workbench Benchmark */}
      <div style={{ marginBottom: '4rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', letterSpacing: '0.12em' }}>
            CROSS-STRATEGY BENCHMARK
          </span>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            15-Year Scenario Workbench
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Comparative actuarial stress-test contrasting systematic DCA, direct tranche allocation, and staggered certificates.
          </p>
        </div>

        <div className="meridian-table-container">
          <table className="meridian-table">
            <thead>
              <tr>
                <th>Strategy Protocol</th>
                <th>Capital Committed</th>
                <th>15Y Terminal Value</th>
                <th>Wealth Multiple</th>
                <th>Liquidity Profile</th>
                <th>Drawdown Tolerance</th>
              </tr>
            </thead>
            <tbody>
              {scenarioComparisons.map((scen, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{scen.scenarioName}</td>
                  <td>{formatCurrency(scen.totalCapitalCommitted)}</td>
                  <td style={{ fontWeight: 700, color: 'var(--text-gold)' }}>
                    {formatCurrency(scen.terminalValue15Years)}
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--gain-green)' }}>{scen.wealthMultiple}x</td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{scen.liquidityScore}</td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>{scen.volatilityTolerance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transparent Actuarial Methodologies & Mathematical Formula Disclosures */}
      <div
        className="meridian-card"
        style={{
          padding: '2.5rem',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-gold)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
          <Shield size={20} style={{ color: 'var(--accent-gold)' }} />
          <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>
            Transparent Actuarial Methodologies & Formulations
          </h3>
        </div>

        <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          In accordance with FINRA Notice 20-21 and the Oxford Fiduciary Protocol, all formulas employed on the Meridian platform are disclosed without obfuscation:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          <div className="math-formula-box">
            <div style={{ fontSize: '0.75rem', color: 'var(--text-gold)', fontWeight: 600, marginBottom: '0.35rem' }}>
              CONTINUOUS COMPOUNDING & STEP-UP ANNUITY
            </div>
            <code>
              {"FV = \\sum_{y=1}^T \\left( 12 \\cdot P_y \\right) \\cdot \\exp\\left( \\int_0^{T-y} r(s) ds \\right)"}
            </code>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', marginTop: '0.4rem' }}>
              Where P_y = P_0 (1 + g)^(y-1), factoring annual step-up growth g.
            </div>
          </div>

          <div className="math-formula-box">
            <div style={{ fontSize: '0.75rem', color: 'var(--text-gold)', fontWeight: 600, marginBottom: '0.35rem' }}>
              EXACT FISHER REAL RETURN THEOREM
            </div>
            <code>
              {"r_{\\text{real}} = \\frac{1 + r_{\\text{nominal}}(1 - \\tau)}{1 + \\pi_{\\text{CPI}}} - 1"}
            </code>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', marginTop: '0.4rem' }}>
              Incorporating sovereign dividend/capital-gain tax drag \tau and CPI deflator \pi.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
