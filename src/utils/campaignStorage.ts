import { CampaignProgress, LevelResult } from '../types/campaign';

const STORAGE_KEY = 'scrabble_campaign_progress';
const CURRENT_VERSION = 1;

/**
 * Initialize default campaign progress
 */
export function getDefaultProgress(): CampaignProgress {
  return {
    version: CURRENT_VERSION,
    currentLevel: 1,
    totalStars: 0,
    levelResults: {},
    hintInventory: {
      revealBest: 0,
      extraTime: 0,
      showHint: 0,
      eliminateLetter: 0
    }
  };
}

/**
 * Load campaign progress from localStorage
 * @returns Campaign progress or default if not found/invalid
 */
export function loadProgress(): CampaignProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return getDefaultProgress();
    }

    const progress: CampaignProgress = JSON.parse(stored);

    // Validate schema
    if (!isValidProgress(progress)) {
      console.warn('Invalid campaign progress format, resetting to default');
      return getDefaultProgress();
    }

    // Handle version migrations if needed
    if (progress.version < CURRENT_VERSION) {
      return migrateProgress(progress);
    }

    return progress;
  } catch (error) {
    console.error('Error loading campaign progress:', error);
    return getDefaultProgress();
  }
}

/**
 * Save campaign progress to localStorage
 * @param progress Campaign progress to save
 */
export function saveProgress(progress: CampaignProgress): void {
  try {
    progress.version = CURRENT_VERSION;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving campaign progress:', error);
  }
}

/**
 * Clear all campaign progress
 */
export function clearProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing campaign progress:', error);
  }
}

/**
 * Validate campaign progress structure
 * @param progress Progress object to validate
 * @returns True if valid, false otherwise
 */
function isValidProgress(progress: any): progress is CampaignProgress {
  return (
    progress &&
    typeof progress === 'object' &&
    typeof progress.version === 'number' &&
    typeof progress.currentLevel === 'number' &&
    typeof progress.totalStars === 'number' &&
    typeof progress.levelResults === 'object' &&
    typeof progress.hintInventory === 'object' &&
    typeof progress.hintInventory.revealBest === 'number' &&
    typeof progress.hintInventory.extraTime === 'number' &&
    typeof progress.hintInventory.showHint === 'number' &&
    typeof progress.hintInventory.eliminateLetter === 'number'
  );
}

/**
 * Migrate progress from older versions
 * @param progress Old progress object
 * @returns Migrated progress
 */
function migrateProgress(progress: CampaignProgress): CampaignProgress {
  // Future migrations can be added here
  // For now, just update version and ensure all fields exist
  const migrated = {
    ...getDefaultProgress(),
    ...progress,
    version: CURRENT_VERSION
  };

  console.log(`Migrated campaign progress from v${progress.version} to v${CURRENT_VERSION}`);
  return migrated;
}

/**
 * Get level result by ID
 * @param progress Campaign progress
 * @param levelId Level ID to get
 * @returns Level result or undefined if not found
 */
export function getLevelResult(
  progress: CampaignProgress,
  levelId: number
): LevelResult | undefined {
  return progress.levelResults[levelId];
}

/**
 * Update level result
 * @param progress Campaign progress
 * @param levelResult New level result
 * @returns Updated campaign progress
 */
export function updateLevelResult(
  progress: CampaignProgress,
  levelResult: LevelResult
): CampaignProgress {
  const existing = progress.levelResults[levelResult.levelId];
  const isFirstCompletion = !existing || !existing.completed;

  // Update level result (keep best score)
  const updatedResult: LevelResult = {
    ...levelResult,
    bestScore: existing
      ? Math.max(existing.bestScore, levelResult.bestScore)
      : levelResult.bestScore,
    stars: (existing
      ? Math.max(existing.stars, levelResult.stars)
      : levelResult.stars) as 0 | 1 | 2 | 3,
    attempts: existing ? existing.attempts + 1 : 1
  };

  // Calculate star difference for totalStars
  const oldStars = existing?.stars || 0;
  const newStars = updatedResult.stars;
  const starDifference = newStars - oldStars;

  // Unlock next level if this level is newly completed
  const nextLevel = isFirstCompletion && levelResult.completed
    ? levelResult.levelId + 1
    : progress.currentLevel;

  return {
    ...progress,
    currentLevel: Math.max(progress.currentLevel, nextLevel),
    totalStars: progress.totalStars + starDifference,
    levelResults: {
      ...progress.levelResults,
      [levelResult.levelId]: updatedResult
    }
  };
}

/**
 * Check if a level is unlocked
 * @param progress Campaign progress
 * @param levelId Level ID to check
 * @returns True if unlocked, false otherwise
 */
export function isLevelUnlocked(progress: CampaignProgress, levelId: number): boolean {
  return levelId <= progress.currentLevel;
}

/**
 * Use a power-up
 * @param progress Campaign progress
 * @param powerUpType Power-up type to use
 * @returns Updated campaign progress or null if not enough inventory
 */
export function usePowerUp(
  progress: CampaignProgress,
  powerUpType: keyof CampaignProgress['hintInventory']
): CampaignProgress | null {
  if (progress.hintInventory[powerUpType] <= 0) {
    return null;
  }

  return {
    ...progress,
    hintInventory: {
      ...progress.hintInventory,
      [powerUpType]: progress.hintInventory[powerUpType] - 1
    }
  };
}

/**
 * Purchase a power-up with stars
 * @param progress Campaign progress
 * @param powerUpType Power-up type to purchase
 * @param cost Star cost
 * @returns Updated campaign progress or null if not enough stars
 */
export function purchasePowerUp(
  progress: CampaignProgress,
  powerUpType: keyof CampaignProgress['hintInventory'],
  cost: number
): CampaignProgress | null {
  if (progress.totalStars < cost) {
    return null;
  }

  return {
    ...progress,
    totalStars: progress.totalStars - cost,
    hintInventory: {
      ...progress.hintInventory,
      [powerUpType]: progress.hintInventory[powerUpType] + 1
    }
  };
}
