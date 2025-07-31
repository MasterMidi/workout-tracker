import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

// A reusable component for the header button
function CreateExerciseButton() {
  const router = useRouter();
  return (
    <TouchableOpacity
      // Correct the navigation path to match the file route
      onPress={() => router.push('/exercise/create-exercise')}
      style={{ marginRight: 15 }}
    >
      <Ionicons name="add-circle-outline" size={28} color="#007AFF" />
    </TouchableOpacity>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />

        {/* --- FIXES ARE HERE --- */}

        {/* Use the full file-based route name */}
        <Stack.Screen
          name="exercise/add-exercise" // Corrected from "add-exercise"
          options={{
            title: 'Select Exercises',
            headerRight: () => <CreateExerciseButton />,
          }}
        />

        {/* Use the full file-based route name */}
        {/* Note: Your filename is `create.exercise.tsx`.
            For consistency, you may want to rename it to `create-exercise.tsx`
        */}
        <Stack.Screen
          name="exercise/create-exercise" // Corrected from "create-exercise"
          options={{
            title: 'New Exercise',
            presentation: 'modal',
          }}
        />

        {/* This configures the dynamic route for exercise details */}
        <Stack.Screen
          name="exercise/[id]"
          options={{
            title: 'Exercise Details',
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
