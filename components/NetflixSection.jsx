'use client'
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
// import { PhotoSlot } from './PhotoSlot';

const movies = [
  { id: 1, title: 'First Step', subtitle: 'The Beginning', year: '2024', emoji: '💍', gradient: 'from-rose-300 to-pink-500', photos: 7 },
  { id: 2, title: 'When We were Children', subtitle: 'Cozy Together', year: '2023', emoji: '✨', gradient: 'from-slate-300 to-gray-400', photos: 7 },
  { id: 3, title: 'Coffee', subtitle: 'Lazy Sundays', year: '2023', emoji: '☕', gradient: 'from-amber-400 to-brown-500', photos: 14 },
  { id: 4, title: 'Home is You', subtitle: 'Everyday Bliss', year: '2024', emoji: '🏡', gradient: 'from-amber-200 to-yellow-400', photos: 5 },
  { id: 5, title: 'Night Out', subtitle: 'Dancing Stars', year: '2024', emoji: '🌃', gradient: 'from-indigo-400 to-purple-600', photos: 4 },
  { id: 6, title: 'Golden Us', subtitle: 'Golden Hours', year: '2025', emoji: '🌅', gradient: 'from-orange-400 to-pink-500', photos: 15 },
  { id: 7, title: 'New Member', subtitle: 'Growing Together', year: '2025', emoji: '👶🏻', gradient: 'from-pink-300 to-pink-500', photos: 41 },
  { id: 8, title: 'Family Moments', subtitle: 'Full of Love', year: '2025', emoji: '👨‍👩‍👧', gradient: 'from-green-300 to-emerald-500', photos: 22 },
  { id: 9, title: '2 Years Strong', subtitle: 'Forever Begins', year: '2026', emoji: '💍', gradient: 'from-yellow-300 to-gold-500', photos: 20 },
];

const photoEmojis = ['💑','📸','🥂','🌹','✨','💕','🎉','🌸','💫','🎊'];

// function MiniGallery({ movie, onClose }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.85, y: 30 }}
//         animate={{ scale: 1, y: 0 }}
//         exit={{ scale: 0.85, y: 30 }}
//         transition={{ type: 'spring', stiffness: 200, damping: 22 }}
//         className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className={`relative bg-linear-to-br ${movie.gradient} h-48 flex flex-col items-center justify-center`}>
//           <span className="text-6xl mb-2">{movie.emoji}</span>
//           <h3 className="font-playfair text-white text-2xl font-bold drop-shadow">{movie.title}</h3>
//           <p className="font-inter text-white/80 text-sm">{movie.subtitle} · {movie.year}</p>
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Mini gallery grid */}
//         <div className="p-6">
//           <p className="font-inter text-xs text-(--text-mid) tracking-widest uppercase mb-4">
//             {movie.photos} Foto dari Kenangan Ini
//           </p>
//           <div className="grid grid-cols-3 gap-3">
//             {[...Array(movie.photos)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: i * 0.08 }}
//                 className={`rounded-2xl overflow-hidden aspect-square bg-linear-to-br ${movie.gradient} opacity-${70 + i * 5} flex items-center justify-center relative`}
//               >
//                 {/* <span className="text-3xl">{photoEmojis[(i + movie.id) % photoEmojis.length]}</span> */}
//                 <PhotoSlot src={`/foto/${movie.id}/${i + 1}.JPG`} alt={`Foto ${i + 1} dari ${movie.title}`}/>
//               </motion.div>
//             ))}
//           </div>
//           <p className="font-playfair italic text-(--text-mid) text-sm text-center mt-5">
//             &quot;Setiap foto menyimpan sejuta kenangan indah&quot; 🌸
//           </p>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

function getPhotos(movie) {
  return Array.from({ length: movie.photos }, (_, i) => ({
    index: i,
    src: `/compress/${movie.id}/${i + 1}.jpeg`,
    alt: `${movie.title} – foto ${i + 1}`,
  }));
}

// ─── Photo Slot: shows image with fallback gradient placeholder ──────────────
function PhotoSlot({ src, alt, gradient, onClick }) {
  const [status, setStatus] = useState('loading'); // 'loading' | 'loaded' | 'error'

  return (
    <div
      onClick={onClick}
      className="relative w-full h-full overflow-hidden rounded-2xl group"
      style={{ cursor: 'none' }}
    >
      {/* Fallback / loading background */}
      <div className={`absolute inset-0 bg-linear-to-br ${gradient} transition-opacity duration-300 ${status === 'loaded' ? 'opacity-0' : 'opacity-100'}`}>
        {status === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
          </div>
        )}
        {status === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-60">
            <span className="text-white text-2xl">📷</span>
            <span className="text-white/60 text-[9px] font-inter">No photo</span>
          </div>
        )}
      </div>

      {/* Actual image */}
      {status !== 'error' && (
        <Image
          src={src}
          alt={alt}
        //   fill
        width={150} height={150}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {/* Hover overlay */}
      {onClick && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
          <span className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg">🔍</span>
        </div>
      )}
    </div>
  );
}

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({ photos, initialIndex, gradient, onClose }) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(() => setCurrent(c => (c - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setCurrent(c => (c + 1) % photos.length), [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next, onClose]);

  // Swipe support
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -50) next();
    if (dx > 50) prev();
    touchStartX.current = null;
  };

  const photo = photos[current];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/95"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white text-lg transition-colors"
      >
        ✕
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-xs font-inter tracking-widest">
        {current + 1} / {photos.length}
      </div>

      {/* Prev / Next */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-3 md:left-8 z-10 w-11 h-11 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white text-lg transition-colors"
      >
        ‹
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-3 md:right-8 z-10 w-11 h-11 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white text-lg transition-colors"
      >
        ›
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.18 }}
          className="relative flex items-center justify-center px-16 md:px-24"
          style={{ maxWidth: '200vw', maxHeight: '200vh' }}
          onClick={(e) => e.stopPropagation()}
        >
          <LightboxImage photo={photo} gradient={gradient} />
        </motion.div>
      </AnimatePresence>

      {/* Filmstrip thumbnails — only shown when ≤ 30 photos for perf */}
      {photos.length <= 30 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 overflow-x-auto max-w-[90vw]">
          {photos.map((p, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              className={`relative shrink-0 w-10 h-10 rounded-lg overflow-hidden border-2 transition-all ${i === current ? 'border-gold scale-110' : 'border-transparent opacity-50'}`}
            >
              <ThumbImage src={p.src} gradient={gradient} />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function LightboxImage({ photo, gradient }) {
  const [status, setStatus] = useState('loading');
  return (
    <div className="relative flex items-center justify-center" style={{ minWidth: 200, minHeight: 200 }}>
      {status !== 'loaded' && (
        <div className={`w-64 h-64 md:w-96 md:h-96 rounded-2xl bg-linear-to-br ${gradient} flex items-center justify-center`}>
          {status === 'loading'
            ? <div className="w-8 h-8 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            : <span className="text-white/50 text-4xl">📷</span>
          }
        </div>
      )}
      <Image
        src={photo.src}
        alt={photo.alt} width={400} height={400}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        className={`max-h-[80vh] max-w-[80vw] rounded-2xl shadow-2xl object-contain transition-opacity duration-300 ${status === 'loaded' ? 'opacity-100' : 'opacity-0 absolute'}`}
      />
    </div>
  );
}

function ThumbImage({ src, gradient }) {
  const [err, setErr] = useState(false);
  return err
    ? <div className={`w-full h-full bg-linear-to-br ${gradient}`} />
    : <Image fill src={src} className="w-full h-full object-cover" onError={() => setErr(true)} alt="" />;
}

// ─── MiniGallery ─────────────────────────────────────────────────────────────
// Virtualised: renders photos in pages of PAGE_SIZE to stay fast with 50+
const PAGE_SIZE = 30;

function MiniGallery({ movie, onClose }) {
  const photos = getPhotos(movie);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [page, setPage] = useState(1);

  const visiblePhotos = photos.slice(0, page * PAGE_SIZE);
  const hasMore = visiblePhotos.length < photos.length;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-3 py-6 md:px-6 md:py-10"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.88, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.88, y: 30 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          className="bg-white rounded-3xl overflow-hidden w-full shadow-2xl flex flex-col"
          style={{ maxWidth: 680, maxHeight: '90vh' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`relative bg-linear-to-br ${movie.gradient} py-10 flex flex-col items-center justify-center shrink-0`}>
            <span className="text-5xl mb-2">{movie.emoji}</span>
            <h3 className="font-playfair text-white text-2xl font-bold drop-shadow">{movie.title}</h3>
            <p className="font-inter text-white/80 text-sm">{movie.subtitle} · {movie.year}</p>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Scrollable gallery body */}
          <div className="overflow-y-auto flex-1 overscroll-contain" style={{ scrollbarWidth: 'thin' }}>
            <div className="p-5 md:p-6">
              <p className="font-inter text-xs text-(--text-mid) tracking-widest uppercase mb-4">
                {photos.length} Foto:
                {photos.length > PAGE_SIZE && ` · show ${visiblePhotos.length}`}
              </p>

              {/* Masonry-style grid: 3 cols always, rows adapt */}
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {visiblePhotos.map((photo, i) => (
                  <motion.div
                    key={photo.index}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: Math.min(i, 12) * 0.04 }}
                    className="aspect-square rounded-xl overflow-hidden"
                    onClick={() => setLightboxIndex(photo.index)}
                  >
                    <PhotoSlot
                      src={photo.src}
                      alt={photo.alt}
                      gradient={movie.gradient}
                      onClick={() => setLightboxIndex(photo.index)}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Load more */}
              {hasMore && (
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="mt-5 w-full py-3 rounded-2xl border border-gold-light/40 text-gold text-sm font-inter hover:bg-ivory transition-colors"
                >
                  Tampilkan lebih banyak ({photos.length - visiblePhotos.length} foto lagi)
                </button>
              )}

              <p className="font-playfair italic text-(--text-mid) text-sm text-center mt-5">
                &quot;Setiap foto menyimpan sejuta kenangan indah&quot; 🌸
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Lightbox on top */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={photos}
            initialIndex={lightboxIndex}
            gradient={movie.gradient}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
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
