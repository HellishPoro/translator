import { create } from 'zustand';

interface TranslateState {
  sourceText: string;
  sourceLanguageCode: string;
  targetLanguageCode: string;
  setSourceText: (text: string) => void;
  setTargetLanguageCode: (language: string) => void;
  setSourceLanguageCode: (language: string) => void;
}

export const useTranslateStore = create<TranslateState>(set => ({
  sourceText: '', //выделенный текст
  targetLanguageCode: 'ru',
  sourceLanguageCode: 'en', //язык, который определился от api
  setSourceText: text => set({ sourceText: text }),
  setTargetLanguageCode: language => set({ targetLanguageCode: language }),
  setSourceLanguageCode: language => set({ sourceLanguageCode: language }) //триггер определение языка
}));
