import { ActionIcon, Box, Divider, Flex, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { IconVolume, IconX } from '@tabler/icons-react';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';

interface TooltipTranslatorProps {
  setOpenedTooltip: (i: boolean) => void;
  selectedText: string;
}

export const TooltipTranslator = (props: TooltipTranslatorProps) => {
  const { setOpenedTooltip, selectedText } = props;
  const handleCloseTooltip = () => {
    setOpenedTooltip(false);
  };
  return (
    <Paper
      shadow="xl"
      p="md"
      radius="md"
      style={{
        maxWidth: 340,
        minWidth: 300,
        border: '1px solid #e9ecef'
      }}
    >
      <Stack gap="sm">
        <Group justify="space-between" align="center" mb="xs">
          <Title variant="light" c="indigo.4" size="lg">
            Translation
          </Title>

          <ActionIcon variant="subtle" color="gray" size="sm" onClick={handleCloseTooltip}>
            <IconX size={18} />
          </ActionIcon>
        </Group>

        <LanguageSelector />

        <Divider />

        <Box>
          <Flex direction="column" mb="sm">
            <Group justify="space-between" mb="xs">
              <Text size="sm" c="dimmed" fw={500}>
                Original:
              </Text>

              <ActionIcon variant="subtle" color="indigo.4" size="sm">
                <IconVolume size={18} />
              </ActionIcon>
            </Group>
            <Text size="sm" fw={600} style={{ wordBreak: 'break-word' }}>
              {selectedText}
            </Text>
          </Flex>
        </Box>

        <Box>
          <Flex direction="column" mb="xs">
            <Group justify="space-between" mb="xs">
              <Text size="sm" c="dimmed" fw={500}>
                Translation:
              </Text>

              <ActionIcon variant="subtle" color="indigo.4" size="sm">
                <IconVolume size={18} />
              </ActionIcon>
            </Group>
            <Text size="sm" fw={600} c="indigo.7" style={{ wordBreak: 'break-word' }}>
              Это переведённый текст
            </Text>
          </Flex>
        </Box>
      </Stack>
    </Paper>
  );
};
