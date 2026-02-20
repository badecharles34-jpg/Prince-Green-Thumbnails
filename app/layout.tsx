import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Prince Green Thumbnails | YouTube Thumbnail Design Agency',
    template: '%s | Prince Green Thumbnails',
  },
  description: 'Premium YouTube thumbnail design for creators and agencies who want more clicks. Increase your CTR with professionally designed thumbnails.',
  keywords: ['YouTube thumbnails', 'thumbnail design', 'YouTube CTR', 'thumbnail agency', 'YouTube marketing'],
  authors: [{ name: 'Prince Green Thumbnails' }],
  creator: 'Prince Green Thumbnails',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://princegreenthumbnails.com',
    siteName: 'Prince Green Thumbnails',
    title: 'Prince Green Thumbnails | YouTube Thumbnail Design Agency',
    description: 'Premium YouTube thumbnail design for creators who want more clicks.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prince Green Thumbnails',
    description: 'Premium YouTube thumbnail design agency.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} font-body bg-dark-900 text-white antialiased`}>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#111111',
              color: '#fff',
              border: '1px solid #00FF85',
            },
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
