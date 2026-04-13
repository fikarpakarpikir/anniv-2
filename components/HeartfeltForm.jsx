'use client'
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'bunda_anniversary_form';

const steps = [
  {
    id: 'harapan',
    step: 1,
    title: 'Harapan',
    subtitle: 'Apa harapanmu untuk kita ke depan?',
    placeholder: 'Tuliskan harapan dan impianmu untuk kita berdua...',
    emoji: '🌟',
  },
  {
    id: 'ortu',
    step: 2,
    title: 'Ucapan untuk Orang Tua',
    subtitle: 'Apa yang ingin kamu sampaikan untuk orang tuamu?',
    placeholder: 'Tuliskan ucapan cinta untuk ayah & ibumu...',
    emoji: '💝',
  },
  {
    id: 'mertua',
    step: 3,
    title: 'Ucapan untuk Mertua',
    subtitle: 'Apa pesan spesialmu untuk mertua tercinta?',
    placeholder: 'Tuliskan rasa terima kasih untuk mertuamu...',
    emoji: '🙏',
  },
  {
    id: 'suami',
    step: 4,
    title: 'Ucapan untuk Suami',
    subtitle: 'Apa yang paling ingin kamu katakan padaku?',
    placeholder: 'Tuliskan isi hatimu untukku, Bunda...',
    emoji: '💌',
  },
];

export default function HeartfeltForm({ onFinale }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [saved, setSaved] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setAnswers(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  // Save to localStorage on every change
  const handleChange = (id, value) => {
    const updated = { ...answers, [id]: value };
    setAnswers(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const step = steps[currentStep];
  const allFilled = steps.every((s) => answers[s.id]?.trim());

  return (
    <section className="py-24 px-4 bg-linear-to-b from-ivory-dark to-ivory relative overflow-hidden">
      {/* BG decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-48 h-48 rounded-full bg-pink-light opacity-15 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-gold-champagne opacity-20 blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold text-sm tracking-[0.4em] uppercase font-inter font-light">Dari Hatimu</span>
          <h2 className="font-playfair text-4xl md:text-5xl mt-3 gold-gradient font-semibold">
            Pesan Spesialmu
          </h2>
          <div className="floral-divider mt-4">
            <span className="text-pink text-base">✿</span>
          </div>
        </motion.div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <button
                onClick={() => setCurrentStep(i)}
                className={`w-8 h-8 rounded-full text-xs font-inter font-semibold transition-all duration-300
                  ${i === currentStep ? 'step-active scale-110' : i < currentStep ? 'step-done' : 'step-inactive'}`}
              >
                {i < currentStep ? '✓' : i + 1}
              </button>
              {i < steps.length - 1 && (
                <div className={`w-8 h-px transition-colors duration-300 ${i < currentStep ? 'bg-pink' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gold-light/20 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="p-8 md:p-10"
            >
              {/* Step header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-pink-light to-pink flex items-center justify-center text-3xl shrink-0">
                  {step.emoji}
                </div>
                <div>
                  <div className="text-xs text-gold tracking-widest uppercase font-inter mb-1">
                    Langkah {step.step} dari {steps.length}
                  </div>
                  <h3 className="font-playfair text-2xl font-semibold text-(--text-dark)">{step.title}</h3>
                </div>
              </div>

              <p className="font-inter text-(--text-mid) text-sm mb-5 leading-relaxed">
                {step.subtitle}
              </p>

              <div className="relative">
                <textarea
                  value={answers[step.id] || ''}
                  onChange={(e) => handleChange(step.id, e.target.value)}
                  placeholder={step.placeholder}
                  rows={5}
                  className="w-full rounded-2xl border border-gold-light/30 bg-ivory p-4 font-inter text-sm text-(--text-dark) resize-none focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all placeholder:text-(--text-mid)/40"
                />
                {saved && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-3 right-3 text-xs text-green-500 flex items-center gap-1"
                  >
                    ✓ Tersimpan
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Footer nav */}
          <div className="px-8 md:px-10 pb-8 flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-5 py-2 rounded-full border border-gold-light/40 text-(--text-mid) text-sm font-inter hover:bg-ivory transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              ← Kembali
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 rounded-full bg-linear-to-r from-gold to-gold-light text-white text-sm font-inter font-medium hover:shadow-md transition-all"
              >
                Lanjut →
              </button>
            ) : (
              <motion.button
                onClick={onFinale}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-2.5 rounded-full bg-linear-to-r from-pink-400 to-pink-900 text-white text-sm font-inter font-semibold"
              >
                Selesai 🎉
              </motion.button>
            )}
          </div>
        </div>

        <p className="text-center text-xs font-inter text-(--text-mid) mt-4 opacity-60">
          📱 Tenang, semua jawaban aman gabakal ilang ko
        </p>
      </div>
    </section>
  );
}
