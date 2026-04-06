"use client";

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef, useEffect, useState } from 'react';
import VerticalLines from '@/components/effects/VerticalLines';
import FeatureDivider from '@/components/effects/FeatureDivider';

const WEEKS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'];
const PHASE_CELLS = [[0, 1], [2, 3], [4, 5]];
const PHASE_KEYS = ['mvs_workshop', 'design', 'build_deploy'];

export default function Processo() {
  const t = useTranslations('process');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [ganttVisible, setGanttVisible] = useState(false);
  const [visiblePhases, setVisiblePhases] = useState(0);

  const steps = [
    { label: t('week1_label'), title: t('week1_title'), desc: t('week1_desc') },
    { label: t('week2_label'), title: t('week2_title'), desc: t('week2_desc') },
    { label: t('week3_label'), title: t('week3_title'), desc: t('week3_desc') },
  ];

  useEffect(() => {
    if (!isInView) return;
    const ids = [
      setTimeout(() => setGanttVisible(true), 400),
      setTimeout(() => setVisiblePhases(1), 1500),
      setTimeout(() => setVisiblePhases(2), 2000),
      setTimeout(() => setVisiblePhases(3), 2500),
    ];
    return () => ids.forEach(clearTimeout);
  }, [isInView]);

  const kw = (s: string) => <span style={{ color: '#ff7b72' }}>{s}</span>;
  const prop = (s: string) => <span style={{ color: '#79c0ff' }}>{s}</span>;
  const str = (s: string) => <span style={{ color: '#a5d6ff' }}>&quot;{s}&quot;</span>;
  const punct = (s: string) => <span style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</span>;
  const comment = (s: string) => <span style={{ color: 'rgba(255,255,255,0.4)' }}>{s}</span>;

  return (
    <>
      <FeatureDivider className="my-16 max-w-6xl" />
      <section id="process" className="relative mx-auto max-w-6xl scroll-my-24 px-4 xl:px-0">
        <VerticalLines />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="relative text-lg font-semibold tracking-tight text-orange-500">
              Timeline
              <div className="absolute top-1 -left-[8px] h-5 w-[3px] rounded-r-sm bg-orange-500" />
            </h2>
            <p className="mt-2 text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-4xl">
              {t('headline')}
            </p>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55 }}
            className="mt-10 rounded-xl overflow-hidden bg-gray-950 ring-1 ring-black/10 shadow-2xl shadow-gray-900/20 transition-all hover:ring-orange-500/20"
          >
            <div className="flex items-center h-11 px-5 border-b border-gray-800" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
              </div>
              <div className="flex-1 flex justify-center">
                <span className="text-[11px] text-gray-500 font-mono">project.timeline.ts</span>
              </div>
            </div>

            <div className="flex font-mono">
              <div className="hidden md:flex flex-col pt-6 pb-8 px-4 select-none flex-shrink-0 border-r border-gray-800" style={{ background: 'rgba(255,255,255,0.01)' }}>
                {Array.from({ length: 24 }, (_, i) => (
                  <div key={i} className="text-[11px] leading-[1.85] text-right text-gray-600">{i + 1}</div>
                ))}
              </div>

              <div className="flex-1 p-6 md:p-8 overflow-x-auto">
                <div className="min-w-[480px]">
                  <div className="mb-6">
                    <div className="text-[13px] leading-relaxed mb-1">{comment('/**')}</div>
                    <div className="text-[13px] leading-relaxed mb-4 pl-1">
                      {comment(' * ')}<span style={{ color: 'rgba(255,255,255,0.8)' }}>Project Timeline</span>{comment(' · 6 weeks · 3 phases')}
                    </div>

                    <div className="flex items-center gap-1.5 mb-2 pl-1">
                      <span className="text-[11px] w-[130px] flex-shrink-0">{comment(' *             ')}</span>
                      {WEEKS.map((w) => (
                        <div key={w} className="flex-1 text-center text-[10px] text-gray-500" style={{ minWidth: '32px' }}>{w}</div>
                      ))}
                    </div>

                    {steps.map((step, i) => (
                      <div key={i} className="flex items-center gap-1.5 mb-1.5 pl-1">
                        <span className="text-[11px] flex-shrink-0 w-[130px] truncate text-gray-500">{` * `}{PHASE_KEYS[i]}</span>
                        {WEEKS.map((_, wi) => {
                          const isActive = PHASE_CELLS[i].includes(wi);
                          return (
                            <motion.div
                              key={wi}
                              className="flex-1 h-[18px] rounded-[3px]"
                              style={{ minWidth: '32px' }}
                              initial={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                              animate={{
                                backgroundColor: isActive && ganttVisible
                                  ? `rgba(249,115,22,${0.3 - i * 0.05})`
                                  : 'rgba(255,255,255,0.05)',
                              }}
                              transition={{ duration: 0.45, delay: isActive ? 0.05 + i * 0.18 : 0 }}
                            />
                          );
                        })}
                        <motion.span
                          className="text-[10px] ml-2 flex-shrink-0 hidden lg:inline text-gray-500"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: ganttVisible ? 1 : 0 }}
                          transition={{ duration: 0.3, delay: 0.5 + i * 0.18 }}
                        >
                          // {step.label}
                        </motion.span>
                      </div>
                    ))}
                    <div className="text-[13px] leading-relaxed mt-2">{comment(' */')}</div>
                  </div>

                  <div className="mb-1 text-[13px] leading-relaxed h-5" />
                  <div className="mb-5 text-[13px] leading-relaxed">
                    {kw('export const ')}{prop('phases')}{punct(' = {')}
                  </div>

                  {steps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: visiblePhases > i ? 1 : 0, y: visiblePhases > i ? 0 : 5 }}
                      transition={{ duration: 0.35 }}
                      className="mb-5 pl-5 md:pl-7"
                    >
                      <div className="text-[13px] leading-relaxed mb-1">
                        <span style={{ color: '#e5c07b' }}>{PHASE_KEYS[i]}</span>{punct(': {')}
                      </div>
                      <div className="pl-5 md:pl-7 space-y-[3px]">
                        <div className="text-[12px] leading-relaxed">{prop('weeks')}{punct(': ')}{str(step.label)}{punct(',')}</div>
                        <div className="text-[12px] leading-relaxed">{prop('title')}{punct(': ')}{str(step.title)}{punct(',')}</div>
                        <div className="text-[12px] leading-relaxed">{prop('deliverable')}{punct(': ')}{str(step.desc)}{punct(',')}</div>
                        <div className="text-[12px] leading-relaxed">{prop('status')}{punct(': ')}<span style={{ color: '#f97316' }}>&apos;✓ done&apos;</span>{punct(',')}</div>
                      </div>
                      <div className="text-[13px] leading-relaxed mt-1">{punct(i < steps.length - 1 ? '},' : '}')}</div>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: visiblePhases >= 3 ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="text-[13px] leading-relaxed"
                  >
                    {punct('}')}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
