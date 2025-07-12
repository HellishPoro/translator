import { Group, Select, ActionIcon, Loader } from '@mantine/core';
import { IconArrowsLeftRight } from '@tabler/icons-react';
import { useTranslateStore } from '../../store/useTranslateStore';

interface LanguageSelectorProps {
  isDetectingLanguage: boolean;
}

export function LanguageSelector(props: LanguageSelectorProps) {
  const { isDetectingLanguage } = props;
  const data = [
    { value: 'en', label: 'English' },
    { value: 'ru', label: 'Русский' },
    { value: 'fr', label: 'Français' }
  ];

  const { sourceLanguageCode } = useTranslateStore();
  return (
    <Group gap="xs" align="center" mb="xs">
      <Select
        size="sm"
        data={data}
        value={isDetectingLanguage ? null : sourceLanguageCode}
        // onChange={}
        style={{ flex: 1 }}
        comboboxProps={{ withinPortal: false }}
        rightSection={isDetectingLanguage ? <Loader size="xs" /> : null}
      />

      <ActionIcon
        variant="subtle"
        color="gray"
        size="sm"
        //   onClick={}
      >
        <IconArrowsLeftRight size={16} />
      </ActionIcon>

      <Select
        size="sm"
        value={data[1].value}
        // onChange={}
        data={data}
        style={{ flex: 1 }}
        comboboxProps={{ withinPortal: false }}
      />
    </Group>
  );
}
