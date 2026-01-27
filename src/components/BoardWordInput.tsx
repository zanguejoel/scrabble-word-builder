import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface BoardWordInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function BoardWordInput({ value, onChange, error }: BoardWordInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="mb-6"
    >
      <label className="block text-sm font-medium text-slate-300 mb-2">
        Word on Board (Optional)
        <span className="text-slate-500 text-xs ml-2">Build upon an existing word</span>
      </label>
      <motion.div
        animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="e.g., WIZ"
          className={`w-full px-4 py-3 rounded-lg bg-slate-700 text-white border-2 ${
            error ? 'border-red-500' : 'border-slate-600'
          } focus:border-amber-500 focus:outline-none transition-colors text-lg font-mono tracking-wider`}
          style={{
            boxShadow: isFocused ? '0 0 0 3px rgba(245, 158, 11, 0.2)' : 'none'
          }}
        />
      </motion.div>
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-red-400 text-sm mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
