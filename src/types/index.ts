// TypeScript types for Scrabble Word Builder

export interface LetterData {
  score: number;
  count: number;
}

export interface LetterDataMap {
  [letter: string]: LetterData;
}

export interface WordResult {
  word: string;
  score: number;
}

export interface MultiWordResult {
  bestWord: WordResult;
  allWords: WordResult[];
  totalFound: number;
}

export interface ValidationError {
  valid: false;
  error: string;
}

export interface ValidationSuccess {
  valid: true;
}

export type ValidationResult = ValidationSuccess | ValidationError;

// Campaign mode types
export type {
  LevelConfig,
  LevelResult,
  HintInventory,
  CampaignProgress,
  PowerUpType,
  PowerUpConfig
} from './campaign';
