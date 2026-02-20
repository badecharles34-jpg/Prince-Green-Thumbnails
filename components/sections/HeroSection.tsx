'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg pt-20">
      {/* Background glow */}
      <div className="absolute inset-0 bg-green-glow opacity-40 pointer-events-none" />
      
      {/* Animated orb */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #00FF85 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite',
        }}
      />

      {/* Decorative lines */}
      <div className="absolute top-1/3 left-0 w-32 h-px bg-gradient-to-r from-transparent to-electric/30" />
      <div className="absolute top-1/3 right-0 w-32 h-px bg-gradient-to-l from-transparent to-electric/30" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 border border-electric/30 bg-electric/5 px-4 py-2 mb-8"
        >
          <span className="w-2 h-2 bg-electric rounded-full animate-pulse" />
          <span className="text-electric text-xs uppercase tracking-[0.3em]">Premium Thumbnail Agency</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-6 uppercase"
          style={{ letterSpacing: '-0.02em' }}
        >
          Thumbnails That
          <br />
          <span className="text-electric text-glow">Increase</span>
          <br />
          Your YouTube CTR
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Premium YouTube thumbnail design for creators and agencies who want more clicks.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/contact" className="btn-primary text-sm px-10 py-4">
            Get a Quote
          </Link>
          <Link href="/portfolio" className="btn-secondary text-sm px-10 py-4">
            View Portfolio
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/30"
        >
          {['Finance', 'Tech', 'Motivation', 'Podcast', 'Spirituality'].map((niche) => (
            <div key={niche} className="flex items-center gap-2 text-sm uppercase tracking-widest">
              <span className="w-1 h-1 bg-electric rounded-full" />
              <span>{niche}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-electric to-transparent"
        />
      </motion.div>
    </section>
  )
}
