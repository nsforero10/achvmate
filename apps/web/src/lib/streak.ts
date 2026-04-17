const DAY_CODES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export interface HabitEntry {
  date: string;
  completed: boolean;
}

export function calculateCurrentStreak(frequency: string[], entries: HabitEntry[]) {
  if (!frequency || frequency.length === 0) return 0;
  
  /* istanbul ignore next */
  const completedDates = new Set(
    (entries || [])
      .filter((e) => e.completed)
      .map((e) => e.date.split('T')[0])
  );

  let streak = 0;
  const today = new Date();
  
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  let iterDate = new Date();

  for (let i = 0; i < 3650; i++) {
    const dayCode = DAY_CODES[iterDate.getDay()];
    
    if (frequency.includes(dayCode)) {
      const iterStr = `${iterDate.getFullYear()}-${String(iterDate.getMonth() + 1).padStart(2, '0')}-${String(iterDate.getDate()).padStart(2, '0')}`;
      
      if (completedDates.has(iterStr)) {
        streak++;
      } else {
        if (iterStr !== todayStr) {
          break;
        }
      }
    }
    
    iterDate.setDate(iterDate.getDate() - 1);
  }

  return streak;
}
