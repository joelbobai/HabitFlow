import { Habit } from '@/types/habit';

export const getTodayString = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, '0');
  const day = `${now.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const toggleDateCompletion = (habit: Habit, date: string): Habit => {
  const isCompleted = habit.completedDates.includes(date);
  const updatedDates = isCompleted
    ? habit.completedDates.filter((entry) => entry !== date)
    : [...habit.completedDates, date];

  return {
    ...habit,
    completedDates: updatedDates,
  };
};

const parseDateString = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

const addDaysToDateString = (dateString: string, days: number) => {
  const date = parseDateString(dateString);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
};

export const calculateStreaks = (completedDates: string[], today: string) => {
  const normalized = Array.from(new Set(completedDates)).sort();
  if (normalized.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const dateSet = new Set(normalized);
  let longestStreak = 1;
  let currentStreak = 0;

  let streak = 1;
  for (let i = 1; i < normalized.length; i += 1) {
    const previous = normalized[i - 1];
    const current = normalized[i];
    if (addDaysToDateString(previous, 1) === current) {
      streak += 1;
    } else {
      longestStreak = Math.max(longestStreak, streak);
      streak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, streak);

  if (dateSet.has(today)) {
    let cursor = today;
    while (dateSet.has(cursor)) {
      currentStreak += 1;
      cursor = addDaysToDateString(cursor, -1);
    }
  }

  return { currentStreak, longestStreak };
};

export const formatFriendlyDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
