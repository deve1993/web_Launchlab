'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const codeSnippet = `// Powering AI agents with clean web data
const firecrawl = new FirecrawlApp({
  apiKey: "YOUR_API_KEY"
});

const scrapeResult = await firecrawl.scrapeUrl('launchlab.it', {
  formats: ['markdown', 'html'],
  onlyMainContent: true
});

if (scrapeResult.success) {
  console.log("Success! Data extracted.");
  process(scrapeResult.markdown);
}`;

export default function TerminalShowcase() {
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedCode(codeSnippet.slice(0, i));
      i++;
      if (i > codeSnippet.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl border border-border-color bg-surface overflow-hidden shadow-2xl shadow-accent/10">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-border-color">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <div className="text-[10px] font-bold text-ink-500 uppercase tracking-widest font-mono">
          launchlab.ts — bash
        </div>
        <div className="w-12" /> {/* Spacer */}
      </div>

      {/* Terminal Body */}
      <div className="flex min-h-[320px]">
        {/* Sidebar */}
        <div className="w-1/4 bg-black/20 border-r border-border-color p-4 hidden md:block">
          <div className="space-y-3">
            <div className="text-[10px] font-bold text-ink-500 uppercase tracking-widest font-mono mb-4">Explorer</div>
            {['src', 'app', 'components', 'lib'].map((dir) => (
              <div key={dir} className="flex items-center gap-2 text-xs text-white/40 font-mono">
                <span className="text-accent">📁</span> {dir}
              </div>
            ))}
            <div className="flex items-center gap-2 text-xs text-white/90 font-mono bg-accent/10 px-2 py-1 rounded border border-accent/20">
              <span className="text-accent">TS</span> launchlab.ts
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 p-6 relative bg-black/40">
          <pre className="font-mono text-sm leading-relaxed text-white/80 whitespace-pre-wrap">
            {displayedCode}
            {isTyping && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-accent align-middle ml-1"
              />
            )}
          </pre>
          
          {/* Subtle Glow */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,90,31,0.05)_0%,transparent_70%)]" />
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 bg-white/5 border-t border-border-color flex justify-between items-center">
        <div className="text-[10px] font-medium text-white/30 font-mono">
          Ln 12, Col 34
        </div>
        <div className="text-[10px] font-medium text-white/30 font-mono">
          UTF-8
        </div>
      </div>
    </div>
  );
}
