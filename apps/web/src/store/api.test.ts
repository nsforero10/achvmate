jest.mock('@reduxjs/toolkit/query/react', () => {
  const original = jest.requireActual('@reduxjs/toolkit/query/react');
  return {
    ...original,
    fetchBaseQuery: jest.fn(() => jest.fn()),
  };
});

import { habitsApi } from './api';

describe('RTK Query API Store bindings', () => {
  it('should explicitly mount correct reducer paths mappings', () => {
    expect(habitsApi.reducerPath).toBe('habitsApi');
  });

  it('should strictly construct required querying endpoints', () => {
    expect(habitsApi.endpoints.getHabits).toBeDefined();
    expect(habitsApi.endpoints.createHabit).toBeDefined();
    expect(habitsApi.endpoints.updateHabit).toBeDefined();
    expect(habitsApi.endpoints.deleteHabit).toBeDefined();
    expect(habitsApi.endpoints.toggleHabitComplete).toBeDefined();

    expect(habitsApi.endpoints.getJournalEntries).toBeDefined();
    expect(habitsApi.endpoints.createJournalEntry).toBeDefined();
    expect(habitsApi.endpoints.updateJournalEntry).toBeDefined();
    expect(habitsApi.endpoints.deleteJournalEntry).toBeDefined();
  });
});
