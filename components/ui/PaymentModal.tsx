'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  plan: string
  price: number
}

const steps = [
  { number: '01', title: 'Open TapTap Send', desc: 'Download or open the TapTap Send app on your phone.' },
  { number: '02', title: 'Select Country', desc: 'Choose Benin (République du Bénin) as the destination country.' },
  { number: '03', title: 'Choose Mobile Money', desc: 'Select MTN Mobile Money as the payment method.' },
  { number: '04', title: 'Enter Number', desc: 'Enter the recipient number: 0169284952' },
  { number: '05', title: 'Send Payment', desc: 'Enter the exact amount and complete the transfer.' },
  { number: '06', title: 'Upload Proof', desc: 'Take a screenshot of your payment confirmation and upload it below.' },
]

export default function PaymentModal({ isOpen, onClose, plan, price }: PaymentModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [orderId] = useState(() => uuidv4().substring(0, 8).toUpperCase())
  const fileRef = useRef<HTMLInputElement>(null)
  const momoNumber = process.env.NEXT_PUBLIC_MOMO_NUMBER || '0169284952'
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2290169284952'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      toast.error('Please upload your payment proof screenshot')
      return
    }
    
    setLoading(true)

    try {
      // Upload proof to Supabase Storage
      let proofUrl = ''
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('payment-proofs')
        .upload(`${orderId}-${file.name}`, file)
      
      if (uploadError) {
        console.error('Upload error:', uploadError)
        // Continue without upload if storage not configured
      } else {
        const { data: urlData } = supabase.storage
          .from('payment-proofs')
          .getPublicUrl(uploadData.path)
        proofUrl = urlData.publicUrl
      }

      // Save order to DB via API
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: orderId,
          name,
          email,
          plan,
          amount: price,
          whatsapp_number: whatsapp,
          payment_proof_url: proofUrl,
          payment_status: 'pending',
          order_status: 'pending',
        }),
      })

      if (response.ok) {
        toast.success('Order submitted! We\'ll verify your payment and get started.')
        onClose()
        
        // Open WhatsApp with order ID
        const waMsg = encodeURIComponent(`Hello, I just paid for a thumbnail service. Here is my order ID: ${orderId}`)
        window.open(`https://wa.me/${waNumber}?text=${waMsg}`, '_blank')
      } else {
        throw new Error('Failed to submit order')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again or contact us on WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-dark-800 border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-dark-800 z-10">
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-wider">Payment Instructions</h2>
                <p className="text-white/50 text-sm mt-1">{plan} Plan — €{price} | Order: <span className="text-electric">{orderId}</span></p>
              </div>
              <button onClick={onClose} className="text-white/50 hover:text-white text-2xl leading-none">×</button>
            </div>

            <div className="p-6">
              {/* Security notice */}
              <div className="bg-electric/10 border border-electric/20 p-4 mb-6 flex gap-3">
                <div className="text-electric text-xl">🔒</div>
                <div>
                  <p className="text-electric text-sm font-bold">Secure Payment Process</p>
                  <p className="text-white/60 text-xs mt-1">Your order is confirmed only after admin payment verification. You will be notified via email and WhatsApp.</p>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-4 mb-8">
                {steps.map((step) => (
                  <div key={step.number} className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-electric text-black font-black text-sm flex items-center justify-center flex-shrink-0 clip-corner">
                      {step.number}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{step.title}</p>
                      <p className="text-white/50 text-xs mt-1">{step.desc}</p>
                      {step.number === '04' && (
                        <div className="mt-2 bg-dark-700 border border-electric/30 px-4 py-2 inline-block">
                          <span className="text-electric font-black text-lg tracking-widest">{momoNumber}</span>
                          <span className="text-white/30 text-xs ml-2">MTN Benin</span>
                        </div>
                      )}
                      {step.number === '05' && (
                        <div className="mt-2 bg-dark-700 border border-white/10 px-4 py-2 inline-block">
                          <span className="text-white font-bold">Amount: </span>
                          <span className="text-electric font-black">€{price}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-white font-bold uppercase tracking-widest text-sm border-b border-white/10 pb-3">Complete Your Order</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-dark-700 border border-white/10 text-white px-4 py-3 text-sm focus:border-electric outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-dark-700 border border-white/10 text-white px-4 py-3 text-sm focus:border-electric outline-none transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">WhatsApp Number</label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full bg-dark-700 border border-white/10 text-white px-4 py-3 text-sm focus:border-electric outline-none transition-colors"
                    placeholder="+1234567890"
                  />
                </div>

                <div>
                  <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Payment Screenshot *</label>
                  <div
                    onClick={() => fileRef.current?.click()}
                    className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
                      file ? 'border-electric bg-electric/5' : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    {file ? (
                      <div>
                        <div className="text-electric text-2xl mb-2">✓</div>
                        <p className="text-electric text-sm font-bold">{file.name}</p>
                        <p className="text-white/30 text-xs">Click to change</p>
                      </div>
                    ) : (
                      <div>
                        <div className="text-white/30 text-4xl mb-2">📸</div>
                        <p className="text-white/50 text-sm">Upload payment screenshot</p>
                        <p className="text-white/30 text-xs mt-1">PNG, JPG accepted</p>
                      </div>
                    )}
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary text-sm py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : `Submit Order — €${price}`}
                </button>

                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hello, I just paid for a thumbnail service. Here is my order ID: ${orderId}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full border border-green-500 text-green-500 py-3 text-sm font-bold uppercase tracking-widest hover:bg-green-500 hover:text-black transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Also Notify via WhatsApp
                </a>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
