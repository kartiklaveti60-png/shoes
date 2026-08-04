import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Lock scrolling while loader is active
    document.body.style.overflow = 'hidden';

    // After 3.0 seconds start exit animation
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3000);

    // After 3.6 seconds notify parent component that intro is complete
    const finishTimer = setTimeout(() => {
      document.body.style.overflow = 'unset';
      onComplete();
    }, 3600);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  const brandName = "SOLE";

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden select-none"
        >
          {/* Crimson Red Animated Ambient Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.18)_0%,transparent_70%)] pointer-events-none" />

          {/* Top Crimson Line Accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent shadow-[0_0_10px_#E50914]"
          />

          {/* Main Logo Container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Sneaker Monogram Icon Accent */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-6 flex items-center justify-center"
            >
              <div className="w-12 h-12 rounded-full border border-[#E50914]/50 flex items-center justify-center bg-black/80 backdrop-blur-md shadow-[0_0_30px_rgba(229,9,20,0.4)]">
                <span className="text-[#FF2E4C] font-bold text-xs tracking-widest uppercase">
                  ✦
                </span>
              </div>
            </motion.div>

            {/* Kinetic Lettering Reveal */}
            <div className="overflow-hidden flex items-center space-x-3 md:space-x-6">
              {brandName.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 120, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.2 + i * 0.1,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="inline-block text-5xl md:text-8xl font-extrabold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-[#E50914] font-sans drop-shadow-[0_4px_25px_rgba(229,9,20,0.3)]"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Subtitle & Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
              className="mt-4 flex flex-col items-center space-y-2"
            >
              <span className="text-xs md:text-sm tracking-[0.4em] uppercase text-neutral-300 font-light">
                Luxury Sneaker Archive & Culture
              </span>
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#E50914]/70 to-transparent my-2" />
            </motion.div>
          </div>

          {/* Bottom Crimson Line Accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent shadow-[0_0_10px_#E50914]"
          />

          {/* Corner Est Badges */}
          <div className="absolute bottom-8 left-8 text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-mono hidden md:block">
            EST. 2026
          </div>
          <div className="absolute bottom-8 right-8 text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-mono hidden md:block">
            HIGH-END EDITIONS
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
