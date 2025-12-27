import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, MissionStats } from '../types';

const STORAGE_KEY = '@eco_guardian_data';

const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD
};

const calculateStreak = (lastDate: string): number => {
  const today = new Date(getTodayDateString());
  const last = new Date(lastDate);
  const diffTime = today.getTime() - last.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 1; // Same day
  if (diffDays === 1) return 1; // Continue streak (will be incremented)
  return 0; // Streak broken
};

// Helper function to save state
const saveStateToStorage = async (state: any) => {
  try {
    const toSave = {
      points: state.points,
      streak: state.streak,
      lastActiveDate: state.lastActiveDate,
      todayCompletedMissions: state.todayCompletedMissions,
      missionStats: state.missionStats,
    };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (error) {
    console.error('Failed to save data:', error);
  }
};

export const useStore = create<AppState>((set, get) => ({
  points: 0,
  streak: 0,
  lastActiveDate: getTodayDateString(),
  todayCompletedMissions: [],
  missionStats: {},
  isHydrated: false,

  // Load data from AsyncStorage
  hydrate: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        set({
          points: data.points || 0,
          streak: data.streak || 0,
          lastActiveDate: data.lastActiveDate || getTodayDateString(),
          todayCompletedMissions: data.todayCompletedMissions || [],
          missionStats: data.missionStats || {},
          isHydrated: true,
        });
        get().checkAndResetDaily();
      } else {
        set({ isHydrated: true });
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      set({ isHydrated: true });
    }
  },

  // Check if it's a new day and reset daily missions
  checkAndResetDaily: () => {
    const state = get();
    const today = getTodayDateString();
    
    if (state.lastActiveDate !== today) {
      const newStreak = state.todayCompletedMissions.length > 0 
        ? calculateStreak(state.lastActiveDate) + state.streak
        : 0;
      
      set({
        lastActiveDate: today,
        todayCompletedMissions: [],
        streak: newStreak,
      });
      
      // Save to AsyncStorage
      saveStateToStorage(get());
    }
  },

  addPoints: (val) => {
    set((state) => ({ points: state.points + val }));
    saveStateToStorage(get());
  },

  completeMission: (id) => {
    set((state) => {
      const newMissionStats = { ...state.missionStats };
      newMissionStats[id] = (newMissionStats[id] || 0) + 1;
      
      return {
        todayCompletedMissions: [...state.todayCompletedMissions, id],
        missionStats: newMissionStats,
      };
    });
    saveStateToStorage(get());
  },

  // Public method to manually save (for external use if needed)
  saveToStorage: async () => {
    await saveStateToStorage(get());
  },
}));