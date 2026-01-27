import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { WordResult } from '../types';
import { LetterDataMap } from '../types';
import { getLetterBreakdown } from '../utils/scorer';

interface ResultDisplayProps {
  result: WordResult | { error: string } | null;
  letterData: LetterDataMap | null;
}

export default function ResultDisplay({ result, letterData }: ResultDisplayProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!result) return null;

  if ('error' in result) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-6 p-6 rounded-lg bg-red-900/30 border-2 border-red-500/50"
        >
          <div className="flex items-center gap-3">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="text-3xl"
            >
              ❌
            </motion.span>
            <div>
              <h3 className="text-lg font-semibold text-red-400">Error</h3>
              <p className="text-red-300">{result.error}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  const breakdown = letterData ? getLetterBreakdown(result.word, letterData) : [];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={result.word}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mt-6 p-6 rounded-lg bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-2 border-green-500/50"
      >
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="text-3xl"
            >
              ✓
            </motion.span>
            <h3 className="text-2xl font-bold text-green-400">Best Word Found!</h3>
          </motion.div>

          <motion.div
            style={{ perspective: shouldReduceMotion ? 'none' : 1000 }}
            className="flex justify-center gap-2 mb-4 flex-wrap"
          >
            {breakdown.map((item, index) => (
              <motion.div
                key={index}
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { rotateY: 90, opacity: 0, scale: 0.8 }
                }
                animate={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { rotateY: 0, opacity: 1, scale: 1 }
                }
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        rotateY: 10,
                        scale: 1.1,
                        z: 50,
                        transition: { duration: 0.2 }
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: shouldReduceMotion ? index * 0.02 : index * 0.05
                }}
                className="w-14 h-14 bg-amber-100 rounded-lg flex flex-col items-center justify-center shadow-lg cursor-pointer"
                style={{
                  transformStyle: shouldReduceMotion ? 'flat' : 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              >
                <span className="text-2xl font-bold text-slate-900">{item.letter}</span>
                <span className="text-xs text-slate-700">{item.score}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xl shadow-lg"
          >
            Score: {result.score} points
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="mt-6 grid grid-cols-2 gap-4 text-sm"
          >
            {[
              'Valid dictionary word',
              'Tiles within limits',
              'Uses available letters',
              'Highest possible score'
            ].map((text, index) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="flex items-center gap-2 text-green-300"
              >
                <span>✓</span>
                <span>{text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
