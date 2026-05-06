/**
 * Footer — Minimal footer with copyright and social links.
 */
export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-orbitron text-sm font-bold neon-text">AEGIS AI</span>
          <span className="text-gray-600 text-xs font-inter">© 2026 All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          {['GitHub', 'Twitter', 'LinkedIn'].map((s) => (
            <a key={s} href="#" className="text-xs text-gray-500 hover:text-neon transition-colors font-inter uppercase tracking-wider">
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
