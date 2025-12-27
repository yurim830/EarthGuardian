import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProfileScreenProps {
  level: number;
  completedMissions: number;
  points: number;
  totalMissionCompletions: number;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  level,
  completedMissions,
  points,
  totalMissionCompletions,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>요원 정보</Text>
      <View style={styles.content}>
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>👦</Text>
        </View>
        <Text style={styles.name}>지구대장 민준</Text>
        <Text style={styles.level}>레벨 {level} 환경 수호자</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{completedMissions}</Text>
            <Text style={styles.statLabel}>오늘 완료</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{totalMissionCompletions}</Text>
            <Text style={styles.statLabel}>총 완료</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{(points / 20).toFixed(1)}</Text>
            <Text style={styles.statLabel}>구한 나무</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{points}</Text>
            <Text style={styles.statLabel}>총 경험치</Text>
          </View>
        </View>
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
  content: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderColor: '#FFF',
    elevation: 5,
  },
  avatarEmoji: {
    fontSize: 60,
  },
  name: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1E293B',
    marginTop: 20,
  },
  level: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#16A34A',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
    gap: 12,
    width: '100%',
  },
  statBox: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 28,
    alignItems: 'center',
    shadowOpacity: 0.05,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '900',
    color: '#94A3B8',
    marginTop: 4,
  },
});
