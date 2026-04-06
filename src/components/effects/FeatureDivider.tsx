import { Divider } from "./Divider"

export default function FeatureDivider({ className }: { className?: string }) {
  return (
    <Divider className={className}>
      <div className="relative h-4 w-5">
        {[
          { top: 0, left: 0, delay: 0 },
          { top: 0, left: 16, delay: 0 },
          { top: 4, left: 8, delay: 0.4 },
          { top: 8, left: 0, delay: 0.6 },
          { top: 8, left: 16, delay: 0.6 },
          { top: 12, left: 8, delay: 1.0 },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute size-1 rounded-full bg-gray-300"
            style={{
              top: dot.top,
              left: dot.left,
              animation: `wave 2s infinite ease-in-out`,
              animationDelay: `${dot.delay}s`,
            }}
          />
        ))}
      </div>
    </Divider>
  )
}
