import { motion } from 'framer-motion';
import HelpTooltip from './HelpTooltip';

export default function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center mb-12 relative"
    >
      <div className="absolute -top-2 right-0 md:right-4 z-50">
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
    </motion.div>
  );
}
