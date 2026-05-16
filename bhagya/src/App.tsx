import { useState } from 'react'
import './App.css'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Star, Sparkles, Clock, Compass, Moon, Map as MapIcon, ArrowRight, Menu, X, Phone, Mail, MapPin, ChevronUp } from 'lucide-react'

type Service = {
  title: string
  price: string
  summary: string
  bullets: string[]
  badge: string
}

const navigation = ['Featured', 'Vastu', 'Tarot', 'Numerology']

const heroStats = [
  { value: '18', label: 'Services available', icon: Star },
  { value: '3', label: 'Main categories', icon: Sparkles },
  { value: '₹300', label: 'Starting tarot session', icon: Clock },
]

const signalWords = [
  'Factory Vastu',
  'Home Vastu',
  'Office Vastu',
  'Tarot Reading',
  'Tarot Courses',
  'Name Numerology',
  'Business Numerology',
  'Life Path Prediction',
]

const featuredService: Service = {
  title: 'Construction / Factory / Land Vastu Visit',
  price: '₹11000',
  badge: 'Featured Industrial Vastu',
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
    price: '₹1000',
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
    price: '₹3500',
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
    price: '₹2500',
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
    price: '₹14999',
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
    title: 'Tarot Course - Basic',
    price: '₹5000',
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
    price: '₹1500',
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
    price: '₹5100',
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
    price: '₹6100',
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
    title: 'Financial Abundance - Membership Yearly',
    price: '₹100000',
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
    title: 'Couple Matching - Numerology Compatibility',
    price: '₹2400',
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
    price: '₹1100',
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
    price: '₹1100',
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
    price: '₹11000',
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
    price: '₹2500',
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
    price: '₹1100',
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
    copy:
      'From homes and offices to factories and land visits, these services focus on direction, flow, elemental balance, and practical corrections.',
    icon: Compass,
  },
  tarot: {
    title: 'Tarot Services & Courses',
    copy:
      'A mix of clarity readings and structured learning programs for beginners, advanced readers, and clients seeking deeper guidance.',
    icon: Moon,
  },
  numerology: {
    title: 'Numerology & Consultation Services',
    copy:
      'From name correction and compatibility to long-term predictions, business energy, abundance, and one-on-one expert guidance.',
    icon: MapIcon,
  },
}

function SectionEyebrow({ children }: { children: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="inline-flex items-center gap-3 rounded-full border border-[rgba(212,175,55,0.24)] bg-[rgba(10,11,30,0.56)] px-4 py-2 backdrop-blur-xl hover:bg-[rgba(212,175,55,0.08)] transition-colors duration-300"
    >
      <span className="h-2 w-2 rounded-full bg-[var(--color-primary)] shadow-[0_0_18px_rgba(212,175,55,0.55)]" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--color-on-surface-variant)]">
        {children}
      </span>
    </motion.div>
  )
}

function ServiceCard({ service, featured = false }: { service: Service; featured?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className={`group relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,11,30,0.8),rgba(10,11,30,0.52))] backdrop-blur-[28px] transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(212,175,55,0.28)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.36)] ${
        featured ? 'p-7 md:p-8' : 'p-6'
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.12),transparent_36%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--color-primary)]">{service.badge}</p>
            <h3 className={`mt-4 font-display leading-tight text-white ${featured ? 'max-w-[16ch] text-[2rem] md:text-[2.8rem]' : 'max-w-[16ch] text-[1.8rem]'}`}>
              {service.title}
            </h3>
          </div>
          <div className="rounded-full border border-[rgba(212,175,55,0.24)] bg-[rgba(212,175,55,0.1)] px-4 py-2 text-sm font-bold text-[var(--color-primary)]">
            {service.price}
          </div>
        </div>
        <p className="mt-5 text-[1rem] leading-[1.8] text-[color:rgba(229,226,225,0.78)] font-light">{service.summary}</p>
        <ul className="mt-6 space-y-3">
          {service.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-sm leading-7 text-[color:rgba(229,226,225,0.8)]">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-primary)] shadow-[0_0_14px_rgba(212,175,55,0.4)]" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-7">
          <div className="h-px w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.04),rgba(212,175,55,0.45),rgba(255,255,255,0.04))]" />
          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="text-sm uppercase tracking-[0.16em] text-[var(--color-on-surface-variant)]">Explore service</p>
            <button className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#f2ca50_0%,#d4af37_100%)] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-on-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_26px_rgba(212,175,55,0.22)]">
              Explore
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function ServiceSection({
  id,
  title,
  copy,
  services,
  icon: Icon,
}: {
  id: string
  title: string
  copy: string
  services: Service[]
  icon: typeof Compass
}) {
  return (
    <section id={id} className="relative px-6 py-24 md:px-10 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
          }}
          className="mb-12"
        >
          <SectionEyebrow>{title}</SectionEyebrow>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-[44rem]">
              <div className="mb-4 inline-flex rounded-full border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.08)] p-3 text-[var(--color-primary)]">
                <Icon className="h-4 w-4" />
              </div>
              <h2 className="font-display text-[2.7rem] leading-[0.98] tracking-[-0.04em] text-white md:text-[4rem] font-bold">
                {title}
              </h2>
            </div>
            <p className="max-w-[30rem] text-[1.02rem] leading-[1.9] text-[color:rgba(229,226,225,0.76)] font-light">{copy}</p>
          </motion.div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}

function App() {
  const { scrollYProgress } = useScroll();
  useTransform(scrollYProgress, [0, 0.3], [0, 50]); // retained for future parallax use
  const [mobileOpen, setMobileOpen] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="relative overflow-x-hidden bg-[var(--page-base)] text-[var(--color-on-surface)] selection:bg-[var(--color-primary-container)] selection:text-[var(--page-base)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora-drift absolute left-[-16rem] top-[-8rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(99,32,238,0.28)_0%,rgba(99,32,238,0)_70%)] blur-3xl opacity-80" />
        <div className="aurora-drift-delayed absolute right-[-12rem] top-[12rem] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.25)_0%,rgba(212,175,55,0)_72%)] blur-3xl opacity-80" />
        <div className="aurora-drift-slow absolute bottom-[12rem] left-[8%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(10,11,30,0.94)_0%,rgba(10,11,30,0)_76%)] blur-3xl" />
        <div className="absolute inset-x-0 top-[42rem] h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.25),transparent)] opacity-50" />
      </div>

      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="fixed left-0 top-5 z-50 w-full px-4"
      >
        <header className="mx-auto flex w-full max-w-[1220px] items-center justify-between rounded-full border border-white/12 bg-[rgba(8,10,22,0.65)] px-5 py-3 backdrop-blur-[32px] shadow-[0_18px_70px_rgba(0,0,0,0.45)] md:px-7 transition-all duration-500 hover:border-white/20 hover:bg-[rgba(12,14,28,0.75)]">
          <a href="#top" className="font-display text-[1.4rem] font-bold tracking-[-0.04em] text-[var(--color-primary)] transition-transform hover:scale-105 duration-300">
            Make My Bhagya<span className="text-[var(--color-primary)]/40">.</span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="group relative text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-on-surface-variant)] transition-colors duration-300 hover:text-[var(--color-primary)]"
              >
                {item}
                <span className="absolute -bottom-2 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.95),transparent)] transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_12px_rgba(212,175,55,0.8)]" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#cta"
              className="group hidden lg:inline-flex items-center gap-2 justify-center rounded-full border border-[rgba(212,175,55,0.35)] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)] transition-all duration-500 hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] hover:shadow-[0_0_35px_rgba(212,175,55,0.35)] hover:scale-105"
            >
              <span>Book Session</span>
              <ArrowRight className="h-3 w-3 opacity-0 -ml-4 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0" />
            </a>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation"
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-white/5 text-[var(--color-on-surface-variant)] hover:border-[rgba(212,175,55,0.4)] hover:text-[var(--color-primary)] transition-all duration-300"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </header>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mx-auto mt-3 w-full max-w-[1220px] rounded-[1.6rem] border border-white/12 bg-[rgba(8,10,22,0.92)] px-6 py-6 backdrop-blur-[40px] shadow-[0_24px_80px_rgba(0,0,0,0.6)] lg:hidden"
            >
              <nav className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--color-on-surface-variant)] hover:bg-[rgba(212,175,55,0.08)] hover:text-[var(--color-primary)] transition-all duration-200"
                  >
                    {item}
                    <ArrowRight className="h-3 w-3 opacity-40" />
                  </a>
                ))}
              </nav>
              <div className="mt-5 border-t border-white/8 pt-5">
                <a
                  href="#cta"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center rounded-full bg-[linear-gradient(180deg,#f2ca50_0%,#d4af37_100%)] py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--color-on-primary)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300"
                >
                  Book a Session
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <main id="top">
        {/* ================= HERO SECTION ================= */}
        <section className="relative isolate min-h-screen w-full flex flex-col overflow-hidden">

          {/* Full-bleed background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/hero_section.png"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center scale-[1.04]"
            />
            {/* layered overlays for depth */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.55)_0%,rgba(5,5,5,0.3)_40%,rgba(5,5,5,0.85)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(99,32,238,0.18)_0%,transparent_70%)]" />
            {/* bottom fade into page */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />
          </div>

          {/* Orbital rings — decorative */}
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            <div className="hero-ring h-[520px] w-[520px] rounded-full border border-white/[0.06] md:h-[700px] md:w-[700px]" />
            <div className="hero-ring-reverse absolute h-[380px] w-[380px] rounded-full border border-[rgba(212,175,55,0.12)] md:h-[520px] md:w-[520px]" />
            <div className="hero-dotted absolute h-[640px] w-[640px] rounded-full border border-dashed border-white/[0.05] md:h-[860px] md:w-[860px]" />
            {/* gold dot on ring */}
            <div className="absolute top-[calc(50%-350px)] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#D4AF37] shadow-[0_0_14px_#D4AF37]" />
          </div>

          {/* Hero content — centered */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col items-center max-w-[820px]"
            >
              {/* Eyebrow pill */}
              <motion.div variants={fadeInUp}>
              </motion.div>

              {/* Vertical gold line */}
              <motion.div
                variants={fadeInUp}
                className="mt-8 w-px h-12 bg-gradient-to-b from-transparent via-[#D4AF37]/70 to-transparent"
              />

              {/* Main headline */}
              <motion.h1
                variants={fadeInUp}
                className=" font-display font-bold leading-[1.0] tracking-[-0.04em] text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.9)]"
                style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
              >
                Guidance for<br />
                <span className="bg-[linear-gradient(135deg,#fff1ba_0%,#D4AF37_45%,#f9e498_100%)] bg-clip-text text-transparent">
                  Home, Work
                </span>
                <br />& Life.
              </motion.h1>

              {/* Subtext */}
              <motion.p
                variants={fadeInUp}
                className="mt-7 max-w-[560px] text-[1.05rem] leading-[1.9] text-[rgba(229,226,225,0.82)] font-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
              >
                Vastu visits, tarot readings, numerology reports and compatibility guidance — all in one place with clear pricing.
              </motion.p>

              {/* CTA buttons */}
              <motion.div variants={fadeInUp} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="#experience"
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#f2ca50_0%,#d4af37_100%)] px-9 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-[#3c2f00] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(212,175,55,0.5)]"
                >
                  <span className="relative z-10">Explore Services</span>
                  <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                </a>
                <a
                  href="#cta"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-xl transition-all duration-500 hover:border-[rgba(212,175,55,0.45)] hover:bg-[rgba(212,175,55,0.08)] hover:-translate-y-1"
                >
                  Book a Session
                </a>
              </motion.div>

              {/* Stats row */}
              <motion.div variants={fadeInUp} className="mt-14 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
                {heroStats.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-full border border-white/10 bg-[rgba(10,11,30,0.55)] px-5 py-3 backdrop-blur-xl"
                    >
                      <Icon className="h-4 w-4 text-[#D4AF37]/70 shrink-0" />
                      <span className="font-display text-[1.3rem] font-bold text-[#D4AF37] leading-none">{item.value}</span>
                      <span className="text-[11px] text-[rgba(229,226,225,0.65)] tracking-wide">{item.label}</span>
                      {i < heroStats.length - 1 && (
                        <span className="hidden sm:block ml-2 h-3 w-px bg-white/15" />
                      )}
                    </div>
                  )
                })}
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[rgba(229,226,225,0.4)]">Scroll</span>
            <div className="relative h-10 w-px overflow-hidden bg-white/10">
              <div className="scroll-caret absolute inset-x-0 top-0 h-1/2 bg-[#D4AF37]" />
            </div>
          </div>
        </section>

        <section id="experience" className="relative py-12">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.03),transparent)]" />
          <div className="marquee-shell border-y border-white/10 bg-[rgba(10,11,30,0.4)] py-5 backdrop-blur-[18px]">
            <div className="marquee-track flex min-w-max items-center gap-8">
              {[...signalWords, ...signalWords, ...signalWords].map((word, index) => (
                <div key={`${word}-${index}`} className="flex items-center gap-8">
                  <span className="text-[12px] font-bold uppercase tracking-[0.35em] text-[var(--color-primary)]/90 drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">
                    {word}
                  </span>
                  <Star className="h-3 w-3 text-white/30" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="featured" className="relative px-6 py-24 md:px-10 lg:px-12">
          <div id="offerings" className="absolute -top-32" />
          <div className="mx-auto grid max-w-[1280px] gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="max-w-[32rem]"
            >
              <SectionEyebrow>Featured Service</SectionEyebrow>
              <h2 className="mt-7 font-display text-[2.8rem] leading-[0.96] tracking-[-0.04em] text-white md:text-[4.4rem] font-bold">
                Construction, Factory and Land Vastu
                <span className="mt-2 block text-[rgba(229,226,225,0.56)] font-medium italic">complete on-site industrial guidance.</span>
              </h2>
              <p className="mt-7 text-[1.05rem] leading-[1.9] text-[color:rgba(229,226,225,0.78)] font-light">
                This featured section presents your most detailed Vastu visit for factories, land and industrial setups, including layout, flow, energy balance and directional planning.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                {['Factory Vastu', 'Land Audit', 'Production Flow', '5 Elements'].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/10 bg-[rgba(10,11,30,0.54)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-on-surface-variant)]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="relative">
              <div className="service-orbit absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8" />
              <div className="service-orbit-reverse absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(212,175,55,0.18)]" />
              <div className="relative rounded-[2rem] border border-[rgba(212,175,55,0.2)] bg-[linear-gradient(160deg,rgba(10,11,30,0.88),rgba(10,11,30,0.58))] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-[28px]">
                <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_26%,rgba(255,255,255,0.01)_100%)]" />
                <div className="relative overflow-hidden rounded-[1.5rem]">
                  <img src="/hero_section.png" alt="Featured service backdrop" className="h-[16rem] w-full object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.1)_0%,rgba(5,5,5,0.32)_45%,rgba(5,5,5,0.88)_100%)]" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/12 bg-[rgba(5,5,5,0.45)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-on-surface-variant)] backdrop-blur-xl">
                    Industrial visit
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 rounded-[1.25rem] border border-white/10 bg-[rgba(5,5,5,0.58)] p-5 backdrop-blur-[18px]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">Construction / Factory / Land Vastu</p>
                    <p className="mt-2 font-display text-[1.8rem] leading-tight text-white">Complete industrial energy mapping and placement guidance.</p>
                  </div>
                </div>
                <div className="relative px-4 pb-4 pt-5 md:px-6 md:pb-6">
                  <ServiceCard service={featuredService} featured />
                </div>
              </div>
            </div>
          </div>
        </section>

        <ServiceSection
          id="vastu"
          title={categoryMeta.vastu.title}
          copy={categoryMeta.vastu.copy}
          services={vastuServices}
          icon={categoryMeta.vastu.icon}
        />
        <ServiceSection
          id="tarot"
          title={categoryMeta.tarot.title}
          copy={categoryMeta.tarot.copy}
          services={tarotServices}
          icon={categoryMeta.tarot.icon}
        />
        <ServiceSection
          id="numerology"
          title={categoryMeta.numerology.title}
          copy={categoryMeta.numerology.copy}
          services={numerologyServices}
          icon={categoryMeta.numerology.icon}
        />

        <section id="cta" className="relative px-6 pb-32 pt-20 md:px-10 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="group relative mx-auto max-w-[1280px] overflow-hidden rounded-[2.5rem] border border-[rgba(212,175,55,0.25)] bg-[linear-gradient(160deg,rgba(12,14,35,0.95),rgba(5,5,5,0.98))] px-8 py-16 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-[32px] transition-colors duration-500 hover:border-[rgba(212,175,55,0.4)] md:px-16 md:py-20"
          >
            <div className="absolute right-[-10rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.2)_0%,rgba(212,175,55,0)_72%)] opacity-60 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
            <div className="absolute bottom-[-5rem] left-[-5rem] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(99,32,238,0.15)_0%,rgba(212,175,55,0)_72%)] blur-3xl opacity-50" />

            <div className="relative z-10 flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-[46rem]">
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                  <Star className="h-3 w-3" />
                  Service Selection
                </p>
                <h2 className="mt-6 font-display text-[3.2rem] leading-[0.95] tracking-[-0.04em] text-white md:text-[4.8rem] font-bold">
                  Choose the right consultation.
                  <span className="mt-2 block text-[rgba(229,226,225,0.55)] font-medium italic">Vastu, tarot or numerology.</span>
                </h2>
                <p className="mt-8 max-w-[40rem] text-[1.1rem] leading-[1.9] text-[color:rgba(229,226,225,0.76)] font-light">
                  Browse the featured industrial Vastu service first, then continue through home and office Vastu, tarot readings and courses, and numerology reports and consultations.
                </p>
              </div>

              <div className="flex flex-col gap-5 sm:flex-row shadow-2xl">
                <a
                  href="#featured"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(180deg,#f2ca50_0%,#d4af37_100%)] px-9 py-5 text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--color-on-primary)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(212,175,55,0.4)]"
                >
                  <span className="relative z-10">Start With Featured</span>
                  <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-500 group-hover:translate-y-0" />
                </a>
                <a
                  href="#numerology"
                  className="group inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-9 py-5 text-[13px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(212,175,55,0.4)] hover:bg-[rgba(212,175,55,0.08)] hover:text-[var(--color-primary)]"
                >
                  <span className="mr-2">Explore All Services</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* ─── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="relative border-t border-white/8 bg-[rgba(5,5,5,0.98)] px-6 pt-16 pb-8 md:px-10 lg:px-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.4),transparent)]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[18rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] blur-3xl" />

        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

            {/* Brand column */}
            <div className="lg:col-span-2">
              <a href="#top" className="font-display text-[2rem] font-bold tracking-[-0.04em] text-[var(--color-primary)]">
                Make My Bhagya<span className="text-[var(--color-primary)]/30">.</span>
              </a>
              <p className="mt-4 max-w-[28rem] text-[0.95rem] leading-[1.9] text-[color:rgba(229,226,225,0.6)] font-light">
                Professional Vastu, Tarot and Numerology consultation services. Every service is listed with clear pricing and a focused summary so you can choose the right guidance easily.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a href="tel:+91" className="inline-flex items-center gap-3 text-sm text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors duration-300">
                  <Phone className="h-4 w-4 shrink-0 text-[var(--color-primary)]/60" />
                  <span>+91 — Contact for appointment</span>
                </a>
                <a href="mailto:info@makemybhagya.com" className="inline-flex items-center gap-3 text-sm text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors duration-300">
                  <Mail className="h-4 w-4 shrink-0 text-[var(--color-primary)]/60" />
                  <span>info@makemybhagya.com</span>
                </a>
                <span className="inline-flex items-center gap-3 text-sm text-[var(--color-on-surface-variant)]">
                  <MapPin className="h-4 w-4 shrink-0 text-[var(--color-primary)]/60" />
                  <span>India — Online &amp; On-site visits available</span>
                </span>
              </div>
            </div>

            {/* Services column */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--color-primary)] mb-5">Services</p>
              <ul className="flex flex-col gap-3">
                {[
                  { label: 'Vastu Services', href: '#vastu' },
                  { label: 'Tarot Readings', href: '#tarot' },
                  { label: 'Tarot Courses', href: '#tarot' },
                  { label: 'Numerology Reports', href: '#numerology' },
                  { label: 'Compatibility Matching', href: '#numerology' },
                  { label: 'Life Path Prediction', href: '#numerology' },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[color:rgba(229,226,225,0.65)] hover:text-[var(--color-primary)] transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="h-px w-4 bg-[var(--color-primary)]/30 group-hover:w-6 group-hover:bg-[var(--color-primary)] transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links column */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--color-primary)] mb-5">Quick Links</p>
              <ul className="flex flex-col gap-3">
                {[
                  { label: 'Featured Service', href: '#featured' },
                  { label: 'About Vastu', href: '#vastu' },
                  { label: 'About Tarot', href: '#tarot' },
                  { label: 'About Numerology', href: '#numerology' },
                  { label: 'Book a Session', href: '#cta' },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[color:rgba(229,226,225,0.65)] hover:text-[var(--color-primary)] transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="h-px w-4 bg-[var(--color-primary)]/30 group-hover:w-6 group-hover:bg-[var(--color-primary)] transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row">
            <p className="text-[11px] text-[color:rgba(229,226,225,0.38)] tracking-[0.08em]">
              © {new Date().getFullYear()} Make My Bhagya. All rights reserved.
            </p>
            <p className="text-[11px] text-[color:rgba(229,226,225,0.38)] tracking-[0.08em]">
              Vastu · Tarot · Numerology
            </p>
          </div>
        </div>
      </footer>

      {/* ─── BACK TO TOP ─────────────────────────────────────────────────────── */}
      <a
        href="#top"
        aria-label="Back to top"
        className="fixed bottom-8 right-8 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(212,175,55,0.35)] bg-[rgba(8,10,22,0.8)] text-[var(--color-primary)] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] hover:shadow-[0_0_24px_rgba(212,175,55,0.4)] transition-all duration-300 hover:-translate-y-1"
      >
        <ChevronUp className="h-4 w-4" />
      </a>
    </div>
  )
}

export default App
