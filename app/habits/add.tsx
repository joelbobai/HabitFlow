import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AddHabitScreen() {
  const router = useRouter();
  const cards = [
    {
      title: 'Must-have habits',
      subtitle: 'Small habits, big results',
      illustration: 'water',
      accent: '#38BDF8',
    },
    {
      title: 'Morning routine',
      subtitle: 'Open the doors to a productive day',
      illustration: 'morning',
      accent: '#A78BFA',
    },
    {
      title: 'Better sleep',
      subtitle: 'Quality sleep is key to a healthy lifestyle',
      illustration: 'sleep',
      accent: '#60A5FA',
    },
    {
      title: 'Getting stuff done',
      subtitle: 'Boost your productivity',
      illustration: 'alarm',
      accent: '#FBBF24',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.title}>Create Habit</Text>
      </View>

      <View style={styles.newHabitCard}>
        <View style={styles.pencilBadge}>
          <Text style={styles.pencilIcon}>✎</Text>
        </View>
        <Text style={styles.newHabitText}>New habit</Text>
      </View>

      <View style={styles.stack}>
        {cards.map((card) => (
          <View key={card.title} style={styles.habitCard}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
            </View>
            <View style={styles.illustrationWrap}>
              {card.illustration === 'water' && (
                <View style={styles.illustration}>
                  <View style={[styles.bottle, { backgroundColor: card.accent }]} />
                  <View style={styles.apple} />
                  <View style={styles.appleLeaf} />
                </View>
              )}
              {card.illustration === 'morning' && (
                <View style={styles.illustration}>
                  <View style={styles.coffeeCup} />
                  <View style={styles.coffeeHandle} />
                  <View style={styles.plantStem} />
                  <View style={styles.plantLeaf} />
                </View>
              )}
              {card.illustration === 'sleep' && (
                <View style={styles.illustration}>
                  <View style={styles.bedFrame} />
                  <View style={styles.bedPillow} />
                  <View style={styles.moon} />
                </View>
              )}
              {card.illustration === 'alarm' && (
                <View style={styles.illustration}>
                  <View style={styles.alarmClock} />
                  <View style={styles.alarmBellLeft} />
                  <View style={styles.alarmBellRight} />
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 32,
    backgroundColor: '#0B0B0F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111827',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  backIcon: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '600',
  },
  newHabitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    backgroundColor: 'rgba(30, 41, 59, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.15)',
    shadowColor: '#000000',
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  pencilBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.3)',
  },
  pencilIcon: {
    color: '#E2E8F0',
    fontSize: 16,
  },
  newHabitText: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '600',
  },
  stack: {
    gap: 16,
  },
  habitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 24,
    padding: 20,
    backgroundColor: 'rgba(17, 24, 39, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
    shadowColor: '#000000',
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  cardContent: {
    flex: 1,
    paddingRight: 12,
    gap: 8,
  },
  cardTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '600',
  },
  cardSubtitle: {
    color: '#CBD5F5',
    fontSize: 13,
    lineHeight: 18,
  },
  illustrationWrap: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: 64,
    height: 64,
  },
  bottle: {
    width: 18,
    height: 44,
    borderRadius: 8,
    position: 'absolute',
    left: 4,
    top: 4,
  },
  apple: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F97316',
    position: 'absolute',
    right: 4,
    bottom: 6,
  },
  appleLeaf: {
    width: 10,
    height: 6,
    borderRadius: 6,
    backgroundColor: '#22C55E',
    position: 'absolute',
    right: 14,
    bottom: 28,
  },
  coffeeCup: {
    width: 30,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#FBBF24',
    position: 'absolute',
    left: 6,
    bottom: 12,
  },
  coffeeHandle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 3,
    borderColor: '#F59E0B',
    position: 'absolute',
    left: 30,
    bottom: 16,
  },
  plantStem: {
    width: 8,
    height: 26,
    borderRadius: 4,
    backgroundColor: '#34D399',
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  plantLeaf: {
    width: 18,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#22C55E',
    position: 'absolute',
    right: 12,
    bottom: 30,
  },
  bedFrame: {
    width: 46,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#818CF8',
    position: 'absolute',
    left: 8,
    bottom: 12,
  },
  bedPillow: {
    width: 16,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#E0E7FF',
    position: 'absolute',
    left: 12,
    bottom: 24,
  },
  moon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FDE68A',
    position: 'absolute',
    right: 6,
    top: 6,
  },
  alarmClock: {
    width: 36,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FACC15',
    position: 'absolute',
    left: 12,
    bottom: 12,
  },
  alarmBellLeft: {
    width: 14,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#F59E0B',
    position: 'absolute',
    left: 6,
    top: 8,
  },
  alarmBellRight: {
    width: 14,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#F59E0B',
    position: 'absolute',
    right: 6,
    top: 8,
  },
});
