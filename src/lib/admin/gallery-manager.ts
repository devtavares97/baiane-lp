import { supabase } from '@/lib/supabase';
import type { GalleryItem } from '@/types/supabase';

/**
 * GALLERY MANAGER
 * ---------------
 * Funções para gerenciar imagens da galeria (listar e deletar)
 */

/**
 * Buscar todas as imagens (incluindo inativas)
 */
export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('category', { ascending: true })
      .order('order', { ascending: true });

    if (error) {
      console.error('Error fetching gallery items:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch gallery items:', error);
    return [];
  }
}

/**
 * Deletar imagem da galeria
 */
export async function deleteGalleryItem(id: string, imageUrl: string): Promise<boolean> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  try {
    // 1. Deletar do banco
    const { error: dbError } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);

    if (dbError) {
      console.error('Error deleting from database:', dbError);
      return false;
    }

    // 2. Deletar do Storage
    // Extrair o path do storage da URL
    // Ex: https://xxx.supabase.co/storage/v1/object/public/gallery_images/portfolio/file.jpg
    const urlParts = imageUrl.split('/gallery_images/');
    if (urlParts.length > 1) {
      const filePath = urlParts[1];
      
      const { error: storageError } = await supabase.storage
        .from('gallery_images')
        .remove([filePath]);

      if (storageError) {
        console.error('Error deleting from storage:', storageError);
        // Não retornar false aqui pois o registro do banco já foi deletado
      }
    }

    return true;
  } catch (error) {
    console.error('Failed to delete gallery item:', error);
    return false;
  }
}

/**
 * Atualizar ordem de uma imagem
 */
export async function updateImageOrder(id: string, newOrder: number): Promise<boolean> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  try {
    const { error } = await (supabase as any)
      .from('gallery')
      .update({ order: newOrder })
      .eq('id', id);

    if (error) {
      console.error('Error updating order:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to update order:', error);
    return false;
  }
}
