import { StyleSheet, Text, View } from 'react-native';

import HabitCheckbox from '@/components/HabitCheckbox';
import StreakBadge from '@/components/StreakBadge';
import { useColorScheme } from '@/hooks/use-color-scheme';

type HabitItemProps = {
  name: string;
  completedToday: boolean;
  currentStreak: number;
  longestStreak: number;
  onToggle: () => void;
};

export default function HabitItem({
  name,
  completedToday,
  currentStreak,
  longestStreak,
  onToggle,
}: HabitItemProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.card, { backgroundColor: isDark ? '#0F172A' : '#FFFFFF' }]}>
      <View style={styles.row}>
        <HabitCheckbox checked={completedToday} onToggle={onToggle} />
        <View style={styles.info}>
          <Text style={[styles.name, { color: isDark ? '#F8FAFC' : '#0F172A' }]}>{name}</Text>
          <View style={styles.streaks}>
            <StreakBadge label="Current" value={currentStreak} />
            <StreakBadge label="Best" value={longestStreak} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  streaks: {
    flexDirection: 'row',
    gap: 8,
  },
});
