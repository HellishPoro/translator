import { useState, useCallback } from 'react';
import { translate, detectLanguage } from '../api/apiTranslation';
import { useTranslateStore } from '../store/useTranslateStore';

export const useTranslation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setSourceLanguageCode } = useTranslateStore();

  const translateText = useCallback(
    async (text: string, targetLang: string, sourceLang?: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await translate(text, targetLang, sourceLang);

        if ('message' in result) {
          setError(result.message);
          return null;
        }

        if (result.detectedSourceLanguage) {
          setSourceLanguageCode(result.detectedSourceLanguage);
        }

        return result.translations[0]?.text || '';
      } catch {
        setError('Произошла ошибка при переводе');
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [setSourceLanguageCode]
  );

  const detectTextLanguage = useCallback(
    async (text: string) => {
      try {
        const result = await detectLanguage(text);

        if (typeof result === 'string') {
          setSourceLanguageCode(result);
          return result;
        } else {
          console.warn('Language detection failed:', result.message);
          return null;
        }
      } catch (err) {
        console.warn('Language detection error:', err);
        return null;
      }
    },
    [setSourceLanguageCode]
  );

  return {
    translateText,
    detectTextLanguage,
    isLoading,
    error,
    clearError: () => setError(null)
  };
};
