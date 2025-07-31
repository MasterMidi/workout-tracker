// app/add-exercise.tsx
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useAtomValue, useSetAtom } from 'jotai';
import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  selectedExercisesAtom,
  TESTING_EXERCISES_LIST_VIEW,
} from '../../store/atoms';

// DATA AND TYPES (Unchanged)
export type ExerciseListItem = {
  id: string;
  name: string;
  equipment: string[];
  muscleGroups: string[];
};

type ExerciseItemProps = {
  item: ExerciseListItem;
  isSelected: boolean;
  onSelect: () => void;
  onShowDetails: () => void;
};

// COMPONENT FOR A SINGLE ITEM (Unchanged)
const ExerciseItem = ({
  item,
  isSelected,
  onSelect,
  onShowDetails,
}: ExerciseItemProps) => (
  <Pressable onPress={onSelect}>
    <View style={[styles.itemContainer, isSelected && styles.itemSelected]}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={(e) => {
            e.stopPropagation(); // Prevent the main Pressable's onSelect from firing
            onShowDetails();
          }}
        >
          <Ionicons
            name="information-circle-outline"
            size={26}
            color="#007AFF"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.itemDetails}>
        <View style={styles.equipmentContainer}>
          {item.equipment.map((x) => (
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

export default function AddExerciseScreen() {
  const router = useRouter();
  const setSelectedExercises = useSetAtom(selectedExercisesAtom);
  const getExercisedList = useAtomValue(TESTING_EXERCISES_LIST_VIEW);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectItem = (id: string) => {
    setSelectedItems((currentSelected) => {
      if (currentSelected.includes(id)) {
        return currentSelected.filter((itemId) => itemId !== id);
      } else {
        return [...currentSelected, id];
      }
    });
  };

  const handleConfirmSelection = () => {
    // 1. Set the global state with the selected exercise IDs
    setSelectedExercises(selectedItems);
    // 2. Navigate back to the previous screen (the workout screen)
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.selectionCount}>
          Selected: {selectedItems.length}
        </Text>
        <FlashList
          data={getExercisedList}
          renderItem={({ item }) => (
            <ExerciseItem
              item={item}
              isSelected={selectedItems.includes(item.id)}
              onSelect={() => handleSelectItem(item.id)}
              onShowDetails={() => router.push(`/exercise/${item.id}`)}
            />
          )}
          keyExtractor={(item) => item.id}
          extraData={selectedItems}
          contentContainerStyle={
            selectedItems.length > 0
              ? styles.listContentContainerPadding
              : styles.listContentContainer
          }
          estimatedItemSize={137}
        />
      </View>

      {selectedItems.length > 0 && (
        <View style={styles.floatingButtonContainer}>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={handleConfirmSelection}
            activeOpacity={0.8}
          >
            <Text style={styles.floatingButtonText}>
              Add {selectedItems.length}{' '}
              {selectedItems.length === 1 ? 'Exercise' : 'Exercises'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

// STYLES (Unchanged)
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
    paddingBottom: 60,
  },
  listContentContainerPadding: {
    paddingBottom: 120,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
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
  detailsButton: {
    marginLeft: 10,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 10,
    right: 10,
  },
  floatingButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  floatingButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
