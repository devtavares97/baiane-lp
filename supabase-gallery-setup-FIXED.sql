-- ============================================
-- SUPABASE: Galeria Unificada (RLS CORRIGIDO)
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

-- ============================================
-- RLS (Row Level Security) - POLÍTICAS PÚBLICAS
-- ============================================

-- Habilitar RLS
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- REMOVER TODAS AS POLÍTICAS ANTIGAS (se existirem)
DROP POLICY IF EXISTS "Allow public read access" ON public.gallery;
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.gallery;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.gallery;
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.gallery;

-- NOVA POLÍTICA: Leitura pública (apenas itens ativos)
CREATE POLICY "Public read access for active items"
  ON public.gallery
  FOR SELECT
  USING (active = true);

-- NOVA POLÍTICA: Permitir INSERT de qualquer um (sem autenticação)
-- IMPORTANTE: Em produção, você deve proteger isso!
CREATE POLICY "Allow public insert"
  ON public.gallery
  FOR INSERT
  WITH CHECK (true);

-- NOVA POLÍTICA: Permitir UPDATE de qualquer um
CREATE POLICY "Allow public update"
  ON public.gallery
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- NOVA POLÍTICA: Permitir DELETE de qualquer um
CREATE POLICY "Allow public delete"
  ON public.gallery
  FOR DELETE
  USING (true);

-- ============================================
-- STORAGE: Políticas para o Bucket
-- ============================================

-- Permitir leitura pública dos arquivos
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery_images', 'gallery_images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Permitir upload público (sem autenticação)
CREATE POLICY IF NOT EXISTS "Public upload access"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'gallery_images');

-- Permitir leitura pública
CREATE POLICY IF NOT EXISTS "Public read access"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'gallery_images');

-- Permitir delete público (para gerenciamento)
CREATE POLICY IF NOT EXISTS "Public delete access"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'gallery_images');

-- ============================================
-- ✅ PRONTO! Sistema configurado!
-- ============================================

-- VERIFICAR SE TUDO ESTÁ OK:
SELECT 
  'Gallery Table' as resource,
  COUNT(*) as total_rows
FROM public.gallery
UNION ALL
SELECT 
  'Storage Objects' as resource,
  COUNT(*) as total_rows
FROM storage.objects
WHERE bucket_id = 'gallery_images';

-- ============================================
-- ⚠️ NOTA DE SEGURANÇA
-- ============================================
-- ATENÇÃO: Este setup permite upload/edição/deleção SEM autenticação!
-- 
-- É OK para desenvolvimento, mas em PRODUÇÃO você deve:
-- 1. Criar um sistema de autenticação (ex: NextAuth, Supabase Auth)
-- 2. Proteger a rota /admin com middleware
-- 3. Atualizar as políticas para exigir autenticação:
--    WITH CHECK (auth.role() = 'authenticated')
--
-- Por enquanto, está liberado para facilitar o desenvolvimento.
-- ============================================
