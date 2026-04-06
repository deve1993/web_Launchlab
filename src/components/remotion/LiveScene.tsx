import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { AnimationLabels } from "./types";

export default function LiveScene({ labels }: { labels: AnimationLabels }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const entryOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  const progressWidth = interpolate(frame, [35, 130], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const isDeployed = frame > 130;

  const deployText = frame < 40 ? labels.status_preparing :
    frame < 80 ? labels.status_building :
    frame < 120 ? labels.status_deploying :
    labels.status_deployed;

  const badgeScale = spring({ frame: Math.max(0, frame - 135), fps, config: { damping: 10, stiffness: 180 } });

  const pingOpacity1 = frame > 145 ? interpolate((frame - 145) % 40, [0, 30], [0.5, 0], { extrapolateRight: "clamp" }) : 0;
  const pingScale1 = frame > 145 ? interpolate((frame - 145) % 40, [0, 30], [1, 3], { extrapolateRight: "clamp" }) : 1;
  const pingOpacity2 = frame > 160 ? interpolate((frame - 160) % 40, [0, 30], [0.4, 0], { extrapolateRight: "clamp" }) : 0;
  const pingScale2 = frame > 160 ? interpolate((frame - 160) % 40, [0, 30], [1, 3], { extrapolateRight: "clamp" }) : 1;

  const exitOpacity = interpolate(frame, [230, 270], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#fafafa", opacity: entryOpacity * exitOpacity }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: 460, height: 310, backgroundColor: "white", borderRadius: 12,
          border: "1px solid #e5e7eb",
          boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)",
          overflow: "hidden", transform: `scale(${entryScale})`,
        }}>
          {/* Browser toolbar */}
          <div style={{ height: 36, borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", padding: "0 12px", gap: 8, backgroundColor: "#fafafa" }}>
            <div style={{ display: "flex", gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ff5f56" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#27c93f" }} />
            </div>
            <div style={{
              flex: 1, height: 22, backgroundColor: "white", border: "1px solid #e5e7eb",
              borderRadius: 6, display: "flex", alignItems: "center", padding: "0 10px", gap: 6,
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#27c93f" strokeWidth="2" />
                <path d="M2 12H22M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="#27c93f" strokeWidth="2" />
              </svg>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#374151" }}>
                {labels.url_text}
              </span>
            </div>
          </div>

          {/* Mini site */}
          <div style={{ position: "relative", height: "calc(100% - 36px)", backgroundColor: "#fafafa", overflow: "hidden" }}>
            <div style={{ height: 20, backgroundColor: "white", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", padding: "0 16px", justifyContent: "space-between" }}>
              <div style={{ width: 40, height: 6, backgroundColor: "#111827", borderRadius: 2 }} />
              <div style={{ width: 30, height: 12, backgroundColor: "#f97316", borderRadius: 3 }} />
            </div>
            <div style={{ padding: "20px 30px", textAlign: "center" }}>
              <div style={{ width: 160, height: 10, backgroundColor: "#111827", borderRadius: 2, margin: "0 auto" }} />
              <div style={{ width: 120, height: 7, backgroundColor: "#d1d5db", borderRadius: 2, margin: "6px auto 0" }} />
              <div style={{ width: 60, height: 16, background: "linear-gradient(to bottom, #fb923c, #f97316)", borderRadius: 4, margin: "10px auto 0" }} />
            </div>
            <div style={{ display: "flex", gap: 8, padding: "0 20px", justifyContent: "center" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: 80, height: 50, backgroundColor: "white", borderRadius: 6, border: "1px solid #e5e7eb", padding: 8 }}>
                  <div style={{ width: 14, height: 14, borderRadius: 4, backgroundColor: "#fff7ed", border: "1px solid #fed7aa" }} />
                  <div style={{ width: "70%", height: 4, backgroundColor: "#e5e7eb", borderRadius: 1, marginTop: 6 }} />
                </div>
              ))}
            </div>

            {frame > 25 && (
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 20px",
                backgroundColor: "rgba(255,255,255,0.95)", borderTop: "1px solid #e5e7eb",
              }}>
                <div style={{ height: 6, backgroundColor: "#f3f4f6", borderRadius: 3, overflow: "hidden", marginBottom: 6 }}>
                  <div style={{
                    height: "100%", borderRadius: 3, width: `${progressWidth}%`,
                    background: isDeployed ? "linear-gradient(to right, #f97316, #34d399)" : "linear-gradient(to right, #f97316, #fb923c)",
                  }} />
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: isDeployed ? "#059669" : "#6b7280", fontWeight: 600 }}>
                  {deployText}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* LIVE badge */}
        {frame > 135 && (
          <div style={{
            position: "absolute", top: "15%", left: "50%",
            transform: `translate(-50%, -50%) scale(${badgeScale})`,
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 20px", backgroundColor: "white", border: "2px solid #f97316", borderRadius: 50,
            boxShadow: "0 8px 30px rgba(249,115,22,0.2), 0 2px 8px rgba(0,0,0,0.06)", zIndex: 20,
          }}>
            <div style={{ position: "relative", width: 10, height: 10 }}>
              <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "1.5px solid #f97316", opacity: pingOpacity1, transform: `scale(${pingScale1})` }} />
              <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "1px solid #f97316", opacity: pingOpacity2, transform: `scale(${pingScale2})` }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#f97316" }} />
            </div>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, color: "#f97316", letterSpacing: "0.05em" }}>
              {labels.live_badge}
            </span>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
}
