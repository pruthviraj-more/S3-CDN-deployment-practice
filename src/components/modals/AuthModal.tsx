import React, { useState } from 'react';
import { X, Lock, KeyRound, ShieldCheck, ArrowRight } from 'lucide-react';
import { ClientSession } from '../../types/mandate';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (session: ClientSession) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [identifier, setIdentifier] = useState('ALLOCATOR_GENEVA_VANCE');
  const [passphrase, setPassphrase] = useState('••••••••••••••••');
  const [totpCode, setTotpCode] = useState('');
  const [selectedRole, setSelectedRole] = useState<'Lord Beneficiary' | 'Chief Investment Officer'>('Lord Beneficiary');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleQuickLogin = (role: 'Lord Beneficiary' | 'Chief Investment Officer') => {
    setSelectedRole(role);
    setTotpCode('849201');
    setTimeout(() => {
      onLoginSuccess({
        isAuthenticated: true,
        accountIdentifier: role === 'Lord Beneficiary' ? 'GENEVA_VANCE_SFO' : 'GLOBAL_ALLOCATOR_CIO',
        entityName: role === 'Lord Beneficiary' ? 'The Vance Family Dynasty Trust' : 'Sovereign Endowment Reserve',
        role: role,
        twoFactorVerified: true,
        lastLoginUtc: new Date().toISOString(),
        allocatedMandateUsd: role === 'Lord Beneficiary' ? 385000000 : 1240000000,
      });
      onClose();
    }, 400);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!totpCode || totpCode.length < 6) {
      setError('Please provide a valid 6-digit hardware TOTP security code.');
      return;
    }

    onLoginSuccess({
      isAuthenticated: true,
      accountIdentifier: identifier,
      entityName: 'Vance Sovereign Capital Mandate',
      role: selectedRole,
      twoFactorVerified: true,
      lastLoginUtc: new Date().toISOString(),
      allocatedMandateUsd: 420000000,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        {/* Header */}
        <div
          style={{
            padding: '1.5rem 1.75rem',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-secondary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
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
              <Lock size={16} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                Institutional Dual-Factor Access
              </h3>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>
                FIDO2 HSM Cryptographic Fiduciary Authentication
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn-ghost" style={{ padding: '0.4rem' }}>
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '1.75rem' }}>
          {/* Quick Demo Selector */}
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--accent-gold-subtle)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-gold)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Instant Demo Authentication (Select Role):
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button
                type="button"
                onClick={() => handleQuickLogin('Lord Beneficiary')}
                className="btn-primary"
                style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem 0.6rem' }}
              >
                <span>Lord Beneficiary</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('Chief Investment Officer')}
                className="btn-secondary"
                style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem 0.6rem' }}
              >
                <span>CIO Allocator</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleVerify}>
            <div style={{ marginBottom: '1.15rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Sovereign Entity Identifier
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-card)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.88rem',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.15rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Fiduciary Master Passphrase
              </label>
              <input
                type="password"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-card)',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                  Hardware TOTP / Security Token (6 Digits)
                </label>
                <button
                  type="button"
                  onClick={() => setTotpCode('849201')}
                  style={{ fontSize: '0.74rem', color: 'var(--text-gold)', textDecoration: 'underline' }}
                >
                  Autofill token: 849201
                </button>
              </div>
              <input
                type="text"
                maxLength={6}
                value={totpCode}
                onChange={(e) => {
                  setError(null);
                  setTotpCode(e.target.value.replace(/\D/g, ''));
                }}
                placeholder="000000"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-gold)',
                  backgroundColor: 'var(--bg-card)',
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.4rem',
                  letterSpacing: '0.35em',
                  color: 'var(--text-gold)',
                  fontWeight: 700,
                }}
              />
              {error && (
                <div style={{ color: 'var(--loss-red)', fontSize: '0.78rem', marginTop: '0.35rem' }}>
                  {error}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
              <ShieldCheck size={14} style={{ color: 'var(--gain-green)' }} />
              <span>Session encrypted with TLS 1.3 & AES-256 HSM keys</span>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.8rem' }}>
              <KeyRound size={16} />
              <span>Verify & Authorize Session</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
