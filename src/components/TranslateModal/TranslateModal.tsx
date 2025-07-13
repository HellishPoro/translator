import {
  ActionIcon,
  Group,
  Modal,
  Textarea,
  Title,
//   Loader,
  Text,
} from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import {
  LanguageSelector,
  type SelectedValue,
} from '../LanguageSelector/LanguageSelector';
import { IconMicrophone, IconMicrophoneOff, IconVolume, IconCopy } from '@tabler/icons-react';
import { useTranslation } from '../../hooks/useTranslation';
import { initialSelectedLanguage } from '../../constants/initialSelectedLanguage';
import { useTranslateStore } from '../../store/useTranslateStore';
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import { useClipboard } from '@mantine/hooks';

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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { translateText, isLoading, error, clearError, isDetectingLanguage } =
    useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState<SelectedValue>(
    initialSelectedLanguage
  );

  const languages = useTranslateStore((state) => state.languages);

  const prevSelectedLanguageRef = useRef<SelectedValue | null>(null);
      
  const {isListening, startListening, stopListening} = useSpeechRecognition((spokenText)=>{
        setText((prevtext) => `${prevtext} ${spokenText}`.trim())
  })

  const clipboard = useClipboard({timeout: 500})

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
    // setSelectedLanguage(initialSelectedLanguage);
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
        selectedLanguage.source.value !== 'auto'
          ? selectedLanguage.source.value
          : undefined
      );
      if (translated !== null) {
        setTranslation(translated.text);
        if (translated?.detectedSourceLanguage) {
          setSelectedLanguage({
            source: {
              value:
                translated?.detectedSourceLanguage ||
                selectedLanguage.source.value,
              label:
                languages.find(
                  (language) =>
                    language.code === translated.detectedSourceLanguage
                )?.name || selectedLanguage.source.label,
            },
            target: selectedLanguage.target,
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
          style={{ width: '100%' }}
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
        <ActionIcon
            variant="subtle"
            color={isListening ? "red" : "indigo.4"}
            size="lg"
            bottom={75}
            left={759}
            onClick={()=>{
                if(isListening){
                    stopListening()
                }else{
                    startListening()
                    setText('')
                }}
            }
            >
            {isListening ? <IconMicrophoneOff size={24} /> : <IconMicrophone size={24} />}
          </ActionIcon>
      </Group>

      <Group>
        <Textarea
          readOnly
          value={clipboard.copied ? 'Copied' : translation }
          placeholder={isLoading ? "Loading..." :"Translation"}
          size="lg"
          style={{ 
            width: '100%',
          }}
          styles={{
            input: {
                color: clipboard.copied ? "green" : undefined
            }
          }}
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
        <ActionIcon
          variant="subtle"
          color="indigo.4"
          size="lg"
          bottom={60}
          left={759}
          onClick={() => clipboard.copy(translation)}
          >
            <IconCopy size={24}/>
        </ActionIcon>
        {/* {isLoading && <Loader size={30}/>} */}
      </Group>

      {error && (
        <Text c="red" mt="sm">
          {error}
        </Text>
      )}
    </Modal>
  );
};