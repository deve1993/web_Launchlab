'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const locales = ['it', 'en', 'cs'] as const;

function LangDropdown({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-semibold uppercase tracking-wider text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
      >
        {locale}
        <svg className={cn("size-3 transition-transform", open && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 rounded-lg border border-gray-200 bg-white py-1 shadow-lg min-w-[80px]">
          {locales.map((loc) => (
            <a
              key={loc}
              href={`/${loc}`}
              className={cn(
                'block px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors',
                loc === locale
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              {loc}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-4 top-4 z-50 mx-auto flex max-w-6xl justify-center rounded-lg border border-transparent px-4 py-3 transition duration-300',
        scrolled || menuOpen
          ? 'border-gray-200/50 bg-white/95 shadow-2xl shadow-black/5 backdrop-blur-md'
          : 'bg-white/0',
      )}
    >
      <div className="w-full md:my-auto">
        <div className="relative flex items-center justify-between">
          <Link href={`/${locale}`} aria-label="Home">
            <Image
              src="/images/loghi/logo-dark.png"
              alt="LaunchLab"
              width={200}
              height={48}
              priority
              className="h-9 sm:h-14 w-auto object-contain"
            />
          </Link>

          <nav className="hidden sm:block md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:transform">
            <div className="flex items-center gap-8 text-sm font-medium">
              <a className="px-2 py-1 text-gray-600 hover:text-orange-500 transition-colors hover:underline hover:underline-offset-4 hover:decoration-orange-400" href="#method">
                {t('link_method')}
              </a>
              <a className="px-2 py-1 text-gray-600 hover:text-orange-500 transition-colors hover:underline hover:underline-offset-4 hover:decoration-orange-400" href="#process">
                {t('link_timeline')}
              </a>
              <a className="px-2 py-1 text-gray-600 hover:text-orange-500 transition-colors hover:underline hover:underline-offset-4 hover:decoration-orange-400" href="#pricing">
                {t('link_pricing')}
              </a>
            </div>
          </nav>

          <div className="hidden sm:flex items-center gap-2">
            <LangDropdown locale={locale} />
            <a
              href="#cta"
              className="inline-flex items-center justify-center gap-1 rounded-md border-b-[1.5px] border-orange-700 bg-gradient-to-b from-orange-400 to-orange-500 px-4 py-2 text-sm font-medium text-white shadow-[0_0_0_2px_rgba(0,0,0,0.04)] transition-all hover:shadow-orange-300"
            >
              {t('cta')}
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center justify-center rounded-sm border border-gray-300 bg-white p-1.5 sm:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor" className="text-gray-900"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor" className="text-gray-900"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <nav className="mt-6 flex flex-col gap-6 text-lg ease-in-out sm:hidden">
            <ul className="space-y-4 font-medium">
              <li onClick={() => setMenuOpen(false)}><a href="#method">{t('link_method')}</a></li>
              <li onClick={() => setMenuOpen(false)}><a href="#process">{t('link_timeline')}</a></li>
              <li onClick={() => setMenuOpen(false)}><a href="#pricing">{t('link_pricing')}</a></li>
            </ul>
            <div className="flex items-center gap-2">
              {locales.map((loc) => (
                <a key={loc} href={`/${loc}`} className={cn('px-3 py-1.5 text-sm uppercase font-semibold rounded-sm', loc === locale ? 'text-orange-600 bg-orange-50' : 'text-gray-500 hover:bg-gray-50')}>{loc}</a>
              ))}
            </div>
            <a href="#cta" onClick={() => setMenuOpen(false)} className="inline-flex items-center justify-center gap-1 rounded-md border-b-[1.5px] border-orange-700 bg-gradient-to-b from-orange-400 to-orange-500 px-4 py-3 text-lg font-medium text-white transition-all hover:shadow-orange-300">
              {t('cta')}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
