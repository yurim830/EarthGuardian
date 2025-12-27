import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { Mission } from '../types';
import { MissionCard } from '../components/MissionCard';

interface MissionScreenProps {
  missions: Mission[];
  completedMissions: number[];
  onComplete: (mission: Mission) => void;
}

export const MissionScreen: React.FC<MissionScreenProps> = React.memo(({
  missions,
  completedMissions,
  onComplete,
}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>수호 작전</Text>
      {missions.map((mission) => (
        <MissionCard
          key={mission.id}
          mission={mission}
          isCompleted={completedMissions.includes(mission.id)}
          onComplete={onComplete}
          variant="full"
        />
      ))}
      <View style={{ height: 120 }} />
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#1E293B',
    marginBottom: 24,
  },
});
