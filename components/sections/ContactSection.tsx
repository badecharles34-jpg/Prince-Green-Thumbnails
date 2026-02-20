'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import toast from 'react-hot-toast'

export default function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [formData, setFormData] = useState({
    name: '', email: '', project_type: '', budget: '', message: ''
  })
  const [loading, setLoading] = useState(false)

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
        toast.success('Message sent! We\'ll get back to you within 24 hours.')
        setFormData({ name: '', email: '', project_type: '', budget: '', message: '' })
      } else {
        throw new Error()
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" ref={ref} className="section-padding bg-dark-900">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-electric text-xs uppercase tracking-[0.3em] mb-3 block">Contact</span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase">
            Start Your <span className="text-electric">Project</span>
          </h2>
          <p className="text-white/50 mt-4">Get a custom quote within 24 hours.</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Name *</label>
              <input
                type="text" required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-dark-700 border border-white/10 text-white px-4 py-3 text-sm focus:border-electric outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Email *</label>
              <input
                type="email" required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-dark-700 border border-white/10 text-white px-4 py-3 text-sm focus:border-electric outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Project Type</label>
              <select
                value={formData.project_type}
                onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                className="w-full bg-dark-700 border border-white/10 text-white px-4 py-3 text-sm focus:border-electric outline-none transition-colors"
              >
                <option value="">Select type</option>
                <option>Single Thumbnail</option>
                <option>Thumbnail Pack</option>
                <option>Monthly Retainer</option>
                <option>Agency Partnership</option>
              </select>
            </div>
            <div>
              <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Budget</label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full bg-dark-700 border border-white/10 text-white px-4 py-3 text-sm focus:border-electric outline-none transition-colors"
              >
                <option value="">Select budget</option>
                <option>€30 (Starter)</option>
                <option>€75 (Pro)</option>
                <option>€199/mo (Agency)</option>
                <option>Custom</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Message *</label>
            <textarea
              required rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-dark-700 border border-white/10 text-white px-4 py-3 text-sm focus:border-electric outline-none transition-colors resize-none"
              placeholder="Tell us about your channel, niche, and what you're looking for..."
            />
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary py-4 text-sm disabled:opacity-50">
            {loading ? 'Sending...' : 'Send Message →'}
          </button>
        </motion.form>
      </div>
    </section>
  )
}
