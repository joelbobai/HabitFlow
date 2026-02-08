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
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#F8FAFC' : '#0F172A' }]}>{monthLabel}</Text>
        <Text style={[styles.subtitle, { color: isDark ? '#94A3B8' : '#64748B' }]}>
          Tap into the big picture of your consistency.
        </Text>
      </View>
      {habits.length === 0 ? (
        <View
          style={[
            styles.emptyCard,
            {
              backgroundColor: isDark ? '#0B1220' : '#FFFFFF',
              borderColor: isDark ? '#1E293B' : '#E2E8F0',
            },
          ]}
        >
          <Text style={[styles.emptyTitle, { color: isDark ? '#F8FAFC' : '#0F172A' }]}>
            No habits to display
          </Text>
          <Text style={[styles.emptyText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
            Add a habit to see your streaks on the calendar.
          </Text>
        </View>
      ) : (
        habits.map((habit) => (
          <View
            key={habit.id}
            style={[
              styles.card,
              {
                backgroundColor: isDark ? '#0B1220' : '#FFFFFF',
                borderColor: isDark ? '#1E293B' : '#E2E8F0',
              },
            ]}
          >
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
                      {
                        borderColor: isDark ? '#1F2937' : '#E2E8F0',
                        backgroundColor: isDark ? '#0F172A' : '#F8FAFC',
                      },
                      isCompleted && {
                        backgroundColor: isDark ? '#38BDF8' : '#2563EB',
                        borderColor: isDark ? '#38BDF8' : '#2563EB',
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
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
  },
  card: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
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
    borderWidth: 1,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyCard: {
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
  },
});
