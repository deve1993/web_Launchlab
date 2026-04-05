'use client';

import { motion } from 'framer-motion';

const SNIPPETS = [
  "git push origin main",
  "npm run build",
  "const launch = () => deploy()",
  "// Initializing project...",
  "Status: 200 OK",
  "yarn deploy --production",
  "docker-compose up -d",
  "await launchLab.build(idea)",
  "const product = ship(brief)",
  "if (valid) launch()",
  "v1.0.0 shipped",
  "latency: 12ms",
  "cluster: production-eu",
  "SSL: active",
  "uptime: 99.9%"
];

function CodeColumn({ speed, delay }: { speed: number; delay: number }) {
  const repeatedSnippets = [...SNIPPETS, ...SNIPPETS, ...SNIPPETS];
  
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-50%" }}
      transition={{ 
        duration: speed, 
        repeat: Infinity, 
        ease: "linear",
        delay: delay 
      }}
      className="flex flex-col gap-8 py-4 px-2"
    >
      {repeatedSnippets.map((s, i) => (
        <div key={i} className="text-[10px] md:text-xs font-mono text-white/5 whitespace-nowrap select-none">
          {s.includes("launch") || s.includes("deploy") || s.includes("OK") || s.includes("shipped") ? (
            <span className="text-accent/40">{s}</span>
          ) : s}
        </div>
      ))}
    </motion.div>
  );
}

export default function CodeCTABackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black flex justify-around opacity-40">
      <CodeColumn speed={30} delay={0} />
      <CodeColumn speed={45} delay={-2} />
      <CodeColumn speed={35} delay={-5} />
      <CodeColumn speed={55} delay={-1} />
      <CodeColumn speed={40} delay={-3} />
      <CodeColumn speed={50} delay={-4} />
      
      {/* Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)" />
    </div>
  );
}
