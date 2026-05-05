import Navbar from './components/Navbar'
import Hero from './components/Hero'
import RealTimeFeed from './components/RealTimeFeed'
import PropagationMap from './components/PropagationMap'
import AIDecisionReasoning from './components/AIDecisionReasoning'
import StatsSection from './components/StatsSection'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

/**
 * App — Root component composing all sections into a single-page dashboard.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-dark-primary relative">
      {/* Scan-line overlay */}
      <div className="fixed inset-0 pointer-events-none scanline opacity-30 z-50" />

      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Dashboard Panels */}
      <section id="dashboard" className="py-16">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-3">
              Live <span className="neon-text">Dashboard</span>
            </h2>
            <p className="text-gray-500 font-inter text-sm">
              Real-time intelligence monitoring and analysis
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RealTimeFeed />
            <PropagationMap />
            <AIDecisionReasoning />
          </div>
        </div>
      </section>

      {/* Statistics */}
      <StatsSection />

      {/* About */}
      <About />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  )
}
