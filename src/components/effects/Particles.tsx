'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

export default function Particles({ count = 14 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const p: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      size: 6 + Math.random() * 10,
      delay: Math.random() * 6,
      duration: 5 + Math.random() * 8,
      opacity: 0.3 + Math.random() * 0.5,
    }));
    const t = setTimeout(() => {
      setParticles(p);
    }, 0);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.x}%`,
            animationName: 'snowfall',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            opacity: 0,
          }}
        >
          <svg
            width={p.size}
            height={p.size}
            viewBox="0 0 20 20"
            fill="none"
            style={{ opacity: p.opacity, color: '#E8412A' }}
          >
            <path
              d="M10 0C10 0 10.8 6.5 13 9C15.5 11.5 20 10 20 10C20 10 15.5 10.8 13 13C10.5 15.5 10 20 10 20C10 20 9.2 15.5 7 13C4.5 10.5 0 10 0 10C0 10 4.5 9.2 7 7C9.5 4.5 10 0 10 0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
