import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { AnimationLabels } from "./types";

const blocks = [
  { label: "Nav", x: 60, y: 30, w: 360, h: 28, delay: 0 },
  { label: "Hero", x: 60, y: 68, w: 360, h: 100, delay: 10 },
  { label: "Card", x: 60, y: 178, w: 110, h: 70, delay: 22 },
  { label: "Card", x: 180, y: 178, w: 110, h: 70, delay: 28 },
  { label: "Card", x: 300, y: 178, w: 120, h: 70, delay: 34 },
  { label: "CTA", x: 160, y: 260, w: 160, h: 36, delay: 44 },
  { label: "Footer", x: 60, y: 310, w: 360, h: 24, delay: 52 },
];

export default function WireframeScene({ labels }: { labels: AnimationLabels }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const layers = ["Navbar", "HeroSection", "CardGrid", "CallToAction", "Footer"];

  const entryOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const exitProgress = interpolate(frame, [180, 210], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitOpacity = interpolate(exitProgress, [0.8, 1], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const sidebarX = interpolate(
    spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 15, stiffness: 100 } }),
    [0, 1], [-60, 0]
  );
  const sidebarOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: "clamp" });
  const artboardOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "white", opacity: entryOpacity * exitOpacity }}>
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 120,
        borderRight: "1px solid #e5e7eb", backgroundColor: "#fafafa",
        transform: `translateX(${sidebarX}px)`, opacity: sidebarOpacity,
        padding: "16px 10px", display: "flex", flexDirection: "column", gap: 6,
      }}>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 9, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
          {labels.layers_title}
        </div>
        {layers.map((l, i) => {
          const layerDelay = 35 + i * 7;
          const layerOpacity = interpolate(frame, [layerDelay, layerDelay + 12], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div key={i} style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#6b7280", opacity: layerOpacity,
              padding: "3px 6px", borderRadius: 4,
              backgroundColor: i === 1 ? "rgba(249,115,22,0.08)" : "transparent",
              border: i === 1 ? "1px solid rgba(249,115,22,0.2)" : "1px solid transparent",
            }}>{l}</div>
          );
        })}
      </div>

      <div style={{ position: "absolute", left: 120, top: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="480" height="370" style={{ position: "absolute", opacity: artboardOpacity }}>
          <rect x="49" y="18" width="382" height="334" rx="8" fill="none" stroke="#d1d5db" strokeWidth="1" strokeDasharray="6 4" />
        </svg>

        {blocks.map((b, i) => {
          const s = spring({ frame: Math.max(0, frame - b.delay), fps, config: { damping: 14, stiffness: 130 } });
          const fillProgress = interpolate(exitProgress, [i * 0.1, i * 0.1 + 0.4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const bgColor = fillProgress > 0.5 ? (b.label === "CTA" ? "#f97316" : b.label === "Hero" ? "#fed7aa" : "#fff7ed") : "#f9fafb";
          const borderColor = fillProgress > 0.5 ? "#f97316" : "#d1d5db";

          return (
            <div key={i} style={{
              position: "absolute", left: b.x, top: b.y, width: b.w, height: b.h,
              backgroundColor: bgColor, border: `1.5px solid ${borderColor}`, borderRadius: 6,
              transform: `scale(${s})`, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 500, color: fillProgress > 0.5 ? (b.label === "CTA" ? "white" : "#92400e") : "#9ca3af" }}>
                {b.label}
              </span>
            </div>
          );
        })}

        {frame > 65 && frame < 170 && (
          <svg width="480" height="370" style={{ position: "absolute", pointerEvents: "none" }}>
            <line x1="60" y1="172" x2="420" y2="172" stroke="#f97316" strokeWidth="0.5" opacity={0.4} strokeDasharray="3 3" />
            <line x1="60" y1="254" x2="420" y2="254" stroke="#f97316" strokeWidth="0.5" opacity={0.4} strokeDasharray="3 3" />
          </svg>
        )}
      </div>
    </AbsoluteFill>
  );
}
