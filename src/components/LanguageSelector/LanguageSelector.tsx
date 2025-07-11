import { Group, Select, ActionIcon } from '@mantine/core';
import { IconArrowsLeftRight } from '@tabler/icons-react';

export function LanguageSelector() {
  const data = ['русский', 'english', 'français'];
  return (
    <Group gap="xs" align="center" mb="xs">
      <Select
        size="sm"
        // value={}
        // onChange={}
        data={data}
        style={{ flex: 1 }}
        comboboxProps={{ withinPortal: false }}
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
        value={data[0]}
        // onChange={}
        data={data}
        style={{ flex: 1 }}
        comboboxProps={{ withinPortal: false }}
      />
    </Group>
  );
}
