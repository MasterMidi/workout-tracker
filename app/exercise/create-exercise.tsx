// app/create-exercise.tsx
import { Exercise, ExerciseType, TESTING_EXERCISES } from '@/store/atoms';
import { useRouter } from 'expo-router';
import { useSetAtom } from 'jotai';
import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ulid } from 'ulid';

// --- Data for our dropdowns (Unchanged) ---
const EQUIPMENT_ITEMS = [
  { label: 'Barbell', value: 'barbell' },
  { label: 'Dumbbell', value: 'dumbbell' },
  { label: 'Machine', value: 'machine' },
  { label: 'Cable', value: 'cable' },
  { label: 'Bodyweight', value: 'bodyweight' },
  { label: 'Other', value: 'other' },
];

const MUSCLE_GROUP_ITEMS = [
  { label: 'Chest', value: 'chest' },
  { label: 'Back', value: 'back' },
  { label: 'Shoulders', value: 'shoulders' },
  { label: 'Biceps', value: 'biceps' },
  { label: 'Triceps', value: 'triceps' },
  { label: 'Quadriceps', value: 'quadriceps' },
  { label: 'Hamstrings', value: 'hamstrings' },
  { label: 'Glutes', value: 'glutes' },
  { label: 'Calves', value: 'calves' },
];

const EXERCISE_TYPE_ITEMS = [
  { label: 'Reps & Weight', value: 'reps_weight' },
  { label: 'Time & Weight', value: 'time_weight' },
  { label: 'Reps Only', value: 'reps_only' },
  { label: 'Time Only', value: 'time_only' },
];

export default function CreateExerciseScreen() {
  const router = useRouter();

  // --- State for the form inputs (Unchanged) ---
  const [name, setName] = useState('');
  const [equipmentOpen, setEquipmentOpen] = useState(false);
  const [equipmentValue, setEquipmentValue] = useState<string[] | null>(null);
  const [equipmentItems, setEquipmentItems] = useState(EQUIPMENT_ITEMS);
  const [primaryMusclesOpen, setPrimaryMusclesOpen] = useState(false);
  const [secondaryMusclesOpen, setSecondaryMusclesOpen] = useState(false);
  const [primaryMusclesValue, setPrimaryMusclesValue] = useState<string[]>([]);
  const [secondaryMusclesValue, setSecondaryMusclesValue] = useState<string[]>(
    []
  );
  const [primaryMusclesItems, setPrimaryMusclesItems] =
    useState(MUSCLE_GROUP_ITEMS);
  const [secondaryMusclesItems, setSecondaryMusclesItems] =
    useState(MUSCLE_GROUP_ITEMS);
  const [typeOpen, setTypeOpen] = useState(false);
  const [typeValue, setTypeValue] = useState<ExerciseType | null>(null);
  const [typeItems, setTypeItems] = useState(EXERCISE_TYPE_ITEMS);
  const setExercisedList = useSetAtom(TESTING_EXERCISES);

  const handleSave = () => {
    if (
      !name.trim() ||
      !equipmentValue ||
      primaryMusclesValue.length === 0 ||
      !typeValue
    ) {
      Alert.alert('Incomplete Form', 'Please fill out all fields.');
      return;
    }
    const newExercise: Exercise = {
      id: ulid(),
      name: name.trim(),
      equipment: equipmentValue,
      primaryMuscles: primaryMusclesValue,
      secondaryMuscles: secondaryMusclesValue,
      type: typeValue,
    };

    setExercisedList((exercises) => [...exercises, newExercise]);

    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Create New Exercise</Text>

        <Text style={styles.label}>Exercise Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Bench Press"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Equipment</Text>
        <DropDownPicker
          listMode="MODAL" // <--- ADD THIS PROP
          open={equipmentOpen}
          value={equipmentValue}
          items={equipmentItems}
          setOpen={setEquipmentOpen}
          setValue={setEquipmentValue}
          setItems={setEquipmentItems}
          multiple={true}
          mode="BADGE"
          placeholder="Select equipment"
          style={styles.picker}
          zIndex={4000}
        />

        <Text style={styles.label}>Primary Muscle Groups</Text>
        <DropDownPicker
          listMode="MODAL" // <--- ADD THIS PROP
          open={primaryMusclesOpen}
          value={primaryMusclesValue}
          items={primaryMusclesItems}
          setOpen={setPrimaryMusclesOpen}
          setValue={setPrimaryMusclesValue}
          setItems={setPrimaryMusclesItems}
          multiple={true}
          mode="BADGE"
          placeholder="Select muscle groups"
          style={styles.picker}
          zIndex={3000}
        />

        <Text style={styles.label}>Secondary Muscle Groups</Text>
        <DropDownPicker
          listMode="MODAL" // <--- ADD THIS PROP
          open={secondaryMusclesOpen}
          value={secondaryMusclesValue}
          items={secondaryMusclesItems}
          setOpen={setSecondaryMusclesOpen}
          setValue={setSecondaryMusclesValue}
          setItems={setSecondaryMusclesItems}
          multiple={true}
          mode="BADGE"
          placeholder="Select muscle groups"
          style={styles.picker}
          zIndex={2000}
        />

        <Text style={styles.label}>Tracking Type</Text>
        <DropDownPicker
          listMode="MODAL" // <--- ADD THIS PROP
          open={typeOpen}
          value={typeValue}
          items={typeItems}
          setOpen={setTypeOpen}
          setValue={setTypeValue}
          setItems={setTypeItems}
          placeholder="Select how to track"
          style={styles.picker}
          zIndex={1000}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Exercise</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// --- Styles (Unchanged) ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    paddingTop: StatusBar.currentHeight || 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginTop: 20,
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  picker: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    // We can remove the container styles as they are not needed for modal mode
    // dropDownContainerStyle: styles.picker,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    paddingBottom: 60,
    backgroundColor: '#f0f2f5',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
