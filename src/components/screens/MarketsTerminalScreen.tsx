import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Calendar,
  Mail,
  Shield,
  CheckCircle,
  Filter,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Share2,
} from 'lucide-react';
import {
  GLOBAL_TICKERS,
  INSTITUTIONAL_MOVERS,
  CENTRAL_BANK_EVENTS,
} from '../../data/marketData';
import { LEAD_DISPATCH, MACRO_DISPATCHES } from '../../data/newsData';
import { NewsDispatch } from '../../types/market';
import { generateVerificationHash } from '../../utils/formatters';

export const MarketsTerminalScreen: React.FC = () => {
  // Audio Player State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioPlaybackSpeed, setAudioPlaybackSpeed] = useState<'1.0x' | '1.25x' | '1.5x'>('1.0x');
  const [audioProgress, setAudioProgress] = useState(32); // percentage

  // Category Filter
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Newsletter Subscription State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribedHash, setSubscribedHash] = useState<string | null>(null);

  // Active Dispatch View Modal / Expanded
  const [activeArticle, setActiveArticle] = useState<NewsDispatch>(LEAD_DISPATCH);

  useEffect(() => {
    let timer: number;
    if (isPlayingAudio) {
      timer = window.setInterval(() => {
        setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 600);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      const hash = generateVerificationHash(newsletterEmail);
      setSubscribedHash(hash);
    }
  };

  const filteredDispatches =
    selectedCategory === 'all'
      ? MACRO_DISPATCHES
      : MACRO_DISPATCHES.filter((d) => d.category === selectedCategory);

  return (
    <div className="meridian-container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      {/* Terminal Title */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div className="badge-gold" style={{ marginBottom: '0.65rem' }}>
          <span>Institutional Telemetry Feed</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.75rem)', lineHeight: 1.15, color: 'var(--text-primary)' }}>
          Global Markets & Macro News Terminal
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', marginTop: '0.35rem' }}>
          Cross-asset sovereign flows, central bank rate probabilities, and encrypted editorial intelligence.
        </p>
      </div>

      {/* Asset Overview Directional Tiles */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2.5rem',
        }}
      >
        {GLOBAL_TICKERS.slice(0, 5).map((t) => {
          const isPos = t.changePercent >= 0;
          return (
            <div key={t.id} className="meridian-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {t.symbol}
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    color: isPos ? 'var(--gain-green)' : 'var(--loss-red)',
                  }}
                >
                  {isPos ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {isPos ? '+' : ''}{t.changePercent.toFixed(2)}%
                </span>
              </div>

              <div
                className="tabular-nums"
                style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
              >
                {t.category === 'currencies' ? t.price.toFixed(4) : t.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>

              <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>
                Vol: {t.sovereignVolume} · {t.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lead Intelligence Dispatch + Audio Brief Player */}
      <div
        className="meridian-card"
        style={{
          padding: '2.5rem',
          marginBottom: '3rem',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-gold)',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="badge-gold">Lead Institutional Dispatch</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>{activeArticle.timestamp}</span>
          </div>

          {/* Audio Brief Player Component */}
          {activeArticle.audioAvailable && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                backgroundColor: 'var(--bg-secondary)',
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-gold)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title={isPlayingAudio ? 'Pause Audio Brief' : 'Listen to Audio Brief'}
              >
                {isPlayingAudio ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: '2px' }} />}
              </button>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-primary)' }}>
                <div style={{ fontWeight: 600 }}>Listen to Executive Brief</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
                  {isPlayingAudio ? `Playing (${audioProgress}%)` : `4m 44s Audio Analysis`}
                </div>
              </div>

              {/* Animated Waveform Visualizer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '16px' }}>
                {[12, 18, 8, 22, 14, 20, 10, 16].map((h, i) => (
                  <span
                    key={i}
                    style={{
                      width: '3px',
                      height: isPlayingAudio ? `${Math.min(20, Math.max(6, (h * (audioProgress % 5 + 1)) / 3))}px` : `${h / 2}px`,
                      backgroundColor: 'var(--accent-gold)',
                      borderRadius: '2px',
                      transition: 'height 150ms ease',
                    }}
                  />
                ))}
              </div>

              {/* Speed Toggle */}
              <button
                onClick={() => {
                  if (audioPlaybackSpeed === '1.0x') setAudioPlaybackSpeed('1.25x');
                  else if (audioPlaybackSpeed === '1.25x') setAudioPlaybackSpeed('1.5x');
                  else setAudioPlaybackSpeed('1.0x');
                }}
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: 'var(--text-gold)',
                  padding: '0.15rem 0.4rem',
                  borderRadius: '4px',
                  backgroundColor: 'var(--accent-gold-subtle)',
                }}
              >
                {audioPlaybackSpeed}
              </button>
            </div>
          )}
        </div>

        {/* Article Headline */}
        <h2 style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.4rem)', lineHeight: 1.22, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
          {activeArticle.title}
        </h2>

        {/* Author Byline */}
        <div style={{ fontSize: '0.84rem', color: 'var(--text-tertiary)', marginBottom: '1.75rem' }}>
          By <strong style={{ color: 'var(--text-primary)' }}>{activeArticle.author.name}</strong>, {activeArticle.author.title} ({activeArticle.author.institution})
        </div>

        {/* Thesis Pull Quote */}
        {activeArticle.pullQuote && (
          <div
            style={{
              padding: '1.5rem 1.75rem',
              backgroundColor: 'var(--bg-secondary)',
              borderLeft: '4px solid var(--accent-gold)',
              borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
              marginBottom: '2rem',
            }}
          >
            <p className="editorial-italic" style={{ fontSize: '1.15rem', lineHeight: 1.55, color: 'var(--text-primary)' }}>
              "{activeArticle.pullQuote}"
            </p>
          </div>
        )}

        {/* Key Metrics Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            padding: '1.25rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            marginBottom: '2rem',
          }}
        >
          {activeArticle.keyDataPoints.map((dp, idx) => (
            <div key={idx}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                {dp.metric}
              </div>
              <div className="tabular-nums" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                {dp.value}
              </div>
            </div>
          ))}
        </div>

        {/* Article Content Paragraphs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '1rem', lineHeight: 1.75, color: 'var(--text-secondary)' }}>
          {activeArticle.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </div>

      {/* Two Column Section: Movers Table & Central Bank Calendar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3.5rem',
        }}
      >
        {/* Institutional Movers Table */}
        <div className="meridian-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <span className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', letterSpacing: '0.12em' }}>
                SOVEREIGN VOLUME ACTIVITY
              </span>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                Institutional Movers
              </h3>
            </div>
            <span className="badge-neutral">Filtered &gt;$1B Notional</span>
          </div>

          <div className="meridian-table-container">
            <table className="meridian-table">
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Price</th>
                  <th>Change</th>
                  <th>Flow</th>
                </tr>
              </thead>
              <tbody>
                {INSTITUTIONAL_MOVERS.map((mover) => {
                  const isPos = mover.dayChangePercent >= 0;
                  return (
                    <tr key={mover.symbol}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{mover.symbol}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>{mover.name}</div>
                      </td>
                      <td style={{ fontWeight: 600 }}>{mover.lastPrice}</td>
                      <td style={{ color: isPos ? 'var(--gain-green)' : 'var(--loss-red)', fontWeight: 600 }}>
                        {isPos ? '+' : ''}{mover.dayChangePercent.toFixed(2)}%
                      </td>
                      <td>
                        <span className={mover.institutionalFlow.includes('Buying') ? 'badge-gold' : 'badge-neutral'} style={{ fontSize: '0.68rem' }}>
                          {mover.institutionalFlow}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Central Bank Monetary Policy Calendar with Probability Meters */}
        <div className="meridian-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <span className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', letterSpacing: '0.12em' }}>
                POLICY TELEMETRY
              </span>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                Central Bank Rate Decisions
              </h3>
            </div>
            <span className="badge-gold">OIS Consensus</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {CENTRAL_BANK_EVENTS.map((cb) => (
              <div
                key={cb.id}
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-light)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>{cb.flagCode}</span>
                      <strong style={{ fontSize: '0.94rem', color: 'var(--text-primary)' }}>{cb.centralBank}</strong>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>
                      Meeting: {cb.meetingDate} ({cb.daysUntilMeeting} days) · Current: {cb.currentRate}
                    </div>
                  </div>

                  <span className="badge-gold" style={{ fontSize: '0.72rem' }}>
                    {cb.consensusExpectation}
                  </span>
                </div>

                {/* Probability Meter Bar */}
                <div style={{ marginTop: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    <span>Cut Probability: {cb.probabilityCutPercent}%</span>
                    <span>Hold: {cb.probabilityHoldPercent}%</span>
                  </div>
                  <div style={{ height: '6px', borderRadius: '3px', backgroundColor: 'var(--bg-tertiary)', overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: `${cb.probabilityCutPercent}%`, backgroundColor: 'var(--gain-green)' }} />
                    <div style={{ width: `${cb.probabilityHoldPercent}%`, backgroundColor: 'var(--accent-gold)' }} />
                    <div style={{ width: `${cb.probabilityHikePercent}%`, backgroundColor: 'var(--loss-red)' }} />
                  </div>
                </div>

                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.6rem', fontStyle: 'italic' }}>
                  Guidance: {cb.forwardGuidance}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* "The Morning Sovereign" Encrypted Newsletter Subscription Portal */}
      <div
        className="meridian-card"
        style={{
          padding: '3rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)',
          border: '1px solid var(--border-gold)',
          maxWidth: '780px',
          margin: '0 auto',
        }}
      >
        <div className="badge-gold" style={{ marginBottom: '1rem' }}>
          <Mail size={12} />
          <span>Encrypted Macro Briefing</span>
        </div>

        <h3 style={{ fontSize: '1.85rem', color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
          "The Morning Sovereign" Dispatches
        </h3>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', maxWidth: '580px', margin: '0 auto 2rem' }}>
          Delivered at 06:00 UTC directly to multi-family office principals and allocators.
          Zero sponsor clutter, zero marketing tracking, strictly institutional macroeconomic synthesis.
        </p>

        {subscribedHash ? (
          <div
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--gain-green-bg)',
              border: '1px solid var(--gain-green-border)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: 'var(--gain-green)',
              fontSize: '0.88rem',
            }}
          >
            <CheckCircle size={18} />
            <span>
              Encrypted subscription validated. Seal Reference: <strong>{subscribedHash}</strong>
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            style={{
              display: 'flex',
              maxWidth: '480px',
              margin: '0 auto',
              gap: '0.5rem',
            }}
          >
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="allocator@sovereign-trust.com"
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-surface)',
              }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.4rem' }}>
              <span>Subscribe</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
