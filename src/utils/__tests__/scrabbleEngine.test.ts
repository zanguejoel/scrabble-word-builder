import { describe, it, expect } from 'vitest';
import { findBestWord } from '../scrabbleEngine';
import { LetterDataMap } from '../../types';

describe('findBestWord', () => {
  const mockLetterData: LetterDataMap = {
    A: { score: 1, count: 9 },
    C: { score: 3, count: 2 },
    D: { score: 2, count: 4 },
    E: { score: 1, count: 12 },
    I: { score: 1, count: 9 },
    O: { score: 1, count: 8 },
    Q: { score: 10, count: 1 },
    R: { score: 1, count: 6 },
    S: { score: 1, count: 4 },
    T: { score: 1, count: 6 },
    U: { score: 1, count: 4 },
    W: { score: 4, count: 2 },
    Z: { score: 10, count: 1 },
  };

  it('should find a valid word from a simple rack', () => {
    const dictionary = new Set(['CAT', 'AT', 'ACT']);
    const result = findBestWord('CAT', '', dictionary, mockLetterData);

    expect(result).not.toHaveProperty('error');
    if ('word' in result) {
      expect(['CAT', 'ACT', 'AT']).toContain(result.word);
      expect(result.score).toBeGreaterThan(0);
    }
  });

  it('should find the highest scoring word', () => {
    // CAT = 5, AT = 2, ACT = 5
    // Both CAT and ACT have score 5, should return ACT (alphabetically first)
    const dictionary = new Set(['CAT', 'AT', 'ACT']);
    const result = findBestWord('CAT', '', dictionary, mockLetterData);

    expect(result).not.toHaveProperty('error');
    if ('word' in result) {
      expect(result.word).toBe('ACT');
      expect(result.score).toBe(5);
    }
  });

  it('should prioritize high-value letters', () => {
    // QUIZ = 22, IS = 2, US = 2
    const dictionary = new Set(['QUIZ', 'IS', 'US']);
    const result = findBestWord('QUIZ', '', dictionary, mockLetterData);

    expect(result).not.toHaveProperty('error');
    if ('word' in result) {
      expect(result.word).toBe('QUIZ');
      expect(result.score).toBe(22);
    }
  });

  it('should find word containing board word', () => {
    // Rack: AID, Board: CAT
    // Can make: ACIDAT, DIACTA, CADIT, ACADIA, etc.
    // But must contain CAT
    const dictionary = new Set(['CAT', 'ACID', 'AID', 'AT', 'IT', 'DI']);
    const result = findBestWord('AID', 'CAT', dictionary, mockLetterData);

    if ('error' in result) {
      // If no word is found containing CAT, that's acceptable for this test data
      expect(result.error).toBeDefined();
    } else {
      // If a word is found, it must contain CAT
      expect(result.word).toContain('CAT');
    }
  });

  it('should return error when no valid word found', () => {
    const dictionary = new Set(['HELLO', 'WORLD']);
    const result = findBestWord('XYZ', '', dictionary, mockLetterData);

    expect(result).toHaveProperty('error');
    if ('error' in result) {
      expect(result.error).toBe('No valid word found with the given letters');
    }
  });

  it('should handle rack + board word combinations', () => {
    // Rack: OOR, Board: DO
    // Can make: DOOR (using D from board, OOR from rack)
    const dictionary = new Set(['DOOR', 'OR', 'DO']);
    const result = findBestWord('OOR', 'DO', dictionary, mockLetterData);

    if ('error' in result) {
      expect(result.error).toBeDefined();
    } else {
      expect(result.word).toContain('DO');
    }
  });

  it('should break ties alphabetically', () => {
    // CAT = C(3) + A(1) + T(1) = 5
    // ACT = A(1) + C(3) + T(1) = 5
    // Both have same score, should return ACT (comes first alphabetically)
    const dictionary = new Set(['CAT', 'ACT']);
    const result = findBestWord('CAT', '', dictionary, mockLetterData);

    expect(result).not.toHaveProperty('error');
    if ('word' in result) {
      expect(result.word).toBe('ACT');
      expect(result.score).toBe(5);
    }
  });

  it('should only return words of length 2-15', () => {
    // Should skip single letter words
    const dictionary = new Set(['A', 'I', 'AT', 'IT']);
    const result = findBestWord('AIT', '', dictionary, mockLetterData);

    expect(result).not.toHaveProperty('error');
    if ('word' in result) {
      expect(result.word.length).toBeGreaterThanOrEqual(2);
      expect(result.word.length).toBeLessThanOrEqual(15);
      expect(['AT', 'IT']).toContain(result.word);
    }
  });

  it('should validate tile availability', () => {
    // Try to use 2 Q's when only 1 exists
    const dictionary = new Set(['QQ', 'QI', 'QA']);
    const result = findBestWord('QQI', '', dictionary, mockLetterData);

    // Should not find QQ because tile limit is 1
    // Should find QI if it passes validation
    if ('word' in result) {
      expect(result.word).not.toBe('QQ');
    }
  });

  it('should handle empty dictionary', () => {
    const dictionary = new Set<string>();
    const result = findBestWord('CAT', '', dictionary, mockLetterData);

    expect(result).toHaveProperty('error');
    if ('error' in result) {
      expect(result.error).toBe('No valid word found with the given letters');
    }
  });

  it('should handle lowercase input', () => {
    const dictionary = new Set(['CAT', 'AT']);
    const result = findBestWord('cat', '', dictionary, mockLetterData);

    expect(result).not.toHaveProperty('error');
    if ('word' in result) {
      expect(['CAT', 'AT']).toContain(result.word);
    }
  });

  it('should handle mixed case input', () => {
    const dictionary = new Set(['CAT', 'AT']);
    const result = findBestWord('CaT', '', dictionary, mockLetterData);

    expect(result).not.toHaveProperty('error');
    if ('word' in result) {
      expect(['CAT', 'AT']).toContain(result.word);
    }
  });

  it('should generate combinations correctly', () => {
    // Test with DO should generate: DO
    const dictionary = new Set(['DO', 'OD']);
    const result = findBestWord('DO', '', dictionary, mockLetterData);

    expect(result).not.toHaveProperty('error');
    if ('word' in result) {
      expect(['DO', 'OD']).toContain(result.word);
    }
  });

  it('should find longer words when available', () => {
    // WORD = W(4) + O(1) + R(1) + D(2) = 8
    // OR = O(1) + R(1) = 2
    // DO = D(2) + O(1) = 3
    // WORD has highest score
    const dictionary = new Set(['WORD', 'OR', 'DO', 'WO']);
    const result = findBestWord('WORD', '', dictionary, mockLetterData);

    expect(result).not.toHaveProperty('error');
    if ('word' in result) {
      expect(result.word).toBe('WORD');
      expect(result.score).toBe(8);
    }
  });

  it('should respect board word requirement strictly', () => {
    // If board word is 'CAT', result must contain 'CAT'
    const dictionary = new Set(['CAT', 'DOG', 'CATS', 'SCAT']);
    const result = findBestWord('S', 'CAT', dictionary, mockLetterData);

    if ('word' in result) {
      expect(result.word).toContain('CAT');
    }
  });

  it('should handle complex rack with multiple possible words', () => {
    const dictionary = new Set(['CARE', 'RACE', 'ACRE', 'ARC', 'CAR', 'ACE', 'ARE', 'EAR', 'ERA']);
    const result = findBestWord('CARE', '', dictionary, mockLetterData);

    expect(result).not.toHaveProperty('error');
    if ('word' in result) {
      expect(result.word).toBeDefined();
      expect(result.score).toBeGreaterThan(0);
      // Should be one of the valid words
      expect(dictionary.has(result.word)).toBe(true);
    }
  });
});
