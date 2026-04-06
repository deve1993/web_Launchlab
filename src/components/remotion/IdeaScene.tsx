import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { AnimationLabels } from "./types";

export default function IdeaScene({ labels }: { labels: AnimationLabels }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const postIts = [
    { label: labels.postit_target, color: "#f97316", x: -140, y: -100 },
    { label: labels.postit_problem, color: "#f59e0b", x: 140, y: -100 },
    { label: labels.postit_solution, color: "#fbbf24", x: -140, y: 100 },
    { label: labels.postit_market, color: "#fb923c", x: 140, y: 100 },
  ];

  const connections = [
    { x1: -70, y1: -60, x2: -20, y2: -20 },
    { x1: 70, y1: -60, x2: 20, y2: -20 },
    { x1: -70, y1: 60, x2: -20, y2: 20 },
    { x1: 70, y1: 60, x2: 20, y2: 20 },
  ];

  const sheetScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const sheetOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const fullText = labels.idea_text;
  const charsVisible = Math.min(Math.floor(interpolate(frame, [25, 70], [0, fullText.length], { extrapolateRight: "clamp" })), fullText.length);
  const displayedText = fullText.slice(0, charsVisible);
  const cursorVisible = frame % 16 < 10 && frame < 80;

  const exitProgress = interpolate(frame, [185, 210], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 1.5]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "white", opacity: exitOpacity }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id="idea-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#f3f4f6" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#idea-grid)" />
      </svg>

      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", transform: `scale(${exitScale})` }}>
          <div style={{
            width: 180, height: 120, backgroundColor: "white",
            border: "2px solid #e5e7eb", borderRadius: 12,
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: `scale(${sheetScale})`, opacity: sheetOpacity,
            position: "relative", zIndex: 10,
          }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 600, color: "#111827", letterSpacing: "-0.02em" }}>
              {displayedText}
              {cursorVisible && <span style={{ color: "#f97316" }}>|</span>}
            </span>
          </div>

          <svg width="400" height="300" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 5, pointerEvents: "none" }}>
            {connections.map((c, i) => {
              const lineProgress = interpolate(frame, [100 + i * 10, 130 + i * 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <line key={i}
                  x1={200 + c.x1} y1={150 + c.y1} x2={200 + c.x2} y2={150 + c.y2}
                  stroke="#f97316" strokeWidth="1.5" strokeDasharray="5 4"
                  opacity={lineProgress * 0.6}
                  strokeDashoffset={interpolate(lineProgress, [0, 1], [40, 0])}
                />
              );
            })}
          </svg>

          {postIts.map((p, i) => {
            const delay = 45 + i * 15;
            const s = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 13, stiffness: 140 } });
            return (
              <div key={i} style={{
                position: "absolute", top: "50%", left: "50%",
                transform: `translate(calc(-50% + ${p.x}px), calc(-50% + ${p.y}px)) scale(${s})`,
                width: 110, height: 70, backgroundColor: "white",
                border: `2px solid ${p.color}`, borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)", zIndex: 15,
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, backgroundColor: p.color, borderRadius: "6px 6px 0 0" }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "#374151", marginTop: 4 }}>
                  {p.label}
                </span>
              </div>
            );
          })}

          {frame > 75 && frame < 175 && (
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: `translate(${interpolate(frame, [75, 105, 135, 165], [60, 130, -60, 0], { extrapolateRight: "clamp" })}px, ${interpolate(frame, [75, 105, 135, 165], [-40, -80, 80, 40], { extrapolateRight: "clamp" })}px)`,
              zIndex: 20, opacity: interpolate(frame, [75, 82], [0, 1], { extrapolateRight: "clamp" }),
            }}>
              <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                <path d="M4 0L4 18L9 13.5L13 21L16 19.5L12 12L18 12L4 0Z" fill="#f97316" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
}
