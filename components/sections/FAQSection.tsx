'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FAQS } from '@/lib/data'

export default function FAQSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section ref={ref} className="section-padding bg-dark-800">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-electric text-xs uppercase tracking-[0.3em] mb-3 block">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase">
            Common <span className="text-electric">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="border border-white/10 hover:border-electric/30 transition-colors duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-white font-bold text-sm pr-4">{faq.q}</span>
                <span className={`text-electric text-xl flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-white/60 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
