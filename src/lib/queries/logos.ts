import { supabase, isSupabaseAvailable } from '@/lib/supabase';
import type { CompanyLogo } from '@/types/supabase';

/**
 * COMPANY LOGOS QUERIES
 * ---------------------
 * Funções para buscar logos das empresas do Supabase.
 * Se Supabase não estiver configurado, retorna array vazio (fallback para dados estáticos).
 */

export async function getCompanyLogos(): Promise<CompanyLogo[]> {
  // Se Supabase não estiver configurado, retornar vazio (usa fallback)
  if (!isSupabaseAvailable || !supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('company_logos')
      .select('*')
      .eq('active', true)
      .order('order', { ascending: true });

    if (error) {
      console.error('Error fetching company logos:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching company logos:', error);
    return [];
  }
}

/**
 * Cache helper - revalidar a cada 1 hora
 */
export const getCompanyLogosWithCache = async (): Promise<CompanyLogo[]> => {
  const data = await getCompanyLogos();
  return data;
};
