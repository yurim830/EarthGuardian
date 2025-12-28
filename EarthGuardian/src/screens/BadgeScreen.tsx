import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Badge } from '../types';
import { BadgeItem } from '../components/BadgeItem';
import { FONTS } from '../constants/fonts';

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
    fontSize: 28,
    fontFamily: FONTS.juache,
    color: '#1E293B',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
