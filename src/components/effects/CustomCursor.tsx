"use client";

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Start off-screen
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    // Only enable on desktop/mice devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      // Se il container è 24px, il centro è 12
      mouseX.set(e.clientX - 12); 
      mouseY.set(e.clientY - 12);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Expand when hovering over interactive elements
      if (target.closest('a, button, input, [role="button"], .snappy-click, .interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    // Attempt to hide the real cursor globally
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.head.removeChild(style);
      document.body.style.cursor = 'auto';
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-[24px] h-[24px] pointer-events-none z-[9999] flex items-center justify-center"
      style={{
        x: mouseX,
        y: mouseY,
      }}
      animate={{
        scale: isHovering ? 1.25 : 1,
        rotate: isHovering ? 90 : 0, 
        opacity: isVisible ? 1 : 0
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Orizzontale */}
      <div className={`absolute h-[1px] bg-white/50 transition-all duration-300 ${isHovering ? 'w-[12px] bg-accent-cyan' : 'w-[20px]'}`} />
      
      {/* Verticale */}
      <div className={`absolute w-[1px] bg-white/50 transition-all duration-300 ${isHovering ? 'h-[12px] bg-accent-cyan' : 'h-[20px]'}`} />

      {/* Puntino centrale che scompare su hover diventando un buco */}
      <div className={`absolute w-1 h-1 rounded-full transition-all duration-300 ${isHovering ? 'bg-transparent scale-0' : 'bg-accent-cyan scale-100 shadow-[0_0_8px_rgba(6,182,212,0.8)]'}`} />
    </motion.div>
  );
}
