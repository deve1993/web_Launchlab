import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import DiagonalSVG from '@/components/effects/DiagonalSVG';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <div className="px-4 xl:px-0">
      <footer className="relative mx-auto flex max-w-6xl flex-wrap pt-4">
        {/* Vertical dashed lines */}
        <div className="pointer-events-none inset-0">
          {['left-0', 'right-0'].map((pos) => (
            <div
              key={pos}
              className={`absolute inset-y-0 -my-20 w-px ${pos}`}
              style={{ maskImage: 'linear-gradient(transparent, white 5rem)' }}
            >
              <svg className="h-full w-full" preserveAspectRatio="none">
                <line x1="0" y1="0" x2="0" y2="100%" className="stroke-gray-300" strokeWidth="2" strokeDasharray="3 3" />
              </svg>
            </div>
          ))}
        </div>

        {/* Diagonal pattern separator */}
        <div className="relative mb-10 h-20 w-full border-y border-dashed border-gray-300 overflow-hidden">
          <DiagonalSVG id="footer-diagonal" className="stroke-gray-300" />
        </div>

        {/* Logo + Social */}
        <div className="mr-auto flex w-full justify-between lg:w-fit lg:flex-col">
          <Link href="/" className="flex items-center select-none">
            <Image
              src="/images/loghi/logo-dark.png"
              alt="LaunchLab"
              width={200}
              height={48}
              className="ml-2 h-14 w-auto"
            />
          </Link>
          <div>
            <div className="mt-4 flex items-center">
              <a href="https://linkedin.com/in/danieldevecchi/" target="_blank" rel="noopener noreferrer" className="rounded-sm p-2 text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-900">
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
            <div className="ml-2 hidden text-sm text-gray-700 lg:inline">
              {t('copyright')}
            </div>
          </div>
        </div>

        {/* Footer Sections */}
        <div className="mt-10 min-w-44 pl-2 lg:mt-0 lg:pl-0">
          <h3 className="mb-4 font-medium text-gray-900 sm:text-sm">Legal</h3>
          <ul className="space-y-4">
            <li className="text-sm"><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors">{t('privacy')}</Link></li>
            <li className="text-sm"><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors">{t('cookie')}</Link></li>
          </ul>
        </div>

        <div className="mt-10 min-w-44 pl-2 lg:mt-0 lg:pl-0">
          <h3 className="mb-4 font-medium text-gray-900 sm:text-sm">Connect</h3>
          <ul className="space-y-4">
            <li className="text-sm">
              <a href="https://linkedin.com/in/danieldevecchi/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-500 transition-colors">
                LinkedIn Daniel
              </a>
            </li>
            <li className="text-sm">
              <a href="https://linkedin.com/in/victor-espinoza-92770217/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-500 transition-colors">
                LinkedIn Victor
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
