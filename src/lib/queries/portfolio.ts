import { supabase, isSupabaseAvailable } from '@/lib/supabase';
import type { PortfolioImage } from '@/types/supabase';

/**
 * PORTFOLIO IMAGES QUERIES
 * -------------------------
 * Funções para buscar imagens do portfólio do Supabase.
 * Se Supabase não estiver configurado, retorna array vazio (fallback para dados estáticos).
 */

export async function getPortfolioImages(limit?: number): Promise<PortfolioImage[]> {
  // Se Supabase não estiver configurado, retornar vazio (usa fallback)
  if (!isSupabaseAvailable || !supabase) {
    return [];
  }

  try {
    let query = supabase
      .from('portfolio_images')
      .select('*')
      .eq('active', true)
      .order('order', { ascending: true });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching portfolio images:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching portfolio images:', error);
    return [];
  }
}

/**
 * Cache helper - revalidar a cada 30 minutos
 */
export const getPortfolioImagesWithCache = async (limit?: number): Promise<PortfolioImage[]> => {
  const data = await getPortfolioImages(limit);
  return data;
};
