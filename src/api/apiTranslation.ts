import type {
  ApiError,
  DetectLanguageResponse,
  Language,
  TranslateResponse,
} from '../types/api.types';
import { apiClient } from './apiClient';
import { axiosError } from './axiosError';

export const getLanguages = async (): Promise<Language[] | ApiError> => {
  try {
    const response = await apiClient.post<{ languages: Language[] }>(
      '/d4evir8cmhdpro9juk3s'
    );

    return response.data.languages;
  } catch (error: unknown) {
    return axiosError(error, 'Language fetching failed');
  }
};

export const translate = async (
  texts: string,
  targetLanguageCode: string,
  sourceLanguageCode?: string
): Promise<TranslateResponse | ApiError> => {
  try {
    const response = await apiClient.post<TranslateResponse>(
      '/d4efot9b5crnbr09g2mt',
      {
        texts: [texts],
        targetLanguageCode,
        sourceLanguageCode,
      }
    );

    return response.data;
  } catch (error: unknown) {
    return axiosError(error, 'Translation failed');
  }
};

export const detectLanguage = async (
  text: string
): Promise<string | ApiError> => {
  try {
    const response = await apiClient.post<DetectLanguageResponse>(
      '/d4e0ng82lsmf6gpteqpe',
      {
        text,
      }
    );

    return response.data.languageCode;
  } catch (error: unknown) {
    return axiosError(error, 'Language detection failed');
  }
};
