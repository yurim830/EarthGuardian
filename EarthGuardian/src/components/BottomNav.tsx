import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Star, CheckCircle2, Trophy, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: 'home', icon: Star, label: '홈' },
  { id: 'mission', icon: CheckCircle2, label: '미션' },
  { id: 'badge', icon: Trophy, label: '보물' },
  { id: 'profile', icon: User, label: '내정보' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 10 }]}>
      {TABS.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={() => onTabChange(item.id)}
          >
            <Icon 
              size={24} 
              color={isActive ? '#16A34A' : '#CBD5E1'} 
            />
            <Text style={[styles.navText, isActive && styles.navTextActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderTopWidth: 1.5,
    borderTopColor: '#F1F5F9',
    width: '100%',
    justifyContent: 'space-around',
    paddingTop: 16,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 11,
    fontWeight: '900',
    marginTop: 6,
    color: '#CBD5E1',
  },
  navTextActive: {
    color: '#16A34A',
  },
});