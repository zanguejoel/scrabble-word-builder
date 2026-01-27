import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HelpTooltip() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside to close tooltip
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsLocked(false);
      }
    }

    if (isOpen && isLocked) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, isLocked]);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    setIsLocked(!isOpen); // Lock it open when clicking
  };

  const handleMouseEnter = () => {
    if (!isLocked) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isLocked) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block pointer-events-auto" ref={tooltipRef}>
      <button
        onClick={handleButtonClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 border border-slate-600 flex items-center justify-center text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
        aria-label="How to use this app"
        type="button"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-3 w-80 max-w-[calc(100vw-2rem)] bg-slate-800 border border-slate-700 rounded-lg shadow-2xl p-4 z-[60]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <h3 className="text-amber-400 font-bold text-lg mb-3 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              How to Use
            </h3>

            <div className="space-y-3 text-sm text-slate-300">
              <div>
                <p className="font-semibold text-slate-200 mb-1">1. Enter Your Rack</p>
                <p className="text-slate-400">
                  Click the keyboard letters or type 1-7 letters from your Scrabble rack.
                </p>
              </div>

              <div>
                <p className="font-semibold text-slate-200 mb-1">2. Add Board Letters (Optional)</p>
                <p className="text-slate-400">
                  Enter any letters already on the board that you want to build from.
                </p>
              </div>

              <div>
                <p className="font-semibold text-slate-200 mb-1">3. Find Best Word</p>
                <p className="text-slate-400">
                  Click the button to see the highest-scoring word and all other valid words you can make.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-700">
                <p className="text-xs text-slate-500 flex items-start gap-2">
                  <svg
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Uses official Scrabble tile counts and scoring rules. Results validate against a 178,000+ word dictionary.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
