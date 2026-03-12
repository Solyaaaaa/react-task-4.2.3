import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { VacancyCard } from '../VacancyCard/VacancyCard';

export const VacancyList = () => {
  const vacanciesItems = useSelector(
    (state: RootState) => state.vacancies.vacancies
  );

  return (
    <>
      {vacanciesItems.map((vacancy) => (
        <VacancyCard key={vacancy.id} vacancy={vacancy} />
      )
          
      )}
    </>
  );
};
