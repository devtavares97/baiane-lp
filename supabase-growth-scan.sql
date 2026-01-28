-- ============================================
-- GROWTH SCAN - Diagnóstico de Maturidade Digital
-- ============================================
-- Tabela para armazenar leads qualificados do quiz
-- ============================================

CREATE TABLE IF NOT EXISTS public.leads_diagnostic (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Dados de contato
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_whatsapp TEXT,
  
  -- Respostas do Quiz
  revenue_tier TEXT NOT NULL CHECK (revenue_tier IN ('up_to_30k', '30k_to_100k', '100k_to_500k', 'above_500k')),
  main_pain TEXT NOT NULL CHECK (main_pain IN ('conversion', 'branding', 'channel', 'sales_process')),
  team_structure TEXT CHECK (team_structure IN ('solo', 'freelancer', 'agency', 'in_house')),
  
  -- Resultado Calculado
  maturity_score INTEGER NOT NULL DEFAULT 0,
  result_archetype TEXT NOT NULL,
  
  -- Metadados
  user_agent TEXT,
  referrer TEXT
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_leads_diagnostic_created ON public.leads_diagnostic(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_diagnostic_email ON public.leads_diagnostic(contact_email);
CREATE INDEX IF NOT EXISTS idx_leads_diagnostic_archetype ON public.leads_diagnostic(result_archetype);
CREATE INDEX IF NOT EXISTS idx_leads_diagnostic_revenue ON public.leads_diagnostic(revenue_tier);

-- RLS (Row Level Security) - Desabilitado para permitir INSERT público
ALTER TABLE public.leads_diagnostic DISABLE ROW LEVEL SECURITY;

-- Comentários
COMMENT ON TABLE public.leads_diagnostic IS 'Leads qualificados capturados pelo Growth Scan';
COMMENT ON COLUMN public.leads_diagnostic.maturity_score IS 'Score de 0-100 calculado baseado nas respostas';
COMMENT ON COLUMN public.leads_diagnostic.result_archetype IS 'Arquétipo resultante (ex: Gigante Invisível, Ferrari sem Gasolina)';

-- ============================================
-- VERIFICAÇÃO
-- ============================================
SELECT 
  'Tabela leads_diagnostic criada' as status,
  COUNT(*) as total_leads
FROM public.leads_diagnostic;

-- ============================================
-- ✅ PRONTO!
-- ============================================
