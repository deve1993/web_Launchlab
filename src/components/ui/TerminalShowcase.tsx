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
    <div className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden ring-1 ring-black/10 shadow-2xl shadow-black/10 bg-gray-950 transition-all hover:ring-orange-500/30">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800" style={{ background: 'rgba(255,255,255,0.03)' }}>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
        </div>
        <div className="text-[10px] font-medium text-gray-500 uppercase tracking-widest font-mono">
          launchlab.ts — bash
        </div>
        <div className="w-12" />
      </div>

      {/* Terminal Body */}
      <div className="flex min-h-[320px]">
        {/* Sidebar */}
        <div className="w-1/4 border-r border-gray-800 p-4 hidden md:block" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="space-y-3">
            <div className="text-[10px] font-medium text-gray-500 uppercase tracking-widest font-mono mb-4">Explorer</div>
            {['src', 'app', 'components', 'lib'].map((dir) => (
              <div key={dir} className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                <span className="text-orange-400">📁</span> {dir}
              </div>
            ))}
            <div className="flex items-center gap-2 text-xs text-gray-200 font-mono bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20">
              <span className="text-orange-400">TS</span> launchlab.ts
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 p-6 relative">
          <pre className="font-mono text-sm leading-relaxed text-gray-300 whitespace-pre-wrap">
            {displayedCode}
            {isTyping && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-orange-500 align-middle ml-1"
              />
            )}
          </pre>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 border-t border-gray-800 flex justify-between items-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
        <div className="text-[10px] font-medium text-gray-600 font-mono">Ln 12, Col 34</div>
        <div className="text-[10px] font-medium text-gray-600 font-mono">UTF-8</div>
      </div>
    </div>
  );
}
