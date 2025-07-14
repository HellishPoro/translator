import { notifications } from '@mantine/notifications';
import { useGlossaryStore } from '../store/useGlossaryStore';
import type { GlossaryItem } from '../types/glossary.types';

export const useGlossaryAction = () => {
  const addItem = useGlossaryStore(state => state.addItem);
  const items = useGlossaryStore(state => state.items);

  const addToGlossary = async (item: Omit<GlossaryItem, 'id' | 'dateAdded'>) => {
    const success = await addItem(item);

    if (success) {
      notifications.show({
        title: 'Success',
        message: 'Word added to glossary!',
        color: 'green'
      });
    } else {
      notifications.show({
        title: 'Already exists',
        message: 'This word is already in your glossary',
        color: 'orange'
      });
    }

    return success;
  };

  const checkIfExists = (text: string, sourceLang: string, targetLang: string) => {
    return items.some(
      item =>
        item.originalText === text &&
        item.sourceLanguage === sourceLang &&
        item.targetLanguage === targetLang
    );
  };

  return {
    addToGlossary,
    checkIfExists
  };
};
