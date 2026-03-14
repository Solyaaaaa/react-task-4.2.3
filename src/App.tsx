import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Loader } from '@mantine/core';

const VacanciesPage = lazy(() => import('./pages/VacanciesPage'));
const VacancyPage = lazy(() => import('./pages/VacancyPage'));


export default function App() {
  return (
    <Suspense fallback={<Loader color="blue" type="dots" />}>
    <Routes>
      <Route path="/" element={<Navigate to="/vacancies" />} />

      <Route path="/vacancies" element={<VacanciesPage />} />

      <Route path="/vacancies/:id" element={<VacancyPage />} />

      <Route path="*" element={<Navigate to="/vacancies" />} />
    </Routes>
    </Suspense>

  );
}