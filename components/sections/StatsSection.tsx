'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { STATS } from '@/lib/data'

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section ref={ref} className="py-20 px-4 md:px-8 border-y border-white/5 bg-dark-800">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
