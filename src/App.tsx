import { Button } from '@mantine/core';

import { useState } from 'react';
import { TooltipTranslator, TranslateModal } from './components';
import { TextWithTooltip } from './components/TextWithTooltip/TextWithTooltip';


export const App = () => {
  const [modal, setModal] = useState(false);
  const [openedTooltip, setOpenedTooltip] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

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
    <div className="relative min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center max-w-4xl mx-auto mb-4">
        <h1 className="text-2xl font-bold">Tooltip Translator</h1>
        <Button onClick={() => setModal(true)}>Открыть переводчик</Button>
      </header>

      {openedTooltip && coords && (
        <div
          style={{
            position: 'absolute',
            top: coords.y - 10,
            left: coords.x,
            zIndex: 1000
          }}
        >
          <TooltipTranslator setOpenedTooltip={setOpenedTooltip} selectedText={selectedText} />
        </div>
      )}

      <TextWithTooltip onMouseUp={handleMouseUp} />

      <TranslateModal opened={modal} onClose={() => setModal(false)} />
    </div>
  );
};
