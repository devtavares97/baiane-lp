-- ============================================
-- SOLUÇÃO DEFINITIVA - RLS + STORAGE
-- ============================================
-- Copie TUDO e execute de uma vez só
-- ============================================

-- 1. DESABILITAR RLS TEMPORARIAMENTE (para testar)
ALTER TABLE IF EXISTS public.gallery DISABLE ROW LEVEL SECURITY;

-- 2. DROPAR TABELA SE EXISTIR (começar do zero)
DROP TABLE IF EXISTS public.gallery CASCADE;

-- 3. CRIAR TABELA NOVAMENTE
CREATE TABLE public.gallery (
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

-- 4. CRIAR ÍNDICES
CREATE INDEX idx_gallery_category ON public.gallery(category);
CREATE INDEX idx_gallery_active ON public.gallery(active);
CREATE INDEX idx_gallery_order ON public.gallery("order");

-- 5. NÃO ATIVAR RLS POR ENQUANTO (para debug)
-- ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STORAGE BUCKET
-- ============================================

-- 6. CRIAR/ATUALIZAR BUCKET (se não existir)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery_images',
  'gallery_images',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) 
DO UPDATE SET 
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

-- 7. REMOVER TODAS AS POLÍTICAS ANTIGAS DO STORAGE
DROP POLICY IF EXISTS "Public upload access" ON storage.objects;
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
DROP POLICY IF EXISTS "Public delete access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public upload" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read" ON storage.objects;
DROP POLICY IF EXISTS "Allow public delete" ON storage.objects;

-- 8. CRIAR POLÍTICAS PÚBLICAS PARA O STORAGE
CREATE POLICY "Anyone can upload to gallery_images"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'gallery_images');

CREATE POLICY "Anyone can read from gallery_images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'gallery_images');

CREATE POLICY "Anyone can update in gallery_images"
  ON storage.objects
  FOR UPDATE
  TO public
  USING (bucket_id = 'gallery_images');

CREATE POLICY "Anyone can delete from gallery_images"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'gallery_images');

-- ============================================
-- VERIFICAÇÃO
-- ============================================

-- Verificar se tudo foi criado
SELECT 
  'Tabela gallery existe' as status,
  EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'gallery'
  ) as resultado;

SELECT 
  'Bucket gallery_images existe' as status,
  EXISTS (
    SELECT FROM storage.buckets 
    WHERE id = 'gallery_images'
  ) as resultado;

SELECT 
  'RLS na tabela gallery' as status,
  (SELECT relrowsecurity FROM pg_class WHERE relname = 'gallery') as ativado;

-- ============================================
-- ✅ PRONTO!
-- ============================================
-- Agora teste o upload em: http://localhost:3000/admin
-- ============================================
