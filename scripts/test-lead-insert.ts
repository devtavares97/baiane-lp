#!/usr/bin/env tsx
/**
 * Testa INSERT de lead com chave anon (simula formulário Growth Scan).
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
if (!url || !anon) {
  console.error('❌ Variáveis NEXT_PUBLIC_* não encontradas.');
  process.exit(1);
}

const supabase = createClient(url, anon);

async function main() {
  const testLead = {
    contact_name: 'Teste RLS',
    contact_email: 'teste-rls@teste.com',
    contact_whatsapp: null,
    revenue_tier: 'up_to_30k',
    main_pain: 'conversion',
    maturity_score: 50,
    result_archetype: 'Teste',
  };

  const { data, error } = await supabase.from('leads_diagnostic').insert(testLead).select('id').single();

  if (error) {
    console.error('❌ INSERT falhou:', error.message, error.code);
    process.exit(1);
  }
  console.log('✅ INSERT com anon key OK. id:', data?.id);
}

main();
