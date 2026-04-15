import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const habitsApi = createApi({
  reducerPath: 'habitsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_BASE,
    credentials: 'include',
  }),
  tagTypes: ['Habit', 'Journal'],
  /* istanbul ignore next */
  endpoints: (builder) => ({
    getHabits: builder.query<any[], void>({
      query: () => '/habits',
      providesTags: ['Habit'],
    }),
    createHabit: builder.mutation<any, any>({
      query: (body) => ({
        url: '/habits',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Habit'],
    }),
    updateHabit: builder.mutation<any, {id: string, data: any}>({
      query: ({ id, data }) => ({
        url: `/habits/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Habit'],
    }),
    deleteHabit: builder.mutation<any, string>({
      query: (id) => ({
        url: `/habits/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Habit'],
    }),
    toggleHabitComplete: builder.mutation<any, { habitId: string, date: string }>({
      query: ({ habitId, date }) => ({
        url: `/habits/${habitId}/toggle`,
        method: 'POST',
        body: { date },
      }),
      invalidatesTags: ['Habit'],
    }),
    getJournalEntries: builder.query<any[], void>({
      query: () => '/journal',
      providesTags: ['Journal'],
    }),
    createJournalEntry: builder.mutation<any, any>({
      query: (body) => ({
        url: '/journal',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Journal'],
    }),
    updateJournalEntry: builder.mutation<any, {id: string, data: any}>({
      query: ({ id, data }) => ({
        url: `/journal/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Journal'],
    }),
    deleteJournalEntry: builder.mutation<any, string>({
      query: (id) => ({
        url: `/journal/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Journal'],
    }),
  }),
});

export const {
  useGetHabitsQuery,
  useCreateHabitMutation,
  useUpdateHabitMutation,
  useDeleteHabitMutation,
  useToggleHabitCompleteMutation,
  useGetJournalEntriesQuery,
  useCreateJournalEntryMutation,
  useUpdateJournalEntryMutation,
  useDeleteJournalEntryMutation,
} = habitsApi;
