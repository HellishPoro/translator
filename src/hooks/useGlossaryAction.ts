import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { useGlossaryStore } from '../store/useGlossaryStore';
import type { GlossaryItem } from '../types/glossary.types';

export const useGlossaryAction = () => {
  const addItem = useGlossaryStore(state => state.addItem);
  const [exists, setExists] = useState(false);

  const addToGlossary = async (item: Omit<GlossaryItem, 'id' | 'dateAdded'>) => {
    const success = await addItem(item);

    if (success) {
      notifications.show({
        title: 'Success',
        message: 'Word added to glossary!',
        color: 'green'
      });
      setExists(true);
    } else {
      notifications.show({
        title: 'Already exists',
        message: 'This word is already in your glossary',
        color: 'orange'
      });
      setExists(true);
    }

    return success;
  };

  return {
    existsInGlossary: exists,
    addToGlossary
  };
};
