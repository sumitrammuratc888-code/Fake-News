export default function ResultDisplay({ result, isVisible }) {
  if (!isVisible || !result) return null

  const isReal = result.verdict === 'Real'
  const isFake = result.verdict === 'Fake'
  
  const textColor = isReal ? 'text-green-400' : isFake ? 'text-red-400' : 'text-yellow-400'
  const glowClass = isReal ? 'shadow-neon-green' : isFake ? 'shadow-neon-red' : 'shadow-[0_0_20px_rgba(255,179,0,0.15)]'
  const borderColor = isReal ? 'border-green-500/30' : isFake ? 'border-red-500/30' : 'border-yellow-500/30'
  const strokeColor = isReal ? '#00ff88' : isFake ? '#ff003c' : '#ffb300'
  const bgColor = isReal ? 'bg-green-400' : isFake ? 'bg-red-400' : 'bg-yellow-400'

  const confValue = parseInt(result.confidence) || 0
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (confValue / 100) * circumference

  return (
    <div className="mt-8 animate-fade-in-up text-left" id="result-display">
      <div className={`glass ${glowClass} ${borderColor} border p-8 rounded-2xl max-w-2xl mx-auto transition-all duration-500`}>

        {/* Status Badge */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className={`w-4 h-4 rounded-full ${bgColor} animate-glow-pulse`} />
          <h3 className={`font-orbitron text-3xl font-bold ${textColor} tracking-widest uppercase`}>
            {result.verdict}
          </h3>
          <div className={`w-4 h-4 rounded-full ${bgColor} animate-glow-pulse`} />
        </div>

        {/* Confidence Ring */}
        <div className="flex justify-center mb-2">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
              <circle
                cx="60" cy="60" r="54"
                stroke={strokeColor}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`font-orbitron text-2xl font-bold ${textColor}`}>
                {result.confidence}
              </span>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-400 text-sm font-inter mb-8">AI Confidence Score</p>

        {/* Detailed Results */}
        <div className="space-y-6">
          <div>
            <h4 className="font-orbitron text-xs tracking-widest text-gray-500 uppercase mb-2 flex items-center gap-2">
              <span>📋</span> Analysis Reason
            </h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-gray-300 text-sm leading-relaxed font-inter">
              {result.reason}
            </div>
          </div>

          {result.red_flags && result.red_flags.length > 0 && (
            <div>
              <h4 className="font-orbitron text-xs tracking-widest text-gray-500 uppercase mb-2 flex items-center gap-2">
                <span>🚩</span> Red Flags Detected
              </h4>
              <ul className="space-y-2">
                {result.red_flags.map((flag, i) => (
                  <li key={i} className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-yellow-500 text-sm font-inter">
                    <span className="shrink-0 mt-0.5">⚠</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="font-orbitron text-xs tracking-widest text-gray-500 uppercase mb-2 flex items-center gap-2">
              <span>💡</span> Suggestion
            </h4>
            <div className="bg-neon/10 border border-neon/20 rounded-xl p-4 text-neon text-sm leading-relaxed font-inter">
              {result.suggestion}
            </div>
          </div>
        </div>

        {/* JSON View Toggle (Handled cleanly via details/summary) */}
        <div className="mt-8 text-center">
          <details className="group">
            <summary className="inline-block cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 hover:border-neon/30 text-gray-400 hover:text-neon px-4 py-2 rounded-lg text-xs font-inter transition-colors">
              {`{ }`} View Raw JSON
            </summary>
            <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/5 text-left overflow-x-auto">
              <pre className="text-xs text-green-400 font-mono">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </details>
        </div>

      </div>
    </div>
  )
}
