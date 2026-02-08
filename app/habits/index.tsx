import { Link } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { loadHabits, saveHabits } from '@/storage/habitStorage';
import { Habit } from '@/types/habit';

export default function HabitsListScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [habits, setHabits] = useState<Habit[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const refreshHabits = useCallback(async () => {
    const stored = await loadHabits();
    setHabits(stored);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshHabits();
    }, [refreshHabits]),
  );

  const beginEdit = (habit: Habit) => {
    setEditingId(habit.id);
    setEditingName(habit.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const saveEdit = async (habitId: string) => {
    if (!editingName.trim()) {
      Alert.alert('Name required', 'Please enter a habit name.');
      return;
    }
    const updatedHabits = habits.map((habit) =>
      habit.id === habitId ? { ...habit, name: editingName.trim() } : habit,
    );
    setHabits(updatedHabits);
    setEditingId(null);
    setEditingName('');
    await saveHabits(updatedHabits);
  };

  const deleteHabit = (habitId: string) => {
    Alert.alert('Delete habit?', 'This will remove the habit and its history.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updatedHabits = habits.filter((habit) => habit.id !== habitId);
          setHabits(updatedHabits);
          await saveHabits(updatedHabits);
        },
      },
    ]);
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
          <Text style={[styles.title, { color: isDark ? '#F8FAFC' : '#0F172A' }]}>All Habits</Text>
          <Text style={[styles.subtitle, { color: isDark ? '#94A3B8' : '#64748B' }]}>
            Manage your routines and keep them tidy.
          </Text>
        </View>
        <Link
          href="/habits/add"
          style={[
            styles.addLink,
            {
              backgroundColor: isDark ? '#38BDF8' : '#2563EB',
            },
          ]}
        >
          Add Habit
        </Link>
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
            No habits yet
          </Text>
          <Text style={[styles.emptyText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
            Create a habit to start tracking your progress.
          </Text>
        </View>
      ) : (
        habits.map((habit) => {
          const isEditing = editingId === habit.id;
          return (
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
              {isEditing ? (
                <>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        color: isDark ? '#F8FAFC' : '#0F172A',
                        borderColor: isDark ? '#1F2937' : '#CBD5F5',
                        backgroundColor: isDark ? '#0F172A' : '#F8FAFC',
                      },
                    ]}
                    value={editingName}
                    onChangeText={setEditingName}
                    placeholder="Habit name"
                    placeholderTextColor={isDark ? '#94A3B8' : '#94A3B8'}
                  />
                  <View style={styles.actionRow}>
                    <Pressable
                      style={[styles.actionButton, { backgroundColor: '#22C55E' }]}
                      onPress={() => saveEdit(habit.id)}
                    >
                      <Text style={styles.actionText}>Save</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.actionButton, { backgroundColor: '#64748B' }]}
                      onPress={cancelEdit}
                    >
                      <Text style={styles.actionText}>Cancel</Text>
                    </Pressable>
                  </View>
                </>
              ) : (
                <>
                  <Text style={[styles.habitName, { color: isDark ? '#F8FAFC' : '#0F172A' }]}>
                    {habit.name}
                  </Text>
                  <View style={styles.actionRow}>
                    <Pressable
                      style={[styles.actionButton, { backgroundColor: isDark ? '#1D4ED8' : '#2563EB' }]}
                      onPress={() => beginEdit(habit)}
                    >
                      <Text style={styles.actionText}>Edit</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.actionButton, { backgroundColor: '#EF4444' }]}
                      onPress={() => deleteHabit(habit.id)}
                    >
                      <Text style={styles.actionText}>Delete</Text>
                    </Pressable>
                  </View>
                </>
              )}
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
  },
  addLink: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    overflow: 'hidden',
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
  habitName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  actionText: {
    color: '#FFFFFF',
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
