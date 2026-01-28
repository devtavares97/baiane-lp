#!/usr/bin/env tsx

/**
 * SETUP FINAL - POSTGRES DIRETO
 * ------------------------------
 * Conecta direto no banco via postgres
 */

import { Client } from 'pg';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const connectionString = process.env.SUPABASE_DB_URL;
if (!connectionString) {
  console.error('❌ SUPABASE_DB_URL não definido em .env.local');
  console.error('   Exemplo: SUPABASE_DB_URL=postgresql://postgres:SUA_SENHA@db.ismikqcmdpjqmeirwpow.supabase.co:5432/postgres');
  process.exit(1);
}

async function main() {
  console.log('🚀 Conectando ao banco de dados...\n');

  const client = new Client({ connectionString: connectionString! });

  try {
    await client.connect();
    console.log('✅ Conectado!\n');

    // 1. Criar tabela gallery
    console.log('📝 Criando tabela gallery...');
    await client.query(`
      DROP TABLE IF EXISTS public.gallery CASCADE;
      
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

      CREATE INDEX idx_gallery_category ON public.gallery(category);
      CREATE INDEX idx_gallery_active ON public.gallery(active);
    `);
    console.log('✅ Tabela gallery criada!\n');

    // 2. Criar tabela leads_diagnostic
    console.log('📝 Criando tabela leads_diagnostic...');
    await client.query(`
      DROP TABLE IF EXISTS public.leads_diagnostic CASCADE;
      
      CREATE TABLE public.leads_diagnostic (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
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

      CREATE INDEX idx_leads_created ON public.leads_diagnostic(created_at DESC);
      CREATE INDEX idx_leads_email ON public.leads_diagnostic(contact_email);
    `);
    console.log('✅ Tabela leads_diagnostic criada!\n');

    // 3. Criar tabelas de links
    console.log('📝 Criando tabelas de links...');
    await client.query(`
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
    `);
    console.log('✅ Tabelas de links criadas!\n');

    // 4. Configurar RLS e políticas
    console.log('📝 Configurando RLS...');
    await client.query(`
      ALTER TABLE public.link_profiles ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.link_items ENABLE ROW LEVEL SECURITY;

      -- Remover políticas antigas se existirem
      DROP POLICY IF EXISTS "Perfis públicos são visíveis" ON public.link_profiles;
      DROP POLICY IF EXISTS "Links públicos são visíveis" ON public.link_items;
      DROP POLICY IF EXISTS "Permitir inserção de perfis" ON public.link_profiles;
      DROP POLICY IF EXISTS "Permitir atualização de perfis" ON public.link_profiles;
      DROP POLICY IF EXISTS "Permitir inserção de links" ON public.link_items;
      DROP POLICY IF EXISTS "Permitir atualização de links" ON public.link_items;
      DROP POLICY IF EXISTS "Permitir deleção de links" ON public.link_items;

      -- Políticas públicas (qualquer um pode ler perfis e links ativos)
      CREATE POLICY "Perfis públicos são visíveis"
        ON public.link_profiles
        FOR SELECT
        USING (is_active = true);

      CREATE POLICY "Links públicos são visíveis"
        ON public.link_items
        FOR SELECT
        USING (is_active = true);

      -- Políticas para inserção/atualização (permitir tudo para facilitar)
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
    `);
    console.log('✅ RLS configurado!\n');

    // 5. Criar trigger para updated_at
    console.log('📝 Criando triggers...');
    await client.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS update_link_profiles_updated_at ON public.link_profiles;
      CREATE TRIGGER update_link_profiles_updated_at
        BEFORE UPDATE ON public.link_profiles
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_link_items_updated_at ON public.link_items;
      CREATE TRIGGER update_link_items_updated_at
        BEFORE UPDATE ON public.link_items
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `);
    console.log('✅ Triggers criados!\n');

    // 6. Criar perfis iniciais
    console.log('📝 Criando perfis iniciais...');
    await client.query(`
      INSERT INTO public.link_profiles (slug, name, bio, is_active)
      VALUES 
        ('marcosantonio', 'Marcos Antonio', NULL, true),
        ('ricardohenrique', 'Ricardo Henrique', NULL, true)
      ON CONFLICT (slug) DO NOTHING;
    `);
    console.log('✅ Perfis iniciais criados!\n');

    // 7. Verificar
    const { rows: galleryRows } = await client.query("SELECT COUNT(*) FROM public.gallery");
    const { rows: leadsRows } = await client.query("SELECT COUNT(*) FROM public.leads_diagnostic");
    const { rows: profilesRows } = await client.query("SELECT COUNT(*) FROM public.link_profiles");
    const { rows: linksRows } = await client.query("SELECT COUNT(*) FROM public.link_items");

    console.log('🔍 Verificação:');
    console.log(`  ✅ gallery: ${galleryRows[0].count} registros`);
    console.log(`  ✅ leads_diagnostic: ${leadsRows[0].count} registros`);
    console.log(`  ✅ link_profiles: ${profilesRows[0].count} registros`);
    console.log(`  ✅ link_items: ${linksRows[0].count} registros\n`);

    console.log('╔════════════════════════════════════════╗');
    console.log('║                                        ║');
    console.log('║  ✅ SETUP CONCLUÍDO COM SUCESSO!      ║');
    console.log('║                                        ║');
    console.log('║  Tudo pronto para usar!                ║');
    console.log('║  http://localhost:3000                 ║');
    console.log('║                                        ║');
    console.log('╚════════════════════════════════════════╝\n');

  } catch (error: any) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
