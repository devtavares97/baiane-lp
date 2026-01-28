import { supabase, isSupabaseAvailable } from '@/lib/supabase';
import type { GalleryItem } from '@/types/supabase';

/**
 * GALLERY QUERIES
 * ---------------
 * Funções para buscar imagens da galeria (categorias: portfolio e logo)
 */

/**
 * Busca imagens da galeria por categoria
 */
export async function getGalleryByCategory(
  category: 'portfolio' | 'logo',
  limit?: number
): Promise<GalleryItem[]> {
  // Se Supabase não está configurado, retorna array vazio
  if (!isSupabaseAvailable || !supabase) {
    return [];
  }

  try {
    let query = supabase
      .from('gallery')
      .select('*')
      .eq('category', category)
      .eq('active', true)
      .order('order', { ascending: true });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error(`Error fetching gallery (${category}):`, error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(`Failed to fetch gallery (${category}):`, error);
    return [];
  }
}

/**
 * Busca TODAS as imagens do portfólio
 */
export async function getPortfolioImages(limit?: number): Promise<GalleryItem[]> {
  return getGalleryByCategory('portfolio', limit);
}

/**
 * Busca TODOS os logos
 */
export async function getLogoImages(limit?: number): Promise<GalleryItem[]> {
  return getGalleryByCategory('logo', limit);
}

/**
 * Busca TODAS as imagens da galeria (ambas categorias)
 */
export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  if (!isSupabaseAvailable || !supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('active', true)
      .order('category', { ascending: true })
      .order('order', { ascending: true });

    if (error) {
      console.error('Error fetching all gallery items:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch all gallery items:', error);
    return [];
  }
}
