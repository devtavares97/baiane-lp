#!/usr/bin/env tsx

/**
 * INICIALIZAR PERFIS DE LINKS
 * ----------------------------
 * Cria os perfis iniciais para marcosantonio e ricardohenrique
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

const profiles = [
  {
    slug: 'marcosantonio',
    name: 'Marcos Antonio',
    bio: null,
    avatar_url: null,
    is_active: true,
  },
  {
    slug: 'ricardohenrique',
    name: 'Ricardo Henrique',
    bio: null,
    avatar_url: null,
    is_active: true,
  },
];

async function initProfiles() {
  console.log('🚀 Inicializando perfis de links...\n');

  for (const profileData of profiles) {
    try {
      // Verificar se já existe
      const { data: existing } = await supabase
        .from('link_profiles')
        .select('id')
        .eq('slug', profileData.slug)
        .maybeSingle();

      if (existing) {
        console.log(`✅ Perfil "${profileData.slug}" já existe`);
        continue;
      }

      // Criar perfil
      const { data, error } = await supabase
        .from('link_profiles')
        .insert(profileData)
        .select()
        .single();

      if (error) {
        console.error(`❌ Erro ao criar perfil "${profileData.slug}":`, error.message);
        continue;
      }

      console.log(`✅ Perfil "${profileData.slug}" criado com sucesso`);
    } catch (error: any) {
      console.error(`❌ Erro ao processar "${profileData.slug}":`, error.message);
    }
  }

  console.log('\n✨ Concluído!');
}

initProfiles().catch(console.error);
