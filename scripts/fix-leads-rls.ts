#!/usr/bin/env tsx
/**
 * Aplica tabela leads_diagnostic + RLS no Supabase via conexão direta.
 * Uso: npx tsx scripts/fix-leads-rls.ts
 */

import { Client } from 'pg';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const connectionString = process.env.SUPABASE_DB_URL;
if (!connectionString) {
  console.error('❌ SUPABASE_DB_URL não definido em .env.local');
  process.exit(1);
}

const sql = `
-- Tabela (se não existir)
CREATE TABLE IF NOT EXISTS public.leads_diagnostic (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_whatsapp TEXT,
  revenue_tier TEXT NOT NULL CHECK (revenue_tier IN ('up_to_30k', '30k_to_100k', '100k_to_500k', 'above_500k')),
  main_pain TEXT NOT NULL CHECK (main_pain IN ('conversion', 'branding', 'channel', 'sales_process')),
  team_structure TEXT CHECK (team_structure IN ('solo', 'freelancer', 'agency', 'in_house')),
  maturity_score INTEGER NOT NULL DEFAULT 0,
  result_archetype TEXT NOT NULL,
  user_agent TEXT,
  referrer TEXT
);

CREATE INDEX IF NOT EXISTS idx_leads_created ON public.leads_diagnostic(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads_diagnostic(contact_email);

ALTER TABLE public.leads_diagnostic ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "leads_diagnostic_insert_anon" ON public.leads_diagnostic;
DROP POLICY IF EXISTS "leads_diagnostic_select_anon" ON public.leads_diagnostic;
DROP POLICY IF EXISTS "leads_diagnostic_select_authenticated" ON public.leads_diagnostic;
DROP POLICY IF EXISTS "leads_diagnostic_select_service" ON public.leads_diagnostic;
DROP POLICY IF EXISTS "leads_diagnostic_all_service" ON public.leads_diagnostic;

CREATE POLICY "leads_diagnostic_insert_anon"
  ON public.leads_diagnostic FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "leads_diagnostic_select_anon"
  ON public.leads_diagnostic FOR SELECT TO anon USING (true);

CREATE POLICY "leads_diagnostic_all_service"
  ON public.leads_diagnostic FOR ALL TO service_role USING (true) WITH CHECK (true);
`;

async function main() {
  const client = new Client({ connectionString: connectionString! });
  try {
    await client.connect();
    console.log('✅ Conectado ao Supabase.\n');
    await client.query(sql);
    console.log('✅ Tabela leads_diagnostic e políticas RLS aplicadas.\n');
  } catch (e: unknown) {
    console.error('❌ Erro:', (e as Error).message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
