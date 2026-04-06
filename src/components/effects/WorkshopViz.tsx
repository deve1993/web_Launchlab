"use client";

import { motion } from "framer-motion";

const postIts = [
  { x: 10, y: 10, w: 80, h: 60, color: "#fb923c", label: "Idea", delay: 0.1 },
  { x: 110, y: 5, w: 80, h: 60, color: "#fdba74", label: "Users", delay: 0.25 },
  { x: 220, y: 12, w: 80, h: 60, color: "#fed7aa", label: "MVP", delay: 0.4 },
  { x: 50, y: 90, w: 80, h: 60, color: "#ffedd5", label: "Scope", delay: 0.55 },
  { x: 170, y: 85, w: 80, h: 60, color: "#fb923c", label: "Stack", delay: 0.7 },
];

const connections = [
  { x1: 90, y1: 40, x2: 110, y2: 35, delay: 0.9 },
  { x1: 190, y1: 35, x2: 220, y2: 42, delay: 1.0 },
  { x1: 90, y1: 70, x2: 90, y2: 90, delay: 1.1 },
  { x1: 130, y1: 120, x2: 170, y2: 115, delay: 1.2 },
  { x1: 260, y1: 72, x2: 210, y2: 85, delay: 1.3 },
];

export default function WorkshopViz() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 320 180" className="w-full h-auto max-w-sm">
        {/* Grid background */}
        <defs>
          <pattern id="workshop-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="320" height="180" fill="url(#workshop-grid)" rx="8" />

        {/* Connection lines */}
        {connections.map((c, i) => (
          <motion.line
            key={`conn-${i}`}
            x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
            stroke="#f97316"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: c.delay, ease: "easeOut" }}
          />
        ))}

        {/* Post-it cards */}
        {postIts.map((p, i) => (
          <motion.g
            key={`postit-${i}`}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, damping: 19, delay: p.delay }}
          >
            <rect
              x={p.x} y={p.y} width={p.w} height={p.h} rx="4"
              fill="white"
              stroke={p.color}
              strokeWidth="2"
            />
            <rect x={p.x} y={p.y} width={p.w} height="8" rx="4" fill={p.color} />
            <text
              x={p.x + p.w / 2} y={p.y + 38}
              textAnchor="middle"
              className="text-[11px] font-semibold"
              fill="#374151"
            >
              {p.label}
            </text>
          </motion.g>
        ))}

        {/* Cursor icon */}
        <motion.g
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.4 }}
        >
          <path
            d="M280 155 l0 -18 l12 12 l-5 1.5 l4 8 l-4 2 l-4 -8 l-3 2.5z"
            fill="#f97316" stroke="white" strokeWidth="1"
          />
        </motion.g>
      </svg>
    </div>
  );
}
