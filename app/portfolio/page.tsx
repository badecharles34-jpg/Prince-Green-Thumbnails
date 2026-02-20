'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Thumbnail } from '@/lib/types'
import { supabase } from '@/lib/supabase'

const MOCK_THUMBNAILS: Thumbnail[] = [
  {
    id: '1',
    title: 'Ce que les millionnaires savent que toi tu ignores',
    category: 'Finance',
    image_url: '/images/thumbnails/949f57a2-ce-que-les-millionnaires-savent-que-toi-tu-ignores-687e0e9be0ad8.jpg',
    client: '',
    created_at: '2024-01-01',
  },
  {
    id: '2',
    title: 'On lui a déconseillé la prépa, il a intégré Centrale Paris',
    category: 'Motivation',
    image_url: '/images/thumbnails/b33b603c-on-lui-a-deconseille-la-prepa-il-a-integre-centrale-paris-le-parcours-inspirant-dadam-68110fe4cfaec.jpg',
    client: '',
    created_at: '2024-01-02',
  },
  {
    id: '3',
    title: 'Best of sur les jeux Sugar Supreme, Crazy Time, Cash Hunt',
    category: 'Motivation',
    image_url: '/images/thumbnails/Best-of-sur-les-jeux-Sugar-Supreme,-Crazy-Time,-Cash-Hunt.jpg',
    client: '',
    created_at: '2024-01-03',
  },
  {
    id: '4',
    title: 'Ces niches YouTube sont désormais interdites',
    category: 'Tech',
    image_url: '/images/thumbnails/Ces-niches-YouTube-sont-désormais-interdites.jpg',
    client: '',
    created_at: '2024-01-04',
  },
  {
    id: '5',
    title: 'Comment automatiser votre recherche d\'entreprise grâce à l\'IA',
    category: 'Tech',
    image_url: '/images/thumbnails/Comment-automatiser-votre-recherche-d\'entreprise-grace-à-l\'IA2.jpg',
    client: '',
    created_at: '2024-01-05',
  },
  {
    id: '6',
    title: 'Comment faire un entretien d\'embauche',
    category: 'Motivation',
    image_url: '/images/thumbnails/comment-faire-un-entretien-d\'ambauche2.jpg',
    client: '',
    created_at: '2024-01-06',
  },
  {
    id: '7',
    title: 'Comment j\'ai aidé un coach à faire 16 000€ avec 187 abonnés',
    category: 'Finance',
    image_url: '/images/thumbnails/Comment-j\'ai-aidé-un-coach-à-faire-16\'000€-avec-187-abonnés-(le-système-complet).jpg',
    client: '',
    created_at: '2024-01-07',
  },
  {
    id: '8',
    title: 'Revenu TikTok',
    category: 'Finance',
    image_url: '/images/thumbnails/d21c104f-revenu-tiktok-68110f359cf06.jpg',
    client: '',
    created_at: '2024-01-08',
  },
  {
    id: '9',
    title: 'Débat EXPLOSIF — IA, Amazon KDP, chance… on balance tout !',
    category: 'Podcast',
    image_url: '/images/thumbnails/Débat-EXPLOSIF-IA,-Amazon-KDP,-chance…-on-balance-tout-!.jpg',
    client: '',
    created_at: '2024-01-09',
  },
  {
    id: '10',
    title: 'Euro Cash',
    category: 'Finance',
    image_url: '/images/thumbnails/EURO CASH 2.png',
    client: '',
    created_at: '2024-01-10',
  },
  {
    id: '11',
    title: 'Formations recherche produit 30k/Mois',
    category: 'Finance',
    image_url: '/images/thumbnails/formations-recherche-produit-30k-Mois11.jpg',
    client: '',
    created_at: '2024-01-11',
  },
  {
    id: '12',
    title: 'Interview Pierre Etienne',
    category: 'Podcast',
    image_url: '/images/thumbnails/interview-pierre-etienne.jpg',
    client: '',
    created_at: '2024-01-12',
  },
  {
    id: '13',
    title: 'J\'ai fait +100 000€ en vendant des livres',
    category: 'Finance',
    image_url: '/images/thumbnails/J\'ai-fait-+100-000€-en-vendant-des-livres…-mais-personne-ne-voit-l\'envers-du-décor.jpg',
    client: '',
    created_at: '2024-01-13',
  },
  {
    id: '14',
    title: 'Muslim Talk',
    category: 'Podcast',
    image_url: '/images/thumbnails/Muslim-Talk.jpg',
    client: '',
    created_at: '2024-01-14',
  },
  {
    id: '15',
    title: '48h dans la vraie vie d\'une agence marketing',
    category: 'Motivation',
    image_url: '/images/thumbnails/Nice,-tournage,-cliente-_-48h-dans-la-vraie-vie-d\'une-agence-marketing-1.jpg',
    client: '',
    created_at: '2024-01-15',
  },
  {
    id: '16',
    title: 'Podcast Féminisme islamique',
    category: 'Podcast',
    image_url: '/images/thumbnails/podcast-Féminisme-islamique (5).jpg',
    client: '',
    created_at: '2024-01-16',
  },
  {
    id: '17',
    title: 'Psychologie',
    category: 'Motivation',
    image_url: '/images/thumbnails/psychologie1.jpg',
    client: '',
    created_at: '2024-01-17',
  },
  {
    id: '18',
    title: 'ROI vs ROC — les deux indicateurs à absolument connaître',
    category: 'Finance',
    image_url: '/images/thumbnails/ROI-vs-ROC-les-deux-indicateurs-à-absolument-connaitre.jpg',
    client: '',
    created_at: '2024-01-18',
  },
  {
    id: '19',
    title: 'Savoir & Islam',
    category: 'Spirituality',
    image_url: '/images/thumbnails/savoir-&-Islam7 (2).jpg',
    client: '',
    created_at: '2024-01-19',
  },
  {
    id: '20',
    title: 'Vegas',
    category: 'Motivation',
    image_url: '/images/thumbnails/vegas.jpg',
    client: '',
    created_at: '2024-01-20',
  },
]

export default function PortfolioPage() {
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>(MOCK_THUMBNAILS)
  const [selectedThumb, setSelectedThumb] = useState<Thumbnail | null>(null)

  useEffect(() => {
  async function fetchThumbnails() {
    try {
      const { data } = await supabase.from('thumbnails').select('*')
      if (data && data.length > 9) setThumbnails(data) // ← remplace > 0 par > 9
    } catch {
      // utilise les données mock
    }
  }
  fetchThumbnails()
}, [])

  return (
    <main className="pt-24 pb-20 min-h-screen bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-electric text-xs uppercase tracking-[0.3em] mb-3 block"
          >
            Notre Travail
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-white uppercase"
          >
            Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 mt-4 text-sm"
          >
            {thumbnails.length}+ miniatures créées pour des créateurs du monde entier
          </motion.p>
        </div>

        {/* Grille — toutes les miniatures ensemble */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {thumbnails.map((thumb, i) => (
            <motion.div
              key={thumb.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              onClick={() => setSelectedThumb(thumb)}
              className="group relative overflow-hidden border border-white/5 hover:border-electric/40 transition-all duration-500 cursor-pointer bg-dark-700"
            >
              <div className="aspect-video relative">
                <Image
                  src={thumb.image_url}
                  alt={thumb.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlay au hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Infos au hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-bold text-sm">{thumb.title}</p>
                  {thumb.client && (
                    <p className="text-white/50 text-xs mt-0.5">{thumb.client}</p>
                  )}
                </div>
              </div>

              {/* Icône loupe */}
              <div className="absolute top-3 right-3 bg-electric/20 border border-electric/30 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-electric text-sm">⊕</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA bas de page */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-white/30 text-sm mb-6">
            Tu veux une miniature comme ça pour ta chaîne ?
          </p>
          <a href="/contact" className="btn-primary text-xs px-10 py-4">
            Obtenir un Devis →
          </a>
        </motion.div>

      </div>

      {/* Modal aperçu */}
      <AnimatePresence>
        {selectedThumb && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
            onClick={() => setSelectedThumb(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <Image
                  src={selectedThumb.image_url}
                  alt={selectedThumb.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-dark-800 border border-white/10 p-5 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-sm">{selectedThumb.title}</h3>
                  <div className="flex gap-4 mt-1">
                    <span className="text-electric text-xs uppercase tracking-widest">
                      {selectedThumb.category}
                    </span>
                    {selectedThumb.client && (
                      <span className="text-white/40 text-xs">{selectedThumb.client}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedThumb(null)}
                  className="text-white/50 hover:text-white text-2xl transition-colors leading-none"
                >
                  ×
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}