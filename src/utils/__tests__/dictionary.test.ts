import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loadDictionary, loadLetterData } from '../dictionary';

describe('loadDictionary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load and parse dictionary successfully', async () => {
    const mockDictionaryText = 'CAT\nDOG\nBIRD';

    global.fetch = vi.fn().mockResolvedValue({
      text: vi.fn().mockResolvedValue(mockDictionaryText),
    });

    const dictionary = await loadDictionary();

    expect(dictionary).toBeInstanceOf(Set);
    expect(dictionary.has('CAT')).toBe(true);
    expect(dictionary.has('DOG')).toBe(true);
    expect(dictionary.has('BIRD')).toBe(true);
    expect(dictionary.size).toBe(3);
  });

  it('should convert words to uppercase', async () => {
    const mockDictionaryText = 'cat\ndog\nbird';

    global.fetch = vi.fn().mockResolvedValue({
      text: vi.fn().mockResolvedValue(mockDictionaryText),
    });

    const dictionary = await loadDictionary();

    expect(dictionary.has('CAT')).toBe(true);
    expect(dictionary.has('DOG')).toBe(true);
    expect(dictionary.has('BIRD')).toBe(true);
    expect(dictionary.has('cat')).toBe(false);
  });

  it('should trim whitespace from words', async () => {
    const mockDictionaryText = '  CAT  \n  DOG  \n  BIRD  ';

    global.fetch = vi.fn().mockResolvedValue({
      text: vi.fn().mockResolvedValue(mockDictionaryText),
    });

    const dictionary = await loadDictionary();

    expect(dictionary.has('CAT')).toBe(true);
    expect(dictionary.has('DOG')).toBe(true);
    expect(dictionary.has('BIRD')).toBe(true);
    expect(dictionary.size).toBe(3);
  });

  it('should filter out empty lines', async () => {
    const mockDictionaryText = 'CAT\n\nDOG\n\n\nBIRD\n';

    global.fetch = vi.fn().mockResolvedValue({
      text: vi.fn().mockResolvedValue(mockDictionaryText),
    });

    const dictionary = await loadDictionary();

    expect(dictionary.size).toBe(3);
    expect(dictionary.has('CAT')).toBe(true);
    expect(dictionary.has('DOG')).toBe(true);
    expect(dictionary.has('BIRD')).toBe(true);
  });

  it('should handle Windows line endings (\\r\\n)', async () => {
    const mockDictionaryText = 'CAT\r\nDOG\r\nBIRD';

    global.fetch = vi.fn().mockResolvedValue({
      text: vi.fn().mockResolvedValue(mockDictionaryText),
    });

    const dictionary = await loadDictionary();

    expect(dictionary.size).toBe(3);
    expect(dictionary.has('CAT')).toBe(true);
    expect(dictionary.has('DOG')).toBe(true);
    expect(dictionary.has('BIRD')).toBe(true);
  });

  it('should handle Unix line endings (\\n)', async () => {
    const mockDictionaryText = 'CAT\nDOG\nBIRD';

    global.fetch = vi.fn().mockResolvedValue({
      text: vi.fn().mockResolvedValue(mockDictionaryText),
    });

    const dictionary = await loadDictionary();

    expect(dictionary.size).toBe(3);
    expect(dictionary.has('CAT')).toBe(true);
    expect(dictionary.has('DOG')).toBe(true);
    expect(dictionary.has('BIRD')).toBe(true);
  });

  it('should handle empty dictionary', async () => {
    const mockDictionaryText = '';

    global.fetch = vi.fn().mockResolvedValue({
      text: vi.fn().mockResolvedValue(mockDictionaryText),
    });

    const dictionary = await loadDictionary();

    expect(dictionary.size).toBe(0);
  });

  it('should remove duplicate words', async () => {
    const mockDictionaryText = 'CAT\nDOG\nCAT\nBIRD\nDOG';

    global.fetch = vi.fn().mockResolvedValue({
      text: vi.fn().mockResolvedValue(mockDictionaryText),
    });

    const dictionary = await loadDictionary();

    // Set automatically removes duplicates
    expect(dictionary.size).toBe(3);
    expect(dictionary.has('CAT')).toBe(true);
    expect(dictionary.has('DOG')).toBe(true);
    expect(dictionary.has('BIRD')).toBe(true);
  });

  it('should handle fetch errors', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    await expect(loadDictionary()).rejects.toThrow('Network error');
  });

  it('should call fetch with correct URL', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      text: vi.fn().mockResolvedValue('CAT'),
    });
    global.fetch = mockFetch;

    await loadDictionary();

    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('dictionary.txt'));
  });
});

describe('loadLetterData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load and parse letter data successfully', async () => {
    const mockLetterData = {
      A: { score: 1, count: 9 },
      B: { score: 3, count: 2 },
      C: { score: 3, count: 2 },
    };

    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockLetterData),
    });

    const letterData = await loadLetterData();

    expect(letterData).toEqual(mockLetterData);
    expect(letterData.A).toEqual({ score: 1, count: 9 });
    expect(letterData.B).toEqual({ score: 3, count: 2 });
    expect(letterData.C).toEqual({ score: 3, count: 2 });
  });

  it('should handle all 26 letters', async () => {
    const mockLetterData = {
      A: { score: 1, count: 9 },
      B: { score: 3, count: 2 },
      C: { score: 3, count: 2 },
      D: { score: 2, count: 4 },
      E: { score: 1, count: 12 },
      F: { score: 4, count: 2 },
      G: { score: 2, count: 3 },
      H: { score: 4, count: 2 },
      I: { score: 1, count: 9 },
      J: { score: 8, count: 1 },
      K: { score: 5, count: 1 },
      L: { score: 1, count: 4 },
      M: { score: 3, count: 2 },
      N: { score: 1, count: 6 },
      O: { score: 1, count: 8 },
      P: { score: 3, count: 2 },
      Q: { score: 10, count: 1 },
      R: { score: 1, count: 6 },
      S: { score: 1, count: 4 },
      T: { score: 1, count: 6 },
      U: { score: 1, count: 4 },
      V: { score: 4, count: 2 },
      W: { score: 4, count: 2 },
      X: { score: 8, count: 1 },
      Y: { score: 4, count: 2 },
      Z: { score: 10, count: 1 },
    };

    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockLetterData),
    });

    const letterData = await loadLetterData();

    expect(Object.keys(letterData).length).toBe(26);
    expect(letterData.Q).toEqual({ score: 10, count: 1 });
    expect(letterData.Z).toEqual({ score: 10, count: 1 });
  });

  it('should handle empty letter data', async () => {
    const mockLetterData = {};

    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockLetterData),
    });

    const letterData = await loadLetterData();

    expect(letterData).toEqual({});
    expect(Object.keys(letterData).length).toBe(0);
  });

  it('should handle fetch errors', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    await expect(loadLetterData()).rejects.toThrow('Network error');
  });

  it('should handle JSON parse errors', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
    });

    await expect(loadLetterData()).rejects.toThrow('Invalid JSON');
  });

  it('should call fetch with correct URL', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({}),
    });
    global.fetch = mockFetch;

    await loadLetterData();

    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('letter_data.json'));
  });

  it('should preserve letter data structure', async () => {
    const mockLetterData = {
      A: { score: 1, count: 9 },
      Z: { score: 10, count: 1 },
    };

    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockLetterData),
    });

    const letterData = await loadLetterData();

    expect(letterData.A).toHaveProperty('score');
    expect(letterData.A).toHaveProperty('count');
    expect(typeof letterData.A.score).toBe('number');
    expect(typeof letterData.A.count).toBe('number');
  });
});
