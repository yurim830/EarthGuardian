import { create } from 'zustand';
import { AppState } from '../types';

export const useStore = create<AppState>((set) => ({
  points: 0,
  streak: 3,
  completedMissions: [],
  addPoints: (val) => set((state) => ({ 
    points: state.points + val 
  })),
  completeMission: (id) => set((state) => ({ 
    completedMissions: [...state.completedMissions, id] 
  })),
}));