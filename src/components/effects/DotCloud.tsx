'use client';

import { useEffect, useRef } from 'react';

interface DotCloudProps {
  className?: string;
  dark?: boolean;
  density?: number;
}

export default function DotCloud({ className = '', dark = false, density = 1 }: DotCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.offsetWidth || canvas.parentElement?.offsetWidth || 800;
    const H = canvas.offsetHeight || canvas.parentElement?.offsetHeight || 400;
    canvas.width = W;
    canvas.height = H;

    ctx.clearRect(0, 0, W, H);

    const color = dark ? '255,255,255' : '0,0,0';
    const clusters = [
      { x: W * 0.15, y: H * 0.5,  rx: 180, ry: 120, count: Math.round(900 * density) },
      { x: W * 0.85, y: H * 0.45, rx: 160, ry: 100, count: Math.round(800 * density) },
      { x: W * 0.5,  y: H * 0.7,  rx: 140, ry: 80,  count: Math.round(600 * density) },
      { x: W * 0.08, y: H * 0.25, rx: 100, ry: 60,  count: Math.round(350 * density) },
      { x: W * 0.92, y: H * 0.2,  rx: 110, ry: 70,  count: Math.round(400 * density) },
      { x: W * 0.35, y: H * 0.15, rx: 80,  ry: 50,  count: Math.round(250 * density) },
      { x: W * 0.65, y: H * 0.85, rx: 90,  ry: 55,  count: Math.round(280 * density) },
    ];

    clusters.forEach(c => {
      for (let i = 0; i < c.count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.pow(Math.random(), 0.6);
        const x = c.x + Math.cos(angle) * dist * c.rx * (0.7 + Math.random() * 0.6);
        const y = c.y + Math.sin(angle) * dist * c.ry * (0.7 + Math.random() * 0.6);

        if (x < 0 || x > W || y < 0 || y > H) continue;

        const dxn = (x - c.x) / c.rx;
        const dyn = (y - c.y) / c.ry;
        const normDist = Math.sqrt(dxn * dxn + dyn * dyn);
        const alpha = Math.max(0, (1 - normDist) * 0.11 * (dark ? 0.8 : 1));

        const r = 0.5 + Math.random() * 0.6;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${alpha})`;
        ctx.fill();
      }
    });
  }, [dark, density]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
