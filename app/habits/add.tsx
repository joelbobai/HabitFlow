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
      <Text style={[styles.label, { color: isDark ? '#F8FAFC' : '#0F172A' }]}>Habit name</Text>
      <TextInput
        style={[
          styles.input,
          { color: isDark ? '#F8FAFC' : '#0F172A', borderColor: isDark ? '#334155' : '#CBD5F5' },
        ]}
        value={name}
        onChangeText={setName}
        placeholder="Drink water"
        placeholderTextColor={isDark ? '#94A3B8' : '#94A3B8'}
      />
      <Pressable style={[styles.button, { backgroundColor: '#2563EB' }]} onPress={handleSave}>
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
    marginBottom: 20,
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
