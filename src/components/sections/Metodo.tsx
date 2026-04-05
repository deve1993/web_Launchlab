"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Metodo() {
  const t = useTranslations('method');
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(5.0); // Safety default 5 seconds
  const [shouldLoad, setShouldLoad] = useState(false);

  // Hook into the 300vh scrolling container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map progress (0 to 1) to video duration
  const videoTime = useTransform(scrollYProgress, [0, 1], [0, duration]);

  // Lazy load: only assign video src when section comes within 500px
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px", threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Sync the video currentTime with the framer motion mapped value
    const unsubscribe = videoTime.on("change", (latestTime) => {
      if (videoRef.current && videoRef.current.readyState >= 2) { // 2 = HAVE_CURRENT_DATA
        // Fast seek
        videoRef.current.currentTime = latestTime;
      }
    });
    return () => unsubscribe();
  }, [videoTime]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      // Once we have metadata, aggressively preload the full video for smooth scrubbing
      videoRef.current.preload = "auto";
    }
  };

  // UI orchestrations based on scroll progress
  // Step 1: 5% to 30%, Step 2: 35% to 65%, Step 3: 70% to 100%
  const opacityStep1 = useTransform(scrollYProgress, [0.05, 0.15, 0.25, 0.3], [0, 1, 1, 0]);
  const yStep1 = useTransform(scrollYProgress, [0.05, 0.15], [20, 0]);

  const opacityStep2 = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
  const yStep2 = useTransform(scrollYProgress, [0.35, 0.45], [20, 0]);

  const opacityStep3 = useTransform(scrollYProgress, [0.7, 0.8, 0.95, 1.0], [0, 1, 1, 1]); // stays at the end
  const yStep3 = useTransform(scrollYProgress, [0.7, 0.8], [20, 0]);

  return (
    <section ref={containerRef} id="method" className="relative h-[300vh] bg-background">
      {/* Sticky container stays in place while user scrolls down the 300vh track */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Video Player configured for timeline scrubbing */}
        <div className="absolute inset-0 z-0 bg-black">
          {shouldLoad && (
            <video
              ref={videoRef}
              src="/videos/workflow-scrub.mp4"
              className="w-full h-full object-cover opacity-70 mix-blend-screen scale-[1.02]"
              muted
              playsInline
              preload="metadata"
              onLoadedMetadata={handleLoadedMetadata}
            />
          )}
          {/* Deep cinematic obsidian gradients to ease the edges of the video into the UI */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_right_center,rgba(6,182,212,0.05)_0%,transparent_60%)] z-1 pointer-events-none" />
        </div>

        {/* Foreground Content Panel */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20">
          
          <div className="flex flex-col justify-center h-[70vh]">
            <div className="mb-16">
              <div className="flex items-center gap-2 text-[11px] font-bold text-ink-500 mb-6 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
                <span className="text-accent">{`//`}</span>
                <span>02 / 06 · L'ASSEMBLAGGIO</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05]" style={{ fontFamily: 'var(--font-display)' }}>
                {t('headline')}
              </h2>
            </div>
            
            <div className="relative h-64 border-l border-white/10 pl-8">
              {/* Timeline marker that travels down */}
              <motion.div 
                className="absolute left-[-2px] top-0 w-1 bg-accent rounded-full hidden md:block" 
                style={{ 
                  height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) 
                }} 
              />

              <motion.div style={{ opacity: opacityStep1, y: yStep1 }} className="absolute inset-0 pt-4">
                <span className="inline-flex items-center mb-4 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 ring-1 ring-accent/20" style={{ fontFamily: 'var(--font-mono)' }}>
                  {t('step1_timeline')}
                </span>
                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{t('step1_title')}</h3>
                <p className="text-ink-500 text-lg leading-relaxed max-w-md font-medium">{t('step1_desc')}</p>
              </motion.div>

              <motion.div style={{ opacity: opacityStep2, y: yStep2 }} className="absolute inset-0 pt-4 pointer-events-none">
                <span className="inline-flex items-center mb-4 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 ring-1 ring-accent/20" style={{ fontFamily: 'var(--font-mono)' }}>
                  {t('step2_timeline')}
                </span>
                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{t('step2_title')}</h3>
                <p className="text-ink-500 text-lg leading-relaxed max-w-md font-medium">{t('step2_desc')}</p>
              </motion.div>

              <motion.div style={{ opacity: opacityStep3, y: yStep3 }} className="absolute inset-0 pt-4 pointer-events-none">
                <span className="inline-flex items-center mb-4 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-white/40 bg-white/5 ring-1 ring-white/10" style={{ fontFamily: 'var(--font-mono)' }}>
                  {t('step3_timeline')}
                </span>
                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{t('step3_title')}</h3>
                <p className="text-ink-500 text-lg leading-relaxed max-w-md font-medium">{t('step3_desc')}</p>
              </motion.div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
