"use client";

import { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

export function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.045, duration: 2.0, smoothWheel: true }}>
      <>{children}</>
    </ReactLenis>
  );
}
