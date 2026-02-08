import AsyncStorage from '@react-native-async-storage/async-storage';

import { Habit } from '@/types/habit';

const STORAGE_KEY = 'habitflow.habits';

export const loadHabits = async (): Promise<Habit[]> => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: Habit[] = JSON.parse(raw);
    return parsed;
  } catch (error) {
    console.warn('Failed to load habits', error);
    return [];
  }
};

export const saveHabits = async (habits: Habit[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  } catch (error) {
    console.warn('Failed to save habits', error);
  }
};

export const clearHabits = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear habits', error);
  }
};
