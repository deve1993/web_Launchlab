"use client";

import { useTranslations } from 'next-intl';
import TypeWriter from '@/components/effects/TypeWriter';
import TerminalShowcase from '@/components/ui/TerminalShowcase';
import HeroBackground from '@/components/effects/HeroBackground';
import { FadeContainer, FadeDiv, FadeSpan } from '@/components/effects/Fade';

export default function Hero() {
  const t = useTranslations('hero');
  const typewriterWords = [t('typewriter_1'), t('typewriter_2'), t('typewriter_3')];

  return (
    <section aria-label="hero" className="pt-56">
      <FadeContainer className="relative flex flex-col items-center justify-center">
        {/* Badge */}
        <FadeDiv className="mx-auto">
          <div className="inline-flex max-w-full items-center gap-3 rounded-full bg-white/5 px-2.5 py-0.5 pr-3 pl-0.5 font-medium text-gray-900 ring-1 shadow-lg shadow-orange-400/20 ring-black/10 backdrop-blur-[1px] sm:text-sm transition-all hover:ring-orange-300 hover:shadow-orange-400/30 cursor-default">
            <span className="shrink-0 truncate rounded-full border bg-gray-50 px-2.5 py-1 text-sm text-gray-600 sm:text-xs">
              {t('badge_mvs')}
            </span>
            <span className="flex items-center gap-1 truncate">
              <span className="w-full truncate">{t('badge_weeks')} · {t('badge_price')}</span>
            </span>
          </div>
        </FadeDiv>

        {/* Headline */}
        <h1 className="mt-8 text-center text-5xl font-semibold tracking-tighter text-gray-900 sm:text-8xl sm:leading-[1.1]">
          <FadeSpan>{t('headline_1')}</FadeSpan>{' '}
          <FadeSpan>
            <TypeWriter words={typewriterWords} className="text-orange-500" />
          </FadeSpan>
          <br />
          <FadeSpan>{t('headline_2')}</FadeSpan>
        </h1>

        {/* Subheadline */}
        <p className="mt-5 max-w-xl text-center text-base text-balance text-gray-700 sm:mt-8 sm:text-xl">
          <FadeSpan>{t('subheadline')}</FadeSpan>
        </p>

        {/* CTA */}
        <FadeDiv className="flex gap-4 mt-6">
          <a
            className="inline-flex cursor-pointer items-center justify-center gap-1 rounded-md border-b-[1.5px] border-orange-700 bg-gradient-to-b from-orange-400 to-orange-500 px-5 py-3 text-sm font-medium leading-4 tracking-wide whitespace-nowrap text-white shadow-[0_0_0_2px_rgba(0,0,0,0.04),0_0_14px_0_rgba(255,255,255,0.19)] transition-all duration-200 ease-in-out hover:shadow-orange-300"
            href="#cta"
          >
            {t('cta_primary')}
          </a>
          <a
            className="inline-flex items-center justify-center rounded-sm border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-xs transition-all hover:border-orange-300 hover:text-orange-600"
            href="#method"
          >
            {t('cta_secondary')}
          </a>
        </FadeDiv>

        {/* Game of Life Background */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <HeroBackground />
        </div>
      </FadeContainer>

      {/* Terminal Showcase */}
      <div className="mx-auto max-w-6xl mt-24 px-4 xl:px-0 animate-fade-up delay-700">
        <TerminalShowcase />
      </div>
    </section>
  );
}
