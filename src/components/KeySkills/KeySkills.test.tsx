import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { KeySkills } from './KeySkills';
import { MantineProvider } from '@mantine/core';

describe('KeySkills', () => {
  it('Oтображает начальные навыки', () => {
    render(
      <MantineProvider>
        <Provider store={store}>
          <KeySkills />
        </Provider>
      </MantineProvider>
    );

    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Redux')).toBeInTheDocument();
  });

  it('Oтображает инпут для добавления навыка', () => {
    render(
      <MantineProvider>
        <Provider store={store}>
          <KeySkills />
        </Provider>
      </MantineProvider>
    );

    expect(screen.getByPlaceholderText('Навык')).toBeInTheDocument();
  });
});
