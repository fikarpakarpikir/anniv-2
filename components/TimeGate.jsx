'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// const TARGET_DATE = new Date('2026-04-14T00:00:00');
const TARGET_DATE = new Date('2026-04-13T00:00:00');

function pad(n) {
  return String(n).padStart(2, '0');
}

function getTimeLeft() {
  const now = new Date();
  const diff = TARGET_DATE - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function TimeGate({ onReveal }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isReady = timeLeft === null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative petals bg */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="petal absolute text-pink-light opacity-30 text-2xl"
            style={{
              left: `${10 + i * 12}%`,
              animationDuration: `${6 + i * 1.5}s`,
              animationDelay: `${i * 0.8}s`,
              fontSize: `${16 + (i % 3) * 8}px`,
            }}
          >
            🌸
          </div>
        ))}
      </div>

      {/* Top monogram */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-light" />
          <span className="text-gold text-sm tracking-[0.4em] uppercase font-inter font-light">2nd Anniversary</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-light" />
        </div>
        <h1 className="font-playfair text-5xl md:text-7xl gold-gradient font-semibold leading-tight">
          Buat Bunda
        </h1>
        <p className="font-playfair italic text-pink-dark text-xl mt-2">
          with ♡
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!isReady ? (
          <motion.div
            key="countdown"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="font-inter text-[var(--text-mid)] text-base md:text-lg mb-8 max-w-md mx-auto leading-relaxed">
              Sabar ya, lagi disiapin dulu...
            </p>

            {/* Countdown boxes */}
            <div className="flex gap-4 md:gap-6 justify-center">
              {[
                { label: 'Hari', value: timeLeft?.days },
                { label: 'Jam', value: timeLeft?.hours },
                { label: 'Menit', value: timeLeft?.minutes },
                { label: 'Detik', value: timeLeft?.seconds },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gold-light/40">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={value}
                        initial={{ y: -15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 15, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="font-playfair text-2xl md:text-3xl gold-gradient font-bold text-gray-500"
                      >
                        {pad(value ?? 0)}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <span className="text-[10px] md:text-xs text-[var(--text-mid)] mt-2 tracking-widest uppercase font-inter">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Decorative flower row */}
            <div className="floral-divider mt-10 max-w-xs mx-auto">
              <span className="text-pink text-lg">✿</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-center"
          >
            <p className="font-playfair italic text-[var(--text-mid)] text-lg mb-8">
              Saatnya membuka hadiah spesialmu, Bunda ✨
            </p>
            <motion.button
              onClick={onReveal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="glow-btn relative px-10 py-2 bg-linear-to-r from-gold-dark via-gold to-gold-light text-white font-playfair text-xl font-semibold rounded-full border border-gold-light/30"
            >
              <span className="relative z-10">🤍 Buka</span>
              <motion.div
                className="absolute inset-0 rounded-full bg-gold-light opacity-20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom ornament */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 text-center text-[var(--text-mid)] text-sm font-inter"
      >
        <span className="text-gold opacity-60">❧</span>
        <span className="block mt-1 text-xs tracking-widest opacity-50 uppercase">14 April 2024 — 14 April 2026</span>
      </motion.div>
    </div>
  );
}
