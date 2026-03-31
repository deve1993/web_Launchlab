"use client";

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CineVideo } from '@/components/cine-video';
import TypeWriter from '@/components/effects/TypeWriter';
import { useCinematicAudio } from '@/hooks/useCinematicAudio';

export default function Hero() {
  const t = useTranslations('hero');
  const { playHover, playClick } = useCinematicAudio();
  const containerRef = useRef<HTMLElement>(null);
  
  // Link animations to the lenis scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Background video scales down slightly and darkens on scroll
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [0.8, 0.1]);
  
  // Text blurs, translates Y and fades out
  // NOTE: filter tweening is heavy, so we use it sparingly
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);

  const stats = [t('stat_1'), t('stat_2'), t('stat_3'), t('stat_4')];
  const typewriterWords = [t('typewriter_1'), t('typewriter_2'), t('typewriter_3')];

  return (
    <section ref={containerRef} className="relative min-h-[100vh] sm:min-h-[110vh] overflow-hidden flex flex-col bg-background">
      
      {/* Background Video layer */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ scale: videoScale, opacity: videoOpacity }}
      >
        <CineVideo src="/videos/Herobg.mp4" className="w-full h-full object-cover" eager />
        {/* Obsidian gradient from bottom to blend into the next section smoothly */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-transparent to-background" />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 pt-28 pb-20 max-w-5xl mx-auto w-full"
        style={{ opacity: textOpacity, y: textY }}
      >
        <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-up delay-0">
          {[t('badge_mvs'), t('badge_weeks'), t('badge_price')].map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-white/50 uppercase tracking-widest bg-white/5 backdrop-blur-md border border-white/5"
              style={{ fontFamily: 'var(--font-mono)' }}>
              {b}
            </span>
          ))}
        </div>

        {/* Mix blend mode text: the video will shine through the white text slightly based on contrast */}
        <h1 className="text-5xl sm:text-7xl lg:text-[100px] font-bold leading-[1.0] tracking-tighter text-white mb-6 animate-fade-up delay-150 mix-blend-exclusion"
          style={{ fontFamily: 'var(--font-display)' }}>
          {t('headline_1')}{' '}
          <TypeWriter
            words={typewriterWords}
            className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-cyan italic mix-blend-normal"
          />
          <br />
          {t('headline_2')}
        </h1>

        <p className="text-lg md:text-xl text-ink-500 max-w-2xl leading-relaxed mb-10 animate-fade-up delay-300 font-medium tracking-wide">
          {t('subheadline')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-up delay-500 w-full sm:w-auto">
          {/* Neon Glow Button CTA */}
          <a href="#cta" 
             onMouseEnter={playHover} onClick={playClick}
             className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-semibold text-sm w-full sm:w-auto overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]">
            <div className="absolute inset-0 bg-accent transition-colors duration-500 group-hover:bg-accent-cyan" />
            {/* Inner fluid glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_0%,transparent_100%)] blur-lg transition-opacity duration-500" />
            {/* Outer neon shadow */}
            <div className="absolute inset-0 rounded-xl ring-2 ring-accent/50 group-hover:ring-accent-cyan/80 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-500" />
            <span className="relative z-10">{t('cta_primary')}</span>
          </a>
          
          <a href="#method" className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-medium transition-all hover:bg-white/5 border border-white/10 w-full sm:w-auto glass-panel">
            {t('cta_secondary')} <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 animate-fade-up delay-700">
          {stats.map((s, i) => (
            <span key={i} className="text-[11px] font-bold tracking-widest uppercase text-white/30 flex items-center gap-2" style={{ fontFamily: 'var(--font-mono)' }}>
              {i > 0 && <span className="text-white/10">·</span>}
              {s}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
