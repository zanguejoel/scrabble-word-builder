import { LetterDataMap } from '../types';

export function scoreWord(word: string, letterData: LetterDataMap): number {
  return word
    .toUpperCase()
    .split('')
    .reduce((sum, char) => sum + (letterData[char]?.score || 0), 0);
}

export function getLetterBreakdown(word: string, letterData: LetterDataMap) {
  return word
    .toUpperCase()
    .split('')
    .map(char => ({
      letter: char,
      score: letterData[char]?.score || 0
    }));
}
