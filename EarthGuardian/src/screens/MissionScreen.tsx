import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Droplet,
  Zap,
  Trees,
  Recycle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';
import { Mission, MissionStats } from '../types';
import { MissionCard } from '../components/MissionCard';

interface MissionScreenProps {
  missions: Mission[];
  completedMissions: number[];
  missionStats: MissionStats;
  onComplete: (mission: Mission) => void;
}

const CATEGORY_INFO = {
  water: {
    name: '💧 물 절약',
    icon: Droplet,
    color: '#3B82F6',
    bgColor: '#E0F2FE',
  },
  energy: {
    name: '⚡ 에너지 절약',
    icon: Zap,
    color: '#EAB308',
    bgColor: '#FEF9C3',
  },
  forest: {
    name: '🌳 숲 보호',
    icon: Trees,
    color: '#22C55E',
    bgColor: '#DCFCE7',
  },
  recycle: {
    name: '♻️ 재활용',
    icon: Recycle,
    color: '#10B981',
    bgColor: '#ECFDF5',
  },
};

export const MissionScreen: React.FC<MissionScreenProps> = React.memo(
  ({ missions, completedMissions, missionStats, onComplete }) => {
    // Track expanded/collapsed state for each category
    const [expandedCategories, setExpandedCategories] = useState<{
      [key: string]: boolean;
    }>({
      water: true,
      energy: true,
      forest: true,
      recycle: true,
    });

    // Group missions by category and sort (uncompleted first)
    const groupedMissions = useMemo(() => {
      const groups: { [key: string]: Mission[] } = {
        water: [],
        energy: [],
        forest: [],
        recycle: [],
      };

      missions.forEach(mission => {
        groups[mission.category].push(mission);
      });

      // Sort each group: uncompleted first, then completed
      Object.keys(groups).forEach(category => {
        groups[category].sort((a, b) => {
          const aCompleted = completedMissions.includes(a.id);
          const bCompleted = completedMissions.includes(b.id);

          if (aCompleted === bCompleted) return 0;
          return aCompleted ? 1 : -1; // Uncompleted (false) comes first
        });
      });

      return groups;
    }, [missions, completedMissions]);

    const toggleCategory = (category: string) => {
      setExpandedCategories(prev => ({
        ...prev,
        [category]: !prev[category],
      }));
    };

    const renderCategorySection = (category: keyof typeof CATEGORY_INFO) => {
      const categoryMissions = groupedMissions[category];
      if (categoryMissions.length === 0) return null;

      const info = CATEGORY_INFO[category];
      const Icon = info.icon;
      const completed = categoryMissions.filter(m =>
        completedMissions.includes(m.id),
      ).length;
      const total = categoryMissions.length;
      const isExpanded = expandedCategories[category];
      const ChevronIcon = isExpanded ? ChevronUp : ChevronDown;

      return (
        <View key={category} style={styles.categorySection}>
          <TouchableOpacity
            style={[styles.categoryHeader, { backgroundColor: info.bgColor }]}
            onPress={() => toggleCategory(category)}
            activeOpacity={0.7}
          >
            <View style={styles.categoryTitleRow}>
              <Icon size={24} color={info.color} />
              <Text style={styles.categoryTitle}>{info.name}</Text>
            </View>
            <View style={styles.categoryHeaderRight}>
              <View style={styles.categoryProgress}>
                <Text
                  style={[styles.categoryProgressText, { color: info.color }]}
                >
                  {completed}/{total}
                </Text>
              </View>
              <ChevronIcon
                size={20}
                color={info.color}
                style={{ marginLeft: 8 }}
              />
            </View>
          </TouchableOpacity>

          {isExpanded &&
            categoryMissions.map(mission => (
              <MissionCard
                key={mission.id}
                mission={mission}
                isCompleted={completedMissions.includes(mission.id)}
                onComplete={onComplete}
                variant="full"
                completionCount={missionStats[mission.id] || 0}
              />
            ))}
        </View>
      );
    };

    const totalCompleted = completedMissions.length;
    const totalMissions = missions.length;

    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>수호 작전</Text>

        {/* Overall Progress */}
        <View style={styles.overallProgress}>
          <Text style={styles.overallProgressTitle}>전체 진행률</Text>
          <View style={styles.overallProgressBar}>
            <View
              style={[
                styles.overallProgressFill,
                { width: `${(totalCompleted / totalMissions) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.overallProgressText}>
            {totalCompleted} / {totalMissions} 미션 (
            {Math.round((totalCompleted / totalMissions) * 100)}%)
          </Text>
        </View>

        {/* Category Sections */}
        {renderCategorySection('water')}
        {renderCategorySection('energy')}
        {renderCategorySection('forest')}
        {renderCategorySection('recycle')}

        <View style={{ height: 120 }} />
      </ScrollView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#1E293B',
    marginBottom: 20,
  },
  overallProgress: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
  },
  overallProgressTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#64748B',
    marginBottom: 12,
  },
  overallProgressBar: {
    height: 10,
    backgroundColor: '#F1F5F9',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  overallProgressFill: {
    height: '100%',
    backgroundColor: '#22C55E',
  },
  overallProgressText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1E293B',
  },
  categoryHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryProgress: {
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryProgressText: {
    fontSize: 13,
    fontWeight: '900',
  },
});
