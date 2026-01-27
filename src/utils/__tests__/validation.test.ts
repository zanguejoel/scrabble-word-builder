import { describe, it, expect } from 'vitest';
import {
  validateRack,
  validateBoardWord,
  validateWordLength,
  validateTileAvailability,
} from '../validation';
import { LetterDataMap } from '../../types';

describe('validateRack', () => {
  it('should accept valid rack with 1-7 letters', () => {
    expect(validateRack('A')).toEqual({ valid: true });
    expect(validateRack('CAT')).toEqual({ valid: true });
    expect(validateRack('AIDOORW')).toEqual({ valid: true });
  });

  it('should reject empty rack', () => {
    const result = validateRack('');
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toBe('Rack must contain 1-7 letters');
    }
  });

  it('should reject rack with more than 7 letters', () => {
    const result = validateRack('AIDOORWZ');
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toBe('Rack must contain 1-7 letters');
    }
  });

  it('should reject rack with numbers', () => {
    const result = validateRack('CAT123');
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toBe('Rack must contain only letters');
    }
  });

  it('should reject rack with special characters', () => {
    const result = validateRack('CAT-DOG');
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toBe('Rack must contain only letters');
    }
  });

  it('should accept both uppercase and lowercase letters', () => {
    expect(validateRack('cat')).toEqual({ valid: true });
    expect(validateRack('CAT')).toEqual({ valid: true });
    expect(validateRack('CaT')).toEqual({ valid: true });
  });
});

describe('validateBoardWord', () => {
  it('should accept empty board word', () => {
    expect(validateBoardWord('')).toEqual({ valid: true });
  });

  it('should accept valid board word with letters', () => {
    expect(validateBoardWord('CAT')).toEqual({ valid: true });
    expect(validateBoardWord('WIZARD')).toEqual({ valid: true });
  });

  it('should reject board word with numbers', () => {
    const result = validateBoardWord('CAT123');
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toBe('Board word must contain only letters');
    }
  });

  it('should reject board word with special characters', () => {
    const result = validateBoardWord('CAT-DOG');
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toBe('Board word must contain only letters');
    }
  });

  it('should accept both uppercase and lowercase letters', () => {
    expect(validateBoardWord('cat')).toEqual({ valid: true });
    expect(validateBoardWord('CAT')).toEqual({ valid: true });
    expect(validateBoardWord('CaT')).toEqual({ valid: true });
  });
});

describe('validateWordLength', () => {
  it('should accept words with 2-15 characters', () => {
    expect(validateWordLength('AT')).toEqual({ valid: true });
    expect(validateWordLength('CAT')).toEqual({ valid: true });
    expect(validateWordLength('ABCDEFGHIJKLMNO')).toEqual({ valid: true });
  });

  it('should reject single character words', () => {
    const result = validateWordLength('A');
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toBe('Word must be 2-15 letters long');
    }
  });

  it('should reject words longer than 15 characters', () => {
    const result = validateWordLength('ABCDEFGHIJKLMNOP');
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toBe('Word must be 2-15 letters long');
    }
  });

  it('should reject empty string', () => {
    const result = validateWordLength('');
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toBe('Word must be 2-15 letters long');
    }
  });
});

describe('validateTileAvailability', () => {
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
    W: { score: 4, count: 2 },
    Z: { score: 10, count: 1 },
  };

  it('should accept word when tiles are available in rack', () => {
    const result = validateTileAvailability('CAT', 'CAT', '', mockLetterData);
    expect(result).toEqual({ valid: true });
  });

  it('should accept word when tiles are available in rack + board', () => {
    // ACID needs: A(1), C(1), I(1), D(1)
    // Available: rack "AID" (A, I, D) + board "C" (C) = A(1), C(1), I(1), D(1)
    const result = validateTileAvailability('ACID', 'AID', 'C', mockLetterData);
    expect(result).toEqual({ valid: true });
  });

  it('should reject when not enough tiles in rack', () => {
    const result = validateTileAvailability('CAAT', 'CAT', '', mockLetterData);
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toContain("Not enough 'A' tiles");
      expect(result.error).toContain('Need 2, have 1');
    }
  });

  it('should reject when exceeding game tile limit', () => {
    // Trying to use 2 Q's when only 1 exists in the game
    const result = validateTileAvailability('QQ', 'QQ', '', mockLetterData);
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toContain("Too many 'Q' tiles used");
      expect(result.error).toContain('Limit is 1, using 2');
    }
  });

  it('should handle case-insensitive validation', () => {
    const result = validateTileAvailability('cat', 'CAT', '', mockLetterData);
    expect(result).toEqual({ valid: true });
  });

  it('should correctly count tiles from both rack and board', () => {
    // CARE needs: C(1), A(1), R(1), E(1)
    // Available: rack "ARE" + board "C" = C(1), A(1), R(1), E(1)
    const result = validateTileAvailability('CARE', 'ARE', 'C', mockLetterData);
    expect(result).toEqual({ valid: true });
  });

  it('should reject when combined rack + board exceeds game limit', () => {
    // Trying to use rack "ZZ" + board "Z" = 3 Z's when only 1 exists
    const result = validateTileAvailability('ZZZ', 'ZZ', 'Z', mockLetterData);
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toContain("Too many 'Z' tiles used");
    }
  });

  it('should handle missing letter data gracefully', () => {
    const limitedLetterData: LetterDataMap = {
      A: { score: 1, count: 9 },
    };
    const result = validateTileAvailability('AB', 'AB', '', limitedLetterData);
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toContain('Limit is 0');
    }
  });
});
