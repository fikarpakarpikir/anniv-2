"use client"

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Head from "next/head";

import TimeGate from "@/components/TimeGate";
import NumbersSection from "@/components/NumbersSection";
import MemoriesSection from "@/components/MemoriesSection";
import NetflixSection from "@/components/NetflixSection";
import HeartfeltForm from "@/components/HeartfeltForm";
import Finale from "@/components/Finale";
import MusicToggle from "@/components/MusicToggle";
import FloatingPetals from "@/components/FloatingPetals";

const HeartCursor = dynamic(() => import("@/components/HeartCursor"), {
  ssr: false,
});

export default function Home() {
  const [revealed, setRevealed] = useState(false);
  const [showFinale, setShowFinale] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio("/lagu/lagu.mp3");
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const fadeInAudio = (audio) => {
    let vol = 0;
    audio.volume = 0;
    audio.play().catch(() => {});
    const fade = setInterval(() => {
      vol = Math.min(vol + 0.02, 0.5);
      audio.volume = vol;
      if (vol >= 0.5) clearInterval(fade);
    }, 100);
  };

  const handleReveal = async () => {
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 180,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#E8A4B8", "#C9A84C", "#F5D5E0", "#E8C97A", "#ffffff"],
      });
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 60,
          origin: { x: 0.1, y: 0.7 },
          colors: ["#E8A4B8", "#C9A84C"],
        });
        confetti({
          particleCount: 100,
          spread: 60,
          origin: { x: 0.9, y: 0.7 },
          colors: ["#E8A4B8", "#E8C97A"],
        });
      }, 400);
    } catch (e) {}

    if (audioRef.current) {
      fadeInAudio(audioRef.current);
      setMusicPlaying(true);
    }
    setRevealed(true);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setMusicPlaying(true);
    }
  };

  return (
    <div className="bg-white text-gray-600 w-screen overflow-hidden">
      <Head>
        <title>Happy 2nd Anniversary Bunda 💕</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Selamat 2 tahun pernikahan kita, Bunda"
        />
      </Head>

      <HeartCursor />
      <FloatingPetals active={revealed} />

      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="timegate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <TimeGate onReveal={handleReveal} />
          </motion.div>
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-ivory min-h-screen"
          >
            <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 rounded-full bg-pink-light opacity-15 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-gold-champagne opacity-20 blur-3xl" />
              </div>
              <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-gold to-transparent" />

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="relative z-10 max-w-3xl"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-14 bg-linear-to-r from-transparent to-gold-light" />
                  <span className="text-gold text-xs tracking-widest uppercase font-inter">
                    14 April 2024 — 14 April 2026
                  </span>
                  <div className="h-px w-14 bg-linear-to-l from-transparent to-gold-light" />
                </div>

                <h1 className="font-playfair text-6xl md:text-8xl font-bold leading-tight gold-gradient">
                  Happy
                </h1>
                <h1 className="font-playfair text-5xl md:text-7xl font-semibold leading-tight text-pink-dark">
                  2nd Anniversary
                </h1>
                <h2 className="font-playfair italic text-4xl md:text-5xl mt-2 text-[#6B4E4E]">
                  Sayang 💕
                </h2>

                <div className="floral-divider my-8 max-w-sm mx-auto">
                  <span className="text-pink text-2xl">✿</span>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="font-playfair text-[#6B4E4E] text-lg leading-relaxed max-w-xl mx-auto"
                >
                  Dua tahun sudah kita lewatin semuanya bareng. Setiap hari bareng terus
                  adalah rasa syukur terbesar yang pernah Allah kasih.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  className="mt-40"
                >
                  <a
                    href="#journey"
                    className="inline-flex items-center gap-2 text-gold text-sm font-inter tracking-widest uppercase hover:gap-3 transition-all"
                  >
                    Scroll
                    <motion.span
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ↓
                    </motion.span>
                  </a>
                </motion.div>
              </motion.div>

              <div className="absolute top-8 left-8 text-pink-light opacity-30 text-4xl pointer-events-none select-none">
                🌸
              </div>
              <div className="absolute top-8 right-8 text-pink-light opacity-30 text-4xl pointer-events-none select-none">
                🌸
              </div>
              <div className="absolute bottom-12 left-12 text-gold opacity-20 text-3xl pointer-events-none select-none">
                ✿
              </div>
              <div className="absolute bottom-12 right-12 text-gold opacity-20 text-3xl pointer-events-none select-none">
                ✿
              </div>
            </section>

            <div id="journey">
              <NumbersSection />
            </div>
            <MemoriesSection />
            <NetflixSection />
            <HeartfeltForm onFinale={() => setShowFinale(true)} />

            <footer className="py-12 bg-ivory text-center border-t border-gold-light/20">
              <div className="text-gold text-2xl mb-3">♥</div>
              <p className="font-playfair italic text-[#6B4E4E] text-lg">
                &quot;Kamu adalah rumah terhangat yang pernah aku kenal&quot;
              </p>
              <p className="font-inter text-xs text-[#6B4E4E] opacity-40 mt-4 tracking-widest uppercase">
                Made with love · 14 April 2026
              </p>
            </footer>

            <MusicToggle isPlaying={musicPlaying} onToggle={toggleMusic} />
          </motion.main>
        )}
      </AnimatePresence>

      <Finale show={showFinale} onClose={() => setShowFinale(false)} />
    </div>
  );
}
