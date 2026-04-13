import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Finale({ show, onClose }) {
  const [showPhoto, setShowPhoto] = useState(false);

  const handleYes = () => setShowPhoto(true);

  return (
    <AnimatePresence>
      {show && !showPhoto && (
        <motion.div
          key="confirm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
        >
          <motion.div
            initial={{ scale: 0.7, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.7, y: 40 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            className="bg-white rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl border border-pink-light/40"
          >
            <div className="text-6xl mb-4">💝</div>
            <h3 className="font-playfair text-3xl font-semibold text-(--text-dark) mb-3">
              Kamu sekarang bahagia, Bunda?
            </h3>
            <p className="font-inter text-(--text-mid) text-sm mb-8 leading-relaxed">
              Dari lubuk hati yang paling dalam, aku ingin tahu...
            </p>
            <div className="flex gap-3 justify-center">
              <motion.button
                onClick={handleYes}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glow-btn flex-1 py-3 rounded-2xl bg-linear-to-r from-gold to-gold-light text-white font-playfair text-lg font-semibold"
              >
                Ya 💛
              </motion.button>
              <motion.button
                onClick={handleYes}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3 rounded-2xl border-2 border-pink text-pink font-playfair text-lg font-semibold hover:bg-pink/5 transition-colors"
              >
                Sangat! 🌸
              </motion.button>
            </div>
            <button
              onClick={onClose}
              className="mt-5 text-xs text-(--text-mid)/50 font-inter hover:text-(--text-mid) transition-colors"
            >
              ← Kembali
            </button>
          </motion.div>
        </motion.div>
      )}

      {showPhoto && (
        <motion.div
          key="photo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="fixed inset-0 z-50"
        >
          {/* ── Layer 1: full-screen photo ── */}
          <div className="absolute inset-0">
            {/* Gradient fallback — shows while photo loads or if file is missing */}
            <div className="absolute inset-0 bg-linear-to-br from-pink-dark/90 via-[#3D1A28] to-[#1A0D14]" />

            {/* The photo itself — covers every pixel */}
            <Image
              src="/compress/root/5.JPEG"
              alt="Wedding"
              fill
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Vignette: darkens edges so white text stays legible */}
            <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/50 to-black/85" />
          </div>

          {/* ── Layer 2: petal rain ── */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="petal absolute pointer-events-none"
              style={{
                left: `${5 + i * 8}%`,
                animationDuration: `${4 + i * 0.7}s`,
                animationDelay: `${i * 0.3}s`,
                fontSize: `${14 + (i % 4) * 6}px`,
              }}
            >
              🌸
            </div>
          ))}

          {/* ── Layer 3: centered text ── */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="relative z-10 text-center max-w-2xl w-full"
            >
              {/* Gold ornament line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex items-center justify-center gap-3 mb-8"
              >
                <div className="h-px w-20 bg-linear-to-r from-transparent to-gold-light" />
                <span className="text-gold text-lg">✦</span>
                <div className="h-px w-20 bg-linear-to-l from-transparent to-gold-light" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 1.2 }}
                className="font-playfair text-xl md:text-2xl lg:text-3xl leading-relaxed font-medium drop-shadow-lg mb-56"
                style={{ color: '#F5E6C8' }}
              >
                Terima kasih sayang, dari 2 tahun kemarin, hari ini, dan seterusnya,{' '}
                <span style={{ color: '#E8C97A' }}>
                  kamu wanita hebat yang membuat keluarga kita terus hangat.
                </span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.2, duration: 0.6 }}
                className="mt-10"
              >
                <span className="text-gold text-4xl drop-shadow-lg">♥</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.8 }}
                className="font-inter text-xs tracking-[0.4em] uppercase mt-6 opacity-60"
                style={{ color: '#F5E6C8' }}
              >
                14 April 2024 — Selamanya
              </motion.p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
                onClick={()=>{onClose(); setShowPhoto(false)}}
                className="mt-12 px-6 py-2 rounded-full border border-white/20 text-white/60 text-xs font-inter hover:text-white/80 transition-colors"
              >
                ← Kembali ke Kenangan
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
