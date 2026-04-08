'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
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
        <div className="absolute right-0 top-full mt-2 rounded-lg border border-gray-200 bg-white py-1 shadow-lg min-w-[80px] z-50">
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

export interface NavLink {
  href: string;
  label: string;
  isRoute?: boolean; // true = Next Link, false = anchor
  highlight?: boolean; // renders as badge (e.g. Agent Lead)
}

interface NavbarProps {
  links: NavLink[];
  ctaText: string;
  ctaHref: string;
  /** Optional ghost button before CTA (e.g. "Accedi" on Agent Lead) */
  ghostText?: string;
  ghostHref?: string;
}

export default function Navbar({ links, ctaText, ctaHref, ghostText, ghostHref }: NavbarProps) {
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalTarget(document.getElementById('navbar-portal'));
  }, []);

  useEffect(() => {
    // Use IntersectionObserver on a sentinel element at the top of the page
    // This works with Lenis smooth scroll unlike window.scrollY
    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    sentinel.style.height = '1px';
    sentinel.style.width = '1px';
    sentinel.style.pointerEvents = 'none';
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 1.0 }
    );
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  const linkClass = "px-2 py-1 text-gray-600 hover:text-orange-500 transition-colors hover:underline hover:underline-offset-4 hover:decoration-orange-400";
  const highlightClass = "px-3 py-1.5 text-sm font-semibold text-orange-600 bg-orange-50 rounded-md ring-1 ring-orange-200 hover:bg-orange-100 transition-colors";

  const navContent = (
    <header
      className={cn(
        'fixed inset-x-4 top-4 z-50 mx-auto flex max-w-6xl justify-center rounded-lg px-4 py-3 transition duration-300 backdrop-blur-md',
        scrolled || menuOpen
          ? 'border border-gray-200/50 bg-white/95 shadow-2xl shadow-black/5'
          : 'border border-transparent bg-white/70',
      )}
    >
      <div className="w-full md:my-auto">
        <div className="relative flex items-center justify-between">
          {/* Logo — always links to home */}
          <Link href={`/${locale}`} aria-label="Home" className="flex items-center gap-2">
            <Image
              src="/images/loghi/logo-dve-icon.svg"
              alt=""
              width={40}
              height={40}
              priority
              className="h-8 sm:h-9 w-auto object-contain"
            />
            <Image
              src="/images/loghi/logo-dve.svg"
              alt="DVE Solutions"
              width={160}
              height={40}
              priority
              className="h-11 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden sm:block md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:transform">
            <div className="flex items-center gap-8 text-sm font-medium">
              {links.map((link) => (
                link.highlight ? (
                  <Link key={link.href} href={link.href} className={highlightClass}>
                    {link.label}
                  </Link>
                ) : link.isRoute ? (
                  <Link key={link.href} href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.href} href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                )
              ))}
            </div>
          </nav>

          {/* Desktop right side */}
          <div className="hidden sm:flex items-center gap-2">
            <LangDropdown locale={locale} />
            {ghostText && ghostHref && (
              <a
                href={ghostHref}
                className="inline-flex items-center justify-center rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs transition-all hover:border-orange-300 hover:text-orange-600"
              >
                {ghostText}
              </a>
            )}
            <a
              href={ctaHref}
              className="inline-flex items-center justify-center gap-1 rounded-md border-b-[1.5px] border-orange-700 bg-gradient-to-b from-orange-400 to-orange-500 px-4 py-2 text-sm font-medium text-white shadow-[0_0_0_2px_rgba(0,0,0,0.04)] transition-all hover:shadow-orange-300"
            >
              {ctaText}
            </a>
          </div>

          {/* Mobile hamburger */}
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

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="mt-6 flex flex-col gap-6 text-lg ease-in-out sm:hidden">
            <ul className="space-y-4 font-medium">
              {links.map((link) => (
                <li key={link.href} onClick={() => setMenuOpen(false)}>
                  {link.isRoute || link.highlight ? (
                    <Link href={link.href} className={link.highlight ? 'text-orange-600 font-semibold' : ''}>
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href}>{link.label}</a>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              {locales.map((loc) => (
                <a key={loc} href={`/${loc}`} className={cn('px-3 py-1.5 text-sm uppercase font-semibold rounded-sm', loc === locale ? 'text-orange-600 bg-orange-50' : 'text-gray-500 hover:bg-gray-50')}>{loc}</a>
              ))}
            </div>
            {ghostText && ghostHref && (
              <a href={ghostHref} onClick={() => setMenuOpen(false)} className="inline-flex items-center justify-center rounded-sm border border-gray-300 bg-white px-3 py-3 text-lg font-semibold text-gray-900 shadow-xs hover:border-orange-300 hover:text-orange-600 transition-all">
                {ghostText}
              </a>
            )}
            <a href={ctaHref} onClick={() => setMenuOpen(false)} className="inline-flex items-center justify-center gap-1 rounded-md border-b-[1.5px] border-orange-700 bg-gradient-to-b from-orange-400 to-orange-500 px-4 py-3 text-lg font-medium text-white transition-all hover:shadow-orange-300">
              {ctaText}
            </a>
          </nav>
        )}
      </div>
    </header>
  );

  // Portal: render navbar outside Lenis wrapper so position:fixed works
  if (portalTarget) {
    return createPortal(navContent, portalTarget);
  }
  return navContent;
}
