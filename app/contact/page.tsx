'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', project_type: '', budget: '', message: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const update = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSubmitted(true)
        toast.success('Message sent!')
      } else throw new Error()
    } catch {
      toast.error('Something went wrong. Please try WhatsApp instead.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="pt-24 pb-20 min-h-screen bg-dark-900">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-electric text-xs uppercase tracking-[0.3em] mb-3 block">
            Contact
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-black text-white uppercase">
            Let&apos;s Build Your<br /><span className="text-electric">Brand</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-white/50 mt-4">
            Fill out the form below and we&apos;ll get back to you within 24 hours.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card-dark p-6">
              <div className="text-electric text-2xl mb-3">⚡</div>
              <h3 className="text-white font-bold mb-1">Fast Response</h3>
              <p className="text-white/50 text-sm">We respond to all inquiries within 24 hours, often same day.</p>
            </div>
            <div className="card-dark p-6">
              <div className="text-electric text-2xl mb-3">📱</div>
              <h3 className="text-white font-bold mb-1">WhatsApp Direct</h3>
              <p className="text-white/50 text-sm mb-3">Prefer instant messaging? Chat with us directly.</p>
              <a
                href={`https://wa.me/2290169284952?text=${encodeURIComponent('Hello! I\'m interested in your thumbnail design services.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 text-sm font-bold hover:text-green-300 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Message on WhatsApp →
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card-dark p-12 text-center"
              >
                <div className="text-electric text-6xl mb-4">✓</div>
                <h3 className="text-white text-2xl font-black mb-2">Message Received!</h3>
                <p className="text-white/50">We&apos;ll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Name *</label>
                    <input type="text" required value={formData.name} onChange={(e) => update('name', e.target.value)}
                      className="w-full bg-dark-700 border border-white/10 text-white px-4 py-3 text-sm focus:border-electric outline-none transition-colors"
                      placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Email *</label>
                    <input type="email" required value={formData.email} onChange={(e) => update('email', e.target.value)}
                      className="w-full bg-dark-700 border border-white/10 text-white px-4 py-3 text-sm focus:border-electric outline-none transition-colors"
                      placeholder="you@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Project Type</label>
                    <select value={formData.project_type} onChange={(e) => update('project_type', e.target.value)}
                      className="w-full bg-dark-700 border border-white/10 text-white px-4 py-3 text-sm focus:border-electric outline-none transition-colors">
                      <option value="">Select...</option>
                      <option>Single Thumbnail</option>
                      <option>Thumbnail Pack</option>
                      <option>Monthly Retainer</option>
                      <option>Agency Partnership</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Budget</label>
                    <select value={formData.budget} onChange={(e) => update('budget', e.target.value)}
                      className="w-full bg-dark-700 border border-white/10 text-white px-4 py-3 text-sm focus:border-electric outline-none transition-colors">
                      <option value="">Select...</option>
                      <option>€30 (Starter)</option>
                      <option>€75 (Pro)</option>
                      <option>€199/mo (Agency)</option>
                      <option>Custom</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Message *</label>
                  <textarea required rows={6} value={formData.message} onChange={(e) => update('message', e.target.value)}
                    className="w-full bg-dark-700 border border-white/10 text-white px-4 py-3 text-sm focus:border-electric outline-none transition-colors resize-none"
                    placeholder="Tell us about your YouTube channel, niche, style, and what you need..." />
                </div>

                <button type="submit" disabled={loading} className="w-full btn-primary py-4 text-sm disabled:opacity-50">
                  {loading ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
