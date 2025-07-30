// app/(tabs)/workout.tsx
import { useRouter } from 'expo-router';
import { useAtomValue } from 'jotai';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { selectedExercisesAtom } from '../../store/atoms';

export default function WorkoutScreen() {
  const router = useRouter();
  // Read the value of the atom.
  const selectedExerciseIds = useAtomValue(selectedExercisesAtom);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>My Workout Routine 💪</Text>
        <Button
          title="Add Exercises to Workout"
          onPress={() =>
            router.push('/exercise/add-exercise', { withAnchor: false })
          }
        />

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Selected Exercise IDs:</Text>
          {selectedExerciseIds.length > 0 ? (
            selectedExerciseIds.map((id) => (
              <Text key={id} style={styles.idText}>
                {id}
              </Text>
            ))
          ) : (
            <Text style={styles.emptyText}>No exercises added yet.</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    marginTop: 30,
    alignItems: 'center',
    width: '100%',
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  idText: {
    marginVertical: 5,
    fontFamily: 'monospace',
    fontSize: 14,
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 5,
    width: '90%',
    textAlign: 'center',
  },
  emptyText: {
    marginTop: 10,
    color: '#888',
    fontSize: 16,
  },
});
