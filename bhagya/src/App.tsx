import { useState, useEffect } from 'react'
import './App.css'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import {
  Star, Sparkles, Clock, Compass, Moon, Map as MapIcon,
  ArrowRight, Menu, X, Phone, Mail, MapPin, ChevronUp,
  Shield, Award, Users, CheckCircle2, Quote
} from 'lucide-react'

type Service = {
  title: string
  price: string
  summary: string
  bullets: string[]
  badge: string
  image?: string
}

const navigation = ['Featured', 'Vastu', 'Tarot', 'Numerology']

const heroStats = [
  { value: '18+', label: 'Services', icon: Star },
  { value: '500+', label: 'Happy Clients', icon: Users },
  { value: '₹300', label: 'Starting Price', icon: Clock },
]

const signalWords = [
  'Factory Vastu', 'Home Vastu', 'Office Vastu',
  'Tarot Reading', 'Tarot Courses', 'Name Numerology',
  'Business Numerology', 'Life Path Prediction',
]

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Home Owner, Mumbai',
    text: 'The home Vastu visit completely transformed the energy in our house. Within weeks we noticed a positive shift in family harmony and finances.',
    rating: 5,
  },
  {
    name: 'Rajesh Mehta',
    role: 'Business Owner, Pune',
    text: 'The factory Vastu consultation was incredibly detailed. The directional guidance for our production layout made a real difference to our workflow.',
    rating: 5,
  },
  {
    name: 'Ananya Patel',
    role: 'Student, Ahmedabad',
    text: 'The tarot reading gave me clarity I had been searching for months. Accurate, insightful and delivered with genuine care.',
    rating: 5,
  },
]

const trustPoints = [
  { icon: Shield, label: 'Trusted Practice', desc: 'Years of verified expertise in Vastu, Tarot and Numerology' },
  { icon: Award, label: 'Certified Readings', desc: 'Professional certifications and structured learning programs' },
  { icon: Users, label: 'Personal Guidance', desc: 'Every session is tailored to your unique chart and situation' },
  { icon: CheckCircle2, label: 'Clear Pricing', desc: 'No hidden fees — every service listed with transparent pricing' },
]

const featuredService: Service = {
  title: 'Construction / Factory / Land Vastu Visit',
  price: '₹11,000',
  badge: 'Industrial Vastu',
  image: '/industry.png',
  summary:
    'A complete on-site Vastu audit for factories, land, construction zones, and industrial workflows with practical directional guidance.',
  bullets: [
    'Land shape, slope, geography and soil vibration analysis',
    'Main gate, factory building, office cabin and production layout guidance',
    'Machinery placement, storage flow, loading-unloading and vehicle movement',
    'Power house, boiler, generator, water tank and fire element alignment',
    'Compound wall energy and full 5-element balance review',
  ],
}

const vastuServices: Service[] = [
  {
    title: 'Home Vastu + Office Vastu Document',
    price: '₹1,000',
    badge: 'Vastu Document',
    summary:
      'A combined home and office review document focused on harmony, prosperity, peace, and flow across both spaces.',
    bullets: [
      'Main entrance, bedroom, kitchen and prosperity corner analysis',
      'Living room energy flow and children room direction review',
      'Health zone, toilet balance and negative block identification',
      '5-element balance across home and office zones',
    ],
  },
  {
    title: 'Office Vastu Visit',
    price: '₹3,500',
    badge: 'On-Site Office',
    summary:
      'A practical office Vastu visit built to improve team direction, work energy, client flow, and operational stability.',
    bullets: [
      'Complete office Vastu analysis without demolition',
      'Correct directions for teams, departments and client interaction',
      'Colour and placement guidance for smoother operations',
      'Remedies for money flow, stability and conversions',
    ],
  },
  {
    title: 'Home Vastu Visit',
    price: '₹2,500',
    badge: 'On-Site Home',
    summary:
      'A detailed home Vastu check focused on peace, health, prosperity, and simple corrections that do not require demolition.',
    bullets: [
      'Room-by-room home Vastu evaluation',
      'Corrections through placement changes and colour guidance',
      'Remedies for money, health and family peace',
      'Personalized improvement plan for your home energy',
    ],
  },
]

const tarotServices: Service[] = [
  {
    title: 'Advanced Tarot Card Course',
    price: '₹14,999',
    badge: 'Professional Course',
    summary:
      'An advanced course for readers ready to master deeper intuition, timelines, multi-spread work, and client-facing practice.',
    bullets: [
      'Advanced Major and Minor Arcana interpretation',
      'Energy reading, intuition and future timeline techniques',
      'Relationship, career, finance and block-clearing spreads',
      'Case studies, worksheets, lifetime guidance and certificate',
    ],
  },
  {
    title: 'Tarot Course — Basic',
    price: '₹5,000',
    badge: 'Beginner Course',
    summary:
      'A beginner-friendly tarot course designed to take someone from zero knowledge to confident reading step by step.',
    bullets: [
      'Major Arcana, Minor Arcana and upright-reversed meanings',
      'How to ask better questions and read for yourself and others',
      'Basic spreads like 3-card and past-present-future',
      'Practice sessions, PDF notes and certificate included',
    ],
  },
  {
    title: 'Advanced Tarot Reading',
    price: '₹1,500',
    badge: 'Deep Reading',
    summary:
      'A deeper tarot session focused on karmic patterns, emotional blocks, timelines, soul lessons, and transformation guidance.',
    bullets: [
      'Hidden truths in relationships, career and money',
      'Future timelines and repeated pattern analysis',
      'Shadow work, chakra or energy block guidance',
      'Action steps and remedies for positive shifts',
    ],
  },
  {
    title: 'Tarot Card Reading',
    price: '₹300',
    badge: 'Quick Clarity',
    summary:
      'A focused reading for current life questions around career, finance, relationships, health, and next-step clarity.',
    bullets: [
      'Understand present energies and hidden influences',
      'Get guidance on decisions and personal growth',
      'See what is developing and what action helps most',
      'Ideal for quick but accurate insight',
    ],
  },
]

const numerologyServices: Service[] = [
  {
    title: 'Fame & Rajyog Numerology',
    price: '₹5,100',
    badge: 'Leadership Energy',
    summary:
      'A numerology session that reveals recognition, authority, influence, luxury, and public success indicators in your chart.',
    bullets: [
      'Fame numbers, Rajyog numbers and leadership patterns',
      'Public presence, spotlight potential and authority traits',
      'Lucky colours, days and recognition remedies',
      'Career direction based on your strongest chart energies',
    ],
  },
  {
    title: '1-Year, 3-Year & 5-Year Life Path Prediction',
    price: '₹6,100',
    badge: 'Future Cycles',
    summary:
      'A roadmap-style prediction service showing your upcoming personal and professional energy cycles over 1, 3, and 5 years.',
    bullets: [
      'Career, money and relationship shifts across time',
      'Transformation windows and expansion phases',
      'Important years for stability, growth and major decisions',
      'Long-term destiny alignment and planning clarity',
    ],
  },
  {
    title: 'Financial Abundance — Yearly Membership',
    price: '₹1,00,000',
    badge: 'Premium Membership',
    summary:
      'A high-touch abundance-focused numerology membership designed to align long-term money flow, opportunities, and wealth remedies.',
    bullets: [
      'Wealth numbers, earning potential and money block analysis',
      'Name, signature, dates, colours and direction guidance',
      'Personalized remedies for abundance activation',
      'Long-term financial path and vibration support',
    ],
  },
  {
    title: 'Couple Matching — Numerology Compatibility',
    price: '₹2,400',
    badge: 'Relationship Match',
    summary:
      'Compatibility guidance for love, marriage, communication, bonding, and long-term relationship harmony.',
    bullets: [
      'Personal and couple numerology chart comparison',
      'Compatibility score for love, communication and bonding',
      'Harmony remedies and relationship improvement guidance',
      'Long-term success and stability prediction',
    ],
  },
  {
    title: 'Car Numerology',
    price: '₹1,100',
    badge: 'Vehicle Energy',
    summary:
      'A detailed car number analysis to help choose or evaluate a vehicle number for smoother journeys and positive energy.',
    bullets: [
      'Compatibility with your birth details',
      'Lucky number suggestions for new vehicle selection',
      'Imbalance remedies for existing number plates',
      'Support for safer and more prosperous travel energy',
    ],
  },
  {
    title: 'Mobile Numerology',
    price: '₹1,100',
    badge: 'Daily Energy',
    summary:
      'Mobile number analysis for luck, opportunities, peace, growth, and day-to-day energetic support.',
    bullets: [
      'Complete mobile number vibration analysis',
      'Lucky and supportive number suggestions',
      'Remedies for negative or blocked number patterns',
      'Energy alignment for money, peace and progress',
    ],
  },
  {
    title: 'Business Suggestion',
    price: '₹11,000',
    badge: 'Brand & Business',
    summary:
      'A numerology-driven business setup service covering name vibration, branding signals, lucky directions, and attraction energy.',
    bullets: [
      'Chaldean and Pythagorean analysis',
      'Business name ideas, spelling corrections and logo numerology',
      'Lucky colours, numbers, documents, mobile and vehicle guidance',
      'Remedies and energy balancing for customers and sales',
    ],
  },
  {
    title: 'Student + Parents Numerology Report',
    price: '₹2,500',
    badge: 'Family Guidance',
    summary:
      'A report built around education, career direction, family compatibility, concentration, and parent-child energy balance.',
    bullets: [
      'Life path, destiny and talent-weakness analysis',
      'Education focus, memory and concentration insights',
      'Future career guidance and child current cycle review',
      'Compatibility and parenting strength observations',
    ],
  },
  {
    title: 'Name Numerology',
    price: '₹1,100',
    badge: 'Identity Alignment',
    summary:
      'A focused report on name vibration, spelling optimization, lucky numbers, and supportive colours.',
    bullets: [
      'Detailed name analysis and correction suggestions',
      'Lucky colours and numbers for alignment',
      'PDF-style structured guidance',
      'Useful for personal or professional naming clarity',
    ],
  },
  {
    title: 'Personal Numerology Consultation',
    price: '₹999',
    badge: '1:1 Consultation',
    summary:
      'A one-on-one 45-minute consultation for a deeper review of your complete numerology profile and current life themes.',
    bullets: [
      'Direct expert consultation through video call',
      'Deep dive into your complete numerology profile',
      'Space to ask personalized questions',
      'Ideal for clients wanting expert interpretation, not just a report',
    ],
  },
]

const categoryMeta = {
  vastu: {
    title: 'Vastu Services',
    copy: 'From homes and offices to factories and land visits — direction, flow, elemental balance, and practical corrections.',
    icon: Compass,
    color: 'from-emerald-500/10 to-transparent',
    accent: 'rgba(52,211,153,0.15)',
  },
  tarot: {
    title: 'Tarot Services & Courses',
    copy: 'Clarity readings and structured learning programs for beginners, advanced readers, and clients seeking deeper guidance.',
    icon: Moon,
    color: 'from-violet-500/10 to-transparent',
    accent: 'rgba(139,92,246,0.15)',
  },
  numerology: {
    title: 'Numerology & Consultation',
    copy: 'Name correction, compatibility, long-term predictions, business energy, abundance, and one-on-one expert guidance.',
    icon: MapIcon,
    color: 'from-amber-500/10 to-transparent',
    accent: 'rgba(245,158,11,0.15)',
  },
}

/* ─── Eyebrow label ─────────────────────────────────────────────────────── */
function SectionEyebrow({ children, icon: Icon }: { children: string; icon?: typeof Star }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(212,175,55,0.22)] bg-[rgba(212,175,55,0.06)] px-4 py-2"
    >
      {Icon && <Icon className="h-3 w-3 text-[#D4AF37]" />}
      {!Icon && <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.6)]" />}
      <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">{children}</span>
    </motion.div>
  )
}

/* ─── Booking Modal ─────────────────────────────────────────────────────── */
function BookingModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', dob: '', email: '', phone: '', gender: 'Male', profession: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.dob) e.dob = 'Date of birth is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid 10-digit number'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSubmitted(true)
  }

  const inputCls = (field: string) =>
    `w-full rounded-xl border bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.15)] ${
      errors[field] ? 'border-red-500/50 focus:border-red-400' : 'border-white/10 focus:border-[rgba(212,175,55,0.5)]'
    }`

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="relative w-full max-w-[800px] max-h-[92vh] overflow-y-auto rounded-[1.75rem] border border-white/10 bg-[#0c0d1e] shadow-[0_40px_120px_rgba(0,0,0,0.85)] flex flex-col md:flex-row"
          role="dialog"
          aria-modal="true"
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 hover:text-white hover:border-white/20 transition-all duration-200"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          {/* Left — service info */}
          <div className="relative flex flex-col gap-5 bg-[rgba(212,175,55,0.04)] border-b md:border-b-0 md:border-r border-white/8 p-7 md:w-[40%] md:rounded-l-[1.75rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.08),transparent_60%)] rounded-[inherit] pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-block rounded-full bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.2)] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
                {service.badge}
              </span>
              <h2 className="mt-3 font-display text-[1.4rem] leading-snug text-white font-bold">{service.title}</h2>
            </div>
            {service.image && (
              <div className="relative z-10 overflow-hidden rounded-xl">
                <img src={service.image} alt={service.title} className="h-40 w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d1e]/70 to-transparent" />
              </div>
            )}
            <ul className="relative z-10 flex flex-col gap-2">
              {service.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[0.8rem] leading-relaxed text-white/60">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]/70" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="relative z-10 mt-auto pt-4 border-t border-white/8">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/35">Total Price</p>
              <p className="mt-1 font-display text-[1.8rem] font-bold text-[#D4AF37]">{service.price}</p>
            </div>
          </div>

          {/* Right — form */}
          <div className="flex flex-col p-7 md:flex-1 md:p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-1 flex-col items-center justify-center gap-5 text-center py-10"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.3)]">
                  <CheckCircle2 className="h-8 w-8 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Booking Received!</h3>
                  <p className="mt-2 text-sm text-white/50">We'll reach out to {form.name || 'you'} shortly to confirm your session.</p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-2 rounded-full bg-[linear-gradient(180deg,#f2ca50,#d4af37)] px-8 py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-[#3c2f00]"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              <>
                <h3 className="font-display text-[1.4rem] font-bold text-white">Your Details</h3>
                <p className="mt-1 text-sm text-white/40">Fill in your details to book this service.</p>
                <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                      Full Name <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={e => {
                        const value = e.target.value
                        setForm(f => ({ ...f, name: value }))
                        if (errors.name) setErrors(prev => ({ ...prev, name: '' }))
                      }}
                      className={inputCls('name')}
                    />
                    {errors.name && <p className="mt-1 text-[11px] text-red-400">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                      Date of Birth <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="date"
                      value={form.dob}
                      onChange={e => {
                        const value = e.target.value
                        setForm(f => ({ ...f, dob: value }))
                        if (errors.dob) setErrors(prev => ({ ...prev, dob: '' }))
                      }}
                      className={inputCls('dob')}
                    />
                    {errors.dob && <p className="mt-1 text-[11px] text-red-400">{errors.dob}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                      Email <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={e => {
                        const value = e.target.value
                        setForm(f => ({ ...f, email: value }))
                        if (errors.email) setErrors(prev => ({ ...prev, email: '' }))
                      }}
                      className={inputCls('email')}
                    />
                    {errors.email && <p className="mt-1 text-[11px] text-red-400">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                      Phone <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="10-digit number"
                      value={form.phone}
                      onChange={e => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                        setForm(f => ({ ...f, phone: value }))
                        if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }))
                      }}
                      className={inputCls('phone')}
                    />
                    {errors.phone && <p className="mt-1 text-[11px] text-red-400">{errors.phone}</p>}
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">Gender</label>
                      <select value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
                        className="w-full rounded-xl border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-white outline-none focus:border-[rgba(212,175,55,0.5)] cursor-pointer appearance-none">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                        Profession <span className="text-white/25">(opt.)</span>
                      </label>
                      <input type="text" placeholder="Your profession" value={form.profession}
                        onChange={e => setForm(f => ({ ...f, profession: e.target.value }))}
                        className="w-full rounded-xl border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-[rgba(212,175,55,0.5)] transition-all duration-200" />
                    </div>
                  </div>
                  <div className="mt-1 flex flex-col gap-3 sm:flex-row">
                    <button type="button" onClick={onClose}
                      className="flex-1 rounded-full border border-white/10 bg-white/5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60 hover:text-white hover:border-white/20 transition-all duration-200">
                      Cancel
                    </button>
                    <button type="submit"
                      className="flex-1 rounded-full bg-[linear-gradient(180deg,#f2ca50,#d4af37)] py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#3c2f00] hover:shadow-[0_0_28px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 transition-all duration-200">
                      Book — {service.price}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
    ,
    document.body
  )
}

/* ─── Service Card ──────────────────────────────────────────────────────── */
/* ─── Service Card ──────────────────────────────────────────────────────── */
// Fixed size: w-80 (320px) × h-[380px] — consistent across all cards
function ServiceCard({ service, accentColor = 'rgba(212,175,55,0.18)', index = 0, fixedHeight = true }: {
  service: Service
  accentColor?: string
  index?: number
  fixedHeight?: boolean
}) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      {modalOpen && <BookingModal service={service} onClose={() => setModalOpen(false)} />}

      <article className={`group relative flex w-full shrink-0 flex-col overflow-hidden rounded-[1.5rem] border border-white/[0.08] transition-all duration-350 hover:-translate-y-1.5 hover:border-[rgba(212,175,55,0.3)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.55)] ${fixedHeight ? 'h-[500px] max-w-[400px]' : 'h-full min-h-[440px]'}`}
        style={{ background: 'linear-gradient(160deg, rgba(14,15,35,0.95) 0%, rgba(8,9,22,0.98) 100%)' }}
      >
        {/* Ambient corner glow — always subtle, brighter on hover */}
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl transition-opacity duration-350 opacity-20 group-hover:opacity-50"
          style={{ background: accentColor }}
        />

        {/* Top shimmer line */}
        <div
          className="absolute inset-x-0 top-0 h-px transition-opacity duration-350 opacity-0 group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${accentColor} 50%, transparent 100%)` }}
        />

        <div className="relative z-10 flex h-full flex-col p-6 sm:p-7">

          <div className="mb-3 flex items-center justify-between gap-4">
            <span className="pointer-events-none select-none font-display text-[1.9rem] font-bold leading-none text-white/[0.08] [text-shadow:0_0_16px_rgba(255,255,255,0.02)]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="shrink-0 rounded-full border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.08)] px-3 py-1.5">
              <p className="font-display text-[1.15rem] font-bold leading-none text-[#D4AF37]">{service.price}</p>
            </div>
          </div>

          {/* ── Badge row ── */}
          <div className="flex min-h-[1.5rem] items-start justify-between gap-3">
            <span
              className="inline-flex items-center rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.24em] leading-none"
              style={{
                color: '#D4AF37',
              }}
            >
              {service.badge}
            </span>
          </div>

          {/* ── Title ── */}
          <h3 className="mt-4 font-display text-[1.2rem] font-bold leading-[1.3] text-white line-clamp-2">
            {service.title}
          </h3>

          {/* ── Thin gold rule ── */}
          <div className="my-3 h-px shrink-0" style={{ background: `linear-gradient(90deg, ${accentColor}60, transparent)` }} />

          {/* ── Summary ── */}
          <p className="text-[0.87rem] leading-[1.6] text-white/55 line-clamp-2 shrink-0">{service.summary}</p>

          {/* ── Bullets ── */}
          <ul className={`mt-4 rounded-[1.1rem] border border-white/6 bg-[rgba(255,255,255,0.02)] p-4 ${fixedHeight ? 'flex-1 overflow-hidden' : 'flex-1'} flex flex-col gap-3`}>
            {service.bullets.slice(0, 3).map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-[0.82rem] leading-snug text-white/60">
                <span
                  className="mt-[5px] h-[5px] w-[5px] shrink-0 rounded-full"
                  style={{ background: accentColor, boxShadow: `0 0 6px ${accentColor}` }}
                />
                <span className="line-clamp-2">{bullet}</span>
              </li>
            ))}
          </ul>

          {/* ── CTA ── */}
          <button
            onClick={() => setModalOpen(true)}
            className={`service-card-cta group/btn inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] py-3 text-[11px] font-bold uppercase tracking-[0.26em] transition-all duration-250 hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] ${fixedHeight ? 'mt-4' : 'mt-5'}`}
            style={{
              color: '#D4AF37',
              boxShadow: `inset 0 0 0 1px ${accentColor}`,
            }}
          >
            Book This Service
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </article>
    </>
  )
}

/* ─── Auto-scroll carousel (used when services.length > 3) ─────────────── */
function ServiceCarousel({ services, accentColor }: { services: Service[]; accentColor?: string }) {
  const cardW = 420
  const totalW = services.length * cardW
  const pixelsPerSecond = 80
  const duration = `${Math.max(totalW / pixelsPerSecond, 18)}s`

  return (
    <div className="relative overflow-hidden py-3">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-[linear-gradient(90deg,#050505,transparent)] md:w-24" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-[linear-gradient(270deg,#050505,transparent)] md:w-24" />

      <div
        className="carousel-track flex w-max gap-7"
        style={{
          '--carousel-total': `${totalW}px`,
          '--carousel-duration': duration,
        } as React.CSSProperties}
      >
        {[...services, ...services, ...services].map((service, i) => (
          <ServiceCard
            key={`${service.title}-${i}`}
            service={service}
            accentColor={accentColor}
            index={i % services.length}
            fixedHeight
          />
        ))}
      </div>
    </div>
  )
}

/* ─── Service Section ───────────────────────────────────────────────────── */
function ServiceSection({
  id, title, copy, services, icon: Icon, accentColor,
}: {
  id: string; title: string; copy: string; services: Service[]; icon: typeof Compass; accentColor?: string
}) {
  const useCarousel = services.length > 3

  return (
    <section id={id} className="relative px-5 py-16 md:px-10 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mb-8">
          <SectionEyebrow icon={Icon}>{title}</SectionEyebrow>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between"
          >
            <h2 className="font-display text-[2rem] font-bold leading-tight tracking-[-0.03em] text-white md:text-[2.6rem] max-w-[26rem]">
              {title}
            </h2>
            <p className="max-w-[28rem] text-[0.9rem] leading-relaxed text-white/45 lg:text-right">{copy}</p>
          </motion.div>
          <div className="mt-5 h-px bg-[linear-gradient(90deg,rgba(212,175,55,0.25),transparent)]" />
        </div>

        {useCarousel ? (
          <ServiceCarousel services={services} accentColor={accentColor} />
        ) : (
          <div className="grid grid-cols-1 items-stretch justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex h-full w-full max-w-[352px]"
              >
                <ServiceCard service={service} accentColor={accentColor} index={i} fixedHeight={false} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* ─── Featured Book Button (stateful, used in featured card) ────────────── */
function FeaturedBookButton({ service }: { service: Service }) {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      {modalOpen && <BookingModal service={service} onClose={() => setModalOpen(false)} />}
      <button
        onClick={() => setModalOpen(true)}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(180deg,#f2ca50,#d4af37)] py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-[#3c2f00] transition-all duration-200 hover:shadow-[0_0_24px_rgba(212,175,55,0.4)] hover:-translate-y-0.5"
      >
        Book Industrial Vastu — {service.price}
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </>
  )
}

/* ─── App ───────────────────────────────────────────────────────────────── */
function App() {
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <div className="relative overflow-x-hidden bg-[var(--page-base)] text-[var(--color-on-surface)]">

      {/* Scroll progress bar */}
      <motion.div
        style={{ width: progressWidth }}
        className="fixed top-0 left-0 z-[200] h-[2px] bg-[linear-gradient(90deg,#D4AF37,#f2ca50)] shadow-[0_0_8px_rgba(212,175,55,0.6)]"
      />

      {/* Ambient background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="aurora-drift absolute left-[-14rem] top-[-6rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(99,32,238,0.22)_0%,transparent_70%)] blur-3xl" />
        <div className="aurora-drift-delayed absolute right-[-10rem] top-[10rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.18)_0%,transparent_72%)] blur-3xl" />
      </div>

      {/* ─── NAVBAR ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        className="fixed left-0 top-4 z-50 w-full px-4"
      >
        <header className={`mx-auto flex w-full max-w-[1200px] items-center justify-between rounded-full border px-5 py-3 backdrop-blur-[32px] transition-all duration-500 ${
          scrolled
            ? 'border-white/12 bg-[rgba(5,5,15,0.85)] shadow-[0_12px_48px_rgba(0,0,0,0.5)]'
            : 'border-white/8 bg-[rgba(5,5,15,0.5)]'
        }`}>
          <a href="#top" className="font-display text-[1.25rem] font-bold tracking-[-0.03em] text-[#D4AF37]">
            Make My Bhagya
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="group relative text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55 transition-colors duration-200 hover:text-[#D4AF37]"
              >
                {item}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#cta"
              className="hidden lg:inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#f2ca50,#d4af37)] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 hover:shadow-[0_0_24px_rgba(212,175,55,0.4)] hover:-translate-y-0.5"
              style={{ color: '#2a1f00' }}
            >
              Book Session
              <ArrowRight className="h-3 w-3" style={{ color: '#2a1f00' }} />
            </a>
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle navigation"
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/50 hover:border-[rgba(212,175,55,0.35)] hover:text-[#D4AF37] transition-all duration-200"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </header>

      </motion.div>

      {/* ─── MOBILE SIDE DRAWER (portal-style, outside navbar wrapper) ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="fixed right-0 top-0 z-[70] flex h-full w-[min(320px,85vw)] flex-col bg-[rgba(6,7,20,0.98)] border-l border-white/8 shadow-[-24px_0_80px_rgba(0,0,0,0.6)] lg:hidden"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between border-b border-white/8 px-6 py-5">
                <span className="font-display text-[1.1rem] font-bold text-[#D4AF37]">Make My Bhagya</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 hover:border-[rgba(212,175,55,0.35)] hover:text-[#D4AF37] transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Nav links — staggered */}
              <nav className="flex flex-col gap-1 px-4 pt-6">
                {navigation.map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.28, delay: 0.1 + i * 0.06, ease: 'easeOut' }}
                    className="group flex items-center justify-between rounded-xl px-4 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-white/50 hover:bg-[rgba(212,175,55,0.07)] hover:text-[#D4AF37] transition-all duration-150"
                  >
                    <span>{item}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                  </motion.a>
                ))}
              </nav>

              {/* Divider + CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35 }}
                className="mt-auto border-t border-white/8 px-6 py-6"
              >
                <a
                  href="#cta"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#f2ca50,#d4af37)] py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-[#3c2f00] hover:shadow-[0_0_24px_rgba(212,175,55,0.35)] transition-all duration-200"
                >
                  Book a Session
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <p className="mt-4 text-center text-[10px] text-white/25 tracking-wide">Vastu · Tarot · Numerology</p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main id="top">
        {/* ─── HERO ───────────────────────────────────────────────────── */}
        <section className="relative isolate min-h-screen flex flex-col overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img src="/hero_section.png" alt="" aria-hidden="true" className="h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.6)_0%,rgba(5,5,5,0.25)_45%,rgba(5,5,5,0.9)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(99,32,238,0.15),transparent_70%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
          </div>

          {/* Orbital rings */}
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            <div className="hero-ring h-[480px] w-[480px] rounded-full border border-white/[0.05] md:h-[660px] md:w-[660px]" />
            <div className="hero-ring-reverse absolute h-[340px] w-[340px] rounded-full border border-[rgba(212,175,55,0.1)] md:h-[480px] md:w-[480px]" />
          </div>

          {/* Hero content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pt-32 pb-24 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
              className="flex flex-col items-center max-w-[780px]"
            >
              {/* Headline */}
              <motion.h1
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
                className="font-display font-bold leading-[1.02] tracking-[-0.04em] text-white"
                style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6.5rem)' }}
              >
                Guidance for<br />
                <span className="bg-[linear-gradient(135deg,#fff1ba_0%,#D4AF37_45%,#f9e498_100%)] bg-clip-text text-transparent">
                  Home, Work
                </span>
                <br />& Life.
              </motion.h1>

              {/* Subtext */}
              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
                className="mt-6 max-w-[520px] text-[1rem] leading-[1.85] text-white/70"
              >
                Vastu visits, tarot readings, numerology reports and compatibility guidance — all in one place with clear, honest pricing.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
                className="mt-9 flex flex-col sm:flex-row items-center gap-3"
              >
                <a
                  href="#featured"
                  className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#f2ca50,#d4af37)] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.18em] shadow-[0_4px_24px_rgba(212,175,55,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(212,175,55,0.55)]"
                  style={{ color: '#2a1f00' }}
                >
                  Explore Services
                  <ArrowRight className="h-3.5 w-3.5" style={{ color: '#2a1f00' }} />
                </a>
                <a
                  href="#cta"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-xl transition-all duration-300 hover:border-[rgba(212,175,55,0.5)] hover:bg-[rgba(212,175,55,0.1)] hover:text-[#D4AF37] hover:-translate-y-1"
                >
                  Book a Session
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
                className="mt-12 flex flex-wrap items-center justify-center gap-3"
              >
                {heroStats.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-center gap-3 rounded-full border border-white/10 bg-[rgba(10,11,30,0.5)] px-5 py-3 backdrop-blur-xl">
                      <Icon className="h-3.5 w-3.5 text-[#D4AF37]/70 shrink-0" />
                      <span className="font-display text-[1.2rem] font-bold text-[#D4AF37] leading-none">{item.value}</span>
                      <span className="text-[11px] text-white/50">{item.label}</span>
                    </div>
                  )
                })}
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/30">Scroll</span>
            <div className="relative h-9 w-px overflow-hidden bg-white/10">
              <div className="scroll-caret absolute inset-x-0 top-0 h-1/2 bg-[#D4AF37]" />
            </div>
          </div>
        </section>

        {/* ─── MARQUEE ────────────────────────────────────────────────── */}
        <section className="relative py-0">
          <div className="marquee-shell border-y border-white/8 bg-[rgba(10,11,30,0.5)] py-4 backdrop-blur-xl">
            <div className="marquee-track flex min-w-max items-center gap-8">
              {[...signalWords, ...signalWords, ...signalWords].map((word, i) => (
                <div key={`${word}-${i}`} className="flex items-center gap-8">
                  <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#D4AF37]/80">{word}</span>
                  <Star className="h-2.5 w-2.5 text-white/20" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TRUST STRIP ────────────────────────────────────────────── */}
        <section className="relative px-5 py-16 md:px-10 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {trustPoints.map((point, i) => {
                const Icon = point.icon
                return (
                  <motion.div
                    key={point.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex flex-col gap-3 rounded-2xl border border-white/7 bg-[rgba(10,11,30,0.5)] p-5 backdrop-blur-xl"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.18)]">
                      <Icon className="h-4 w-4 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-[0.85rem] font-semibold text-white">{point.label}</p>
                      <p className="mt-1 text-[0.78rem] leading-relaxed text-white/45">{point.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── FEATURED SERVICE ───────────────────────────────────────── */}
        <section id="featured" className="relative px-5 py-16 md:px-10 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-10">
              <SectionEyebrow icon={Star}>Featured Service</SectionEyebrow>
            </div>
            <div className="grid gap-8 xl:grid-cols-[1fr_1.4fr] xl:items-stretch">
              {/* Left copy */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7 }}
                className="flex h-full flex-col"
              >
                <div>
                  <h2 className="font-display text-[2.2rem] md:text-[3.2rem] font-bold leading-tight tracking-[-0.03em] text-white">
                    Construction, Factory & Land Vastu
                    <span className="mt-2 block text-[1.4rem] md:text-[1.8rem] text-white/40 font-medium italic">
                      complete on-site industrial guidance.
                    </span>
                  </h2>
                  <p className="mt-5 text-[0.95rem] leading-relaxed text-white/55">
                    The most comprehensive Vastu visit for factories, land and industrial setups — covering layout, flow, energy balance and directional planning.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {['Factory Vastu', 'Land Audit', 'Production Flow', '5 Elements'].map((chip) => (
                      <span key={chip} className="rounded-full border border-white/10 bg-[rgba(10,11,30,0.6)] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Image preview */}
                <div className="mt-8 overflow-hidden rounded-2xl border border-white/8 xl:mt-auto">
                  <img src="/industry.png" alt="Industrial factory Vastu" className="h-52 w-full object-cover" />
                </div>
              </motion.div>

              {/* Right card — featured stays fully open */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="relative overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.28)] bg-[rgba(14,15,32,0.95)] shadow-[0_20px_60px_rgba(0,0,0,0.5)] xl:h-full"
              >
                {/* Gold left bar */}
                <div className="absolute left-0 top-0 h-full w-[3px] bg-[linear-gradient(180deg,#D4AF37,rgba(212,175,55,0.2))]" />

                <div className="flex h-full flex-col px-6 py-5">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <span className="inline-flex items-center rounded-full border border-[rgba(212,175,55,0.25)] bg-[rgba(212,175,55,0.1)] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.26em] text-[#D4AF37]">
                          {featuredService.badge}
                        </span>
                        <h3 className="mt-3 max-w-[34rem] font-display text-[1.3rem] font-bold leading-snug text-white md:text-[1.5rem]">
                          {featuredService.title}
                        </h3>
                      </div>
                      <div className="shrink-0 rounded-xl border border-[rgba(212,175,55,0.25)] bg-[rgba(212,175,55,0.1)] px-4 py-2.5 text-center">
                        <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">Price</p>
                        <p className="font-display text-[1.1rem] font-bold leading-none text-[#D4AF37]">{featuredService.price}</p>
                      </div>
                    </div>

                    <p className="mt-4 max-w-[44rem] text-[0.9rem] leading-relaxed text-white/55">
                      {featuredService.summary}
                    </p>
                  </div>

                  <div className="mt-6 flex-1 rounded-[1.25rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-5">
                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/80">
                      Included In This Visit
                    </p>
                    <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {featuredService.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-[0.84rem] leading-relaxed text-white/68">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]/60" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 border-t border-white/8 pt-5">
                    <FeaturedBookButton service={featuredService} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── SERVICE SECTIONS ───────────────────────────────────────── */}
        <ServiceSection
          id="vastu"
          title={categoryMeta.vastu.title}
          copy={categoryMeta.vastu.copy}
          services={vastuServices}
          icon={categoryMeta.vastu.icon}
          accentColor={categoryMeta.vastu.accent}
        />
        <ServiceSection
          id="tarot"
          title={categoryMeta.tarot.title}
          copy={categoryMeta.tarot.copy}
          services={tarotServices}
          icon={categoryMeta.tarot.icon}
          accentColor={categoryMeta.tarot.accent}
        />
        <ServiceSection
          id="numerology"
          title={categoryMeta.numerology.title}
          copy={categoryMeta.numerology.copy}
          services={numerologyServices}
          icon={categoryMeta.numerology.icon}
          accentColor={categoryMeta.numerology.accent}
        />

        {/* ─── TESTIMONIALS ───────────────────────────────────────────── */}
        <section className="relative px-5 py-20 md:px-10 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-10 text-center">
              <SectionEyebrow icon={Star}>Client Stories</SectionEyebrow>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-5 font-display text-[2rem] md:text-[2.8rem] font-bold tracking-[-0.03em] text-white"
              >
                What clients say
              </motion.h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex flex-col gap-4 rounded-2xl border border-white/8 bg-[rgba(10,11,30,0.6)] p-6 backdrop-blur-xl"
                >
                  <Quote className="h-6 w-6 text-[#D4AF37]/30" />
                  <p className="text-[0.875rem] leading-relaxed text-white/65 flex-1">{t.text}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-3 w-3 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  <div className="border-t border-white/8 pt-4">
                    <p className="text-[0.875rem] font-semibold text-white">{t.name}</p>
                    <p className="text-[0.78rem] text-white/40">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA BANNER ─────────────────────────────────────────────── */}
        <section id="cta" className="relative px-5 pb-24 pt-8 md:px-10 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[2rem] border border-[rgba(212,175,55,0.2)] bg-[linear-gradient(160deg,rgba(12,14,35,0.98),rgba(5,5,5,0.99))] px-8 py-16 md:px-14 md:py-20"
          >
            {/* Glow accents */}
            <div className="pointer-events-none absolute right-[-8rem] top-[-8rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.18),transparent_70%)] blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-4rem] left-[-4rem] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(99,32,238,0.12),transparent_70%)] blur-3xl" />

            <div className="relative z-10 flex flex-col gap-10 xl:flex-row xl:items-center xl:justify-between">
              <div className="max-w-[44rem]">
                <SectionEyebrow icon={Sparkles}>Ready to Begin?</SectionEyebrow>
                <h2 className="mt-6 font-display text-[2.4rem] md:text-[3.8rem] font-bold leading-tight tracking-[-0.03em] text-white">
                  Choose the right consultation.
                  <span className="mt-2 block text-[1.4rem] md:text-[2rem] text-white/40 font-medium italic">
                    Vastu, tarot or numerology.
                  </span>
                </h2>
                <p className="mt-6 max-w-[38rem] text-[0.95rem] leading-relaxed text-white/55">
                  Browse the featured industrial Vastu service, then explore home and office Vastu, tarot readings and courses, and numerology reports and consultations.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row xl:flex-col xl:min-w-[220px]">
                <a
                  href="#featured"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#f2ca50,#d4af37)] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(212,175,55,0.4)]"
                  style={{ color: '#2a1f00' }}
                >
                  Start With Featured
                  <ArrowRight className="h-3.5 w-3.5" style={{ color: '#2a1f00' }} />
                </a>
                <a
                  href="#vastu"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-xl transition-all duration-300 hover:border-[rgba(212,175,55,0.35)] hover:text-[#D4AF37] hover:-translate-y-0.5"
                >
                  Browse All Services
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* ─── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="relative border-t border-white/8 bg-[rgba(5,5,5,0.99)] px-5 pt-14 pb-8 md:px-10 lg:px-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.35),transparent)]" />
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-2">
              <a href="#top" className="font-display text-[1.75rem] font-bold tracking-[-0.03em] text-[#D4AF37]">
                Make My Bhagya
              </a>
              <p className="mt-4 max-w-[26rem] text-[0.875rem] leading-relaxed text-white/45">
                Professional Vastu, Tarot and Numerology consultation services. Every service is listed with clear pricing and a focused summary so you can choose the right guidance easily.
              </p>
              <div className="mt-6 flex flex-col gap-2.5">
                <a href="tel:+91" className="inline-flex items-center gap-3 text-sm text-white/45 hover:text-[#D4AF37] transition-colors duration-200">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]/50" />
                  +91 — Contact for appointment
                </a>
                <a href="mailto:info@makemybhagya.com" className="inline-flex items-center gap-3 text-sm text-white/45 hover:text-[#D4AF37] transition-colors duration-200">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]/50" />
                  info@makemybhagya.com
                </a>
                <span className="inline-flex items-center gap-3 text-sm text-white/45">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]/50" />
                  India — Online &amp; On-site visits available
                </span>
              </div>
            </div>

            {/* Services */}
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">Services</p>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: 'Vastu Services', href: '#vastu' },
                  { label: 'Tarot Readings', href: '#tarot' },
                  { label: 'Tarot Courses', href: '#tarot' },
                  { label: 'Numerology Reports', href: '#numerology' },
                  { label: 'Compatibility Matching', href: '#numerology' },
                  { label: 'Life Path Prediction', href: '#numerology' },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="group flex items-center gap-2 text-[0.82rem] text-white/40 hover:text-[#D4AF37] transition-colors duration-200">
                      <span className="h-px w-3 bg-[#D4AF37]/25 group-hover:w-5 group-hover:bg-[#D4AF37] transition-all duration-200" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links */}
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">Quick Links</p>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: 'Featured Service', href: '#featured' },
                  { label: 'About Vastu', href: '#vastu' },
                  { label: 'About Tarot', href: '#tarot' },
                  { label: 'About Numerology', href: '#numerology' },
                  { label: 'Book a Session', href: '#cta' },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="group flex items-center gap-2 text-[0.82rem] text-white/40 hover:text-[#D4AF37] transition-colors duration-200">
                      <span className="h-px w-3 bg-[#D4AF37]/25 group-hover:w-5 group-hover:bg-[#D4AF37] transition-all duration-200" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-7 sm:flex-row">
            <p className="text-[11px] text-white/25 tracking-[0.06em]">
              © {new Date().getFullYear()} Make My Bhagya. All rights reserved.
            </p>
            <p className="text-[11px] text-white/25 tracking-[0.06em]">Vastu · Tarot · Numerology</p>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <a
        href="#top"
        aria-label="Back to top"
        className="fixed bottom-7 right-7 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(212,175,55,0.3)] bg-[rgba(5,5,15,0.85)] text-[#D4AF37] backdrop-blur-xl shadow-[0_6px_24px_rgba(0,0,0,0.4)] hover:bg-[#D4AF37] hover:text-[#3c2f00] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:-translate-y-0.5"
      >
        <ChevronUp className="h-4 w-4" />
      </a>
    </div>
  )
}

export default App
