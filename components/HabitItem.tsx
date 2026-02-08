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
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? '#0B1220' : '#FFFFFF',
          borderColor: isDark ? '#1E293B' : '#E2E8F0',
        },
      ]}
    >
      <View style={styles.row}>
        <HabitCheckbox checked={completedToday} onToggle={onToggle} />
        <View style={styles.info}>
          <Text
            style={[
              styles.name,
              {
                color: isDark ? '#F8FAFC' : '#0F172A',
                textDecorationLine: completedToday ? 'line-through' : 'none',
              },
            ]}
          >
            {name}
          </Text>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 10,
  },
  streaks: {
    flexDirection: 'row',
    gap: 8,
  },
});
