
import '@mantine/core/styles.css';
import {
  AppShell,
  Container,
  Divider,
  Group,
  Loader,
  MantineProvider,
  Pagination,
  Stack,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store/store';
import { useEffect, useState } from 'react';
import { fetchVacancies } from './store/vacanciesSlice';
import { HeaderVacancy } from './components/HeaderVacancy/HeaderVacancy';
import { VacancyCard } from './components/VacancyCard/VacancyCard';
import { KeySkills } from './components/KeySkills/KeySkills';
import { CitySelect } from './components/CitySelect/CitySelect';
import { SearchBar } from './components/SearchBar/SearchBar';

export default function App() {
  const [activePage, setPage] = useState(1);

  const searchJob = useSelector(
    (state: RootState) => state.vacancies.searchJob
  );
  const selectedCity = useSelector(
    (state: RootState) => state.vacancies.selectedCity
  );
  const keySkills = useSelector(
    (state: RootState) => state.vacancies.keySkills
  );
  const totalPages = useSelector(
    (state: RootState) => state.vacancies.totalPages
  );
  const status = useSelector((state: RootState) => state.vacancies.status);

  const dispatch = useDispatch<AppDispatch>();
  console.log(status);

  useEffect(() => {
    dispatch(
      fetchVacancies({ search: '', area: 'Все города', skill: keySkills })
    );
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    setPage(page);
    dispatch(
      fetchVacancies({
        search: searchJob,
        area: selectedCity,
        skill: keySkills,
        page: page - 1,
      })
    );
  };

  return (
    <MantineProvider>
      <AppShell header={{ height: 60 }}>
        <HeaderVacancy />
        <AppShell.Main bg={'#f6f6f7'} pt={60}>
          <SearchBar />
          <Divider my="xl" m={24} />
          <Container size={1000}>
            <Group align="flex-start" gap={24} justify="space-between" pb={24}>
              <Stack w={317}>
                <KeySkills />
                <CitySelect />
              </Stack>

              <Stack style={{ flex: 1 }} align="center">
                {status === 'loading' || status === null ? (
                  <Loader color="blue" type="dots" />
                ) : (
                  <VacancyCard />
                )}

                {totalPages !== 1 && status === 'resolved' && (
                  <Pagination
                    total={totalPages}
                    withEdges
                    value={activePage}
                    onChange={handlePageChange}
                  />
                )}
              </Stack>
            </Group>
          </Container>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
