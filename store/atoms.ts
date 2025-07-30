import { atom } from 'jotai';

/**
 * An atom to hold the list of exercise IDs selected from the
 * add-exercise screen. The workout screen will read from this atom.
 */
export const selectedExercisesAtom = atom<string[]>([]);
