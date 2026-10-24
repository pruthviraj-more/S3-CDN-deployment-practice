import React from 'react';
import { GLOBAL_TICKERS } from '../../data/marketData';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerTapeProps {
  onSelectTicker?: (symbol: string) => void;
}

export const TickerTape: React.FC<TickerTapeProps> = ({ onSelectTicker }) => {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-light)',
        overflow: 'hidden',
        fontSize: '0.78rem',
        padding: '0.45rem 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '2.5rem',
          whiteSpace: 'nowrap',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>
          <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
          <span className="crest-text" style={{ fontSize: '0.7rem' }}>LIVE SOVEREIGN TELEMETRY:</span>
        </div>

        {GLOBAL_TICKERS.map((t) => {
          const isPos = t.changePercent >= 0;
          return (
            <div
              key={t.id}
              onClick={() => onSelectTicker?.(t.symbol)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                cursor: 'pointer',
                transition: 'opacity 150ms ease',
              }}
              className="tabular-nums"
              title={`${t.name} (Vol: ${t.sovereignVolume})`}
            >
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.symbol}</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                {t.category === 'currencies' ? t.price.toFixed(4) : t.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                  color: isPos ? 'var(--gain-green)' : 'var(--loss-red)',
                  fontWeight: 600,
                  fontSize: '0.74rem',
                }}
              >
                {isPos ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {isPos ? '+' : ''}{t.changePercent.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
