
# Scrabble Word Builder

A modern, interactive React web application that finds the highest-scoring valid Scrabble word from a given rack of letters. Built with React, TypeScript, Tailwind CSS, and Vite.

## Live Demo

[scrabble-word-builder](https://zanguejoel.github.io/scrabble-word-builder/)

## Features

- **Smart Word Generation**: Efficiently generates and evaluates all possible word combinations from your letter rack
- **Dictionary Validation**: Uses a comprehensive 178,000+ word Scrabble dictionary (SOWPODS)
- **Tile Limit Enforcement**: Validates that letter usage doesn't exceed available Scrabble tile counts
- **Real-time Validation**: Instant feedback on input errors
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Example Cases**: Quick-load buttons for testing with example scenarios
- **Fast Performance**: Optimized algorithm for quick results even with 7-letter racks


## Challenge Requirements

This application fulfills all requirements of the Scrabble Word Builder challenge:

### Inputs
- `rack` (string, required): Letters currently on the player's rack (1–7 characters)
- `word` (string, optional): A word already on the board that the player may build upon

### Rules Implemented
- ✓ Rack must contain 1 to 7 letters
- ✓ Resulting words must be 2 to 15 letters long
- ✓ Words must exist in the provided dictionary
- ✓ Total count of each letter used (rack + board word) must not exceed available tiles
- ✓ Returns highest scoring word, with alphabetical tiebreaker
- ✓ Validates all inputs with clear error messages

### Test Cases

#### Example 1: Building on Board Word
```
Input:
  rack: "AIDOORW"
  word: "WIZ"
Output:
  WIZARD (19 points)
```

#### Example 2: Rack Only
```
Input:
  rack: "AIDOORW"
  word: (none)
Output:
  DRAW (8 points)
  Note: Other valid words like WARD or WOOD also score 8 points
```

#### Example 3: Invalid - Too Many Tiles
```
Input:
  rack: "AIDOORZ"
  word: "QUIZ"
Output:
  Error: Too many 'Z' tiles used. Limit is 1, using 2
```

#### Example 4: Invalid - Rack Too Long
```
Input:
  rack: "AIDOORWZ"
  word: (any)
Output:
  Error: Rack must contain 1-7 letters
```

## Installation

### Prerequisites
- Node.js 18+ and npm

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/[your-username]/scrabble-word-builder.git
   cd scrabble-word-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```
   The built files will be in the `dist/` directory

5. **Preview production build**
   ```bash
   npm run preview
   ```


## Usage


1. **Enter your letter rack** – Type 1–7 letters (A–Z) in the rack input field, or click the on-screen keyboard.
2. **Optionally add a board word** – If you're building upon an existing word, enter it in the second field. The board word must be a valid dictionary word.
3. **Click "Find Best Word"** – The app will calculate and display the highest scoring word. All other valid words you can make are also shown in the results panel.
4. **View results** – See the best word, its score, and a letter-by-letter breakdown. If there are multiple words with the same score, the alphabetically first is chosen as the best.
5. **Try examples** – Use the example buttons to quickly test different scenarios, including valid and invalid cases.

### Error Messages & Edge Cases

- **Invalid Input**: If you enter non-letter characters, too many letters, or an invalid board word, a clear error message is shown.
- **Too Many Tiles**: If your rack and board word use more tiles than allowed (e.g., two Z's), you'll see a specific error.
- **No Valid Words**: If no valid word can be formed, the app will inform you.
- **Live Validation**: Input fields provide instant feedback as you type.

### Accessibility & Usability
- Fully keyboard accessible and screen reader friendly.
- Responsive design for desktop and mobile.
- Animated feedback for actions and errors.

## Assets

### dictionary.txt
- **Source**: SOWPODS Scrabble Dictionary
- **Size**: 178,690 words
- **Format**: One word per line, uppercase
- **Location**: `public/dictionary.txt`

### letter_data.json
Contains the standard Scrabble letter distribution and scores:

```json
{
  "A": { "score": 1, "count": 9 },
  "B": { "score": 3, "count": 2 },
  "C": { "score": 3, "count": 2 },
  ...
  "Z": { "score": 10, "count": 1 }
}
```

**Location**: `public/letter_data.json`


## Algorithm Explanation

### Core Algorithm Steps

1. **Input Validation**
   - Validates rack length (1-7 letters)
   - Validates alphabetic characters only
   - Checks board word format if provided

2. **Combination Generation**
   - Combines rack and board word letters
   - Generates all possible subsets (2-15 letters)
   - Creates permutations of each subset
   - Optimized to skip invalid lengths early

3. **Word Validation**
   - Dictionary lookup using Set for O(1) performance
   - Validates board word is contained in result
   - Checks word length constraints (2-15)
   - Verifies tile count availability

4. **Tile Count Validation**
   - Counts letter occurrences in candidate word
   - Counts available letters from rack + board
   - Ensures usage doesn't exceed available tiles
   - Checks against game tile limits (e.g., only 1 Z)

5. **Scoring & Selection**
   - Calculates score by summing letter values
   - Tracks highest scoring word
   - Applies alphabetical tiebreaker
   - Returns best word or error

### Performance Optimizations
- Dictionary loaded once on app start as Set for O(1) lookup
- Early termination of invalid combinations
- Efficient permutation generation
- Memoization potential for repeated inputs

### Time Complexity

### Time Complexity
- **Best Case**: O(n) where n is dictionary size (rack forms dictionary word directly)
- **Average Case**: O(k \times m) where:
   - k = number of combinations/permutations generated from rack and board word (up to thousands for 7 letters)
   - m = average word length (2–15)
   - Dictionary lookup is O(1) per word (Set)
- **Worst Case**: O(7! \times 15) for 7-letter rack generating all permutations and checking each against the dictionary

### Space Complexity
- **Dictionary Storage**: O(n \times l), where n is the number of words (≈178,000) and l is average word length (≈6–8). The dictionary is loaded into a Set in memory for O(1) lookups.
- **Letter Data**: O(1), as the letter score/count table is a fixed-size object (26 letters).
- **Combinations/Permutations**: O(k \times m) in the worst case, where k is the number of generated combinations/permutations and m is the average word length. However, the implementation processes candidates in a streaming fashion, so memory usage is typically much lower in practice.
- **Other Data Structures**: Minor, e.g., temporary arrays for candidate words, score tracking, and input validation.

**Summary:**
The main space cost is the in-memory dictionary (a few MBs). The algorithm is optimized to avoid storing all permutations at once, instead evaluating candidates on the fly. This keeps memory usage efficient even for large dictionaries and 7-letter racks.


## Project Structure

```
scrabble-word-builder/
├── public/
│   ├── dictionary.txt          # 178k word Scrabble dictionary
│   └── letter_data.json        # Letter scores and tile counts
├── src/
│   ├── components/
│   │   ├── Header.tsx          # App header
│   │   ├── RackInput.tsx       # Rack letter input
│   │   ├── BoardWordInput.tsx  # Board word input
│   │   └── ResultDisplay.tsx   # Results display
│   ├── utils/
│   │   ├── scrabbleEngine.ts   # Core algorithm
│   │   ├── validation.ts       # Input validation
│   │   ├── dictionary.ts       # Data loading
│   │   └── scorer.ts           # Scoring logic
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
└── README.md                   # This file
```


## Technology Stack

- **Framework**: React 18
- **Language**: TypeScript 5
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3
- **Deployment**: GitHub Pages with GitHub Actions
- **Package Manager**: npm


## Design Decisions

### Why React + Vite?
- **Vite**: Lightning-fast HMR and optimized builds
- **React**: Component-based architecture for maintainability
- **TypeScript**: Type safety reduces bugs in complex algorithm

### Why Tailwind CSS?
- Rapid UI development with utility classes
- Smaller bundle size than component libraries
- Easy responsive design
- No runtime JavaScript for styling

### Why Client-Side Only?
- No server required - easy deployment to GitHub Pages
- All processing in browser - instant results
- Dictionary loaded once - no repeated API calls
- Works offline after initial load

### Algorithm Trade-offs
- **Space vs Speed**: Loads entire dictionary into memory for O(1) lookups
- **Completeness**: Generates all valid combinations (exhaustive search)
- **Optimization**: Could use Trie for prefix-based pruning in future


## Assumptions

1. **Dictionary**: Using SOWPODS (international Scrabble dictionary)
2. **Case Insensitive**: All inputs converted to uppercase
3. **Board Word Must Be Valid**: Board word must exist in dictionary
4. **Tile Counting**: Each letter in rack + board counts toward tile limit
5. **No Blank Tiles**: As per requirements, blank tiles are excluded
6. **Modern Browsers**: Requires ES6+ support
7. **Letter Only**: No numbers, spaces, or special characters allowed



## Future Enhancements

Potential improvements for future iterations:

- **Web Worker**: Move heavy computation to background thread
- **Trie Data Structure**: Optimize dictionary lookups and enable prefix search
- **Progressive Loading**: Load dictionary in chunks for faster initial load
- **Word Definitions**: Show definitions for found words
- **Statistics**: Show computation time, words evaluated, etc.
- **Save History**: Remember recent searches
- **Dark/Light Theme**: Theme toggle for user preference
- **Accessibility**: Enhanced screen reader support and keyboard navigation
- **PWA**: Make it installable as Progressive Web App
- **Unit Tests**: Comprehensive test coverage with Jest/Vitest
- **E2E Tests**: Playwright or Cypress integration tests


## Contributing

This project was built as a coding challenge submission. If you'd like to suggest improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request


## License

MIT License - feel free to use this project for learning or as a starting point for your own projects.


## Author

Built with attention to detail and best practices for the Scrabble Word Builder coding challenge.


## Acknowledgments

- SOWPODS dictionary from [redbo/scrabble](https://github.com/redbo/scrabble)
- Standard Scrabble letter distribution and scoring
- Inspired by the classic word game Scrabble

---

**Note**: This project is for educational and demonstration purposes. Scrabble is a trademark of Hasbro, Inc.
