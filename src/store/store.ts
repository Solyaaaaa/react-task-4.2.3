import { configureStore } from '@reduxjs/toolkit';
import vacansiesReducer from './vacanciesSlice';

export const store = configureStore({
  reducer: {
    vacancies: vacansiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;