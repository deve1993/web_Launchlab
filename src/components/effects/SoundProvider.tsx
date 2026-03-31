"use client";

import { createContext, useContext, useEffect, ReactNode, useRef } from "react";

interface SoundContextType {
  playHover: () => void;
  playClick: () => void;
  playSwoosh: () => void;
}

const SoundContext = createContext<SoundContextType>({
  playHover: () => {},
  playClick: () => {},
  playSwoosh: () => {},
});

export function useImmersiveSound() {
  return useContext(SoundContext);
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const initAudio = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };
    window.addEventListener("click", initAudio, { once: true });
    window.addEventListener("touchstart", initAudio, { once: true });
    
    return () => {
      window.removeEventListener("click", initAudio);
      window.removeEventListener("touchstart", initAudio);
    }
  }, []);

  const getCtx = () => {
    const ctx = audioCtxRef.current;
    if (ctx && ctx.state === "suspended") ctx.resume();
    return ctx;
  };

  const playHover = () => {
    const ctx = getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Deep cinematic sub-bass hum
    osc.type = "sine";
    osc.frequency.setValueAtTime(65, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.5);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  };

  const playClick = () => {
    const ctx = getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Sharp futuristic glass/tech click
    osc.type = "triangle";
    osc.frequency.setValueAtTime(900, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  };

  const playSwoosh = () => {
    const ctx = getCtx();
    if (!ctx) return;
    
    // Generatore di Rumore Bianco (wind/swoosh)
    const bufferSize = ctx.sampleRate * 1.5; 
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Filtro per simulare il vento (swoosh effect)
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.7);
    filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 1.5);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.7);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 1.5);
  };

  return (
    <SoundContext.Provider value={{ playHover, playClick, playSwoosh }}>
      {children}
    </SoundContext.Provider>
  );
}

// L'audio context viene sbloccato nativamente dai click user globali, nascondiamo il pulsante manuale
export function AudioUnlockerButton() {
  return null;
}
