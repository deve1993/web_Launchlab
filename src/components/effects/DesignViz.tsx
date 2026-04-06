"use client";

import { motion } from "framer-motion";

const layers = [
  { x: 40, y: 20, w: 240, h: 140, color: "#f3f4f6", delay: 0.1, label: "" },
  { x: 55, y: 35, w: 100, h: 80, color: "#fed7aa", delay: 0.3, label: "Hero" },
  { x: 170, y: 35, w: 95, h: 35, color: "#ffedd5", delay: 0.45, label: "Nav" },
  { x: 170, y: 80, w: 95, h: 35, color: "#fef3c7", delay: 0.6, label: "CTA" },
  { x: 55, y: 125, w: 210, h: 25, color: "#e5e7eb", delay: 0.75, label: "Footer" },
];

const handles = [
  { cx: 55, cy: 35, delay: 0.9 },
  { cx: 155, cy: 35, delay: 0.95 },
  { cx: 155, cy: 115, delay: 1.0 },
  { cx: 55, cy: 115, delay: 1.05 },
];

export default function DesignViz() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 320 180" className="w-full h-auto max-w-sm">
        {/* Figma-like artboard border */}
        <motion.rect
          x="35" y="12" width="250" height="156" rx="6"
          fill="none" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        />

        {/* Layers sliding in */}
        {layers.map((l, i) => (
          <motion.g
            key={`layer-${i}`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 20, delay: l.delay }}
          >
            <rect x={l.x} y={l.y} width={l.w} height={l.h} rx="4" fill={l.color} stroke="#e5e7eb" strokeWidth="1" />
            {l.label && (
              <text
                x={l.x + l.w / 2} y={l.y + l.h / 2 + 4}
                textAnchor="middle"
                className="text-[10px] font-medium"
                fill="#6b7280"
              >
                {l.label}
              </text>
            )}
          </motion.g>
        ))}

        {/* Selection handles on Hero block */}
        {handles.map((h, i) => (
          <motion.rect
            key={`handle-${i}`}
            x={h.cx - 3} y={h.cy - 3} width="6" height="6" rx="1"
            fill="#f97316" stroke="white" strokeWidth="1"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: h.delay, type: "spring", stiffness: 300, damping: 20 }}
          />
        ))}

        {/* Selection outline */}
        <motion.rect
          x="55" y="35" width="100" height="80" rx="4"
          fill="none" stroke="#f97316" strokeWidth="1.5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.85, duration: 0.3 }}
        />

        {/* Figma toolbar hint */}
        <motion.g
          initial={{ opacity: 0, y: -5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.3 }}
        >
          <rect x="75" y="2" width="60" height="14" rx="3" fill="white" stroke="#d1d5db" strokeWidth="0.5" />
          <text x="105" y="12" textAnchor="middle" className="text-[7px] font-medium" fill="#9ca3af">
            100 × 80
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
