import { LevelConfig } from '../types/campaign';

/**
 * 50 Campaign Levels with Progressive Difficulty
 *
 * Difficulty Tiers:
 * - Levels 1-10: Beginner (common letters, no board words)
 * - Levels 11-20: Easy-Intermediate (medium letters, simple board words)
 * - Levels 21-30: Intermediate (high-value letters, moderate board words)
 * - Levels 31-40: Advanced (very high-value letters, complex board words)
 * - Levels 41-50: Expert (premium letters, tight time limits)
 */

export const LEVELS: LevelConfig[] = [
  // Levels 1-10: Beginner
  {
    id: 1,
    rack: "AIDOORS",
    boardWord: "",
    targetScore: 10,
    timeLimit: 90,
    stars: { one: 10, two: 12, three: 15 }
  },
  {
    id: 2,
    rack: "RETAILS",
    boardWord: "",
    targetScore: 12,
    timeLimit: 90,
    stars: { one: 12, two: 14, three: 18 }
  },
  {
    id: 3,
    rack: "RESTORE",
    boardWord: "",
    targetScore: 14,
    timeLimit: 85,
    stars: { one: 14, two: 17, three: 21 }
  },
  {
    id: 4,
    rack: "LESSONS",
    boardWord: "",
    targetScore: 16,
    timeLimit: 85,
    stars: { one: 16, two: 19, three: 24 }
  },
  {
    id: 5,
    rack: "EASTERN",
    boardWord: "",
    targetScore: 18,
    timeLimit: 80,
    stars: { one: 18, two: 22, three: 27 }
  },
  {
    id: 6,
    rack: "RELATES",
    boardWord: "",
    targetScore: 20,
    timeLimit: 80,
    stars: { one: 20, two: 24, three: 30 }
  },
  {
    id: 7,
    rack: "INTERNS",
    boardWord: "",
    targetScore: 22,
    timeLimit: 75,
    stars: { one: 22, two: 26, three: 33 }
  },
  {
    id: 8,
    rack: "AILERON",
    boardWord: "",
    targetScore: 23,
    timeLimit: 75,
    stars: { one: 23, two: 28, three: 35 }
  },
  {
    id: 9,
    rack: "RENTALS",
    boardWord: "",
    targetScore: 24,
    timeLimit: 70,
    stars: { one: 24, two: 29, three: 36 }
  },
  {
    id: 10,
    rack: "RETAINS",
    boardWord: "",
    targetScore: 25,
    timeLimit: 70,
    stars: { one: 25, two: 30, three: 38 }
  },

  // Levels 11-20: Easy-Intermediate
  {
    id: 11,
    rack: "DRAPING",
    boardWord: "",
    targetScore: 27,
    timeLimit: 75,
    stars: { one: 27, two: 32, three: 41 }
  },
  {
    id: 12,
    rack: "BLARING",
    boardWord: "BAR",
    targetScore: 30,
    timeLimit: 70,
    stars: { one: 30, two: 36, three: 45 }
  },
  {
    id: 13,
    rack: "COMBING",
    boardWord: "",
    targetScore: 32,
    timeLimit: 70,
    stars: { one: 32, two: 38, three: 48 }
  },
  {
    id: 14,
    rack: "DIAGRAM",
    boardWord: "DIG",
    targetScore: 33,
    timeLimit: 65,
    stars: { one: 33, two: 40, three: 50 }
  },
  {
    id: 15,
    rack: "PACKING",
    boardWord: "",
    targetScore: 34,
    timeLimit: 65,
    stars: { one: 34, two: 41, three: 51 }
  },
  {
    id: 16,
    rack: "MEDICAL",
    boardWord: "CAL",
    targetScore: 35,
    timeLimit: 60,
    stars: { one: 35, two: 42, three: 53 }
  },
  {
    id: 17,
    rack: "CAMPING",
    boardWord: "",
    targetScore: 36,
    timeLimit: 60,
    stars: { one: 36, two: 43, three: 54 }
  },
  {
    id: 18,
    rack: "DOLPHIN",
    boardWord: "DIP",
    targetScore: 38,
    timeLimit: 60,
    stars: { one: 38, two: 46, three: 57 }
  },
  {
    id: 19,
    rack: "COMPACT",
    boardWord: "",
    targetScore: 39,
    timeLimit: 60,
    stars: { one: 39, two: 47, three: 59 }
  },
  {
    id: 20,
    rack: "DRAPING",
    boardWord: "RAP",
    targetScore: 40,
    timeLimit: 60,
    stars: { one: 40, two: 48, three: 60 }
  },

  // Levels 21-30: Intermediate
  {
    id: 21,
    rack: "HALFWAY",
    boardWord: "",
    targetScore: 42,
    timeLimit: 60,
    stars: { one: 42, two: 50, three: 63 }
  },
  {
    id: 22,
    rack: "VIEWING",
    boardWord: "VIEW",
    targetScore: 44,
    timeLimit: 55,
    stars: { one: 44, two: 53, three: 66 }
  },
  {
    id: 23,
    rack: "HALFWAY",
    boardWord: "WAY",
    targetScore: 46,
    timeLimit: 55,
    stars: { one: 46, two: 55, three: 69 }
  },
  {
    id: 24,
    rack: "FLOWING",
    boardWord: "",
    targetScore: 48,
    timeLimit: 50,
    stars: { one: 48, two: 58, three: 72 }
  },
  {
    id: 25,
    rack: "GRAVITY",
    boardWord: "GRIT",
    targetScore: 50,
    timeLimit: 50,
    stars: { one: 50, two: 60, three: 75 }
  },
  {
    id: 26,
    rack: "HOWEVER",
    boardWord: "",
    targetScore: 52,
    timeLimit: 50,
    stars: { one: 52, two: 62, three: 78 }
  },
  {
    id: 27,
    rack: "FLOWING",
    boardWord: "GLOW",
    targetScore: 54,
    timeLimit: 45,
    stars: { one: 54, two: 65, three: 81 }
  },
  {
    id: 28,
    rack: "HIGHWAY",
    boardWord: "HIGH",
    targetScore: 55,
    timeLimit: 45,
    stars: { one: 55, two: 66, three: 83 }
  },
  {
    id: 29,
    rack: "VIEWING",
    boardWord: "VINE",
    targetScore: 57,
    timeLimit: 45,
    stars: { one: 57, two: 68, three: 86 }
  },
  {
    id: 30,
    rack: "HALFWAY",
    boardWord: "HALF",
    targetScore: 60,
    timeLimit: 45,
    stars: { one: 60, two: 72, three: 90 }
  },

  // Levels 31-40: Advanced
  {
    id: 31,
    rack: "JOKIEST",
    boardWord: "",
    targetScore: 62,
    timeLimit: 45,
    stars: { one: 62, two: 74, three: 93 }
  },
  {
    id: 32,
    rack: "EXAMPLE",
    boardWord: "EXAM",
    targetScore: 64,
    timeLimit: 40,
    stars: { one: 64, two: 77, three: 96 }
  },
  {
    id: 33,
    rack: "KICKING",
    boardWord: "",
    targetScore: 66,
    timeLimit: 40,
    stars: { one: 66, two: 79, three: 99 }
  },
  {
    id: 34,
    rack: "JUMPING",
    boardWord: "JUMP",
    targetScore: 68,
    timeLimit: 38,
    stars: { one: 68, two: 82, three: 102 }
  },
  {
    id: 35,
    rack: "EXACTLY",
    boardWord: "",
    targetScore: 70,
    timeLimit: 38,
    stars: { one: 70, two: 84, three: 105 }
  },
  {
    id: 36,
    rack: "COMPLEX",
    boardWord: "PLEX",
    targetScore: 72,
    timeLimit: 35,
    stars: { one: 72, two: 86, three: 108 }
  },
  {
    id: 37,
    rack: "JAZZIER",
    boardWord: "",
    targetScore: 74,
    timeLimit: 35,
    stars: { one: 74, two: 89, three: 111 }
  },
  {
    id: 38,
    rack: "KINGDOM",
    boardWord: "KING",
    targetScore: 76,
    timeLimit: 33,
    stars: { one: 76, two: 91, three: 114 }
  },
  {
    id: 39,
    rack: "EXAMPLE",
    boardWord: "EXAM",
    targetScore: 78,
    timeLimit: 33,
    stars: { one: 78, two: 94, three: 117 }
  },
  {
    id: 40,
    rack: "COMPLEX",
    boardWord: "COMP",
    targetScore: 80,
    timeLimit: 30,
    stars: { one: 80, two: 96, three: 120 }
  },

  // Levels 41-50: Expert
  {
    id: 41,
    rack: "QUAKING",
    boardWord: "",
    targetScore: 85,
    timeLimit: 30,
    stars: { one: 85, two: 102, three: 128 }
  },
  {
    id: 42,
    rack: "ZAPPING",
    boardWord: "ZAP",
    targetScore: 88,
    timeLimit: 28,
    stars: { one: 88, two: 106, three: 132 }
  },
  {
    id: 43,
    rack: "QUEUING",
    boardWord: "",
    targetScore: 90,
    timeLimit: 28,
    stars: { one: 90, two: 108, three: 135 }
  },
  {
    id: 44,
    rack: "QUIXOTE",
    boardWord: "QUIT",
    targetScore: 92,
    timeLimit: 26,
    stars: { one: 92, two: 110, three: 138 }
  },
  {
    id: 45,
    rack: "JAZZING",
    boardWord: "",
    targetScore: 95,
    timeLimit: 26,
    stars: { one: 95, two: 114, three: 143 }
  },
  {
    id: 46,
    rack: "QUIZZER",
    boardWord: "QUIZ",
    targetScore: 98,
    timeLimit: 24,
    stars: { one: 98, two: 118, three: 147 }
  },
  {
    id: 47,
    rack: "COMPLEX",
    boardWord: "PLEX",
    targetScore: 100,
    timeLimit: 24,
    stars: { one: 100, two: 120, three: 150 }
  },
  {
    id: 48,
    rack: "QUIZZED",
    boardWord: "",
    targetScore: 102,
    timeLimit: 22,
    stars: { one: 102, two: 122, three: 153 }
  },
  {
    id: 49,
    rack: "JAZZING",
    boardWord: "JAZZ",
    targetScore: 105,
    timeLimit: 22,
    stars: { one: 105, two: 126, three: 158 }
  },
  {
    id: 50,
    rack: "QUIZZED",
    boardWord: "QUIZ",
    targetScore: 110,
    timeLimit: 20,
    stars: { one: 110, two: 132, three: 165 }
  },
];

/**
 * Get level configuration by ID
 * @param levelId Level number (1-50)
 * @returns Level configuration or undefined if not found
 */
export function getLevelById(levelId: number): LevelConfig | undefined {
  return LEVELS.find(level => level.id === levelId);
}

/**
 * Get the next level after the given level
 * @param currentLevelId Current level number
 * @returns Next level configuration or undefined if at end
 */
export function getNextLevel(currentLevelId: number): LevelConfig | undefined {
  return LEVELS.find(level => level.id === currentLevelId + 1);
}

/**
 * Get total number of levels
 * @returns Total level count
 */
export function getTotalLevels(): number {
  return LEVELS.length;
}
