/**
 * Meridian Finance — Mandate Onboarding & Client Authentication Types
 */

export type InvestorEntityType =
  | 'single_family_office'
  | 'multi_family_office'
  | 'sovereign_wealth_fund'
  | 'endowment_foundation'
  | 'hnw_individual'
  | 'fiduciary_advisor';

export type MandateHorizon =
  | 'short_term_liquidity'
  | 'intermediate_growth'
  | 'generational_dynasty_30y'
  | 'perpetual_endowment';

export interface MandateRequestForm {
  institutionName: string;
  leadFiduciaryName: string;
  officialEmail: string;
  jurisdiction: string;
  entityType: InvestorEntityType;
  targetAumRange: string;
  horizon: MandateHorizon;
  primaryObjective: string;
  accreditedConfirmation: boolean;
  notes: string;
}

export interface ClientSession {
  isAuthenticated: boolean;
  accountIdentifier: string;
  entityName: string;
  role: 'Lord Beneficiary' | 'Chief Investment Officer' | 'Senior Actuary' | 'Audit Officer';
  twoFactorVerified: boolean;
  lastLoginUtc: string;
  allocatedMandateUsd: number;
}
