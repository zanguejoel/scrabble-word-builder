import { motion } from 'framer-motion';

interface ControlButtonsProps {
  onBackspace: () => void;
  onClear: () => void;
  disabled: boolean;
}

export default function ControlButtons({ onBackspace, onClear, disabled }: ControlButtonsProps) {
  return (
    <div className="flex justify-center gap-4 mb-6">
      <motion.button
        type="button"
        disabled={disabled}
        onClick={onBackspace}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-700
                 text-white font-bold rounded-xl shadow-lg
                 disabled:cursor-not-allowed disabled:opacity-50
                 flex items-center gap-2 transition-colors"
      >
        <span className="text-xl">←</span>
        <span>Backspace</span>
      </motion.button>

      <motion.button
        type="button"
        disabled={disabled}
        onClick={onClear}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        className="px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-slate-700
                 text-white font-bold rounded-xl shadow-lg
                 disabled:cursor-not-allowed disabled:opacity-50
                 flex items-center gap-2 transition-colors"
      >
        <span className="text-xl">×</span>
        <span>Clear All</span>
      </motion.button>
    </div>
  );
}
