import { Badge } from '@mantine/core';
import type { Salary } from '../types/vacancy';

type Currency = keyof typeof currencyMap;

const currencyMap = {
  RUR: '₽',
  USD: '$',
  EUR: '€',
  KZT: '₸',
} as const;


export const formatCurrency = (currency:  Currency | string) =>
  currencyMap[currency as Currency] ?? currency;


export const formatWork = (work: string | null) => {
  if (!work) {
    return null;
  }
  if (work === 'Гибрид') {
    return (
      <Badge color="rgba(15, 15, 16, 1)" size="xs" radius="xs">
        ГИБРИД
      </Badge>
    );
  }
  if (work.includes('работодателя')) {
    return (
      <Badge
        color="rgba(15, 15, 16, 0.1)"
        c={'rgba(15, 15, 16, 0.5)'}
        size="xs"
        radius="xs"
      >
        ОФИС
      </Badge>
    );
  }
  if (work === 'Удалённо') {
    return (
      <Badge color="rgba(66, 99, 235, 1)" size="xs" radius="xs">
        МОЖНО УДАЛЁННО
      </Badge>
    );
  }
  return null;
};

export const formatSalary = (salary: Salary | null) => {
  if (!salary) {
    return 'Зарплата не указана';
  }

  const formatNum = (num: number) => num.toLocaleString('ru-RU');

  if (salary.from && salary.to) {
    return `${formatNum(salary.from)} - ${formatNum(salary.to)}`;
  }
  if (salary.from) {
    return `от ${formatNum(salary.from)}`;
  }
  if (salary.to) {
    return `до ${formatNum(salary.to)}`;
  }
  return 'Зарплата не указана';
};
