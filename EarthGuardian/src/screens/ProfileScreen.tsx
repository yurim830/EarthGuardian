import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Edit2, X } from 'lucide-react-native';
import { UserProfile } from '../types';
import { FONTS } from '../constants/fonts';

interface ProfileScreenProps {
  level: number;
  completedMissions: number;
  points: number;
  totalMissionCompletions: number;
  userProfile: UserProfile;
  onProfileUpdate: (profile: UserProfile) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  level,
  completedMissions,
  points,
  totalMissionCompletions,
  userProfile,
  onProfileUpdate,
}) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedName, setEditedName] = useState(userProfile.name);
  const [editedGender, setEditedGender] = useState<'boy' | 'girl'>(
    userProfile.gender,
  );

  const handleSave = () => {
    if (editedName.trim()) {
      onProfileUpdate({
        name: editedName.trim(),
        gender: editedGender,
      });
      setEditModalVisible(false);
    }
  };

  const handleCancel = () => {
    setEditedName(userProfile.name);
    setEditedGender(userProfile.gender);
    setEditModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>요원 정보</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setEditModalVisible(true)}
        >
          <Edit2 size={20} color="#16A34A" />
          <Text style={styles.editButtonText}>편집</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>
            {userProfile.gender === 'boy' ? '👦' : '👧'}
          </Text>
        </View>
        <Text style={styles.name}>{userProfile.name}</Text>
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

      {/* Edit Profile Modal */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalBackdrop}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>프로필 수정</Text>
                    <TouchableOpacity onPress={handleCancel}>
                      <X size={24} color="#64748B" />
                    </TouchableOpacity>
                  </View>

                  {/* Name Input */}
                  <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>이름</Text>
                    <TextInput
                      style={styles.textInput}
                      value={editedName}
                      onChangeText={setEditedName}
                      placeholder="이름을 입력하세요"
                      maxLength={20}
                    />
                  </View>

                  {/* Gender Selection */}
                  <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>성별</Text>
                    <View style={styles.genderSelection}>
                      <TouchableOpacity
                        style={[
                          styles.genderOption,
                          editedGender === 'boy' && styles.genderOptionActive,
                        ]}
                        onPress={() => setEditedGender('boy')}
                      >
                        <Text style={styles.genderEmoji}>👦</Text>
                        <Text
                          style={[
                            styles.genderLabel,
                            editedGender === 'boy' && styles.genderLabelActive,
                          ]}
                        >
                          남자
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.genderOption,
                          editedGender === 'girl' && styles.genderOptionActive,
                        ]}
                        onPress={() => setEditedGender('girl')}
                      >
                        <Text style={styles.genderEmoji}>👧</Text>
                        <Text
                          style={[
                            styles.genderLabel,
                            editedGender === 'girl' && styles.genderLabelActive,
                          ]}
                        >
                          여자
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Action Buttons */}
                  <View style={styles.modalActions}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={handleCancel}
                    >
                      <Text style={styles.cancelButtonText}>취소</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={handleSave}
                      disabled={!editedName.trim()}
                    >
                      <Text style={styles.saveButtonText}>저장</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    fontFamily: FONTS.juache,
    color: '#1E293B',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    gap: 6,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#16A34A',
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

  // Modal Styles
  keyboardAvoidingView: {
    flex: 1,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 32,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1E293B',
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  genderSelection: {
    flexDirection: 'row',
    gap: 12,
  },
  genderOption: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  genderOptionActive: {
    backgroundColor: '#F0FDF4',
    borderColor: '#22C55E',
  },
  genderEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  genderLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  genderLabelActive: {
    color: '#16A34A',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#64748B',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#22C55E',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFF',
  },
});
