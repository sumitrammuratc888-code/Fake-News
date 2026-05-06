/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: '#00f3ff',
        'neon-purple': '#b400ff',
        'neon-green': '#00ff88',
        'neon-red': '#ff003c',
        'dark-primary': '#0a0a1a',
        'dark-secondary': '#0d1117',
        'dark-card': '#111827',
        'dark-surface': '#161b26',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 15px rgba(0, 243, 255, 0.5), 0 0 45px rgba(0, 243, 255, 0.15)',
        'neon-lg': '0 0 30px rgba(0, 243, 255, 0.6), 0 0 60px rgba(0, 243, 255, 0.2)',
        'neon-red': '0 0 15px rgba(255, 0, 60, 0.5), 0 0 45px rgba(255, 0, 60, 0.15)',
        'neon-green': '0 0 15px rgba(0, 255, 136, 0.5), 0 0 45px rgba(0, 255, 136, 0.15)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.36)',
      },
      animation: {
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(0, 243, 255, 0.5), 0 0 45px rgba(0, 243, 255, 0.15)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 243, 255, 0.8), 0 0 60px rgba(0, 243, 255, 0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
