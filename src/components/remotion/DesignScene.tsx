import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { AnimationLabels } from "./types";

export default function DesignScene({ labels }: { labels: AnimationLabels }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const exitProgress = interpolate(frame, [185, 210], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.75]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  const toolbarY = interpolate(spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 16 } }), [0, 1], [-20, 0]);
  const toolbarOpacity = interpolate(frame, [8, 20], [0, 1], { extrapolateRight: "clamp" });
  const handlesScale = spring({ frame: Math.max(0, frame - 95), fps, config: { damping: 12, stiffness: 200 } });
  const swatchOpacity = interpolate(frame, [115, 130], [0, 1], { extrapolateRight: "clamp" });
  const fontOpacity = interpolate(frame, [135, 148, 170, 180], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "white", opacity: entryOpacity * exitOpacity, transform: `scale(${exitScale})` }}>
      <div style={{
        position: "absolute", top: 10, left: "50%", transform: `translateX(-50%) translateY(${toolbarY}px)`,
        opacity: toolbarOpacity, display: "flex", alignItems: "center", gap: 12,
        padding: "4px 14px", backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)", zIndex: 30,
      }}>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#9ca3af" }}>{labels.frame_label}</span>
        <div style={{ width: 1, height: 14, backgroundColor: "#e5e7eb" }} />
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#6b7280" }}>100%</span>
      </div>

      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 20 }}>
        <div style={{ width: 400, height: 300, backgroundColor: "#fafafa", borderRadius: 10, border: "1px dashed #d1d5db", position: "relative", overflow: "hidden" }}>
          {/* Navbar */}
          <div style={{
            position: "absolute", left: 20, top: 18, right: 20, height: 24, backgroundColor: "white",
            borderRadius: 6, border: "1px solid #e5e7eb", display: "flex", alignItems: "center",
            padding: "0 10px", justifyContent: "space-between",
            opacity: interpolate(frame, [5, 15], [0, 1], { extrapolateRight: "clamp" }),
          }}>
            <div style={{ width: 50, height: 8, backgroundColor: "#111827", borderRadius: 2 }} />
            <div style={{ display: "flex", gap: 10 }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 25, height: 5, backgroundColor: "#d1d5db", borderRadius: 2 }} />)}
            </div>
            <div style={{ width: 40, height: 14, backgroundColor: "#f97316", borderRadius: 4 }} />
          </div>

          {/* Hero */}
          <div style={{
            position: "absolute", left: 20, top: 50, width: 360, height: 95, backgroundColor: "white",
            borderRadius: 8, border: "1px solid #e5e7eb", padding: 16,
            display: "flex", flexDirection: "column", justifyContent: "center",
            opacity: interpolate(frame, [10, 25], [0, 1], { extrapolateRight: "clamp" }),
          }}>
            <div style={{ width: 200, height: 14, backgroundColor: "#111827", borderRadius: 3, opacity: interpolate(frame, [25, 38], [0, 1], { extrapolateRight: "clamp" }) }} />
            <div style={{ width: 140, height: 10, backgroundColor: "#d1d5db", borderRadius: 3, marginTop: 8, opacity: interpolate(frame, [32, 45], [0, 1], { extrapolateRight: "clamp" }) }} />
            <div style={{ width: 90, height: 26, background: "linear-gradient(to bottom, #fb923c, #f97316)", borderRadius: 5, marginTop: 12, borderBottom: "1.5px solid #ea580c", opacity: interpolate(frame, [45, 58], [0, 1], { extrapolateRight: "clamp" }) }} />
          </div>

          {/* Cards */}
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              position: "absolute", left: 20 + i * 122, top: 155, width: 115, height: 65,
              backgroundColor: "white", borderRadius: 8, border: "1px solid #e5e7eb", padding: 10,
              opacity: interpolate(frame, [55 + i * 8, 68 + i * 8], [0, 1], { extrapolateRight: "clamp" }),
            }}>
              <div style={{ width: 18, height: 18, borderRadius: 6, backgroundColor: "#fff7ed", border: "1px solid #fed7aa", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#f97316" }} />
              </div>
              <div style={{ width: "70%", height: 6, backgroundColor: "#e5e7eb", borderRadius: 2, marginTop: 8 }} />
              <div style={{ width: "50%", height: 4, backgroundColor: "#f3f4f6", borderRadius: 2, marginTop: 4 }} />
            </div>
          ))}

          {/* Footer */}
          <div style={{
            position: "absolute", left: 20, bottom: 15, right: 20, height: 20,
            backgroundColor: "#f9fafb", borderRadius: 4, border: "1px solid #f3f4f6",
            opacity: interpolate(frame, [85, 95], [0, 1], { extrapolateRight: "clamp" }),
          }} />

          {/* Selection on Hero */}
          <div style={{
            position: "absolute", left: 18, top: 48, width: 364, height: 99,
            border: "2px solid #f97316", borderRadius: 10, opacity: handlesScale, pointerEvents: "none",
          }}>
            {[{ left: -4, top: -4 }, { right: -4, top: -4 }, { left: -4, bottom: -4 }, { right: -4, bottom: -4 }].map((pos, i) => (
              <div key={i} style={{ position: "absolute", ...pos, width: 7, height: 7, backgroundColor: "#f97316", border: "1.5px solid white", borderRadius: 2, transform: `scale(${handlesScale})` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Color swatch */}
      <div style={{
        position: "absolute", right: 40, top: "50%", transform: "translateY(-50%)",
        opacity: swatchOpacity, display: "flex", alignItems: "center", gap: 8,
        padding: "6px 10px", backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: 6,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}>
        <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: "#f97316" }} />
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#6b7280" }}>#f97316</span>
      </div>

      {/* Font label */}
      <div style={{
        position: "absolute", left: 165, bottom: 60, opacity: fontOpacity,
        padding: "4px 10px", backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: 6,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#6b7280" }}>{labels.font_label}</span>
      </div>
    </AbsoluteFill>
  );
}
