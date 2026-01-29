-- ============================================================
-- LEADS DIAGNOSTIC (Growth Scan)
-- ============================================================
-- Execute este SQL no Supabase (SQL Editor) do projeto que sua
-- aplicação usa (NEXT_PUBLIC_SUPABASE_URL). Assim os leads do
-- formulário Growth Scan passam a ser salvos e aparecem no admin.
-- ============================================================

-- Tabela de leads do diagnóstico
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

-- Índices
CREATE INDEX IF NOT EXISTS idx_leads_created ON public.leads_diagnostic(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads_diagnostic(contact_email);

-- Habilitar RLS
ALTER TABLE public.leads_diagnostic ENABLE ROW LEVEL SECURITY;

-- Remover políticas antigas se existirem (para poder reexecutar o script)
DROP POLICY IF EXISTS "leads_diagnostic_insert_anon" ON public.leads_diagnostic;
DROP POLICY IF EXISTS "leads_diagnostic_select_anon" ON public.leads_diagnostic;
DROP POLICY IF EXISTS "leads_diagnostic_select_authenticated" ON public.leads_diagnostic;
DROP POLICY IF EXISTS "leads_diagnostic_select_service" ON public.leads_diagnostic;
DROP POLICY IF EXISTS "leads_diagnostic_all_service" ON public.leads_diagnostic;

-- Política: anon pode INSERIR (formulário Growth Scan na landing)
CREATE POLICY "leads_diagnostic_insert_anon"
  ON public.leads_diagnostic
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Política: anon pode SELECT (painel admin usa anon key; proteção é o login customizado do admin)
CREATE POLICY "leads_diagnostic_select_anon"
  ON public.leads_diagnostic
  FOR SELECT
  TO anon
  USING (true);

-- Service role pode fazer tudo (backend)
CREATE POLICY "leads_diagnostic_all_service"
  ON public.leads_diagnostic
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
