import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Info, Flame } from 'lucide-react-native';
import { Mission, Badge } from '../types';
import { MissionCard } from '../components/MissionCard';

interface HomeScreenProps {
  points: number;
  streak: number;
  level: number;
  nextBadge: Badge;
  missions: Mission[];
  completedMissions: number[];
  onComplete: (mission: Mission) => void;
  tip: string;
  onMoreMissions: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = React.memo(({
  points,
  streak,
  level,
  nextBadge,
  missions,
  completedMissions,
  onComplete,
  tip,
  onMoreMissions,
}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👦</Text>
          </View>
          <View>
            <Text style={styles.userName}>지구대장 민준</Text>
            <View style={styles.badgeRow}>
              <View style={styles.levelTag}>
                <Text style={styles.levelText}>LV.{level}</Text>
              </View>
              <View style={styles.streakBadge}>
                <Flame size={14} color="#F97316" fill="#F97316" />
                <Text style={styles.streakText}>{streak}일 연속</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.expSection}>
          <View style={styles.expLabels}>
            <Text style={styles.expLabel}>다음 뱃지: {nextBadge.name}</Text>
            <Text style={styles.expValue}>{points} / {nextBadge.threshold}⭐</Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${Math.min((points / nextBadge.threshold) * 100, 100)}%` } as ViewStyle
              ]} 
            />
          </View>
        </View>
      </View>

      {/* Today's Missions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>오늘의 지구 구하기 🔥</Text>
          <TouchableOpacity onPress={onMoreMissions}>
            <Text style={styles.moreButton}>모두 보기</Text>
          </TouchableOpacity>
        </View>
        {missions.slice(0, 3).map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            isCompleted={completedMissions.includes(mission.id)}
            onComplete={onComplete}
            variant="summary"
          />
        ))}
      </View>

      {/* Daily Tip */}
      <View style={styles.tipCard}>
        <Info color="#3B82F6" size={24} />
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>지구 구조대 꿀팁!</Text>
          <Text style={styles.tipBody}>{tip}</Text>
        </View>
      </View>
      
      <View style={{ height: 120 }} />
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  profileCard: {
    backgroundColor: '#FFF',
    borderRadius: 36,
    padding: 24,
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 4,
    marginBottom: 30,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    backgroundColor: '#22C55E',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 4,
    borderColor: '#F0FDF4',
  },
  avatarEmoji: {
    fontSize: 36,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  levelTag: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#16A34A',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  streakText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F97316',
  },
  expSection: {
    marginTop: 24,
  },
  expLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  expLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: '#94A3B8',
  },
  expValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  progressBar: {
    height: 12,
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22C55E',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1E293B',
  },
  moreButton: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#16A34A',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  tipCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 28,
    padding: 24,
    flexDirection: 'row',
    gap: 16,
    borderWidth: 1.5,
    borderColor: '#DBEAFE',
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1E40AF',
    marginBottom: 4,
  },
  tipBody: {
    fontSize: 13,
    color: '#3B82F6',
    lineHeight: 20,
    fontWeight: '600',
  },
});