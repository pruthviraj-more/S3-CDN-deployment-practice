import React, { useState } from 'react';
import { X, Shield, ArrowRight, CheckCircle2, Lock, Building2 } from 'lucide-react';
import { MandateRequestForm, InvestorEntityType, MandateHorizon } from '../../types/mandate';
import { generateVerificationHash } from '../../utils/formatters';

interface MandateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (docketNumber: string) => void;
}

export const MandateModal: React.FC<MandateModalProps> = ({ isOpen, onClose, onSubmitSuccess }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedDocket, setSubmittedDocket] = useState<string | null>(null);

  const [formData, setFormData] = useState<MandateRequestForm>({
    institutionName: '',
    leadFiduciaryName: '',
    officialEmail: '',
    jurisdiction: 'Switzerland (Geneva / Zurich)',
    entityType: 'multi_family_office',
    targetAumRange: '$50M – $250M Institutional Scope',
    horizon: 'generational_dynasty_30y',
    primaryObjective: 'Generational Purchasing Power Preservation and Real Yield Maximization',
    accreditedConfirmation: true,
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const docket = `MND-${Math.floor(100000 + Math.random() * 900000)}`;
      setIsSubmitting(false);
      setSubmittedDocket(docket);
      onSubmitSuccess?.(docket);
    }, 800);
  };

  const handleReset = () => {
    setSubmittedDocket(null);
    setStep(1);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        {/* Header */}
        <div
          style={{
            padding: '1.5rem 2rem',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-secondary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-gold)',
              }}
            >
              <Building2 size={16} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                Institutional Mandate Request
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
                Confidential Fiduciary Onboarding · Non-Custodial Sovereign Allocation
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn-ghost" style={{ padding: '0.4rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '2rem' }}>
          {submittedDocket ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--gain-green-bg)',
                  border: '1px solid var(--gain-green-border)',
                  color: 'var(--gain-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                Mandate Docket Established
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
                Your institutional onboarding dossier has been cryptographically cataloged. A senior fiduciary partner from Meridian Sovereign Advisory will initiate direct encrypted contact within 4 business hours.
              </p>

              <div
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  maxWidth: '460px',
                  margin: '0 auto 2rem',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>DOCKET REFERENCE:</span>
                  <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-gold)' }}>{submittedDocket}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>ALLOCATOR ENTITY:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{formData.institutionName || 'Sovereign Family Office'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>CRYPTOGRAPHIC SEAL:</span>
                  <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    {generateVerificationHash(submittedDocket)}
                  </code>
                </div>
              </div>

              <button onClick={handleReset} className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
                <span>Return to Platform</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Stepper Indicator */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem' }}>
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    style={{
                      flex: 1,
                      height: '4px',
                      borderRadius: '2px',
                      backgroundColor: step >= s ? 'var(--accent-gold)' : 'var(--bg-tertiary)',
                      transition: 'background-color 200ms ease',
                    }}
                  />
                ))}
              </div>

              {step === 1 && (
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--text-gold)' }}>
                    Step 1: Institutional Allocator Profile
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                        Institution or Family Office Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.institutionName}
                        onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                        placeholder="e.g. Vance Family Trust & Endowment"
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.85rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-subtle)',
                          backgroundColor: 'var(--bg-card)',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                        Lead Fiduciary / Principal Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.leadFiduciaryName}
                        onChange={(e) => setFormData({ ...formData, leadFiduciaryName: e.target.value })}
                        placeholder="e.g. Lord Alistair Vance, CIO"
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.85rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-subtle)',
                          backgroundColor: 'var(--bg-card)',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                        Official Institutional Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.officialEmail}
                        onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                        placeholder="fiduciary@familyoffice.ch"
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.85rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-subtle)',
                          backgroundColor: 'var(--bg-card)',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                        Primary Fiduciary Jurisdiction
                      </label>
                      <select
                        value={formData.jurisdiction}
                        onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.85rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-subtle)',
                          backgroundColor: 'var(--bg-card)',
                        }}
                      >
                        <option value="Switzerland (Geneva / Zurich)">Switzerland (Geneva / Zurich)</option>
                        <option value="United Kingdom (London City)">United Kingdom (London City)</option>
                        <option value="United States (Delaware / NY)">United States (Delaware / NY)</option>
                        <option value="Singapore / DIFC Dubai">Singapore / DIFC Dubai</option>
                        <option value="Liechtenstein / Monaco">Liechtenstein / Monaco</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Entity Governance Structure
                    </label>
                    <select
                      value={formData.entityType}
                      onChange={(e) => setFormData({ ...formData, entityType: e.target.value as InvestorEntityType })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        backgroundColor: 'var(--bg-card)',
                      }}
                    >
                      <option value="multi_family_office">Multi-Family Office (MFO)</option>
                      <option value="single_family_office">Single Family Office (SFO)</option>
                      <option value="sovereign_wealth_fund">Sovereign Wealth Fund / Allocator</option>
                      <option value="endowment_foundation">Endowment or University Foundation</option>
                      <option value="hnw_individual">Discerning UHNW Individual Principal</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      disabled={!formData.institutionName || !formData.officialEmail}
                      onClick={() => setStep(2)}
                      className="btn-primary"
                    >
                      <span>Proceed to Allocation Scope</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--text-gold)' }}>
                    Step 2: Allocation Mandate & Horizon
                  </h4>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Target Capital Scope Under Advisory
                    </label>
                    <select
                      value={formData.targetAumRange}
                      onChange={(e) => setFormData({ ...formData, targetAumRange: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        backgroundColor: 'var(--bg-card)',
                      }}
                    >
                      <option value="$10M – $50M Tier 1 Mandate">$10M – $50M Tier 1 Mandate</option>
                      <option value="$50M – $250M Institutional Scope">$50M – $250M Institutional Scope</option>
                      <option value="$250M – $1B Sovereign Mandate">$250M – $1B Sovereign Mandate</option>
                      <option value="$1B+ Sovereign Wealth Scope">$1B+ Sovereign Wealth Scope</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Fiduciary Investment Horizon
                    </label>
                    <select
                      value={formData.horizon}
                      onChange={(e) => setFormData({ ...formData, horizon: e.target.value as MandateHorizon })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        backgroundColor: 'var(--bg-card)',
                      }}
                    >
                      <option value="generational_dynasty_30y">Generational Dynasty (30-Year Horizon)</option>
                      <option value="perpetual_endowment">Perpetual Endowment (Infinite Real Capital Preservation)</option>
                      <option value="intermediate_growth">Intermediate Sovereign Growth (10–15 Years)</option>
                      <option value="short_term_liquidity">Tactical Liquid Reserves (3–5 Years)</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Primary Fiduciary Objective
                    </label>
                    <textarea
                      rows={3}
                      value={formData.primaryObjective}
                      onChange={(e) => setFormData({ ...formData, primaryObjective: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        backgroundColor: 'var(--bg-card)',
                        resize: 'none',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button type="button" onClick={() => setStep(1)} className="btn-secondary">
                      Back
                    </button>
                    <button type="button" onClick={() => setStep(3)} className="btn-primary">
                      <span>Fiduciary Attestation</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--text-gold)' }}>
                    Step 3: Fiduciary Attestation & Non-Custodial Agreement
                  </h4>

                  <div
                    style={{
                      background: 'var(--bg-secondary)',
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.84rem',
                      lineHeight: 1.6,
                      color: 'var(--text-secondary)',
                      marginBottom: '1.5rem',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                      <Lock size={15} style={{ color: 'var(--accent-gold)' }} />
                      <span>Non-Custodial Architecture & Zero-Tracking Guarantee</span>
                    </div>
                    By submitting this mandate onboarding request, you certify that the entity qualifies as an Institutional Investor, Accredited Allocator, or Qualified Purchaser under applicable international regulations. Meridian acts purely as an analytical calculation engine and research intelligence provider with zero asset custody.
                  </div>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      cursor: 'pointer',
                      fontSize: '0.86rem',
                      marginBottom: '1.75rem',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.accreditedConfirmation}
                      onChange={(e) => setFormData({ ...formData, accreditedConfirmation: e.target.checked })}
                      style={{ marginTop: '0.2rem' }}
                    />
                    <span>
                      I affirm that I am authorized to represent the designated family office or sovereign institution, and request confidential transmission of the Meridian Mandate Dossier.
                    </span>
                  </label>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button type="button" onClick={() => setStep(2)} className="btn-secondary">
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.accreditedConfirmation}
                      className="btn-primary"
                      style={{ minWidth: '180px' }}
                    >
                      {isSubmitting ? (
                        <span>Sealing Mandate...</span>
                      ) : (
                        <>
                          <Shield size={16} />
                          <span>Submit Sovereign Mandate</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
