import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Supabase Client Configuration
// ------------------------------
// Este cliente é usado no browser (client-side)
// FALLBACK: Se não configurado, retorna null e usa dados estáticos

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Verificar se Supabase está configurado
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Criar cliente apenas se configurado
export const supabase = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: false,
      },
    })
  : null;

// Flag para saber se o Supabase está disponível
export const isSupabaseAvailable = isSupabaseConfigured;

// Helper function para verificar conexão
export async function checkSupabaseConnection() {
  if (!supabase) return false;
  
  try {
    const { error } = await supabase.from('company_logos').select('count');
    return !error;
  } catch {
    return false;
  }
}

// Log de status (apenas em desenvolvimento)
if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  if (!isSupabaseConfigured) {
    console.log('⚠️  Supabase not configured - using static fallback data');
    console.log('📖 Read SUPABASE-SETUP.md for setup instructions');
  } else {
    console.log('✅ Supabase configured successfully');
  }
}
