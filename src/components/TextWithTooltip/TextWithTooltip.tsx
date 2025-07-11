import { Paper, Text, Title } from '@mantine/core';
import { sampleText } from '../../constants/sampleText';

export const TextWithTooltip = ({ onMouseUp }: { onMouseUp: () => void }) => {
  return (
    <Paper
      shadow="md"
      radius="md"
      p="lg"
      withBorder
      onMouseUp={onMouseUp}
      style={{ whiteSpace: 'pre-line', cursor: 'text' }}
    >
        <Title ta={"center"} style={{ borderBottom: '1px solid indigo' }} fz="h1" size="xl" c="indigo.4">
            Frontend Development: Crafting Seamless Digital Experiences
        </Title>
      <Text size="lg" c="black" ta={"center"}>
        {sampleText}
      </Text>
    </Paper>
  );
};
