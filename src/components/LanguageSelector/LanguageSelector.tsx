import {
  Group,
  Select,
  ActionIcon,
  type OptionsFilter,
  type ComboboxItem,
} from '@mantine/core';
import { IconArrowsLeftRight } from '@tabler/icons-react';
import { useTranslateStore } from '../../store/useTranslateStore';
import { useCallback, useMemo } from 'react';

interface Option {
  value: string;
  label: string;
}

export interface SelectedValue {
  target: Option;
  source: Option;
}

interface LanguageSelector {
  onChange: (value: SelectedValue) => void;
  value: SelectedValue;
}

export function LanguageSelector(props: LanguageSelector) {
  const { onChange, value } = props;
  const languages = useTranslateStore((state) => state.languages);

  const languagesOptions = useMemo(
    () =>
      languages.map((language) => ({
        value: language.code,
        label: language.name,
      })),
    [languages]
  );

  const handleSourceChange = useCallback(
    (newValue: string | null) => {
      const selectedOption = languagesOptions.find(
        (option) => option.value === newValue
      );
      if (selectedOption) {
        onChange({
          ...value,
          source: selectedOption,
        });
      }
    },
    [languagesOptions, onChange, value]
  );

  const handleTargetChange = useCallback(
    (newValue: string | null) => {
      const selectedOption = languagesOptions.find(
        (option) => option.value === newValue
      );
      if (selectedOption) {
        onChange({
          ...value,
          target: selectedOption,
        });
      }
    },
    [languagesOptions, onChange, value]
  );

  const handleSwapLanguages = useCallback(() => {
    onChange({
      source: value.target,
      target: value.source,
    });
  }, [value, onChange]);

  const optionsSourceFilter: OptionsFilter = useCallback(
    ({ options, search }) => {
      const filtered = (options as ComboboxItem[])
        .filter((option) => option.value !== value.target.value)
        .filter((option) =>
          option.label
            .toLowerCase()
            .trim()
            .includes(search.toLowerCase().trim())
        );
      return filtered;
    },
    [value.target.value]
  );

  const optionsTargetFilter: OptionsFilter = useCallback(
    ({ options, search }) => {
      const filtered = (options as ComboboxItem[])
        .filter((option) => option.value !== value.source.value)
        .filter((option) =>
          option.label
            .toLowerCase()
            .trim()
            .includes(search.toLowerCase().trim())
        );
      return filtered;
    },
    [value.source.value]
  );

  return (
    <Group gap="xs" align="center" mb="xs">
      <Select
        size="sm"
        value={value.source.value}
        onChange={handleSourceChange}
        data={languagesOptions}
        style={{ flex: 1 }}
        comboboxProps={{
          withinPortal: false,
          transitionProps: { transition: 'pop', duration: 200 },
        }}
        filter={optionsSourceFilter}
        searchable
      />

      <ActionIcon
        variant="subtle"
        color="gray"
        size="sm"
        onClick={handleSwapLanguages}
      >
        <IconArrowsLeftRight size={16} />
      </ActionIcon>

      <Select
        size="sm"
        value={value.target.value}
        onChange={handleTargetChange}
        data={languagesOptions}
        style={{ flex: 1 }}
        comboboxProps={{
          withinPortal: false,
          transitionProps: { transition: 'pop', duration: 200 },
        }}
        filter={optionsTargetFilter}
        searchable
      />
    </Group>
  );
}
