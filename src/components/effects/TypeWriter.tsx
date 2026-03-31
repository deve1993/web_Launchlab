'use client';

import { useEffect, useState } from 'react';

interface TypeWriterProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
}

export default function TypeWriter({
  words,
  className = '',
  typingSpeed = 75,
  deletingSpeed = 40,
  pauseMs = 2200,
}: TypeWriterProps) {
  const [displayed, setDisplayed] = useState(words[0] ?? '');
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('pausing');

  useEffect(() => {
    const word = words[wordIdx];

    if (phase === 'typing') {
      if (displayed.length < word.length) {
        const t = setTimeout(
          () => setDisplayed(word.slice(0, displayed.length + 1)),
          typingSpeed
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('pausing'), pauseMs);
        return () => clearTimeout(t);
      }
    }

    if (phase === 'pausing') {
      const t = setTimeout(() => setPhase('deleting'), 400);
      return () => clearTimeout(t);
    }

    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          deletingSpeed
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setWordIdx((i) => (i + 1) % words.length);
          setPhase('typing');
        }, 0);
        return () => clearTimeout(t);
      }
    }
  }, [displayed, phase, wordIdx, words, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span className={className}>
      {displayed}
      <span
        className="inline-block w-[3px] ml-0.5 align-middle"
        style={{
          height: '0.9em',
          background: 'currentColor',
          animationName: 'cursor-blink',
          animationDuration: '1s',
          animationTimingFunction: 'step-end',
          animationIterationCount: 'infinite',
        }}
      />
    </span>
  );
}
