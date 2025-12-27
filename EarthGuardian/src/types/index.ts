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

export interface AppState {
  points: number;
  streak: number;
  completedMissions: number[];
  addPoints: (val: number) => void;
  completeMission: (id: number) => void;
}