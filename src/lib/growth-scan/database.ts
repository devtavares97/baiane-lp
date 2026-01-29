import { supabase } from '@/lib/supabase';
import type { GrowthScanLead } from '@/types/growth-scan';

/**
 * GROWTH SCAN DATABASE
 * ---------------------
 * Funções para salvar leads no Supabase
 */

export async function saveGrowthScanLead(lead: GrowthScanLead): Promise<boolean> {
  if (!supabase) {
    console.error('Supabase not configured');
    return false;
  }

  try {
    // Adicionar metadados
    const leadWithMetadata = {
      ...lead,
      user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
      referrer: typeof window !== 'undefined' ? document.referrer : null,
    };

    const { error } = await (supabase.from('leads_diagnostic') as any)
      .insert(leadWithMetadata);

    if (error) {
      console.error('[Growth Scan] Erro ao salvar lead:', error.message, error.code, error.details);
      return false;
    }

    return true;
  } catch (error) {
    const err = error as Error;
    console.error('[Growth Scan] Falha ao salvar lead:', err?.message ?? error);
    return false;
  }
}
