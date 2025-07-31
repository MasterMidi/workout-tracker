import { ExerciseListItem } from '@/app/exercise/add-exercise';
import { atom } from 'jotai';
import 'react-native-get-random-values';
import { ulid } from 'ulid';

/**
 * An atom to hold the list of exercise IDs selected from the
 * add-exercise screen. The workout screen will read from this atom.
 */
export const selectedExercisesAtom = atom<string[]>([]);

// A union type for the specific kinds of exercises
export type ExerciseType = 'reps_weight' | 'reps' | 'time_distance' | 'time';

// The main type definition for an exercise object
export type Exercise = {
  id: string;
  name: string;
  equipment: string[];
  primaryMuscles: string[];
  secondaryMuscles: string[];
  type: ExerciseType;
  description?: string;
  steps?: string[];
};

export const TESTING_EXERCISES = atom<Exercise[]>([
  {
    id: ulid(),
    name: 'Chest Press',
    equipment: ['Machine'],
    primaryMuscles: ['Chest'],
    secondaryMuscles: ['Shoulders', 'Triceps'],
    type: 'reps_weight',
    description:
      'A fundamental upper-body exercise that targets the pectoral muscles using a guided machine motion, making it great for building foundational strength.',
    steps: [
      'Sit on the machine with your back flat against the pad.',
      'Adjust the seat height so the handles are level with your mid-chest.',
      'Grasp the handles with a full grip and push forward until your arms are fully extended but not locked.',
      'Pause briefly, then slowly return to the starting position.',
    ],
  },
  {
    id: ulid(),
    name: 'Glute Ham Raise',
    equipment: ['Other'],
    primaryMuscles: ['Hamstrings', 'Glutes'],
    secondaryMuscles: ['Lower back'],
    type: 'reps',
    description:
      'An advanced bodyweight exercise that strengthens the entire posterior chain, crucial for athletic performance and injury prevention.',
    steps: [
      'Secure your feet in the GHR machine with your knees comfortably on the pad.',
      'Start with your torso upright and your back straight.',
      'Slowly lower your upper body towards the floor, maintaining a straight line from your knees to your head.',
      'Use your hamstrings and glutes to forcefully pull yourself back to the upright starting position.',
    ],
  },
  {
    id: ulid(),
    name: 'Romanian Deadlift',
    equipment: ['Barbell', 'Dumbbell'],
    primaryMuscles: ['Hamstrings', 'Glutes'],
    secondaryMuscles: ['Lower back', 'Upper back', 'Lats', 'Forearms'],
    type: 'reps_weight',
    description:
      'A hinge movement that emphasizes the hamstrings and glutes. Unlike a conventional deadlift, the knees are kept relatively straight.',
    steps: [
      'Stand with your feet hip-width apart, holding a barbell or dumbbells in front of your thighs.',
      'Keeping your back straight, hinge at your hips and lower the weight towards the floor.',
      'Maintain only a slight bend in your knees; the focus is on pushing your hips back.',
      'Lower the weight until you feel a deep stretch in your hamstrings, then return to the starting position by driving your hips forward.',
    ],
  },
  {
    id: ulid(),
    name: 'Pull Up',
    equipment: ['Other'],
    primaryMuscles: ['Lats', 'Upper back'],
    secondaryMuscles: ['Biceps', 'Forearms'],
    type: 'reps',
    description:
      'A classic bodyweight exercise that builds significant back and bicep strength by pulling your body up to a bar.',
    steps: [
      'Grasp a pull-up bar with your hands slightly wider than shoulder-width, palms facing away.',
      'Hang from the bar with your arms fully extended (a "dead hang").',
      'Engage your back muscles to pull yourself up until your chin is over the bar.',
      'Slowly lower yourself back to the starting position with full control.',
    ],
  },
  {
    id: ulid(),
    name: 'Single Arm Lateral Raise',
    equipment: ['Cable', 'Dumbbell'],
    primaryMuscles: ['Shoulders'],
    secondaryMuscles: [],
    type: 'reps_weight',
    description:
      'An isolation exercise that targets the medial (side) deltoid for broader shoulders. Using a cable provides constant tension throughout the movement.',
    steps: [
      'Stand side-on to a low cable pulley and grasp the handle with your outside hand.',
      "With a slight bend in your elbow, raise your arm out to the side until it's parallel to the floor.",
      'Keep your torso still and avoid using momentum.',
      'Slowly lower the handle back to the starting position with control.',
    ],
  },
  {
    id: ulid(),
    name: 'Leg Extension',
    equipment: ['Machine'],
    primaryMuscles: ['Quadriceps'],
    secondaryMuscles: [],
    type: 'reps_weight',
    description:
      'A machine-based isolation exercise that specifically targets the quadriceps muscles on the front of the thigh.',
    steps: [
      'Sit on the machine and place your legs under the padded bar so it rests on your lower shins.',
      "Ensure your knees are aligned with the machine's pivot point.",
      'Hold the side handles for support and extend your legs to lift the weight until they are straight but not locked.',
      'Pause at the top to squeeze your quads, then slowly lower the weight back down.',
    ],
  },
  {
    id: ulid(),
    name: 'Barbell Squat',
    equipment: ['Barbell'],
    primaryMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Lower back', 'Calves'],
    type: 'reps_weight',
    description:
      'A foundational compound exercise that builds strength and muscle in the entire lower body and core. Considered one of the most effective exercises overall.',
    steps: [
      'Set a barbell in a squat rack and position it on your upper back, not your neck.',
      'Stand with feet shoulder-width apart, toes slightly pointed out.',
      'Keeping your chest up and back straight, lower your hips as if sitting in a chair.',
      'Descend until your thighs are at least parallel to the floor, then drive through your heels to return to the standing position.',
    ],
  },
  {
    id: ulid(),
    name: 'Treadmill Run',
    equipment: ['Cardio'],
    primaryMuscles: ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves'],
    secondaryMuscles: ['Core'],
    type: 'time_distance',
    description:
      'A popular cardiovascular exercise that improves heart health, endurance, and burns calories effectively.',
    steps: [
      'Select your desired program or manual settings.',
      'Start at a walking pace to warm up for 3-5 minutes.',
      'Gradually increase the speed to your desired running or jogging pace.',
      'Maintain an upright posture and when finished, gradually decrease the speed to cool down before stopping.',
    ],
  },
  {
    id: ulid(),
    name: 'Plank',
    equipment: ['Bodyweight'],
    primaryMuscles: ['Core'],
    secondaryMuscles: ['Shoulders', 'Glutes'],
    type: 'time',
    description:
      'An isometric core exercise that builds abdominal and lower back stability by holding a static position.',
    steps: [
      'Place your forearms on the floor with your elbows directly under your shoulders.',
      'Extend your legs back, resting on your toes, as if in a push-up position.',
      'Engage your core and glutes to keep your body in a straight line from head to heels.',
      'Hold this position without letting your hips sag.',
    ],
  },
]);

export const TESTING_EXERCISES_LIST_VIEW = atom((get) => {
  const exercises = get(TESTING_EXERCISES);
  return exercises.map((x) => ({
    id: x.id,
    name: x.name,
    equipment: x.equipment,
    muscleGroups: [...x.primaryMuscles, ...x.secondaryMuscles],
  })) as ExerciseListItem[];
});
