import { Button, Container, Group, Select, Title } from '@mantine/core';
import { useTranslateStore } from '../../store/useTranslateStore';
import { Link } from 'react-router-dom';

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
          <Button variant="filled" color="indigo.5" onClick={onOpenModal}>
            Open translator
          </Button>

          <Button component={Link} to="/glossary" variant="filled" color="indigo.5">
            Glossary
          </Button>
        </Group>
      </Group>
    </Container>
  );
}
