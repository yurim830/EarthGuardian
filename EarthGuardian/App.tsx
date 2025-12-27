import React, { useState, useRef, useEffect } from 'react';
import { View, StatusBar, StyleSheet, Animated, ActivityIndicator, Text } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useStore } from './src/store/useStore';
import { MISSIONS } from './src/constants/missions';
import { BADGES } from './src/constants/badges';
import { DAILY_TIPS } from './src/constants/tips';
import { Mission, Badge } from './src/types';

import { Header } from './src/components/Header';
import { BottomNav } from './src/components/BottomNav';
import { BadgeModal } from './src/components/BadgeModal';
import { HomeScreen } from './src/screens/HomeScreen';
import { MissionScreen } from './src/screens/MissionScreen';
import { BadgeScreen } from './src/screens/BadgeScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';

const MainContent: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { 
    points, 
    streak, 
    todayCompletedMissions, 
    missionStats,
    isHydrated,
    addPoints, 
    completeMission,
    checkAndResetDaily,
    hydrate,
  } = useStore();
  
  const [activeTab, setActiveTab] = useState('home');
  const [badgeModal, setBadgeModal] = useState<Badge | null>(null);
  const [tip, setTip] = useState(DAILY_TIPS[0]);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const isAnimating = useRef(false);
  const level = Math.floor(points / 200) + 1;
  const nextBadge = BADGES.find(b => points < b.threshold) || BADGES[BADGES.length - 1];

  // Load data on mount
  useEffect(() => {
    hydrate();
  }, []);

  // Check for daily reset whenever app becomes active
  useEffect(() => {
    if (isHydrated) {
      checkAndResetDaily();
    }
  }, [isHydrated]);

  const handleMissionComplete = (mission: Mission) => {
    if (todayCompletedMissions.includes(mission.id)) return;
    
    addPoints(mission.points);
    completeMission(mission.id);
    
    const newBadge = BADGES.find(
      b => points + mission.points >= b.threshold && points < b.threshold
    );
    if (newBadge) setBadgeModal(newBadge);
  };

  const handleTabChange = (tabName: string) => {
    if (isAnimating.current || activeTab === tabName) return;
    
    isAnimating.current = true;
    
    // Fade out current screen
    Animated.timing(fadeAnim, { 
      toValue: 0, 
      duration: 120, 
      useNativeDriver: true 
    }).start(() => {
      // Small delay to ensure fade-out is visually complete
      setTimeout(() => {
        // Change content while screen is invisible
        setActiveTab(tabName);
        setTip(DAILY_TIPS[Math.floor(Math.random() * DAILY_TIPS.length)]);
        
        // Use requestAnimationFrame to ensure render is complete
        requestAnimationFrame(() => {
          // Fade in new screen
          Animated.timing(fadeAnim, { 
            toValue: 1, 
            duration: 120, 
            useNativeDriver: true 
          }).start(() => {
            isAnimating.current = false;
          });
        });
      }, 16); // ~1 frame at 60fps
    });
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            points={points}
            streak={streak}
            level={level}
            nextBadge={nextBadge}
            missions={MISSIONS}
            completedMissions={todayCompletedMissions}
            missionStats={missionStats}
            onComplete={handleMissionComplete}
            tip={tip}
            onMoreMissions={() => handleTabChange('mission')}
          />
        );
      case 'mission':
        return (
          <MissionScreen
            missions={MISSIONS}
            completedMissions={todayCompletedMissions}
            missionStats={missionStats}
            onComplete={handleMissionComplete}
          />
        );
      case 'badge':
        return (
          <BadgeScreen badges={BADGES} points={points} />
        );
      case 'profile':
        return (
          <ProfileScreen
            level={level}
            completedMissions={todayCompletedMissions.length}
            points={points}
            totalMissionCompletions={Object.values(missionStats).reduce((sum, count) => sum + count, 0)}
          />
        );
      default:
        return null;
    }
  };

  // Loading state while hydrating
  if (!isHydrated) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#22C55E" />
        <Text style={styles.loadingText}>지구 지킴이 준비중...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      <Header points={points} />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {renderScreen()}
      </Animated.View>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      
      <BadgeModal
        badge={badgeModal}
        visible={!!badgeModal}
        onClose={() => setBadgeModal(null)}
      />
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <MainContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '700',
    color: '#64748B',
  },
});