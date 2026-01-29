#!/usr/bin/env tsx

/**
 * VERIFICAR TABELAS NO SUPABASE
 * ------------------------------
 * Verifica se todas as tabelas necessárias existem
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Variáveis de ambiente não encontradas!');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const tables = [
  'gallery',
  'company_logos',
  'portfolio_images',
  'leads_diagnostic',
  'link_profiles',
  'link_items',
];

async function checkTables() {
  console.log('🔍 Verificando tabelas no Supabase...\n');
  console.log(`URL: ${SUPABASE_URL}\n`);

  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('id')
        .limit(1);

      if (error) {
        console.log(`❌ ${table}: ${error.message}`);
      } else {
        console.log(`✅ ${table}: OK (${data?.length || 0} registros testados)`);
      }
    } catch (error: any) {
      console.log(`❌ ${table}: ${error.message}`);
    }
  }

  console.log('\n✨ Verificação concluída!');
}

checkTables().catch(console.error);
