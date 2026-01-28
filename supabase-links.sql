-- ============================================
-- LINK PROFILES - Sistema de Links tipo Linktree
-- ============================================
-- Tabelas para criar perfis de links personalizados
-- ============================================

-- Tabela de Perfis
CREATE TABLE IF NOT EXISTS public.link_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Links
CREATE TABLE IF NOT EXISTS public.link_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.link_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  order_num INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_link_profiles_slug ON public.link_profiles(slug);
CREATE INDEX IF NOT EXISTS idx_link_profiles_active ON public.link_profiles(is_active);
CREATE INDEX IF NOT EXISTS idx_link_items_profile ON public.link_items(profile_id);
CREATE INDEX IF NOT EXISTS idx_link_items_order ON public.link_items(profile_id, order_num);
CREATE INDEX IF NOT EXISTS idx_link_items_active ON public.link_items(is_active);

-- RLS (Row Level Security) - Permitir leitura pública
ALTER TABLE public.link_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.link_items ENABLE ROW LEVEL SECURITY;

-- Políticas de leitura pública
CREATE POLICY "Perfis ativos são públicos"
  ON public.link_profiles FOR SELECT
  USING (is_active = true);

CREATE POLICY "Links ativos são públicos"
  ON public.link_items FOR SELECT
  USING (is_active = true);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_link_profiles_updated_at
  BEFORE UPDATE ON public.link_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_link_items_updated_at
  BEFORE UPDATE ON public.link_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comentários
COMMENT ON TABLE public.link_profiles IS 'Perfis de usuários para páginas de links (tipo Linktree)';
COMMENT ON TABLE public.link_items IS 'Links individuais de cada perfil';
COMMENT ON COLUMN public.link_profiles.slug IS 'URL amigável (ex: /links/marcos)';
COMMENT ON COLUMN public.link_items.order_num IS 'Ordem de exibição dos links';

-- Inserir perfis de exemplo (Marcos e outro sócio)
INSERT INTO public.link_profiles (slug, name, bio) VALUES
  ('marcos', 'Marcos António', 'Estrategista Digital & Growth Hacker'),
  ('socio', 'Nome do Sócio', 'Descrição do sócio')
ON CONFLICT (slug) DO NOTHING;

-- Inserir links de exemplo para Marcos
INSERT INTO public.link_items (profile_id, title, url, icon, order_num)
SELECT 
  p.id,
  'Instagram',
  'https://instagram.com/marcos',
  '📸',
  0
FROM public.link_profiles p WHERE p.slug = 'marcos'
ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFICAÇÃO
-- ============================================
SELECT 
  'Tabelas de links criadas' as status,
  (SELECT COUNT(*) FROM public.link_profiles) as total_perfis,
  (SELECT COUNT(*) FROM public.link_items) as total_links;

-- ============================================
-- ✅ PRONTO!
-- ============================================
