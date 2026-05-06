/**
 * AIDecisionReasoning — AI analysis badges and confidence bars.
 */
const methods = [
  { label: 'NLP Analysis', confidence: 94, color: 'from-cyan-400 to-blue-500' },
  { label: 'Source Cross-Ref', confidence: 87, color: 'from-purple-400 to-pink-500' },
  { label: 'Sentiment Analysis', confidence: 91, color: 'from-green-400 to-emerald-500' },
  { label: 'Pattern Detection', confidence: 96, color: 'from-orange-400 to-red-500' },
]

const badges = [
  { text: 'NLP Analysis', icon: '🧠' },
  { text: 'Source Cross-Ref', icon: '🔗' },
  { text: 'Sentiment Analysis', icon: '💭' },
  { text: 'Pattern Detection', icon: '🔍' },
  { text: 'Deepfake Scanner', icon: '👁️' },
  { text: 'Fact Database', icon: '📊' },
]

export default function AIDecisionReasoning() {
  return (
    <div className="glass neon-border p-6 rounded-2xl h-full" id="ai-reasoning">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-3 h-3 rounded-full bg-neon-green animate-glow-pulse" />
        <h3 className="font-orbitron text-sm font-semibold text-neon tracking-widest uppercase">
          AI Decision Reasoning
        </h3>
      </div>
      <p className="text-sm text-gray-400 font-inter mb-5 leading-relaxed">
        Multi-layered neural analysis combining NLP, cross-referential source
        verification, and advanced pattern recognition for information veracity.
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {badges.map((b) => (
          <span key={b.text} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/10 text-gray-300 hover:border-neon/30 hover:text-neon transition-all duration-300 cursor-default">
            <span>{b.icon}</span>{b.text}
          </span>
        ))}
      </div>
      <div className="space-y-3">
        <h4 className="text-xs font-orbitron text-gray-500 tracking-widest uppercase mb-2">Confidence Breakdown</h4>
        {methods.map((m) => (
          <div key={m.label}>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-gray-400 font-inter">{m.label}</span>
              <span className="text-xs text-gray-400 font-orbitron">{m.confidence}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className={`h-full rounded-full bg-gradient-to-r ${m.color}`} style={{ width: `${m.confidence}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
