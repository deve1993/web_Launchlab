"use client";

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef, useEffect, useState } from 'react';

const FRAGMENTS = [
  { code: 'const mvs = analyze(idea)',        x: 3,  delay:   0, dur: 18, sz: 12 },
  { code: 'interface MVP { weeks: 6 }',       x: 13, delay:  -5, dur: 22, sz: 11 },
  { code: 'await deploy(prototype)',           x: 22, delay: -11, dur: 16, sz: 12 },
  { code: 'export const timeline = {',        x: 32, delay:  -3, dur: 20, sz: 11 },
  { code: "type Status = 'live'",             x: 43, delay:  -8, dur: 17, sz: 12 },
  { code: 'validateIdea(brief)',               x: 53, delay: -14, dur: 19, sz: 11 },
  { code: 'ship({ version: "1.0" })',          x: 63, delay:  -2, dur: 21, sz: 12 },
  { code: 'const roadmap = plan(idea)',        x: 73, delay:  -9, dur: 15, sz: 11 },
  { code: 'if (valid) launch()',               x: 83, delay: -16, dur: 18, sz: 12 },
  { code: 'prototype.test(users)',             x: 7,  delay: -13, dur: 23, sz: 11 },
  { code: 'weeks: [1, 2, 3, 4, 5, 6]',        x: 17, delay:  -4, dur: 16, sz: 12 },
  { code: 'return { status: 200 }',            x: 27, delay: -10, dur: 20, sz: 11 },
  { code: 'compile(src, { target })',          x: 37, delay:  -7, dur: 17, sz: 12 },
  { code: "const env = 'production'",         x: 48, delay: -15, dur: 22, sz: 11 },
  { code: 'sprint.complete()',                 x: 58, delay:  -1, dur: 19, sz: 12 },
  { code: 'figma.export(design)',              x: 68, delay:  -6, dur: 16, sz: 11 },
  { code: 'type Founder = { n: 2 }',          x: 78, delay: -12, dur: 21, sz: 12 },
  { code: 'build.run({ weeks: 6 })',           x: 88, delay:  -3, dur: 18, sz: 11 },
];

function FloatingCodeBg() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden mix-blend-screen opacity-30">
      {FRAGMENTS.map((f, i) => (
        <div
          key={i}
          className="absolute bottom-0 whitespace-nowrap"
          style={{
            left: `${f.x}%`,
            fontSize: `${f.sz}px`,
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-accent)',
            animation: `code-float ${f.dur}s linear ${f.delay}s infinite`,
          }}
        >
          {f.code}
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-t from-background to-transparent" />
      <div className="absolute inset-x-0 top-0 h-[30vh] bg-gradient-to-b from-background to-transparent" />
    </div>
  );
}

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
    <section className="relative bg-background overflow-hidden py-32 px-6">
      <FloatingCodeBg />
      <div className="max-w-5xl mx-auto relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45 }}
          className="flex items-center gap-2 text-[11px] font-bold text-ink-500 mb-6 uppercase tracking-widest"
        >
          <span className="text-accent" style={{ fontFamily: 'var(--font-mono)' }}>{`//`}</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>03 / 06 · TIMELINE</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-12 tracking-tight"
          style={{ fontFamily: 'var(--font-sora)' }}
        >
          {t('headline')}
        </motion.h2>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55 }}
          className="rounded-2xl overflow-hidden backdrop-blur-xl"
          style={{
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 60px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.02)',
          }}
        >
          <div className="flex items-center h-11 px-5 border-b border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
            </div>
            <div className="flex-1 flex justify-center">
              <span className="text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)' }}>
                project.timeline.ts
              </span>
            </div>
          </div>

          <div className="flex" style={{ fontFamily: 'var(--font-mono)' }}>
            <div className="hidden md:flex flex-col pt-6 pb-8 px-4 select-none flex-shrink-0 border-r border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.01)' }}>
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="text-[11px] leading-[1.85] text-right" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  {i + 1}
                </div>
              ))}
            </div>

            <div className="flex-1 p-6 md:p-8 overflow-x-auto">
              <div className="min-w-[480px]">

                <div className="mb-6">
                  <div className="text-[13px] leading-relaxed mb-1">{comment('/**')}</div>
                  <div className="text-[13px] leading-relaxed mb-4 pl-1">
                    {comment(' * ')}
                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>Project Timeline</span>
                    {comment(' · 6 weeks · 3 phases')}
                  </div>

                  <div className="flex items-center gap-1.5 mb-2 pl-1">
                    <span className="text-[11px] w-[130px] flex-shrink-0">{comment(' *             ')}</span>
                    {WEEKS.map((w) => (
                      <div key={w} className="flex-1 text-center text-[10px]" style={{ color: 'rgba(255,255,255,0.4)', minWidth: '32px' }}>
                        {w}
                      </div>
                    ))}
                  </div>

                  {steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-1.5 mb-1.5 pl-1">
                      <span className="text-[11px] flex-shrink-0 w-[130px] truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        {` * `}{PHASE_KEYS[i]}
                      </span>
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
                                ? `rgba(255,90,31,${0.3 - i * 0.05})`
                                : 'rgba(255,255,255,0.05)',
                            }}
                            transition={{ duration: 0.45, delay: isActive ? 0.05 + i * 0.18 : 0 }}
                          />
                        );
                      })}
                      <motion.span
                        className="text-[10px] ml-2 flex-shrink-0 hidden lg:inline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: ganttVisible ? 1 : 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.18 }}
                        style={{ color: 'rgba(255,255,255,0.4)' }}
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
                      <div className="text-[12px] leading-relaxed">
                        {prop('weeks')}{punct(': ')}{str(step.label)}{punct(',')}
                      </div>
                      <div className="text-[12px] leading-relaxed">
                        {prop('title')}{punct(': ')}{str(step.title)}{punct(',')}
                      </div>
                      <div className="text-[12px] leading-relaxed">
                        {prop('deliverable')}{punct(': ')}{str(step.desc)}{punct(',')}
                      </div>
                      <div className="text-[12px] leading-relaxed">
                        {prop('status')}{punct(': ')}<span style={{ color: '#ff5a1f' }}>&apos;✓ done&apos;</span>{punct(',')}
                      </div>
                    </div>
                    <div className="text-[13px] leading-relaxed mt-1">
                      {punct(i < steps.length - 1 ? '},' : '}')}
                    </div>
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
  );
}
