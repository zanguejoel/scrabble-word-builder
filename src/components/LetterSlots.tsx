import { motion, AnimatePresence } from 'framer-motion';
import { LetterDataMap } from '../types';

interface LetterSlotsProps {
  letters: string[];
  letterData: LetterDataMap;
  onRemoveLetter?: (index: number) => void;
}

export default function LetterSlots({ letters, letterData, onRemoveLetter }: LetterSlotsProps) {
  const slots = Array.from({ length: 7 }, (_, i) => letters[i] || null);

  return (
    <div className="mb-6">
      <p className="text-slate-300 text-sm mb-3 text-center font-medium">
        Your Letter Rack ({letters.length}/7)
      </p>
      <div className="flex justify-center gap-2">
        {slots.map((letter, index) => (
          <div
            key={index}
            className="relative w-12 h-12 sm:w-14 sm:h-14"
          >
            <AnimatePresence mode="wait">
              {letter ? (
                <motion.button
                  key={letter + index}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onRemoveLetter?.(index)}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="w-full h-full bg-amber-100 rounded-lg shadow-lg
                           flex flex-col items-center justify-center
                           text-slate-900 font-bold text-2xl cursor-pointer
                           hover:bg-amber-200 transition-colors"
                >
                  <span>{letter}</span>
                  <span className="text-xs text-slate-700">
                    {letterData[letter]?.score || 0}
                  </span>
                </motion.button>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full border-2 border-dashed border-slate-600
                           rounded-lg bg-slate-800/30 flex items-center justify-center"
                >
                  <span className="text-slate-600 text-lg">{index + 1}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
