import { TextInput, Select, Group, ActionIcon, Tooltip } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import type { Language } from '../../types/api.types';
import type { GlossaryFilterType } from '../../types/glossary.types.ts';

interface GlossaryFilterProps {
  filter: GlossaryFilterType;
  onFilterChange: (filter: Partial<GlossaryFilterType>) => void;
  languages: Language[];
}

export const GlossaryFilter = ({ filter, onFilterChange, languages }: GlossaryFilterProps) => {
  const languageOptions = [
    { value: '', label: 'All languages' },
    ...languages.map(lang => ({ value: lang.code, label: lang.name }))
  ];

  const clearFilters = () => {
    onFilterChange({
      search: '',
      sourceLanguage: '',
      targetLanguage: ''
    });
  };

  const hasActiveFilters = filter.search || filter.sourceLanguage || filter.targetLanguage;

  return (
    <Group gap="md" align="center">
      <TextInput
        placeholder="Search words..."
        value={filter.search}
        onChange={e => onFilterChange({ search: e.target.value })}
        leftSection={<IconSearch size={16} />}
        style={{ flex: 1 }}
      />

      <Select
        placeholder="Source language"
        value={filter.sourceLanguage}
        onChange={value => onFilterChange({ sourceLanguage: value || '' })}
        data={languageOptions}
        clearable
        style={{ minWidth: 150 }}
      />

      <Select
        placeholder="Target language"
        value={filter.targetLanguage}
        onChange={value => onFilterChange({ targetLanguage: value || '' })}
        data={languageOptions}
        clearable
        style={{ minWidth: 150 }}
      />

      {hasActiveFilters && (
        <Tooltip label="Clear filters" withArrow>
          <ActionIcon variant="subtle" color="gray" onClick={clearFilters}>
            <IconX size={16} />
          </ActionIcon>
        </Tooltip>
      )}
    </Group>
  );
};
