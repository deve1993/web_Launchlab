export default function VerticalLines() {
  const positions = [
    { className: 'inset-y-0 left-0' },
    { className: 'inset-y-0 right-0' },
    { className: 'inset-y-0 left-1/2 -z-10' },
    { className: 'inset-y-0 left-1/4 -z-10 hidden sm:block' },
    { className: 'inset-y-0 left-3/4 -z-10 hidden sm:block' },
  ]

  return (
    <div className="pointer-events-none inset-0 select-none">
      {positions.map((pos, i) => (
        <div
          key={i}
          className={`absolute -my-20 w-px ${pos.className}`}
          style={{
            maskImage: 'linear-gradient(transparent, white 5rem, white calc(100% - 5rem), transparent)',
          }}
        >
          <svg className="h-full w-full" preserveAspectRatio="none">
            <line
              x1="0" y1="0" x2="0" y2="100%"
              className="stroke-gray-300"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
