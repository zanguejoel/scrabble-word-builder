import { useState } from 'react';
import { motion } from 'framer-motion';
import HelpTooltip from './HelpTooltip';
import SettingsDrawer from './SettingsDrawer';
import DictionaryDrawer from './DictionaryDrawer';

export type HeaderProps = {
  letterData?: Record<string, { score: number; count: number }>;
  onLetterDataChange?: (letter: string, field: 'score' | 'count', value: number) => void;
  dictionary?: Set<string>;
  matches?: Set<string>;
};

export function Header({
  letterData,
  onLetterDataChange,
  dictionary,
  matches
}: HeaderProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dictOpen, setDictOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center mb-12 relative"
    >
      <div className="absolute -top-2 right-0 md:right-4 z-50 flex gap-2">
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          aria-label="Dictionary"
          className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 border border-slate-600 flex items-center justify-center text-green-400 hover:text-green-300 transition-colors cursor-pointer"
          style={{ fontSize: 22 }}
          onClick={() => setDictOpen(true)}
        >
          <span role="img" style={{fontSize: 12}} aria-label="dictionary">📖</span>
        </motion.button>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          aria-label="Settings"
          className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 border border-slate-600 flex items-center justify-center text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
          style={{ fontSize: 22 }}
          onClick={() => setSettingsOpen(true)}
        >
          <span role="img" style={{fontSize: 12}} aria-label="settings">⚙️</span>
        </motion.button>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <HelpTooltip />
        </motion.div>
      </div>

      <motion.h1
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-lg"
      >
        Scrabble Word Builder
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-slate-300 text-lg flex items-center justify-center gap-2"
      >
        <span className="text-emerald-400">✨</span>
        Find the highest scoring word from your letter rack
        <span className="text-amber-400">🎯</span>
      </motion.p>
      {letterData && onLetterDataChange && (
        <SettingsDrawer
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          letterData={letterData}
          onChange={onLetterDataChange}
        />
      )}
      {dictionary && matches && (
        <DictionaryDrawer
          open={dictOpen}
          onClose={() => setDictOpen(false)}
          dictionary={dictionary}
          matches={matches}
        />
      )}
    </motion.div>
  );
}


export default Header;
