import { Paper, Select } from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { fetchVacancies, setCity } from '../../store/vacanciesSlice';

export const CitySelect = () => {
  const vacanciesCity = useSelector((state: RootState) => state.vacancies.city);
  const searchJob = useSelector(
    (state: RootState) => state.vacancies.searchJob
  );
  const keySkills = useSelector(
    (state: RootState) => state.vacancies.keySkills
  );

  const dispatch = useDispatch<AppDispatch>();

  return (
    <Paper shadow="xs" radius="md" p={24}>
      <Select
        placeholder="Все города"
        data={vacanciesCity}
        onChange={(value) => {
          dispatch(setCity(value));
          dispatch(
            fetchVacancies({
              search: searchJob,
              area: value ?? '',
              skill: keySkills,
            })
          );
        }}
        leftSection={<IconMapPin size={16} />}
      />
    </Paper>
  );
};
