import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import IdeaScene from "./IdeaScene";
import WireframeScene from "./WireframeScene";
import DesignScene from "./DesignScene";
import LiveScene from "./LiveScene";
import type { AnimationLabels } from "./types";

// 900 frames at 30fps = 30 seconds per loop
// Act 1: 0-210 (7s)    — Idea
// Act 2: 210-420 (7s)  — Wireframe
// Act 3: 420-630 (7s)  — Design
// Act 4: 630-900 (9s)  — Live

const TOTAL = 900;

export default function IdeaToLaunch({ labels }: { labels: AnimationLabels }) {
  const frame = useCurrentFrame();

  const stepLabels = [
    { from: 0, label: labels.step1_label, color: "#f97316" },
    { from: 210, label: labels.step2_label, color: "#f97316" },
    { from: 420, label: labels.step3_label, color: "#f97316" },
    { from: 630, label: labels.step4_label, color: "#059669" },
  ];

  const activeStep = stepLabels.reduce((acc, s) => (frame >= s.from ? s : acc), stepLabels[0]);
  const overallProgress = (frame / TOTAL) * 100;

  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      <Sequence from={0} durationInFrames={210}>
        <IdeaScene labels={labels} />
      </Sequence>
      <Sequence from={210} durationInFrames={210}>
        <WireframeScene labels={labels} />
      </Sequence>
      <Sequence from={420} durationInFrames={210}>
        <DesignScene labels={labels} />
      </Sequence>
      <Sequence from={630} durationInFrames={270}>
        <LiveScene labels={labels} />
      </Sequence>

      {/* Top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 36,
        borderBottom: "1px solid #e5e7eb",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px",
        backgroundColor: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
        zIndex: 50,
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ff5f56" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#27c93f" }} />
        </div>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>
          {labels.top_bar}
        </span>
        <div style={{ width: 48 }} />
      </div>

      {/* Bottom status bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 32,
        borderTop: "1px solid #e5e7eb",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px",
        backgroundColor: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
        zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: activeStep.color }} />
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#6b7280", fontWeight: 600 }}>
            {activeStep.label}
          </span>
        </div>

        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {stepLabels.map((s, i) => {
            const isActive = frame >= s.from;
            const isCurrent = i === stepLabels.findIndex((_, idx) =>
              idx === stepLabels.length - 1 || frame < stepLabels[idx + 1].from
            );
            return (
              <div key={i} style={{
                width: isCurrent ? 16 : 6, height: 6, borderRadius: 3,
                backgroundColor: isActive ? "#f97316" : "#e5e7eb",
              }} />
            );
          })}
        </div>

        <div style={{ width: 60, height: 4, backgroundColor: "#f3f4f6", borderRadius: 2, overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 2, backgroundColor: "#f97316",
            width: `${interpolate(overallProgress, [0, 100], [0, 100])}%`,
          }} />
        </div>
      </div>
    </AbsoluteFill>
  );
}
