import { useState } from 'react'

/**
 * Signup — User registration component with email/password fields.
 * Connects to FastAPI backend for user account creation.
 */

const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/auth/signup` : 'http://localhost:8000/api/auth/signup'

export default function Signup({ onClose, onSignupSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Signup failed')
      }

      onSignupSuccess(data)
      onClose()
    } catch (err) {
      setError(err.message || 'Failed to connect to the server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="glass-strong neon-border p-8 rounded-2xl max-w-md w-full animate-fade-in-up border border-white/10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border mb-4">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-glow-pulse" />
            <span className="text-xs font-orbitron text-neon-green tracking-widest uppercase">
              Neural Registration
            </span>
          </div>
          <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-2">
            Create <span className="neon-text">Account</span>
          </h2>
          <p className="text-gray-500 font-inter text-sm">
            Join the AI-powered truth verification ecosystem
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide font-inter">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="user@aegis.ai"
                className="w-full bg-dark-primary border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-neon focus:outline-none focus:shadow-neon transition-all font-inter text-sm"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide font-inter">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="•••••••• (min 6 chars)"
                className="w-full bg-dark-primary border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-neon focus:outline-none focus:shadow-neon transition-all font-inter text-sm"
                required
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide font-inter">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-dark-primary border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-neon focus:outline-none focus:shadow-neon transition-all font-inter text-sm"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 animate-fade-in-up">
              <p className="text-red-400 text-xs font-inter flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full glow-btn rounded-xl py-3 flex items-center justify-center gap-2 font-medium text-sm uppercase tracking-wide font-orbitron"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Creating Account...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Create Account
              </>
            )}
          </button>
        </form>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full text-center text-gray-500 hover:text-neon transition-colors text-xs font-inter uppercase tracking-wide"
        >
          Cancel Registration
        </button>
      </div>
    </div>
  )
}
