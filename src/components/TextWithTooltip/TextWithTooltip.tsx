import { List, Paper, Text, Title, Loader, Box, Group, Divider } from '@mantine/core';
import {
  IconCheck,
  IconInfoCircle,
  IconSpeakerphone,
  IconBook,
  IconGlobe,
  IconKeyboard,
  IconVolume,
  IconPlus
} from '@tabler/icons-react';
import { memo } from 'react';

interface TextWithTooltipProps {
  pageContent: {
    title: string;
    mainText: string;
  };
  isTranslating: boolean;
}

const iconSize = 18;
const iconColor = '#4c6ef5';

export const TextWithTooltip = memo(({ pageContent, isTranslating }: TextWithTooltipProps) => {
  if (isTranslating) {
    return (
      <Box ta="center" py="xl">
        <Loader size="lg" />
        <Text mt="md" c="dimmed" fw={500}>
          Переводим контент...
        </Text>
      </Box>
    );
  }

  return (
    <>
      <Paper
        shadow="xl"
        radius="md"
        p="xl"
        withBorder
        style={{
          maxWidth: 1200,
          margin: 'auto',
          background: 'var(--mantine-background)', 
          whiteSpace: 'pre-line',
          cursor: 'text',
          boxShadow: '0 8px 20px rgba(76, 110, 245, 0.45)', 
        }}
      >
        <Title
          ta="center"
          style={(theme) => ({
            borderBottom: `3px solid ${theme.colors.indigo[5]}`,
            paddingBottom: theme.spacing.sm,
            fontWeight: 900,
            color: theme.colors.indigo[7],
            textShadow: '1px 1px 2px rgba(76,110,245,0.3)',
            marginBottom: theme.spacing.md,
          })}
          fz={38}
          order={1}
        >
          {pageContent.title}
        </Title>

        <Text
          size="lg"
          c="dark.7"
          ta="center"
          style={{ lineHeight: 1.6, fontWeight: 500 }}
        >
          {pageContent.mainText}
        </Text>
      </Paper>

      <Paper
        shadow="sm"
        radius="md"
        p="md"
        withBorder
        mt="xl"
        mx="auto"
        style={{ 
          maxWidth: 1100,
          boxShadow: '0 8px 20px rgba(76, 110, 245, 0.45)',
        }}
      >
        <Group justify="space-between" mb="sm" wrap="nowrap">
          <Title
            size="lg"
            c="indigo.6"
            fw={700}
            style={{ userSelect: 'none' }}
          >
            Как пользоваться приложением
          </Title>
          <IconInfoCircle size={24} color={iconColor} />
        </Group>

        <Divider mb="md" />

        <List spacing="sm" size="md" listStyleType="none" withPadding>
        <List.Item>
          <Group gap={8} align="center">
            <IconCheck size={iconSize} color={iconColor} />
            <Text>
              Выделите любой фрагмент текста в статье выше, автоматически появится всплывающее окно с переводом.
            </Text>
          </Group>
        </List.Item>

          <List.Item>
            <Group gap={8} align="start">
              <IconGlobe size={iconSize} color={iconColor} style={{top: 3, position: "relative"}}/>
              <Text>В tooltip вы можете выбрать язык, на который хотите перевести выбранный текст.</Text>
            </Group>
          </List.Item>

          <List.Item>
            <Group gap={8} align="start">
              <IconVolume size={iconSize} color={iconColor} style={{top: 3, position: "relative"}}/>
              <Text>Также tooltip имеет функцию озвучивания выбранного и переведенного текста.</Text>
            </Group>
          </List.Item>

          <List.Item>
            <Group gap={8} align="start">
              <IconKeyboard size={iconSize} color={iconColor} style={{top: 3, position: "relative"}}/>
              <Text>Выберите язык страницы, чтобы увидеть контент на разных языках.</Text>
            </Group>
          </List.Item>

          <List.Item>
            <Group gap={8} align="start">
              <IconSpeakerphone size={iconSize} color={iconColor} style={{top: 3, position: "relative"}}/>
              <Text>По нажатию на кнопку "Open translator" откроется модальное окно с полноценным переводчиком.</Text>
            </Group>
          </List.Item>

          <List.Item>
            <Group gap={8} align="start">
              <IconPlus size={iconSize} color={iconColor} style={{top: 3, position: "relative"}}/>
              <Text>Tooltip имеет возможность сохранять выделенный текст и перевод в словарь.</Text>
            </Group>
          </List.Item>

          <List.Item>
            <Group gap={8} align="start">
              <IconBook size={iconSize} color={iconColor} style={{top: 3, position: "relative"}}/>
              <Text>Можно перейти на страницу глоссария, нажав на кнопку "Glossary".</Text>
            </Group>
          </List.Item>

          <List.Item>
            <Group gap={8} align="start" >
              <IconCheck size={iconSize} color={iconColor} style={{top: 3, position: "relative"}}/>
              <Text>Сам глоссарий также имеет ряд возможностей: добавление/удаление записи, фильтрация по языкам, поиск (на обоих языках).</Text>
            </Group>
          </List.Item>
        </List>
      </Paper>
    </>
  );
});
