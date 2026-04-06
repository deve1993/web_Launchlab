"use client";

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import VerticalLines from '@/components/effects/VerticalLines';
import DiagonalSVG from '@/components/effects/DiagonalSVG';

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function TrendDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" /><polyline points="16 17 22 17 22 11" />
    </svg>
  );
}

const cardIcons = [ClockIcon, CodeIcon, TrendDownIcon];

export default function PainCards() {
  const t = useTranslations('pain');

  const cards = [
    { badge: t('card1_badge'), hook: t('card1_hook'), body: t('card1_body') },
    { badge: t('card2_badge'), hook: t('card2_hook'), body: t('card2_body') },
    { badge: t('card3_badge'), hook: t('card3_hook'), body: t('card3_body') },
  ];

  return (
    <section className="relative mx-auto max-w-6xl scroll-my-24 mt-32 px-4 xl:px-0">
      <VerticalLines />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-0">
        {/* Content side */}
        <div className="col-span-2 my-auto px-2">
          <h2 className="relative text-lg font-semibold tracking-tight text-orange-500">
            {t('section_label')}
            <div className="absolute top-1 -left-[8px] h-5 w-[3px] rounded-r-sm bg-orange-500" />
          </h2>
          <p className="mt-2 text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-4xl">
            {t('headline')}
          </p>
        </div>

        {/* Visual side with diagonal pattern */}
        <div className="relative col-span-2 flex items-center justify-center overflow-hidden min-h-[400px]">
          <DiagonalSVG id="pain-diagonal" className="mask-[linear-gradient(transparent,white_10rem)]" />
          <div className="relative z-10 grid grid-cols-1 gap-4 p-6 w-full">
            {cards.map((card, i) => {
              const Icon = cardIcons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4 rounded-xl bg-white p-5 ring-1 ring-black/5 shadow-sm transition-all hover:ring-orange-400/40 hover:shadow-md hover:shadow-orange-500/5"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500 ring-1 ring-orange-200">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 tracking-tight">
                      &quot;{card.hook}&quot;
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">{card.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
