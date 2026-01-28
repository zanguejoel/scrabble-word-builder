import { useEffect, useRef, useState, UIEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DictionaryDrawerProps {
  open: boolean;
  onClose: () => void;
  dictionary: Set<string>;
  matches: Set<string>;
}

export default function DictionaryDrawer({ open, onClose, dictionary, matches }: DictionaryDrawerProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  // Lazy loading state
  const words = Array.from(dictionary).sort();
  const BATCH_SIZE = 1000;
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  // Reset visibleCount when drawer opens or dictionary changes
  useEffect(() => {
    if (open) setVisibleCount(BATCH_SIZE);
  }, [open, dictionary]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
      setVisibleCount(count => Math.min(words.length, count + BATCH_SIZE));
    }
  };

  return (
    <div className={`fixed inset-0 z-50 transition-all ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      {/* Drawer */}
      <motion.div
        ref={ref}
        initial={{ x: '100%' }}
        animate={{ x: open ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        className="absolute right-0 top-0 h-full w-full max-w-2xl bg-slate-900 shadow-2xl p-6 overflow-y-auto border-l border-slate-700"
        style={{ zIndex: 60 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-amber-400">Dictionary</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl font-bold">×</button>
        </div>
        <div
          className="h-[70vh] overflow-y-auto border rounded bg-slate-800 p-4 text-sm font-mono"
          onScroll={handleScroll}
        >
          {words.slice(0, visibleCount).map(word => (
            <span
              key={word}
              className={`inline-block px-2 py-0.5 m-0.5 rounded ${matches.has(word) ? 'bg-green-600 text-white font-bold' : 'bg-slate-700 text-slate-300'}`}
            >
              {word}
            </span>
          ))}
          {visibleCount < words.length && (
            <div className="text-slate-400 mt-4 text-center">Loading more...</div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
