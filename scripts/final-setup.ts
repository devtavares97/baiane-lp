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

    // 3. Verificar
    const { rows: galleryRows } = await client.query("SELECT COUNT(*) FROM public.gallery");
    const { rows: leadsRows } = await client.query("SELECT COUNT(*) FROM public.leads_diagnostic");

    console.log('🔍 Verificação:');
    console.log(`  ✅ gallery: ${galleryRows[0].count} registros`);
    console.log(`  ✅ leads_diagnostic: ${leadsRows[0].count} registros\n`);

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
