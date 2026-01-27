import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  const orbs = [
    {
      color: 'from-amber-500/20 to-orange-500/20',
      size: 400,
      initialX: -100,
      initialY: -100,
      delay: 0
    },
    {
      color: 'from-emerald-500/20 to-green-500/20',
      size: 300,
      initialX: 100,
      initialY: 50,
      delay: 5
    },
    {
      color: 'from-slate-500/20 to-slate-700/20',
      size: 350,
      initialX: -50,
      initialY: 100,
      delay: 10
    }
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full bg-gradient-to-br ${orb.color} blur-3xl`}
          style={{
            width: orb.size,
            height: orb.size,
            left: '50%',
            top: '50%',
            marginLeft: -orb.size / 2,
            marginTop: -orb.size / 2,
          }}
          initial={{
            x: orb.initialX,
            y: orb.initialY,
          }}
          animate={{
            x: [
              orb.initialX,
              orb.initialX + (Math.random() * 200 - 100),
              orb.initialX - (Math.random() * 200 - 100),
              orb.initialX
            ],
            y: [
              orb.initialY,
              orb.initialY - (Math.random() * 200 - 100),
              orb.initialY + (Math.random() * 200 - 100),
              orb.initialY
            ],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
