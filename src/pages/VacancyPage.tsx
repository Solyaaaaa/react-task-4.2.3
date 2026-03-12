import { useParams } from 'react-router-dom';
import { VacancyCard } from '../components/VacancyCard/VacancyCard';
import { useEffect, useState } from 'react';
import { HeaderVacancy } from '../components/HeaderVacancy/HeaderVacancy';
import { AppShell, Container, Paper } from '@mantine/core';
import type { Vacancy } from '../types/vacancy';

export const VacancyPage = () => {
  const { id } = useParams();
  const [dataVacancy, setDataVacancy] = useState<Vacancy | null>(null);


  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.hh.ru/vacancies/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setDataVacancy(result);
      } catch (err) {
        console.log(err);
        setDataVacancy(null);
      }
    };

    fetchData();
  }, [id]);


  return (
    <AppShell header={{ height: 60 }}>
      <HeaderVacancy />
      <AppShell.Main bg={'#f6f6f7'} pt={60}>
        <Container size={'sm'} p={24}>
          {dataVacancy && <VacancyCard vacancy={dataVacancy} isDetailPage={true}/>}

          <Paper
            shadow="xs"
            radius="md"
            mt={24}
            p={8}
            pl={24}
            pr={24}
            style={{ width: '100%' }}
          >
            <div
            dangerouslySetInnerHTML={{ __html: dataVacancy?.description ?? '' }}
            />

          </Paper>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};
