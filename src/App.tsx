import { Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { TooltipTranslator, TranslateModal } from './components';
import { TextWithTooltip } from './components/TextWithTooltip/TextWithTooltip';
import { detectLanguage } from './api/apiTranslation';

export const App = () => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    detectLanguage('Hello').then((res) => console.log(res));
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center max-w-4xl mx-auto mb-4">
        <h1 className="text-2xl font-bold">Tooltip Translator</h1>
        <Button onClick={() => setModal(true)}>Открыть переводчик</Button>
      </header>

      <TooltipTranslator />
      <TextWithTooltip />
      <TranslateModal opened={modal} onClose={() => setModal(false)} />
    </div>
  );
};
