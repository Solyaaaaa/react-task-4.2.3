import { Paper, Select } from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { fetchVacancies, setCity, setPage } from '../../store/vacanciesSlice';

export const CitySelect = () => {
  const vacanciesCity = useSelector((state: RootState) => state.vacancies.city);
  const searchJob = useSelector(
    (state: RootState) => state.vacancies.searchJob
  );
  const keySkills = useSelector(
    (state: RootState) => state.vacancies.keySkills
  );
   const selectedCity = useSelector(
    (state: RootState) => state.vacancies.selectedCity
  );

  const dispatch = useDispatch<AppDispatch>();

  return (
    <Paper shadow="xs" radius="md" p={24}>
      <Select
        value={selectedCity}
        data={vacanciesCity}
        onChange={(value) => {
          dispatch(setCity(value));
          dispatch(setPage(1))
          dispatch(
            fetchVacancies({
              search: searchJob,
              area: value ?? '',
              skill: keySkills,
              page:0
            })
          );
        }}
        leftSection={<IconMapPin size={16} />}
      />
    </Paper>
  );
};
