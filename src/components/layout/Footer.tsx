import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="relative border-t border-accent/20 bg-background py-20 overflow-hidden">
      {/* Subtle top cinematic glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          
          <div className="flex flex-col gap-6">
            <Link href="/" className="interactive block transition-transform hover:scale-105 origin-left">
              <Image
                src="/images/loghi/logo-light.png"
                alt="LaunchLab"
                width={2000}
                height={1000}
                className="h-10 w-auto opacity-90 transition-opacity hover:opacity-100"
              />
            </Link>
            <p className="text-white/50 text-sm font-medium leading-relaxed max-w-xs">{t('tagline')}</p>
          </div>

          <div className="flex flex-col md:flex-row gap-10 md:gap-20">
            <div className="flex flex-col gap-4">
              <span className="text-[11px] font-bold text-accent-cyan/50 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>Legal</span>
              <div className="flex flex-col gap-3">
                <Link href="#" className="interactive text-sm text-white/50 hover:text-white transition-colors font-semibold">
                  {t('privacy')}
                </Link>
                <Link href="#" className="interactive text-sm text-white/50 hover:text-white transition-colors font-semibold">
                  {t('cookie')}
                </Link>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <span className="text-[11px] font-bold text-accent-cyan/50 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>Connect</span>
              <div className="flex flex-col gap-3">
                <a
                  href="https://linkedin.com/in/danieldevecchi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive text-sm text-white/50 hover:text-accent-cyan transition-colors font-semibold flex items-center gap-1.5"
                >
                  LinkedIn Daniel <span className="text-[10px] text-accent-cyan/50 font-black">↗</span>
                </a>
                <a
                  href="https://linkedin.com/in/victor-espinoza-92770217/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive text-sm text-white/50 hover:text-accent-cyan transition-colors font-semibold flex items-center gap-1.5"
                >
                  LinkedIn Victor <span className="text-[10px] text-accent-cyan/50 font-black">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/30 text-xs font-semibold">{t('copyright')}</p>
          <div className="flex items-center gap-2.5 text-[10px] font-bold text-white/40 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
            Design system <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/80 shadow-[0_0_8px_rgba(6,182,212,1)]" /> Engineered for speed
          </div>
        </div>
      </div>
    </footer>
  );
}
