import { Button, Group, Paper, Stack, Text } from '@mantine/core';
import {
  formatCurrency,
  formatSalary,
  formatWork,
} from '../../utils/formatVacancy';
import { Link } from 'react-router-dom';
import type { Vacancy } from '../../types/vacancy';

export const VacancyCard = ({
  vacancy,
  isDetailPage = false,
}: {
  vacancy: Vacancy;
  isDetailPage?: boolean;
}) => {
  return (
    <Paper
      shadow="xs"
      radius="md"
      p={24}
      style={{ width: '100%' }}
    >
      <Text size="lg" fw={500} c={'rgba(54, 79, 199, 1)'}>
        {vacancy.name}
      </Text>
      <Group gap={8}>
        <Text fw={400}>
          {formatSalary(vacancy.salary)}
          {vacancy.salary && formatCurrency(vacancy.salary.currency)}
        </Text>
        <Text fw={400} c={'rgba(15, 15, 16, 0.5)'}>
          {vacancy.experience?.name || 'Без опыта'}
        </Text>
      </Group>
      <Stack pt={16} gap={8}>
        <Text fw={400} c={'rgba(15, 15, 16, 0.5)'}>
          {vacancy.employer.name}
        </Text>
        {formatWork(vacancy.work_format[0]?.name)}
        <Text>{vacancy.area.name}</Text>
      </Stack>
      <Group pt={16}>
        {isDetailPage ? (
          <Button
            color="rgba(15, 15, 16, 1)"
            fw={400}
            onClick={() =>
              window.open(
                vacancy.alternate_url,
                '_blank',
                'noopener,noreferrer'
              )
            }
          >
            Откликнуться на hh.ru
          </Button>
        ) : (
          <>
            <Button
              component={Link}
              to={`/vacancies/${vacancy.id}`}
              color="rgba(15, 15, 16, 1)"
              fw={400}
            >
              Смотреть вакансию
            </Button>
            <Button
              color="rgba(15, 15, 16, 0.1)"
              c={'rgba(15, 15, 16, 1)'}
              fw={400}
              onClick={() =>
                window.open(
                  vacancy.alternate_url,
                  '_blank',
                  'noopener,noreferrer'
                )
              }
            >
              Откликнуться
            </Button>
          </>
        )}
      </Group>
    </Paper>
  );
};
