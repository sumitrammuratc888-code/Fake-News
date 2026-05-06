/**
 * About — Information section about Aegis AI.
 */
export default function About() {
  const features = [
    { title: 'Neural NLP Engine', desc: 'Advanced transformer-based natural language processing for deep content analysis.', icon: '🧠' },
    { title: 'Real-Time Scanning', desc: 'Sub-second analysis of articles, social media posts, and multimedia content.', icon: '⚡' },
    { title: 'Cross-Reference DB', desc: 'Verification against 50M+ trusted sources and fact-check databases.', icon: '🔗' },
    { title: 'Deepfake Detection', desc: 'Computer vision models to identify manipulated images and videos.', icon: '👁️' },
    { title: 'Global Coverage', desc: 'Multi-language support covering 142 regions and 45+ languages.', icon: '🌍' },
    { title: 'API Integration', desc: 'RESTful API endpoints for seamless integration into any platform.', icon: '🔌' },
  ]

  return (
    <section id="about" className="py-20">
      <div className="section-container">
        <div className="text-center mb-14">
          <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-3">
            About <span className="neon-text">Aegis AI</span>
          </h2>
          <p className="text-gray-400 font-inter max-w-2xl mx-auto text-sm leading-relaxed">
            Aegis AI is a next-generation truth verification ecosystem powered by advanced
            machine learning, designed to combat misinformation at scale.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="glass p-6 rounded-2xl border border-white/5 hover:border-neon/20 hover:shadow-neon transition-all duration-500 group hover:-translate-y-1">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
              <h3 className="font-orbitron text-sm font-semibold text-white mb-2 tracking-wide">{f.title}</h3>
              <p className="text-gray-500 text-xs font-inter leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
