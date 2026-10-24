import React from 'react';
import { X, Printer, Download, Shield, CheckCircle } from 'lucide-react';
import { SipParameters, SipCalculationResult } from '../../types/financial';
import { formatCurrency, formatPercent } from '../../utils/formatters';

interface WealthMemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  params: SipParameters;
  results: SipCalculationResult;
}

export const WealthMemoModal: React.FC<WealthMemoModalProps> = ({
  isOpen,
  onClose,
  params,
  results,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const keyMilestones = results.progression.filter(
    (m) => m.year === 1 || m.year % 5 === 0 || m.year === params.tenureYears
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '850px', backgroundColor: '#FFFFFF', color: '#111827' }}
      >
        {/* Actions bar (hidden in print) */}
        <div
          className="no-print"
          style={{
            padding: '1rem 1.75rem',
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F9FAFB',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#4B5563' }}>
            <Shield size={16} color="#B58F45" />
            <span>Fiduciary Wealth Memo · Ready for Institutional Print / PDF Export</span>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <button
              onClick={handlePrint}
              className="btn-primary"
              style={{ fontSize: '0.82rem', padding: '0.45rem 0.95rem' }}
            >
              <Printer size={15} />
              <span>Print / Save as PDF</span>
            </button>
            <button onClick={onClose} className="btn-ghost" style={{ padding: '0.4rem', color: '#4B5563' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div style={{ padding: '2.5rem 3rem' }}>
          {/* Header Monogram & Reference */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              borderBottom: '2px solid #C5A059',
              paddingBottom: '1.25rem',
              marginBottom: '2rem',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'Cinzel, Georgia, serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#111827',
                }}
              >
                MERIDIAN FINANCE
              </div>
              <div
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#94712A',
                  fontWeight: 600,
                }}
              >
                Institutional Wealth Advisory & Actuarial Modeling Memo
              </div>
            </div>

            <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#4B5563', fontFamily: 'monospace' }}>
              <div>REF: MEMO-2026-ACT-{Math.floor(1000 + Math.random() * 9000)}</div>
              <div>DATE: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
              <div>STATUS: CONFIDENTIAL / FIDUCIARY</div>
            </div>
          </div>

          {/* Subject Block */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: '#111827', marginBottom: '0.35rem' }}>
              Actuarial Wealth Projection & Capital Accumulation Model
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#4B5563' }}>
              Prepared for: <strong>Sovereign Multi-Family Office / Fiduciary Allocator</strong>
            </p>
          </div>

          {/* Parameters Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              padding: '1.25rem',
              backgroundColor: '#F9FAFB',
              border: '1px solid #E5E7EB',
              borderRadius: '6px',
              marginBottom: '2rem',
              fontSize: '0.85rem',
            }}
          >
            <div>
              <div style={{ color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase' }}>Initial Monthly Inflow</div>
              <strong style={{ fontSize: '1.05rem', color: '#111827' }}>{formatCurrency(params.monthlyAllocation)}/mo</strong>
            </div>
            <div>
              <div style={{ color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase' }}>Target Geometric CAGR</div>
              <strong style={{ fontSize: '1.05rem', color: '#111827' }}>{formatPercent(params.expectedCagr)}</strong>
            </div>
            <div>
              <div style={{ color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase' }}>Investment Tenure</div>
              <strong style={{ fontSize: '1.05rem', color: '#111827' }}>{params.tenureYears} Years</strong>
            </div>
            <div>
              <div style={{ color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase' }}>Annual Step-Up Index</div>
              <strong style={{ fontSize: '1.05rem', color: '#111827' }}>+{formatPercent(params.annualStepUpPercent)} p.a.</strong>
            </div>
            <div>
              <div style={{ color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase' }}>Inflation Deflator (CPI)</div>
              <strong style={{ fontSize: '1.05rem', color: '#111827' }}>{formatPercent(params.inflationHaircutPercent)} Haircut</strong>
            </div>
            <div>
              <div style={{ color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase' }}>Day-Count Basis</div>
              <strong style={{ fontSize: '1.05rem', color: '#111827' }}>{params.dayCount.replace('_', '/')}</strong>
            </div>
          </div>

          {/* Actuarial Hero Outcome */}
          <div
            style={{
              padding: '1.75rem',
              border: '1px solid #C5A059',
              borderRadius: '8px',
              backgroundColor: '#FCFAF5',
              marginBottom: '2rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.5rem',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Total Invested Capital
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827' }}>
                {formatCurrency(results.totalInvestedPrincipal)}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Compound Alpha Generated
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#059669' }}>
                {formatCurrency(results.totalCompoundAlpha)}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: '#94712A', textTransform: 'uppercase', marginBottom: '0.25rem', fontWeight: 600 }}>
                Terminal Nominal Corpus
              </div>
              <div style={{ fontSize: '1.55rem', fontWeight: 700, color: '#94712A' }}>
                {formatCurrency(results.terminalNominalCorpus)}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Monthly SWR Annuity (4%)
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827' }}>
                {formatCurrency(results.monthlyAnnuityYield)}/mo
              </div>
            </div>
          </div>

          {/* Milestone Progression Table */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94712A', marginBottom: '0.75rem' }}>
              Strategic Milestones Horizon
            </h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E7EB', backgroundColor: '#F3F4F6' }}>
                  <th style={{ padding: '0.65rem 0.85rem', textAlign: 'left' }}>Horizon</th>
                  <th style={{ padding: '0.65rem 0.85rem', textAlign: 'right' }}>Monthly Capital</th>
                  <th style={{ padding: '0.65rem 0.85rem', textAlign: 'right' }}>Cumulative Invested</th>
                  <th style={{ padding: '0.65rem 0.85rem', textAlign: 'right' }}>Closing Corpus</th>
                  <th style={{ padding: '0.65rem 0.85rem', textAlign: 'right' }}>Real Purchasing Power</th>
                </tr>
              </thead>
              <tbody>
                {keyMilestones.map((m) => (
                  <tr key={m.year} style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '0.65rem 0.85rem', fontWeight: 600 }}>Year {m.year}</td>
                    <td style={{ padding: '0.65rem 0.85rem', textAlign: 'right' }}>{formatCurrency(m.monthlyAllocation)}</td>
                    <td style={{ padding: '0.65rem 0.85rem', textAlign: 'right' }}>{formatCurrency(m.cumulativeInvested)}</td>
                    <td style={{ padding: '0.65rem 0.85rem', textAlign: 'right', fontWeight: 700, color: '#94712A' }}>
                      {formatCurrency(m.closingNominalCorpus)}
                    </td>
                    <td style={{ padding: '0.65rem 0.85rem', textAlign: 'right', color: '#059669' }}>
                      {formatCurrency(m.inflationDeflatedPurchasingPower)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sign-off Signatures */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid #E5E7EB',
              fontSize: '0.8rem',
              color: '#4B5563',
            }}
          >
            <div>
              <div style={{ height: '40px', borderBottom: '1px solid #9CA3AF', marginBottom: '0.5rem' }}></div>
              <div style={{ fontWeight: 600, color: '#111827' }}>Chief Investment Officer / Fiduciary Principal</div>
              <div>Meridian Sovereign Advisory Division</div>
            </div>
            <div>
              <div style={{ height: '40px', borderBottom: '1px solid #9CA3AF', marginBottom: '0.5rem' }}></div>
              <div style={{ fontWeight: 600, color: '#111827' }}>Senior Actuarial Fellow (FIA / FSA)</div>
              <div>Quantitative Risk & Day-Count Certification</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
