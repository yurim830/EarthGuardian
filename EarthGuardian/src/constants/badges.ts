import { Droplet, Zap, Trees, Trophy } from 'lucide-react-native';
import { Badge } from '../types';

export const BADGES: Badge[] = [
  {
    id: 'b1',
    name: '물 지킴이',
    threshold: 100,
    icon: Droplet,
    color: '#60A5FA',
  },
  {
    id: 'b2',
    name: '에너지 히어로',
    threshold: 300,
    icon: Zap,
    color: '#FACC15',
  },
  {
    id: 'b3',
    name: '숲의 수호자',
    threshold: 600,
    icon: Trees,
    color: '#4ADE80',
  },
  {
    id: 'b4',
    name: '지구 대장',
    threshold: 1000,
    icon: Trophy,
    color: '#A78BFA',
  },
];
