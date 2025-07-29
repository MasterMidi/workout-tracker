import { FlashList } from '@shopify/flash-list/src';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import 'react-native-get-random-values'; // Needed for crypto support (ulid)
import { ulid } from 'ulid';

type ExerciseListItem = {
  id: string;
  name: string;
  equipment: string[];
  muscleGroups: string[];
};

const EXERCISES_DATA: ExerciseListItem[] = [
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
];

const ExerciseItem = ({ item }: { item: ExerciseListItem }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemHeader}>
      <Text style={styles.itemName}>
        {item.name} : {item.id}
      </Text>
      {/* <Text style={styles.itemDuration}>{item.duration} min</Text> */}
    </View>
    <View style={styles.itemDetails}>
      {item.equipment.map((x) => (
        <Text style={styles.itemTypeLabel}>{x}</Text>
      ))}
      <Text style={styles.itemMuscles}>{item.muscleGroups.join(', ')}</Text>
    </View>
  </View>
);

export default function ExerciseListScreen() {
  return (
    // SafeAreaView ensures content is not obscured by device notches or status bars.
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Exercises</Text>
        <FlashList
          data={EXERCISES_DATA}
          // The renderItem prop specifies how each item in the data array is rendered.
          renderItem={({ item }) => <ExerciseItem item={item} />}
          // The keyExtractor provides a unique key for each item, essential for performance.
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContentContainer}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f2f5', // A light grey background for the whole screen
    // Add padding for Android status bar if needed
    paddingTop: StatusBar.currentHeight || 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginVertical: 20,
  },
  listContentContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 12,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android shadow
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1, // Allow text to wrap if it's too long
  },
  itemDuration: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginLeft: 10,
  },
  itemDetails: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTypeLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#007AFF',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    overflow: 'hidden', // Ensures background respects the border radius on older Android
    marginRight: 5,
  },
  itemMuscles: {
    fontSize: 12,
    color: '#888',
    flex: 1, // Allows text to wrap
    textAlign: 'right',
    marginLeft: 10,
  },
});
