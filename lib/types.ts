export interface Thumbnail {
  id: string
  title: string
  category: string
  image_url: string
  before_url?: string
  after_url?: string
  client?: string
  created_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  project_type: string
  budget: string
  message: string
  status: 'new' | 'contacted' | 'converted'
  created_at: string
}

export interface Order {
  id: string
  name: string
  email: string
  plan: string
  amount: number
  payment_status: 'pending' | 'paid' | 'rejected'
  order_status: 'pending' | 'in_progress' | 'completed'
  payment_proof_url?: string
  whatsapp_number?: string
  notes?: string
  created_at: string
}

export interface PricingPlan {
  id: string
  name: string
  price: number
  currency: string
  period?: string
  features: string[]
  highlighted: boolean
  cta: string
}

export type ThumbnailCategory = 'All' | 'Finance' | 'Motivation' | 'Podcast' | 'Tech' | 'Spirituality'
