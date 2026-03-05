import { describe, it, expect } from 'vitest';
import { formatCurrency, formatSalary } from './formatVacancy';
import { formatArea } from './formatArea';

describe('formatCurrency', () => {
  it('Переводит RUR в ₽', () => {
    expect(formatCurrency('RUR')).toBe('₽');
  });

  it('Возвращает исходную строку если валюта неизвестна', () => {
    expect(formatCurrency('GBP')).toBe('GBP');
  });
});

describe('formatSalary', () => {
  it('Возвращает тескт если зарплата не указана', () => {
    expect(formatSalary(null)).toBe('Зарплата не указана');
  });

  it('Содержит "от" если есть только from', () => {
    expect(formatSalary({ from: 100000, to: null, currency: 'RUR' })).toContain('от');
  });

  it('Содержит "до" если есть только to', () => {
    expect(formatSalary({ from: null, to: 200000, currency: 'RUR' })).toContain('до');
  });
});

describe('formatArea', () => {
  it('Переводит Москву в 1', () => {
    expect(formatArea('Москва')).toBe('1');
  });

  it('Возвращает исходную строку для неизвестного города', () => {
    expect(formatArea('Казань')).toBe('Казань');
  });
});

