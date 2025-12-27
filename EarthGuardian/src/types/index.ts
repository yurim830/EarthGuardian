export interface Mission {
  id: number;
  category: 'water' | 'energy' | 'forest' | 'recycle';
  title: string;
  guide: string;
  color: string;
  iconColor: string;
  points: number;
}

export interface Badge {
  id: string;
  name: string;
  threshold: number;
  icon: any;
  color: string;
}

export interface MissionStats {
  [missionId: number]: number; // missionId -> total completion count
}

export interface AppState {
  points: number;
  streak: number;
  lastActiveDate: string;
  todayCompletedMissions: number[];
  missionStats: MissionStats; // Track total completions per mission
  isHydrated: boolean;
  addPoints: (val: number) => void;
  completeMission: (id: number) => void;
  checkAndResetDaily: () => void;
  hydrate: () => Promise<void>;
  saveToStorage: () => Promise<void>;
}