import { MantineProvider } from "@mantine/core";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { VacancyList } from "./VacancyList";
import vacanciesReducer from '../../store/vacanciesSlice';

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
      currentPage: 1
    },
  },
});

describe('VacancyList', () => {
  it('отображает карточки вакансий', () => {
    render(
      <BrowserRouter>
        <MantineProvider>
          <Provider store={mockStore}>
            <VacancyList />
          </Provider>
        </MantineProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Frontend разработчик')).toBeInTheDocument();
    expect(screen.getByText('Яндекс')).toBeInTheDocument();
    expect(screen.getByText('Откликнуться')).toBeInTheDocument();
  });
});
