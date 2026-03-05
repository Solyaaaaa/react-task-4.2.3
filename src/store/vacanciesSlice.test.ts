import { describe, it, expect } from 'vitest';
import reducer, { addSkill, deleteSkill, setJob, setCity } from './vacanciesSlice';

describe('vacanciesSlice', () => {
  it('Добавляет навык', () => {
    const state = reducer(undefined, addSkill('Vue'));
    expect(state.keySkills).toContain('Vue');
  });

  it('Удаляет навык', () => {
    const state = reducer(undefined, deleteSkill('React'));
    expect(state.keySkills).not.toContain('React');
  });

  it('Сохраняет текст поиска', () => {
    const state = reducer(undefined, setJob('Frontend'));
    expect(state.searchJob).toBe('Frontend');
  });

  it('Сохраняет выбранный город', () => {
    const state = reducer(undefined, setCity('Москва'));
    expect(state.selectedCity).toBe('Москва');
  });
});
