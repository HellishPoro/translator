import { useEffect, useState } from 'react';
import { Box, Container } from '@mantine/core';
import { Header, TextWithTooltip, TooltipTranslator, TranslateModal } from '../../components';
import { getLanguages } from '../../api/apiTranslation';
import { useTranslateStore } from '../../store/useTranslateStore';
import { usePageTranslation } from '../../hooks';

export function Homepage() {
  const [modal, setModal] = useState(false);
  const [openedTooltip, setOpenedTooltip] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const { sourceText, setSourceText, setLanguages } = useTranslateStore();
  const [pageLang, setPageLang] = useState<string | null>('en');
  const { pageContent, translatePageContent, isTranslating } = usePageTranslation();

  useEffect(() => {
    getLanguages().then(languages => {
      if ('message' in languages) {
        console.log(languages.message);
      } else {
        setLanguages(languages);
      }
    });
  }, []);

  useEffect(() => {
    if (pageLang) {
      translatePageContent(pageLang);
    }
  }, [pageLang, translatePageContent]);

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
        <Box pos="absolute" top={coords.y - 10} left={coords.x} style={{ zIndex: 1 }}>
          <TooltipTranslator
            setOpenedTooltip={setOpenedTooltip}
            selectedText={sourceText}
            speak={speak}
          />
        </Box>
      )}

      <Container size="xl" mt={50}>
        <TextWithTooltip
          onMouseUp={handleMouseUp}
          pageContent={pageContent}
          isTranslating={isTranslating}
        />
      </Container>

      <TranslateModal speak={speak} opened={modal} onClose={() => setModal(false)} />
    </Box>
  );
}
