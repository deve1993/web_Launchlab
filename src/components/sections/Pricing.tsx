"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useCinematicAudio } from '@/hooks/useCinematicAudio';
function PricingGlassCard({ children, highlighted = false }: { children: React.ReactNode, highlighted?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty('--mouse-x', `${x}px`);
    ref.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-[32px] p-8 md:p-10 flex flex-col transition-transform duration-500 hover:-translate-y-2 ${highlighted ? 'border border-accent/40 bg-black/60 shadow-[0_12px_50px_rgba(16,185,129,0.1)]' : 'border border-white/5 bg-black/40 shadow-[0_12px_50px_rgba(0,0,0,0.8)]'}`}
      style={{ backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)' }}
    >
      {/* Background static glow for highlighted card */}
      {highlighted && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30" style={{
          background: 'radial-gradient(ellipse 120% 80% at 50% 110%, rgba(16,185,129,0.2) 0%, transparent 60%)'
        }} />
      )}
      
      {/* Liquid spotlight that follows mouse on hover */}
      <div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen"
        style={{
          background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${highlighted ? 'rgba(16,185,129,0.25)' : 'rgba(6,182,212,0.12)'}, transparent 40%)`
        }}
      />
      
      {/* Top delicate reflection line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col h-full flex-1">
        {children}
      </div>
    </div>
  );
}

export default function Pricing() {
  const t = useTranslations('pricing');
  const { playHover, playClick } = useCinematicAudio();

  const plan1 = [t('plan1_feature1'), t('plan1_feature2'), t('plan1_feature3'), t('plan1_feature4')];
  const plan2 = [t('plan2_feature1'), t('plan2_feature2'), t('plan2_feature3'), t('plan2_feature4'), t('plan2_feature5')];


  return (
    <section className="relative py-32 px-6 bg-background overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-0 inset-x-0 h-[500px] pointer-events-none mix-blend-screen opacity-50"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% -20%, rgba(6,182,212,0.07) 0%, transparent 80%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="flex items-center gap-2 text-[11px] font-bold text-ink-500 mb-6 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
            <span className="text-accent-cyan/80">{`//`}</span>
            <span>04 / 06 · THE ACCESS</span>
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-sora)' }}
          >
            {t('headline')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="h-full"
          >
            <PricingGlassCard>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight" style={{ fontFamily: 'var(--font-sora)' }}>
                {t('plan1_title')}
              </h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-bold text-white tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>{t('plan1_price')}</span>
              </div>
              <p className="text-[10px] font-bold text-ink-500 uppercase tracking-widest mb-10 bg-white/5 inline-flex self-start px-2 py-1 border border-white/5 rounded" style={{ fontFamily: 'var(--font-mono)' }}>{t('plan1_duration')}</p>
              
              <ul className="flex flex-col gap-4 mb-10 flex-1">
                {plan1.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-base text-ink-500 font-medium">
                    <span className="text-accent-cyan mt-1 text-xs font-bold">✓</span>{f}
                  </li>
                ))}
              </ul>
              
              <a href="#cta" 
                 onMouseEnter={playHover} onClick={playClick}
                 className="relative w-full inline-flex items-center justify-center px-6 py-4 rounded-xl text-white font-semibold text-sm transition-all hover:bg-white/10 active:scale-[0.98] border border-white/10 group mt-auto overflow-hidden">
                <span className="relative z-10">{t('plan1_cta')}</span>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </PricingGlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="h-full"
          >
            <PricingGlassCard highlighted>
              <div className="absolute top-6 right-6 lg:-right-4 lg:-top-4 z-20">
                <span className="inline-flex items-center px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest bg-accent text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] ring-1 ring-accent-dark"
                  style={{ fontFamily: 'var(--font-mono)' }}>
                  {t('plan2_badge')}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight" style={{ fontFamily: 'var(--font-sora)' }}>
                {t('plan2_title')}
              </h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-bold text-white tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>{t('plan2_price')}</span>
              </div>
              <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-10 bg-accent/10 inline-flex self-start px-2 py-1 border border-accent/20 rounded" style={{ fontFamily: 'var(--font-mono)' }}>{t('plan2_duration')}</p>
              
              <ul className="flex flex-col gap-4 mb-10 flex-1">
                {plan2.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-base text-ink-500 font-medium">
                    <span className="text-accent mt-1 text-xs font-bold">✓</span><span className="text-white/80">{f}</span>
                  </li>
                ))}
              </ul>
              
              <a href="#cta" 
                 onMouseEnter={playHover} onClick={playClick}
                 className="group relative w-full inline-flex items-center justify-center px-6 py-4 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] mt-auto overflow-hidden">
                <div className="absolute inset-0 bg-accent transition-colors duration-500 group-hover:bg-accent-cyan z-0" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_0%,transparent_100%)] blur-md transition-opacity duration-500 z-0" />
                <span className="relative z-10 mix-blend-plus-lighter">{t('plan2_cta')}</span>
              </a>
            </PricingGlassCard>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-ink-500/40 text-[10px] font-bold mt-16 uppercase tracking-widest"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {t('note')}
        </motion.p>
      </div>
    </section>
  );
}
