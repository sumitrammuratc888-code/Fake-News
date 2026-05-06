/**
 * PropagationMap — Placeholder globe visualization with animated
 * pulsing dots representing global information propagation.
 */
export default function PropagationMap() {
  // Generate random dots on the "globe"
  const dots = [
    { top: '20%', left: '30%', delay: '0s', size: 'w-2 h-2' },
    { top: '35%', left: '55%', delay: '0.5s', size: 'w-3 h-3' },
    { top: '50%', left: '25%', delay: '1s', size: 'w-2 h-2' },
    { top: '60%', left: '70%', delay: '1.5s', size: 'w-2.5 h-2.5' },
    { top: '25%', left: '65%', delay: '2s', size: 'w-2 h-2' },
    { top: '45%', left: '45%', delay: '0.8s', size: 'w-3 h-3' },
    { top: '70%', left: '40%', delay: '1.2s', size: 'w-2 h-2' },
    { top: '30%', left: '80%', delay: '2.5s', size: 'w-2 h-2' },
    { top: '55%', left: '60%', delay: '0.3s', size: 'w-2.5 h-2.5' },
    { top: '75%', left: '55%', delay: '1.8s', size: 'w-2 h-2' },
  ]

  return (
    <div className="glass neon-border p-6 rounded-2xl h-full" id="propagation-map">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-3 h-3 rounded-full bg-neon-purple animate-glow-pulse" />
        <h3 className="font-orbitron text-sm font-semibold text-neon tracking-widest uppercase">
          Propagation Map
        </h3>
      </div>

      {/* Globe Container */}
      <div className="relative flex items-center justify-center h-64 md:h-72">
        {/* Globe circles */}
        <div className="relative w-56 h-56 md:w-64 md:h-64">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border border-neon/10 animate-spin-slow" />
          {/* Middle ring */}
          <div className="absolute inset-4 rounded-full border border-neon/15" style={{ animation: 'spin 15s linear infinite reverse' }} />
          {/* Inner ring */}
          <div className="absolute inset-8 rounded-full border border-neon/20 animate-spin-slow" />

          {/* Horizontal equator */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/20 to-transparent" />
          {/* Vertical meridian */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon/20 to-transparent" />

          {/* Elliptical orbits */}
          <div className="absolute inset-2 rounded-full border border-neon/5" style={{ transform: 'rotateX(60deg)' }} />
          <div className="absolute inset-6 rounded-full border border-neon/8" style={{ transform: 'rotateY(60deg)' }} />

          {/* Pulsing dots */}
          {dots.map((dot, i) => (
            <div
              key={i}
              className={`absolute ${dot.size} rounded-full bg-neon animate-glow-pulse`}
              style={{
                top: dot.top,
                left: dot.left,
                animationDelay: dot.delay,
                boxShadow: '0 0 8px rgba(0, 243, 255, 0.6)',
              }}
            />
          ))}

          {/* Center glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-neon/5 blur-2xl" />
          </div>
        </div>
      </div>

      {/* Stats footer */}
      <div className="flex justify-between mt-3 text-xs text-gray-500 font-inter">
        <span>142 Regions Active</span>
        <span className="text-neon">● Live</span>
      </div>
    </div>
  )
}
