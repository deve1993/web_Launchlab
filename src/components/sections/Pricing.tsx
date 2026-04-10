"use client";

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import VerticalLines from '@/components/effects/VerticalLines';
import FeatureDivider from '@/components/effects/FeatureDivider';

export default function Pricing() {
  const t = useTranslations('pricing');

  const plan1 = [t('plan1_feature1'), t('plan1_feature2'), t('plan1_feature3'), t('plan1_feature4')];
  const plan2 = [t('plan2_feature1'), t('plan2_feature2'), t('plan2_feature3'), t('plan2_feature4'), t('plan2_feature5')];

  return (
    <>
      <FeatureDivider className="my-16 max-w-6xl" />
      <section id="pricing" className="relative mx-auto max-w-6xl scroll-my-24 px-4 xl:px-0">
        <VerticalLines />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12"
          >
            <h2 className="relative text-lg font-semibold tracking-tight text-orange-500">
              {t('section_label')}
              <div className="absolute top-1 -left-[8px] h-5 w-[3px] rounded-r-sm bg-orange-500" />
            </h2>
            <p className="mt-2 text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-4xl">
              {t('headline')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Plan 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-xl bg-white p-8 md:p-10 ring-1 ring-black/5 shadow-sm flex flex-col transition-all hover:ring-orange-400/40 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-900 tracking-tight">{t('plan1_title')}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-semibold text-gray-900 tracking-tighter">{t('plan1_price')}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{t('plan1_duration')}</p>

              <ul className="mt-8 flex flex-col gap-3 flex-1">
                {plan1.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-700">
                    <svg className="mt-0.5 size-4 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#cta" className="mt-8 inline-flex w-full items-center justify-center rounded-sm border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-xs transition-all hover:border-orange-300 hover:text-orange-600">
                {t('plan1_cta')}
              </a>
            </motion.div>

            {/* Plan 2 - Highlighted */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl bg-white pt-12 p-8 md:p-10 md:pt-10 ring-2 ring-orange-500 shadow-2xl shadow-orange-500/10 flex flex-col mt-1"
            >
              <div className="absolute top-0 right-6 -translate-y-1/2">
                <span className="inline-flex items-center rounded-full border-b-[1.5px] border-orange-700 bg-gradient-to-b from-orange-400 to-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  {t('plan2_badge')}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 tracking-tight">{t('plan2_title')}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-semibold text-gray-900 tracking-tighter">{t('plan2_price')}</span>
              </div>
              <p className="mt-2 text-sm text-orange-600 font-medium">{t('plan2_duration')}</p>

              <ul className="mt-8 flex flex-col gap-3 flex-1">
                {plan2.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-700">
                    <svg className="mt-0.5 size-4 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#cta" className="mt-8 inline-flex w-full items-center justify-center gap-1 rounded-md border-b-[1.5px] border-orange-700 bg-gradient-to-b from-orange-400 to-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_0_2px_rgba(0,0,0,0.04),0_0_14px_0_rgba(255,255,255,0.19)] transition-all hover:shadow-orange-300">
                {t('plan2_cta')}
              </a>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center text-sm text-gray-500 mt-8"
          >
            {t('note')}
          </motion.p>
        </div>
      </section>
    </>
  );
}
