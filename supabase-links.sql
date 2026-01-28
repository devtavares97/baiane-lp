-- ============================================
-- TABELAS DE LINKS PESSOAIS (Linktree-style)
-- ============================================

-- Tabela de perfis de links
CREATE TABLE IF NOT EXISTS public.link_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de itens de links
CREATE TABLE IF NOT EXISTS public.link_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.link_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  order_num INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_link_profiles_slug ON public.link_profiles(slug);
CREATE INDEX IF NOT EXISTS idx_link_profiles_active ON public.link_profiles(is_active);
CREATE INDEX IF NOT EXISTS idx_link_items_profile ON public.link_items(profile_id);
CREATE INDEX IF NOT EXISTS idx_link_items_active ON public.link_items(is_active);
CREATE INDEX IF NOT EXISTS idx_link_items_order ON public.link_items(order_num);

-- RLS (Row Level Security)
ALTER TABLE public.link_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.link_items ENABLE ROW LEVEL SECURITY;

-- Políticas públicas (qualquer um pode ler perfis e links ativos)
CREATE POLICY "Perfis públicos são visíveis"
  ON public.link_profiles
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Links públicos são visíveis"
  ON public.link_items
  FOR SELECT
  USING (is_active = true);

-- Políticas para inserção/atualização (apenas autenticados - mas vamos usar service role no admin)
-- Por enquanto, permitir tudo para facilitar o desenvolvimento
CREATE POLICY "Permitir inserção de perfis"
  ON public.link_profiles
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir atualização de perfis"
  ON public.link_profiles
  FOR UPDATE
  USING (true);

CREATE POLICY "Permitir inserção de links"
  ON public.link_items
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir atualização de links"
  ON public.link_items
  FOR UPDATE
  USING (true);

CREATE POLICY "Permitir deleção de links"
  ON public.link_items
  FOR DELETE
  USING (true);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_link_profiles_updated_at
  BEFORE UPDATE ON public.link_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_link_items_updated_at
  BEFORE UPDATE ON public.link_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
