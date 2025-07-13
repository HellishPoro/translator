
<!-- import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Homepage } from './pages';
import { lazy, Suspense } from 'react';
const Glossary = lazy(() =>
  import('./pages').then(module => ({
    default: module.Glossary
  }))
); -->
import { Box, Container } from '@mantine/core';
import { useEffect, useState } from 'react';
import {
  Header,
  TextWithTooltip,
  TooltipTranslator,
  TranslateModal,
} from './components';
import { getLanguages } from './api/apiTranslation';
import { useTranslateStore } from './store/useTranslateStore';
import { usePageTranslation } from './hooks/usePageTranslation';

const speak = (textToSpeak: string) => {
  const voice = new SpeechSynthesisUtterance(textToSpeak);
  speechSynthesis.speak(voice);
};

export const App = () => {
<!--   return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/glossary"
          element={
            <Suspense fallback={<p>Загрузка страницы...</p>}>
              <Glossary />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter> -->
  const [modal, setModal] = useState(false);

  const setLanguages = useTranslateStore((state) => state.setLanguages);
  const [pageLang, setPageLang] = useState<string | null>('en');
  const { pageContent, translatePageContent, isTranslating } =
    usePageTranslation();

  useEffect(() => {
    getLanguages().then((languages) => {
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

  return (
    <>
      <Box pos="relative" mih="100vh" bg="gray.0" p="md">
        <Header
          pageLang={pageLang}
          setPageLang={setPageLang}
          onOpenModal={() => setModal(true)}
        />

        <Container size="xl">
          <TextWithTooltip
            pageContent={pageContent}
            isTranslating={isTranslating}
          />
        </Container>
        <TranslateModal
          speak={speak}
          opened={modal}
          onClose={() => setModal(false)}
        />
      </Box>
      <TooltipTranslator speak={speak} />
    </>
  );
};
