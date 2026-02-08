import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';

type HabitCheckboxProps = {
  checked: boolean;
  onToggle: () => void;
};

export default function HabitCheckbox({ checked, onToggle }: HabitCheckboxProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Pressable onPress={onToggle} style={styles.wrapper} accessibilityRole="button">
      <View
        style={[
          styles.box,
          {
            borderColor: checked ? (isDark ? '#38BDF8' : '#2563EB') : isDark ? '#E2E8F0' : '#94A3B8',
            backgroundColor: checked ? (isDark ? '#38BDF8' : '#2563EB') : isDark ? '#0B1220' : '#FFFFFF',
          },
        ]}
      >
        {checked ? <Text style={styles.checkmark}>✓</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 4,
  },
  box: {
    width: 30,
    height: 30,
    borderRadius: 10,
    borderWidth: 1.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
