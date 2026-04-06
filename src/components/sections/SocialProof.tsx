"use client";

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CineVideo } from '@/components/cine-video';
import FeatureDivider from '@/components/effects/FeatureDivider';
import { Divider } from '@/components/effects/Divider';
import DevSymbolsBackground from '@/components/effects/DevSymbolsBackground';

const techRow1 = [
  { label: 'Next.js', icon: 'nextdotjs', iconHex: '000000' },
  { label: 'React', icon: 'react' },
  { label: 'TypeScript', icon: 'typescript' },
  { label: 'Vite', icon: 'vite' },
  { label: 'Angular', icon: 'angular' },
  { label: 'Python', icon: 'python' },
  { label: 'FastAPI', icon: 'fastapi' },
  { label: 'PostgreSQL', icon: 'postgresql' },
  { label: 'Docker', icon: 'docker' },
  { label: 'Stripe', icon: 'stripe' },
  { label: 'Supabase', icon: 'supabase' },
  { label: 'Figma', icon: 'figma' }
];

const techRow2 = [
  { label: 'GitHub', icon: 'github', iconHex: '000000' },
  { label: 'Vercel', icon: 'vercel', iconHex: '000000' },
  { label: 'Tailwind CSS', icon: 'tailwindcss' },
  { label: 'Odoo', icon: 'odoo' },
  { label: 'Anthropic', icon: 'anthropic', iconHex: 'D4A373' },
  { label: 'OpenAI', icon: 'openai', iconHex: '000000' },
  { label: 'Gemini', icon: 'googlegemini' },
  { label: 'Perplexity', icon: 'perplexity' },
  { label: 'Make', icon: 'make', iconHex: '6D00CC' },
  { label: 'n8n', icon: 'n8n' },
  { label: 'Coolify', icon: 'coolify' }
];

function TechPill({ item }: { item: { label: string; icon: string; iconHex?: string } }) {
  const iconUrl = item.iconHex
    ? `https://cdn.simpleicons.org/${item.icon}/${item.iconHex}`
    : `https://cdn.simpleicons.org/${item.icon}`;

  return (
    <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-medium text-gray-700 whitespace-nowrap mx-1.5 transition-all hover:scale-105 hover:border-orange-300 hover:text-orange-600 border border-gray-200 bg-white">
      <img src={iconUrl} alt={item.label} className="w-3.5 h-3.5 object-contain" />
      {item.label}
    </span>
  );
}

export default function SocialProof() {
  const t = useTranslations('social');

  const team = [
    { name: t('daniel_name'), role: t('daniel_role'), bio: t('daniel_bio'), linkedin: 'https://linkedin.com/in/danieldevecchi/', video: '/videos/core-dan.mp4' },
    { name: t('victor_name'), role: t('victor_role'), bio: t('victor_bio'), linkedin: 'https://linkedin.com/in/victor-espinoza-92770217/', video: '/videos/core-vic.mp4' },
  ];

  const d1 = [...techRow1, ...techRow1];
  const d2 = [...techRow2, ...techRow2];

  return (
    <>
      <FeatureDivider className="my-16 max-w-6xl" />
      <section className="relative mx-auto max-w-6xl px-4 xl:px-0 overflow-hidden">
        <DevSymbolsBackground />

        <div className="relative z-[5]">
        {/* The Core Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="relative text-lg font-semibold tracking-tight text-orange-500">
            {t('section_label')}
            <div className="absolute top-1 -left-[8px] h-5 w-[3px] rounded-r-sm bg-orange-500" />
          </h2>
          <p className="mt-2 max-w-lg text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-4xl">
            {t('team_headline')}
          </p>
          <p className="mt-3 text-gray-600">{t('team_subtitle')}</p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center rounded-xl bg-white p-10 ring-1 ring-black/5 shadow-sm transition-all hover:ring-orange-400/40 hover:shadow-lg"
            >
              <div className="relative shrink-0 rounded-full bg-gray-100 p-1 ring-1 ring-gray-200 mb-8">
                <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden">
                  <CineVideo src={m.video} className="w-full h-full object-cover scale-[1.05]" />
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">{m.name}</h3>
              <p className="mt-1 text-sm text-orange-600 font-medium">{m.role}</p>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed max-w-sm">{m.bio}</p>

              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 rounded-sm border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-xs transition-all hover:border-orange-300 hover:text-orange-600"
              >
                LinkedIn <span className="text-gray-400">↗</span>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Marquee */}
        <Divider className="my-16" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-center text-sm font-medium text-gray-500 mb-8">
            {t('tech_label')}
          </p>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />

            <div className="overflow-hidden">
              <div className="flex animate-marquee-left w-max">
                {d1.map((item, i) => <TechPill key={`r1-${i}`} item={item} />)}
              </div>
            </div>
            <div className="overflow-hidden mt-3">
              <div className="flex animate-marquee-right w-max">
                {d2.map((item, i) => <TechPill key={`r2-${i}`} item={item} />)}
              </div>
            </div>
          </div>
        </motion.div>
        </div>
      </section>
    </>
  );
}
