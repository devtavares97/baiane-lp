#!/usr/bin/env tsx

/**
 * CRIAR TABELAS NO SUPABASE
 * --------------------------
 * Script direto para criar as tabelas necessárias
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

console.log('🚀 Criando tabelas no Supabase...\n');

async function executeSQL(sql: string, description: string): Promise<boolean> {
  console.log(`📝 ${description}...`);
  
  try {
    const { error } = await supabase.rpc('exec_sql', { sql });
    
    if (error) {
      console.error(`❌ Erro: ${error.message}`);
      return false;
    }
    
    console.log(`✅ ${description} - OK\n`);
    return true;
  } catch (error: any) {
    console.error(`❌ Erro: ${error.message}\n`);
    return false;
  }
}

async function main() {
  // 1. Criar tabela gallery
  await executeSQL(
    `
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
    `,
    'Criando tabela gallery'
  );

  // 2. Criar tabela leads_diagnostic
  await executeSQL(
    `
    DROP TABLE IF EXISTS public.leads_diagnostic CASCADE;
    
    CREATE TABLE public.leads_diagnostic (
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

    CREATE INDEX idx_leads_created ON public.leads_diagnostic(created_at DESC);
    CREATE INDEX idx_leads_email ON public.leads_diagnostic(contact_email);
    `,
    'Criando tabela leads_diagnostic'
  );

  // 3. Criar bucket
  console.log('📦 Criando bucket de storage...');
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some((b) => b.id === 'gallery_images');

  if (!exists) {
    const { error } = await supabase.storage.createBucket('gallery_images', {
      public: true,
      fileSizeLimit: 5242880,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
    });

    if (error) {
      console.error(`❌ Erro ao criar bucket: ${error.message}\n`);
    } else {
      console.log('✅ Bucket criado!\n');
    }
  } else {
    console.log('✅ Bucket já existe!\n');
  }

  console.log('╔════════════════════════════════════════╗');
  console.log('║                                        ║');
  console.log('║  ✅ SETUP CONCLUÍDO!                  ║');
  console.log('║                                        ║');
  console.log('╚════════════════════════════════════════╝\n');
}

main().catch(console.error);
