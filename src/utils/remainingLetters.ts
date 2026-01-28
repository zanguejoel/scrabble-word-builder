// Utility to compute remaining letter counts for the keyboard
// Given the full letterData, rack, and boardWord, returns a map of remaining counts for each letter
import { LetterDataMap } from '../types';

export function getRemainingLetterCounts(
  letterData: LetterDataMap,
  rack: string,
  boardWord: string
): Record<string, number> {
  // Start with the total available for each letter
  const remaining: Record<string, number> = {};
  for (const letter in letterData) {
    remaining[letter] = letterData[letter].count;
  }

  // Subtract used letters in rack
  for (const char of rack.toUpperCase()) {
    if (remaining[char] !== undefined) {
      remaining[char] = Math.max(0, remaining[char] - 1);
    }
  }

  // Subtract used letters in boardWord
  for (const char of boardWord.toUpperCase()) {
    if (remaining[char] !== undefined) {
      remaining[char] = Math.max(0, remaining[char] - 1);
    }
  }

  return remaining;
}
