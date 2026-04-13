/* eslint-disable react-hooks/set-state-in-effect */
'use client'
import { useEffect, useState } from 'react';

const petalEmojis = ['🌸', '🌹', '✿', '❀', '🌺'];

export default function FloatingPetals({ active }) {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    if (!active) return;
    const generated = [...Array(15)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${5 + Math.random() * 8}s`,
      delay: `${Math.random() * 4}s`,
      emoji: petalEmojis[Math.floor(Math.random() * petalEmojis.length)],
      size: `${12 + Math.floor(Math.random() * 16)}px`,
    }));
    setPetals(generated);
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal absolute opacity-40"
          style={{
            left: p.left,
            animationDuration: p.duration,
            animationDelay: p.delay,
            fontSize: p.size,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
