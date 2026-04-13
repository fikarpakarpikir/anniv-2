'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const movies = [
  { id: 1, title: 'First Date', subtitle: 'The Beginning', year: '2024', emoji: '🍽️', gradient: 'from-rose-300 to-pink-500', photos: 3 },
  { id: 2, title: 'Weekend Escape', subtitle: 'Our Getaway', year: '2024', emoji: '🌊', gradient: 'from-sky-300 to-blue-500', photos: 4 },
  { id: 3, title: 'Home is You', subtitle: 'Everyday Bliss', year: '2024', emoji: '🏡', gradient: 'from-amber-200 to-yellow-400', photos: 2 },
  { id: 4, title: 'Night Out', subtitle: 'Dancing Stars', year: '2024', emoji: '🌃', gradient: 'from-indigo-400 to-purple-600', photos: 5 },
  { id: 5, title: 'Rainy Days', subtitle: 'Cozy Together', year: '2025', emoji: '☔', gradient: 'from-slate-300 to-gray-400', photos: 3 },
  { id: 6, title: 'Culinary Adventure', subtitle: 'We Love Food', year: '2025', emoji: '🍜', gradient: 'from-orange-300 to-red-400', photos: 4 },
  { id: 7, title: 'Morning Coffee', subtitle: 'Lazy Sundays', year: '2025', emoji: '☕', gradient: 'from-amber-400 to-brown-500', photos: 2 },
  { id: 8, title: 'Sunset Views', subtitle: 'Golden Hours', year: '2025', emoji: '🌅', gradient: 'from-orange-400 to-pink-500', photos: 5 },
  { id: 9, title: 'Family Moments', subtitle: 'Full of Love', year: '2025', emoji: '👨‍👩‍👧', gradient: 'from-green-300 to-emerald-500', photos: 4 },
  { id: 10, title: '2 Years Strong', subtitle: 'Forever Begins', year: '2026', emoji: '💍', gradient: 'from-yellow-300 to-gold-500', photos: 3 },
];

const photoEmojis = ['💑','📸','🥂','🌹','✨','💕','🎉','🌸','💫','🎊'];

function MiniGallery({ movie, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 30 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`relative bg-linear-to-br ${movie.gradient} h-48 flex flex-col items-center justify-center`}>
          <span className="text-6xl mb-2">{movie.emoji}</span>
          <h3 className="font-playfair text-white text-2xl font-bold drop-shadow">{movie.title}</h3>
          <p className="font-inter text-white/80 text-sm">{movie.subtitle} · {movie.year}</p>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Mini gallery grid */}
        <div className="p-6">
          <p className="font-inter text-xs text-(--text-mid) tracking-widest uppercase mb-4">
            {movie.photos} Foto dari Kenangan Ini
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[...Array(movie.photos)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl overflow-hidden aspect-square bg-linear-to-br ${movie.gradient} opacity-${70 + i * 5} flex items-center justify-center`}
              >
                <span className="text-3xl">{photoEmojis[(i + movie.id) % photoEmojis.length]}</span>
              </motion.div>
            ))}
          </div>
          <p className="font-playfair italic text-(--text-mid) text-sm text-center mt-5">
            &quot;Setiap foto menyimpan sejuta kenangan indah&quot; 🌸
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function NetflixSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-24 bg-linear-to-b from-[#1a0a0f] to-[#0d0508] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-end justify-between">
            <div>
              <span className="text-pink text-sm tracking-[0.4em] uppercase font-inter font-light">Date Nights</span>
              <h2 className="font-playfair text-4xl md:text-5xl mt-2 text-white font-semibold">
                Our <span className="text-pink">Love</span> Collection
              </h2>
            </div>
            <span className="text-(--text-mid) text-xs font-inter hidden md:block">Klik poster untuk melihat galeri</span>
          </div>
          <div className="h-px w-full bg-linear-to-r from-pink/40 via-gold/20 to-transparent mt-4" />
        </motion.div>

        {/* Slider */}
        <div className="netflix-slider overflow-x-auto pb-4 -mx-2 px-2">
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {movies.map((movie, i) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.06, y: -8 }}
                onClick={() => setSelected(movie)}
                className="relative shrink-0 w-36 md:w-44 rounded-2xl overflow-hidden shadow-2xl group"
                style={{ aspectRatio: '2/3' }}
              >
                {/* Poster */}
                <div className={`w-full h-full bg-linear-to-br ${movie.gradient} flex flex-col items-center justify-center p-4`}>
                  <span className="text-5xl mb-3">{movie.emoji}</span>
                  <h4 className="font-playfair text-white text-center text-sm font-bold leading-tight">{movie.title}</h4>
                  <p className="font-inter text-white/70 text-[10px] mt-1 text-center">{movie.subtitle}</p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                  <span className="text-white text-2xl">▶</span>
                  <span className="text-white/80 text-xs font-inter">{movie.year}</span>
                  <span className="text-pink text-[10px] font-inter">{movie.photos} foto</span>
                </div>

                {/* Year badge */}
                <div className="absolute top-2 right-2 bg-black/50 text-white/80 text-[9px] px-2 py-0.5 rounded-full font-inter">
                  {movie.year}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && <MiniGallery movie={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
