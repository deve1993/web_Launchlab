"use client";

import { useTranslations } from 'next-intl';
import FeatureDivider from '@/components/effects/FeatureDivider';
import CtaBackground from '@/components/effects/CtaBackground';

export default function CtaFinale() {
  const t = useTranslations('cta');

  return (
    <>
      <FeatureDivider className="my-16 max-w-6xl" />
      <section id="cta" aria-labelledby="cta-title" className="relative mx-auto max-w-6xl mt-12 mb-40 px-4 xl:px-0 overflow-hidden">
        {/* Game of Life background */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <CtaBackground />
        </div>

        <div className="relative z-10 grid items-center gap-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <h2
              id="cta-title"
              className="scroll-my-60 text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-4xl"
            >
              {t('headline_1')}{' '}
              <span className="text-orange-500">{t('headline_2')}</span>
            </h2>
            <p className="mt-3 mb-8 text-lg text-gray-600">
              {t('subline')}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://cal.com/daniel-de-vecchi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1 rounded-md border-b-[1.5px] border-orange-700 bg-gradient-to-b from-orange-400 to-orange-500 px-5 py-3 text-sm font-medium leading-4 tracking-wide text-white shadow-[0_0_0_2px_rgba(0,0,0,0.04),0_0_14px_0_rgba(255,255,255,0.19)] transition-all hover:shadow-orange-300"
              >
                {t('button')}
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <svg className="size-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                {t('guarantee_1')}
              </span>
              <span className="flex items-center gap-2">
                <svg className="size-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                {t('guarantee_2')}
              </span>
            </div>
          </div>
          <div className="sm:col-span-3" />
        </div>
      </section>
    </>
  );
}
