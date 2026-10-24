/**
 * Meridian Finance — Scholarly Research & Monograph Types
 */

export type AssetClassFilter = 'all' | 'fixed_income' | 'quantitative_equities' | 'alternative_assets' | 'macro_policy';
export type RigorLevel = 'foundational' | 'advanced_econometrics' | 'frontier_actuarial';

export interface ResearchMonograph {
  id: string;
  doi: string;
  title: string;
  subtitle: string;
  leadAuthor: {
    name: string;
    chair: string;
    institution: string;
    avatarUrl?: string;
  };
  coAuthors?: string[];
  publicationDate: string;
  vintageYear: number;
  assetClass: AssetClassFilter;
  rigorLevel: RigorLevel;
  pageCount: number;
  downloadCount: number;
  citationCount: number;
  abstract: string;
  executiveSummary: string[];
  keyFindings: { title: string; explanation: string }[];
  modelSnippetPython: string;
  latexFormulas: string[];
  pdfFileName: string;
  badge?: string;
}

export interface AdvisoryBoardMember {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  notableAchievement: string;
  specialization: string;
}
