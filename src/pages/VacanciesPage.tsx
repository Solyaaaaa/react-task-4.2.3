import '@mantine/core/styles.css';
import {
  AppShell,
  Container,
  Divider,
  Group,
  Loader,
  Stack,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { useEffect } from 'react';
import {
  fetchVacancies,
  setCity,
  setJob,
  setSkills,
} from '../store/vacanciesSlice';
import { HeaderVacancy } from '../components/HeaderVacancy/HeaderVacancy';
import { VacancyList } from '../components/VacancyList/VacancyList';
import { KeySkills } from '../components/KeySkills/KeySkills';
import { CitySelect } from '../components/CitySelect/CitySelect';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { PaginationVacancies } from '../components/PaginationVacancies/PaginationVacancies';
import { useSearchParams } from 'react-router-dom';

 const VacanciesPage = () => {
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
  const currentPage = useSelector(
    (state: RootState) => state.vacancies.currentPage
  );
  const status = useSelector((state: RootState) => state.vacancies.status);

  const dispatch = useDispatch<AppDispatch>();

  const [searchParams, setSearchParams] = useSearchParams();

  const text = searchParams.get('text');
  const area = searchParams.get('area');
  const skills = searchParams.getAll('skill_set');

  useEffect(() => {
    if (text) dispatch(setJob(text));
    if (area) dispatch(setCity(area));
    if (skills.length > 0) dispatch(setSkills(skills));
  }, [text, area, skills.join(',')]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchJob) params.set('text', searchJob);
    if (selectedCity && selectedCity !== 'Все города')
      params.set('area', selectedCity);
    keySkills.forEach((skill) => params.append('skill_set', skill));

    setSearchParams(params);
  }, [searchJob, selectedCity, keySkills]);

  useEffect(() => {
    dispatch(
      fetchVacancies({
        search: searchJob,
        area: selectedCity,
        skill: keySkills,
        page: currentPage - 1,
      })
    );
  }, [dispatch, searchJob, selectedCity, keySkills, currentPage]);

  return (
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
              {status === 'loading' ? (
                <Loader color="blue" type="dots" />
              ) : (
                <VacancyList />
              )}

              {totalPages !== 1 && status === 'resolved' && (
                <PaginationVacancies />
              )}
            </Stack>
          </Group>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default VacanciesPage;
