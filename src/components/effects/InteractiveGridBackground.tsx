'use client';

import { useEffect, useRef, useState } from 'react';

export default function InteractiveGridBackground() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Ensure we only calc over the viewport
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[-1] pointer-events-none w-full h-full bg-background overflow-hidden"
    >
      {/* Base Grid Pattern */}
      <div className="absolute inset-0 graph-paper opacity-80" />

      {/* Interactive Flashlight Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(1000px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 90, 31, 0.04), transparent 40%)`
        }}
      />
      
      {/* Subtle Noise for texture */}
      <div className="absolute inset-0 noise-overlay opacity-50" />
    </div>
  );
}
