'use client'
import { motion } from 'framer-motion';

const memories = [
  { id: 1, label: 'Hari Pertama Kita', emoji: '💑' },
  { id: 2, label: 'Liburan Bersama', emoji: '🌊' },
  { id: 3, label: 'Momen Spesial', emoji: '🌹' },
  { id: 4, label: 'Kebersamaan Kita', emoji: '🏠' },
  { id: 5, label: 'Kenangan Indah', emoji: '⭐' },
];

const praises = [
  {
    text: 'Kamu adalah sinar matahari yang selalu menerangi hariku, Bunda. Senyummu adalah alasan terbaik untuk bangun pagi.',
    attr: '— dari hati suamimu',
    from: 'left',
  },
  {
    text: 'Dua tahun bukan waktu yang lama, tapi bersamamu terasa seperti seumur hidup yang ingin kuulang terus-terus.',
    attr: '— untuk wanita terhebatku',
    from: 'right',
  },
  {
    text: 'Kamu bukan hanya istriku, Bunda. Kamu adalah rumahku, sahabatku, dan cinta terbesarku.',
    attr: '— selamanya, suamimu',
    from: 'left',
  },
];

function PhotoPlaceholder({ label, emoji, index }) {
  const colors = [
    'from-pink-light to-pink',
    'from-gold-champagne to-gold-light',
    'from-pink to-pink-dark',
    'from-ivory-dark to-pink-light',
    'from-gold-light to-gold',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative w-full overflow-hidden rounded-3xl shadow-xl"
      style={{ height: 'clamp(300px, 50vw, 520px)' }}
    >
      <div className={`w-full h-full bg-gradient-to-br ${colors[index % colors.length]} flex flex-col items-center justify-center`}>
        <span className="text-8xl mb-4">{emoji}</span>
        <span className="font-playfair text-white/80 text-xl font-medium tracking-wide drop-shadow-md">{label}</span>
        <span className="font-inter text-white/50 text-xs mt-2 tracking-widest uppercase">Foto #{index + 1}</span>
      </div>
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      <div className="absolute bottom-6 left-6 right-6">
        <div className="h-px bg-gradient-to-r from-white/40 to-transparent mb-3" />
        <span className="font-playfair text-white text-sm italic">{label}</span>
      </div>
    </motion.div>
  );
}

function PraiseCard({ text, attr, from, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: from === 'left' ? -80 : 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 60 }}
      className={`flex ${from === 'right' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`relative max-w-lg bg-white rounded-3xl p-8 shadow-lg border border-gold-light/30
          ${from === 'right' ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}
      >
        {/* Quote mark */}
        <span className="font-playfair text-6xl text-pink-light/60 leading-none absolute top-4 left-5">&quot;</span>

        <p className="font-playfair italic text-[var(--text-dark)] text-lg leading-relaxed relative z-10 mt-4">
          {text}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-gradient-to-r from-pink-light to-transparent" />
          <span className="text-xs font-inter text-gold tracking-wide">{attr}</span>
        </div>

        {/* Corner rose */}
        <span className="absolute bottom-4 right-5 text-pink-light text-xl">🌸</span>
      </div>
    </motion.div>
  );
}

export default function MemoriesSection() {
  return (
    <section className="py-24 px-4 md:px-8 bg-ivory">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm tracking-[0.4em] uppercase font-inter font-light">Scroll & Kenang</span>
          <h2 className="font-playfair text-4xl md:text-5xl mt-3 gold-gradient font-semibold">
            Memori Kita Berdua
          </h2>
          <div className="floral-divider mt-4">
            <span className="text-pink text-base">✿</span>
          </div>
        </motion.div>

        {/* Alternating photos + praises */}
        <div className="space-y-10">
          {/* Photo 1 */}
          <PhotoPlaceholder {...memories[0]} index={0} />

          {/* Praise 1 - from left */}
          <PraiseCard {...praises[0]} index={0} />

          {/* Photo 2 */}
          <PhotoPlaceholder {...memories[1]} index={1} />

          {/* Praise 2 - from right */}
          <PraiseCard {...praises[1]} index={1} />

          {/* Photo 3 */}
          <PhotoPlaceholder {...memories[2]} index={2} />

          {/* Praise 3 - from left */}
          <PraiseCard {...praises[2]} index={2} />

          {/* Photo 4 */}
          <PhotoPlaceholder {...memories[3]} index={3} />

          {/* Photo 5 */}
          <PhotoPlaceholder {...memories[4]} index={4} />
        </div>
      </div>
    </section>
  );
}
