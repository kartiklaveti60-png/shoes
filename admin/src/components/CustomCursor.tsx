import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInputHovered, setIsInputHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only run on devices with fine pointer (mouse/trackpad)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const inputEl = target.closest('input, textarea, [contenteditable="true"]') as HTMLElement | null;
      const interactiveEl = target.closest(
        'button, a, select, [role="button"], .cursor-pointer, [data-cursor]'
      ) as HTMLElement | null;

      if (inputEl) {
        setIsInputHovered(true);
        setIsHovered(false);
        setCursorText('');
      } else if (interactiveEl) {
        setIsInputHovered(false);
        setIsHovered(true);
        const customLabel = interactiveEl.getAttribute('data-cursor-text');
        setCursorText(customLabel || '');
      } else {
        setIsInputHovered(false);
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // High performance smooth lerp loop for outer magnetic halo
    const render = () => {
      const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

      // Ultra-smooth spring lerp factor
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.15);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.15);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99999] rounded-full transition-all duration-150 ease-out ${
          isInputHovered
            ? 'w-1 h-5 bg-red-600 rounded-none opacity-90 scale-100'
            : isClicked
            ? 'w-2 h-2 bg-red-600 scale-150 shadow-[0_0_12px_rgba(220,38,38,0.9)]'
            : isHovered
            ? 'w-3 h-3 bg-red-600 scale-110 shadow-[0_0_10px_rgba(220,38,38,0.7)]'
            : 'w-2 h-2 bg-black opacity-90'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* Smooth Trailing Magnetic Halo */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99998] flex items-center justify-center rounded-full transition-all duration-300 ease-out border ${
          isInputHovered
            ? 'w-0 h-0 border-transparent opacity-0'
            : isClicked
            ? 'w-10 h-10 border-red-600 bg-red-500/20 scale-90 shadow-[0_0_20px_rgba(220,38,38,0.35)]'
            : isHovered
            ? 'w-14 h-14 border-red-600/80 bg-red-500/10 scale-100 shadow-[0_0_25px_rgba(220,38,38,0.2)] backdrop-blur-[2px]'
            : 'w-8 h-8 border-black/20 bg-transparent scale-100 shadow-sm'
        }`}
        style={{ willChange: 'transform' }}
      >
        {cursorText && (
          <span className="text-[9px] font-extrabold tracking-widest uppercase text-red-600 px-1 select-none animate-pulse">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
};
