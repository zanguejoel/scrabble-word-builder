import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import RackInput from './components/RackInput';
import BoardWordInput from './components/BoardWordInput';
import ResultDisplay from './components/ResultDisplay';
import AnimatedBackground from './components/AnimatedBackground';
import AlphabetKeyboard from './components/AlphabetKeyboard';
import LetterSlots from './components/LetterSlots';
import ControlButtons from './components/ControlButtons';
import ScrollButtons from './components/ScrollButtons';
import { loadDictionaryWithIndex, loadLetterData } from './utils/dictionary';
import { validateRack, validateBoardWord, validateRackAndBoard } from './utils/validation';
import { findAllWords } from './utils/scrabbleEngine';
import { LetterDataMap, MultiWordResult } from './types';
import { AnagramIndex } from './utils/anagramIndex';

function App() {
  const [rack, setRack] = useState('');
  const [boardWord, setBoardWord] = useState('');
  const [rackError, setRackError] = useState('');
  const [boardError, setBoardError] = useState('');
  const [result, setResult] = useState<MultiWordResult | { error: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [dictionary, setDictionary] = useState<Set<string> | null>(null);
  const [anagramIndex, setAnagramIndex] = useState<AnagramIndex | null>(null);
  const [letterData, setLetterData] = useState<LetterDataMap | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Load dictionary with anagram index and letter data on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [{ dictionary: dict, anagramIndex: index }, letters] = await Promise.all([
          loadDictionaryWithIndex(),
          loadLetterData()
        ]);
        setDictionary(dict);
        setAnagramIndex(index);
        setLetterData(letters);
      } catch (error) {
        console.error('Failed to load data:', error);
        setResult({ error: 'Failed to load dictionary. Please refresh the page.' });
      } finally {
        setLoadingData(false);
      }
    }
    loadData();
  }, []);

  const handleRackChange = (value: string) => {
    setRack(value);
    setRackError('');
    setResult(null);
  };

  const handleBoardWordChange = (value: string) => {
    setBoardWord(value);
    setBoardError('');
    setResult(null);
  };

  const handleLetterClick = (letter: string) => {
    if (rack.length < 7) {
      setRack(rack + letter);
      setRackError('');
      setResult(null);
    }
  };

  const handleBackspace = () => {
    setRack(rack.slice(0, -1));
    setRackError('');
    setResult(null);
  };

  const handleClear = () => {
    setRack('');
    setRackError('');
    setResult(null);
  };

  const handleRemoveLetter = (index: number) => {
    const letters = rack.split('');
    letters.splice(index, 1);
    setRack(letters.join(''));
    setRackError('');
    setResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dictionary || !letterData) {
      setResult({ error: 'Data still loading. Please wait.' });
      return;
    }

    // Clear previous errors
    setRackError('');
    setBoardError('');
    setResult(null);

    // Validate inputs
    const rackValidation = validateRack(rack);
    if (!rackValidation.valid) {
      setRackError(rackValidation.error);
      return;
    }

    const boardValidation = validateBoardWord(boardWord);
    if (!boardValidation.valid) {
      setBoardError(boardValidation.error);
      return;
    }

    // Validate rack + board combination doesn't exceed Scrabble tile limits
    const combinationValidation = validateRackAndBoard(rack, boardWord, letterData);
    if (!combinationValidation.valid) {
      setResult({ error: combinationValidation.error });
      return;
    }

    // Find best word
    setLoading(true);

    // Use setTimeout to allow UI to update with loading state
    setTimeout(() => {
      try {
        const allWords = findAllWords(rack, boardWord, dictionary, letterData, anagramIndex || undefined);
        setResult(allWords);

        // Scroll to results smoothly after finding words
        setTimeout(() => {
          resultRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      } catch (error) {
        console.error('Error finding word:', error);
        setResult({ error: 'An error occurred while finding the best word.' });
      } finally {
        setLoading(false);
      }
    }, 100);
  };

  const loadExample = (exampleRack: string, exampleBoard: string = '') => {
    setRack(exampleRack);
    setBoardWord(exampleBoard);
    setRackError('');
    setBoardError('');
    setResult(null);
  };

  const basePath = import.meta.env.BASE_URL;

  if (loadingData) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-slate-900 bg-cover bg-center bg-fixed bg-no-repeat relative"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.88), rgba(15, 23, 42, 0.92)), url('${basePath}omg-text-made-from-scrabble-game-letters.jpg')`
        }}
      >
        <AnimatedBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-16 w-16 border-t-4 border-amber-500 mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg"
          >
            Loading dictionary...
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-500 text-sm mt-2"
          >
            This may take a moment on first load
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-8 px-4 bg-slate-900 bg-cover bg-center bg-fixed bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.90)), url('${basePath}omg-text-made-from-scrabble-game-letters.jpg')`
      }}
    >
      <AnimatedBackground />
      <div className="max-w-6xl mx-auto relative z-10">
        <Header />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-700"
        >
          <form onSubmit={handleSubmit}>
            {/* Letter Slots - Visual rack display */}
            {letterData && (
              <LetterSlots
                letters={rack.split('')}
                letterData={letterData}
                onRemoveLetter={handleRemoveLetter}
              />
            )}

            {/* Responsive grid: keyboard on left, manual input on right for larger screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Keyboard Section */}
              <div className="lg:col-span-1">
                {/* Alphabet Keyboard */}
                {letterData && (
                  <AlphabetKeyboard
                    onLetterClick={handleLetterClick}
                    disabled={rack.length >= 7}
                    letterData={letterData}
                  />
                )}

                {/* Control Buttons */}
                <ControlButtons
                  onBackspace={handleBackspace}
                  onClear={handleClear}
                  disabled={rack.length === 0}
                />
              </div>

              {/* Manual Input Section */}
              <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-slate-700 pt-6 lg:pt-0 lg:pl-6">
                <p className="text-slate-400 text-xs text-center mb-4">
                  Or type manually:
                </p>
                <RackInput
                  value={rack}
                  onChange={handleRackChange}
                  error={rackError}
                />
                <BoardWordInput
                  value={boardWord}
                  onChange={handleBoardWordChange}
                  error={boardError}
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading || !rack}
              whileHover={loading || !rack ? {} : { scale: 1.02, boxShadow: "0 20px 40px rgba(245, 158, 11, 0.3)" }}
              whileTap={loading || !rack ? {} : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold py-4 px-6 rounded-lg disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="rounded-full h-5 w-5 border-t-2 border-white inline-block"
                  />
                  Finding best word...
                </span>
              ) : (
                'Find Best Word'
              )}
            </motion.button>
          </form>

          <div ref={resultRef}>
            <ResultDisplay result={result} letterData={letterData} />
          </div>

          {/* Example buttons */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-slate-400 text-sm mb-3">Try an example:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => loadExample('AIDOORW', 'WIZ')}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors"
              >
                AIDOORW + WIZ
              </button>
              <button
                onClick={() => loadExample('AIDOORW')}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors"
              >
                AIDOORW only
              </button>
              <button
                onClick={() => loadExample('AIDOORZ', 'QUIZ')}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors"
              >
                Invalid: Too many Z
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 text-center text-slate-500 text-sm"
        >
          <p>
            Built with React, TypeScript, and Tailwind CSS
          </p>
          <p className="mt-2">
            Dictionary: {dictionary?.size.toLocaleString()} words loaded
          </p>
        </motion.footer>
      </div>

      {/* Scroll Buttons */}
      <ScrollButtons />
    </div>
  );
}

export default App;
