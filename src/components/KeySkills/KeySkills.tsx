import { Button, Group, Paper, Pill, PillsInput, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import type { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { addSkill, deleteSkill } from '../../store/vacanciesSlice';
import { useState, type KeyboardEvent } from 'react';

export const KeySkills = () => {
  const [inputValue, setInputValue] = useState('');

  const keySkills = useSelector(
    (state: RootState) => state.vacancies.keySkills
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = () => {
    const value = inputValue.trim();

    if (!value) return; 
    if (keySkills.includes(value)) return;

    dispatch(addSkill(value));
    setInputValue('');
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <Paper shadow="xs" radius="md" p={24} maw={320}>
      <Text> Ключевые навыки</Text>
      <Group pt={12} wrap="nowrap" gap={8} align="center">
        <PillsInput radius="md" w={'100%'}>
          <PillsInput.Field
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Навык"
          />
        </PillsInput>
        <Button w={34} h={30} p={0} onClick={handleAdd}>
          {<IconPlus />}
        </Button>
      </Group>

      <Pill.Group pt={12}>
        {keySkills.map((skill) => (
          <Pill
            key={skill}
            fw={400}
            withRemoveButton
            onRemove={() => {
              dispatch(deleteSkill(skill));
            }}
          >
            {skill}
          </Pill>
        ))}
      </Pill.Group>
    </Paper>
  );
};
