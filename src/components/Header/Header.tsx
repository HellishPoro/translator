import { Button, Container, Group, Select, Title } from '@mantine/core';
import { useTranslateStore } from '../../store/useTranslateStore';

interface HeaderProps {
  pageLang: string | null;
  setPageLang: (value: string | null) => void;
  onOpenModal: () => void;
}

export function Header(props: HeaderProps) {
  const { pageLang, setPageLang, onOpenModal } = props;
  const { languages } = useTranslateStore();

  return (
    <Container size="xl">
      <Group justify="space-between" align="center" mb="md">
        <Title order={1} fw={700} lh={1}>
          Tooltip Translator
        </Title>

        <Group gap="sm">
          <Select
            placeholder="Выберите язык страницы"
            value={pageLang}
            onChange={setPageLang}
            data={languages.map(lang => ({
              value: lang.code,
              label: lang.name
            }))}
            searchable
            nothingFoundMessage="Нет совпадений"
            size="sm"
          />
          <Button onClick={onOpenModal}>Open translator</Button>
        </Group>
      </Group>
    </Container>
  );
}
