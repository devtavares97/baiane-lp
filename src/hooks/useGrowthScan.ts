import { create } from 'zustand';

/**
 * GROWTH SCAN STORE
 * ------------------
 * Estado global para controlar o modal do Growth Scan
 */

interface GrowthScanStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useGrowthScan = create<GrowthScanStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
