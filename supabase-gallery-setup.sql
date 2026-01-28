-- ============================================
-- SUPABASE: Galeria Unificada
-- ============================================
-- Execute este SQL no Supabase Dashboard
-- https://app.supabase.com/project/ismikqcmdpjqmeirwpow/sql/new
-- ============================================

-- ============================================
-- BUCKET: gallery_images
-- ============================================
-- CRIAR MANUALMENTE NO DASHBOARD:
-- 1. Dashboard → Storage → New Bucket
-- 2. Nome: gallery_images
-- 3. Public: ✅ Marque como público
-- 4. Allowed MIME types: image/jpeg, image/png, image/webp, image/svg+xml
-- ============================================

-- ============================================
-- TABELA: gallery
-- ============================================

CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('portfolio', 'logo')),
  caption TEXT,
  alt TEXT NOT NULL DEFAULT 'Imagem da galeria',
  "order" INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_gallery_category ON public.gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_active ON public.gallery(active);
CREATE INDEX IF NOT EXISTS idx_gallery_order ON public.gallery("order");
CREATE INDEX IF NOT EXISTS idx_gallery_category_active ON public.gallery(category, active);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_gallery_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_gallery_updated_at
  BEFORE UPDATE ON public.gallery
  FOR EACH ROW
  EXECUTE FUNCTION update_gallery_updated_at();

-- RLS (Row Level Security) - Permitir leitura pública
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Policy: Leitura pública apenas de itens ativos
CREATE POLICY "Allow public read access"
  ON public.gallery
  FOR SELECT
  USING (active = true);

-- Policy: Admin pode inserir (você precisará criar um usuário admin)
CREATE POLICY "Allow authenticated insert"
  ON public.gallery
  FOR INSERT
  WITH CHECK (true);

-- Policy: Admin pode atualizar
CREATE POLICY "Allow authenticated update"
  ON public.gallery
  FOR UPDATE
  USING (true);

-- Policy: Admin pode deletar
CREATE POLICY "Allow authenticated delete"
  ON public.gallery
  FOR DELETE
  USING (true);

-- ============================================
-- ✅ PRONTO! Tabela criada!
-- ============================================
-- PRÓXIMO PASSO: 
-- 1. Criar o bucket 'gallery_images' manualmente no Dashboard
-- 2. Acessar /admin para fazer upload das imagens
-- ============================================

-- ============================================
-- DADOS DE EXEMPLO (Opcional - para testar)
-- ============================================
-- Descomente se quiser inserir dados de exemplo:

/*
-- Logos de exemplo
INSERT INTO public.gallery (image_url, category, alt, "order") VALUES
  ('https://via.placeholder.com/200x100/1a1a1a/ffffff?text=Logo+1', 'logo', 'Logo Cliente 1', 1),
  ('https://via.placeholder.com/200x100/1a1a1a/ffffff?text=Logo+2', 'logo', 'Logo Cliente 2', 2),
  ('https://via.placeholder.com/200x100/1a1a1a/ffffff?text=Logo+3', 'logo', 'Logo Cliente 3', 3),
  ('https://via.placeholder.com/200x100/1a1a1a/ffffff?text=Logo+4', 'logo', 'Logo Cliente 4', 4),
  ('https://via.placeholder.com/200x100/1a1a1a/ffffff?text=Logo+5', 'logo', 'Logo Cliente 5', 5),
  ('https://via.placeholder.com/200x100/1a1a1a/ffffff?text=Logo+6', 'logo', 'Logo Cliente 6', 6);

-- Imagens do portfólio de exemplo
INSERT INTO public.gallery (image_url, category, caption, alt, "order") VALUES
  ('https://via.placeholder.com/1080x1080/1a1a1a/ffffff?text=Portfolio+1', 'portfolio', 'Cultura e identidade', 'Portfolio 1', 1),
  ('https://via.placeholder.com/1080x1080/1a1a1a/ffffff?text=Portfolio+2', 'portfolio', 'Salvador, Bahia', 'Portfolio 2', 2),
  ('https://via.placeholder.com/1080x1080/1a1a1a/ffffff?text=Portfolio+3', 'portfolio', 'Branding estratégico', 'Portfolio 3', 3),
  ('https://via.placeholder.com/1080x1080/1a1a1a/ffffff?text=Portfolio+4', 'portfolio', 'Performance criativa', 'Portfolio 4', 4),
  ('https://via.placeholder.com/1080x1080/1a1a1a/ffffff?text=Portfolio+5', 'portfolio', 'Estratégia visual', 'Portfolio 5', 5),
  ('https://via.placeholder.com/1080x1080/1a1a1a/ffffff?text=Portfolio+6', 'portfolio', 'Time em ação', 'Portfolio 6', 6),
  ('https://via.placeholder.com/1080x1080/1a1a1a/ffffff?text=Portfolio+7', 'portfolio', 'Criatividade baiana', 'Portfolio 7', 7),
  ('https://via.placeholder.com/1080x1080/1a1a1a/ffffff?text=Portfolio+8', 'portfolio', 'Cases de sucesso', 'Portfolio 8', 8);
*/
