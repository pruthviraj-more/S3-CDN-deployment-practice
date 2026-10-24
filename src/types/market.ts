/**
 * Meridian Finance — Market Telemetry & Terminal Types
 */

export type AssetCategory = 'equities' | 'fixed_income' | 'commodities' | 'currencies' | 'crypto';

export interface MarketTicker {
  id: string;
  symbol: string;
  name: string;
  category: AssetCategory;
  price: number;
  changePercent: number;
  changeAbsolute: number;
  unit: string;
  high52w: number;
  low52w: number;
  sovereignVolume: string;
  sparkline: number[];
}

export interface MacroKpi {
  id: string;
  label: string;
  value: string;
  deltaText: string;
  isPositive: boolean;
  benchmarkContext: string;
  badge: string;
}

export interface NewsDispatch {
  id: string;
  title: string;
  slug: string;
  category: 'central_banks' | 'mega_cap_tech' | 'private_credit' | 'energy' | 'ma_dealflow' | 'sovereign_debt';
  categoryLabel: string;
  timestamp: string;
  readTime: string;
  author: {
    name: string;
    title: string;
    institution: string;
  };
  summary: string;
  pullQuote?: string;
  audioDurationSeconds?: number;
  audioAvailable: boolean;
  content: string[];
  sentiment: 'bullish' | 'neutral' | 'defensive' | 'hawkish';
  tags: string[];
  keyDataPoints: { metric: string; value: string }[];
}

export interface InstitutionalMover {
  symbol: string;
  name: string;
  assetClass: string;
  lastPrice: string;
  dayChangePercent: number;
  volumeNotional: string;
  institutionalFlow: 'Accumulation' | 'Sovereign Buying' | 'Neutral' | 'De-risking';
  yieldOrPe: string;
}

export interface CentralBankEvent {
  id: string;
  centralBank: string;
  jurisdiction: string;
  flagCode: string;
  currentRate: string;
  meetingDate: string;
  daysUntilMeeting: number;
  consensusExpectation: 'Hold' | '25 bps Cut' | '50 bps Cut' | '25 bps Hike';
  probabilityCutPercent: number;
  probabilityHoldPercent: number;
  probabilityHikePercent: number;
  forwardGuidance: string;
}
