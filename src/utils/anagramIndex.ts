/**
 * Anagram Index for Fast Word Lookup
 *
 * Instead of generating all permutations, we:
 * 1. Sort the letters of each word (e.g., "CAT" → "ACT")
 * 2. Store words by their sorted letters in a Map
 * 3. To find words, sort the letters and lookup in the Map
 *
 * This reduces search from O(n! * dict_size) to O(2^n * log(dict_size))
 */

export type AnagramIndex = Map<string, string[]>;

/**
 * Build an anagram index from a dictionary
 * @param dictionary Set of words
 * @returns Map of sorted letters to array of words
 */
export function buildAnagramIndex(dictionary: Set<string>): AnagramIndex {
  const index = new Map<string, string[]>();

  for (const word of dictionary) {
    // Sort the letters to create the key
    const sortedKey = word.split('').sort().join('');

    // Add word to the array for this key
    if (!index.has(sortedKey)) {
      index.set(sortedKey, []);
    }
    index.get(sortedKey)!.push(word);
  }

  return index;
}

/**
 * Generate all letter combinations (subsets) from given letters
 * WITHOUT generating permutations (anagram index handles that)
 * @param letters String of letters
 * @returns Set of sorted letter combinations
 */
export function generateLetterCombinations(letters: string): Set<string> {
  const combinations = new Set<string>();
  const lettersArray = letters.split('');

  function generateSubsets(index: number = 0, current: string[] = []) {
    // Only add subsets of length 2-15
    if (current.length >= 2 && current.length <= 15) {
      // Sort the letters to match anagram index format
      const sorted = current.sort().join('');
      combinations.add(sorted);
    }

    if (index === lettersArray.length) return;

    // Include current letter
    generateSubsets(index + 1, [...current, lettersArray[index]]);
    // Exclude current letter
    generateSubsets(index + 1, current);
  }

  generateSubsets();
  return combinations;
}

/**
 * Generate letter combinations of a specific length (OPTIMIZED)
 * @param letters String of letters
 * @param targetLength Desired combination length
 * @returns Set of sorted letter combinations of specified length
 */
export function generateCombinationsByLength(
  letters: string,
  targetLength: number
): Set<string> {
  const combinations = new Set<string>();
  const lettersArray = letters.split('');

  if (targetLength < 2 || targetLength > lettersArray.length) {
    return combinations;
  }

  function generateSubsets(index: number = 0, current: string[] = []) {
    // Found a combination of target length
    if (current.length === targetLength) {
      const sorted = [...current].sort().join('');
      combinations.add(sorted);
      return;
    }

    // Pruning: not enough letters left to reach target length
    if (index === lettersArray.length) return;
    if (lettersArray.length - index < targetLength - current.length) return;

    // Include current letter
    generateSubsets(index + 1, [...current, lettersArray[index]]);
    // Exclude current letter
    generateSubsets(index + 1, current);
  }

  generateSubsets();
  return combinations;
}

/**
 * Find all valid words from letter combinations using anagram index
 * @param letterCombinations Set of sorted letter combinations
 * @param anagramIndex Anagram index to lookup
 * @returns Set of all valid words
 */
export function findWordsFromCombinations(
  letterCombinations: Set<string>,
  anagramIndex: AnagramIndex
): Set<string> {
  const validWords = new Set<string>();

  for (const combination of letterCombinations) {
    const words = anagramIndex.get(combination);
    if (words) {
      for (const word of words) {
        validWords.add(word);
      }
    }
  }

  return validWords;
}

/**
 * Get statistics about the anagram index
 * @param index Anagram index
 * @returns Statistics object
 */
export function getIndexStats(index: AnagramIndex) {
  let totalWords = 0;
  let maxAnagrams = 0;
  let maxAnagramKey = '';

  for (const [key, words] of index.entries()) {
    totalWords += words.length;
    if (words.length > maxAnagrams) {
      maxAnagrams = words.length;
      maxAnagramKey = key;
    }
  }

  return {
    uniquePatterns: index.size,
    totalWords,
    averageAnagrams: totalWords / index.size,
    maxAnagrams,
    maxAnagramKey,
    maxAnagramWords: index.get(maxAnagramKey) || []
  };
}
