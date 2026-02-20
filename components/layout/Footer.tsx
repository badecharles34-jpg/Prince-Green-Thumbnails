import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-white/5 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-electric flex items-center justify-center clip-corner">
                <span className="text-black font-black text-lg">PG</span>
              </div>
              <div>
                <div className="font-black text-white text-sm uppercase tracking-wider">Prince Green</div>
                <div className="text-electric text-[10px] uppercase tracking-[0.3em]">Thumbnails</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Premium YouTube thumbnail design for creators and agencies who demand results.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2290169284952'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/50 hover:border-electric hover:text-electric transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Pages</h4>
            <ul className="space-y-3">
              {['Home', 'Portfolio', 'Pricing', 'Contact'].map((page) => (
                <li key={page}>
                  <Link
                    href={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
                    className="text-white/50 hover:text-electric text-sm transition-colors duration-300"
                  >
                    {page}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Services</h4>
            <ul className="space-y-3">
              {['Custom Thumbnails', 'A/B Testing', 'CTR Optimization', 'Brand Kits', 'Agency Plans'].map((s) => (
                <li key={s}>
                  <span className="text-white/50 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © 2024 Prince Green Thumbnails. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Designed to <span className="text-electric">convert</span>.
          </p>
        </div>
      </div>
    </footer>
  )
}
