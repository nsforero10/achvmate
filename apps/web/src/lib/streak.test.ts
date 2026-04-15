import { calculateCurrentStreak, HabitEntry } from './streak';

describe('calculateCurrentStreak', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    // Simulate current date as April 15, 2026 (Wednesday)
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
      { date: '2026-04-14T10:00:00Z', completed: true }, // Tuesday
      { date: '2026-04-13T10:00:00Z', completed: true }, // Monday
      { date: '2026-04-12T10:00:00Z', completed: true }, // Sunday
    ];
    
    // The streak should be 3. The algorithm allows the 'today' boundary (Wednesday, Apr 15) to be incomplete.
    expect(calculateCurrentStreak(freq, entries)).toBe(3);
  });

  it('should ignore non-scheduled days and bridge streaks perfectly across weekends', () => {
    // Scheduled for Monday, Wednesday, Friday only
    const freq = ['MON', 'WED', 'FRI'];
    const entries: HabitEntry[] = [
      { date: '2026-04-15T10:00:00Z', completed: true }, // Wed
      { date: '2026-04-13T10:00:00Z', completed: true }, // Mon
      { date: '2026-04-10T10:00:00Z', completed: true }, // Fri
    ];
    
    // Should smoothly string a streak of 3 since Tues/Thurs/Weekends were purposefully skipped by the frequency configuration
    expect(calculateCurrentStreak(freq, entries)).toBe(3);
  });

  it('should break the streak when a specifically scheduled day goes uncompleted', () => {
    const freq = ['MON', 'WED', 'FRI'];
    const entries: HabitEntry[] = [
       { date: '2026-04-13T10:00:00Z', completed: true }, // Mon
       // Notice Apr 10th (Fri) is missing/not-completed here!
       { date: '2026-04-08T10:00:00Z', completed: true }, // Past Wed
    ];
    
    // Streak breaks sequentially on Friday, so the previous Wednesday doesn't get swept into the count.
    expect(calculateCurrentStreak(freq, entries)).toBe(1);
  });
});
