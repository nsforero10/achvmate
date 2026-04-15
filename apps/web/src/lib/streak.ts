const DAY_CODES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export interface HabitEntry {
  date: string;
  completed: boolean;
}

export function calculateCurrentStreak(frequency: string[], entries: HabitEntry[]) {
  if (!frequency || frequency.length === 0) return 0;
  
  // Create a fast-lookup set for completed date strings
  const completedDates = new Set(
    (entries || [])
      .filter((e) => e.completed)
      .map((e) => e.date.split('T')[0])
  );

  let streak = 0;
  const today = new Date();
  
  // Map today's local date string
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  let iterDate = new Date();

  // Evaluate backwards from 'today' for up to 3650 days (10 years lookup protection)
  for (let i = 0; i < 3650; i++) {
    const dayCode = DAY_CODES[iterDate.getDay()];
    
    // Only check if toady is actively mapped to the schedule
    if (frequency.includes(dayCode)) {
      const iterStr = `${iterDate.getFullYear()}-${String(iterDate.getMonth() + 1).padStart(2, '0')}-${String(iterDate.getDate()).padStart(2, '0')}`;
      
      if (completedDates.has(iterStr)) {
        streak++;
      } else {
        // If the streak breaks, we only forgive it if it breaks exactly 'Today', 
        // to intentionally avoid ending a user's streak before they have a chance to log their daily activity.
        if (iterStr !== todayStr) {
          break;
        }
      }
    }
    
    // Traverse backwards accurately without jumping timezones
    iterDate.setDate(iterDate.getDate() - 1);
  }

  return streak;
}
