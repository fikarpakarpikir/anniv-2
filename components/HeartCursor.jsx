'use client'
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function HeartCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const [clicked, setClicked] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.5 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const move = (e) => {
      mouseX.set(e.clientX - 12);
      mouseY.set(e.clientY - 12);
    };

    const click = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 400);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', click);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', click);
    };
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      animate={clicked ? { scale: 1.8 } : { scale: 1 }}
      transition={clicked ? { type: 'spring', stiffness: 400, damping: 10 } : { type: 'spring', stiffness: 300 }}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="#E8A4B8"
          stroke="#C9A84C"
          strokeWidth="0.5"
          filter="drop-shadow(0 1px 3px rgba(201,168,76,0.4))"
        />
      </svg>
    </motion.div>
  );
}
