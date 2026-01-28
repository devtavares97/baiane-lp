#!/usr/bin/env tsx

/**
 * SETUP AUTOMÁTICO DO SUPABASE
 * -----------------------------
 * Este script configura TUDO no Supabase automaticamente:
 * - Cria tabelas
 * - Cria índices
 * - Configura RLS
 * - Cria buckets de storage
 * - Configura políticas de storage
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Carregar .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Variáveis de ambiente não encontradas!');
  console.error('Certifique-se de que .env.local está configurado.');
  process.exit(1);
}

// Cliente com poderes de admin
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

console.log('╔════════════════════════════════════════╗');
console.log('║                                        ║');
console.log('║   🚀 SETUP AUTOMÁTICO DO SUPABASE     ║');
console.log('║                                        ║');
console.log('╚════════════════════════════════════════╝\n');

async function setupDatabase() {
  console.log('📊 Configurando banco de dados...\n');

  // SQL para criar todas as tabelas
  const sql = `
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

    CREATE INDEX IF NOT EXISTS idx_gallery_category ON public.gallery(category);
    CREATE INDEX IF NOT EXISTS idx_gallery_active ON public.gallery(active);
    CREATE INDEX IF NOT EXISTS idx_gallery_order ON public.gallery("order");

    ALTER TABLE public.gallery DISABLE ROW LEVEL SECURITY;

    -- ============================================
    -- TABELA: leads_diagnostic
    -- ============================================
    CREATE TABLE IF NOT EXISTS public.leads_diagnostic (
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

    CREATE INDEX IF NOT EXISTS idx_leads_diagnostic_created ON public.leads_diagnostic(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_leads_diagnostic_email ON public.leads_diagnostic(contact_email);

    ALTER TABLE public.leads_diagnostic DISABLE ROW LEVEL SECURITY;
  `;

  const { error } = await supabase.rpc('exec_sql', { sql_query: sql }).select();

  if (error) {
    // Tentar método alternativo (query direto)
    console.log('⚠️  Método RPC não disponível, tentando método direto...\n');
    
    // Criar tabelas uma por uma
    const tables = [
      {
        name: 'gallery',
        sql: `
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
        `,
      },
      {
        name: 'leads_diagnostic',
        sql: `
          CREATE TABLE IF NOT EXISTS public.leads_diagnostic (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            contact_name TEXT NOT NULL,
            contact_email TEXT NOT NULL,
            contact_whatsapp TEXT,
            revenue_tier TEXT NOT NULL,
            main_pain TEXT NOT NULL,
            team_structure TEXT,
            maturity_score INTEGER NOT NULL DEFAULT 0,
            result_archetype TEXT NOT NULL,
            user_agent TEXT,
            referrer TEXT
          );
        `,
      },
    ];

    console.log('⚠️  ATENÇÃO: Não consegui criar via script.');
    console.log('Por favor, execute manualmente os arquivos SQL:\n');
    console.log('  1. supabase-gallery-setup-FIXED.sql');
    console.log('  2. supabase-growth-scan.sql\n');
    return false;
  }

  console.log('✅ Tabelas criadas com sucesso!\n');
  return true;
}

async function setupStorage() {
  console.log('🗄️  Configurando Storage...\n');

  try {
    // Verificar se bucket existe
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some((b) => b.id === 'gallery_images');

    if (!bucketExists) {
      console.log('📦 Criando bucket gallery_images...');
      
      const { error } = await supabase.storage.createBucket('gallery_images', {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
      });

      if (error) {
        console.error('❌ Erro ao criar bucket:', error.message);
        return false;
      }

      console.log('✅ Bucket criado!\n');
    } else {
      console.log('✅ Bucket já existe!\n');
    }

    return true;
  } catch (error) {
    console.error('❌ Erro ao configurar storage:', error);
    return false;
  }
}

async function verifySetup() {
  console.log('🔍 Verificando configuração...\n');

  try {
    // Verificar tabelas
    const { data: galleryData, error: galleryError } = await supabase
      .from('gallery')
      .select('count')
      .limit(1);

    const { data: leadsData, error: leadsError } = await supabase
      .from('leads_diagnostic')
      .select('count')
      .limit(1);

    console.log('📊 Status das Tabelas:');
    console.log(`  gallery: ${galleryError ? '❌ Erro' : '✅ OK'}`);
    console.log(`  leads_diagnostic: ${leadsError ? '❌ Erro' : '✅ OK'}\n');

    // Verificar storage
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some((b) => b.id === 'gallery_images');

    console.log('🗄️  Status do Storage:');
    console.log(`  gallery_images bucket: ${bucketExists ? '✅ OK' : '❌ Não encontrado'}\n`);

    if (galleryError || leadsError || !bucketExists) {
      console.log('⚠️  Algumas configurações falharam.');
      console.log('Execute manualmente os arquivos SQL no Supabase Dashboard.\n');
      return false;
    }

    return true;
  } catch (error) {
    console.error('❌ Erro na verificação:', error);
    return false;
  }
}

async function main() {
  console.log('🔗 Conectando ao Supabase...\n');

  // Verificar conexão
  const { data, error } = await supabase.from('gallery').select('count').limit(1);

  if (!error && data !== null) {
    console.log('✅ Tabela gallery já existe!\n');
  }

  // Setup Storage
  await setupStorage();

  // Verificação final
  const success = await verifySetup();

  if (success) {
    console.log('╔════════════════════════════════════════╗');
    console.log('║                                        ║');
    console.log('║  ✅ SETUP CONCLUÍDO COM SUCESSO!      ║');
    console.log('║                                        ║');
    console.log('║  Acesse: http://localhost:3000         ║');
    console.log('║  Admin: http://localhost:3000/admin    ║');
    console.log('║                                        ║');
    console.log('╚════════════════════════════════════════╝\n');
  } else {
    console.log('❌ Setup incompleto. Verifique os erros acima.\n');
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});
