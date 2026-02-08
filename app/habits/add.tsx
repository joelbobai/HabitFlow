import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { loadHabits, saveHabits } from '@/storage/habitStorage';
import { Habit } from '@/types/habit';

export default function AddHabitScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [name, setName] = useState('');

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Name required', 'Please enter a habit name.');
      return;
    }

    const newHabit: Habit = {
      id: `${Date.now()}`,
      name: name.trim(),
      createdAt: new Date().toISOString(),
      completedDates: [],
    };

    const existing = await loadHabits();
    const updated = [...existing, newHabit];
    await saveHabits(updated);
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#020617' : '#F8FAFC' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#F8FAFC' : '#0F172A' }]}>Create a habit</Text>
        <Text style={[styles.subtitle, { color: isDark ? '#94A3B8' : '#64748B' }]}>
          Keep it short and actionable so it is easy to repeat.
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
        <Text style={[styles.label, { color: isDark ? '#E2E8F0' : '#334155' }]}>Habit name</Text>
        <TextInput
          style={[
            styles.input,
            {
              color: isDark ? '#F8FAFC' : '#0F172A',
              borderColor: isDark ? '#1F2937' : '#CBD5F5',
              backgroundColor: isDark ? '#0F172A' : '#F8FAFC',
            },
          ]}
          value={name}
          onChangeText={setName}
          placeholder="Drink water"
          placeholderTextColor={isDark ? '#94A3B8' : '#94A3B8'}
        />
      </View>
      <Pressable style={[styles.button, { backgroundColor: isDark ? '#38BDF8' : '#2563EB' }]} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Habit</Text>
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
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
  },
  card: {
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
