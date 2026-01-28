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
      console.error('Error saving lead:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to save lead:', error);
    return false;
  }
}
