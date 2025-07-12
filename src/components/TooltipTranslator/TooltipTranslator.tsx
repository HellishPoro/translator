import { useEffect, useState } from 'react';
import {
  ActionIcon,
  Alert,
  Box,
  Divider,
  Flex,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconAlertCircle, IconVolume, IconX } from '@tabler/icons-react';
import { useTranslateStore } from '../../store/useTranslateStore';
import { useTranslation } from '../../hooks/useTranslation';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';

interface TooltipTranslatorProps {
  setOpenedTooltip: (i: boolean) => void;
  selectedText: string;
  speak: (text: string) => void;
}

export const TooltipTranslator = (props: TooltipTranslatorProps) => {
  const { setOpenedTooltip, selectedText, speak } = props;
  const { selectedLanguage, setSelectedLanguage, languages } =
    useTranslateStore();
  const { translateText, isLoading, error, clearError, isDetectingLanguage } =
    useTranslation();
  const [translatedText, setTranslatedText] = useState<string>('');

  const handleCloseTooltip = () => {
    setOpenedTooltip(false);
    setTranslatedText('');
    clearError();
  };

  useEffect(() => {
    if (selectedText.trim()) {
      const doTranslation = async () => {
        const translated = await translateText(
          selectedText,
          selectedLanguage.target.value
        );

        if (translated) {
          setTranslatedText(translated.text);
          if (translated.detectedSourceLanguage) {
            setSelectedLanguage({
              source: {
                value: translated.detectedSourceLanguage,
                label:
                  languages.find(
                    (language) =>
                      language.code === translated.detectedSourceLanguage
                  )?.name || translated.detectedSourceLanguage,
              },
              target: selectedLanguage.target,
            });
          }
        }
      };

      doTranslation();
    }
  }, [selectedText, selectedLanguage.target]);

  return (
    <Paper
      shadow="xl"
      p="md"
      radius="md"
      style={{
        maxWidth: 340,
        minWidth: 300,
        border: '1px solid #e9ecef',
      }}
    >
      <Stack gap="sm">
        <Group justify="space-between" align="center" mb="xs">
          <Title variant="light" c="indigo.4" size="lg">
            Translation
          </Title>

          <ActionIcon
            variant="subtle"
            color="gray"
            size="sm"
            onClick={handleCloseTooltip}
          >
            <IconX size={18} />
          </ActionIcon>
        </Group>

        <LanguageSelector
          languages={languages}
          value={selectedLanguage}
          onChange={setSelectedLanguage}
          swapLanguages={false}
          isDetectingLanguage={isDetectingLanguage}
        />

        <Divider />

        <Box>
          <Flex direction="column" mb="sm">
            <Group justify="space-between" mb="xs">
              <Text size="sm" c="dimmed" fw={500}>
                Original:
              </Text>

              <ActionIcon
                variant="subtle"
                color="indigo.4"
                size="sm"
                onClick={() => speak(selectedText)}
              >
                <IconVolume size={18} />
              </ActionIcon>
            </Group>
            <Text size="sm" fw={600} style={{ wordBreak: 'break-word' }}>
              {selectedText}
            </Text>
          </Flex>
        </Box>

        <Box>
          <Flex direction="column" mb="xs">
            <Group justify="space-between" mb="xs">
              <Text size="sm" c="dimmed" fw={500}>
                Translation:
              </Text>

              <ActionIcon
                variant="subtle"
                color="indigo.4"
                size="sm"
                onClick={() => speak(translatedText || '')}
              >
                <IconVolume size={18} />
              </ActionIcon>
            </Group>
            {isLoading ? (
              <Group gap="xs">
                <Loader size="sm" />
                <Text size="sm" c="dimmed">
                  Переводим...
                </Text>
              </Group>
            ) : error ? (
              <Alert
                icon={<IconAlertCircle size={16} />}
                color="red"
                variant="light"
              >
                {error}
              </Alert>
            ) : (
              <Text
                size="sm"
                fw={600}
                c="indigo.7"
                style={{ wordBreak: 'break-word' }}
              >
                {translatedText || 'Выберите текст для перевода'}
              </Text>
            )}
          </Flex>
        </Box>
      </Stack>
    </Paper>
  );
};
