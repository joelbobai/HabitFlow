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
  const totalHabits = habits.length;
  const completedCount = habits.filter((habit) => habit.completedDates.includes(today)).length;
  const progress = totalHabits ? completedCount / totalHabits : 0;

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
        <View>
          <Text style={[styles.title, { color: isDark ? '#F8FAFC' : '#0F172A' }]}>Today</Text>
          <Text style={[styles.subtitle, { color: isDark ? '#94A3B8' : '#64748B' }]}>
            {formatFriendlyDate(new Date())}
          </Text>
        </View>
        <View
          style={[
            styles.pill,
            {
              backgroundColor: isDark ? '#111827' : '#E2E8F0',
              borderColor: isDark ? '#1F2937' : '#CBD5F5',
            },
          ]}
        >
          <Text style={[styles.pillText, { color: isDark ? '#E2E8F0' : '#334155' }]}>
            {completedCount}/{totalHabits} done
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.summaryCard,
          {
            backgroundColor: isDark ? '#0B1220' : '#FFFFFF',
            borderColor: isDark ? '#1E293B' : '#E2E8F0',
          },
        ]}
      >
        <Text style={[styles.summaryTitle, { color: isDark ? '#F8FAFC' : '#0F172A' }]}>
          Today's focus
        </Text>
        <Text style={[styles.summarySubtitle, { color: isDark ? '#94A3B8' : '#64748B' }]}>
          Keep your streaks alive by completing the essentials.
        </Text>
        <View style={[styles.progressTrack, { backgroundColor: isDark ? '#111827' : '#E2E8F0' }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.round(progress * 100)}%`,
                backgroundColor: isDark ? '#38BDF8' : '#2563EB',
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.navRow}>
        <Link
          href="/habits"
          style={[
            styles.navLink,
            {
              backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
              borderColor: isDark ? '#1E293B' : '#E2E8F0',
              color: isDark ? '#E2E8F0' : '#0F172A',
            },
          ]}
        >
          All Habits
        </Link>
        <Link
          href="/calendar"
          style={[
            styles.navLink,
            {
              backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
              borderColor: isDark ? '#1E293B' : '#E2E8F0',
              color: isDark ? '#E2E8F0' : '#0F172A',
            },
          ]}
        >
          Calendar
        </Link>
        <Link
          href="/settings"
          style={[
            styles.navLink,
            {
              backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
              borderColor: isDark ? '#1E293B' : '#E2E8F0',
              color: isDark ? '#E2E8F0' : '#0F172A',
            },
          ]}
        >
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
        <>
          <Text style={[styles.sectionLabel, { color: isDark ? '#CBD5F5' : '#64748B' }]}>
            Today's habits
          </Text>
          {habits.map((habit) => {
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
          })}
        </>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  summaryCard: {
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  summarySubtitle: {
    marginTop: 6,
    fontSize: 14,
  },
  progressTrack: {
    marginTop: 12,
    height: 8,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  navRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  navLink: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    overflow: 'hidden',
  },
  sectionLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 40,
  },
});
