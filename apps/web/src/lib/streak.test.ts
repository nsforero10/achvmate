import { calculateCurrentStreak, HabitEntry } from './streak';

describe('calculateCurrentStreak', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-04-15T12:00:00Z')); 
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return 0 when frequency is empty', () => {
    expect(calculateCurrentStreak([], [])).toBe(0);
  });

  it('should correctly calculate a streak mapped strictly against daily schedules', () => {
    const freq = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const entries: HabitEntry[] = [
      { date: '2026-04-14T10:00:00Z', completed: true },
      { date: '2026-04-13T10:00:00Z', completed: true },
      { date: '2026-04-12T10:00:00Z', completed: true },
    ];
    
    expect(calculateCurrentStreak(freq, entries)).toBe(3);
  });

  it('should ignore non-scheduled days and bridge streaks perfectly across weekends', () => {
    const freq = ['MON', 'WED', 'FRI'];
    const entries: HabitEntry[] = [
      { date: '2026-04-15T10:00:00Z', completed: true },
      { date: '2026-04-13T10:00:00Z', completed: true },
      { date: '2026-04-10T10:00:00Z', completed: true },
    ];
    
    expect(calculateCurrentStreak(freq, entries)).toBe(3);
  });

  it('should break the streak when a specifically scheduled day goes uncompleted', () => {
    const freq = ['MON', 'WED', 'FRI'];
    const entries: HabitEntry[] = [
       { date: '2026-04-13T10:00:00Z', completed: true },
       { date: '2026-04-08T10:00:00Z', completed: true },
    ];
    
    expect(calculateCurrentStreak(freq, entries)).toBe(1);
  });
});
