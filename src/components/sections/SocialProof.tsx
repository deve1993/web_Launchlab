"use client";

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CineVideo } from '@/components/cine-video';

const techRow1 = [
  { label: 'Next.js', icon: 'nextdotjs', iconHex: 'ffffff' },
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
  { label: 'GitHub', icon: 'github', iconHex: 'ffffff' },
  { label: 'Vercel', icon: 'vercel', iconHex: 'ffffff' },
  { label: 'Tailwind CSS', icon: 'tailwindcss' },
  { label: 'Odoo', icon: 'odoo' },
  { label: 'Anthropic', icon: 'anthropic', iconHex: 'D4A373' },
  { label: 'OpenAI', icon: 'openai', iconHex: 'ffffff' },
  { label: 'Gemini', icon: 'googlegemini' },
  { label: 'Perplexity', icon: 'perplexity' },
  { label: 'Make', icon: 'make', iconHex: 'ffffff' },
  { label: 'n8n', icon: 'n8n' },
  { label: 'Coolify', icon: 'coolify' }
];

function TechPill({ item }: { item: { label: string, icon: string, iconHex?: string } }) {
  const iconUrl = item.iconHex 
    ? `https://cdn.simpleicons.org/${item.icon}/${item.iconHex}`
    : `https://cdn.simpleicons.org/${item.icon}/white`;

  return (
    <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold text-white/70 whitespace-nowrap mx-2 transition-transform hover:scale-105 hover:text-white hover:bg-white/10"
      style={{ fontFamily: 'var(--font-mono)', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.03)' }}>
      <img src={iconUrl} alt={item.label} className="w-4 h-4 object-contain opacity-80" />
      {item.label}
    </span>
  );
}

function InteractiveFounderCard({ m, index }: { m: any; index: number }) {
  // Floating offset based on index to make them look organic and independent
  const floatAnim = index === 0 ? [-10, 10, -10] : [10, -10, 10];
  const rotateAnim = index === 0 ? [-2, 2, -2] : [2, -2, 2];

  return (
    <motion.div
      animate={{ y: floatAnim, rotateZ: rotateAnim }}
      transition={{ duration: 7 + index, ease: "easeInOut", repeat: Infinity }}
      className="group relative bg-[#09090b]/80 border border-white/5 rounded-[40px] p-8 md:p-12 flex flex-col items-center justify-center text-center overflow-hidden h-full backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
      {/* Background ambient lighting from the video's color */}
      <div className={`absolute inset-0 opacity-10 blur-[80px] rounded-full mix-blend-screen pointer-events-none transition-opacity duration-700 group-hover:opacity-30 ${index === 0 ? 'bg-accent-cyan' : 'bg-accent'}`} />
      
      {/* Core Video */}
      <div className="w-56 h-56 md:w-72 md:h-72 relative mb-10 rounded-full overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8),0_10px_40px_rgba(0,0,0,0.5)] border border-white/5 ring-1 ring-white/10 group-hover:scale-[1.03] transition-transform duration-1000">
        <CineVideo src={m.video} className="w-full h-full object-cover scale-[1.05]" />
      </div>

      <div className="relative z-10 w-full">
        <h3 className="text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight" style={{ fontFamily: 'var(--font-sora)' }}>{m.name}</h3>
        <p className={`text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block border mb-6 ${index === 0 ? 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20' : 'text-accent bg-accent/10 border-accent/20'}`} style={{ fontFamily: 'var(--font-mono)' }}>
          {m.role}
        </p>
        <p className="text-base text-ink-500 leading-relaxed font-medium max-w-sm mx-auto mb-10">{m.bio}</p>
        
        <a href={m.linkedin} target="_blank" rel="noopener noreferrer" 
           className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ink-500 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-white/20">
           LINKEDIN
        </a>
      </div>
    </motion.div>
  );
}

export default function SocialProof() {
  const t = useTranslations('social');

  const products = [
    { name: t('quickfy_name'), desc: t('quickfy_desc'), status: t('quickfy_status') },
    { name: t('quickref_name'), desc: t('quickref_desc'), status: t('quickref_status') },
  ];

  const team = [
    { name: t('daniel_name'), role: t('daniel_role'), bio: t('daniel_bio'), linkedin: 'https://linkedin.com/in/danieldevecchi/', video: '/videos/core-dan.mp4' },
    { name: t('victor_name'), role: t('victor_role'), bio: t('victor_bio'), linkedin: 'https://linkedin.com/in/victor-espinoza-92770217/', video: '/videos/core-vic.mp4' },
  ];

  const d1 = [...techRow1, ...techRow1];
  const d2 = [...techRow2, ...techRow2];

  return (
    <section className="relative bg-background overflow-hidden py-32 px-6">

      <div className="max-w-6xl mx-auto relative z-10 space-y-32">
        {/* Products Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 text-[11px] font-bold text-ink-500 mb-6 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
            <span className="text-accent-cyan/80">{`//`}</span>
            <span>05 / 06 · I RISULTATI</span>
          </div>

          <p className="text-sm font-bold uppercase tracking-widest text-white/40 mb-8"
            style={{ fontFamily: 'var(--font-mono)' }}>
            {t('cases_eyebrow')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((p) => (
              <div key={p.name} className="bg-white/5 backdrop-blur-xl rounded-3xl p-8"
                style={{ border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-sora)' }}>{p.name}</h3>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-accent/20 text-accent"
                    style={{ fontFamily: 'var(--font-mono)', border: '1px solid rgba(16,185,129,0.3)' }}>
                    {p.status}
                  </span>
                </div>
                <p className="text-base text-ink-500 leading-relaxed font-medium">{p.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* The Core Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4" style={{ fontFamily: 'var(--font-sora)' }}>
              {t('team_headline')}
            </h2>
            <p className="text-ink-500 text-lg">L'intelligenza umana dietro l'esecuzione meccanica.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 relative px-4 md:px-12">
            {team.map((m, i) => (
              <InteractiveFounderCard key={m.name} m={m} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Tech Stack Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-bold uppercase tracking-widest text-ink-500 text-center mb-8"
            style={{ fontFamily: 'var(--font-mono)' }}>
            {t('tech_label')}
          </p>
          
          <div className="relative">
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
            
            <div className="overflow-hidden">
              <div className="flex animate-marquee-left w-max">
                {d1.map((item, i) => <TechPill key={`r1-${i}`} item={item} />)}
              </div>
            </div>
            <div className="overflow-hidden mt-4">
              <div className="flex animate-marquee-right w-max">
                {d2.map((item, i) => <TechPill key={`r2-${i}`} item={item} />)}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
