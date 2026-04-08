import FavoriteIcon from '@mui/icons-material/Favorite';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import ChurchIcon from '@mui/icons-material/Church';
import SpaIcon from '@mui/icons-material/Spa';
import CategoryIcon from '@mui/icons-material/Category';

export const HABIT_CATEGORIES = [
  { id: 'health', label: 'Health', color: '#FFB5C5', icon: FavoriteIcon },
  { id: 'hobby', label: 'Hobby', color: '#D8BFD8', icon: VideogameAssetIcon },
  { id: 'fitness', label: 'Fitness', color: '#AEEEEE', icon: FitnessCenterIcon },
  { id: 'work', label: 'Work', color: '#B0E57C', icon: WorkIcon },
  { id: 'study', label: 'Study', color: '#FFE65E', icon: SchoolIcon },
  { id: 'spiritual', label: 'Spiritual', color: '#FFDAB9', icon: ChurchIcon },
  { id: 'wellness', label: 'Wellness', color: '#FFA07A', icon: SpaIcon },
  { id: 'other', label: 'Other', color: '#CFCFCF', icon: CategoryIcon },
];

export function getCategoryConfig(categoryId: string) {
  return HABIT_CATEGORIES.find((c) => c.id === categoryId) || HABIT_CATEGORIES[0];
}
