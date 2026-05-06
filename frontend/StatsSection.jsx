import { useEffect, useState } from 'react'

/**
 * StatsSection — Bottom stats with count-up animation.
 * 10M Items Scanned | 99.1% Confidence | Sub-second Latency
 */

function AnimatedCounter({ end, suffix = '', decimals = 0, duration = 2000 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration])

  return <span>{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}</span>
}

const stats = [
  { label: 'Items Scanned', value: 10, suffix: 'M+', decimals: 0, icon: '📡' },
  { label: 'Confidence', value: 99.1, suffix: '%', decimals: 1, icon: '🎯' },
  { label: 'Avg Latency', value: 0.3, suffix: 's', decimals: 1, icon: '⚡' },
]

export default function StatsSection() {
  return (
    <section id="statistics" className="py-20">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-3">
            System <span className="neon-text">Performance</span>
          </h2>
          <p className="text-gray-500 font-inter text-sm">Real-time metrics from the Aegis neural network</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="glass neon-border p-8 rounded-2xl text-center group hover:shadow-neon transition-all duration-500 hover:-translate-y-1">
              <div className="text-3xl mb-4">{s.icon}</div>
              <div className="font-orbitron text-4xl md:text-5xl font-black neon-text mb-2">
                <AnimatedCounter end={s.value} suffix={s.suffix} decimals={s.decimals} />
              </div>
              <p className="text-gray-400 font-inter text-sm tracking-wide uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
