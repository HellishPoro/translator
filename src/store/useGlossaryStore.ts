import { create } from 'zustand';
import type { GlossaryItem, GlossaryFilterType } from '../types/glossary.types';
import { indexedDBManager } from '../utils/indexedDB';

interface GlossaryState {
  items: GlossaryItem[];
  isLoading: boolean;
  error: string | null;
  filter: GlossaryFilterType;
  loadItems: () => Promise<void>;
  addItem: (item: Omit<GlossaryItem, 'id' | 'dateAdded'>) => Promise<boolean>;
  deleteItem: (id: string) => Promise<void>;
  setFilter: (filter: Partial<GlossaryFilterType>) => void;
  clearError: () => void;
}

export const useGlossaryStore = create<GlossaryState>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,
  filter: { search: '', sourceLanguage: '', targetLanguage: '' },

  loadItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const items = await indexedDBManager.getAllItems();
      set({ items: items.sort((a, b) => b.dateAdded - a.dateAdded), isLoading: false });
    } catch {
      set({ error: 'Failed to load glossary items', isLoading: false });
    }
  },

  addItem: async itemData => {
    set({ error: null });
    try {
      const exists = await indexedDBManager.checkIfExists(
        itemData.originalText,
        itemData.sourceLanguage,
        itemData.targetLanguage
      );

      if (exists) {
        set({ error: 'This word already exists in glossary' });
        return false;
      }

      const item: GlossaryItem = {
        ...itemData,
        id: crypto.randomUUID(),
        dateAdded: Date.now()
      };

      await indexedDBManager.addItem(item);
      set({ items: [item, ...get().items] });
      return true;
    } catch {
      set({ error: 'Failed to add item to glossary' });
      return false;
    }
  },

  deleteItem: async id => {
    set({ error: null });
    try {
      await indexedDBManager.deleteItem(id);
      set({ items: get().items.filter(item => item.id !== id) });
    } catch {
      set({ error: 'Failed to delete item' });
    }
  },

  setFilter: newFilter => set({ filter: { ...get().filter, ...newFilter } }),
  clearError: () => set({ error: null })
}));
