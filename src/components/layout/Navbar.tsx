'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCinematicAudio } from '@/hooks/useCinematicAudio';

const locales = ['it', 'en', 'cs'] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  
  const { playHover, playClick } = useCinematicAudio();

  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <>
      {bannerVisible && (
        <div className="relative z-50 bg-accent text-white text-xs md:text-sm font-medium text-center py-2 px-6 flex items-center justify-center gap-3">
          <span>{t('banner_text')}</span>
          <a href="#cta" className="underline underline-offset-2 font-semibold whitespace-nowrap hover:no-underline">
            {t('banner_cta')} →
          </a>
          <button
            onClick={() => { playClick(); setBannerVisible(false); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            aria-label="Chiudi"
          >
            ✕
          </button>
        </div>
      )}

      {/* Cinematic scroll progress bar under the top edge */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent-cyan origin-left z-[100] drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
        style={{ scaleX }}
      />

      <div className="fixed top-4 inset-x-0 z-40 pointer-events-none">
        <div className="px-4 max-w-6xl mx-auto">
          <nav className={cn(
            'pointer-events-auto rounded-[24px] border transition-all duration-500',
            scrolled
              ? 'bg-[#09090b]/80 backdrop-blur-2xl border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]'
              : 'bg-transparent border-transparent'
          )}>
            <div className="hidden md:grid grid-cols-3 items-center px-6 h-[64px]">

              <div className="flex items-center gap-1">
                {locales.map((loc) => (
                  <a
                    key={loc}
                    href={`/${loc}`}
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className={cn(
                      'px-3 py-1.5 text-[11px] uppercase tracking-wider font-bold transition-all rounded-xl',
                      loc === locale
                        ? 'text-accent-cyan bg-accent-cyan/10 pointer-events-none ring-1 ring-accent-cyan/20'
                        : 'text-white/40 hover:text-white hover:bg-white/10 interactive'
                    )}
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {loc}
                  </a>
                ))}
              </div>

              <div className="flex justify-center">
                <Link href={`/${locale}`} className="flex items-center justify-center interactive" onMouseEnter={playHover} onClick={playClick}>
                  <Image
                    src="/images/loghi/logo-light.png"
                    alt="LaunchLab"
                    width={200}
                    height={48}
                    priority
                    className="h-12 w-auto object-contain scale-[1.35] origin-top md:origin-center mt-2 md:mt-0 drop-shadow-md"
                  />
                </Link>
              </div>

              <div className="flex justify-end">
                <a
                  href="#cta"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="interactive group relative overflow-hidden px-6 py-2.5 rounded-full text-xs tracking-wide font-bold bg-white/5 text-white border border-white/10 hover:border-accent-cyan/50 hover:bg-accent-cyan/10 transition-all snappy-click"
                >
                  <span className="relative z-10 group-hover:text-accent-cyan transition-colors">{t('cta')}</span>
                  <div className="absolute inset-0 bg-accent-cyan/0 group-hover:bg-accent-cyan/20 blur-md transition-colors pointer-events-none" />
                </a>
              </div>
            </div>

            {/* Mobile Nav */}
            <div className="md:hidden flex items-center justify-between px-5 h-[60px]">
              <Link href={`/${locale}`} className="flex items-center interactive relative z-10" onClick={playClick}>
                <Image
                  src="/images/loghi/logo-light.png"
                  alt="LaunchLab"
                  width={150}
                  height={40}
                  priority
                  className="h-10 w-auto scale-[1.25] origin-left drop-shadow-md"
                />
              </Link>
              <button
                className="text-white p-2 transition-colors interactive"
                onClick={() => {
                  playClick();
                  setMenuOpen(!menuOpen);
                }}
                aria-label="Menu"
              >
                {menuOpen
                  ? <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  : <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                }
              </button>
            </div>
          </nav>

          {menuOpen && (
            <div className="md:hidden pointer-events-auto mt-2 bg-[#09090b]/95 backdrop-blur-3xl border border-white/10 rounded-2xl px-5 py-6 flex flex-col gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-2 justify-center">
                {locales.map((loc) => (
                  <a
                    key={loc}
                    href={`/${loc}`}
                    onClick={playClick}
                    className={cn(
                      'px-4 py-2 text-[12px] uppercase tracking-wider font-bold transition-all rounded-xl',
                      loc === locale
                        ? 'text-accent-cyan bg-accent-cyan/10 pointer-events-none ring-1 ring-accent-cyan/20'
                        : 'text-white/40 hover:text-white hover:bg-white/10 interactive'
                    )}
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {loc}
                  </a>
                ))}
              </div>
              <a
                href="#cta"
                onClick={() => {
                  playClick();
                  setMenuOpen(false);
                }}
                className="block text-center px-6 py-4 rounded-xl text-sm font-bold bg-white/10 border border-white/10 text-white interactive"
              >
                {t('cta')}
              </a>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
