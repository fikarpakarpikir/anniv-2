'use client'
import { motion } from 'framer-motion';

export default function MusicToggle({ isPlaying, onToggle }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
      onClick={onToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-white shadow-xl border border-gold-light/40 flex items-center justify-center"
      title={isPlaying ? 'Pause musik' : 'Play musik'}
    >
      {isPlaying ? (
        <motion.div
          className="flex gap-0.5 items-end h-5"
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-gold rounded-full"
              animate={{ height: ['8px', '20px', '8px'] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      ) : (
        <span className="text-gold text-lg">♪</span>
      )}
    </motion.button>
  );
}
