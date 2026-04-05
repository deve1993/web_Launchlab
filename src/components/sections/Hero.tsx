"use client";

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import TypeWriter from '@/components/effects/TypeWriter';
import { useCinematicAudio } from '@/hooks/useCinematicAudio';
import TerminalShowcase from '@/components/ui/TerminalShowcase';
import CodeBackground from '@/components/effects/CodeBackground';
import InteractiveGridBackground from '@/components/effects/InteractiveGridBackground';

export default function Hero() {
  const t = useTranslations('hero');
  const { playHover, playClick } = useCinematicAudio();
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -40]);
  const terminalScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

  const stats = [t('stat_1'), t('stat_2'), t('stat_3'), t('stat_4')];
  const typewriterWords = [t('typewriter_1'), t('typewriter_2'), t('typewriter_3')];

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden flex flex-col bg-background">
      
      {/* Background Layers */}
      <InteractiveGridBackground />
      <CodeBackground />
      
      {/* Hero Content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 pt-32 pb-20 max-w-6xl mx-auto w-full"
        style={{ opacity: textOpacity, y: textY }}
      >
        <div className="flex flex-wrap justify-center gap-2 mb-10 animate-fade-up delay-0">
          {[t('badge_mvs'), t('badge_weeks'), t('badge_price')].map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-white/40 uppercase tracking-widest bg-white/5 border border-white/5 font-mono">
              {b}
            </span>
          ))}
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-[110px] font-bold leading-[0.9] tracking-tighter text-white mb-8 animate-fade-up delay-150"
          style={{ fontFamily: 'var(--font-display)' }}>
          {t('headline_1')}{' '}
          <TypeWriter
            words={typewriterWords}
            className="text-accent italic"
          />
          <br />
          {t('headline_2')}
        </h1>

        <p className="text-lg md:text-xl text-ink-500 max-w-3xl leading-relaxed mb-12 animate-fade-up delay-300 font-medium tracking-tight">
          {t('subheadline')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-24 animate-fade-up delay-500 w-full sm:w-auto">
          {/* Firecrawl Style Orange Button */}
          <a href="#cta" 
             onMouseEnter={playHover} onClick={playClick}
             className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-bold text-sm w-full sm:w-auto overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] bg-accent">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10">{t('cta_primary')}</span>
          </a>
          
          <a href="#method" className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-medium text-sm transition-all hover:bg-white/5 border border-white/10 w-full sm:w-auto backdrop-blur-sm">
            {t('cta_secondary')} <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* Interactive Terminal Showcase */}
        <motion.div 
          style={{ scale: terminalScale }}
          className="w-full animate-fade-up delay-700"
        >
          <TerminalShowcase />
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-20 animate-fade-up delay-900">
          {stats.map((s, i) => (
            <span key={i} className="text-[10px] font-bold tracking-widest uppercase text-white/20 flex items-center gap-3 font-mono">
              {i > 0 && <span className="text-white/5">/</span>}
              {s}
            </span>
          ))}
        </div>
      </motion.div>
      
      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
}
