/* eslint-disable react-hooks/set-state-in-effect */
'use client'
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function CountUp({ target, duration = 2, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView || target === null) return;
    if (target === Infinity || target === '∞') {
      setCount('∞');
      return;
    }
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const stats = [
  {
    number: 730,
    suffix: '',
    label: 'Hari Hebat',
    desc: 'Setiap harinya menjadi lebih berarti bersamamu',
    icon: '☀️',
  },
  {
    number: 24,
    suffix: '',
    label: 'Bulan Bahagia',
    desc: 'Dua puluh empat bulan penuh tawa dan cinta',
    icon: '🌙',
  },
  {
    number: null,
    suffix: '',
    label: 'Tak Terhingga Kenangan',
    desc: 'Setiap momen bersamamu tak ternilai harganya',
    icon: '✨',
    special: '∞',
  },
];

export default function NumbersSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-ivory to-ivory-dark relative overflow-hidden">
      {/* BG decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-pink-light opacity-10 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-gold-champagne opacity-20 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm tracking-[0.4em] uppercase font-inter font-light">Perjalanan Kita</span>
          <h2 className="font-playfair text-4xl md:text-5xl mt-3 gold-gradient font-semibold">
            Our Journey in Numbers
          </h2>
          <div className="floral-divider mt-4">
            <span className="text-pink text-base">✿</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative group"
            >
              <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-gold-light/20 hover:border-gold/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Icon */}
                <div className="text-4xl mb-4">{stat.icon}</div>

                {/* Number */}
                <div className="font-playfair text-5xl md:text-6xl gold-gradient font-bold leading-none mb-3">
                  {stat.special ? (
                    <CountUp target="∞" />
                  ) : (
                    <CountUp target={stat.number} duration={2.5} />
                  )}
                </div>

                {/* Label */}
                <h3 className="font-playfair text-xl text-[var(--text-dark)] mb-3 font-semibold">
                  {stat.label}
                </h3>

                {/* Divider */}
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-pink to-transparent mx-auto mb-3" />

                {/* Description */}
                <p className="font-inter text-sm text-[var(--text-mid)] leading-relaxed">
                  {stat.desc}
                </p>

                {/* Corner decoration */}
                <div className="absolute top-4 right-4 text-gold-light opacity-30 text-xs">❋</div>
                <div className="absolute bottom-4 left-4 text-pink-light opacity-30 text-xs">❋</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
