import { Link } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import HabitItem from '@/components/HabitItem';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { loadHabits, saveHabits } from '@/storage/habitStorage';
import { Habit } from '@/types/habit';
import { calculateStreaks, formatFriendlyDate, getTodayString, toggleDateCompletion } from '@/utils/habitUtils';

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const today = useMemo(() => getTodayString(), []);

  const refreshHabits = useCallback(async () => {
    const stored = await loadHabits();
    setHabits(stored);
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshHabits();
    }, [refreshHabits]),
  );

  const handleToggle = async (habit: Habit) => {
    const updatedHabit = toggleDateCompletion(habit, today);
    const updatedHabits = habits.map((item) => (item.id === habit.id ? updatedHabit : item));
    setHabits(updatedHabits);
    await saveHabits(updatedHabits);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDark ? '#020617' : '#F8FAFC' },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#F8FAFC' : '#0F172A' }]}>Today</Text>
        <Text style={[styles.subtitle, { color: isDark ? '#CBD5F5' : '#475569' }]}>
          {formatFriendlyDate(new Date())}
        </Text>
      </View>

      <View style={styles.navRow}>
        <Link href="/habits" style={[styles.navLink, { color: isDark ? '#7DD3FC' : '#2563EB' }]}>
          All Habits
        </Link>
        <Link href="/calendar" style={[styles.navLink, { color: isDark ? '#7DD3FC' : '#2563EB' }]}>
          Calendar
        </Link>
        <Link href="/settings" style={[styles.navLink, { color: isDark ? '#7DD3FC' : '#2563EB' }]}>
          Settings
        </Link>
      </View>

      {isLoading ? (
        <Text style={[styles.emptyText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
          Loading habits...
        </Text>
      ) : habits.length === 0 ? (
        <Text style={[styles.emptyText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
          No habits yet. Add one to get started.
        </Text>
      ) : (
        habits.map((habit) => {
          const { currentStreak, longestStreak } = calculateStreaks(habit.completedDates, today);
          return (
            <HabitItem
              key={habit.id}
              name={habit.name}
              completedToday={habit.completedDates.includes(today)}
              currentStreak={currentStreak}
              longestStreak={longestStreak}
              onToggle={() => handleToggle(habit)}
            />
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    minHeight: '100%',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 16,
  },
  navRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  navLink: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    marginTop: 40,
  },
});
