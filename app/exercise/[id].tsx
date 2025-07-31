// app/exercise/[id].tsx
import { TESTING_EXERCISES_LIST_VIEW } from '@/store/atoms';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useAtomValue } from 'jotai';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function ExerciseDetailsScreen() {
  // Get the 'id' parameter from the URL
  const { id } = useLocalSearchParams<{ id: string }>();

  // Find the exercise that matches the id
  const getExercisedList = useAtomValue(TESTING_EXERCISES_LIST_VIEW);
  const exercise = getExercisedList.find((e) => e.id === id);

  // Display a message if no exercise is found
  if (!exercise) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Exercise not found!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Use Stack.Screen to set the page title in the header */}
      <Stack.Screen options={{ title: exercise.name }} />
      <View style={styles.container}>
        <Text style={styles.title}>{exercise.name}</Text>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Equipment</Text>
          <Text style={styles.detailValue}>
            {exercise.equipment.join(', ')}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Primary Muscle Groups</Text>
          <Text style={styles.detailValue}>
            {exercise.muscleGroups.join(', ')}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 24,
  },
  detailItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
});
