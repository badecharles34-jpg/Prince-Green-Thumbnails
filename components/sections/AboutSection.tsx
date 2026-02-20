'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const tools = ['Photoshop']

const services = [
  { icon: '🎨', label: 'YouTube Thumbnails' },
  { icon: '📊', label: 'Optimisation CTR' },
  { icon: '🔥', label: 'A/B Testing Visuel' },
  { icon: '🏷️', label: 'Brand Kit Design' },
  { icon: '⚡', label: 'Livraison Express 24h' },
]

const floatTags = [
  { label: 'Available for work', style: 'top-[60px] -left-[120px]', delay: 0 },
  { label: 'CTR Expert',         style: 'top-[160px] -right-[110px]', delay: 1 },
  { label: 'Photoshop Pro',      style: 'bottom-[90px] -left-[110px]', delay: 2 },
]

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-screen flex items-center overflow-hidden bg-dark-900"
    >
      {/* Subtle grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 right-0 h-px bg-electric/5" />
        <div className="absolute top-2/3 left-0 right-0 h-px bg-electric/5" />
        <div className="absolute inset-0 bg-green-glow opacity-20" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full px-4 md:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-0 items-center">

          {/* ── GAUCHE ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8 lg:pr-12"
          >
            {/* Rôle */}
            <div>
              <div className="border-l-2 border-electric pl-3 text-white/30 text-xs uppercase tracking-[0.3em] mb-4">
                Graphic / Thumbnail Designer
              </div>
              <h2 className="text-4xl font-black text-white uppercase leading-tight">
                Créateur de<br />
                <span className="text-electric">Visuels qui</span><br />
                Convertissent
              </h2>
            </div>

            {/* Outils */}
            <div>
              <p className="text-white/25 text-[10px] uppercase tracking-[0.3em] mb-3">Outils utilisés</p>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[10px] uppercase tracking-wider text-white/40 border border-white/8 bg-white/[0.03] px-3 py-1.5 hover:border-electric hover:text-electric transition-all duration-300 cursor-default"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Mini stats */}
            <div className="flex flex-col gap-3">
              {[
                { num: '500+', label: 'Thumbnails créées' },
                { num: '120+', label: 'Créateurs satisfaits' },
                { num: '47%',  label: 'CTR moyen augmenté' },
              ].map(({ num, label }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="font-black text-3xl text-electric leading-none w-16 shrink-0" style={{ fontFamily: 'inherit' }}>
                    {num}
                  </span>
                  <span className="text-white/40 text-xs leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          {/* Ligne verticale */}
          <div className="hidden lg:block w-px self-stretch bg-electric/8" />

          {/* ── CENTRE — PHOTO ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col items-center lg:px-10"
          >
            {/* Frame photo */}
            <div className="relative">
              {/* Coins déco */}
              <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-2 border-l-2 border-electric z-10" />
              <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-2 border-r-2 border-electric z-10" />

              {/* Tags flottants — visibles uniquement sur desktop */}
              {floatTags.map(({ label, style, delay }) => (
                <motion.div
                  key={label}
                  className={`absolute hidden lg:flex items-center gap-2 bg-dark-700 border border-electric/20 px-3 py-2 text-[10px] tracking-wider whitespace-nowrap z-20 ${style}`}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay, ease: 'easeInOut' }}
                >
                  <span className="w-1.5 h-1.5 bg-electric rounded-full" />
                  {label}
                </motion.div>
              ))}

              {/* Zone photo — 260×340 */}
              <div
                className="w-[220px] h-[290px] md:w-[260px] md:h-[340px] bg-dark-700 border border-electric/15 overflow-hidden relative"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)',
                }}
              >
                {/*
                  ✅ POUR AJOUTER TA PHOTO :
                  1. Place ton image dans /public/images/bade-prince.png
                  2. Remplace le bloc ci-dessous par :
                     <Image src="/images/bade-prince.png" alt="Bade Prince" fill className="object-cover object-top" />
                */}
<Image
  src="/images/bade-prince.png"
  alt="Bade Prince"
  fill
  className="object-cover object-top"
/>
                {/* Glow bas */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(0,255,133,0.08), transparent)' }}
                />
              </div>

              {/* Glow sous la photo */}
              <div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-10 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(0,255,133,0.3) 0%, transparent 70%)', filter: 'blur(12px)' }}
              />
            </div>

            {/* Nom */}
            <div className="mt-6 text-center">
              <div className="font-black text-4xl text-white uppercase tracking-wider leading-none">
                BADE <span className="text-electric">PRINCE</span>
              </div>
              <div className="text-white/20 text-[10px] uppercase tracking-[0.4em] mt-2">
                Thumbnail Designer · Benin
              </div>
            </div>
          </motion.div>

          {/* Ligne verticale */}
          <div className="hidden lg:block w-px self-stretch bg-electric/8" />

          {/* ── DROITE ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-8 lg:pl-12"
          >
            {/* Bio */}
            <div>
              <p className="text-electric text-[10px] uppercase tracking-[0.25em] mb-3">Qui suis-je ?</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Je suis <strong className="text-white">Bade Prince</strong>, designer spécialisé dans la
                création de thumbnails YouTube à haute conversion. Je travaille avec des
                créateurs et agences à travers le monde pour maximiser leur taux de clic.
                <br /><br />
                Avec <strong className="text-electric">Photoshop</strong> comme outil principal, je crée
                des visuels percutants qui arrêtent le scroll et incitent au clic.
              </p>
            </div>

            {/* Services */}
            <div>
              <p className="text-electric text-[10px] uppercase tracking-[0.25em] mb-3">Ce que je fais</p>
              <div className="flex flex-col gap-1.5">
                {services.map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 px-3 py-2.5 bg-white/[0.02] border border-white/[0.04] hover:border-electric/30 hover:bg-electric/[0.03] transition-all duration-300 group cursor-default"
                  >
                    <span className="text-base">{icon}</span>
                    <span className="text-white/80 text-sm font-semibold">{label}</span>
                    <span className="ml-auto text-electric text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap">
              <a href="#contact" className="btn-primary text-xs px-6 py-3">
                Travailler avec moi
              </a>
              <a href="#portfolio" className="btn-secondary text-xs px-6 py-3">
                Voir mon travail
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}