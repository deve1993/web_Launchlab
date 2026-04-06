"use client";

import { motion } from "framer-motion";

const terminalLines = [
  { text: "$ npm run build", color: "#d1d5db", delay: 0.2 },
  { text: "✓ Compiled successfully", color: "#34d399", delay: 0.6 },
  { text: "✓ Generating static pages", color: "#34d399", delay: 1.0 },
  { text: "✓ Deploying to production...", color: "#fdba74", delay: 1.4 },
  { text: "🚀 Live at launchlab.it", color: "#fb923c", delay: 1.9 },
];

export default function BuildViz() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 320 180" className="w-full h-auto max-w-sm">
        {/* Terminal window */}
        <motion.rect
          x="10" y="5" width="300" height="170" rx="8"
          fill="#111827" stroke="#374151" strokeWidth="1"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        />

        {/* Traffic lights */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <circle cx="28" cy="18" r="4" fill="#ff5f56" />
          <circle cx="42" cy="18" r="4" fill="#ffbd2e" />
          <circle cx="56" cy="18" r="4" fill="#27c93f" />
        </motion.g>

        {/* Title bar */}
        <motion.text
          x="160" y="21" textAnchor="middle"
          className="text-[8px]" fill="#6b7280"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          terminal — deploy
        </motion.text>

        <line x1="10" y1="30" x2="310" y2="30" stroke="#374151" strokeWidth="0.5" />

        {/* Terminal lines */}
        {terminalLines.map((line, i) => (
          <motion.text
            key={`line-${i}`}
            x="24" y={50 + i * 22}
            className="text-[10px] font-mono"
            fill={line.color}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: line.delay, duration: 0.3 }}
          >
            {line.text}
          </motion.text>
        ))}

        {/* Progress bar background */}
        <motion.rect
          x="24" y="155" width="272" height="6" rx="3"
          fill="#1f2937"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        />

        {/* Progress bar fill */}
        <motion.rect
          x="24" y="155" width="272" height="6" rx="3"
          fill="url(#progress-gradient)"
          initial={{ width: 0 }}
          whileInView={{ width: 272 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 1.5, ease: "easeOut" }}
        />

        <defs>
          <linearGradient id="progress-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
