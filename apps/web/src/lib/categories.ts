import SpaIcon from '@mui/icons-material/Spa';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import PeopleIcon from '@mui/icons-material/People';

export const HABIT_CATEGORIES = [
  { id: 'wellness', label: 'Wellness', color: '#FFA07A', icon: SpaIcon },
  { id: 'productivity', label: 'Productivity', color: '#FFB6C1', icon: TrackChangesIcon },
  { id: 'fitness', label: 'Fitness', color: '#AEEEEE', icon: FitnessCenterIcon },
  { id: 'learning', label: 'Learning', color: '#FFEA70', icon: MenuBookIcon },
  { id: 'mindfulness', label: 'Mindfulness', color: '#A8E6CF', icon: SelfImprovementIcon },
  { id: 'finance', label: 'Finance', color: '#DCD3FF', icon: AccountBalanceWalletIcon },
  { id: 'social', label: 'Social', color: '#FFD3B6', icon: PeopleIcon },
];

export function getCategoryConfig(categoryId: string) {
  return HABIT_CATEGORIES.find((c) => c.id === categoryId) || HABIT_CATEGORIES[0];
}
