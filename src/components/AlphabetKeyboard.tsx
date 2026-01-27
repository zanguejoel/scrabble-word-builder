import { motion } from 'framer-motion';
import { LetterDataMap } from '../types';

interface AlphabetKeyboardProps {
  onLetterClick: (letter: string) => void;
  disabled: boolean;
  letterData: LetterDataMap;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const LETTER_COLORS = [
  'bg-red-500', 'bg-rose-500', 'bg-pink-500', 'bg-orange-500',
  'bg-amber-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500',
  'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-sky-500',
  'bg-blue-500', 'bg-indigo-500', 'bg-violet-500', 'bg-purple-500',
  'bg-fuchsia-500', 'bg-pink-500', 'bg-rose-500', 'bg-red-500',
  'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500',
  'bg-teal-500', 'bg-blue-500'
];

export default function AlphabetKeyboard({ onLetterClick, disabled, letterData }: AlphabetKeyboardProps) {
  return (
    <div className="mb-6">
      <p className="text-slate-300 text-sm mb-3 text-center font-medium">
        Click letters to build your word!
      </p>
      <motion.div
        className="grid grid-cols-9 gap-2 max-w-2xl mx-auto"
        animate={disabled ? { opacity: 0.5 } : { opacity: 1 }}
      >
        {ALPHABET.map((letter, index) => {
          const score = letterData[letter]?.score || 0;
          const colorClass = LETTER_COLORS[index];

          return (
            <motion.button
              key={letter}
              type="button"
              disabled={disabled}
              onClick={() => onLetterClick(letter)}
              whileHover={!disabled ? { scale: 1.1, rotate: 5 } : {}}
              whileTap={!disabled ? { scale: 0.95 } : {}}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className={`
                relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl shadow-lg
                ${colorClass} text-white font-bold text-xl sm:text-2xl
                disabled:grayscale disabled:cursor-not-allowed
                hover:shadow-xl transform transition-shadow
              `}
            >
              <span>{letter}</span>
              <span className="absolute bottom-0.5 right-1 text-xs opacity-75">
                {score}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
