"use client";

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CineVideo } from '@/components/cine-video';

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function TrendDownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </svg>
  );
}

const cardIcons = [ClockIcon, CodeIcon, TrendDownIcon];
const videoSources = ['/videos/glitch-founder.mp4', '/videos/glitch-devs.mp4', '/videos/glitch-burn.mp4'];

// Custom 3D Card component for the hover effect
function TiltCard({ children, bgVideo }: { children: React.ReactNode, bgVideo: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse values
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse position to rotation (-8deg to 8deg for impact)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse position relative to center of card (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ perspective: 1000 }} // We need perspective on the wrapper
      className="h-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative rounded-2xl overflow-hidden cursor-crosshair border border-white/5 bg-black/40 backdrop-blur-2xl h-full shadow-[0_4px_30px_rgba(0,0,0,0.8)] transition-colors duration-500 hover:border-accent/30"
      >
        {/* Background Video Layer */}
        <div className="absolute inset-0 z-0 opacity-15 group-hover:opacity-70 transition-opacity duration-700 mix-blend-screen pointer-events-none">
          <CineVideo src={bgVideo} className="w-full h-full object-cover scale-105" loadMargin="200px" />
        </div>
        
        {/* Deep shadow gradient to keep text readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0 pointer-events-none" />

        {/* Glow border effect on hover */}
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 100% 80% at 50% 120%, rgba(16,185,129,0.15) 0%, transparent 70%)'
          }}
        />

        {/* Inner Content with Z translation to pop out */}
        <div className="relative z-10 p-8 h-full flex flex-col" style={{ transform: "translateZ(30px)" }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PainCards() {
  const t = useTranslations('pain');

  const cards = [
    { badge: t('card1_badge'), hook: t('card1_hook'), body: t('card1_body') },
    { badge: t('card2_badge'), hook: t('card2_hook'), body: t('card2_body') },
    { badge: t('card3_badge'), hook: t('card3_hook'), body: t('card3_body') },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-background">
      {/* Reverse parallax dust/glow in the background could be added here */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-cyan/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 text-[11px] font-bold text-ink-500 mb-6 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
            <span className="text-accent/80">{`//`}</span>
            <span>01 / 06 · IL PROBLEMA</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-sora)' }}>
            {t('headline')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = cardIcons[i];
            const video = videoSources[i];
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
                className="h-full"
              >
                <TiltCard bgVideo={video}>
                  <div
                    className="absolute top-4 right-5 text-[72px] font-bold leading-none select-none pointer-events-none opacity-[0.04] transition-opacity duration-300"
                    style={{ fontFamily: 'var(--font-sora)', color: '#fff' }}
                  >
                    ❝
                  </div>

                  <div className="flex items-center justify-between mb-8">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-white/50 bg-white/5 border border-white/5"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {card.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-accent-dark/20 flex items-center justify-center text-accent/90 flex-shrink-0 shadow-[inset_0_0_12px_rgba(16,185,129,0.2)]">
                      <Icon />
                    </div>
                  </div>

                  <h3
                    className="text-2xl font-bold text-white mb-4 leading-snug tracking-tight"
                    style={{ fontFamily: 'var(--font-sora)' }}
                  >
                    &quot;{card.hook}&quot;
                  </h3>

                  <p className="text-sm text-ink-500 leading-relaxed font-medium mt-auto">
                    {card.body}
                  </p>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
