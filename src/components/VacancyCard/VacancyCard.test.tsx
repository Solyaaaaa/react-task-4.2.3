import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { configureStore } from '@reduxjs/toolkit';
import vacanciesReducer from '../../store/vacanciesSlice';
import { VacancyCard } from './VacancyCard';

const mockVacancy = {
  id: '1',
  name: 'Frontend разработчик',
  salary: { from: 100000, to: 200000, currency: 'RUR' },
  experience: { name: 'От 1 года до 3 лет' },
  employer: { name: 'Яндекс' },
  work_format: [{ name: 'Удалённо' }],
  area: { name: 'Москва' },
  alternate_url: 'https://hh.ru/vacancy/1',
};

const mockStore = configureStore({
  reducer: { vacancies: vacanciesReducer },
  preloadedState: {
    vacancies: {
      vacancies: [mockVacancy],
      status: 'resolved',
      error: null,
      searchJob: '',
      city: ['Все города', 'Москва', 'Санкт-Петербург'],
      selectedCity: '',
      keySkills: ['TypeScript', 'React', 'Redux'],
      totalPages: 1,
    },
  },
});

describe('VacancyCard', () => {
  it('отображает название вакансии', () => {
    render(
      <MantineProvider>
        <Provider store={mockStore}>
          <VacancyCard />
        </Provider>
      </MantineProvider>
    );
    expect(screen.getByText('Frontend разработчик')).toBeInTheDocument();
  });

  it('отображает название компании', () => {
    render(
      <MantineProvider>
        <Provider store={mockStore}>
          <VacancyCard />
        </Provider>
      </MantineProvider>
    );
    expect(screen.getByText('Яндекс')).toBeInTheDocument();
  });

  it('отображает кнопку Откликнуться', () => {
    render(
      <MantineProvider>
        <Provider store={mockStore}>
          <VacancyCard />
        </Provider>
      </MantineProvider>
    );
    expect(screen.getByText('Откликнуться')).toBeInTheDocument();
  });
});
