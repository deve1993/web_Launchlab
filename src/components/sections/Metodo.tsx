"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import FeatureDivider from '@/components/effects/FeatureDivider';
import VerticalLines from '@/components/effects/VerticalLines';
import DiagonalSVG from '@/components/effects/DiagonalSVG';
import WorkshopViz from '@/components/effects/WorkshopViz';
import DesignViz from '@/components/effects/DesignViz';
import BuildViz from '@/components/effects/BuildViz';

const vizComponents = [WorkshopViz, DesignViz, BuildViz];

export default function Metodo() {
  const t = useTranslations('method');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const steps = [
    { num: "01", timeline: t('step1_timeline'), title: t('step1_title'), desc: t('step1_desc') },
    { num: "02", timeline: t('step2_timeline'), title: t('step2_title'), desc: t('step2_desc') },
    { num: "03", timeline: t('step3_timeline'), title: t('step3_title'), desc: t('step3_desc') },
  ];

  return (
    <>
      <FeatureDivider className="my-16 max-w-6xl" />
      <section ref={sectionRef} id="method" className="relative mx-auto max-w-6xl scroll-my-24 px-4 xl:px-0 overflow-hidden">
        <VerticalLines />

        {/* Parallax diagonal pattern background */}
        <motion.div className="absolute inset-0 -z-10 pointer-events-none" style={{ y: bgY }}>
          <DiagonalSVG
            id="metodo-diagonal"
            className="mask-[radial-gradient(ellipse_80%_60%_at_50%_50%,black_40%,transparent_100%)]"
          />
        </motion.div>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="relative text-lg font-semibold tracking-tight text-orange-500">
            {t('section_label')}
            <div className="absolute top-1 -left-[8px] h-5 w-[3px] rounded-r-sm bg-orange-500" />
          </h2>
          <p className="mt-2 max-w-lg text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-4xl">
            {t('headline')}
          </p>
          <p className="mt-3 max-w-lg text-gray-600 text-balance">
            {t('subheadline')}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-24 md:space-y-32">
          {steps.map((step, i) => {
            const Viz = vizComponents[i];
            const isReversed = i % 2 !== 0;

            return (
              <div
                key={step.num}
                className={"grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${i === 2 ? pb-0.5 : ''}"}
              >
                {/* Text side */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={isReversed ? 'md:order-2' : ''}
                >
                  <ParallaxNumber num={step.num} scrollYProgress={scrollYProgress} index={i} />

                  <span className="inline-flex items-center rounded-full border-b-[1.5px] border-orange-700 bg-gradient-to-b from-orange-400 to-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    {step.timeline}
                  </span>

                  <h3 className="mt-4 text-2xl font-semibold tracking-tighter text-gray-900 md:text-3xl">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-gray-600 leading-relaxed max-w-md">
                    {step.desc}
                  </p>
                </motion.div>

                {/* Visual side */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                  className={isReversed ? 'md:order-1' : ''}
                >
                  <div className="rounded-xl bg-white p-6 ring-1 ring-black/5 shadow-lg transition-all hover:ring-orange-400/40">
                    <Viz />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

function ParallaxNumber({
  num,
  scrollYProgress,
  index,
}: {
  num: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
}) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [20 + index * 10, -20 - index * 10],
  );

  return (
    <motion.div
      style={{ y }}
      className="text-[80px] md:text-[120px] font-bold tracking-tighter leading-none text-gray-200 select-none pointer-events-none mb-3 md:mb-4 -z-10 relative"
    >
      {num}
    </motion.div>
  );
}
