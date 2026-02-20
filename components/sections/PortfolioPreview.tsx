'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { MOCK_THUMBNAILS } from '@/lib/data'

export default function PortfolioPreview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const preview = MOCK_THUMBNAILS.slice(0, 6)

  return (
    <section ref={ref} className="section-padding bg-dark-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-electric text-xs uppercase tracking-[0.3em] mb-3 block">Our Work</span>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase">
              Portfolio <span className="text-electric">Highlights</span>
            </h2>
          </div>
          <Link href="/portfolio" className="btn-secondary text-xs self-start md:self-auto">
            View All Work →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {preview.map((thumb, i) => (
            <motion.div
              key={thumb.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden bg-dark-700 border border-white/5 hover:border-electric/40 transition-all duration-500 cursor-pointer"
            >
              <div className="aspect-video relative">
                <Image
                  src={thumb.image_url}
                  alt={thumb.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-bold text-sm">{thumb.title}</p>
                  <p className="text-electric text-xs uppercase tracking-widest mt-1">{thumb.category}</p>
                </div>
              </div>
              {/* Category tag */}
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2 py-1 text-electric text-xs uppercase tracking-widest border border-electric/20">
                {thumb.category}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
