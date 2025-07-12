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
  Title
} from '@mantine/core';
import { IconAlertCircle, IconVolume, IconX } from '@tabler/icons-react';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';
import { useTranslateStore } from '../../store/useTranslateStore';
import { useTranslation } from '../../hooks/useTranslation';

interface TooltipTranslatorProps {
  setOpenedTooltip: (i: boolean) => void;
  selectedText: string;
}

export const TooltipTranslator = (props: TooltipTranslatorProps) => {
  const { setOpenedTooltip, selectedText } = props;
  const { targetLanguageCode, setSourceText } = useTranslateStore();
  const { translateText, detectTextLanguage, isLoading, error, clearError } = useTranslation();
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isDetectingLanguage, setIsDetectingLanguage] = useState<boolean>(false);

  const handleCloseTooltip = () => {
    setOpenedTooltip(false);
    setTranslatedText('');
    clearError();
  };

  useEffect(() => {
    if (selectedText.trim()) {
      setSourceText(selectedText);

      const doTranslation = async () => {
        setIsDetectingLanguage(true);
        const detectedLang = await detectTextLanguage(selectedText);
        setIsDetectingLanguage(false);

        if (detectedLang) {
          const translated = await translateText(selectedText, targetLanguageCode, detectedLang);

          if (translated) {
            setTranslatedText(translated);
          }
        }
      };

      doTranslation();
    }
  }, [selectedText, targetLanguageCode]);

  return (
    <Paper
      shadow="xl"
      p="md"
      radius="md"
      style={{
        maxWidth: 340,
        minWidth: 300,
        border: '1px solid #e9ecef'
      }}
    >
      <Stack gap="sm">
        <Group justify="space-between" align="center" mb="xs">
          <Title variant="light" c="indigo.4" size="lg">
            Translation
          </Title>

          <ActionIcon variant="subtle" color="gray" size="sm" onClick={handleCloseTooltip}>
            <IconX size={18} />
          </ActionIcon>
        </Group>

        <LanguageSelector isDetectingLanguage={isDetectingLanguage} />

        <Divider />

        <Box>
          <Flex direction="column" mb="sm">
            <Group justify="space-between" mb="xs">
              <Text size="sm" c="dimmed" fw={500}>
                Original:
              </Text>

              <ActionIcon variant="subtle" color="indigo.4" size="sm">
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

              <ActionIcon variant="subtle" color="indigo.4" size="sm">
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
              <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
                {error}
              </Alert>
            ) : (
              <Text size="sm" fw={600} c="indigo.7" style={{ wordBreak: 'break-word' }}>
                {translatedText || 'Выберите текст для перевода'}
              </Text>
            )}
          </Flex>
        </Box>
      </Stack>
    </Paper>
  );
};
