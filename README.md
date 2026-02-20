# Prince Green Thumbnails — Deployment Guide

Premium YouTube Thumbnail Design Agency Website built with Next.js 14, Tailwind CSS, Framer Motion, and Supabase.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- A Supabase account (free tier works)
- A Vercel account (for deployment)

---

## ⚙️ Local Development

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd prince-green-thumbnails
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your values:

```env
# Supabase (get from https://supabase.com/dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Payment Configuration
NEXT_PUBLIC_MOMO_NUMBER=0169284952
NEXT_PUBLIC_WHATSAPP_NUMBER=2290169284952

# Admin Panel Password
ADMIN_PASSWORD=choose_a_strong_password

# Optional: Email notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your_app_password
```

### 3. Set Up Supabase Database

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Open the **SQL Editor**
3. Paste and run the contents of `supabase-schema.sql`
4. This creates all tables, policies, and sample data

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

---

## 🗄️ Database Structure

### Tables

| Table | Purpose |
|-------|---------|
| `thumbnails` | Portfolio gallery items |
| `contact_submissions` | Contact form submissions |
| `orders` | Payment orders with status tracking |

### Storage Buckets

| Bucket | Purpose |
|--------|---------|
| `payment-proofs` | Client payment screenshots |

---

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, stats, portfolio preview, pricing, FAQ |
| `/portfolio` | Full portfolio with category filters & modal preview |
| `/pricing` | Pricing plans with payment integration |
| `/contact` | Contact form |
| `/admin` | Protected admin panel |

---

## 🔌 API Routes

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/contact` | GET, POST | Contact form submissions |
| `/api/payment` | GET, POST, PATCH | Order management |
| `/api/portfolio` | GET, POST, DELETE | Thumbnail management |

**Admin routes** require `x-admin-key` header matching `ADMIN_PASSWORD`.

---

## 🛡️ Admin Panel

Access at `/admin`

**Features:**
- View & manage all orders
- Approve/reject payments
- Update order status (Pending → In Progress → Completed)
- View payment proof screenshots
- Manage contact submissions
- Add/remove portfolio thumbnails

---

## 💳 Payment Flow

1. Client selects a plan → Payment modal opens
2. Client reads TapTap Send instructions
3. Client sends MTN Mobile Money to **0169284952** (Benin)
4. Client fills order form + uploads payment screenshot
5. Screenshot uploaded to Supabase Storage
6. Order saved to database with `pending` status
7. Admin reviews in panel → approves or rejects
8. Admin updates order status through production

---

## 🌐 Vercel Deployment

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/prince-green-thumbnails.git
git push -u origin main
```

### 2. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect via vercel.com dashboard (recommended)
```

### 3. Add Environment Variables in Vercel

In Vercel dashboard → Your Project → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_anon_key
SUPABASE_SERVICE_ROLE_KEY = your_service_role_key
NEXT_PUBLIC_MOMO_NUMBER = 0169284952
NEXT_PUBLIC_WHATSAPP_NUMBER = 2290169284952
ADMIN_PASSWORD = your_strong_admin_password
```

### 4. Custom Domain (Optional)

In Vercel dashboard → Your Project → Settings → Domains → Add your domain.

---

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` — the `electric` color `#00FF85` is the main accent.

### Pricing
Edit `lib/data.ts` → `PRICING_PLANS` array.

### Content
Edit `lib/data.ts` for:
- `STATS` — animated counter values
- `TESTIMONIALS` — social proof section
- `FAQS` — FAQ section
- `MOCK_THUMBNAILS` — fallback portfolio (overridden by Supabase data)

### WhatsApp Number
Update `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local`

---

## 📊 Performance

- Next.js Image optimization with lazy loading
- Static generation where possible
- Framer Motion with reduced-motion respect
- Minimal CSS (Tailwind purging)
- Google Fonts with `display: swap`

Target: Lighthouse score 90+

---

## 🔧 Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 14 | React framework with App Router |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations |
| Supabase | Database + Storage + Auth |
| react-hot-toast | Toast notifications |
| react-countup | Animated counters |
| react-intersection-observer | Scroll-triggered animations |

---

## 📞 Support

WhatsApp: https://wa.me/2290169284952
