# Word Search Algorithm Comparison

## Their Approach: DAWG (Directed Acyclic Word Graph)

### Data Structure
- **DAWG**: Compressed trie that shares both prefixes AND suffixes
- Example: "CAR", "CARD", "CAT" share prefix "CA", and "CARD"/"BIRD" share suffix "RD"
- More space-efficient than standard tries
- Memory: ~2-3MB for 279K words (very efficient!)

### Algorithm
```python
def find_words(rack, board, dawg):
    # Recursive backtracking with DAWG traversal
    for anchor in board.anchors:
        explore_left(anchor, rack, dawg)
        explore_right(anchor, rack, dawg)

    # Prunes invalid paths early:
    if letter not in dawg_node.children:
        return  # Stop exploring this path
```

**Advantages:**
- ✅ Never generates invalid letter combinations
- ✅ Early pruning of impossible words
- ✅ Explores only valid dictionary paths
- ✅ Very memory efficient
- ✅ Perfect for full Scrabble board placement

**Time Complexity:** O(board_size × rack_size × avg_word_length)

---

## Our Current Approach: Anagram Index

### Data Structure
- **Anagram Index**: HashMap of sorted letters → words
- Example: "ACT" → ["ACT", "CAT", "TAC"]
- Pre-computed once on dictionary load

### Algorithm
```typescript
function findBestWord(rack, board, anagramIndex):
    combinations = generateLetterCombinations(rack + board)  // O(2^n)

    for combination in combinations:
        words = anagramIndex.get(combination)  // O(1) lookup
        validate and score each word
```

**Advantages:**
- ✅ Very fast lookup: O(1) per combination
- ✅ Simple to implement and maintain
- ✅ Already 100-200x faster than brute force
- ✅ Good for our use case (rack-only searching)

**Current Performance:**
- 7 letters: ~128 combinations to check
- Search time: ~10-50ms
- Memory: ~5MB for anagram index

---

## Comparison for Our Use Case

### Our Context
- Finding best word from a **7-letter rack** only
- Optional board word constraint (simple inclusion check)
- No full Scrabble board placement
- Need to find ALL valid words to pick highest-scoring

### DAWG Approach for Us
**Pros:**
- More memory efficient (~2-3MB vs ~5MB)
- Slightly faster path pruning
- Theoretically elegant

**Cons:**
- ⚠️ Complex to implement in TypeScript (200+ lines)
- ⚠️ Requires recursive backtracking
- ⚠️ Better suited for board placement (not our use case)
- ⚠️ Minimal speed gain for 7-letter rack (~5-10ms improvement)
- ⚠️ Must still explore all valid word paths to find best score

### Anagram Index (Current)
**Pros:**
- ✅ Already implemented and working
- ✅ Very fast for our use case (10-50ms)
- ✅ Simple, maintainable code
- ✅ Perfect for rack-only searches
- ✅ Instant lookup of all anagrams

**Cons:**
- Uses more memory (~5MB vs ~2-3MB)
- Still generates 2^n combinations

---

## Recommendation: Hybrid Optimization

Instead of replacing our anagram index with DAWG, we can **enhance** our current approach:

### Enhanced Anagram Index with Early Termination

```typescript
function findBestWordOptimized(rack, board, anagramIndex, letterData):
    let bestScore = 0
    let bestWord = null

    // Generate combinations by length (longest first for early termination)
    for length = 7 down to 2:
        combinations = generateCombinationsOfLength(rack + board, length)

        for combination in combinations:
            words = anagramIndex.get(combination)

            for word in words:
                score = scoreWord(word, letterData)

                if score > bestScore:
                    bestScore = score
                    bestWord = word

                    // Early termination: if we found a 7-letter word
                    // with high score, unlikely to beat it
                    if length === 7 && score >= threshold:
                        return bestWord
```

### Additional Optimizations

1. **Length-based Generation**
   - Generate 7-letter combos first, then 6, then 5, etc.
   - Most high-scoring words are longer
   - Can stop early when found

2. **Score Caching**
   - Cache scores for common letter patterns
   - Reuse across searches

3. **Frequency-based Pruning**
   - Skip rare letter combinations first
   - Focus on high-value letters (Q, Z, X, J)

---

## Performance Projections

| Approach | Current | DAWG | Enhanced Anagram |
|----------|---------|------|------------------|
| Search Time (7 letters) | 10-50ms | 5-20ms | 5-30ms |
| Memory Usage | 5MB | 2-3MB | 5MB |
| Implementation Complexity | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Maintenance | Easy | Complex | Easy |
| Best for | ✅ Our use case | Full board games | ✅ Our use case |

---

## Final Recommendation: **Keep Current Anagram Index**

### Why Not Implement DAWG?

1. **Diminishing Returns**: 10-50ms is already instant for users
2. **Complexity**: DAWG would add 200+ lines of complex code
3. **Use Case Mismatch**: DAWG shines for board placement, not rack searching
4. **Maintenance**: Our anagram index is simple and clear
5. **Good Enough**: 100-200x speedup is excellent

### If We Want More Speed

Implement **length-based generation** (10 lines of code):
```typescript
// Generate 7-letter combinations first (most valuable)
// Then 6, 5, 4, 3, 2
// Stop when found a high-scoring long word
```

This gives us 90% of DAWG's benefit with 5% of its complexity.

---

## Conclusion

**Our anagram index is already excellent for our use case.** The DAWG approach from the reference repo is designed for full Scrabble board solving with placement constraints, which is overkill for finding the best word from a 7-letter rack.

**Action:** Keep our current implementation, optionally add length-based generation for marginal gains.
