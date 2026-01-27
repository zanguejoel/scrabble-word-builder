import { LetterDataMap, ValidationResult } from '../types';

export function validateRack(rack: string): ValidationResult {
  if (!rack || rack.length < 1 || rack.length > 7) {
    return { valid: false, error: 'Rack must contain 1-7 letters' };
  }
  if (!/^[A-Za-z]+$/.test(rack)) {
    return { valid: false, error: 'Rack must contain only letters' };
  }
  return { valid: true };
}

export function validateBoardWord(boardWord: string): ValidationResult {
  if (!boardWord) {
    return { valid: true };
  }
  if (!/^[A-Za-z]+$/.test(boardWord)) {
    return { valid: false, error: 'Board word must contain only letters' };
  }
  return { valid: true };
}

export function validateWordLength(word: string): ValidationResult {
  if (word.length < 2 || word.length > 15) {
    return { valid: false, error: 'Word must be 2-15 letters long' };
  }
  return { valid: true };
}

export function validateTileAvailability(
  candidate: string,
  rack: string,
  boardWord: string,
  letterData: LetterDataMap
): ValidationResult {
  const candidateUpper = candidate.toUpperCase();
  const rackUpper = rack.toUpperCase();
  const boardUpper = boardWord.toUpperCase();

  // Count letters in candidate
  const candidateCount: Record<string, number> = {};
  for (const char of candidateUpper) {
    candidateCount[char] = (candidateCount[char] || 0) + 1;
  }

  // Count letters in rack + board word (combined pool)
  const availableCount: Record<string, number> = {};
  for (const char of rackUpper + boardUpper) {
    availableCount[char] = (availableCount[char] || 0) + 1;
  }

  // Check each letter in candidate
  for (const [char, count] of Object.entries(candidateCount)) {
    // Check if we have enough tiles from rack + board
    const available = availableCount[char] || 0;
    if (available < count) {
      return { 
        valid: false, 
        error: `Not enough '${char}' tiles. Need ${count}, have ${available}` 
      };
    }

    // Check if total doesn't exceed game tile limit
    const tileLimit = letterData[char]?.count || 0;
    if (available > tileLimit) {
      return { 
        valid: false, 
        error: `Too many '${char}' tiles used. Limit is ${tileLimit}, using ${available}` 
      };
    }
  }

  return { valid: true };
}
