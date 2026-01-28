-- ============================================
-- SUPABASE: Criação das Tabelas
-- ============================================
-- Execute este SQL no Supabase Dashboard
-- https://app.supabase.com/project/ismikqcmdpjqmeirwpow/sql/new
-- ============================================

-- ============================================
-- TABELA 1: company_logos (Logos dos Clientes)
-- ============================================

CREATE TABLE IF NOT EXISTS public.company_logos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_company_logos_active ON public.company_logos(active);
CREATE INDEX IF NOT EXISTS idx_company_logos_order ON public.company_logos("order");

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_company_logos_updated_at
  BEFORE UPDATE ON public.company_logos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) - Permitir leitura pública
ALTER TABLE public.company_logos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON public.company_logos
  FOR SELECT
  USING (active = true);

-- ============================================
-- TABELA 2: portfolio_images (Portfólio)
-- ============================================

CREATE TABLE IF NOT EXISTS public.portfolio_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  alt TEXT NOT NULL DEFAULT 'Imagem do portfólio',
  "order" INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_portfolio_images_active ON public.portfolio_images(active);
CREATE INDEX IF NOT EXISTS idx_portfolio_images_order ON public.portfolio_images("order");

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_portfolio_images_updated_at
  BEFORE UPDATE ON public.portfolio_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) - Permitir leitura pública
ALTER TABLE public.portfolio_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON public.portfolio_images
  FOR SELECT
  USING (active = true);

-- ============================================
-- ✅ PRONTO! Tabelas criadas!
-- ============================================
-- PRÓXIMO PASSO: Criar o Storage Bucket
-- Siga as instruções em COMO-FAZER-UPLOAD.md
-- ============================================
