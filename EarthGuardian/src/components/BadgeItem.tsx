import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Badge } from '../types';

interface BadgeItemProps {
  badge: Badge;
  isUnlocked: boolean;
}

export const BadgeItem: React.FC<BadgeItemProps> = ({ badge, isUnlocked }) => {
  const Icon = badge.icon;

  return (
    <View style={[styles.container, !isUnlocked && styles.locked]}>
      <View
        style={[
          styles.circle,
          { backgroundColor: isUnlocked ? badge.color : '#E2E8F0' },
        ]}
      >
        {isUnlocked ? (
          <Icon size={32} color="#FFF" />
        ) : (
          <Text style={styles.lockEmoji}>🔒</Text>
        )}
      </View>
      <Text style={[styles.name, !isUnlocked && styles.nameLocked]}>
        {badge.name}
      </Text>
      {!isUnlocked && (
        <Text style={styles.requirement}>{badge.threshold}⭐ 달성 시</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '47%',
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: 36,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
  },
  locked: {
    opacity: 0.5,
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    elevation: 5,
  },
  lockEmoji: {
    fontSize: 24,
  },
  name: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1E293B',
  },
  nameLocked: {
    color: '#94A3B8',
  },
  requirement: {
    fontSize: 11,
    fontWeight: '900',
    color: '#94A3B8',
    marginTop: 8,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
});
