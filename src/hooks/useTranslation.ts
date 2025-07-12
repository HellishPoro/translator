import { useState, useCallback } from 'react';
import { translate, detectLanguage } from '../api/apiTranslation';

export const useTranslation = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDetectingLanguage, setIsDetectingLanguage] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const translateText = useCallback(
    async (text: string, targetLang: string, sourceLang?: string) => {
      setIsLoading(true);
      setError(null);
      if (!sourceLang || sourceLang === 'auto') {
        setIsDetectingLanguage(true);
      }

      try {
        const result = await translate(text, targetLang, sourceLang);

        if ('message' in result) {
          setError(result.message);
          return null;
        }

        return {
          text: result.translations[0]?.text || '',
          detectedSourceLanguage: result.translations[0]?.detectedLanguageCode,
        };
      } catch {
        setError('Произошла ошибка при переводе');
        return null;
      } finally {
        setIsLoading(false);
        setIsDetectingLanguage(false);
      }
    },
    []
  );

  const detectTextLanguage = useCallback(async (text: string) => {
    try {
      setIsDetectingLanguage(true);
      const result = await detectLanguage(text);

      if (typeof result === 'string') {
        return result;
      } else {
        console.warn('Language detection failed:', result.message);
        return null;
      }
    } catch (err) {
      console.warn('Language detection error:', err);
      return null;
    } finally {
      setIsDetectingLanguage(false);
    }
  }, []);

  return {
    translateText,
    detectTextLanguage,
    isDetectingLanguage,
    isLoading,
    error,
    clearError: () => setError(null),
  };
};
