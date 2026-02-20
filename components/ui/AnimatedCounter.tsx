'use client'

import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  label: string
}

export default function AnimatedCounter({ value, suffix = '', label }: AnimatedCounterProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-black text-electric mb-2">
        {inView ? (
          <CountUp
            end={value}
            duration={2.5}
            suffix={suffix}
            separator=","
          />
        ) : (
          <span>0{suffix}</span>
        )}
      </div>
      <div className="text-white/50 text-sm uppercase tracking-widest">{label}</div>
    </div>
  )
}
