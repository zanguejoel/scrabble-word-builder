import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface SettingsDrawerProps {
  open: boolean;
  onClose: () => void;
  letterData: Record<string, { score: number; count: number }>;
  onChange: (letter: string, field: 'score' | 'count', value: number) => void;
}

export default function SettingsDrawer({ open, onClose, letterData, onChange }: SettingsDrawerProps) {
  useEffect(() => {
    if (!open) return;
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-50 transition-all ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: open ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-slate-900 shadow-2xl p-6 overflow-y-auto border-l border-slate-700"
        style={{ zIndex: 60 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-amber-400">Letter Settings</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl font-bold">×</button>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {Object.keys(letterData).sort().map(letter => (
            <div key={letter} className="flex items-center gap-4 bg-slate-800 rounded-lg px-4 py-2">
              <span className="w-8 text-lg font-bold text-white flex-shrink-0">{letter}</span>
              <label className="flex items-center gap-1 text-slate-300">
                Score:
                <input
                  type="number"
                  min={0}
                  value={letterData[letter].score}
                  onChange={e => onChange(letter, 'score', Number(e.target.value))}
                  className="w-14 px-1 py-0.5 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </label>
              <label className="flex items-center gap-1 text-slate-300">
                Count:
                <input
                  type="number"
                  min={0}
                  value={letterData[letter].count}
                  onChange={e => onChange(letter, 'count', Number(e.target.value))}
                  className="w-14 px-1 py-0.5 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </label>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
