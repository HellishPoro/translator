import { Box, Button, Container, Group, Title } from '@mantine/core';

import { useState } from 'react';
import { TextWithTooltip, TooltipTranslator, TranslateModal } from './components';


export const App = () => {
  const [modal, setModal] = useState(false);
  const [openedTooltip, setOpenedTooltip] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  const speak = (textToSpeak: string) => {
          const voice = new SpeechSynthesisUtterance(textToSpeak);
          speechSynthesis.speak(voice);
      }

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      const chosenText = selection.toString().trim();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setCoords({ x: rect.left + window.scrollX, y: rect.bottom + window.scrollY + 15 });
      setOpenedTooltip(true);
      setSelectedText(chosenText);
    } else {
      setOpenedTooltip(false);
    }
  };

  return (
    <Box pos="relative" mih="100vh" bg="gray.0" p="md">
    
    <Container size="xl">
      <Group justify="space-between" align="center" mb="md">
        <Title order={1} fw={700} lh={1}>
          Tooltip Translator
        </Title>

        <Button onClick={() => setModal(true)}>Open translator</Button>
      </Group>
    </Container>

    
    {openedTooltip && coords && (
      <Box
        pos="absolute"
        top={coords.y - 10}
        left={coords.x}
        style={{ zIndex: 1000 }}
      >
        <TooltipTranslator
          setOpenedTooltip={setOpenedTooltip}
          selectedText={selectedText}
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
