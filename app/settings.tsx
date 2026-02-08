import { useCallback, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { clearHabits, loadHabits } from '@/storage/habitStorage';
import { Habit } from '@/types/habit';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [habits, setHabits] = useState<Habit[]>([]);

  const refreshHabits = useCallback(async () => {
    const stored = await loadHabits();
    setHabits(stored);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshHabits();
    }, [refreshHabits]),
  );

  const handleReset = () => {
    Alert.alert('Reset all data?', 'This will remove all habits and completion history.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: async () => {
          await clearHabits();
          setHabits([]);
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#020617' : '#F8FAFC' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#F8FAFC' : '#0F172A' }]}>Settings</Text>
        <Text style={[styles.subtitle, { color: isDark ? '#94A3B8' : '#64748B' }]}>
          Personalize and keep your data tidy.
        </Text>
      </View>
      <View
        style={[
          styles.card,
          {
            backgroundColor: isDark ? '#0B1220' : '#FFFFFF',
            borderColor: isDark ? '#1E293B' : '#E2E8F0',
          },
        ]}
      >
        <Text style={[styles.label, { color: isDark ? '#94A3B8' : '#64748B' }]}>Total habits</Text>
        <Text style={[styles.value, { color: isDark ? '#F8FAFC' : '#0F172A' }]}>{habits.length}</Text>
      </View>
      <View
        style={[
          styles.card,
          {
            backgroundColor: isDark ? '#0B1220' : '#FFFFFF',
            borderColor: isDark ? '#1E293B' : '#E2E8F0',
          },
        ]}
      >
        <Text style={[styles.label, { color: isDark ? '#94A3B8' : '#64748B' }]}>Offline storage</Text>
        <Text style={[styles.value, { color: isDark ? '#F8FAFC' : '#0F172A' }]}>
          Stored only on this device.
        </Text>
      </View>
      <Pressable style={[styles.resetButton, { backgroundColor: isDark ? '#DC2626' : '#EF4444' }]} onPress={handleReset}>
        <Text style={styles.resetText}>Reset all data</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
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
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  value: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '600',
  },
  resetButton: {
    marginTop: 20,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  resetText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
