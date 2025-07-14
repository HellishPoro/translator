import { ActionIcon, Group, Modal, Textarea, Title, Text, Box, Tooltip } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { LanguageSelector, type SelectedValue } from '../LanguageSelector/LanguageSelector';
import {
  IconMicrophone,
  IconMicrophoneOff,
  IconVolume,
  IconCopy,
  IconCheck,
  IconDeviceIpadPlus
} from '@tabler/icons-react';
import { useTranslation } from '../../hooks/useTranslation';
import { initialSelectedLanguage } from '../../constants/initialSelectedLanguage';
import { useTranslateStore } from '../../store/useTranslateStore';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { useClipboard } from '@mantine/hooks';
import { useGlossaryAction } from '../../hooks/useGlossaryAction';

export const TranslateModal = ({
  opened,
  onClose,
  speak
}: {
  opened: boolean;
  onClose: () => void;
  speak: (text: string) => void;
}) => {
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { translateText, isLoading, error, clearError, isDetectingLanguage } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<SelectedValue>(initialSelectedLanguage);
  const languages = useTranslateStore(state => state.languages);
  const prevSelectedLanguageRef = useRef<SelectedValue | null>(null);
  const { isListening, startListening, stopListening } = useSpeechRecognition(spokenText => {
    setText(prevtext => `${prevtext} ${spokenText}`.trim());
  });
  const clipboard = useClipboard({ timeout: 500 });
  const { addToGlossary, checkIfExists } = useGlossaryAction();
  const existsInGlossary = checkIfExists(
    text.trim(),
    selectedLanguage.source.value,
    selectedLanguage.target.value
  );

  useEffect(() => {
    const prev = prevSelectedLanguageRef.current;

    if (prev) {
      const prevSource = prev.source.value;
      const prevTarget = prev.target.value;
      const currentSource = selectedLanguage.source.value;
      const currentTarget = selectedLanguage.target.value;

      const swapped = prevSource === currentTarget && prevTarget === currentSource;

      if (swapped) {
        setText(translation);
        setTranslation(text);
      }
    }

    prevSelectedLanguageRef.current = selectedLanguage;
  }, [selectedLanguage]);

  const clouseModal = () => {
    onClose();
    setText('');
    setTranslation('');
    clearError();
  };

  const handleAddToGlossary = () => {
    if (!translation.trim() || !text.trim()) return;

    addToGlossary({
      originalText: text.trim(),
      translatedText: translation.trim(),
      sourceLanguage: selectedLanguage.source.value,
      targetLanguage: selectedLanguage.target.value,
      sourceLanguageName: selectedLanguage.source.label,
      targetLanguageName: selectedLanguage.target.label
    });
  };

  useEffect(() => {
    if (!text.trim()) {
      setTranslation('');
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      const translated = await translateText(
        text,
        selectedLanguage.target.value,
        selectedLanguage.source.value !== 'auto' ? selectedLanguage.source.value : undefined
      );
      if (translated !== null) {
        setTranslation(translated.text);
        if (translated?.detectedSourceLanguage) {
          setSelectedLanguage({
            source: {
              value: translated?.detectedSourceLanguage || selectedLanguage.source.value,
              label:
                languages.find(language => language.code === translated.detectedSourceLanguage)
                  ?.name || selectedLanguage.source.label
            },
            target: selectedLanguage.target
          });
        }
      } else {
        setTranslation('');
      }
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [text, selectedLanguage.target]);

  return (
    <Modal
      opened={opened}
      onClose={clouseModal}
      size="55rem"
      centered
      closeOnClickOutside={false}
      closeOnEscape={false}
      title={
        <Title variant="light" c="indigo.4" size="lg">
          Translation
        </Title>
      }
    >
      <LanguageSelector
        languages={languages}
        value={selectedLanguage}
        onChange={setSelectedLanguage}
        swapLanguages={true}
        isDetectingLanguage={isDetectingLanguage}
      />

      <Group grow gap={'calc(1.375rem + var(--mantine-spacing-xs)*2)'}>
        <Box pl={'xs'} pr={'xs'} mb={'xs'} bdrs={'md'}>
          <Textarea
            placeholder="Enter text"
            value={text}
            onChange={e => setText(e.currentTarget.value)}
            minRows={10}
            maxRows={10}
            size="md"
            autosize
            variant="unstyled"
          />
          <Tooltip
            label={existsInGlossary ? 'Already in glossary' : 'Add to glossary'}
            withArrow
            zIndex={1000}
            color="gray"
            position="bottom"
            fz="xs"
            offset={5}
          >
            <ActionIcon
              variant="subtle"
              color={existsInGlossary ? 'gray' : 'lime.6'}
              size="lg"
              onClick={handleAddToGlossary}
              disabled={!translation.trim() || !text.trim() || existsInGlossary}
            >
              <IconDeviceIpadPlus size={24} />
            </ActionIcon>
          </Tooltip>
          <ActionIcon
            variant="subtle"
            color={isListening ? 'red' : 'indigo.4'}
            size="lg"
            onClick={() => {
              if (isListening) {
                stopListening();
              } else {
                startListening();
                setText('');
              }
            }}
          >
            {isListening ? <IconMicrophoneOff size={24} /> : <IconMicrophone size={24} />}
          </ActionIcon>

          <ActionIcon variant="subtle" color="indigo.4" size="lg" onClick={() => speak(text)}>
            <IconVolume size={24} visibility={translation.length > 0 ? 'visible' : 'hidden'} />
          </ActionIcon>
        </Box>

        <Box bg={'var(--mantine-color-gray-1)'} pl={'xs'} pr={'xs'} pb={'xs'} bdrs={'md'}>
          <Textarea
            readOnly
            value={isLoading ? 'Translate...' : translation}
            placeholder="Translation"
            size="md"
            bd={0}
            variant="unstyled"
            autosize
            minRows={10}
            maxRows={10}
          />
          <ActionIcon
            variant="subtle"
            color="indigo.4"
            size="lg"
            onClick={() => speak(translation)}
          >
            <IconVolume size={24} visibility={translation.length > 0 ? 'visible' : 'hidden'} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color={clipboard.copied ? 'teal' : 'indigo.4'}
            size="lg"
            onClick={() => clipboard.copy(translation)}
          >
            {clipboard.copied ? (
              <IconCheck size={24} />
            ) : (
              <IconCopy size={24} visibility={translation.length > 0 ? 'visible' : 'hidden'} />
            )}
          </ActionIcon>
        </Box>
      </Group>
      {error && (
        <Text c="red" mt="sm">
          {error}
        </Text>
      )}
    </Modal>
  );
};
