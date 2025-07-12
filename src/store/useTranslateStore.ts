import { create } from 'zustand';
import type { Language } from '../types/api.types';

interface TranslateState {
  sourceText: string;
  sourceLanguageCode: string;
  targetLanguageCode: string;
  languages: Language[];
  setSourceText: (text: string) => void;
  setTargetLanguageCode: (language: string) => void;
  setSourceLanguageCode: (language: string) => void;
  setLanguages: (languages: Language[]) => void;
}

export const useTranslateStore = create<TranslateState>(set => ({
  sourceText: '', //выделенный текст
  targetLanguageCode: 'ru',
  sourceLanguageCode: 'en', //язык, который определился от api
  languages: [],
  setSourceText: (text) => set({ sourceText: text }),
  setTargetLanguageCode: (language) => set({ targetLanguageCode: language }),
  setSourceLanguageCode: (language) => set({ sourceLanguageCode: language }), //триггер определение языка
  setLanguages: (languages) => set({ languages: languages }),
}));
