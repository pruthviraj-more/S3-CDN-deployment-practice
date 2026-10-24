import React, { useState, useMemo } from 'react';
import {
  FileText,
  Bookmark,
  Share2,
  Grid,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Check,
  Sliders,
  Printer,
} from 'lucide-react';
import { SipParameters, SipCalculationResult, DayCountConvention } from '../../types/financial';
import { calculateSipProjections } from '../../utils/actuarial';
import { formatCurrency, formatPercent, formatCompactCurrency } from '../../utils/formatters';

interface SipStudioScreenProps {
  onOpenWealthMemo: (params: SipParameters, results: SipCalculationResult) => void;
}

export const SipStudioScreen: React.FC<SipStudioScreenProps> = ({ onOpenWealthMemo }) => {
  // Primary Parameters
  const [params, setParams] = useState<SipParameters>({
    monthlyAllocation: 15000, // $15k/mo
    expectedCagr: 12.0, // 12%
    tenureYears: 25, // 25 years
    annualStepUpPercent: 10.0, // 10%
    inflationHaircutPercent: 4.5, // 4.5% CPI drag
    dayCount: 'ACTUAL_365',
  });

  // UI state
  const [showSensitivityMatrix, setShowSensitivityMatrix] = useState<boolean>(false);
  const [savedScenarios, setSavedScenarios] = useState<
    { name: string; date: string; params: SipParameters; corpus: number }[]
  >([]);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<{
    year: number;
    invested: number;
    corpus: number;
    x: number;
    y: number;
  } | null>(null);

  // Actuarial Calculation
  const results = useMemo(() => calculateSipProjections(params), [params]);

  // Save Scenario
  const handleSaveScenario = () => {
    const name = `Allocation ${formatCurrency(params.monthlyAllocation)}/mo @ ${params.expectedCagr}% (${params.tenureYears}y)`;
    setSavedScenarios([
      ...savedScenarios,
      {
        name,
        date: new Date().toLocaleTimeString(),
        params: { ...params },
        corpus: results.terminalNominalCorpus,
      },
    ]);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Share Calculation
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2000);
  };

  // SVG Chart Dimensions
  const chartWidth = 720;
  const chartHeight = 280;
  const padding = { top: 25, right: 30, bottom: 35, left: 65 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const maxVal = Math.max(...results.progression.map((p) => p.closingNominalCorpus), 1);

  // Generate SVG Path
  const points = results.progression.map((p, idx) => {
    const x = padding.left + (idx / Math.max(1, results.progression.length - 1)) * innerWidth;
    const yCorpus = chartHeight - padding.bottom - (p.closingNominalCorpus / maxVal) * innerHeight;
    const yInvested = chartHeight - padding.bottom - (p.cumulativeInvested / maxVal) * innerHeight;
    return { x, yCorpus, yInvested, ...p };
  });

  const corpusPathD = points.reduce(
    (acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.yCorpus}` : `${acc} L ${pt.x} ${pt.yCorpus}`),
    ''
  );

  const investedPathD = points.reduce(
    (acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.yInvested}` : `${acc} L ${pt.x} ${pt.yInvested}`),
    ''
  );

  const corpusAreaD = `${corpusPathD} L ${points[points.length - 1]?.x || 0} ${
    chartHeight - padding.bottom
  } L ${points[0]?.x || 0} ${chartHeight - padding.bottom} Z`;

  const investedAreaD = `${investedPathD} L ${points[points.length - 1]?.x || 0} ${
    chartHeight - padding.bottom
  } L ${points[0]?.x || 0} ${chartHeight - padding.bottom} Z`;

  // Sensitivity Matrix Matrix generation (CAGR: 8% to 16%, Tenure: 10y to 30y)
  const cagrRange = [8, 10, 12, 14, 16];
  const tenureRange = [10, 15, 20, 25, 30];

  return (
    <div className="meridian-container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      {/* Studio Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '1.5rem',
          marginBottom: '2.5rem',
          borderBottom: '1px solid var(--border-light)',
          paddingBottom: '2rem',
        }}
      >
        <div>
          <div className="badge-gold" style={{ marginBottom: '0.65rem' }}>
            <span>Tactile Actuarial Studio</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.75rem)', lineHeight: 1.15, color: 'var(--text-primary)' }}>
            SIP & Wealth Projection Studio
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', marginTop: '0.35rem' }}>
            Multi-horizon systematic capital accumulation, geometric compounding curve, and milestone progression ledger.
          </p>
        </div>

        {/* Action Tray */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
          <button
            onClick={() => onOpenWealthMemo(params, results)}
            className="btn-primary"
            style={{ fontSize: '0.86rem' }}
          >
            <FileText size={15} />
            <span>Download Wealth Memo (PDF)</span>
          </button>

          <button
            onClick={handleSaveScenario}
            className="btn-secondary"
            style={{ fontSize: '0.86rem' }}
          >
            {saveSuccess ? <Check size={15} style={{ color: 'var(--gain-green)' }} /> : <Bookmark size={15} />}
            <span>{saveSuccess ? 'Saved to Bookmarks' : 'Save Scenario'}</span>
          </button>

          <button
            onClick={handleShare}
            className="btn-secondary"
            style={{ fontSize: '0.86rem' }}
          >
            {shareSuccess ? <Check size={15} style={{ color: 'var(--gain-green)' }} /> : <Share2 size={15} />}
            <span>{shareSuccess ? 'Link Copied' : 'Share Model'}</span>
          </button>

          <button
            onClick={() => setShowSensitivityMatrix(!showSensitivityMatrix)}
            className="btn-secondary"
            style={{ fontSize: '0.86rem' }}
          >
            <Grid size={15} />
            <span>{showSensitivityMatrix ? 'Hide Sensitivity' : 'Sensitivity Matrix'}</span>
          </button>
        </div>
      </div>

      {/* Hero Outcome Bar */}
      <div
        className="meridian-card"
        style={{
          padding: '2.25rem',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-gold)',
          marginBottom: '2.5rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
              Total Invested Principal
            </div>
            <div
              className="tabular-nums"
              style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}
            >
              {formatCurrency(results.totalInvestedPrincipal)}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Over {params.tenureYears} Years @ {params.annualStepUpPercent}% Step-Up
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
              Compound Alpha Generated
            </div>
            <div
              className="tabular-nums"
              style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--gain-green)', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}
            >
              +{formatCurrency(results.totalCompoundAlpha)}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Wealth Multiplier: <strong>{results.wealthMultiplier}x</strong>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-gold)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
              Terminal Nominal Corpus
            </div>
            <div
              className="tabular-nums"
              style={{ fontSize: '2.1rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)', marginTop: '0.15rem' }}
            >
              {formatCurrency(results.terminalNominalCorpus)}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Real CPI Equivalent: <strong>{formatCurrency(results.terminalRealCorpus)}</strong>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
              Estimated Monthly Annuity (4% SWR)
            </div>
            <div
              className="tabular-nums"
              style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}
            >
              {formatCurrency(results.monthlyAnnuityYield)}/mo
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Annual Payout: {formatCurrency(results.annualAnnuityYield)}/yr
            </div>
          </div>
        </div>
      </div>

      {/* Main Studio Interactive Grid: Controls & Visual Curve */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem',
        }}
      >
        {/* Left: Tactical Slider Inputs */}
        <div className="meridian-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            Actuarial Model Parameters
          </h3>

          {/* Slider 1: Monthly Allocation */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.4rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Initial Monthly Capital:</span>
              <strong className="tabular-nums" style={{ color: 'var(--accent-gold)' }}>
                {formatCurrency(params.monthlyAllocation)}/mo
              </strong>
            </div>
            <input
              type="range"
              min={1000}
              max={100000}
              step={1000}
              value={params.monthlyAllocation}
              onChange={(e) => setParams({ ...params, monthlyAllocation: Number(e.target.value) })}
              className="meridian-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              <span>$1,000/mo</span>
              <span>$100,000/mo</span>
            </div>
          </div>

          {/* Slider 2: Expected CAGR */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.4rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Target CAGR:</span>
              <strong className="tabular-nums" style={{ color: 'var(--accent-gold)' }}>
                {params.expectedCagr.toFixed(1)}% p.a.
              </strong>
            </div>
            <input
              type="range"
              min={3.0}
              max={25.0}
              step={0.5}
              value={params.expectedCagr}
              onChange={(e) => setParams({ ...params, expectedCagr: Number(e.target.value) })}
              className="meridian-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              <span>3.0% (Sovereign Floor)</span>
              <span>25.0% (Private Tech Alpha)</span>
            </div>
          </div>

          {/* Slider 3: Investment Tenure */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.4rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Investment Tenure:</span>
              <strong className="tabular-nums" style={{ color: 'var(--accent-gold)' }}>
                {params.tenureYears} Years
              </strong>
            </div>
            <input
              type="range"
              min={1}
              max={35}
              step={1}
              value={params.tenureYears}
              onChange={(e) => setParams({ ...params, tenureYears: Number(e.target.value) })}
              className="meridian-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              <span>1 Year</span>
              <span>35 Years (Dynasty Generation)</span>
            </div>
          </div>

          {/* Advanced Toggles: Step-Up & Inflation Haircut */}
          <div
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-gold)', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
              Advanced Actuarial Toggles
            </div>

            {/* Step-Up */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Annual Step-Up Indexation:</span>
                <strong style={{ color: 'var(--text-primary)' }}>+{params.annualStepUpPercent}% / year</strong>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                step={1}
                value={params.annualStepUpPercent}
                onChange={(e) => setParams({ ...params, annualStepUpPercent: Number(e.target.value) })}
                className="meridian-slider"
              />
            </div>

            {/* Inflation Haircut */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Inflation Deflator (CPI Haircut):</span>
                <strong style={{ color: 'var(--loss-red)' }}>{params.inflationHaircutPercent}% CPI</strong>
              </div>
              <input
                type="range"
                min={0}
                max={8.0}
                step={0.5}
                value={params.inflationHaircutPercent}
                onChange={(e) => setParams({ ...params, inflationHaircutPercent: Number(e.target.value) })}
                className="meridian-slider"
              />
            </div>
          </div>

          {/* Day-Count Basis Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Institutional Day-Count Basis
            </label>
            <select
              value={params.dayCount}
              onChange={(e) => setParams({ ...params, dayCount: e.target.value as DayCountConvention })}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-secondary)',
              }}
            >
              <option value="ACTUAL_365">Actual/365 (Fiduciary Standard)</option>
              <option value="ACTUAL_360">Actual/360 (Money Market / Commercial Paper)</option>
              <option value="THIRTY_360_BOND">30/360 Bond Basis (Corporate & Municipal)</option>
            </select>
          </div>
        </div>

        {/* Right: Dynamic Multi-Horizon Compound Accumulation Curve (SVG) */}
        <div className="meridian-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <span className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', letterSpacing: '0.12em' }}>
                  ACTUARIAL PROJECTION CURVE
                </span>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  Cumulative Invested Capital vs. Compound Alpha
                </h3>
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.76rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ width: '10px', height: '10px', backgroundColor: 'var(--accent-gold)', borderRadius: '2px' }} />
                  <span>Total Corpus</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ width: '10px', height: '10px', backgroundColor: 'var(--border-strong)', borderRadius: '2px' }} />
                  <span>Principal Invested</span>
                </div>
              </div>
            </div>

            {/* Responsive SVG Chart */}
            <div style={{ width: '100%', overflowX: 'auto', position: 'relative' }}>
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              >
                <defs>
                  <linearGradient id="corpusGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C5A059" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#C5A059" stopOpacity="0.02" />
                  </linearGradient>
                  <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1.0].map((frac, idx) => {
                  const y = chartHeight - padding.bottom - frac * innerHeight;
                  const labelVal = maxVal * frac;
                  return (
                    <g key={idx}>
                      <line
                        x1={padding.left}
                        y1={y}
                        x2={chartWidth - padding.right}
                        y2={y}
                        stroke="var(--border-light)"
                        strokeDasharray="4 4"
                      />
                      <text
                        x={padding.left - 8}
                        y={y + 4}
                        fill="var(--text-tertiary)"
                        fontSize="10"
                        textAnchor="end"
                        fontFamily="monospace"
                      >
                        {formatCompactCurrency(labelVal)}
                      </text>
                    </g>
                  );
                })}

                {/* X Axis Ticks (Years) */}
                {results.progression
                  .filter((p) => p.year === 1 || p.year % 5 === 0 || p.year === params.tenureYears)
                  .map((p, idx) => {
                    const x =
                      padding.left +
                      ((p.year - 1) / Math.max(1, results.progression.length - 1)) * innerWidth;
                    return (
                      <g key={idx}>
                        <line
                          x1={x}
                          y1={chartHeight - padding.bottom}
                          x2={x}
                          y2={chartHeight - padding.bottom + 5}
                          stroke="var(--border-subtle)"
                        />
                        <text
                          x={x}
                          y={chartHeight - padding.bottom + 18}
                          fill="var(--text-tertiary)"
                          fontSize="10"
                          textAnchor="middle"
                          fontFamily="sans-serif"
                        >
                          Y{p.year}
                        </text>
                      </g>
                    );
                  })}

                {/* Area Fills */}
                <path d={corpusAreaD} fill="url(#corpusGrad)" />
                <path d={investedAreaD} fill="url(#investedGrad)" />

                {/* Line Strokes */}
                <path
                  d={investedPathD}
                  fill="none"
                  stroke="var(--border-strong)"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />
                <path
                  d={corpusPathD}
                  fill="none"
                  stroke="var(--accent-gold)"
                  strokeWidth="3"
                />

                {/* Interactive Points on Hover */}
                {points.map((pt, idx) => (
                  <circle
                    key={idx}
                    cx={pt.x}
                    cy={pt.yCorpus}
                    r={hoveredPoint?.year === pt.year ? 6 : 3}
                    fill={hoveredPoint?.year === pt.year ? '#FFFFFF' : '#C5A059'}
                    stroke="#94712A"
                    strokeWidth={hoveredPoint?.year === pt.year ? 2.5 : 1}
                    style={{ cursor: 'pointer', transition: 'r 150ms ease' }}
                    onMouseEnter={() =>
                      setHoveredPoint({
                        year: pt.year,
                        invested: pt.cumulativeInvested,
                        corpus: pt.closingNominalCorpus,
                        x: pt.x,
                        y: pt.yCorpus,
                      })
                    }
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                ))}
              </svg>
            </div>

            {/* Hover Tooltip Readout */}
            <div
              style={{
                minHeight: '44px',
                marginTop: '1rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.82rem',
              }}
            >
              {hoveredPoint ? (
                <>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    Year {hoveredPoint.year} Horizon:
                  </span>
                  <span>Invested: <strong>{formatCurrency(hoveredPoint.invested)}</strong></span>
                  <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>
                    Corpus: {formatCurrency(hoveredPoint.corpus)}
                  </span>
                  <span style={{ color: 'var(--gain-green)', fontWeight: 600 }}>
                    Alpha: +{formatCurrency(hoveredPoint.corpus - hoveredPoint.invested)}
                  </span>
                </>
              ) : (
                <span style={{ color: 'var(--text-tertiary)' }}>
                  Hover over any yearly nodal marker on the curve to inspect precise intermediate capital accretion.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sensitivity Matrix (Toggleable) */}
      {showSensitivityMatrix && (
        <div className="meridian-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <span className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', letterSpacing: '0.12em' }}>
              STOCHASTIC VARIANCE ANALYSIS
            </span>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              2-Dimensional Sensitivity Matrix (CAGR vs. Tenure)
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Projected terminal corpus across differing return rates and holding horizons for {formatCurrency(params.monthlyAllocation)}/mo.
            </p>
          </div>

          <div className="meridian-table-container">
            <table className="meridian-table">
              <thead>
                <tr>
                  <th>CAGR \ Tenure</th>
                  {tenureRange.map((t) => (
                    <th key={t} style={{ textAlign: 'right' }}>
                      {t} Years
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cagrRange.map((r) => (
                  <tr key={r}>
                    <td style={{ fontWeight: 600, color: r === params.expectedCagr ? 'var(--text-gold)' : 'var(--text-primary)' }}>
                      {r.toFixed(1)}% p.a.
                    </td>
                    {tenureRange.map((t) => {
                      const simRes = calculateSipProjections({
                        ...params,
                        expectedCagr: r,
                        tenureYears: t,
                      });
                      const isCurrent = r === params.expectedCagr && t === params.tenureYears;
                      return (
                        <td
                          key={t}
                          style={{
                            textAlign: 'right',
                            backgroundColor: isCurrent ? 'var(--accent-gold-subtle)' : 'transparent',
                            fontWeight: isCurrent ? 700 : 500,
                            color: isCurrent ? 'var(--accent-gold)' : 'inherit',
                          }}
                        >
                          {formatCompactCurrency(simRes.terminalNominalCorpus)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detailed Milestone Progression Ledger */}
      <div className="meridian-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <span className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', letterSpacing: '0.12em' }}>
              ACTUARIAL CASH FLOW ACCOUNTING
            </span>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              Detailed Milestone Progression Ledger
            </h3>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
            Showing {results.progression.length} Continuous Yearly Intervals
          </div>
        </div>

        <div className="meridian-table-container">
          <table className="meridian-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Fiduciary Age</th>
                <th style={{ textAlign: 'right' }}>Monthly Capital</th>
                <th style={{ textAlign: 'right' }}>Annual Inflow</th>
                <th style={{ textAlign: 'right' }}>Cumulative Invested</th>
                <th style={{ textAlign: 'right' }}>Yearly Alpha</th>
                <th style={{ textAlign: 'right' }}>Closing Corpus</th>
                <th style={{ textAlign: 'right' }}>Real CPI Purchasing</th>
                <th style={{ textAlign: 'right' }}>Monthly Annuity (4%)</th>
              </tr>
            </thead>
            <tbody>
              {results.progression.map((m) => (
                <tr key={m.year}>
                  <td style={{ fontWeight: 600 }}>Year {m.year}</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>Age {m.ageHorizon}</td>
                  <td style={{ textAlign: 'right' }}>{formatCurrency(m.monthlyAllocation)}</td>
                  <td style={{ textAlign: 'right' }}>{formatCurrency(m.annualContribution)}</td>
                  <td style={{ textAlign: 'right' }}>{formatCurrency(m.cumulativeInvested)}</td>
                  <td style={{ textAlign: 'right', color: 'var(--gain-green)' }}>
                    +{formatCurrency(m.compoundInterestYear)}
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--accent-gold)' }}>
                    {formatCurrency(m.closingNominalCorpus)}
                  </td>
                  <td style={{ textAlign: 'right', color: 'var(--text-secondary)' }}>
                    {formatCurrency(m.inflationDeflatedPurchasingPower)}
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {formatCurrency(m.monthlyAnnuityYield)}/mo
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
