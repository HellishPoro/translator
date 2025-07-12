import { create } from 'zustand';
import type { Language } from '../types/api.types';
import type { SelectedValue } from '../components';
import { initialSelectedLanguage } from '../constants/initialSelectedLanguage';

interface TranslateState {
  sourceText: string;
  selectedLanguage: SelectedValue;
  languages: Language[];
  setSourceText: (text: string) => void;
  setLanguages: (languages: Language[]) => void;
  setSelectedLanguage: (language: SelectedValue) => void;
}

export const useTranslateStore = create<TranslateState>((set) => ({
  sourceText: '', //выделенный текст
  languages: [],
  selectedLanguage: initialSelectedLanguage,
  setSourceText: (text) => set({ sourceText: text }),
  setLanguages: (languages) => set({ languages: languages }),
  setSelectedLanguage: (language) => set({ selectedLanguage: language }),
}));
