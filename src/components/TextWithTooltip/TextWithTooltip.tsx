import { List, Paper, Text, Title } from '@mantine/core';
import { sampleText } from '../../constants/sampleText';

export const TextWithTooltip = ({ onMouseUp }: { onMouseUp: () => void }) => {
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
          Frontend Development: Crafting Seamless Digital Experiences
        </Title>
        <Text size="lg" c="black" ta={'center'}>
          {sampleText}
        </Text>
      </Paper>

      <Paper shadow="xs" radius="md" p="md" withBorder mt={50}>
        <Title size="md" mb="xs" c="indigo.6">
          Как пользоваться переводчиком
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
          <List.Item></List.Item>
          <List.Item></List.Item>
          <List.Item></List.Item>
        </List>
      </Paper>
    </>
  );
};
