'use client';

import { useEffect, useRef, useState } from 'react';

type Tier = 'far' | 'mid' | 'near';

interface TierConfig {
  fontSize: string;
  targetOpacity: number;
  filter?: string;
  textShadow?: string;
  typeBase: number;
  typeVariance: number;
  eraseBase: number;
}

const TIER_CONFIG: Record<Tier, TierConfig> = {
  far: {
    fontSize: '9px',
    targetOpacity: 0.07,
    filter: 'blur(0.5px)',
    typeBase: 55,
    typeVariance: 40,
    eraseBase: 28,
  },
  mid: {
    fontSize: '11px',
    targetOpacity: 0.13,
    textShadow: '0 0 6px rgba(255,90,31,0.18)',
    typeBase: 45,
    typeVariance: 35,
    eraseBase: 22,
  },
  near: {
    fontSize: '13px',
    targetOpacity: 0.22,
    textShadow: '0 0 10px rgba(255,90,31,0.28)',
    typeBase: 38,
    typeVariance: 28,
    eraseBase: 18,
  },
};

interface FragmentDef {
  text: string;
  x: number;
  y: number;
  delay: number;
  tier: Tier;
}

const FRAGMENTS: FragmentDef[] = [
  { text: 'const mvp = await buildFast(brief)',  x: 3,  y: 15, delay: 0.0, tier: 'far'  },
  { text: 'type Startup = { speed: "now" }',      x: 58, y: 8,  delay: 1.2, tier: 'mid'  },
  { text: 'ship({ weeks: 6, quality: "prod" })', x: 20, y: 42, delay: 2.5, tier: 'near' },
  { text: 'const idea = useFounder().then(go)',  x: 72, y: 55, delay: 0.8, tier: 'far'  },
  { text: 'if (!action) throw Error("today")',   x: 10, y: 72, delay: 3.1, tier: 'mid'  },
  { text: 'export default function MVP() {',     x: 48, y: 28, delay: 1.8, tier: 'near' },
  { text: 'const [ready] = useState(true)',      x: 78, y: 18, delay: 4.0, tier: 'far'  },
  { text: 'await launchLab.build(brief)',        x: 35, y: 82, delay: 2.2, tier: 'mid'  },
  { text: 'return <Product live={true} />',      x: 62, y: 70, delay: 3.8, tier: 'near' },
  { text: 'git commit -m "v1.0.0 shipped"',      x: 5,  y: 60, delay: 0.5, tier: 'far'  },
  { text: 'yarn deploy --production',            x: 82, y: 40, delay: 2.9, tier: 'mid'  },
  { text: 'weeks: 6, result: "MVP"',             x: 25, y: 90, delay: 1.5, tier: 'mid'  },
];

function TypedFragment({ text, x, y, delay, tier }: FragmentDef) {
  const cfg = TIER_CONFIG[tier];

  const [displayed, setDisplayed] = useState('');
  const [visible, setVisible] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cur = { displayed: '', erasing: false };

    const typeMs = () => cfg.typeBase + Math.random() * cfg.typeVariance;
    const eraseMs = () => cfg.eraseBase + Math.random() * 18;

    function tick() {
      if (!cur.erasing) {
        if (cur.displayed.length < text.length) {
          cur = { ...cur, displayed: text.slice(0, cur.displayed.length + 1) };
          setDisplayed(cur.displayed);
          timerRef.current = setTimeout(tick, typeMs());
        } else {
          timerRef.current = setTimeout(() => {
            cur = { ...cur, erasing: true };
            setIsErasing(true);
            tick();
          }, 3800 + Math.random() * 2500);
        }
      } else {
        if (cur.displayed.length > 0) {
          cur = { ...cur, displayed: cur.displayed.slice(0, -1) };
          setDisplayed(cur.displayed);
          timerRef.current = setTimeout(tick, eraseMs());
        } else {
          setVisible(false);
          timerRef.current = setTimeout(() => {
            setDisplayed('');
            setIsErasing(false);
            cur = { displayed: '', erasing: false };
            timerRef.current = setTimeout(() => {
              setVisible(true);
              timerRef.current = setTimeout(tick, 300);
            }, 2500 + Math.random() * 4500);
          }, 550);
        }
      }
    }

    timerRef.current = setTimeout(() => {
      setVisible(true);
      timerRef.current = setTimeout(tick, 300);
    }, delay * 1000 + 1200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, delay, cfg]);

  return (
    <div
      className="absolute whitespace-nowrap select-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        opacity: visible ? cfg.targetOpacity : 0,
        transition: 'opacity 0.5s ease',
        fontFamily: 'var(--font-mono)',
        fontSize: cfg.fontSize,
        color: '#ff5a1f',
        lineHeight: 1,
        filter: cfg.filter,
        textShadow: cfg.textShadow,
      }}
      aria-hidden="true"
    >
      {displayed}
      {displayed.length > 0 && !isErasing && (
        <span
          style={{
            display: 'inline-block',
            width: '0.5em',
            height: '0.85em',
            background: '#ff5a1f',
            verticalAlign: 'text-bottom',
            marginLeft: '1px',
            animationName: 'cursor-blink',
            animationDuration: '1.2s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }}
        />
      )}
    </div>
  );
}

export default function CodeBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: -1,
        maskImage:
          'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
        maskComposite: 'intersect',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskComposite: 'destination-in',
      }}
      aria-hidden="true"
    >
      {FRAGMENTS.map((f, i) => (
        <TypedFragment key={i} {...f} />
      ))}
    </div>
  );
}
