import { NewsDispatch } from '../types/market';

export const LEAD_DISPATCH: NewsDispatch = {
  id: 'lead-fed-pivot-rstar',
  title: 'Federal Reserve Pivots on Neutral Rate (R*) Guidance Amid Structural Fiscal Deficits',
  slug: 'federal-reserve-neutral-rate-pivot',
  category: 'central_banks',
  categoryLabel: 'Central Banks & Sovereign Debt',
  timestamp: '2 hours ago · Live Telemetry',
  readTime: '6 min read',
  author: {
    name: 'Dr. Julian Vance',
    title: 'Senior Monetary Economist',
    institution: 'Meridian Sovereign Research / ex-BIS',
  },
  audioAvailable: true,
  audioDurationSeconds: 284,
  pullQuote:
    'The assumption that real equilibrium interest rates will regress to pre-2020 near-zero medians is an actuarial trap. Sovereign allocators must underwrite 150–225 bps in structural real yield floor for the remainder of this decadal cycle.',
  summary:
    'Federal Reserve governors have shifted qualitative rhetoric regarding long-term neutral rates (R*), implicitly recognizing that persistent $1.9T annual US budget deficits and sovereign reshoring capex mandate a permanently elevated policy baseline.',
  content: [
    'In closed-door discussions and recent public testimonies, committee members have incrementally elevated their estimates for the terminal equilibrium policy rate. Rather than targeting a rapid return to 2.50% nominal, consensus is cementing between 3.50% and 3.85%, reflecting structural headwinds against long-term debt stabilization.',
    'For institutional family offices and endowments managing liabilities across a 30-year horizon, this repricing fundamentally shifts the asset allocation frontier. The traditional 60/40 balanced model is replaced by asymmetric barbell strategies—combining inflation-hedged ultra-short liquidity with long-duration infrastructure private credit.',
    'Furthermore, foreign central bank demand for nominal US Treasuries has declined by 14% on a rolling 12-month basis, replaced by unencumbered physical gold accumulation and bilateral currency arrangements. This tectonic shift requires actuaries to adjust discount factors dynamically.',
  ],
  sentiment: 'hawkish',
  tags: ['Monetary Policy', 'R-Star', 'US Treasuries', 'Fiscal Deficit', 'Yield Curve'],
  keyDataPoints: [
    { metric: 'Implied Neutral Rate (R*)', value: '3.65% (vs 2.50% baseline)' },
    { metric: '10Y Term Premium Delta', value: '+48 bps over 6 months' },
    { metric: 'Primary Dealer Inventory', value: '$84.2B Absorption' },
  ],
};

export const MACRO_DISPATCHES: NewsDispatch[] = [
  LEAD_DISPATCH,
  {
    id: 'disp-private-credit-refinancing',
    title: 'The Sovereign Debt Maturity Wall: $3.8T Corporate Refinancing Looming by 2027',
    slug: 'sovereign-debt-maturity-wall',
    category: 'private_credit',
    categoryLabel: 'Private Credit & Syndications',
    timestamp: '4 hours ago',
    readTime: '5 min read',
    author: {
      name: 'Lady Margaret Sterling',
      title: 'Managing Director, Fixed Income',
      institution: 'Sterling Multi-Family Office',
    },
    audioAvailable: false,
    summary:
      'Investment-grade and leveraged borrowers face an unprecedented rollover hurdle as 2020-2021 low-coupon notes mature. Direct lending funds with flexible capital are extracting 650-750 bps spreads over SOFR.',
    content: [
      'Over $3.8 Trillion in sovereign and corporate debt originated during peak quantitative easing will reach final maturity between Q1 2026 and Q4 2027. Refinancing at prevailing coupons of 6.25% to 8.50% will compress corporate interest coverage ratios from 4.8x to 2.3x.',
      'Tier-1 Family Offices are aggressively deploying dry powder into senior secured direct lending, commanding first-lien security pledges, equity co-investment warrants, and strict net-leverage covenants below 3.5x.',
    ],
    sentiment: 'defensive',
    tags: ['Private Credit', 'Maturity Wall', 'Spread Compression', 'Direct Lending'],
    keyDataPoints: [
      { metric: 'Refinancing Volume', value: '$3.82 Trillion' },
      { metric: 'Average Spread Over SOFR', value: '+680 bps' },
      { metric: 'Senior Secured Coverage', value: '1.95x Asset Par' },
    ],
  },
  {
    id: 'disp-energy-strategic-reserves',
    title: 'OPEC+ Spare Capacity Tightens as Gulf Sovereign Funds Pivot to Compute Infrastructure',
    slug: 'opec-spare-capacity-compute-pivot',
    category: 'energy',
    categoryLabel: 'Energy & Strategic Reserves',
    timestamp: '7 hours ago',
    readTime: '4 min read',
    author: {
      name: 'Khalid Al-Mansoor',
      title: 'Chief Hydrocarbon Strategist',
      institution: 'Gulf Macro Allocators Consortium',
    },
    audioAvailable: false,
    summary:
      'Sovereign wealth funds in Abu Dhabi and Riyadh are funneling petrodollar surpluses directly into gigawatt-scale AI data center parks, decoupling domestic capital expenditure from Western equities.',
    content: [
      'Middle Eastern sovereign allocators have committed over $65 Billion to dedicated domestic power generation and hyperscale liquid-cooled compute hubs. By co-locating natural gas turbines with AI compute clusters, sovereign power costs drop below $0.038 per kilowatt-hour.',
      'This strategic pivot creates an insular technological moat, while maintaining Brent crude price discipline above $72/bbl to fund ambitious generational transformation mandates.',
    ],
    sentiment: 'bullish',
    tags: ['Hydrocarbons', 'Sovereign Wealth', 'AI Infrastructure', 'Petrodollars'],
    keyDataPoints: [
      { metric: 'Committed Compute AUM', value: '$65.0 Billion' },
      { metric: 'Industrial Power Cost', value: '$0.038 / kWh' },
      { metric: 'Target Brent Floor', value: '$72.50 / bbl' },
    ],
  },
  {
    id: 'disp-mega-cap-semiconductors',
    title: 'High-NA EUV Monopoly: Capital Allocation Implications for Mega-Cap Technology',
    slug: 'high-na-euv-semiconductor-moat',
    category: 'mega_cap_tech',
    categoryLabel: 'Mega-Cap Technology',
    timestamp: '11 hours ago',
    readTime: '8 min read',
    author: {
      name: 'Dr. Henrik Lindqvist',
      title: 'Senior Quantitative Technology Analyst',
      institution: 'Nordic Sovereign Asset Management',
    },
    audioAvailable: true,
    audioDurationSeconds: 340,
    summary:
      'With ASML monopolizing High-NA EUV scanner shipments at €350M per unit, leading foundries face immense capital discipline hurdles. Only three global entities possess the balance sheet capacity to sustain sub-2nm node expansion.',
    content: [
      'The astronomical capital expenditures required for 1.4nm (A14) fabrication plants—surpassing $22B per fab—are cementing an impenetrable triopoly consisting of TSMC, Samsung, and Intel Foundry.',
      'Investors must scrutinize free cash flow conversion rather than gross revenue metrics. We recommend long-duration institutional allocators maintain overweight exposure to photolithography tollbooths rather than volatile downstream consumer electronics.',
    ],
    sentiment: 'bullish',
    tags: ['Semiconductors', 'ASML', 'Capex Barriers', 'EUV Lithography'],
    keyDataPoints: [
      { metric: 'High-NA Tool Price', value: '€350M / system' },
      { metric: 'Sub-2nm Fab Capex', value: '$22.4 Billion' },
      { metric: 'Tier-1 FCF Yield', value: '4.85%' },
    ],
  },
  {
    id: 'disp-cross-border-ma',
    title: 'Sovereign Sponsor M&A Surges Across European Critical Infrastructure Assets',
    slug: 'sovereign-sponsor-ma-infrastructure',
    category: 'ma_dealflow',
    categoryLabel: 'M&A & Deal Flow',
    timestamp: '1 day ago',
    readTime: '5 min read',
    author: {
      name: 'Philippe de Montmirail',
      title: 'Partner, Institutional Transactions',
      institution: 'Meridian Capital Partners',
    },
    audioAvailable: false,
    summary:
      'Private equity buyouts face financing headwinds, clearing the stage for un-levered sovereign wealth funds to acquire strategic logistics hubs, transmission grids, and desalinization facilities at discounted 11.2x EBITDA multiples.',
    content: [
      'The absence of cheap syndicated term loans has caused traditional sponsor buyout activity to decline 32% year-on-year across continental Europe. In contrast, sovereign allocators possessing all-cash transaction capabilities are closing bilateral acquisitions within 45 days.',
      'Key assets acquired include Mediterranean offshore wind transmission corridors, Baltic container terminals, and regulated district heating utilities.',
    ],
    sentiment: 'neutral',
    tags: ['Infrastructure', 'Cross-Border M&A', 'European Logistics', 'EBITDA Multiples'],
    keyDataPoints: [
      { metric: 'Average Transaction Multiple', value: '11.2x EBITDA' },
      { metric: 'All-Cash Equity Ratio', value: '88% of Total Consideration' },
      { metric: 'Rolling Deal Pipeline', value: '€18.7 Billion' },
    ],
  },
];
