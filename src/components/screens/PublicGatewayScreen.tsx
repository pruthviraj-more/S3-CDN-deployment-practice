import React, { useState } from 'react';
import {
  Shield,
  ArrowRight,
  TrendingUp,
  Cpu,
  BookOpen,
  Sliders,
  CheckCircle2,
  XCircle,
  Lock,
  Layers,
  Award,
  Sparkles,
} from 'lucide-react';
import { ScreenId } from '../common/Header';
import { formatCurrency, formatCompactCurrency, formatPercent } from '../../utils/formatters';

interface PublicGatewayScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onRequestMandate: () => void;
  onOpenAuth: () => void;
}

export const PublicGatewayScreen: React.FC<PublicGatewayScreenProps> = ({
  onNavigate,
  onRequestMandate,
  onOpenAuth,
}) => {
  // Interactive Wealth Horizon Sandbox State
  const [sandboxPrincipal, setSandboxPrincipal] = useState<number>(2500000); // $2.5M
  const [sandboxMonthly, setSandboxMonthly] = useState<number>(25000); // $25k/mo
  const [sandboxCagr, setSandboxCagr] = useState<number>(11.5); // 11.5%
  const [sandboxYears, setSandboxYears] = useState<number>(20); // 20 years

  // Real-time calculation for sandbox
  const monthlyRate = Math.pow(1 + sandboxCagr / 100, 1 / 12) - 1;
  const totalMonths = sandboxYears * 12;
  const totalInvested = sandboxPrincipal + sandboxMonthly * totalMonths;

  // Lumpsum future value + monthly annuity future value
  const fvPrincipal = sandboxPrincipal * Math.pow(1 + sandboxCagr / 100, sandboxYears);
  const fvMonthlyAnnuity =
    monthlyRate > 0
      ? sandboxMonthly * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate)
      : sandboxMonthly * totalMonths;

  const terminalSandboxCorpus = Math.round(fvPrincipal + fvMonthlyAnnuity);
  const compoundAlpha = Math.max(0, terminalSandboxCorpus - totalInvested);
  const realPurchasingPower = Math.round(terminalSandboxCorpus / Math.pow(1 + 0.042, sandboxYears));
  const monthlySafeAnnuity = Math.round((terminalSandboxCorpus * 0.04) / 12);

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Editorial Hero Section */}
      <section
        style={{
          paddingTop: '4.5rem',
          paddingBottom: '4.5rem',
          borderBottom: '1px solid var(--border-light)',
          background: 'radial-gradient(ellipse at 50% 20%, rgba(197, 160, 89, 0.09) 0%, transparent 70%)',
        }}
      >
        <div className="meridian-container" style={{ textAlign: 'center', maxWidth: '980px' }}>
          {/* Sovereign Badge */}
          <div style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>
            <div className="badge-gold">
              <Shield size={13} />
              <span>Institutional Wealth & Intelligence Platform</span>
            </div>
          </div>

          {/* Majestic Editorial Title */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
              color: 'var(--text-primary)',
            }}
          >
            Where Sovereign Capital Meets <br />
            <span className="editorial-italic" style={{ color: 'var(--accent-gold)' }}>
              Mathematical Conviction.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              maxWidth: '780px',
              margin: '0 auto 2.5rem',
            }}
          >
            The unified terminal for family offices, sovereign wealth allocators, and quantitative actuaries.
            Eliminating retail heuristic approximations in favor of continuous compounding, intra-month day-count precision,
            and peer-reviewed macroeconomic telemetry.
          </p>

          {/* Dual Conversion Pathways */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '2.5rem',
            }}
          >
            <button
              onClick={() => onNavigate('dashboard')}
              className="btn-primary"
              style={{ padding: '0.85rem 1.85rem', fontSize: '0.96rem' }}
            >
              <span>Explore Platform Telemetry</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={onRequestMandate}
              className="btn-secondary"
              style={{ padding: '0.85rem 1.85rem', fontSize: '0.96rem' }}
            >
              <Shield size={16} />
              <span>Request Mandate Onboarding</span>
            </button>
          </div>

          <div style={{ fontSize: '0.84rem', color: 'var(--text-tertiary)' }}>
            Existing institutional mandate?{' '}
            <button
              onClick={onOpenAuth}
              style={{
                color: 'var(--text-gold)',
                fontWeight: 600,
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Authenticate via Dual-Factor Key
            </button>
          </div>
        </div>
      </section>

      {/* Sovereign Proof-Point Statistics */}
      <section
        style={{
          borderBottom: '1px solid var(--border-light)',
          backgroundColor: 'var(--bg-secondary)',
          padding: '2.5rem 0',
        }}
      >
        <div className="meridian-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
              textAlign: 'center',
            }}
          >
            <div>
              <div
                className="tabular-nums"
                style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
              >
                $4.82B+
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.2rem' }}>
                Tracked Capital Scope
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>
                Across 42 Tier-1 Family Offices
              </div>
            </div>

            <div>
              <div
                className="tabular-nums"
                style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}
              >
                99.8%
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.2rem' }}>
                Monte-Carlo Confidence
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>
                50,000 Stochastic Iterations
              </div>
            </div>

            <div>
              <div
                className="tabular-nums"
                style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
              >
                40-Year
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.2rem' }}>
                Proprietary Data Lake
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>
                Continuous Macroeconomic Series
              </div>
            </div>

            <div>
              <div
                className="tabular-nums"
                style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
              >
                14 Sovereign
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.2rem' }}>
                Central Banks Tracked
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>
                Sub-second Policy Guidance Feeds
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Three Fiduciary Pillars Showcase */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="meridian-container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <span className="crest-text" style={{ fontSize: '0.75rem', color: 'var(--text-gold)', letterSpacing: '0.15em' }}>
              THE TRI-FOLD ARCHITECTURE
            </span>
            <h2 style={{ fontSize: '2.2rem', marginTop: '0.5rem', marginBottom: '0.85rem' }}>
              The Three Fiduciary Pillars
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              A transcendent synthesis of mathematical calculation, real-time macroeconomic context, and peer-reviewed scholarly research.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {/* Pillar 1 */}
            <div className="meridian-card" style={{ padding: '2.25rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--accent-gold-light)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold)',
                  marginBottom: '1.5rem',
                }}
              >
                <Cpu size={22} />
              </div>
              <div className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
                PILLAR I · ACTUARIAL RIGOR
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>
                Precision Calculation Engines
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Continuous compounding, intra-month cash injection pacing, 30/360 bond day-count accounting, step-up escalation schedules, and real CPI deflation haircuts.
              </p>
              <button
                onClick={() => onNavigate('calculator_hub')}
                className="btn-ghost"
                style={{ padding: 0, color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.85rem' }}
              >
                <span>Launch Omni-Calculators</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Pillar 2 */}
            <div className="meridian-card" style={{ padding: '2.25rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--accent-gold-light)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold)',
                  marginBottom: '1.5rem',
                }}
              >
                <TrendingUp size={22} />
              </div>
              <div className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
                PILLAR II · MACRO CONTEXT
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>
                Sovereign Intelligence Terminal
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Real-time cross-asset telemetry, central bank rate decision probability meters, institutional flow filters, audio briefings, and sovereign debt wall tracking.
              </p>
              <button
                onClick={() => onNavigate('terminal')}
                className="btn-ghost"
                style={{ padding: 0, color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.85rem' }}
              >
                <span>Access Market Terminal</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Pillar 3 */}
            <div className="meridian-card" style={{ padding: '2.25rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--accent-gold-light)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold)',
                  marginBottom: '1.5rem',
                }}
              >
                <BookOpen size={22} />
              </div>
              <div className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
                PILLAR III · SCHOLARLY PROOF
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>
                Peer-Reviewed Research Library
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Monographs authored with Oxford & BIS fellows, verifiable Python/LaTeX notebooks, double-blind review protocols, and zero proprietary algorithmic black boxes.
              </p>
              <button
                onClick={() => onNavigate('research')}
                className="btn-ghost"
                style={{ padding: 0, color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.85rem' }}
              >
                <span>Review Scholarly Archive</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive "Wealth Horizon Sandbox" Test-Drive */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="meridian-container">
          <div style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto 3rem' }}>
            <div className="badge-gold" style={{ marginBottom: '0.75rem' }}>
              <Sliders size={13} />
              <span>Interactive Actuarial Sandbox</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>
              Test-Drive Sovereign Capital Horizon
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Adjust parameters below to experience immediate client-side continuous compounding calculations.
            </p>
          </div>

          <div
            className="meridian-card"
            style={{
              padding: '2.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
            }}
          >
            {/* Sliders Side */}
            <div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '1.75rem', color: 'var(--text-primary)' }}>
                Fiduciary Allocation Sliders
              </h3>

              {/* Slider 1: Initial Tranche */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.86rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Initial Sovereign Tranche:</span>
                  <span className="tabular-nums" style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>
                    {formatCurrency(sandboxPrincipal)}
                  </span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={25000000}
                  step={100000}
                  value={sandboxPrincipal}
                  onChange={(e) => setSandboxPrincipal(Number(e.target.value))}
                  className="meridian-slider"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  <span>$100k</span>
                  <span>$25M</span>
                </div>
              </div>

              {/* Slider 2: Monthly Accretion */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.86rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Monthly Systematic Accretion:</span>
                  <span className="tabular-nums" style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>
                    {formatCurrency(sandboxMonthly)}/mo
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={100000}
                  step={1000}
                  value={sandboxMonthly}
                  onChange={(e) => setSandboxMonthly(Number(e.target.value))}
                  className="meridian-slider"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  <span>$1,000/mo</span>
                  <span>$100,000/mo</span>
                </div>
              </div>

              {/* Slider 3: Expected Real CAGR */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.86rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Expected Portfolio CAGR:</span>
                  <span className="tabular-nums" style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>
                    {sandboxCagr.toFixed(1)}% p.a.
                  </span>
                </div>
                <input
                  type="range"
                  min={4.0}
                  max={24.0}
                  step={0.5}
                  value={sandboxCagr}
                  onChange={(e) => setSandboxCagr(Number(e.target.value))}
                  className="meridian-slider"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  <span>4.0% (Treasury TIPS)</span>
                  <span>24.0% (Private Tech Alpha)</span>
                </div>
              </div>

              {/* Slider 4: Time Horizon */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.86rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Dynastic Time Horizon:</span>
                  <span className="tabular-nums" style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>
                    {sandboxYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={35}
                  step={1}
                  value={sandboxYears}
                  onChange={(e) => setSandboxYears(Number(e.target.value))}
                  className="meridian-slider"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  <span>5 Years (Tactical)</span>
                  <span>35 Years (Dynasty Generation)</span>
                </div>
              </div>
            </div>

            {/* Actuarial Readout Side */}
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                padding: '2rem',
                border: '1px solid var(--border-gold)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', letterSpacing: '0.12em' }}>
                  PROJECTED SOVEREIGN HORIZON
                </span>
                <div
                  className="tabular-nums"
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    marginTop: '0.35rem',
                    marginBottom: '0.25rem',
                  }}
                >
                  {formatCurrency(terminalSandboxCorpus)}
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--gain-green)', fontWeight: 600 }}>
                  +{formatCurrency(compoundAlpha)} in Compound Geometric Alpha
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  padding: '1.25rem 0',
                  borderTop: '1px solid var(--border-subtle)',
                  borderBottom: '1px solid var(--border-subtle)',
                  margin: '1.5rem 0',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                    Total Committed Capital
                  </div>
                  <div className="tabular-nums" style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {formatCurrency(totalInvested)}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                    Purchasing Power (Real CPI)
                  </div>
                  <div className="tabular-nums" style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-gold)' }}>
                    {formatCurrency(realPurchasingPower)}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                    Dynastic Wealth Multiplier
                  </div>
                  <div className="tabular-nums" style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {(terminalSandboxCorpus / Math.max(1, totalInvested)).toFixed(2)}x
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                    Monthly Annuity Yield (4% SWR)
                  </div>
                  <div className="tabular-nums" style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--gain-green)' }}>
                    {formatCurrency(monthlySafeAnnuity)}/mo
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem' }}>
                <button
                  onClick={() => onNavigate('sip_studio')}
                  className="btn-primary"
                  style={{ flex: 1, fontSize: '0.88rem' }}
                >
                  <span>Open in Full SIP Studio</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "The Fiduciary Distinction" Matrix */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="meridian-container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
            <span className="crest-text" style={{ fontSize: '0.75rem', color: 'var(--text-gold)', letterSpacing: '0.15em' }}>
              CRITICAL ARCHITECTURAL DIFFERENCE
            </span>
            <h2 style={{ fontSize: '2.2rem', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
              The Fiduciary Distinction
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              How Meridian contrasts with retail gamified fintech portals and legacy institutional terminals.
            </p>
          </div>

          <div className="meridian-table-container">
            <table className="meridian-table">
              <thead>
                <tr>
                  <th style={{ width: '28%' }}>Analytical Dimension</th>
                  <th style={{ width: '36%', color: 'var(--loss-red)' }}>Standard Retail Consumer Fintech</th>
                  <th style={{ width: '36%', color: 'var(--accent-gold)' }}>Meridian Sovereign Platform</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600 }}>Day-Count Basis</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <XCircle size={15} color="#DC2626" />
                      <span>Crude 365-day APR heuristics; intra-month truncated</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle2 size={15} color="#059669" />
                      <span>Actual/365, Actual/360, and 30/360 Bond Basis selectable</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style={{ fontWeight: 600 }}>Compounding Formula</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <XCircle size={15} color="#DC2626" />
                      <span>Discrete annual approximations; lacks annual step-up</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle2 size={15} color="#059669" />
                      <span>Continuous geometric compounding with annual indexation</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style={{ fontWeight: 600 }}>Asset Privacy & Tracking</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <XCircle size={15} color="#DC2626" />
                      <span>Logs private financial assets; monetizes via affiliate credit</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle2 size={15} color="#059669" />
                      <span>Zero tracking; 100% deterministic client-side execution</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style={{ fontWeight: 600 }}>Inflation Deflation</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <XCircle size={15} color="#DC2626" />
                      <span>Displays nominal amounts only, masking currency debasement</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle2 size={15} color="#059669" />
                      <span>Real Fisher equation haircut + Gold parity equivalent</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style={{ fontWeight: 600 }}>Research & Provenance</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <XCircle size={15} color="#DC2626" />
                      <span>Sponsored blog listicles and promotional broker links</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle2 size={15} color="#059669" />
                      <span>Peer-reviewed monographs with reproducible Python/LaTeX proofs</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Institutional Compliance Guarantees Badges */}
      <section style={{ padding: '4rem 0' }}>
        <div className="meridian-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-card)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
              }}
            >
              <Award size={24} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '0.94rem', marginBottom: '0.25rem' }}>ISO 20252:2019 Certified</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Institutional market and financial research precision baseline.
                </p>
              </div>
            </div>

            <div
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-card)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
              }}
            >
              <Shield size={24} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '0.94rem', marginBottom: '0.25rem' }}>SOC2 Type II Assured</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Enterprise-grade organizational security and data integrity.
                </p>
              </div>
            </div>

            <div
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-card)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
              }}
            >
              <Lock size={24} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '0.94rem', marginBottom: '0.25rem' }}>256-Bit Cryptography</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Client-side non-custodial memory model with zero external leak.
                </p>
              </div>
            </div>

            <div
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-card)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
              }}
            >
              <Layers size={24} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '0.94rem', marginBottom: '0.25rem' }}>FINRA & SEC Aligned</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Strict compliance with fiduciary rule standards for institutional advisory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
