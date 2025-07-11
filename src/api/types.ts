export interface Language {
  code: string;
  name: string;
}

export interface TranslateResponse {
  translations: { text: string }[];
  detectedSourceLanguage?: string;
}

export interface DetectLanguageResponse {
  languageCode: string;
}

export interface ApiError {
  message: string;
  code?: number;
}
