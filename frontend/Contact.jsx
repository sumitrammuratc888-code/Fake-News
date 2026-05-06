import { useState } from 'react'

/**
 * Contact — Contact form section (UI only, non-functional).
 */
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-20">
      <div className="section-container max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-3">
            Get In <span className="neon-text">Touch</span>
          </h2>
          <p className="text-gray-400 font-inter text-sm">Have questions? Reach out to the Aegis AI team.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass neon-border p-8 rounded-2xl space-y-5">
          <div>
            <label className="block text-xs font-orbitron text-gray-500 mb-2 tracking-wider uppercase">Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-inter outline-none focus:border-neon/50 transition-colors" placeholder="Your name" required />
          </div>
          <div>
            <label className="block text-xs font-orbitron text-gray-500 mb-2 tracking-wider uppercase">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-inter outline-none focus:border-neon/50 transition-colors" placeholder="your@email.com" required />
          </div>
          <div>
            <label className="block text-xs font-orbitron text-gray-500 mb-2 tracking-wider uppercase">Message</label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-inter outline-none focus:border-neon/50 transition-colors resize-none" placeholder="Your message..." required />
          </div>
          <button type="submit" className="glow-btn w-full rounded-xl text-sm">
            {submitted ? '✓ Message Sent!' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  )
}
