import { Button, Container, Group, Select, Title } from '@mantine/core';
import { useTranslateStore } from '../../store/useTranslateStore';
import { Link } from 'react-router-dom';
import { IconBook, IconLanguage } from '@tabler/icons-react';

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
        <Group gap="sm">
          <IconLanguage size={32} color="var(--mantine-color-indigo-6)" />
          <Title order={1} c="indigo.6" fw={700}>
            Tooltip Translator
          </Title>
        </Group>

        <Group gap="sm">
          <Select
            placeholder="Page language"
            value={pageLang}
            onChange={setPageLang}
            data={languages.map(lang => ({
              value: lang.code,
              label: lang.name
            }))}
            searchable
            nothingFoundMessage="No matches"
            size="sm"
            w={180}
          />
          <Button variant="filled" color="indigo.5" onClick={onOpenModal}>
            Open Translator
          </Button>

          <Button
            component={Link}
            to="/glossary"
            variant="outline"
            color="indigo.5"
            leftSection={<IconBook size={16} />}
          >
            Glossary
          </Button>
        </Group>
      </Group>
    </Container>
  );
}
