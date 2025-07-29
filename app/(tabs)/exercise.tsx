import { FlashList } from '@shopify/flash-list';
import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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

// ### Props for the ExerciseItem component are updated ###
type ExerciseItemProps = {
  item: ExerciseListItem;
  isSelected: boolean;
  onSelect: () => void;
};

// ### The ExerciseItem component is updated to handle selection ###
const ExerciseItem = ({ item, isSelected, onSelect }: ExerciseItemProps) => (
  <Pressable onPress={onSelect}>
    <View
      style={[
        styles.itemContainer,
        // Apply 'itemSelected' style if the item is selected
        isSelected && styles.itemSelected,
      ]}
    >
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
      <View style={styles.itemDetails}>
        <View style={styles.equipmentContainer}>
          {item.equipment.map((x) => (
            // Added a unique key for each mapped element
            <Text key={x} style={styles.itemTypeLabel}>
              {x}
            </Text>
          ))}
        </View>
        <Text style={styles.itemMuscles}>{item.muscleGroups.join(', ')}</Text>
      </View>
    </View>
  </Pressable>
);

export default function ExerciseListScreen() {
  // ### State to hold the IDs of selected items ###
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // ### Function to handle selecting/deselecting an item ###
  const handleSelectItem = (id: string) => {
    setSelectedItems((currentSelected) => {
      if (currentSelected.includes(id)) {
        // If already selected, remove it from the array
        return currentSelected.filter((itemId) => itemId !== id);
      } else {
        // If not selected, add it to the array
        return [...currentSelected, id];
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Exercises</Text>
        {/* The Text component below will display the number of selected items */}
        <Text style={styles.selectionCount}>
          Selected: {selectedItems.length}
        </Text>
        <FlashList
          data={EXERCISES_DATA}
          renderItem={({ item }) => (
            <ExerciseItem
              item={item}
              // Pass the selection status to the item
              isSelected={selectedItems.includes(item.id)}
              // Pass the handler function to the item
              onSelect={() => handleSelectItem(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          // ### extraData tells FlashList to re-render when selectedItems changes ###
          extraData={selectedItems}
          contentContainerStyle={styles.listContentContainer}
        />
      </View>
    </SafeAreaView>
  );
}

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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginTop: 20,
    marginBottom: 8,
  },
  selectionCount: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  listContentContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent', // Default transparent border
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  // ### Style for selected items ###
  itemSelected: {
    backgroundColor: '#e6f2ff',
    borderColor: '#007AFF',
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
    flex: 1,
  },
  itemDetails: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  equipmentContainer: {
    flexDirection: 'row',
  },
  itemTypeLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#007AFF',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 5,
  },
  itemMuscles: {
    fontSize: 12,
    color: '#888',
    flex: 1,
    textAlign: 'right',
    marginLeft: 10,
  },
});
