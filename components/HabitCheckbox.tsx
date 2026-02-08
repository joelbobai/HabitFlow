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
            borderColor: isDark ? '#E2E8F0' : '#0F172A',
            backgroundColor: checked ? (isDark ? '#38BDF8' : '#2563EB') : 'transparent',
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
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
