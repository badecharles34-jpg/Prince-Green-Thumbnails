'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PRICING_PLANS } from '@/lib/data'
import PaymentModal from '@/components/ui/PaymentModal'

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number } | null>(null)

  return (
    <main className="pt-24 pb-20 min-h-screen bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-electric text-xs uppercase tracking-[0.3em] mb-3 block">
            Pricing
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-black text-white uppercase">
            Choose Your Plan
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-white/50 mt-4 max-w-xl mx-auto">
            All plans include CTR-optimized designs. No contracts. Cancel anytime.
          </motion.p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`relative p-8 flex flex-col ${
                plan.highlighted
                  ? 'bg-electric/5 border-2 border-electric glow-electric-sm'
                  : 'bg-dark-800 border border-white/10 hover:border-electric/30 transition-colors'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-electric text-black text-xs font-black uppercase tracking-widest px-6 py-1">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-electric text-xs uppercase tracking-[0.3em] mb-4">{plan.name}</h3>
                <div className="flex items-end gap-2">
                  <span className="text-6xl font-black text-white">€{plan.price}</span>
                  {plan.period && <span className="text-white/40 text-sm mb-3">{plan.period}</span>}
                </div>
                <p className="text-white/30 text-xs mt-2">
                  {plan.id === 'starter' ? 'Per thumbnail' : plan.id === 'pro' ? 'Per project (3 thumbnails)' : 'Per month, unlimited'}
                </p>
              </div>

              <div className="border-t border-white/10 pt-6 mb-8 flex-1">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-4">What&apos;s included</p>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <span className="text-electric flex-shrink-0 mt-0.5">✓</span>
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelectedPlan({ name: plan.name, price: plan.price })}
                className={`${plan.highlighted ? 'btn-primary' : 'btn-secondary'} text-xs`}
              >
                Get Started with {plan.name}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center border border-white/5 p-8 bg-dark-800"
        >
          <h3 className="text-white font-bold mb-2">Not sure which plan is right for you?</h3>
          <p className="text-white/50 text-sm mb-4">Get a free consultation and we&apos;ll recommend the best option for your channel.</p>
          <a href="/contact" className="btn-secondary text-xs px-8">
            Book Free Consultation
          </a>
        </motion.div>

        {/* Payment note */}
        <div className="mt-8 text-center p-4 border border-electric/10 bg-electric/5">
          <p className="text-white/60 text-sm">
            💳 Payment via <span className="text-electric font-bold">MTN Mobile Money</span> through TapTap Send to Benin.
            <br />
            <span className="text-white/40 text-xs">Recipient: {process.env.NEXT_PUBLIC_MOMO_NUMBER || '0169284952'} (MTN Benin)</span>
          </p>
        </div>
      </div>

      {selectedPlan && (
        <PaymentModal
          isOpen={true}
          onClose={() => setSelectedPlan(null)}
          plan={selectedPlan.name}
          price={selectedPlan.price}
        />
      )}
    </main>
  )
}
