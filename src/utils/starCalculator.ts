import { LevelConfig } from '../types/campaign';

/**
 * Calculate the number of stars earned based on score
 * @param score Player's score
 * @param levelConfig Level configuration with star thresholds
 * @returns Number of stars earned (0-3)
 */
export function calculateStars(score: number, levelConfig: LevelConfig): 0 | 1 | 2 | 3 {
  if (score >= levelConfig.stars.three) return 3;
  if (score >= levelConfig.stars.two) return 2;
  if (score >= levelConfig.stars.one) return 1;
  return 0;
}

/**
 * Calculate time bonus for score
 * @param timeUsed Time taken in seconds
 * @param timeLimit Total time limit in seconds
 * @returns Bonus percentage (0, 0.10, or 0.20)
 */
export function calculateTimeBonus(timeUsed: number, timeLimit: number): number {
  const timeRemaining = timeLimit - timeUsed;
  const percentRemaining = timeRemaining / timeLimit;

  if (percentRemaining >= 0.75) return 0.20; // 20% bonus
  if (percentRemaining >= 0.50) return 0.10; // 10% bonus
  return 0;
}

/**
 * Calculate final score with time bonus
 * @param baseScore Base word score
 * @param timeUsed Time taken in seconds
 * @param timeLimit Total time limit in seconds
 * @returns Final score with bonus applied
 */
export function calculateFinalScore(
  baseScore: number,
  timeUsed: number,
  timeLimit: number
): number {
  const timeBonus = calculateTimeBonus(timeUsed, timeLimit);
  return Math.floor(baseScore * (1 + timeBonus));
}

/**
 * Get star threshold information for display
 * @param levelConfig Level configuration
 * @returns Object with threshold values and percentages
 */
export function getStarThresholds(levelConfig: LevelConfig) {
  const { one, two, three } = levelConfig.stars;
  return {
    oneStar: {
      score: one,
      percentage: 100
    },
    twoStars: {
      score: two,
      percentage: Math.round((two / one) * 100)
    },
    threeStars: {
      score: three,
      percentage: Math.round((three / one) * 100)
    }
  };
}

/**
 * Check if level is completed (1+ stars)
 * @param score Player's score
 * @param levelConfig Level configuration
 * @returns True if level is completed
 */
export function isLevelCompleted(score: number, levelConfig: LevelConfig): boolean {
  return score >= levelConfig.stars.one;
}

/**
 * Get score needed for next star
 * @param currentScore Current score
 * @param levelConfig Level configuration
 * @returns Score needed for next star, or null if max stars reached
 */
export function getScoreForNextStar(
  currentScore: number,
  levelConfig: LevelConfig
): number | null {
  const currentStars = calculateStars(currentScore, levelConfig);

  switch (currentStars) {
    case 0:
      return levelConfig.stars.one;
    case 1:
      return levelConfig.stars.two;
    case 2:
      return levelConfig.stars.three;
    case 3:
      return null; // Already max stars
  }
}

/**
 * Calculate progress percentage towards target score
 * @param currentScore Current score
 * @param targetScore Target score (1 star threshold)
 * @returns Progress percentage (0-100+)
 */
export function calculateProgress(currentScore: number, targetScore: number): number {
  if (targetScore <= 0) return 0;
  return Math.round((currentScore / targetScore) * 100);
}
