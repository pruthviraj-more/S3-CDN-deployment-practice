import React, { useState, useEffect } from 'react';
import { Sun, Moon, Shield, Lock, Menu, X, ArrowUpRight, UserCheck } from 'lucide-react';
import { ClientSession } from '../../types/mandate';

export type ScreenId = 'gateway' | 'dashboard' | 'calculator_hub' | 'sip_studio' | 'terminal' | 'research';

interface HeaderProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  session: ClientSession;
  onRequestMandate: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onNavigate,
  theme,
  onToggleTheme,
  session,
  onRequestMandate,
  onOpenAuth,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(
        now.toUTCString().replace('GMT', 'UTC').split(' ').slice(4, 5)[0] + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems: { id: ScreenId; label: string; tag?: string }[] = [
    { id: 'gateway', label: 'Gateway' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'calculator_hub', label: 'Omni-Calculators' },
    { id: 'sip_studio', label: 'SIP Studio', tag: 'Actuarial' },
    { id: 'terminal', label: 'Global Terminal' },
    { id: 'research', label: 'Research Library' },
  ];

  return (
    <header
      className="frosted-surface no-print"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      <div
        className="meridian-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4.5rem',
        }}
      >
        {/* Brand Crest & Monogram */}
        <div
          onClick={() => onNavigate('gateway')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          {/* Gold Sovereign Crest */}
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #1C1F28 0%, #0E1017 100%)',
              border: '1px solid var(--border-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(197, 160, 89, 0.25)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 100 100" fill="none">
              <path d="M25 75 L50 22 L75 75 L62 75 L50 48 L38 75 Z" fill="#C5A059" />
              <circle cx="50" cy="30" r="5" fill="#E8D09A" />
            </svg>
          </div>

          <div>
            <div
              className="crest-text"
              style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.1,
              }}
            >
              MERIDIAN
            </div>
            <div
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--text-gold)',
                fontWeight: 600,
              }}
            >
              Institutional Finance
            </div>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '0.25rem',
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={{
                  position: 'relative',
                  padding: '0.55rem 0.95rem',
                  fontSize: '0.86rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isActive ? 'var(--accent-gold-subtle)' : 'transparent',
                  border: isActive ? '1px solid var(--border-gold)' : '1px solid transparent',
                  transition: 'all var(--trans-fast)',
                }}
              >
                {item.label}
                {item.tag && (
                  <span
                    style={{
                      marginLeft: '0.45rem',
                      fontSize: '0.62rem',
                      padding: '0.1rem 0.35rem',
                      borderRadius: '4px',
                      backgroundColor: 'var(--accent-gold)',
                      color: '#FFFFFF',
                      fontWeight: 700,
                    }}
                  >
                    {item.tag}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Global Utilities & CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Live UTC Telemetry indicator */}
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.74rem',
              color: 'var(--text-tertiary)',
              borderRight: '1px solid var(--border-subtle)',
              paddingRight: '0.85rem',
            }}
            className="tabular-nums telemetry-badge"
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
            <span>{utcTime}</span>
          </div>

          {/* Theme Toggle (Alabaster / Obsidian) */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle visual theme"
            className="btn-ghost"
            style={{
              width: '36px',
              height: '36px',
              padding: 0,
              borderRadius: '50%',
              border: '1px solid var(--border-light)',
            }}
            title={theme === 'light' ? 'Switch to Obsidian Dark' : 'Switch to Alabaster Haute Light'}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* Auth Session Status */}
          {session.isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={onLogout}
                className="badge-gold"
                style={{ cursor: 'pointer', padding: '0.4rem 0.8rem' }}
                title="Click to terminate session"
              >
                <UserCheck size={13} />
                <span>{session.role}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="btn-secondary login-btn-header"
              style={{
                fontSize: '0.82rem',
                padding: '0.45rem 0.85rem',
                display: 'none',
              }}
            >
              <Lock size={13} />
              <span>Log In</span>
            </button>
          )}

          {/* Mandate Request Button */}
          <button
            onClick={onRequestMandate}
            className="btn-primary"
            style={{
              fontSize: '0.82rem',
              padding: '0.48rem 1rem',
            }}
          >
            <span>Request Mandate</span>
            <ArrowUpRight size={14} />
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-ghost mobile-menu-btn"
            style={{
              display: 'none',
              padding: '0.4rem',
            }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-gold)',
            padding: '1rem 1.5rem 1.5rem',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  fontSize: '0.95rem',
                  fontWeight: activeScreen === item.id ? 600 : 500,
                  color: activeScreen === item.id ? 'var(--accent-gold)' : 'var(--text-primary)',
                  backgroundColor: activeScreen === item.id ? 'var(--accent-gold-subtle)' : 'transparent',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                {item.label}
              </button>
            ))}

            <div style={{ paddingTop: '0.8rem', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '0.8rem' }}>
              {!session.isAuthenticated && (
                <button
                  onClick={() => {
                    onOpenAuth();
                    setMobileMenuOpen(false);
                  }}
                  className="btn-secondary"
                  style={{ flex: 1, fontSize: '0.85rem' }}
                >
                  <Lock size={14} />
                  <span>Client Login</span>
                </button>
              )}
              <button
                onClick={() => {
                  onRequestMandate();
                  setMobileMenuOpen(false);
                }}
                className="btn-primary"
                style={{ flex: 1, fontSize: '0.85rem' }}
              >
                <span>Request Mandate</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline styles for media query visibility */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
          .telemetry-badge { display: flex !important; }
          .login-btn-header { display: inline-flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 991px) {
          .mobile-menu-btn { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
};
