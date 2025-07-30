import { ExerciseListItem } from '@/app/exercise/add-exercise';
import { atom } from 'jotai';
import 'react-native-get-random-values';
import { ulid } from 'ulid';

/**
 * An atom to hold the list of exercise IDs selected from the
 * add-exercise screen. The workout screen will read from this atom.
 */
export const selectedExercisesAtom = atom<string[]>([]);

export const TESTING_EXERCISES_DATA = atom<ExerciseListItem[]>([
  {
    id: ulid(),
    name: 'Chest Press',
    equipment: ['Machine'],
    muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
  },
  {
    id: ulid(),
    name: 'Glute Ham Raise',
    equipment: ['Other'],
    muscleGroups: ['Hamstring', 'Glutes'],
  },
  {
    id: ulid(),
    name: 'Romanian Deadlift',
    equipment: ['Barbell'],
    muscleGroups: ['Hamstring', 'Glutes', 'Lower back', 'Upper back', 'Lats'],
  },
  {
    id: ulid(),
    name: 'Pull Up',
    equipment: ['Other'],
    muscleGroups: ['Lats', 'Upper back', 'Biceps', 'Forearms'],
  },
  {
    id: ulid(),
    name: 'Single Arm Lateral Raise',
    equipment: ['Cable'],
    muscleGroups: ['Shoulders'],
  },
  {
    id: ulid(),
    name: 'Rear Delt Reverse Fly',
    equipment: ['Cable'],
    muscleGroups: ['Shoulders', 'Upper back'],
  },
  {
    id: ulid(),
    name: 'Leg Extension',
    equipment: ['Machine'],
    muscleGroups: ['Quadriceps'],
  },
]);
