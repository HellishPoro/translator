import {
  Group,
  Select,
  ActionIcon,
  type OptionsFilter,
  type ComboboxItem,
  Loader
} from '@mantine/core';
import { IconArrowsLeftRight, IconArrowsRight } from '@tabler/icons-react';
import { useCallback, useMemo } from 'react';
import type { Language } from '../../types/api.types';

interface Option {
  value: string;
  label: string;
}

export interface SelectedValue {
  target: Option;
  source: Option;
}

interface LanguageSelectorProps {
  onChange: (value: SelectedValue) => void;
  value: SelectedValue;
  swapLanguages?: boolean;
  languages: Language[];
  isDetectingLanguage: boolean;
}

export function LanguageSelector(props: LanguageSelectorProps) {
  const { onChange, value, swapLanguages = true, languages, isDetectingLanguage } = props;

  const languagesOptions = useMemo(
    () =>
      languages.map(language => ({
        value: language.code,
        label: language.name
      })),
    [languages]
  );

  const handleSourceChange = useCallback(
    (newValue: string | null) => {
      const selectedOption = languagesOptions.find(option => option.value === newValue);
      if (selectedOption) {
        onChange({
          ...value,
          source: selectedOption
        });
      }
    },
    [languagesOptions, onChange, value]
  );

  const handleTargetChange = useCallback(
    (newValue: string | null) => {
      const selectedOption = languagesOptions.find(option => option.value === newValue);
      if (selectedOption) {
        onChange({
          ...value,
          target: selectedOption
        });
      }
    },
    [languagesOptions, onChange, value]
  );

  const handleSwapLanguages = useCallback(() => {
    onChange({
      source: value.target,
      target: value.source
    });
  }, [value, onChange]);

  const optionsSourceFilter: OptionsFilter = useCallback(
    ({ options, search }) => {
      const filtered = (options as ComboboxItem[])
        .filter(option => option.value !== value.target.value)
        .filter(option => option.label.toLowerCase().trim().includes(search.toLowerCase().trim()));
      return filtered;
    },
    [value.target.value]
  );

  const optionsTargetFilter: OptionsFilter = useCallback(
    ({ options, search }) => {
      const filtered = (options as ComboboxItem[])
        .filter(option => option.value !== value.source.value)
        .filter(option => option.label.toLowerCase().trim().includes(search.toLowerCase().trim()));
      return filtered;
    },
    [value.source.value]
  );

  return (
    <Group gap="xs" align="center" mb="xs">
      <Select
        size="sm"
        value={isDetectingLanguage ? null : value.source.value}
        onChange={handleSourceChange}
        data={languagesOptions}
        style={{ flex: 1 }}
        comboboxProps={{
          withinPortal: false,
          transitionProps: { transition: 'pop', duration: 200 }
        }}
        disabled={!swapLanguages}
        filter={optionsSourceFilter}
        rightSection={isDetectingLanguage ? <Loader size="xs" /> : null}
        searchable
      />
      {swapLanguages ? (
        <ActionIcon variant="subtle" color="gray" size="sm" onClick={handleSwapLanguages}>
          <IconArrowsLeftRight size={16} />
        </ActionIcon>
      ) : (
        <IconArrowsRight color="gray" size={16} />
      )}
      <Select
        size="sm"
        value={value.target.value}
        onChange={handleTargetChange}
        data={languagesOptions}
        style={{ flex: 1 }}
        comboboxProps={{
          withinPortal: false,
          transitionProps: { transition: 'pop', duration: 200 }
        }}
        filter={optionsTargetFilter}
        searchable
      />
    </Group>
  );
}
