export default function DiagonalSVG({ id = 'diagonal-pattern', className = '' }: { id?: string; className?: string }) {
  return (
    <svg className={`absolute size-full ${className}`}>
      <defs>
        <pattern id={id} patternUnits="userSpaceOnUse" width="64" height="64">
          {Array.from({ length: 17 }, (_, i) => {
            const offset = i * 8
            return (
              <path
                key={i}
                d={`M${-106 + offset} 110L${22 + offset} -18`}
                className="stroke-gray-200/70"
                strokeWidth="1"
              />
            )
          })}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
