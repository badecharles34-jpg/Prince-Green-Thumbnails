import { PricingPlan, Thumbnail } from './types'

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 30,
    currency: 'EUR',
    features: [
      '1 Custom Thumbnail',
      'HD Resolution (1280x720)',
      '2 Revision Rounds',
      '48-Hour Delivery',
      'Source File Included',
      'Basic CTR Optimization',
    ],
    highlighted: false,
    cta: 'Get Started',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 75,
    currency: 'EUR',
    features: [
      '3 Custom Thumbnails',
      '4K Resolution',
      'Unlimited Revisions',
      '24-Hour Rush Delivery',
      'Source Files + Assets',
      'Advanced CTR Strategy',
      'A/B Testing Variants',
      'Priority Support',
    ],
    highlighted: true,
    cta: 'Most Popular',
  },
  {
    id: 'agency',
    name: 'Agency',
    price: 199,
    currency: 'EUR',
    period: '/month',
    features: [
      'Unlimited Thumbnails',
      '4K + Custom Sizes',
      'Dedicated Designer',
      'Same-Day Turnaround',
      'Brand Kit Development',
      'Analytics & CTR Reports',
      'White-Label Option',
      'Slack/Discord Access',
      'Monthly Strategy Call',
    ],
    highlighted: false,
    cta: 'Scale Your Channel',
  },
]

export const MOCK_THUMBNAILS: Thumbnail[] = [
  {
    id: '1',
    title: 'How I Made $10K in 30 Days',
    category: 'Finance',
    image_url: 'https://picsum.photos/seed/finance1/640/360',
    client: 'FinanceGuru',
    created_at: '2024-01-15',
  },
  {
    id: '2',
    title: 'Morning Routine That Changed My Life',
    category: 'Motivation',
    image_url: 'https://picsum.photos/seed/motiv1/640/360',
    client: 'MindsetCoach',
    created_at: '2024-01-20',
  },
  {
    id: '3',
    title: 'The Future of AI with Elon Musk',
    category: 'Tech',
    image_url: 'https://picsum.photos/seed/tech1/640/360',
    client: 'TechTalks',
    created_at: '2024-02-01',
  },
  {
    id: '4',
    title: 'Deep Conversations with Naval',
    category: 'Podcast',
    image_url: 'https://picsum.photos/seed/podcast1/640/360',
    client: 'DeepDive Pod',
    created_at: '2024-02-10',
  },
  {
    id: '5',
    title: 'Awakening Your Inner Power',
    category: 'Spirituality',
    image_url: 'https://picsum.photos/seed/spirit1/640/360',
    client: 'SpiritPath',
    created_at: '2024-02-15',
  },
  {
    id: '6',
    title: 'Stock Market Crash is Coming',
    category: 'Finance',
    image_url: 'https://picsum.photos/seed/finance2/640/360',
    client: 'InvestPro',
    created_at: '2024-02-20',
  },
  {
    id: '7',
    title: 'Build a SaaS in 24 Hours',
    category: 'Tech',
    image_url: 'https://picsum.photos/seed/tech2/640/360',
    client: 'DevBuilder',
    created_at: '2024-03-01',
  },
  {
    id: '8',
    title: '5AM Club Exposed: The Truth',
    category: 'Motivation',
    image_url: 'https://picsum.photos/seed/motiv2/640/360',
    client: 'SuccessDaily',
    created_at: '2024-03-10',
  },
  {
    id: '9',
    title: 'Meditation Changed Everything',
    category: 'Spirituality',
    image_url: 'https://picsum.photos/seed/spirit2/640/360',
    client: 'MindfulLife',
    created_at: '2024-03-15',
  },
]

export const STATS = [
  { value: 500, suffix: '+', label: 'Thumbnails Created' },
  { value: 120, suffix: '+', label: 'Happy Creators' },
  { value: 47, suffix: '%', label: 'Avg CTR Increase' },
  { value: 3, suffix: 'M+', label: 'Views Generated' },
]

export const FAQS = [
  {
    q: 'How long does it take to get my thumbnail?',
    a: 'Delivery depends on your plan: Starter is 48 hours, Pro is 24 hours, and Agency clients get same-day turnaround.',
  },
  {
    q: 'What file formats do you deliver?',
    a: 'We deliver PNG (web-optimized), JPG, and include PSD/Figma source files for Pro and Agency clients.',
  },
  {
    q: 'How do I pay?',
    a: 'We accept payment via MTN Mobile Money through TapTap Send to Benin. Full instructions are provided after you select a plan.',
  },
  {
    q: 'Can I request revisions?',
    a: 'Yes! Starter gets 2 rounds, Pro gets unlimited revisions, and Agency clients have a dedicated designer for continuous collaboration.',
  },
  {
    q: 'Do you work with any YouTube niche?',
    a: 'Absolutely. We specialize in Finance, Motivation, Tech, Podcast, and Spirituality, but work with all niches.',
  },
  {
    q: 'Will my thumbnails actually increase CTR?',
    a: 'Our thumbnails are designed with proven psychological CTR triggers. Most clients see 30–60% improvement within the first month.',
  },
]

export const TESTIMONIALS = [
  {
    name: 'Marcus Chen',
    handle: '@FinanceWithMarcus',
    subscribers: '284K',
    text: 'My CTR jumped from 3.2% to 7.8% after switching to Prince Green. Game changer.',
    avatar: 'MC',
  },
  {
    name: 'Aisha Diallo',
    handle: '@MindsetWithAisha',
    subscribers: '156K',
    text: 'Best investment for my channel. The thumbnails are fire and the turnaround is insane.',
    avatar: 'AD',
  },
  {
    name: 'TechVault Studio',
    handle: '@TechVaultYT',
    subscribers: '512K',
    text: 'Agency plan is worth every penny. Having a dedicated designer changed everything.',
    avatar: 'TV',
  },
]
