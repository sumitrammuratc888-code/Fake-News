import { useEffect, useRef } from 'react'

/**
 * RealTimeFeed — Scrollable panel showing fake real-time feed data
 * with auto-scroll animation and REAL/FAKE status badges.
 */

const feedData = [
  { id: 1, title: 'Breaking: New climate policy announced by EU officials', source: 'Reuters', time: '2m ago', status: 'REAL' },
  { id: 2, title: 'Celebrity secretly owns an island made of gold', source: 'Unknown Blog', time: '5m ago', status: 'FAKE' },
  { id: 3, title: 'Tech giant releases quarterly earnings report', source: 'Bloomberg', time: '8m ago', status: 'REAL' },
  { id: 4, title: 'Miracle cure found in common household spice!', source: 'HealthBuzz.net', time: '12m ago', status: 'FAKE' },
  { id: 5, title: 'NASA confirms successful Mars rover deployment', source: 'AP News', time: '15m ago', status: 'REAL' },
  { id: 6, title: 'Government plans to ban all social media by 2027', source: 'Viral Post', time: '20m ago', status: 'FAKE' },
  { id: 7, title: 'International trade agreement signed between 12 nations', source: 'BBC', time: '25m ago', status: 'REAL' },
  { id: 8, title: 'Alien signal detected from deep space confirmed', source: 'TruthSeeker.io', time: '30m ago', status: 'FAKE' },
  { id: 9, title: 'Global vaccination campaign reaches 5 billion milestone', source: 'WHO', time: '35m ago', status: 'REAL' },
  { id: 10, title: 'Secret underground city discovered beneath Antarctica', source: 'ConspiracyDaily', time: '40m ago', status: 'FAKE' },
]

export default function RealTimeFeed() {
  const scrollRef = useRef(null)

  // Auto-scroll effect
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const interval = setInterval(() => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
        el.scrollTop = 0
      } else {
        el.scrollTop += 1
      }
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="glass neon-border p-6 rounded-2xl h-full" id="realtime-feed">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-3 h-3 rounded-full bg-neon animate-glow-pulse" />
        <h3 className="font-orbitron text-sm font-semibold text-neon tracking-widest uppercase">
          Real-Time Feed
        </h3>
      </div>

      <div ref={scrollRef} className="space-y-3 max-h-80 overflow-y-auto pr-2 scrollbar-thin">
        {feedData.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all duration-300 group"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-200 font-medium truncate group-hover:text-white transition-colors">
                {item.title}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs text-gray-500">{item.source}</span>
                <span className="text-xs text-gray-600">•</span>
                <span className="text-xs text-gray-500">{item.time}</span>
              </div>
            </div>
            <span className={`flex-shrink-0 px-2.5 py-1 rounded-md text-xs font-bold font-orbitron tracking-wider ${
              item.status === 'REAL'
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
