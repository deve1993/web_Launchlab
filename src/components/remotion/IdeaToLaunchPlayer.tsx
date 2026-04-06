"use client";

import { Player } from "@remotion/player";
import IdeaToLaunch from "./IdeaToLaunch";
import type { AnimationLabels } from "./types";

export default function IdeaToLaunchPlayer({ labels }: { labels: AnimationLabels }) {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden ring-1 ring-black/5 shadow-2xl shadow-black/10 transition-all hover:ring-orange-500/30">
      <Player
        component={IdeaToLaunch}
        inputProps={{ labels }}
        compositionWidth={720}
        compositionHeight={450}
        durationInFrames={900}
        fps={30}
        loop
        autoPlay
        controls={false}
        style={{
          width: "100%",
          aspectRatio: "720 / 450",
        }}
      />
    </div>
  );
}
