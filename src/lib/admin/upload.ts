import { supabase } from '@/lib/supabase';

/**
 * ADMIN UPLOAD UTILITIES
 * -----------------------
 * Funções para upload de arquivos no Supabase Storage e inserção no banco
 */

export interface UploadResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

/**
 * Upload de um arquivo para o Supabase Storage
 */
export async function uploadToStorage(
  file: File,
  category: 'portfolio' | 'logo'
): Promise<string | null> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  try {
    // Gerar nome único para o arquivo
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${category}/${fileName}`;

    // Upload para o Storage
    const { error: uploadError } = await supabase.storage
      .from('gallery_images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    // Obter URL pública
    const { data: urlData } = supabase.storage
      .from('gallery_images')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
}

/**
 * Inserir registro da imagem na tabela 'gallery'
 */
export async function insertGalleryRecord(
  imageUrl: string,
  category: 'portfolio' | 'logo',
  order: number,
  caption?: string,
  alt?: string
): Promise<boolean> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  try {
    // @ts-ignore - Gallery types
    const { error } = await supabase.from('gallery').insert({
      image_url: imageUrl,
      category,
      order,
      caption: caption || null,
      alt: alt || `Imagem ${category}`,
      active: true,
    });

    if (error) {
      console.error('Error inserting gallery record:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to insert gallery record:', error);
    return false;
  }
}

/**
 * Upload completo: Storage + Banco de Dados
 */
export async function uploadImage(
  file: File,
  category: 'portfolio' | 'logo',
  order: number,
  caption?: string,
  alt?: string
): Promise<UploadResult> {
  try {
    // 1. Upload para Storage
    const imageUrl = await uploadToStorage(file, category);
    
    if (!imageUrl) {
      return {
        success: false,
        error: 'Falha ao fazer upload do arquivo',
      };
    }

    // 2. Inserir no banco
    const inserted = await insertGalleryRecord(imageUrl, category, order, caption, alt);

    if (!inserted) {
      return {
        success: false,
        error: 'Falha ao salvar registro no banco',
      };
    }

    return {
      success: true,
      imageUrl,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
}

/**
 * Upload em massa (múltiplos arquivos)
 */
export async function bulkUploadImages(
  files: File[],
  category: 'portfolio' | 'logo',
  startOrder: number = 1
): Promise<{
  success: number;
  failed: number;
  errors: string[];
}> {
  const results = {
    success: 0,
    failed: 0,
    errors: [] as string[],
  };

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const order = startOrder + i;

    const result = await uploadImage(file, category, order);

    if (result.success) {
      results.success++;
    } else {
      results.failed++;
      results.errors.push(`${file.name}: ${result.error}`);
    }
  }

  return results;
}
