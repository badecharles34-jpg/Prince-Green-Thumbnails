'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

type Tab = 'orders' | 'contacts' | 'portfolio'

interface Order {
  id: string
  name: string
  email: string
  plan: string
  amount: number
  payment_status: string
  order_status: string
  payment_proof_url?: string
  whatsapp_number?: string
  created_at: string
}

interface Contact {
  id: string
  name: string
  email: string
  project_type?: string
  budget?: string
  message: string
  status: string
  created_at: string
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [adminKey, setAdminKey] = useState('')
  const [activeTab, setActiveTab] = useState<Tab>('orders')
  const [orders, setOrders] = useState<Order[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(false)
  const [thumbnailForm, setThumbnailForm] = useState({ title: '', category: '', image_url: '', client: '' })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setAdminKey(password)
    setAuthenticated(true)
  }

  const fetchData = async (tab: Tab) => {
    setLoading(true)
    try {
      if (tab === 'orders') {
        const res = await fetch('/api/payment', { headers: { 'x-admin-key': adminKey } })
        const { data } = await res.json()
        setOrders(data || [])
      } else if (tab === 'contacts') {
        const res = await fetch('/api/contact', { headers: { 'x-admin-key': adminKey } })
        const { data } = await res.json()
        setContacts(data || [])
      }
    } catch {
      toast.error('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authenticated) fetchData(activeTab)
  }, [authenticated, activeTab])

  const updateOrderStatus = async (id: string, field: string, value: string) => {
    const res = await fetch('/api/payment', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify({ id, [field]: value }),
    })
    if (res.ok) {
      toast.success('Status updated')
      fetchData('orders')
    }
  }

  const addThumbnail = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify(thumbnailForm),
    })
    if (res.ok) {
      toast.success('Thumbnail added!')
      setThumbnailForm({ title: '', category: '', image_url: '', client: '' })
    } else {
      toast.error('Failed to add thumbnail')
    }
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
        <div className="max-w-sm w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-electric mx-auto flex items-center justify-center clip-corner mb-4">
              <span className="text-black font-black text-2xl">PG</span>
            </div>
            <h1 className="text-2xl font-black text-white">Admin Panel</h1>
            <p className="text-white/40 text-sm mt-1">Prince Green Thumbnails</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full bg-dark-700 border border-white/10 text-white px-4 py-3 focus:border-electric outline-none"
            />
            <button type="submit" className="w-full btn-primary py-3 text-sm">
              Access Panel
            </button>
          </form>
        </div>
      </main>
    )
  }

  const statusColors: Record<string, string> = {
    pending: 'text-yellow-400 border-yellow-400/30',
    paid: 'text-electric border-electric/30',
    rejected: 'text-red-400 border-red-400/30',
    in_progress: 'text-blue-400 border-blue-400/30',
    completed: 'text-green-400 border-green-400/30',
    new: 'text-white/60 border-white/10',
    contacted: 'text-blue-400 border-blue-400/30',
    converted: 'text-electric border-electric/30',
  }

  return (
    <main className="min-h-screen bg-dark-900 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">Admin Panel</h1>
            <p className="text-white/40 text-sm mt-1">Manage your agency</p>
          </div>
          <button onClick={() => setAuthenticated(false)} className="btn-secondary text-xs px-4 py-2">
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10">
          {(['orders', 'contacts', 'portfolio'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-xs uppercase tracking-widest border-b-2 transition-colors ${
                activeTab === tab ? 'border-electric text-electric' : 'border-transparent text-white/40 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading && <div className="text-center py-12 text-electric text-sm">Loading...</div>}

        {/* Orders */}
        {activeTab === 'orders' && !loading && (
          <div className="space-y-4">
            <div className="text-white/40 text-xs uppercase tracking-widest mb-4">{orders.length} Orders</div>
            {orders.map((order) => (
              <div key={order.id} className="card-dark p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-electric font-black text-sm">#{order.id.slice(0, 8)}</span>
                      <span className={`text-xs border px-2 py-0.5 uppercase tracking-wider ${statusColors[order.payment_status]}`}>
                        {order.payment_status}
                      </span>
                      <span className={`text-xs border px-2 py-0.5 uppercase tracking-wider ${statusColors[order.order_status]}`}>
                        {order.order_status}
                      </span>
                    </div>
                    <p className="text-white font-bold">{order.name} <span className="text-white/40 text-sm">({order.email})</span></p>
                    <p className="text-white/50 text-sm">{order.plan} — €{order.amount}</p>
                    {order.whatsapp_number && (
                      <a href={`https://wa.me/${order.whatsapp_number.replace(/\D/g, '')}`} target="_blank" className="text-green-400 text-xs hover:underline">
                        WhatsApp: {order.whatsapp_number}
                      </a>
                    )}
                    {order.payment_proof_url && (
                      <a href={order.payment_proof_url} target="_blank" className="text-electric text-xs block mt-1 hover:underline">
                        View Payment Proof →
                      </a>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {/* Payment status */}
                    <select
                      defaultValue={order.payment_status}
                      onChange={(e) => updateOrderStatus(order.id, 'payment_status', e.target.value)}
                      className="bg-dark-600 border border-white/10 text-white text-xs px-3 py-2 outline-none focus:border-electric"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid ✓</option>
                      <option value="rejected">Rejected ✗</option>
                    </select>
                    {/* Order status */}
                    <select
                      defaultValue={order.order_status}
                      onChange={(e) => updateOrderStatus(order.id, 'order_status', e.target.value)}
                      className="bg-dark-600 border border-white/10 text-white text-xs px-3 py-2 outline-none focus:border-electric"
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <p className="text-white/20 text-xs mt-3">{new Date(order.created_at).toLocaleString()}</p>
              </div>
            ))}
            {orders.length === 0 && <div className="text-center py-12 text-white/30">No orders yet.</div>}
          </div>
        )}

        {/* Contacts */}
        {activeTab === 'contacts' && !loading && (
          <div className="space-y-4">
            <div className="text-white/40 text-xs uppercase tracking-widest mb-4">{contacts.length} Submissions</div>
            {contacts.map((c) => (
              <div key={c.id} className="card-dark p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="text-white font-bold">{c.name}</p>
                      <span className={`text-xs border px-2 py-0.5 uppercase tracking-wider ${statusColors[c.status]}`}>{c.status}</span>
                    </div>
                    <p className="text-electric text-sm">{c.email}</p>
                    {c.project_type && <p className="text-white/40 text-xs">{c.project_type} — {c.budget}</p>}
                    <p className="text-white/60 text-sm mt-3 leading-relaxed">{c.message}</p>
                  </div>
                </div>
                <p className="text-white/20 text-xs mt-3">{new Date(c.created_at).toLocaleString()}</p>
              </div>
            ))}
            {contacts.length === 0 && <div className="text-center py-12 text-white/30">No contact submissions yet.</div>}
          </div>
        )}

        {/* Portfolio Management */}
        {activeTab === 'portfolio' && (
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Add New Thumbnail</h3>
            <form onSubmit={addThumbnail} className="card-dark p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Title *</label>
                  <input required value={thumbnailForm.title} onChange={(e) => setThumbnailForm({ ...thumbnailForm, title: e.target.value })}
                    className="w-full bg-dark-700 border border-white/10 text-white px-4 py-3 text-sm focus:border-electric outline-none"
                    placeholder="Thumbnail title" />
                </div>
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Category *</label>
                  <select required value={thumbnailForm.category} onChange={(e) => setThumbnailForm({ ...thumbnailForm, category: e.target.value })}
                    className="w-full bg-dark-700 border border-white/10 text-white px-4 py-3 text-sm focus:border-electric outline-none">
                    <option value="">Select...</option>
                    {['Finance', 'Motivation', 'Podcast', 'Tech', 'Spirituality'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Image URL *</label>
                <input required value={thumbnailForm.image_url} onChange={(e) => setThumbnailForm({ ...thumbnailForm, image_url: e.target.value })}
                  className="w-full bg-dark-700 border border-white/10 text-white px-4 py-3 text-sm focus:border-electric outline-none"
                  placeholder="https://..." />
              </div>
              <div>
                <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Client Name</label>
                <input value={thumbnailForm.client} onChange={(e) => setThumbnailForm({ ...thumbnailForm, client: e.target.value })}
                  className="w-full bg-dark-700 border border-white/10 text-white px-4 py-3 text-sm focus:border-electric outline-none"
                  placeholder="Client or channel name" />
              </div>
              <button type="submit" className="btn-primary text-xs px-8 py-3">
                Add Thumbnail
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  )
}
