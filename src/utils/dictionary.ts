import { LetterDataMap } from '../types';
import { buildAnagramIndex, AnagramIndex } from './anagramIndex';

export async function loadDictionary(): Promise<Set<string>> {
  const basePath = import.meta.env.BASE_URL;
  const response = await fetch(`${basePath}dictionary.json`);
  const words: string[] = await response.json();
  return new Set(words);
}

/**
 * Load dictionary and build anagram index for fast word lookup
 * @returns Object containing both dictionary Set and AnagramIndex
 */
export async function loadDictionaryWithIndex(): Promise<{
  dictionary: Set<string>;
  anagramIndex: AnagramIndex;
}> {
  const dictionary = await loadDictionary();
  console.log('Building anagram index from', dictionary.size, 'words...');
  const startTime = performance.now();
  const anagramIndex = buildAnagramIndex(dictionary);
  const endTime = performance.now();
  console.log(`Anagram index built in ${(endTime - startTime).toFixed(2)}ms`);
  console.log(`Index size: ${anagramIndex.size} unique letter patterns`);
  return { dictionary, anagramIndex };
}

export async function loadLetterData(): Promise<LetterDataMap> {
  const basePath = import.meta.env.BASE_URL;
  const response = await fetch(`${basePath}letter_data.json`);
  return await response.json();
}
