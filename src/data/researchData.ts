import { ResearchMonograph, AdvisoryBoardMember } from '../types/research';

export const LEAD_MONOGRAPH: ResearchMonograph = {
  id: 'mono-real-yields-frontier',
  doi: '10.2139/ssrn.meridian.2026.0428',
  title: 'The New Frontier of Real Yields',
  subtitle: 'Sovereign Capital Deployment, Convexity Preservation, and Actuarial Liability Matching in a Higher-for-Longer Era',
  badge: 'Featured Monograph',
  leadAuthor: {
    name: 'Dr. Elena Rostova',
    chair: 'Chair of Financial Econometrics',
    institution: 'Oxford Fiduciary Institute & Meridian Research',
  },
  coAuthors: [
    'Lord Alistair Vance, KBE (Former Advisor to the Bank for International Settlements)',
    'Prof. Marcus Thorne (Director of Actuarial Mathematics, LSE)',
  ],
  publicationDate: 'October 2026',
  vintageYear: 2026,
  assetClass: 'fixed_income',
  rigorLevel: 'frontier_actuarial',
  pageCount: 68,
  downloadCount: 3842,
  citationCount: 147,
  pdfFileName: 'Meridian_Monograph_Real_Yields_2026.pdf',
  abstract:
    'This monograph establishes a rigorous mathematical framework for dynastic portfolio immunization when risk-free real rates settle between 2.0% and 3.0%. Utilizing continuous-time stochastic calculus and non-linear duration convexity formulas, we demonstrate why traditional bond laddering underperforms staggered inflation-protected sovereign tranches across multi-decade drawdown regimes.',
  executiveSummary: [
    'Traditional fixed-income duration strategies calibrated between 2008 and 2021 suffer from acute asymmetry: as yields fluctuate near 4.50%, the convex benefit of duration drops while coupon reinvestment risk escalates.',
    'We formulate a closed-form solution for the Dynamic Sovereign Barbell (DSB), pairing 90-day sovereign paper with 25-year ultra-convex TIPS, proving a 142 bps annualized alpha improvement over benchmark Barclays Aggregate indices.',
    'Monte Carlo stress tests across 50,000 macroeconomic iterations reveal that sovereign allocators can immunize liabilities up to 40 years without taking credit spread risk.',
  ],
  keyFindings: [
    {
      title: 'Structural Shift in Equilibrium Discount Rates',
      explanation:
        'The global real rate (r*) is structurally anchored above 2.10% due to decarbonization capital requirements, supply chain nearshoring, and sovereign defense allocations.',
    },
    {
      title: 'Convexity Decay in Intermediate Corporate Paper',
      explanation:
        '5-to-7 year corporate credit spreads do not sufficiently compensate for refinancing default hazard under elevated terminal policy rates.',
    },
    {
      title: 'Actuarial Proof of Continuous Rebalancing Superiority',
      explanation:
        'Continuous geometric compounding rebalancing outperforms calendar-quarter rebalancing by 38 bps annually after transaction slippage.',
    },
  ],
  latexFormulas: [
    '\\mathcal{L}_{\\text{immunized}} = \\sum_{t=1}^{T} \\frac{C_t}{(1 + r_t + \\pi_t)^t} + \\frac{M}{(1 + r_T + \\pi_T)^T}',
    '\\text{Convexity}(\\sigma) = \\frac{1}{P} \\frac{\\partial^2 P}{\\partial y^2} = \\frac{1}{(1+y)^2} \\sum_{t=1}^T \\frac{t(t+1) C_t}{(1+y)^t}',
    'd S_t = (\\mu_t - \\delta_t) S_t dt + \\sigma_t S_t d W_t^{\\mathbb{Q}}',
  ],
  modelSnippetPython: `import numpy as np
import scipy.stats as stats

def calculate_sovereign_barbell_yield(short_yield, long_yield, short_weight, long_weight, inflation_drag):
    """
    Computes real continuous return under dual-tenor sovereign barbell.
    """
    assert np.isclose(short_weight + long_weight, 1.0), "Weights must sum to unity"
    # Continuous geometric compounding
    r_short_eff = np.log(1 + short_yield)
    r_long_eff = np.log(1 + long_yield)
    portfolio_nominal_rate = short_weight * r_short_eff + long_weight * r_long_eff
    
    # Exact Fisher continuous deflator
    portfolio_real_rate = portfolio_nominal_rate - np.log(1 + inflation_drag)
    convexity_alpha = 0.5 * (long_weight * 0.18)**2 * (long_yield**2)
    
    return {
        "nominal_geometric_yield": float(portfolio_nominal_rate),
        "real_yield_net_cpi": float(portfolio_real_rate),
        "convexity_alpha_bps": float(convexity_alpha * 10000)
    }

# Fiduciary allocation example:
result = calculate_sovereign_barbell_yield(
    short_yield=0.0485,
    long_yield=0.0430,
    short_weight=0.45,
    long_weight=0.55,
    inflation_drag=0.0240
)
print("Barbell Real Yield:", f"{result['real_yield_net_cpi'] * 100:.2f}%")`,
};

export const SCHOLARLY_MONOGRAPHS: ResearchMonograph[] = [
  LEAD_MONOGRAPH,
  {
    id: 'mono-monte-carlo-dynasty',
    doi: '10.2139/ssrn.meridian.2025.1102',
    title: 'Dynastic Longevity & Sequence-of-Returns Immunity',
    subtitle: 'Stochastic Capital Preservation Across 100-Year Multi-Generational Family Trusts',
    leadAuthor: {
      name: 'Lord Henry Mountbatten-Cole',
      chair: 'Senior Trustee Fellow',
      institution: 'Geneva Sovereign Fiduciary College',
    },
    publicationDate: 'May 2025',
    vintageYear: 2025,
    assetClass: 'alternative_assets',
    rigorLevel: 'frontier_actuarial',
    pageCount: 52,
    downloadCount: 2940,
    citationCount: 98,
    pdfFileName: 'Dynastic_Longevity_SSRN_2025.pdf',
    abstract:
      'We simulate 100,000 multi-decade market cycles with dynamic variance to evaluate the failure boundary of classical 4% withdrawal rules in volatile regimes. Proposes a Dynamic Guardrail Payout Rule ensuring perpetual capital preservation.',
    executiveSummary: [
      'Static withdrawal schedules face a 23.4% chance of capital impairment within 35 years during stagflationary regimes.',
      'Our formula introduces an asymmetric ratchet rule: distributions adjust by ±15% when portfolio real purchasing power crosses standard deviation bounds.',
      'Ensures dynastic longevity extending past 100 years with 99.8% actuarial confidence.',
    ],
    keyFindings: [
      {
        title: 'The Ratchet Distribution Threshold',
        explanation: 'Cap annual distribution growth at 2.5% real, while implementing a 10% floor buffer.',
      },
      {
        title: 'Liquid Buffer Vault Protocol',
        explanation: 'Maintaining 36 months of planned distributions in 30/360 T-bills eliminates forced liquidation.',
      },
    ],
    latexFormulas: [
      'W_t = \\max\\left(W_{\\min}, \\; \\min\\left(W_{\\max}, \\; W_{t-1}(1 + \\pi_t) \\cdot \\Phi\\left(\\frac{V_t - \\bar{V}}{\\sigma_V}\\right)\\right)\\right)',
    ],
    modelSnippetPython: `def dynamic_guardrail_payout(previous_payout, current_corpus, baseline_corpus, inflation):
    target = previous_payout * (1 + inflation)
    ratio = current_corpus / baseline_corpus
    if ratio < 0.85:
        return target * 0.90 # Retract 10% to protect principal
    elif ratio > 1.25:
        return target * 1.12 # Share up to 12% surplus
    return target`,
  },
  {
    id: 'mono-algorithmic-tax-drag',
    doi: '10.2139/ssrn.meridian.2025.0819',
    title: 'Geometric Compounding vs Arithmetic Tax Drag',
    subtitle: 'A Quantitative Proof of Non-Linear Wealth Erosion in High-Velocity Trading Portfolios',
    leadAuthor: {
      name: 'Dr. Christopher Wu',
      chair: 'Director of Quantitative Research',
      institution: 'Hong Kong Institute for Advanced Financial Studies',
    },
    publicationDate: 'August 2025',
    vintageYear: 2025,
    assetClass: 'quantitative_equities',
    rigorLevel: 'advanced_econometrics',
    pageCount: 44,
    downloadCount: 1980,
    citationCount: 64,
    pdfFileName: 'Tax_Drag_Actuarial_Proof_2025.pdf',
    abstract:
      'Quantifies the geometric wealth degradation inflicted by short-term capital gains realizations. Proves that an active trading strategy must generate over 480 bps in gross annual alpha to overcome the tax drag of a passive long-horizon compounder.',
    executiveSummary: [
      'High-turnover strategies frequently tout high Sharpe ratios while ignoring after-tax geometric compounding.',
      'Over a 25-year horizon, an un-taxed 10% compounder accumulates 10.83x initial capital, whereas an annually taxed 10% compounder (at 37% federal rate) accumulates only 4.54x—a 58% net capital destruction.',
      'Tax-efficient asset location and sovereign corporate structuring provide insurmountable compounding benefits.',
    ],
    keyFindings: [
      {
        title: 'The 480 bps Alpha Hurdle',
        explanation: 'Gross return must exceed 14.8% annually to equal a buy-and-hold 10% asset over 20 years.',
      },
    ],
    latexFormulas: [
      '\\text{Wealth Multiple} = \\prod_{t=1}^T \\left[1 + r_t(1 - \\tau) - \\text{friction}\\right]',
    ],
    modelSnippetPython: `def compare_tax_drag(initial_pv, r_gross, tax_rate, years):
    untaxed = initial_pv * ((1 + r_gross) ** years)
    taxed = initial_pv * ((1 + r_gross * (1 - tax_rate)) ** years)
    drag_pct = ((untaxed - taxed) / untaxed) * 100
    return {"untaxed_fv": untaxed, "taxed_fv": taxed, "wealth_drag_percent": drag_pct}`,
  },
  {
    id: 'mono-sovereign-gold-parity',
    doi: '10.2139/ssrn.meridian.2024.1205',
    title: 'Gold Parity Deflators in Imperial Currencies',
    subtitle: '500 Years of Sovereign Purchasing Power Preservation Across Reserve Currency Hegemonies',
    leadAuthor: {
      name: 'Prof. Beatrix von Habsburg',
      chair: 'Monetary History Chair',
      institution: 'Vienna Sovereign Capital Academy',
    },
    publicationDate: 'November 2024',
    vintageYear: 2025,
    assetClass: 'macro_policy',
    rigorLevel: 'foundational',
    pageCount: 78,
    downloadCount: 4520,
    citationCount: 210,
    pdfFileName: 'Sovereign_Gold_Parity_500Y.pdf',
    abstract:
      'Empirical analysis of physical gold purchasing power relative to fine British wool, Venetian silk, and modern computing power from 1520 to 2026. Demonstrates why gold represents the only zero-counterparty risk actuarial anchor.',
    executiveSummary: [
      'Every sovereign fiat reserve currency has experienced terminal devaluation relative to fine gold over a 120-year horizon.',
      'A baseline allocation of 8% to 15% physical allocated bullion reduces dynastic portfolio tail risk to negligible probabilities.',
    ],
    keyFindings: [
      {
        title: 'Zero Counterparty Guarantee',
        explanation: 'Physical custody in non-aligned jurisdictions preserves transactional sovereignty.',
      },
    ],
    latexFormulas: [
      '\\mathcal{P}_{\\text{gold}}(t) = \\int_0^t \\frac{M2(s)}{\\text{Physical Bullion Stock}(s)} ds',
    ],
    modelSnippetPython: `def gold_purchasing_power_ratio(gold_price, cpi_index_base):
    return gold_price / cpi_index_base`,
  },
];

export const ADVISORY_BOARD: AdvisoryBoardMember[] = [
  {
    id: 'adv-vance',
    name: 'Lord Alistair Vance, KBE',
    role: 'Senior Sovereign Governance Advisor',
    affiliation: 'Former Deputy General Manager, Bank for International Settlements (BIS)',
    notableAchievement: 'Architect of cross-border sovereign liquidity stabilization frameworks',
    specialization: 'Central Banking, Monetary Architecture, Systemic Fiduciary Risk',
  },
  {
    id: 'adv-rostova',
    name: 'Dr. Elena Rostova',
    role: 'Chief Scientific & Actuarial Officer',
    affiliation: 'Oxford Fiduciary Institute & Fellow of the Institute of Actuaries',
    notableAchievement: 'Pioneered continuous multi-asset term structure models',
    specialization: 'Continuous-Time Stochastic Finance & Liability Immunization',
  },
  {
    id: 'adv-weber',
    name: 'Prof. Dr. Hans-Peter Weber',
    role: 'Senior Macroeconomic Policy Advisor',
    affiliation: 'Emeritus Professor of Econometrics, University of Zurich',
    notableAchievement: 'Advisor to Swiss National Bank on foreign reserve diversification',
    specialization: 'Sovereign Wealth Management & Geopolitical Capital Flows',
  },
  {
    id: 'adv-yamamoto',
    name: 'Lady Keiko Yamamoto',
    role: 'Executive Chair of Risk Governance',
    affiliation: 'Former Executive Director, Government Pension Investment Fund (GPIF)',
    notableAchievement: 'Oversaw risk frameworks for $1.6T public institutional fund',
    specialization: 'Dynastic Longevity, Asset-Liability Management (ALM)',
  },
];

export const RESEARCH_PROTOCOLS = [
  {
    stageNumber: 1,
    title: 'Empirical Formulation',
    description:
      'Every research hypothesis originates from verifiable real-world transaction data, central bank balance sheets, and historical econometric series dating back 40+ years.',
  },
  {
    stageNumber: 2,
    title: 'Actuarial Stressing & Monte Carlo',
    description:
      'Models undergo 100,000 synthetic stochastic shock iterations across 99.8% confidence intervals to evaluate tail-risk failure surfaces and non-linear decay.',
  },
  {
    stageNumber: 3,
    title: 'Double-Blind Institutional Review',
    description:
      'Submissions are evaluated by our independent Research Advisory Board and peer-reviewed by chaired professors from Oxford, LSE, and Zurich.',
  },
  {
    stageNumber: 4,
    title: 'Open Non-Custodial Model Release',
    description:
      'All computational equations, Jupyter/Python notebooks, and day-count assumptions are published openly to ensure fiduciary transparency with zero proprietary black boxes.',
  },
];
