import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';

interface HeaderProps {
  points: number;
}

export const Header: React.FC<HeaderProps> = ({ points }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.appName}>나는 지구 지킴이</Text>
        <Text style={styles.appSub}>ECO GUARDIAN</Text>
      </View>
      <View style={styles.pointIndicator}>
        <Star size={16} color="#F97316" fill="#F97316" />
        <Text style={styles.pointText}>{points}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 18,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  appName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#16A34A',
  },
  appSub: {
    fontSize: 10,
    fontWeight: '900',
    color: '#CBD5E1',
    letterSpacing: 1.5,
    marginTop: 2,
  },
  pointIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: '#FFEDD5',
  },
  pointText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '900',
    color: '#EA580C',
  },
});
