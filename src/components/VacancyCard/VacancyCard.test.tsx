import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { VacancyCard } from './VacancyCard';
import { BrowserRouter } from "react-router-dom";

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


describe('VacancyCard', () => {
  it('отображает данные вакансии', () => {
    render(
      <BrowserRouter>
        <MantineProvider>
          <VacancyCard vacancy={mockVacancy} />
        </MantineProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Frontend разработчик')).toBeInTheDocument();
    expect(screen.getByText('Яндекс')).toBeInTheDocument();
  });
});
