import { useState } from 'react';
import {
  ActionIcon,
  Badge,
  Card,
  Group,
  Text,
  Tooltip,
  Modal,
  Button,
  Stack,
  Flex
} from '@mantine/core';
import { IconTrash, IconVolume } from '@tabler/icons-react';
import type { GlossaryItem as GlossaryItemType } from '../../types/glossary.types';
import { useGlossaryStore } from '../../store/useGlossaryStore';

interface GlossaryItemProps {
  item: GlossaryItemType;
  speak: (text: string) => void;
}

export const GlossaryItem = ({ item, speak }: GlossaryItemProps) => {
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  const { deleteItem } = useGlossaryStore();

  const handleDelete = async () => {
    await deleteItem(item.id);
    setDeleteModalOpened(false);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Card shadow="sm" padding="md" radius="md" withBorder>
        <Stack gap="sm">
          <Group justify="space-between" align="flex-start">
            <Flex direction="column" style={{ flex: 1 }}>
              <Group gap="xs" mb="xs">
                <Badge variant="light" color="blue" size="sm">
                  {item.sourceLanguageName}
                </Badge>
                <Text size="sm" c="dimmed">
                  →
                </Text>
                <Badge variant="light" color="green" size="sm">
                  {item.targetLanguageName}
                </Badge>
              </Group>

              <Group gap="xs" mb="xs">
                <Text fw={600} size="md" style={{ wordBreak: 'break-word' }}>
                  {item.originalText}
                </Text>
                <Tooltip label="Listen" withArrow>
                  <ActionIcon
                    variant="subtle"
                    color="indigo"
                    size="sm"
                    onClick={() => speak(item.originalText)}
                  >
                    <IconVolume size={16} />
                  </ActionIcon>
                </Tooltip>
              </Group>

              <Group gap="xs">
                <Text c="indigo.7" fw={500} size="md" style={{ wordBreak: 'break-word' }}>
                  {item.translatedText}
                </Text>
                <Tooltip label="Listen" withArrow>
                  <ActionIcon
                    variant="subtle"
                    color="indigo"
                    size="sm"
                    onClick={() => speak(item.translatedText)}
                  >
                    <IconVolume size={16} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Flex>

            <Group gap="xs">
              <Tooltip label="Delete" withArrow>
                <ActionIcon variant="subtle" color="red" onClick={() => setDeleteModalOpened(true)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>

          <Text size="xs" c="dimmed">
            Added: {formatDate(item.dateAdded)}
          </Text>
        </Stack>
      </Card>

      <Modal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        title="Delete Glossary Item"
        size="sm"
      >
        <Stack gap="md">
          <Text>Are you sure you want to delete "{item.originalText}" from your glossary?</Text>
          <Group justify="flex-end" gap="sm">
            <Button variant="outline" onClick={() => setDeleteModalOpened(false)}>
              Cancel
            </Button>
            <Button color="red" onClick={handleDelete}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};
