import { LetterDataMap, WordResult } from '../types';
import { scoreWord } from './scorer';
import { validateWordLength, validateTileAvailability } from './validation';

function generateCombinations(letters: string): Set<string> {
  const combinations = new Set<string>();
  const lettersArray = letters.split('');

  function permute(arr: string[], start: number = 0) {
    if (start === arr.length - 1) {
      const word = arr.join('');
      if (word.length >= 2 && word.length <= 15) {
        combinations.add(word);
      }
      return;
    }

    for (let i = start; i < arr.length; i++) {
      [arr[start], arr[i]] = [arr[i], arr[start]];
      permute(arr, start + 1);
      [arr[start], arr[i]] = [arr[i], arr[start]];
    }
  }

  // Generate all subsets and permutations
  function generateSubsets(arr: string[], index: number = 0, current: string[] = []) {
    if (current.length >= 2 && current.length <= 15) {
      permute([...current]);
    }

    if (index === arr.length) return;

    // Include current element
    generateSubsets(arr, index + 1, [...current, arr[index]]);
    // Exclude current element
    generateSubsets(arr, index + 1, current);
  }

  generateSubsets(lettersArray);
  return combinations;
}

export function findBestWord(
  rack: string,
  boardWord: string,
  dictionary: Set<string>,
  letterData: LetterDataMap
): WordResult | { error: string } {
  const rackUpper = rack.toUpperCase();
  const boardUpper = boardWord.toUpperCase();
  
  // Generate all possible combinations from rack letters
  const allLetters = rackUpper + boardUpper;
  const combinations = generateCombinations(allLetters);

  let bestWord: WordResult | null = null;

  for (const candidate of combinations) {
    // Skip if not in dictionary
    if (!dictionary.has(candidate)) continue;

    // Skip if board word is required but not contained
    if (boardUpper && !candidate.includes(boardUpper)) continue;

    // Validate word length
    const lengthValidation = validateWordLength(candidate);
    if (!lengthValidation.valid) continue;

    // Validate tile availability
    const tileValidation = validateTileAvailability(
      candidate,
      rackUpper,
      boardUpper,
      letterData
    );
    if (!tileValidation.valid) continue;

    // Calculate score
    const score = scoreWord(candidate, letterData);

    // Update best word (higher score, or alphabetically first on tie)
    if (
      !bestWord ||
      score > bestWord.score ||
      (score === bestWord.score && candidate < bestWord.word)
    ) {
      bestWord = { word: candidate, score };
    }
  }

  if (!bestWord) {
    return { error: 'No valid word found with the given letters' };
  }

  return bestWord;
}
