import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Badge } from '../types';

interface BadgeModalProps {
  badge: Badge | null;
  visible: boolean;
  onClose: () => void;
}

export const BadgeModal: React.FC<BadgeModalProps> = ({
  badge,
  visible,
  onClose,
}) => {
  if (!badge) return null;

  const Icon = badge.icon;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.content}>
          <View
            style={[styles.iconContainer, { backgroundColor: badge.color }]}
          >
            <Icon size={60} color="#FFF" />
          </View>
          <Text style={styles.title}>우와! 대단해요! 🎉</Text>
          <Text style={styles.subtitle}>[{badge.name}] 뱃지 획득!</Text>
          <Text style={styles.message}>
            당신의 소중한 실천 덕분에{'\n'}지구가 더 건강해졌어요!
          </Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>최고예요!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  content: {
    backgroundColor: '#FFF',
    borderRadius: 48,
    padding: 36,
    width: '100%',
    alignItems: 'center',
  },
  iconContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    elevation: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#16A34A',
    marginTop: 6,
  },
  message: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 18,
    lineHeight: 24,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#22C55E',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 24,
    marginTop: 32,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
  },
});
