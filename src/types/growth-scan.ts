/**
 * GROWTH SCAN TYPES
 * ------------------
 * Tipos para o diagnóstico de maturidade digital
 */

export type RevenueTier = 'up_to_30k' | '30k_to_100k' | '100k_to_500k' | 'above_500k';
export type MainPain = 'conversion' | 'branding' | 'channel' | 'sales_process';
export type TeamStructure = 'solo' | 'freelancer' | 'agency' | 'in_house';

export interface GrowthScanAnswers {
  revenueTier?: RevenueTier;
  mainPain?: MainPain;
  teamStructure?: TeamStructure;
}

export interface GrowthScanLead {
  contact_name: string;
  contact_email: string;
  contact_whatsapp?: string;
  revenue_tier: RevenueTier;
  main_pain: MainPain;
  team_structure?: TeamStructure;
  maturity_score: number;
  result_archetype: string;
  user_agent?: string;
  referrer?: string;
}

export interface ArchetypeResult {
  title: string;
  subtitle: string;
  description: string;
  solution: string;
  ctaText: string;
  icon: string;
}
