import { motion, useReducedMotion } from 'framer-motion';

export default function Header() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center mb-8"
    >
      <motion.h1
        initial={{ scale: 0.9 }}
        animate={{
          scale: 1,
          y: shouldReduceMotion ? 0 : [0, -5, 0]
        }}
        transition={
          shouldReduceMotion
            ? { duration: 0.5 }
            : {
                scale: { duration: 0.5 },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
        }
        className="text-4xl font-bold text-white mb-2"
      >
        Scrabble Word Builder
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-slate-400"
      >
        Find the highest scoring word from your letter rack
      </motion.p>
    </motion.div>
  );
}
