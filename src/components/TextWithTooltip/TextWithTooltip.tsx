import { List, Paper, Text, Title, Loader, Box } from '@mantine/core';

interface TextWithTooltipProps {
  onMouseUp: () => void;
  pageContent: {
    title: string;
    mainText: string;
  };
  isTranslating: boolean;
}

export const TextWithTooltip = ({
  onMouseUp,
  pageContent,
  isTranslating
}: TextWithTooltipProps) => {
  if (isTranslating) {
    return (
      <Box ta="center" py="xl">
        <Loader size="lg" />
        <Text mt="md" c="dimmed">
          Переводим контент...
        </Text>
      </Box>
    );
  }

  return (
    <>
      <Paper
        shadow="md"
        radius="md"
        p="lg"
        withBorder
        onMouseUp={onMouseUp}
        style={{ whiteSpace: 'pre-line', cursor: 'text' }}
      >
        <Title
          ta={'center'}
          style={{ borderBottom: '1px solid indigo' }}
          fz="h1"
          size="xl"
          c="indigo.4"
        >
          {pageContent.title}
        </Title>
        <Text size="lg" c="black" ta={'center'} mt={20}>
          {pageContent.mainText}
        </Text>
      </Paper>

      <Paper shadow="xs" radius="md" p="md" withBorder mt={50}>
        <Title size="md" mb="xs" c="indigo.6">
          Как пользоваться приложением
        </Title>
        <List spacing={2} size="sm" listStyleType="disc" withPadding>
          <List.Item>
            Выделите любой фрагмент текста в статье выше, автоматически появится всплывающее окно с
            переводом.
          </List.Item>
          <List.Item>
            В tooltip вы можете выбрать язык, на который хотите перевести выбранный текст.
          </List.Item>
          <List.Item>
            Также tooltip имеет функцию озвучивания выбранного и переведенного текста.
          </List.Item>
          <List.Item>Выберите язык страницы, чтобы увидеть контент на разных языках.</List.Item>
          <List.Item>
            По нажатию на кнопку "Open translator" откроется модальное окно с полноценным
            переводчиком.
          </List.Item>
          <List.Item>
            Tooltip имеет возможность сохранять выделенный текст и перевод в словарь.
          </List.Item>
          <List.Item>Можно перейти на страницу глоссария, нажав на кнопку "Glossary".</List.Item>
          <List.Item>
            Сам глоссарий также имеет ряд возможностей: добавление/удалении записи, фильтрация по
            языкам, поиск (на обоих языках).
          </List.Item>
        </List>
      </Paper>
    </>
  );
};
