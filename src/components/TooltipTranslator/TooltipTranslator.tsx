import { memo, useEffect, useState } from 'react';
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
  Tooltip
} from '@mantine/core';
import { IconAlertCircle, IconDeviceIpadPlus, IconVolume, IconX } from '@tabler/icons-react';
import { useTranslateStore } from '../../store/useTranslateStore';
import { useTranslation } from '../../hooks';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';
import { useGlossaryStore } from '../../store/useGlossaryStore';
import { notifications } from '@mantine/notifications';
import { useFloatingTooltip } from '../../hooks/useFloatingTooltip';


interface TooltipTranslatorProps {
  speak: (text: string) => void;
}

export const TooltipTranslator = memo((props: TooltipTranslatorProps) => {
  const { speak } = props;
  const { selectedLanguage, setSelectedLanguage, languages } =
    useTranslateStore();
  const { translateText, isLoading, error, clearError, isDetectingLanguage } =
    useTranslation();
  const [translatedText, setTranslatedText] = useState<string>('');
  const {
    refs,
    floatingStyles,
    openedTooltip,
    getFloatingProps,
    closeTooltip,
    sourceText,
  } = useFloatingTooltip();
  const { addItem: addToGlossary } = useGlossaryStore();
  const [existsInGlossary, setExistsInGlossary] = useState(false);

  const handleCloseTooltip = () => {
    closeTooltip();
    setTranslatedText('');
    clearError();
  };

  const handleAddToGlossary = async () => {
    if (!translatedText) return;

    const success = await addToGlossary({
      originalText: selectedText,
      translatedText: translatedText,
      sourceLanguage: selectedLanguage.source.value,
      targetLanguage: selectedLanguage.target.value,
      sourceLanguageName: selectedLanguage.source.label,
      targetLanguageName: selectedLanguage.target.label
    });

    if (success) {
      notifications.show({
        title: 'Success',
        message: 'Word added to glossary!',
        color: 'green'
      });
      setExistsInGlossary(true);
    } else {
      notifications.show({
        title: 'Already exists',
        message: 'This word is already in your glossary',
        color: 'orange'
      });
    }
  };

  useEffect(() => {
    if (sourceText.trim()) {
      const doTranslation = async () => {
        const translated = await translateText(
          sourceText,
          selectedLanguage.target.value
        );

        if (translated) {
          setTranslatedText(translated.text);
          if (translated.detectedSourceLanguage) {
            setSelectedLanguage({
              source: {
                value: translated.detectedSourceLanguage,
                label:
                  languages.find(language => language.code === translated.detectedSourceLanguage)
                    ?.name || translated.detectedSourceLanguage
              },
              target: selectedLanguage.target
            });
          }
        }
      };

      doTranslation();
    }
  }, [sourceText, selectedLanguage.target]);

  return (

            openedTooltip && (
      <Box
        ref={refs.setFloating}
        style={{ ...floatingStyles }}
        {...getFloatingProps()}
      >
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

              <Group gap={5}>
                <Tooltip
                  label={existsInGlossary ? 'Already in glossary' : 'Add to glossary'}
                  withArrow
                  zIndex={2}
                  color="gray"
                  position="bottom"
                  fz="xs"
                  offset={5}
                >
                  <ActionIcon
                    variant="subtle"
                    color={existsInGlossary ? 'gray' : 'lime.6'}
                    size="sm"
                    onClick={handleAddToGlossary}
                    disabled={!translatedText || existsInGlossary}
                  >
                    <IconDeviceIpadPlus size={18} />
                  </ActionIcon>
                </Tooltip>

                <Tooltip
                  label="Listen"
                  withArrow
                  zIndex={2}
                  color="gray"
                  position="bottom"
                  fz="xs"
                  offset={5}
                >
                  <ActionIcon
                    variant="subtle"
                    color="indigo.4"
                    size="sm"
                    onClick={() => speak(selectedText)}
                  >
                    <IconVolume size={18} />
                  </ActionIcon>
                </Tooltip>
              </Group>

            </Group>

            <LanguageSelector
              languages={languages}
              value={selectedLanguage}
              onChange={setSelectedLanguage}
              swapLanguages={false}
              isDetectingLanguage={isDetectingLanguage}
            />

              <Tooltip
                label="Listen"
                withArrow
                zIndex={2}
                color="gray"
                position="bottom"
                fz="xs"
                offset={5}
              >
                <ActionIcon
                  variant="subtle"
                  color="indigo.4"
                  size="sm"
                  onClick={() => speak(translatedText || '')}
                >
                  <IconVolume size={18} />
                </ActionIcon>
              </Tooltip>
            </Group>
            {isLoading ? (
              <Group gap="xs">
                <Loader size="sm" />
                <Text size="sm" c="dimmed">
                  Переводим...

<!--             {/* <Divider /> */}

            <Flex direction="column">
              <Group justify="space-between">
                <Text size="sm" c="dimmed" fw={500}>
                  Original:
 -->
                </Text>

                <ActionIcon
                  variant="subtle"
                  color="indigo.4"
                  size="sm"
                  onClick={() => speak(sourceText)}
                >
                  <IconVolume size={18} />
                </ActionIcon>
              </Group>

            ) : error ? (
              <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
                {error}
              </Alert>
            ) : (
              <Text size="sm" fw={600} c="indigo.7" style={{ wordBreak: 'break-word' }}>
                {translatedText || 'Выберите текст для перевода'}

              </Text>
            </Flex>

            <Divider />

            <Flex direction="column" mb="xs">
              <Group justify="space-between" mb="xs">
                <Text size="sm" c="dimmed" fw={500}>
                  Translated text:
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
                  <Loader size="xs" />
                  <Text size="sm" c="dimmed">
                    Translate...
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
          </Stack>
        </Paper>
      </Box>
    )
  );
});
