// Campaign mode type definitions

export interface LevelConfig {
  id: number;                    // 1-50
  rack: string;                  // Pre-defined 7-letter rack
  boardWord?: string;            // Optional board word constraint
  targetScore: number;           // Minimum score to pass
  timeLimit: number;             // Seconds allowed
  stars: {
    one: number;                 // Score threshold for 1 star
    two: number;                 // Score threshold for 2 stars
    three: number;               // Score threshold for 3 stars
  };
}

export interface LevelResult {
  levelId: number;
  completed: boolean;
  stars: 0 | 1 | 2 | 3;
  bestScore: number;
  timeUsed: number;              // Seconds taken to complete
  attempts: number;
}

export interface HintInventory {
  revealBest: number;            // Shows best possible word
  extraTime: number;             // Adds +30 seconds
  showHint: number;              // Highlights high-value letter
  eliminateLetter: number;       // Removes low-value letter
}

export interface CampaignProgress {
  version: number;               // Schema version for migrations
  currentLevel: number;          // Highest unlocked level
  totalStars: number;            // Sum of all stars earned
  levelResults: { [levelId: number]: LevelResult };
  hintInventory: HintInventory;
}

export type PowerUpType = 'revealBest' | 'extraTime' | 'showHint' | 'eliminateLetter';

export interface PowerUpConfig {
  type: PowerUpType;
  name: string;
  description: string;
  cost: number;                  // Stars needed to purchase
  icon: string;                  // Emoji or icon identifier
}
