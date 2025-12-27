import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Droplet, Zap, Trees, Recycle } from 'lucide-react-native';
import { Mission } from '../types';

interface MissionCardProps {
  mission: Mission;
  isCompleted: boolean;
  onComplete: (mission: Mission) => void;
  variant?: 'full' | 'summary';
}

export const MissionCard: React.FC<MissionCardProps> = React.memo(({ 
  mission, 
  isCompleted, 
  onComplete,
  variant = 'full'
}) => {
  const getCategoryIcon = () => {
    const iconProps = { color: mission.iconColor, size: variant === 'full' ? 32 : 18 };
    
    switch (mission.category) {
      case 'water': return <Droplet {...iconProps} />;
      case 'energy': return <Zap {...iconProps} />;
      case 'forest': return <Trees {...iconProps} />;
      case 'recycle': return <Recycle {...iconProps} />;
    }
  };

  if (variant === 'summary') {
    return (
      <View style={[styles.summaryCard, isCompleted && styles.summaryCardCompleted]}>
        <View style={[styles.summaryIcon, { backgroundColor: mission.color }]}>
          {getCategoryIcon()}
        </View>
        <View style={styles.summaryContent}>
          <Text style={[styles.summaryTitle, isCompleted && styles.textCompleted]}>
            {mission.title}
          </Text>
          <Text style={styles.summaryPoints}>+{mission.points} EXP</Text>
        </View>
        {!isCompleted && (
          <TouchableOpacity 
            style={styles.summaryButton} 
            onPress={() => onComplete(mission)}
          >
            <Text style={styles.summaryButtonText}>했어!</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={styles.fullCard}>
      <View style={styles.fullHeader}>
        <View style={[styles.fullIcon, { backgroundColor: mission.color }]}>
          {getCategoryIcon()}
        </View>
        <View style={styles.fullHeaderText}>
          <Text style={styles.category}>{mission.category.toUpperCase()}</Text>
          <Text style={styles.title}>{mission.title}</Text>
        </View>
        <Text style={styles.points}>+{mission.points}⭐</Text>
      </View>
      
      <View style={styles.guideContainer}>
        <Text style={styles.guideText}>💡 {mission.guide}</Text>
      </View>
      
      <TouchableOpacity 
        disabled={isCompleted}
        style={[styles.actionButton, isCompleted && styles.actionButtonDisabled]}
        onPress={() => onComplete(mission)}
      >
        <Text style={styles.actionButtonText}>
          {isCompleted ? '오늘 실천 완료!' : '오늘 이거 했어요!'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for better performance
  return (
    prevProps.mission.id === nextProps.mission.id &&
    prevProps.isCompleted === nextProps.isCompleted &&
    prevProps.variant === nextProps.variant
  );
});

const styles = StyleSheet.create({
  // Summary variant styles
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 28,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
  },
  summaryCardCompleted: {
    backgroundColor: '#F8FAFC',
    opacity: 0.6,
  },
  summaryIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryContent: {
    flex: 1,
    marginLeft: 12,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#334155',
  },
  summaryPoints: {
    fontSize: 11,
    fontWeight: '900',
    color: '#F97316',
    marginTop: 2,
  },
  summaryButton: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  summaryButtonText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '900',
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  
  // Full variant styles
  fullCard: {
    backgroundColor: '#FFF',
    borderRadius: 36,
    padding: 24,
    marginBottom: 24,
    elevation: 2,
  },
  fullHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullIcon: {
    width: 64,
    height: 64,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullHeaderText: {
    flex: 1,
    marginLeft: 16,
  },
  category: {
    fontSize: 11,
    fontWeight: '900',
    color: '#94A3B8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  points: {
    fontSize: 16,
    fontWeight: '900',
    color: '#F97316',
  },
  guideContainer: {
    backgroundColor: '#F8FAFC',
    padding: 18,
    borderRadius: 22,
    marginTop: 18,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  guideText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: 'bold',
    lineHeight: 22,
  },
  actionButton: {
    backgroundColor: '#22C55E',
    paddingVertical: 18,
    borderRadius: 24,
    marginTop: 18,
    alignItems: 'center',
  },
  actionButtonDisabled: {
    backgroundColor: '#F1F5F9',
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
  },
});