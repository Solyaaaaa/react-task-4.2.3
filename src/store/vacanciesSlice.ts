import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Vacancy } from '../types/vacancy';
import { formatArea } from '../utils/formatArea';

export const fetchVacancies = createAsyncThunk(
  'vacancies/fetchVacancies',
  async (params: {
    search: string;
    area?: string;
    skill?: string[];
    page?: number;
  }) => {
    const searchParams = new URLSearchParams({
      industry: '7',
      professional_role: '96',
      per_page: '10',
      page: String(params.page || 0),
    });

    if (params.search) {
      searchParams.append('text', params.search);
      searchParams.append('search_field', 'name');
      searchParams.append('search_field', 'company_name');
    }
    if (params.area && params.area !== 'Все города') {
      searchParams.append('area', formatArea(params.area));
    }
    if (params.skill?.length) {
      params.skill.forEach((s) => searchParams.append('skill_set', s));
    }
    const response = await fetch(`https://api.hh.ru/vacancies?${searchParams}`);

    const data = await response.json();
    return { items: data.items, totalPages: data.pages };
  }
);
const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState: {
    vacancies: [] as Vacancy[],
    status: null as string | null,
    error: null as string | null,
    totalPages: 0,
    searchJob: '',
    city: ['Все города', 'Москва', 'Санкт-Петербург'],
    selectedCity: '',
    keySkills: ['TypeScript', 'React', 'Redux'],
  },

  reducers: {
    setJob: (state, action) => {
      state.searchJob = action.payload;
    },
    setCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    addSkill: (state, action) => {
      state.keySkills.push(action.payload);
    },
    deleteSkill: (state, action) => {
      state.keySkills = state.keySkills.filter(
        (skill) => action.payload !== skill
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.vacancies = action.payload.items;
        state.totalPages = Math.min(action.payload.totalPages, 10);
      })

      .addCase(fetchVacancies.rejected, (state, action) => {
        state.status = 'rejected';
        console.error('Failed to fetch vacancies:', action.error);
      });
  },
});

export const { setJob, setCity, addSkill, deleteSkill } =
  vacanciesSlice.actions;
export default vacanciesSlice.reducer;
