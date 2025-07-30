// app/(tabs)/workout.tsx
import { useRouter } from 'expo-router';
import { useAtomValue } from 'jotai';
import { useState } from "react";
import { Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { selectedExercisesAtom } from '../../store/atoms';

export default function WorkoutScreen() {
  const router = useRouter();
  // Read the value of the atom.
  const selectedExerciseIds = useAtomValue(selectedExercisesAtom);

  const [exercises, setExercises] = useState([
    { id: "1", name: "Bench Press", sets: [{ id: "s1", weight: "", reps: "" }] },
    { id: "2", name: "Squat", sets: [{ id: "s1", weight: "", reps: "" }] },
  ]);

  //handle input change
  const handleInputChange = (exerciseId: string, setId: string, field: string, value: string) => {
    setExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === exerciseId
          ? {
            ...exercise,
            sets: exercise.sets.map((set) =>
              set.id === setId ? { ...set, [field]: value } : set
            ),
          }
          : exercise

      ));
  };

  //Add new set
  const addSet = (exerciseId: string) => {
    setExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === exerciseId
          ? {
            ...exercise,
            sets: [
              ...exercise.sets,
              { id: Date.now().toString(), weight: "", reps: "" },
            ],
          }
          : exercise

      ))
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>My Workout Routine 💪</Text>
        <Button
          title="Add Exercises to Workout"
          onPress={() => router.push('/add-exercise')}
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
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.exerciseCard}>
              <Text style={styles.exerciseName}>{item.name}</Text>

              <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>Set</Text>
                <Text style={styles.headerCell}>Weight (kg)</Text>
                <Text style={styles.headerCell}>Reps</Text>
              </View>

              {item.sets.map((set, index) => (
                <View key={set.id} style={styles.row}>
                  <Text style={styles.cell}>{index + 1}</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={set.weight}
                    onChangeText={(text) =>
                      handleInputChange(item.id, set.id, "weight", text)
                    }
                    placeholder="0"
                  />
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={set.reps}
                    onChangeText={(text) =>
                      handleInputChange(item.id, set.id, "reps", text)
                    }
                    placeholder="0"
                  />
                </View>
              ))}


              {/* Add Set Button */}
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addSet(item.id)}
              >
                <Text style={styles.addButtonText}>+ Add Set</Text>
              </TouchableOpacity>
            </View>
          )}
        />
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
    width: "100%",
    alignItems: "stretch",
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
  exercisesContainer: {
    padding: 0
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8
  },
  exerciseCard: {
    backgroundColor: "#fff",
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 8, // space for shadow
    borderRadius: 8,
    elevation: 3,
    width: 'auto', // takes available width
  },

  tableHeader: {
    flexDirection: "row",
    marginBottom: 6,
    alignItems: "center",
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    minWidth: 80,
  },
  row: {
    flexDirection: "row",
    marginBottom: 6,
    alignItems: "center",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    minWidth: 40,
  },
  input: {
    flex: 1,
    minWidth: 80,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingVertical: 6,
    textAlign: "center",
    marginHorizontal: 4,
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
    alignItems: "center",
    alignSelf: "center",
    width: "95%",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold"
  },
});
