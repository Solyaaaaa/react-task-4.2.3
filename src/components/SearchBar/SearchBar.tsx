import {
  Button,
  Container,
  Group,
  Input,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { fetchVacancies, setJob } from '../../store/vacanciesSlice';
import { IconSearch } from '@tabler/icons-react';
import type { KeyboardEvent } from 'react';

export const SearchBar = () => {
  const searchJob = useSelector(
    (state: RootState) => state.vacancies.searchJob
  );
  const selectedCity = useSelector(
    (state: RootState) => state.vacancies.selectedCity
  );
  const keySkills = useSelector(
    (state: RootState) => state.vacancies.keySkills
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(
        fetchVacancies({
          search: searchJob,
          area: selectedCity,
          skill: keySkills,
        })
      );
    }
  };
  return (
    <Container size={1000} pt={24}>
      <Group justify="space-between">
        <Stack gap={4}>
          <Title>Список вакансий</Title>
          <Text size="lg" c={'rgba(15, 15, 16, 0.5)'}>
            по профессии Frontend-разработчик
          </Text>
        </Stack>
        <Group gap={12} wrap="nowrap" w={510}>
          <Input
            onChange={(e) => dispatch(setJob(e.target.value))}
            onKeyDown={handleKeyDown}
            placeholder="Должность или название компании"
            styles={{
              input: {
                backgroundColor: 'transparent',
              },
            }}
            bg={'transparent'}
            radius="md"
            c={'rgba(15, 15, 16, 0.5)'}
            w={'100%'}
            miw={100}
            leftSection={<IconSearch size={16} />}
          />
          <Button
            onClick={() =>
              dispatch(
                fetchVacancies({
                  search: searchJob,
                  area: selectedCity,
                  skill: keySkills,
                })
              )
            }
            pl={22}
            pr={22}
            color="rgba(66, 99, 235, 1)"
            style={{ flexShrink: 0 }}
          >
            Найти
          </Button>
        </Group>
      </Group>
    </Container>
  );
};
