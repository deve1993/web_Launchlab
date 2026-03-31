"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CineVideo } from '@/components/cine-video';
import { useCinematicAudio } from '@/hooks/useCinematicAudio';

// Magnetic Button component
function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const { playHover, playClick } = useCinematicAudio();

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.2); // Pull button by 20%
    y.set((clientY - centerY) * 0.2);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };


  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onMouseEnter={playHover}
      onClick={playClick}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className="group relative inline-flex items-center justify-center gap-3 px-12 py-6 rounded-[24px] bg-black/60 backdrop-blur-xl border border-accent/30 text-white font-bold text-lg md:text-xl overflow-hidden transition-all duration-500 hover:scale-105 shadow-[0_10px_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.6)]"
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 bg-accent/20 transition-colors duration-500 group-hover:bg-accent/40 pointer-events-none mix-blend-screen" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.8)_0%,transparent_80%)] blur-2xl transition-opacity duration-500 pointer-events-none mix-blend-screen" />
      
      {/* Light edge reflection */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

      <span className="relative z-10 mix-blend-plus-lighter tracking-tight" style={{ fontFamily: 'var(--font-sora)' }}>
        {children}
      </span>
    </motion.a>
  );
}

// Main Component
export default function CtaFinale() {
  const t = useTranslations('cta');
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.0]);
  const videoFilter = useTransform(scrollYProgress, [0, 1], ["brightness(0.2) blur(20px)", "brightness(1) blur(0px)"]);

  return (
    <section ref={containerRef} id="cta" className="relative overflow-hidden h-[100svh] min-h-[700px] bg-black flex flex-col justify-center">
      
      {/* Background Planet Video mapped to scroll */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{ scale: videoScale, filter: videoFilter }}
      >
        <CineVideo src="/videos/cta-planet.mp4" className="w-full h-full object-cover origin-center" />
      </motion.div>

      {/* Top gradient transition from previous section */}
      <div className="absolute top-0 inset-x-0 h-[20vh] bg-gradient-to-b from-background via-background/80 to-transparent z-10 pointer-events-none" />

      {/* Deep dark vignette around edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.85)_100%)] z-10 pointer-events-none" />

      <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-6 mt-16">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-3 mb-12 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]"
        >
          <div className="relative flex items-center justify-center w-2 h-2 ml-1">
            <span className="absolute inline-flex w-full h-full rounded-full bg-accent-cyan opacity-75 animate-ping" />
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-accent-cyan" />
          </div>
          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest pl-1" style={{ fontFamily: 'var(--font-mono)' }}>
            DISPONIBILITÀ LIMITATA
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-[100px] font-bold text-white mb-6 leading-[1.0] tracking-tighter"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {t('headline_1')} <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-cyan mix-blend-plus-lighter">
            {t('headline_2')}
          </span>
        </motion.h2>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-white/60 text-lg md:text-2xl mb-16 max-w-3xl font-medium tracking-wide"
        >
          {t('subline')}
        </motion.p>

        {/* CTA Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="w-full flex flex-col items-center gap-8"
        >
          <MagneticButton href="https://cal.com/daniel-de-vecchi">
            {t('button')}
          </MagneticButton>
          
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-white/40 text-[10px] md:text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
            <span className="flex items-center gap-1.5"><span className="text-accent">✓</span> {t('guarantee_1')}</span>
            <span className="w-1 h-1 rounded-full bg-white/10 hidden sm:block" />
            <span className="flex items-center gap-1.5"><span className="text-accent">✓</span> {t('guarantee_2')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
