import { useCallback, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { loadHabits } from '@/storage/habitStorage';
import { Habit } from '@/types/habit';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getMonthData = (date: Date) => {
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  return {
    year,
    monthIndex,
    firstWeekday: firstDay.getDay(),
    daysInMonth,
  };
};

const buildDateString = (year: number, monthIndex: number, day: number) => {
  const month = `${monthIndex + 1}`.padStart(2, '0');
  const date = `${day}`.padStart(2, '0');
  return `${year}-${month}-${date}`;
};

export default function CalendarScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [habits, setHabits] = useState<Habit[]>([]);

  const today = useMemo(() => new Date(), []);
  const { year, monthIndex, firstWeekday, daysInMonth } = useMemo(() => getMonthData(today), [today]);

  const refreshHabits = useCallback(async () => {
    const stored = await loadHabits();
    setHabits(stored);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshHabits();
    }, [refreshHabits]),
  );

  const monthLabel = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(today);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDark ? '#020617' : '#F8FAFC' },
      ]}
    >
      <Text style={[styles.title, { color: isDark ? '#F8FAFC' : '#0F172A' }]}>{monthLabel}</Text>
      {habits.length === 0 ? (
        <Text style={[styles.emptyText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
          No habits to display yet.
        </Text>
      ) : (
        habits.map((habit) => (
          <View key={habit.id} style={[styles.card, { backgroundColor: isDark ? '#0F172A' : '#FFFFFF' }]}>
            <Text style={[styles.habitName, { color: isDark ? '#F8FAFC' : '#0F172A' }]}>{habit.name}</Text>
            <View style={styles.weekRow}>
              {WEEKDAYS.map((day) => (
                <Text key={day} style={[styles.weekday, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                  {day}
                </Text>
              ))}
            </View>
            <View style={styles.grid}>
              {Array.from({ length: firstWeekday }).map((_, index) => (
                <View key={`blank-${index}`} style={styles.dayCell} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const dateString = buildDateString(year, monthIndex, day);
                const isCompleted = habit.completedDates.includes(dateString);
                return (
                  <View
                    key={`${habit.id}-${dateString}`}
                    style={[
                      styles.dayCell,
                      isCompleted && {
                        backgroundColor: isDark ? '#38BDF8' : '#2563EB',
                      },
                    ]}
                  >
                    <Text style={[styles.dayText, { color: isCompleted ? '#FFFFFF' : isDark ? '#E2E8F0' : '#0F172A' }]}>
                      {day}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    minHeight: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  habitName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekday: {
    fontSize: 12,
    width: 32,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayCell: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
