import { LetterDataMap, WordResult, MultiWordResult } from '../types';
import { scoreWord } from './scorer';
import { validateWordLength, validateTileAvailability } from './validation';
import {
  AnagramIndex,
  generateLetterCombinations,
  generateCombinationsByLength,
  findWordsFromCombinations
} from './anagramIndex';

/**
 * Find the best word from available letters using anagram index
 * OPTIMIZED: Uses anagram index instead of generating all permutations
 * Speed improvement: ~100-1000x faster for 7 letters
 */
export function findBestWord(
  rack: string,
  boardWord: string,
  dictionary: Set<string>,
  letterData: LetterDataMap,
  anagramIndex?: AnagramIndex
): WordResult | { error: string } {
  const rackUpper = rack.toUpperCase();
  const boardUpper = boardWord.toUpperCase();

  // Combine rack and board letters
  const allLetters = rackUpper + boardUpper;

  // Generate letter combinations (NOT permutations!)
  const letterCombinations = generateLetterCombinations(allLetters);

  // Find all valid words using anagram index (if available) or dictionary
  let candidateWords: Set<string>;
  if (anagramIndex) {
    // FAST PATH: Use anagram index
    candidateWords = findWordsFromCombinations(letterCombinations, anagramIndex);
  } else {
    // FALLBACK: Use dictionary (slower, but still works)
    candidateWords = new Set();
    for (const combination of letterCombinations) {
      // Generate permutations for this combination
      const permutations = generatePermutations(combination);
      for (const perm of permutations) {
        if (dictionary.has(perm)) {
          candidateWords.add(perm);
        }
      }
    }
  }

  let bestWord: WordResult | null = null;

  for (const candidate of candidateWords) {
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

/**
 * Find ALL valid words with LENGTH-BASED GENERATION (OPTIMIZED)
 * Searches longest words first for better performance and early termination
 * @param rack Player's letter rack
 * @param boardWord Optional board word constraint
 * @param dictionary Dictionary set
 * @param letterData Letter scores
 * @param anagramIndex Anagram index for fast lookup
 * @param maxResults Maximum number of results to return (default: 50)
 * @returns All valid words sorted by score, or error
 */
export function findAllWords(
  rack: string,
  boardWord: string,
  dictionary: Set<string>,
  letterData: LetterDataMap,
  anagramIndex?: AnagramIndex,
  maxResults: number = 50
): MultiWordResult | { error: string } {
  const rackUpper = rack.toUpperCase();
  const boardUpper = boardWord.toUpperCase();
  const allLetters = rackUpper + boardUpper;
  const maxLength = Math.min(allLetters.length, 15);

  const allValidWords: WordResult[] = [];
  const seenWords = new Set<string>();

  // Generate combinations by length: longest first (7→6→5→4→3→2)
  for (let length = maxLength; length >= 2; length--) {
    const letterCombinations = generateCombinationsByLength(allLetters, length);

    // Find words for this length
    let candidateWords: Set<string>;
    if (anagramIndex) {
      // FAST PATH: Use anagram index
      candidateWords = findWordsFromCombinations(letterCombinations, anagramIndex);
    } else {
      // FALLBACK: Use dictionary
      candidateWords = new Set();
      for (const combination of letterCombinations) {
        const permutations = generatePermutations(combination);
        for (const perm of permutations) {
          if (dictionary.has(perm)) {
            candidateWords.add(perm);
          }
        }
      }
    }

    // Validate and score each candidate
    for (const candidate of candidateWords) {
      // Skip if already found (can happen with duplicate letters)
      if (seenWords.has(candidate)) continue;

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

      allValidWords.push({ word: candidate, score });
      seenWords.add(candidate);
    }

    // Early termination: if we found enough high-scoring long words
    if (length === maxLength && allValidWords.length >= 10) {
      const avgScore = allValidWords.reduce((sum, w) => sum + w.score, 0) / allValidWords.length;
      // If we have 10+ words averaging good scores, we can stop early
      if (avgScore >= 15) {
        break;
      }
    }
  }

  if (allValidWords.length === 0) {
    return { error: 'No valid word found with the given letters' };
  }

  // Sort by score (descending), then alphabetically
  allValidWords.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.word.localeCompare(b.word);
  });

  // Limit results
  const topWords = allValidWords.slice(0, maxResults);

  return {
    bestWord: topWords[0],
    allWords: topWords,
    totalFound: allValidWords.length
  };
}

/**
 * Generate all permutations of a string (fallback for when anagram index not available)
 * @param str String to permute
 * @returns Set of permutations
 */
function generatePermutations(str: string): Set<string> {
  const result = new Set<string>();

  if (str.length <= 1) {
    result.add(str);
    return result;
  }

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const remaining = str.slice(0, i) + str.slice(i + 1);
    const perms = generatePermutations(remaining);

    for (const perm of perms) {
      result.add(char + perm);
    }
  }

  return result;
}
