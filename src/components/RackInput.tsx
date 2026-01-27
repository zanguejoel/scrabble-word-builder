import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface RackInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function RackInput({ value, onChange, error }: RackInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4"
    >
      <label className="block text-sm font-medium text-slate-300 mb-2">
        Your Letter Rack *
        <span className="text-slate-500 text-xs ml-2">(1-7 letters)</span>
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
          placeholder="e.g., AIDOORW"
          maxLength={7}
          className={`w-full px-4 py-3 rounded-lg bg-slate-700 text-white border-2 ${
            error ? 'border-red-500' : 'border-slate-600'
          } focus:border-amber-500 focus:outline-none transition-colors text-lg font-mono tracking-wider`}
          style={{
            boxShadow: isFocused ? '0 0 0 3px rgba(245, 158, 11, 0.2)' : 'none'
          }}
        />
      </motion.div>
      <div className="flex justify-between items-center mt-1">
        <AnimatePresence mode="wait">
          {error ? (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-red-400 text-sm"
            >
              {error}
            </motion.p>
          ) : (
            <motion.p
              key="help"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-slate-500 text-xs"
            >
              Enter letters A-Z only
            </motion.p>
          )}
        </AnimatePresence>
        <motion.span
          key={value.length}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
          className="text-slate-500 text-sm"
        >
          {value.length} / 7
        </motion.span>
      </div>
    </motion.div>
  );
}
