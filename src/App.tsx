import { useEffect, useState } from 'react';
import { Box, Container } from '@mantine/core';
import { Header, TextWithTooltip, TooltipTranslator, TranslateModal } from './components';
import { getLanguages } from './api/apiTranslation';
import { useTranslateStore } from './store/useTranslateStore';

export const App = () => {
  const [modal, setModal] = useState(false);
  const [openedTooltip, setOpenedTooltip] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const { sourceText, setSourceText } = useTranslateStore();
  const setLanguages = useTranslateStore(state => state.setLanguages);
  const [pageLang, setPageLang] = useState<string | null>(null);

  useEffect(() => {
    getLanguages().then(languages => {
      if ('message' in languages) {
        console.log(languages.message);
      } else {
        setLanguages(languages);
      }
    });
  }, []);

  const speak = (textToSpeak: string) => {
    const voice = new SpeechSynthesisUtterance(textToSpeak);
    speechSynthesis.speak(voice);
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      const chosenText = selection.toString().trim();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setCoords({
        x: rect.left + window.scrollX,
        y: rect.bottom + window.scrollY + 15
      });
      setOpenedTooltip(true);
      setSourceText(chosenText);
    } else {
      setOpenedTooltip(false);
      setSourceText('');
    }
  };

  return (
    <Box pos="relative" mih="100vh" bg="gray.0" p="md">
      <Header pageLang={pageLang} setPageLang={setPageLang} onOpenModal={() => setModal(true)} />

      {openedTooltip && coords && (
        <Box pos="absolute" top={coords.y - 10} left={coords.x} style={{ zIndex: 1000 }}>
          <TooltipTranslator
            setOpenedTooltip={setOpenedTooltip}
            selectedText={sourceText}
            speak={speak}
          />
        </Box>
      )}

      <Container size="xl">
        <TextWithTooltip onMouseUp={handleMouseUp} />
      </Container>

      <TranslateModal speak={speak} opened={modal} onClose={() => setModal(false)} />
    </Box>
  );
};
