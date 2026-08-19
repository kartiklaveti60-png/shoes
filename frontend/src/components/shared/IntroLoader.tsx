import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  /* -- Canvas particle animation -- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COLORS = ['#E50914', '#FF2E4C', '#ffffff', '#ff6b6b', '#ffcccc'];
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; color: string; decay: number;
    }> = [];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.6 + 0.1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        decay: Math.random() * 0.003 + 0.001,
      });
    }

    let tick = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Radial glow in center
      const grd = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.45
      );
      grd.addColorStop(0, 'rgba(229,9,20,0.13)');
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Pulsing outer ring
      const pulse = 0.5 + 0.5 * Math.sin(tick * 0.025);
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 160 + pulse * 20, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(229,9,20,${0.08 + pulse * 0.08})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 200 + pulse * 15, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(229,9,20,${0.04 + pulse * 0.04})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(')', `,${p.alpha})`).replace('rgb(', 'rgba(').replace('#', 'rgba(').replace('rgba(', 'rgba(');
        // Simple hex color with alpha
        const hex = p.color;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
        ctx.fill();
      });

      // Scan line sweep
      const sweep = (tick % 200) / 200;
      const sweepY = sweep * canvas.height;
      const sweepGrd = ctx.createLinearGradient(0, sweepY - 40, 0, sweepY + 40);
      sweepGrd.addColorStop(0, 'rgba(229,9,20,0)');
      sweepGrd.addColorStop(0.5, 'rgba(229,9,20,0.06)');
      sweepGrd.addColorStop(1, 'rgba(229,9,20,0)');
      ctx.fillStyle = sweepGrd;
      ctx.fillRect(0, sweepY - 40, canvas.width, 80);

      tick++;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  /* -- Timing -- */
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const exitTimer = setTimeout(() => setIsExiting(true), 4000);
    const finishTimer = setTimeout(() => {
      document.body.style.overflow = 'unset';
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  const brandName = 'SOLE';

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-5%', transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center text-white overflow-hidden select-none"
          style={{ backgroundColor: '#050505' }}
        >
          {/* -- Canvas Particle Background -- */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 0 }}
          />

          {/* Top Crimson Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent shadow-[0_0_10px_#E50914]"
            style={{ zIndex: 2 }}
          />

          {/* Main Metallic Oval Logo */}
          <div className="relative flex flex-col items-center" style={{ zIndex: 2 }}>
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center py-4"
            >
              {/* Silver Metallic Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-400/20 via-white/30 to-neutral-400/20 blur-2xl rounded-full scale-110 animate-pulse" />

              <img
                src="/logo.png"
                alt="SOLE Luxury Logo"
                className="h-28 sm:h-36 md:h-48 w-auto object-contain relative z-10 filter drop-shadow-[0_10px_35px_rgba(255,255,255,0.4)]"
              />
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
              className="mt-5 flex flex-col items-center space-y-2"
            >
              <span className="text-xs md:text-sm tracking-[0.45em] uppercase text-neutral-300 font-light">
                Luxury Sneaker Archive &amp; Culture
              </span>
              <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-[#E50914]/80 to-transparent mt-2" />
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 3.6, delay: 0.4, ease: 'easeInOut' }}
              className="mt-6 h-[2px] w-48 bg-gradient-to-r from-[#E50914] via-[#FF2E4C] to-[#E50914] rounded-full origin-left"
              style={{ boxShadow: '0 0 12px rgba(229,9,20,0.7)' }}
            />
          </div>

          {/* Bottom Crimson Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent shadow-[0_0_10px_#E50914]"
            style={{ zIndex: 2 }}
          />

          {/* Corner Badges */}
          <div className="absolute bottom-8 left-8 text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-mono hidden md:block" style={{ zIndex: 2 }}>
            EST. 2026
          </div>
          <div className="absolute bottom-8 right-8 text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-mono hidden md:block" style={{ zIndex: 2 }}>
            HIGH-END EDITIONS
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
