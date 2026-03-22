import AsyncStorage from "@react-native-async-storage/async-storage";

import { Habit } from "@/types/habit";

const HABITS_STORAGE_KEY = "habitflow.habits";
const DAILY_NOTES_STORAGE_KEY = "habitflow.daily-notes";

type DailyNotes = Record<string, string>;

export const loadHabits = async (): Promise<Habit[]> => {
  try {
    const raw = await AsyncStorage.getItem(HABITS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: Habit[] = JSON.parse(raw);
    return parsed;
  } catch (error) {
    console.warn("Failed to load habits", error);
    return [];
  }
};

export const saveHabits = async (habits: Habit[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits));
  } catch (error) {
    console.warn("Failed to save habits", error);
  }
};

const loadDailyNotes = async (): Promise<DailyNotes> => {
  try {
    const raw = await AsyncStorage.getItem(DAILY_NOTES_STORAGE_KEY);
    if (!raw) {
      return {};
    }

    return JSON.parse(raw) as DailyNotes;
  } catch (error) {
    console.warn("Failed to load daily notes", error);
    return {};
  }
};

export const loadDailyNote = async (date: string): Promise<string> => {
  const notes = await loadDailyNotes();
  return notes[date] ?? "";
};

export const saveDailyNote = async (
  date: string,
  note: string,
): Promise<void> => {
  try {
    const notes = await loadDailyNotes();
    const trimmedNote = note.trim();

    if (trimmedNote) {
      notes[date] = trimmedNote;
    } else {
      delete notes[date];
    }

    await AsyncStorage.setItem(DAILY_NOTES_STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.warn("Failed to save daily note", error);
  }
};

export const clearHabits = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(HABITS_STORAGE_KEY);
  } catch (error) {
    console.warn("Failed to clear habits", error);
  }
};

export const clearDailyNotes = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(DAILY_NOTES_STORAGE_KEY);
  } catch (error) {
    console.warn("Failed to clear daily notes", error);
  }
};
