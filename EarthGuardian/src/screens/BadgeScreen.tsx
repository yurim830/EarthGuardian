import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Badge } from '../types';
import { BadgeItem } from '../components/BadgeItem';

interface BadgeScreenProps {
  badges: Badge[];
  points: number;
}

export const BadgeScreen: React.FC<BadgeScreenProps> = ({ badges, points }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>보물함</Text>
      <View style={styles.grid}>
        {badges.map(badge => (
          <BadgeItem
            key={badge.id}
            badge={badge}
            isUnlocked={points >= badge.threshold}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#1E293B',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
