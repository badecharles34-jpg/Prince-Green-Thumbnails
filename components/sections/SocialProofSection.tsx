'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TESTIMONIALS } from '@/lib/data'

export default function SocialProofSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="section-padding bg-dark-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-electric text-xs uppercase tracking-[0.3em] mb-3 block">Social Proof</span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase">
            Creators Who <span className="text-electric">Trust Us</span>
          </h2>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="card-dark p-6 relative"
            >
              {/* Quote mark */}
              <div className="text-electric text-6xl font-black leading-none mb-4 opacity-30">"</div>
              
              <p className="text-white/80 text-sm leading-relaxed mb-6">{t.text}</p>
              
              <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                <div className="w-10 h-10 bg-electric text-black font-black text-sm flex items-center justify-center flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{t.name}</div>
                  <div className="text-electric text-xs">{t.handle}</div>
                  <div className="text-white/30 text-xs">{t.subscribers} subscribers</div>
                </div>
              </div>

              {/* Stars */}
              <div className="absolute top-6 right-6 flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-electric text-xs">★</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
