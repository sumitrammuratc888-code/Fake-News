import { useState } from 'react'
import ResultDisplay from './ResultDisplay'
import { analyzeNews } from '../analyzer'

export default function Hero() {
  const [inputText, setInputText] = useState('')
  const [result, setResult] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = () => {
    if (!inputText.trim()) {
      setError('Please enter some text to analyze.')
      return
    }

    setLoading(true)
    setError('')
    setShowResult(false)

    // Simulate network delay for effect
    setTimeout(() => {
      try {
        const data = analyzeNews(inputText)
        setResult(data)
        setShowResult(true)
      } catch (err) {
        setError(err.message || 'Failed to analyze text.')
      } finally {
        setLoading(false)
      }
    }, 1200)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) handleAnalyze()
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 bg-grid">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-purple/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="section-container text-center relative z-10 w-full px-4">
        {/* Subtitle */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border mb-6 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-neon animate-glow-pulse" />
          <span className="text-xs font-orbitron text-neon tracking-widest uppercase">
            Neural Network Active
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-orbitron text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <span className="text-gradient">AI-POWERED</span>
          <br />
          <span className="text-white">FAKE NEWS</span>
          <br />
          <span className="text-gradient">DETECTION</span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-lg md:text-xl font-inter max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          Paste any news article below — our AI analyzes it for credibility in seconds.
        </p>

        {/* Input Section */}
        <div className="max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
          <div className="glass neon-border p-4 rounded-2xl flex flex-col gap-3">
            <textarea
              id="analysis-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste the news article or headline here for analysis... (Ctrl+Enter to submit)"
              className="w-full bg-black/20 border border-white/10 rounded-xl outline-none p-4 text-white placeholder-gray-500 font-inter text-sm resize-y min-h-[120px] focus:border-neon/50 transition-colors"
            />
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-xs text-gray-500 font-inter">
                {inputText.length} characters
              </span>
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="glow-btn rounded-xl text-sm flex items-center justify-center gap-2 min-w-[180px] w-full sm:w-auto"
                id="deep-analysis-btn"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    ANALYZING...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    ANALYZE
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="mt-4 text-red-400 text-sm font-inter animate-fade-in-up" id="error-message">
              ⚠ {error}
            </p>
          )}
        </div>

        {/* Result Display */}
        <ResultDisplay result={result} isVisible={showResult} />
      </div>
    </section>
  )
}
