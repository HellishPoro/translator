import {
    ActionIcon,
    Group,
    Modal,
    Textarea,
    Title,
    Loader,
    Text,
  } from "@mantine/core";
  import { useEffect, useRef, useState } from "react";
  import { LanguageSelector, type SelectedValue } from "../LanguageSelector/LanguageSelector";
  import { IconVolume } from "@tabler/icons-react";
  import { useTranslation } from "../../hooks/useTranslation";
  import { initialSelectedLanguage } from "../../constants/initialSelectedLanguage";
  import { useTranslateStore } from "../../store/useTranslateStore";
  
  export const TranslateModal = ({
    opened,
    onClose,
    speak,
  }: {
    opened: boolean;
    onClose: () => void;
    speak: (text: string) => void;
  }) => {
    const [text, setText] = useState('');
    const [translation, setTranslation] = useState('');
    const [isDetectingLanguage, setIsDetectingLanguage] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
    const { translateText, detectTextLanguage, isLoading, error, clearError } = useTranslation();
  
    const [selectedLanguage, setSelectedLanguage] = useState<SelectedValue>(
      initialSelectedLanguage
    );
  
    const languages = useTranslateStore((state) => state.languages);
    const setSourceText = useTranslateStore((state) => state.setSourceText);
    const setSourceLanguageCode = useTranslateStore((state) => state.setSourceLanguageCode);
    const setTargetLanguageCode = useTranslateStore((state) => state.setTargetLanguageCode);
  
    const prevSelectedLanguageRef = useRef<SelectedValue | null>(null);

useEffect(() => {
  const prev = prevSelectedLanguageRef.current;

  if (prev) {
    const prevSource = prev.source.value;
    const prevTarget = prev.target.value;
    const currentSource = selectedLanguage.source.value;
    const currentTarget = selectedLanguage.target.value;

    const swapped =
      prevSource === currentTarget && prevTarget === currentSource;

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
        setSelectedLanguage(initialSelectedLanguage);
        setSourceText('');
        setSourceLanguageCode('en');
        setTargetLanguageCode('ru');
    }

    useEffect(() => {
      setTargetLanguageCode(selectedLanguage.target.value);
    }, [selectedLanguage, setTargetLanguageCode]);
  
    useEffect(() => {
      if (!text.trim()) {
        setTranslation('');
        return;
      }
  
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
  
      timeoutRef.current = setTimeout(async () => {
        setIsDetectingLanguage(true);
  
        const detectedLang = await detectTextLanguage(text);
        setIsDetectingLanguage(false);
  
        if (detectedLang) {
          setSourceLanguageCode(detectedLang);
        }
  
        setSourceText(text);
  
        const translated = await translateText(text, selectedLanguage.target.value, detectedLang ?? undefined);
        if (translated !== null) {
          setTranslation(translated);
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
    }, [text, selectedLanguage.target.value]);
  
    return (
      <Modal
        opened={opened}
        onClose={clouseModal}
        size="55rem"
        centered
        closeOnClickOutside={false}
        closeOnEscape={false}
      >
        <Title variant="light" c="indigo.4" size="lg">
          Translation
        </Title>
  
        <Group grow mt="md" mb="md">
          <LanguageSelector
            languages={languages}
            value={selectedLanguage}
            onChange={setSelectedLanguage}
            swapLanguages={true}
            isDetectingLanguage={isDetectingLanguage}
          />
        </Group>
  
        <Group>
          <Textarea
            placeholder="Enter text"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            minRows={5}
            mt="md"
            mb="md"
            size="lg"
            style={{ width: "100%" }}
          />
          <ActionIcon
            variant="subtle"
            color="indigo.4"
            size="lg"
            bottom={105}
            left={810}
            onClick={() => speak(text)}
          >
            <IconVolume size={24} />
          </ActionIcon>
        </Group>
  
        <Group>
          <Textarea
            readOnly
            value={isLoading ? 'Loading...' : translation}
            placeholder="Translation"
            size="lg"
            style={{ width: "100%" }}
          />
          <ActionIcon
            variant="subtle"
            color="indigo.4"
            size="lg"
            bottom={90}
            left={810}
            onClick={() => speak(translation)}
          >
            <IconVolume size={24} />
          </ActionIcon>
        </Group>
  
        {error && (
          <Text color="red" mt="sm">
            {error}
          </Text>
        )}
  
        {isLoading && <Loader mt="md" />}
      </Modal>
    );
  };
  