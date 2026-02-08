import { StyleSheet, Text, View } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';

type StreakBadgeProps = {
  label: string;
  value: number;
};

export default function StreakBadge({ label, value }: StreakBadgeProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: isDark ? '#1E293B' : '#E2E8F0', borderColor: isDark ? '#334155' : '#CBD5F5' },
      ]}
    >
      <Text style={[styles.label, { color: isDark ? '#CBD5F5' : '#475569' }]}>{label}</Text>
      <Text style={[styles.value, { color: isDark ? '#F8FAFC' : '#0F172A' }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 64,
  },
  label: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
  },
});
