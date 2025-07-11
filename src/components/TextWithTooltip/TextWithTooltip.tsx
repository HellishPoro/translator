import { Paper } from '@mantine/core';

const sampleText = `
  Выделите часть этого текста, чтобы увидеть перевод в тултипе.
`;

export const TextWithTooltip = ({ onMouseUp }: { onMouseUp: () => void }) => {
  return (
    <div onMouseUp={onMouseUp}>
      {sampleText}
      <Paper></Paper>
    </div>
  );
};
