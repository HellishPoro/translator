import { useEffect, useMemo } from 'react';
import {
  Box,
  Container,
  Title,
  Text,
  Stack,
  Alert,
  Loader,
  Center,
  Group,
  Button
} from '@mantine/core';
import { IconAlertCircle, IconBook, IconArrowLeft } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useGlossaryStore } from '../../store/useGlossaryStore';
import { useTranslateStore } from '../../store/useTranslateStore';
import { GlossaryItem } from '../../components';
import { GlossaryFilter } from '../../components';

export function Glossary() {
  const { items, isLoading, error, filter, loadItems, setFilter, clearError } = useGlossaryStore();

  const { languages } = useTranslateStore();

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const speak = (textToSpeak: string) => {
    const voice = new SpeechSynthesisUtterance(textToSpeak);
    speechSynthesis.speak(voice);
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch =
        !filter.search ||
        item.originalText.toLowerCase().includes(filter.search.toLowerCase()) ||
        item.translatedText.toLowerCase().includes(filter.search.toLowerCase());

      const matchesSourceLanguage =
        !filter.sourceLanguage || item.sourceLanguage === filter.sourceLanguage;

      const matchesTargetLanguage =
        !filter.targetLanguage || item.targetLanguage === filter.targetLanguage;

      return matchesSearch && matchesSourceLanguage && matchesTargetLanguage;
    });
  }, [items, filter]);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader color="blue" size="lg" />
      </Center>
    );
  }

  return (
    <Box bg="gray.0" mih="100vh" p="md">
      <Container size="lg">
        <Stack gap="xl">
          <Group justify="space-between" align="center">
            <Group gap="md">
              <Button
                component={Link}
                to="/"
                variant="subtle"
                leftSection={<IconArrowLeft size={16} />}
              >
                Back to Translator
              </Button>
              <Group gap="sm">
                <IconBook size={24} color="var(--mantine-color-indigo-6)" />
                <Title order={1} c="indigo.6">
                  My Glossary
                </Title>
              </Group>
            </Group>
          </Group>

          {error && (
            <Alert
              icon={<IconAlertCircle size={16} />}
              color="red"
              variant="light"
              onClose={clearError}
              withCloseButton
            >
              {error}
            </Alert>
          )}

          <GlossaryFilter filter={filter} onFilterChange={setFilter} languages={languages} />

          {filteredItems.length !== items.length && (
            <Text size="sm" c="dimmed">
              Showing {filteredItems.length} of {items.length} words
            </Text>
          )}

          {filteredItems.length === 0 ? (
            <Center py="xl">
              <Stack align="center" gap="md">
                <IconBook size={48} color="var(--mantine-color-gray-4)" />
                <Text size="lg" c="dimmed" ta="center">
                  {items.length === 0
                    ? "Your glossary is empty. Start adding words by selecting text and clicking the 'Add to glossary' button!"
                    : 'No words match your current filters.'}
                </Text>
                {items.length === 0 && (
                  <Button component={Link} to="/" variant="light">
                    Go to Translator
                  </Button>
                )}
              </Stack>
            </Center>
          ) : (
            <Stack gap="md">
              {filteredItems.map(item => (
                <GlossaryItem key={item.id} item={item} speak={speak} />
              ))}
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
