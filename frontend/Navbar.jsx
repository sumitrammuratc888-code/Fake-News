import { useState, useEffect } from 'react'
import Login from './Login'
import Signup from './Signup'

/**
 * Navbar — Fixed top navigation with glassmorphism effect.
 * Links: Home, About, Dashboard, Statistics, Contact
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in on component mount
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLoginSuccess = (data) => {
    setUser(JSON.parse(localStorage.getItem('user')))
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Statistics', href: '#statistics' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5" id="navbar">
      <div className="section-container flex items-center justify-between h-16">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neon to-blue-600 flex items-center justify-center shadow-neon group-hover:shadow-neon-lg transition-shadow duration-300">
            <svg className="w-5 h-5 text-dark-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-orbitron font-bold text-lg neon-text tracking-wider">
            AEGIS AI
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-400 hover:text-neon transition-colors duration-300 tracking-wide uppercase font-inter"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-gray-400 font-inter">
                Welcome, <span className="text-neon">{user.email}</span>
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-red-400 transition-colors duration-300 tracking-wide uppercase font-inter"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowLogin(true)}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-neon transition-colors duration-300 tracking-wide uppercase font-inter"
              >
                Login
              </button>
              <button
                onClick={() => setShowSignup(true)}
                className="glow-btn px-4 py-2 text-sm font-medium rounded-lg"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-400 hover:text-neon transition-colors"
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-strong border-t border-white/5 animate-fade-in-up">
          <div className="section-container py-4 flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-gray-400 hover:text-neon transition-colors duration-300 py-2 tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
            
            {/* Mobile Authentication */}
            <div className="border-t border-white/10 pt-3 mt-2">
              {user ? (
                <>
                  <div className="text-sm text-gray-400 font-inter mb-2">
                    Welcome, <span className="text-neon">{user.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                    className="w-full text-left text-sm font-medium text-gray-400 hover:text-red-400 transition-colors duration-300 py-2 tracking-wide uppercase"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setShowLogin(true)
                      setIsOpen(false)
                    }}
                    className="w-full text-left text-sm font-medium text-gray-400 hover:text-neon transition-colors duration-300 py-2 tracking-wide uppercase"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setShowSignup(true)
                      setIsOpen(false)
                    }}
                    className="w-full text-left text-sm font-medium text-gray-400 hover:text-neon transition-colors duration-300 py-2 tracking-wide uppercase"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Signup Modal */}
      {showSignup && (
        <Signup
          onClose={() => setShowSignup(false)}
          onSignupSuccess={() => {
            setShowSignup(false)
            setShowLogin(true)
          }}
        />
      )}
    </nav>
  )
}
