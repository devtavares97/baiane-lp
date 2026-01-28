#!/usr/bin/env tsx

/**
 * SETUP DIRETO VIA API REST
 * --------------------------
 * Cria tabelas usando SQL query direto
 */

import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const PROJECT_REF = 'ismikqcmdpjqmeirwpow';

async function executeSQL(sql: string): Promise<void> {
  const response = await fetch(
    `https://${PROJECT_REF}.supabase.co/rest/v1/rpc/exec_sql`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ query: sql }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text}`);
  }

  return response.json();
}

async function main() {
  console.log('🚀 Configurando Supabase...\n');

  try {
    // SQL completo
    const sql = `
      -- Tabela Gallery
      DROP TABLE IF EXISTS public.gallery CASCADE;
      
      CREATE TABLE public.gallery (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        image_url TEXT NOT NULL,
        category TEXT NOT NULL,
        caption TEXT,
        alt TEXT NOT NULL DEFAULT 'Imagem da galeria',
        "order" INTEGER NOT NULL DEFAULT 0,
        active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Tabela Leads
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
    `;

    console.log('📝 Executando SQL...');
    await executeSQL(sql);
    console.log('✅ Tabelas criadas com sucesso!\n');

  } catch (error: any) {
    console.error('❌ Erro:', error.message);
    console.log('\n⚠️  Por favor, execute manualmente os arquivos SQL:');
    console.log('  - supabase-gallery-setup-FIXED.sql');
    console.log('  - supabase-growth-scan.sql\n');
    process.exit(1);
  }

  console.log('╔════════════════════════════════════════╗');
  console.log('║  ✅ SETUP CONCLUÍDO!                  ║');
  console.log('╚════════════════════════════════════════╝\n');
}

main();
