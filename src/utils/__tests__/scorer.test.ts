import { describe, it, expect } from 'vitest';
import { scoreWord, getLetterBreakdown } from '../scorer';
import { LetterDataMap } from '../../types';

describe('scoreWord', () => {
  const mockLetterData: LetterDataMap = {
    A: { score: 1, count: 9 },
    C: { score: 3, count: 2 },
    D: { score: 2, count: 4 },
    E: { score: 1, count: 12 },
    I: { score: 1, count: 9 },
    O: { score: 1, count: 8 },
    Q: { score: 10, count: 1 },
    R: { score: 1, count: 6 },
    T: { score: 1, count: 6 },
    U: { score: 1, count: 4 },
    W: { score: 4, count: 2 },
    Z: { score: 10, count: 1 },
  };

  it('should calculate score for a simple word', () => {
    // CAT = C(3) + A(1) + T(1) = 5
    expect(scoreWord('CAT', mockLetterData)).toBe(5);
  });

  it('should calculate score for a high-value word', () => {
    // QUIZ = Q(10) + U(1) + I(1) + Z(10) = 22
    expect(scoreWord('QUIZ', mockLetterData)).toBe(22);
  });

  it('should calculate score for WORD', () => {
    // WORD = W(4) + O(1) + R(1) + D(2) = 8
    expect(scoreWord('WORD', mockLetterData)).toBe(8);
  });

  it('should handle lowercase letters', () => {
    // cat = C(3) + A(1) + T(1) = 5
    expect(scoreWord('cat', mockLetterData)).toBe(5);
  });

  it('should handle mixed case letters', () => {
    // CaT = C(3) + A(1) + T(1) = 5
    expect(scoreWord('CaT', mockLetterData)).toBe(5);
  });

  it('should return 0 for empty string', () => {
    expect(scoreWord('', mockLetterData)).toBe(0);
  });

  it('should return 0 for unknown letters', () => {
    const limitedLetterData: LetterDataMap = {
      A: { score: 1, count: 9 },
    };
    // B is not in the letter data, so it should be scored as 0
    expect(scoreWord('AB', limitedLetterData)).toBe(1);
  });

  it('should handle all letters being unknown', () => {
    const emptyLetterData: LetterDataMap = {};
    expect(scoreWord('CAT', emptyLetterData)).toBe(0);
  });

  it('should calculate score for longer words', () => {
    // ACQUIRE = A(1) + C(3) + Q(10) + U(1) + I(1) + R(1) + E(1) = 18
    expect(scoreWord('ACQUIRE', mockLetterData)).toBe(18);
  });
});

describe('getLetterBreakdown', () => {
  const mockLetterData: LetterDataMap = {
    A: { score: 1, count: 9 },
    C: { score: 3, count: 2 },
    D: { score: 2, count: 4 },
    O: { score: 1, count: 8 },
    R: { score: 1, count: 6 },
    T: { score: 1, count: 6 },
    W: { score: 4, count: 2 },
  };

  it('should return correct breakdown for WORD', () => {
    const breakdown = getLetterBreakdown('WORD', mockLetterData);
    expect(breakdown).toEqual([
      { letter: 'W', score: 4 },
      { letter: 'O', score: 1 },
      { letter: 'R', score: 1 },
      { letter: 'D', score: 2 },
    ]);
  });

  it('should return correct breakdown for CAT', () => {
    const breakdown = getLetterBreakdown('CAT', mockLetterData);
    expect(breakdown).toEqual([
      { letter: 'C', score: 3 },
      { letter: 'A', score: 1 },
      { letter: 'T', score: 1 },
    ]);
  });

  it('should handle lowercase letters', () => {
    const breakdown = getLetterBreakdown('cat', mockLetterData);
    expect(breakdown).toEqual([
      { letter: 'C', score: 3 },
      { letter: 'A', score: 1 },
      { letter: 'T', score: 1 },
    ]);
  });

  it('should handle mixed case letters', () => {
    const breakdown = getLetterBreakdown('CaT', mockLetterData);
    expect(breakdown).toEqual([
      { letter: 'C', score: 3 },
      { letter: 'A', score: 1 },
      { letter: 'T', score: 1 },
    ]);
  });

  it('should return empty array for empty string', () => {
    const breakdown = getLetterBreakdown('', mockLetterData);
    expect(breakdown).toEqual([]);
  });

  it('should handle unknown letters by scoring them as 0', () => {
    const limitedLetterData: LetterDataMap = {
      A: { score: 1, count: 9 },
    };
    const breakdown = getLetterBreakdown('AB', limitedLetterData);
    expect(breakdown).toEqual([
      { letter: 'A', score: 1 },
      { letter: 'B', score: 0 },
    ]);
  });

  it('should handle repeated letters', () => {
    const breakdown = getLetterBreakdown('DOOR', mockLetterData);
    expect(breakdown).toEqual([
      { letter: 'D', score: 2 },
      { letter: 'O', score: 1 },
      { letter: 'O', score: 1 },
      { letter: 'R', score: 1 },
    ]);
  });

  it('should maintain letter order', () => {
    const breakdown = getLetterBreakdown('DCBA', mockLetterData);
    expect(breakdown).toEqual([
      { letter: 'D', score: 2 },
      { letter: 'C', score: 3 },
      { letter: 'B', score: 0 }, // B not in data
      { letter: 'A', score: 1 },
    ]);
  });
});
