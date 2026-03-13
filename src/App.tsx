import { Routes, Route, Navigate } from 'react-router-dom';
import { VacanciesPage } from './pages/VacanciesPage';
import { VacancyPage } from './pages/VacancyPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="*/vacancies" />} />

      <Route path="/vacancies" element={<VacanciesPage />} />

      <Route path="/vacancies/:id" element={<VacancyPage />} />

      <Route path="*" element={<Navigate to="/vacancies" />} />
    </Routes>
  );
}