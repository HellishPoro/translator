export interface GlossaryItem {
  id: string;
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  sourceLanguageName: string;
  targetLanguageName: string;
  dateAdded: number;
}

export interface GlossaryFilterType {
  search: string;
  sourceLanguage: string;
  targetLanguage: string;
}
