"use client";

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef, useEffect, useState } from 'react';
import VerticalLines from '@/components/effects/VerticalLines';
import FeatureDivider from '@/components/effects/FeatureDivider';
import DevSymbolsBackground from '@/components/effects/DevSymbolsBackground';

const WEEKS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'];
const PHASE_CELLS = [[0, 1], [2, 3], [4, 5]];
const PHASE_COLORS = ['#f97316', '#fb923c', '#34d399'];
const PHASE_ICONS = ['📋', '🎨', '🚀'];

export default function Processo() {
  const t = useTranslations('process');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [ganttVisible, setGanttVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState(0);

  const steps = [
    { label: t('week1_label'), title: t('week1_title'), desc: t('week1_desc') },
    { label: t('week2_label'), title: t('week2_title'), desc: t('week2_desc') },
    { label: t('week3_label'), title: t('week3_title'), desc: t('week3_desc') },
  ];

  useEffect(() => {
    if (!isInView) return;
    const ids = [
      setTimeout(() => setGanttVisible(true), 300),
      setTimeout(() => setVisibleCards(1), 600),
      setTimeout(() => setVisibleCards(2), 900),
      setTimeout(() => setVisibleCards(3), 1200),
    ];
    return () => ids.forEach(clearTimeout);
  }, [isInView]);

  return (
    <>
      <FeatureDivider className="my-16 max-w-6xl" />
      <section id="process" className="relative mx-auto max-w-6xl scroll-my-24 px-4 xl:px-0 overflow-hidden">
        <DevSymbolsBackground />
        <VerticalLines />

        <div ref={ref} className="relative z-[5]">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="relative text-lg font-semibold tracking-tight text-orange-500">
              {t('section_label')}
              <div className="absolute top-1 -left-[8px] h-5 w-[3px] rounded-r-sm bg-orange-500" />
            </h2>
            <p className="mt-2 text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-4xl">
              {t('headline')}
            </p>
          </motion.div>

          {/* Mini Gantt bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10 rounded-xl bg-white p-5 ring-1 ring-black/5 shadow-sm"
          >
            {/* Week headers */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-24 shrink-0 hidden sm:block" />
              {WEEKS.map((w) => (
                <div key={w} className="flex-1 text-center text-[10px] font-semibold text-gray-400 font-mono" style={{ minWidth: 32 }}>
                  {w}
                </div>
              ))}
            </div>

            {/* Phase bars */}
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-1.5 mb-2">
                <div className="w-24 shrink-0 text-xs font-medium text-gray-500 truncate hidden sm:block">
                  {step.title}
                </div>
                {WEEKS.map((_, wi) => {
                  const isActive = PHASE_CELLS[i].includes(wi);
                  return (
                    <motion.div
                      key={wi}
                      className="flex-1 h-5 rounded"
                      style={{ minWidth: 32 }}
                      initial={{ backgroundColor: '#f3f4f6' }}
                      animate={{
                        backgroundColor: isActive && ganttVisible
                          ? PHASE_COLORS[i]
                          : '#f3f4f6',
                      }}
                      transition={{ duration: 0.5, delay: isActive ? 0.1 + i * 0.2 : 0 }}
                    />
                  );
                })}
              </div>
            ))}
          </motion.div>

          {/* 3 Deliverable cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 pb-0.5 pt-0.5">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{
                  opacity: visibleCards > i ? 1 : 0,
                  y: visibleCards > i ? 0 : 24,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative rounded-xl bg-white p-6 ring-1 ring-black/5 shadow-sm transition-all hover:ring-orange-400/40 hover:shadow-md"
              >
                {/* Vertical connector line to Gantt */}
                <div
                  className="absolute -top-8 left-1/2 w-px h-8 hidden md:block"
                  style={{
                    background: `linear-gradient(to bottom, transparent, ${PHASE_COLORS[i]})`,
                    opacity: visibleCards > i ? 0.4 : 0,
                    transition: 'opacity 0.5s',
                  }}
                />

                <div className="flex items-start gap-4">
                  <div
                    className="flex size-10 shrink-0 items-center justify-center rounded-full text-lg"
                    style={{ backgroundColor: `${PHASE_COLORS[i]}15`, border: `1px solid ${PHASE_COLORS[i]}40` }}
                  >
                    {PHASE_ICONS[i]}
                  </div>
                  <div className="flex-1">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white mb-2"
                      style={{ backgroundColor: PHASE_COLORS[i] }}
                    >
                      {step.label}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
