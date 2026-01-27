import { LetterDataMap } from '../types';

export async function loadDictionary(): Promise<Set<string>> {
  const basePath = import.meta.env.BASE_URL;
  const response = await fetch(`${basePath}dictionary.txt`);
  const text = await response.text();
  const words = text
    .split(/\r?\n/)
    .map(w => w.trim().toUpperCase())
    .filter(Boolean);
  return new Set(words);
}

export async function loadLetterData(): Promise<LetterDataMap> {
  const basePath = import.meta.env.BASE_URL;
  const response = await fetch(`${basePath}letter_data.json`);
  return await response.json();
}
