import React from 'react';
import { Shield, Lock, CheckCircle2, Award, FileText, ExternalLink } from 'lucide-react';
import { ScreenId } from './Header';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
  onRequestMandate: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onRequestMandate }) => {
  return (
    <footer
      className="no-print"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        marginTop: '6rem',
        paddingTop: '4rem',
        paddingBottom: '3.5rem',
      }}
    >
      <div className="meridian-container">
        {/* Top Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          {/* Brand Column */}
          <div style={{ maxWidth: '360px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  backgroundColor: '#12151C',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 100 100" fill="none">
                  <path d="M25 75 L50 22 L75 75 L62 75 L50 48 L38 75 Z" fill="#C5A059" />
                  <circle cx="50" cy="30" r="5" fill="#E8D09A" />
                </svg>
              </div>
              <span className="crest-text" style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                MERIDIAN FINANCE
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Where sovereign capital meets mathematical conviction. Precision actuarial calculation engines, central bank macroeconomic telemetry, and peer-reviewed scholarly finance monographs.
            </p>
            <div className="badge-gold">
              <Shield size={12} />
              <span>Strict Non-Custodial Architecture</span>
            </div>
          </div>

          {/* Fiduciary Pillars */}
          <div>
            <h4 style={{ fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-gold)', marginBottom: '1.25rem', fontWeight: 600 }}>
              Platform Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
              <li>
                <button onClick={() => onNavigate('gateway')} className="btn-ghost" style={{ padding: 0 }}>
                  Public Sovereign Gateway
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="btn-ghost" style={{ padding: 0 }}>
                  Executive Market Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('calculator_hub')} className="btn-ghost" style={{ padding: 0 }}>
                  Omni-Calculator Hub (6 Engines)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sip_studio')} className="btn-ghost" style={{ padding: 0 }}>
                  SIP & Wealth Projection Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terminal')} className="btn-ghost" style={{ padding: 0 }}>
                  Global Markets & Macro Terminal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('research')} className="btn-ghost" style={{ padding: 0 }}>
                  Peer-Reviewed Research Library
                </button>
              </li>
            </ul>
          </div>

          {/* Actuarial Modules */}
          <div>
            <h4 style={{ fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-gold)', marginBottom: '1.25rem', fontWeight: 600 }}>
              Precision Engines
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li>Step-Up Compounding (Annual Escalation)</li>
              <li>Term Certificate & FD Laddering</li>
              <li>FIRE & Dynastic Longevity Sizing</li>
              <li>Single-Tranche Lumpsum Regimes</li>
              <li>Institutional 30/360 Debt Amortization</li>
              <li>Fisher Real Return & Gold Deflator</li>
            </ul>
          </div>

          {/* Institutional Compliance */}
          <div>
            <h4 style={{ fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-gold)', marginBottom: '1.25rem', fontWeight: 600 }}>
              Fiduciary Guarantees
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--gain-green)' }} />
                <span>Zero Private Financial Asset Logging</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--gain-green)' }} />
                <span>Deterministic Client-Side Calculations</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--gain-green)' }} />
                <span>ISO 20252 & SOC2 Type II Aligned</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--gain-green)' }} />
                <span>SEC Rule 206(4)-1 Fiduciary Standard</span>
              </div>

              <button
                onClick={onRequestMandate}
                className="btn-primary"
                style={{ marginTop: '0.75rem', fontSize: '0.84rem', padding: '0.6rem 1rem' }}
              >
                <span>Request Mandate Dossier</span>
              </button>
            </div>
          </div>
        </div>

        {/* Fiduciary Disclaimers */}
        <div style={{ paddingTop: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-light)' }}>
          <p style={{ fontSize: '0.75rem', lineHeight: 1.6, color: 'var(--text-tertiary)' }}>
            <strong>Institutional Fiduciary Disclosure:</strong> Meridian Finance provides analytical calculation engines, macroeconomic telemetry, and scholarly research for qualified institutional allocators, multi-family offices, and accredited investors. Calculations utilize mathematical formulations including continuous compounding, geometric progression, and day-count conventions (Actual/365, Actual/360, 30/360 Bond Basis). Past performance and simulated Monte Carlo projections do not guarantee future returns. Meridian operates under a strict non-custodial model and does not store, broker, or transmit client capital.
          </p>
        </div>

        {/* Bottom Integrity Bar */}
        <div
          style={{
            paddingTop: '1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.78rem',
            color: 'var(--text-tertiary)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Meridian Finance Platform Ltd. All sovereign rights reserved.
          </div>
          <div className="tabular-nums" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span>INTEGRITY HASH:</span>
            <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-gold)', background: 'var(--bg-tertiary)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              0x9E7D3B29::MERIDIAN_GENESIS
            </code>
          </div>
        </div>
      </div>
    </footer>
  );
};
