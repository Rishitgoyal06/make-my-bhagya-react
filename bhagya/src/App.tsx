import './App.css'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Star, Sparkles, Clock, Compass, Orbit, Moon, Map as MapIcon, ArrowRight, Quote } from 'lucide-react'

const navigation = ['Experience', 'Offerings', 'Method', 'Voices']

const heroStats = [
  { value: '12K+', label: 'Charts interpreted', icon: Star },
  { value: '4.9/5', label: 'Client satisfaction', icon: Sparkles },
  { value: '24h', label: 'Core reading delivery', icon: Clock },
]

const signalWords = ['Natal Intelligence', 'Luxury Ritual', 'Transit Clarity', 'Modern Mysticism', 'High Contrast']

const offerings = [
  {
    name: 'Birth Chart Signature',
    tag: 'Flagship Reading',
    blurb:
      'A fully articulated cosmic portrait with strengths, timing patterns, emotional wiring, and life direction.',
    shape: 'large',
    icon: Compass,
  },
  {
    name: 'Synastry Studio',
    tag: 'For Partners',
    blurb:
      'Designed for relationship dynamics, compatibility mapping, and communication insight without vague fluff.',
    shape: 'small',
    icon: Orbit,
  },
  {
    name: 'Transit Forecast',
    tag: 'For Timing',
    blurb:
      'Pinpoint when to launch, pause, commit, or recalibrate using current planetary movement with practical context.',
    shape: 'small',
    icon: Moon,
  },
  {
    name: 'Year Ahead Atlas',
    tag: 'For Planning',
    blurb:
      'A high-level annual roadmap that turns your upcoming cycles into a confident strategic overview.',
    shape: 'wide',
    icon: MapIcon,
  },
]

const methodSteps = [
  {
    number: '01',
    title: 'Decode the birth pattern',
    copy: 'We begin with exact birth data and your present question so the reading opens with precision rather than generality.',
  },
  {
    number: '02',
    title: 'Shape the insight around your season',
    copy: 'The interpretation is framed around what matters now: relationships, identity shifts, ambition, timing, or recovery.',
  },
  {
    number: '03',
    title: 'Deliver something you can actually use',
    copy: 'The final output feels cinematic and elevated, but it stays grounded enough to guide real decisions.',
  },
]

const voiceCards = [
  {
    quote: 'It feels like a boutique observatory, not another astrology template. The whole experience has taste.',
    person: 'Aarohi Mehta',
    role: 'Founder, Mumbai',
  },
  {
    quote: 'The design pulled me in, but the real win was how clearly the reading translated complexity into action.',
    person: 'Neel Khanna',
    role: 'Product Lead, Bengaluru',
  },
]

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

function App() {
  const { scrollYProgress } = useScroll();
  const heroImageY = useTransform(scrollYProgress, [0, 0.3], [0, 50]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
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
            Bhagya<span className="text-[var(--color-primary)]/40">.</span>
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

          <a
            href="#cta"
            className="group inline-flex items-center gap-2 justify-center rounded-full border border-[rgba(212,175,55,0.35)] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)] transition-all duration-500 hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] hover:shadow-[0_0_35px_rgba(212,175,55,0.35)] hover:scale-105"
          >
            <span>Book Session</span>
            <ArrowRight className="h-3 w-3 opacity-0 -ml-4 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0" />
          </a>
        </header>
      </motion.div>

      <main id="top">
        <section className="relative isolate px-6 pb-20 pt-40 md:px-10 lg:px-12">
          <div className="mx-auto grid max-w-[1280px] gap-16 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative z-10"
            >
              <SectionEyebrow>Editorial Cosmic Interface</SectionEyebrow>
              <div className="mt-7 max-w-[44rem]">
                <motion.p variants={fadeInUp} className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-primary)] drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]">
                  Mystical Noir, sharpened
                </motion.p>
                <motion.h1 variants={fadeInUp} className="mt-4 font-display text-[3.8rem] font-bold leading-[0.92] tracking-[-0.055em] text-white sm:text-[5.5rem] lg:text-[7.2rem]">
                  Fate,
                  <span className="block pl-[0.2em] text-transparent bg-clip-text bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(255,255,255,0.2))]">made</span>
                  <span className="block bg-[linear-gradient(135deg,#fff1ba_0%,#d4af37_40%,#f9e498_100%)] bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(212,175,55,0.25)]">
                    unforgettable.
                  </span>
                </motion.h1>
              </div>

              <motion.div variants={fadeInUp} className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <p className="max-w-[34rem] text-[1.05rem] leading-[2.1] text-[color:rgba(229,226,225,0.84)] md:text-[1.12rem] font-light">
                  This version of Bhagya leans into drama, asymmetry, and premium contrast so the website feels like an experience. It should catch the eye instantly, then hold trust through absolute clarity.
                </p>
                <div className="group rounded-[1.6rem] border border-white/10 bg-[rgba(10,11,30,0.5)] p-6 backdrop-blur-[24px] transition-all duration-500 hover:border-[rgba(212,175,55,0.3)] hover:bg-[rgba(10,11,30,0.7)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.1)]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)] flex items-center gap-2">
                    <Sparkles className="h-3 w-3" />
                    Tonight&apos;s Alignment
                  </p>
                  <p className="mt-3 font-display text-[1.75rem] leading-tight text-white transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                    Build presence before explanation.
                  </p>
                  <p className="mt-3 text-sm leading-[1.8] text-[color:rgba(229,226,225,0.72)] font-light">
                    Strong forms, layered depth, and restrained gold accents keep the page luxurious instead of loud.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-10 flex flex-col gap-5 sm:flex-row shadow-2xl">
                <a
                  href="#experience"
                  className="group relative overflow-hidden inline-flex items-center justify-center rounded-full bg-[linear-gradient(180deg,#f2ca50_0%,#d4af37_100%)] px-8 py-4.5 text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--color-on-primary)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(212,175,55,0.45)]"
                >
                  <span className="relative z-10">Enter The Experience</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                </a>
                <a
                  href="#offerings"
                  className="group inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--color-on-surface)] backdrop-blur-xl transition-all duration-500 hover:border-[rgba(212,175,55,0.4)] hover:bg-[rgba(212,175,55,0.08)] hover:-translate-y-1"
                >
                  <span className="mr-2">Explore Services</span>
                  <ArrowRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-2" />
                </a>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-14 grid gap-5 sm:grid-cols-3">
                {heroStats.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div variants={fadeInUp} key={item.label} className="group relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-[rgba(10,11,30,0.48)] p-6 backdrop-blur-[22px] transition-all duration-500 hover:border-[rgba(212,175,55,0.25)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)]">
                      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[var(--color-primary)]/10 blur-2xl transition-all duration-500 group-hover:bg-[var(--color-primary)]/20 group-hover:scale-150" />
                      <Icon className="h-5 w-5 text-[var(--color-primary)]/70 mb-3 transition-colors duration-300 group-hover:text-[var(--color-primary)]" />
                      <p className="font-display text-[2.2rem] leading-none text-[var(--color-primary)] drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] font-bold">{item.value}</p>
                      <p className="mt-3 text-sm leading-6 text-[color:rgba(229,226,225,0.72)] group-hover:text-white transition-colors duration-300">{item.label}</p>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>

            <motion.div 
              style={{ y: heroImageY }}
              className="relative z-10 min-h-[52rem] hidden xl:block"
            >
              <div className="hero-ring absolute left-1/2 top-[46%] h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 shadow-[inset_0_0_60px_rgba(255,255,255,0.02)]" />
              <div className="hero-ring-reverse absolute left-1/2 top-[46%] h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(212,175,55,0.25)] shadow-[0_0_40px_rgba(212,175,55,0.05)]" />
              <div className="hero-dotted absolute left-1/2 top-[46%] h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10" />

              <motion.div 
                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 1 }}
                className="absolute left-[2%] top-[2%] w-[48%] rounded-[1.6rem] border border-[rgba(212,175,55,0.22)] bg-[rgba(10,11,30,0.68)] p-6 backdrop-blur-[24px] shadow-[0_20px_70px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_70px_rgba(212,175,55,0.15)] transition-shadow duration-500"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)] flex items-center gap-2">
                  <Star className="h-3 w-3" />
                  Signal
                </p>
                <p className="mt-3 font-display text-[1.4rem] leading-tight text-white font-medium">Every surface is tuned for drama without losing legibility.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
                className="group absolute right-[0%] top-[14%] w-[62%] overflow-hidden rounded-[2.2rem] border border-white/15 bg-[rgba(10,11,30,0.55)] p-3 backdrop-blur-[35px] shadow-[0_30px_100px_rgba(0,0,0,0.55)] flex flex-col gap-3"
              >
                <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04)_30%,rgba(255,255,255,0.01)_100%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative overflow-hidden rounded-[1.7rem]">
                  <img src="/hero_section.png" alt="Cosmic hero background" className="h-[20rem] w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(5,5,5,0.1)_40%,rgba(5,5,5,0.5)_100%)] pointer-events-none" />
                  <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-4">
                    <div className="rounded-full border border-white/15 bg-[rgba(5,5,5,0.45)] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-on-surface-variant)] backdrop-blur-xl transition-colors duration-300 group-hover:border-white/30">
                      Celestial Preview
                    </div>
                    <div className="twinkle rounded-full border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.15)] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--color-primary)] shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                      Live Contrast
                    </div>
                  </div>
                </div>
                <div className="relative z-10 w-full rounded-[1.5rem] border border-white/10 bg-[rgba(10,11,30,0.6)] p-6 backdrop-blur-[24px] transition-all duration-500 group-hover:border-[rgba(212,175,55,0.25)] group-hover:bg-[rgba(10,11,30,0.8)] xl:p-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">Featured Insight</p>
                  <p className="mt-2 font-display text-[1.8rem] leading-tight text-white font-medium xl:text-[2rem]">
                    The stars should feel magnetic before a single word is read.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1 }}
                className="absolute bottom-[10%] left-[8%] w-[36%] overflow-hidden rounded-[1.8rem] border border-white/15 bg-[rgba(10,11,30,0.7)] p-3 backdrop-blur-[28px] shadow-[0_20px_85px_rgba(0,0,0,0.5)] group"
              >
                <img src="/about_section1.png" alt="Reading interface" className="h-[15rem] w-full rounded-[1.2rem] object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-[-12%] right-[-10%] w-[38%] rounded-[1.6rem] border border-[rgba(212,175,55,0.22)] bg-[rgba(10,11,30,0.78)] p-6 backdrop-blur-[26px] shadow-[0_20px_85px_rgba(0,0,0,0.4)]"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">Focus Window</p>
                <p className="mt-3 text-sm leading-[1.8] text-[color:rgba(229,226,225,0.76)] font-light">
                  Gold is used as a guided pulse, not a floodlight. That single decision makes the whole page feel more expensive and deliberate.
                </p>
              </motion.div>
            </motion.div>
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

        <section id="offerings" className="relative px-6 py-32 md:px-10 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
            >
              <div className="max-w-[44rem]">
                <SectionEyebrow>Offerings</SectionEyebrow>
                <motion.h2 variants={fadeInUp} className="mt-7 font-display text-[2.8rem] leading-[0.98] tracking-[-0.04em] text-white md:text-[4.5rem] font-bold">
                  Not a card grid.
                  <span className="block text-[rgba(229,226,225,0.56)] font-normal italic mt-2">A celestial showroom.</span>
                </motion.h2>
              </div>
              <motion.p variants={fadeInUp} className="max-w-[28rem] text-[1.05rem] leading-[1.9] text-[color:rgba(229,226,225,0.78)] font-light">
                The services now sit in a bento-style composition so the section feels more editorial and far less template-driven. Each holds its own energy.
              </motion.p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid gap-6 lg:grid-cols-12 lg:grid-rows-[repeat(2,minmax(240px,1fr))]"
            >
              {offerings.map((item) => {
                const layoutClass =
                  item.shape === 'large'
                    ? 'lg:col-span-7 lg:row-span-2'
                    : item.shape === 'wide'
                      ? 'lg:col-span-5'
                      : 'lg:col-span-5'
                
                const Icon = item.icon;

                return (
                  <motion.article
                    variants={fadeInUp}
                    key={item.name}
                    className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,11,30,0.8),rgba(10,11,30,0.45))] p-8 backdrop-blur-[32px] transition-all duration-500 hover:-translate-y-2 hover:border-[rgba(212,175,55,0.3)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${layoutClass}`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.15),transparent_40%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute top-0 right-0 p-8 opacity-10 transition-all duration-500 group-hover:opacity-30 group-hover:scale-110 group-hover:rotate-12">
                      <Icon className="w-32 h-32 text-[var(--color-primary)]" />
                    </div>
                    
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="flex items-center gap-3">
                        <span className="p-2.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] backdrop-blur-md group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-on-primary)] transition-colors duration-300">
                          <Icon className="h-4 w-4" />
                        </span>
                        <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[var(--color-primary)] drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">{item.tag}</p>
                      </div>
                      <h3 className="mt-6 font-display text-[2.2rem] leading-[1.1] text-white md:text-[2.8rem] font-bold group-hover:text-[var(--color-primary)] transition-colors duration-300">
                        {item.name}
                      </h3>
                      <p className="mt-5 max-w-[32rem] text-[1.05rem] leading-[1.8] text-[color:rgba(229,226,225,0.78)] font-light">
                        {item.blurb}
                      </p>
                      <div className="mt-auto pt-10">
                        <div className="h-px w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.05),rgba(212,175,55,0.5),rgba(255,255,255,0.05))] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="mt-5 flex items-center justify-between">
                          <p className="text-sm leading-7 text-[var(--color-on-surface-variant)] transition-colors group-hover:text-white">
                            Structured for depth and clarity.
                          </p>
                          <ArrowRight className="h-4 w-4 text-[var(--color-primary)] opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                        </div>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          </div>
        </section>

        <section id="method" className="relative px-6 py-32 md:px-10 lg:px-12 bg-[rgba(5,5,5,0.4)] border-t border-[rgba(212,175,55,0.05)]">
          <div className="mx-auto grid max-w-[1280px] gap-16 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <SectionEyebrow>Method</SectionEyebrow>
              <motion.h2 variants={fadeInUp} className="mt-7 font-display text-[2.8rem] leading-[0.98] tracking-[-0.04em] text-white md:text-[4.2rem] font-bold">
                A ritualized flow with enough visual tension to feel <span className="text-[var(--color-primary)] italic font-medium">alive.</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="mt-7 max-w-[34rem] text-[1.05rem] leading-[1.9] text-[color:rgba(229,226,225,0.78)] font-light">
                Instead of another neat checklist, the process section now reads like a sequence of reveals. It keeps the eye moving and gives the site more personality.
              </motion.p>

              <motion.div variants={fadeInUp} className="mt-12 group rounded-[1.8rem] border border-[rgba(212,175,55,0.22)] bg-[linear-gradient(180deg,rgba(10,11,30,0.75),rgba(10,11,30,0.48))] p-8 backdrop-blur-[30px] hover:shadow-[0_15px_50px_rgba(212,175,55,0.1)] transition-shadow duration-500">
                <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[var(--color-primary)] flex items-center gap-2">
                  <Orbit className="h-4 w-4" />
                  Design Notes
                </p>
                <ul className="mt-6 space-y-5">
                  {[
                    "Heavy contrast stays intact even with richer layering.",
                    "Asymmetry creates energy without making the page chaotic.",
                    "Motion is slow and atmospheric, not gimmicky."
                  ].map((note, i) => (
                    <li key={i} className="flex items-start gap-4 text-[0.95rem] leading-[1.7] text-[color:rgba(229,226,225,0.8)]">
                      <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                      {note}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            <div className="relative grid gap-6">
              <div className="absolute left-[38px] top-10 bottom-10 w-[2px] bg-[linear-gradient(180deg,rgba(212,175,55,0),rgba(212,175,55,0.2)_20%,rgba(212,175,55,0.2)_80%,rgba(212,175,55,0))] hidden md:block" />
              
              {methodSteps.map((step, index) => (
                <motion.article
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
                  key={step.number}
                  className={`group relative rounded-[2rem] border border-white/10 p-8 backdrop-blur-[26px] transition-all duration-500 hover:-translate-y-2 hover:border-[rgba(212,175,55,0.3)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] ${
                    index === 1
                      ? 'bg-[linear-gradient(180deg,rgba(212,175,55,0.08),rgba(10,11,30,0.76))] md:translate-x-12'
                      : index === 2
                        ? 'bg-[rgba(10,11,30,0.6)] md:-translate-x-4'
                        : 'bg-[rgba(10,11,30,0.6)]'
                  }`}
                >
                  <div className="absolute inset-y-8 left-0 w-[2px] bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(212,175,55,0.8),rgba(255,255,255,0))] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="flex items-center gap-5 mb-5 mt-2">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)] text-[1.2rem] font-display font-bold text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-on-primary)] transition-colors duration-500">
                      {step.number}
                    </div>
                    <div className="h-px w-16 bg-[rgba(212,175,55,0.3)] group-hover:w-24 group-hover:bg-[var(--color-primary)] transition-all duration-500" />
                  </div>
                  
                  <h3 className="max-w-[14ch] font-display text-[2.1rem] leading-tight text-white md:text-[2.6rem] font-bold group-hover:text-[var(--color-primary)] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="mt-5 max-w-[34rem] text-[1.05rem] leading-[1.8] text-[color:rgba(229,226,225,0.78)] font-light">{step.copy}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="voices" className="relative px-6 py-32 md:px-10 lg:px-12">
          <div className="mx-auto grid max-w-[1280px] gap-12 xl:grid-cols-[0.8fr_1.2fr]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-[34rem]"
            >
              <SectionEyebrow>Client Voices</SectionEyebrow>
              <h2 className="mt-7 font-display text-[2.8rem] leading-[0.98] tracking-[-0.04em] text-white md:text-[4.2rem] font-bold">
                Proof, but staged like a <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#fff1ba_0%,#d4af37_100%)]">feature spread.</span>
              </h2>
              <p className="mt-7 text-[1.05rem] leading-[1.9] text-[color:rgba(229,226,225,0.78)] font-light">
                Testimonials should still reassure, but they do not need to look ordinary. Here they become part of the visual identity. Heavy typography and luxurious spacing.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
              {voiceCards.map((item, index) => (
                <motion.blockquote
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  key={item.person}
                  className={`group relative overflow-hidden rounded-[2rem] border border-white/10 p-9 backdrop-blur-[28px] hover:border-[rgba(212,175,55,0.3)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:-translate-y-2 ${
                    index === 0
                      ? 'bg-[linear-gradient(180deg,rgba(10,11,30,0.76),rgba(10,11,30,0.48))] md:translate-y-12'
                      : 'bg-[linear-gradient(180deg,rgba(212,175,55,0.08),rgba(10,11,30,0.7))]'
                  }`}
                >
                  <Quote className="absolute right-6 top-6 h-16 w-16 text-white/5 group-hover:text-[var(--color-primary)]/10 transition-colors duration-500 group-hover:scale-110 group-hover:-rotate-12" />
                  <p className="relative z-10 font-display text-[1.8rem] leading-[1.45] text-white/95 group-hover:text-white transition-colors duration-300">
                    "{item.quote}"
                  </p>
                  <footer className="relative z-10 mt-10 border-t border-white/10 pt-6 group-hover:border-[rgba(212,175,55,0.3)] transition-colors duration-500">
                    <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">{item.person}</p>
                    <p className="mt-2 text-sm leading-6 text-[color:rgba(229,226,225,0.65)] italic">{item.role}</p>
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="relative px-6 pb-32 pt-20 md:px-10 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="mx-auto max-w-[1280px] overflow-hidden rounded-[2.5rem] border border-[rgba(212,175,55,0.25)] bg-[linear-gradient(160deg,rgba(12,14,35,0.95),rgba(5,5,5,0.98))] px-8 py-16 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-[32px] md:px-16 md:py-20 relative group hover:border-[rgba(212,175,55,0.4)] transition-colors duration-500"
          >
            <div className="absolute right-[-10rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.2)_0%,rgba(212,175,55,0)_72%)] blur-3xl group-hover:opacity-100 opacity-60 transition-opacity duration-700" />
            <div className="absolute left-[-5rem] bottom-[-5rem] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(99,32,238,0.15)_0%,rgba(212,175,55,0)_72%)] blur-3xl opacity-50" />
            
            <div className="relative z-10 flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-[46rem]">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] flex items-center gap-2 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                  <Star className="h-3 w-3" />
                  Final Frame
                </p>
                <h2 className="mt-6 font-display text-[3.2rem] leading-[0.95] tracking-[-0.04em] text-white md:text-[4.8rem] font-bold">
                  Eye-catching first.
                  <span className="block text-[rgba(229,226,225,0.55)] mt-2 font-medium italic">Professional all the way through.</span>
                </h2>
                <p className="mt-8 text-[1.1rem] leading-[1.9] text-[color:rgba(229,226,225,0.76)] font-light max-w-[40rem]">
                  The restructure pushes Bhagya away from “basic landing page” territory and into something more cinematic, layered, and memorable while still respecting the absolute contrast and palette rules from `DESIGN.md`.
                </p>
              </div>

              <div className="flex flex-col gap-5 sm:flex-row shadow-2xl">
                <a
                  href="#top"
                  className="group relative overflow-hidden inline-flex items-center justify-center rounded-full bg-[linear-gradient(180deg,#f2ca50_0%,#d4af37_100%)] px-9 py-5 text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--color-on-primary)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(212,175,55,0.4)]"
                >
                  <span className="relative z-10">Revisit Hero</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                </a>
                <a
                  href="#offerings"
                  className="group inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-9 py-5 text-[13px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-xl transition-all duration-500 hover:border-[rgba(212,175,55,0.4)] hover:text-[var(--color-primary)] hover:bg-[rgba(212,175,55,0.08)] hover:-translate-y-1"
                >
                  <span className="mr-2">Review Layout</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}

export default App
