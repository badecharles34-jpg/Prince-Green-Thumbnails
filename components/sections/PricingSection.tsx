'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PRICING_PLANS } from '@/lib/data'
import PaymentModal from '@/components/ui/PaymentModal'

export default function PricingSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number } | null>(null)

  return (
    <section id="pricing" ref={ref} className="section-padding bg-dark-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-electric text-xs uppercase tracking-[0.3em] mb-3 block">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase">
            Simple, <span className="text-electric">Transparent</span> Pricing
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            No hidden fees. One-time payment per thumbnail or monthly retainer for agencies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className={`relative p-8 flex flex-col ${
                plan.highlighted
                  ? 'bg-electric/5 border-2 border-electric glow-electric-sm'
                  : 'card-dark'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-electric text-black text-xs font-black uppercase tracking-widest px-4 py-1">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-white/60 text-xs uppercase tracking-[0.3em] mb-2">{plan.name}</h3>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-black text-white">€{plan.price}</span>
                  {plan.period && <span className="text-white/40 text-sm mb-2">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <span className="text-electric mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPlan({ name: plan.name, price: plan.price })}
                className={plan.highlighted ? 'btn-primary text-xs' : 'btn-secondary text-xs'}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* MTN MoMo note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-white/30 text-xs flex items-center justify-center gap-2">
            <span>💳</span>
            Payment via MTN Mobile Money (TapTap Send) — Instant setup after payment verification
          </p>
        </motion.div>
      </div>

      {selectedPlan && (
        <PaymentModal
          isOpen={true}
          onClose={() => setSelectedPlan(null)}
          plan={selectedPlan.name}
          price={selectedPlan.price}
        />
      )}
    </section>
  )
}
