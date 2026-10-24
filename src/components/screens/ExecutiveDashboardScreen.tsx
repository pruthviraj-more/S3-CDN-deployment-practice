import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Download,
  BookOpen,
  Filter,
  Calculator,
  Compass,
  FileText,
  Sliders,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { ScreenId } from '../common/Header';
import { MACRO_KPIS, INSTITUTIONAL_MOVERS } from '../../data/marketData';
import { MACRO_DISPATCHES, LEAD_DISPATCH } from '../../data/newsData';
import { LEAD_MONOGRAPH } from '../../data/researchData';
import { NewsDispatch } from '../../types/market';
import { formatCurrency, formatPercent } from '../../utils/formatters';

interface ExecutiveDashboardScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onRequestMandate: () => void;
  onOpenMonograph: () => void;
}

export const ExecutiveDashboardScreen: React.FC<ExecutiveDashboardScreenProps> = ({
  onNavigate,
  onRequestMandate,
  onOpenMonograph,
}) => {
  // Simulator Widget State
  const [allocMonthly, setAllocMonthly] = useState<number>(35000);
  const [targetCagr, setTargetCagr] = useState<number>(12.0);
  const [horizonYears, setHorizonYears] = useState<number>(15);

  // Sector filter for dispatches
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Widget calculations
  const rMonth = Math.pow(1 + targetCagr / 100, 1 / 12) - 1;
  const nMonths = horizonYears * 12;
  const totalPrincipal = allocMonthly * nMonths;
  const fv =
    rMonth > 0
      ? allocMonthly * ((Math.pow(1 + rMonth, nMonths) - 1) / rMonth) * (1 + rMonth)
      : totalPrincipal;
  const terminalVal = Math.round(fv);
  const compoundGain = Math.max(0, terminalVal - totalPrincipal);
  const monthlySWR = Math.round((terminalVal * 0.04) / 12);

  // Filtered dispatches
  const filteredDispatches =
    selectedCategory === 'all'
      ? MACRO_DISPATCHES
      : MACRO_DISPATCHES.filter((d) => d.category === selectedCategory);

  return (
    <div className="meridian-container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      {/* Top Welcome & Fiduciary Scope */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '1.5rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid var(--border-light)',
          marginBottom: '2.5rem',
        }}
      >
        <div>
          <div className="badge-gold" style={{ marginBottom: '0.65rem' }}>
            <span>Authenticated Institutional Scope</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.75rem)', lineHeight: 1.15, color: 'var(--text-primary)' }}>
            Executive Dashboard & Market Portal
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', marginTop: '0.35rem' }}>
            Real-time macroeconomic telemetry, actuarial simulation widgets, and sovereign allocation briefings.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => onNavigate('sip_studio')} className="btn-secondary" style={{ fontSize: '0.86rem' }}>
            <Calculator size={15} />
            <span>Launch SIP Studio</span>
          </button>
          <button onClick={onRequestMandate} className="btn-primary" style={{ fontSize: '0.86rem' }}>
            <span>Review Mandate Scope</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Macro KPI Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}
      >
        {MACRO_KPIS.map((kpi) => (
          <div key={kpi.id} className="meridian-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                {kpi.label}
              </span>
              <span className="badge-neutral" style={{ fontSize: '0.68rem' }}>
                {kpi.badge}
              </span>
            </div>

            <div
              className="tabular-nums"
              style={{
                fontSize: '1.85rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                marginBottom: '0.35rem',
              }}
            >
              {kpi.value}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem' }}>
              <span
                style={{
                  color: kpi.isPositive ? 'var(--gain-green)' : 'var(--text-secondary)',
                  fontWeight: 600,
                }}
              >
                {kpi.deltaText}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>{kpi.benchmarkContext}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Accumulation Simulator + Featured Sovereign Dossier */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem',
        }}
      >
        {/* Interactive Accumulation Simulator Widget */}
        <div className="meridian-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <span className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', letterSpacing: '0.12em' }}>
                TACTILE ACTUARIAL SIMULATOR
              </span>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                Systematic Capital Accumulator
              </h3>
            </div>
            <button
              onClick={() => onNavigate('sip_studio')}
              className="btn-ghost"
              style={{ fontSize: '0.78rem', color: 'var(--accent-gold)' }}
            >
              Expand Studio →
            </button>
          </div>

          {/* Sliders in widget */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.75rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Monthly Capital Inflow:</span>
                <strong className="tabular-nums" style={{ color: 'var(--accent-gold)' }}>
                  {formatCurrency(allocMonthly)}/mo
                </strong>
              </div>
              <input
                type="range"
                min={5000}
                max={100000}
                step={2500}
                value={allocMonthly}
                onChange={(e) => setAllocMonthly(Number(e.target.value))}
                className="meridian-slider"
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Target Portfolio CAGR:</span>
                <strong className="tabular-nums" style={{ color: 'var(--accent-gold)' }}>
                  {targetCagr.toFixed(1)}% p.a.
                </strong>
              </div>
              <input
                type="range"
                min={5.0}
                max={22.0}
                step={0.5}
                value={targetCagr}
                onChange={(e) => setTargetCagr(Number(e.target.value))}
                className="meridian-slider"
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Tenure Horizon:</span>
                <strong className="tabular-nums" style={{ color: 'var(--accent-gold)' }}>
                  {horizonYears} Years
                </strong>
              </div>
              <input
                type="range"
                min={3}
                max={30}
                step={1}
                value={horizonYears}
                onChange={(e) => setHorizonYears(Number(e.target.value))}
                className="meridian-slider"
              />
            </div>
          </div>

          {/* Result Card */}
          <div
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-gold)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.85rem' }}>
              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                  Projected Terminal Corpus
                </div>
                <div
                  className="tabular-nums"
                  style={{
                    fontSize: '1.85rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {formatCurrency(terminalVal)}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                  Monthly Annuity (4% SWR)
                </div>
                <div className="tabular-nums" style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--gain-green)' }}>
                  {formatCurrency(monthlySWR)}/mo
                </div>
              </div>
            </div>

            {/* Proportion Bar */}
            <div style={{ height: '8px', borderRadius: '4px', backgroundColor: 'var(--bg-tertiary)', overflow: 'hidden', display: 'flex' }}>
              <div
                style={{
                  width: `${Math.min(100, Math.round((totalPrincipal / terminalVal) * 100))}%`,
                  backgroundColor: 'var(--border-strong)',
                }}
                title={`Principal: ${formatCurrency(totalPrincipal)}`}
              />
              <div
                style={{
                  flex: 1,
                  backgroundColor: 'var(--accent-gold)',
                }}
                title={`Compound Alpha: ${formatCurrency(compoundGain)}`}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-tertiary)', marginTop: '0.4rem' }}>
              <span>Principal: {formatCurrency(totalPrincipal)}</span>
              <span style={{ color: 'var(--text-gold)', fontWeight: 600 }}>Alpha: +{formatCurrency(compoundGain)}</span>
            </div>
          </div>
        </div>

        {/* Featured Sovereign Debt Macro Dossier */}
        <div
          className="meridian-card"
          style={{
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span className="badge-gold">Featured Sovereign Monograph</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                DOI: {LEAD_MONOGRAPH.doi}
              </span>
            </div>

            <h3 style={{ fontSize: '1.45rem', lineHeight: 1.25, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              {LEAD_MONOGRAPH.title}
            </h3>

            <p className="editorial-italic" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              {LEAD_MONOGRAPH.subtitle}
            </p>

            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              {LEAD_MONOGRAPH.abstract.slice(0, 240)}...
            </p>

            {/* Author Attribution */}
            <div
              style={{
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-light)',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                {LEAD_MONOGRAPH.leadAuthor.name}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-tertiary)' }}>
                {LEAD_MONOGRAPH.leadAuthor.chair} · {LEAD_MONOGRAPH.leadAuthor.institution}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.85rem' }}>
            <button
              onClick={onOpenMonograph}
              className="btn-primary"
              style={{ flex: 1, fontSize: '0.85rem' }}
            >
              <BookOpen size={15} />
              <span>Read Full Dossier ({LEAD_MONOGRAPH.pageCount}p)</span>
            </button>
            <button
              onClick={onOpenMonograph}
              className="btn-secondary"
              style={{ padding: '0.7rem 1rem' }}
              title="Download PDF Memo"
            >
              <Download size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* One-Click Launchpad Into Actuarial Suites */}
      <div style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <span className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', letterSpacing: '0.12em' }}>
              SPECIALIZED ACTUARIAL SUITES
            </span>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)' }}>
              Precision Computational Launchpad
            </h3>
          </div>
          <button
            onClick={() => onNavigate('calculator_hub')}
            className="btn-ghost"
            style={{ fontSize: '0.84rem', color: 'var(--accent-gold)' }}
          >
            View All 6 Engines →
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          <div
            onClick={() => onNavigate('sip_studio')}
            className="meridian-card"
            style={{ padding: '1.5rem', cursor: 'pointer' }}
          >
            <div style={{ color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>
              <Calculator size={22} />
            </div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.35rem' }}>SIP Projection Studio</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Step-up DCA curves, 30/360 bond day-counts, and PDF memo generation.
            </p>
          </div>

          <div
            onClick={() => onNavigate('calculator_hub')}
            className="meridian-card"
            style={{ padding: '1.5rem', cursor: 'pointer' }}
          >
            <div style={{ color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>
              <Layers size={22} />
            </div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.35rem' }}>Term Certificate Ladder</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Quarterly compounding, liquidity ladders, and duration spread optimization.
            </p>
          </div>

          <div
            onClick={() => onNavigate('calculator_hub')}
            className="meridian-card"
            style={{ padding: '1.5rem', cursor: 'pointer' }}
          >
            <div style={{ color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>
              <Compass size={22} />
            </div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.35rem' }}>FIRE & Dynasty Longevity</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Safe withdrawal rate stress testing and 100-year dynastic corpus sizing.
            </p>
          </div>

          <div
            onClick={() => onNavigate('calculator_hub')}
            className="meridian-card"
            style={{ padding: '1.5rem', cursor: 'pointer' }}
          >
            <div style={{ color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>
              <TrendingUp size={22} />
            </div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.35rem' }}>Real Return Neutralizer</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Fisher equation purchasing power haircut and physical gold parity.
            </p>
          </div>
        </div>
      </div>

      {/* Curated Macro Intelligence Dispatches */}
      <div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <div>
            <span className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', letterSpacing: '0.12em' }}>
              REAL-TIME MACRO INTELLIGENCE
            </span>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)' }}>
              Curated Sovereign Dispatches
            </h3>
          </div>

          {/* Sector Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {[
              { id: 'all', label: 'All Sectors' },
              { id: 'central_banks', label: 'Central Banks' },
              { id: 'private_credit', label: 'Private Credit' },
              { id: 'mega_cap_tech', label: 'Mega-Cap Tech' },
              { id: 'energy', label: 'Energy' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={selectedCategory === cat.id ? 'badge-gold' : 'badge-neutral'}
                style={{ cursor: 'pointer', padding: '0.35rem 0.75rem', fontSize: '0.76rem' }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dispatches Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {filteredDispatches.map((dispatch) => (
            <div
              key={dispatch.id}
              onClick={() => onNavigate('terminal')}
              className="meridian-card"
              style={{
                padding: '1.75rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="badge-neutral" style={{ fontSize: '0.7rem' }}>
                    {dispatch.categoryLabel}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {dispatch.timestamp}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.15rem', lineHeight: 1.3, marginBottom: '0.65rem', color: 'var(--text-primary)' }}>
                  {dispatch.title}
                </h4>

                <p style={{ fontSize: '0.86rem', lineHeight: 1.55, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  {dispatch.summary}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-light)',
                  fontSize: '0.78rem',
                }}
              >
                <span style={{ color: 'var(--text-tertiary)' }}>{dispatch.author.name}</span>
                <span style={{ color: 'var(--accent-gold)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <span>Read Brief</span>
                  <ChevronRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
