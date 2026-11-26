import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { FaInstagram, FaYoutube, FaLinkedinIn, FaWhatsapp, FaDiscord } from 'react-icons/fa6'
import { faqs, footerCols, socials } from '../data/content'
import { Logo, MaskLines, Reveal, EASE } from './ui'

/* ---------------- Community ---------------- */
export function Community() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const sunY = useTransform(scrollYProgress, [0, 1], [-80, 80])

  return (
    <section className="py-28">
      <div className="container-x">
        <Reveal>
          <div ref={ref} className="relative grid items-center gap-10 overflow-hidden rounded-[28px] border border-line bg-card px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-[1.2fr_1fr]">
            <motion.div className="sun grain absolute -right-28 -top-28 size-[380px] rounded-full" style={{ y: sunY }} />
            <div className="relative">
              <span className="kicker">Community</span>
              <h2 className="h2"><MaskLines lines={['Connect with', 'other learners.']} /></h2>
              <p className="mt-4 max-w-[480px] text-muted">Join the EndSpell community to meet curious people, learn by doing and turn ideas into real projects.</p>
            </div>
            <div className="relative flex flex-wrap gap-3 lg:justify-end">
              <a href="#" className="btn btn-light btn-lg">Join community <span className="arrow">↗</span></a>
              <a href="/contact" className="btn btn-line btn-lg">Become a mentor</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- CTA + FAQ ---------------- */
function FaqItem({ f, open, onToggle }) {
  return (
    <div className="border-b border-[#cfcabf]">
      <button onClick={onToggle} aria-expanded={open} className="flex w-full items-center justify-between gap-5 py-6 text-left text-[1.08rem] font-medium text-ink">
        {f.q}
        <span className={`relative size-[34px] shrink-0 rounded-full border transition-colors duration-300 ${open ? 'border-brand bg-brand' : 'border-[#bdb8ad]'}`}>
          <span className={`absolute left-1/2 top-1/2 h-[1.5px] w-3 -translate-x-1/2 -translate-y-1/2 ${open ? 'bg-white' : 'bg-ink'}`} />
          <motion.span
            className={`absolute left-1/2 top-1/2 h-[1.5px] w-3 -translate-x-1/2 -translate-y-1/2 ${open ? 'bg-white' : 'bg-ink'}`}
            animate={{ rotate: open ? 0 : 90 }}
            transition={{ duration: 0.3 }}
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-12 leading-relaxed text-[#55514a]">{f.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function CtaFaq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="contact" className="bg-paper text-ink">
      <div className="container-x pb-16 pt-28 text-center">
        <Reveal y={20}><span className="kicker" style={{ color: '#6f6b63' }}>Start today</span></Reveal>
        <h2 className="h2 text-[length:clamp(3.4rem,10vw,9rem)]">
          <MaskLines lines={['Continue your', <span className="text-brand">learning journey</span>]} />
        </h2>
        <Reveal delay={0.2}>
          <p className="mx-auto mb-8 mt-5 max-w-[520px] text-[#5f5b53]">Log in to continue your course, or join a new batch and start building today.</p>
          <a href="/login" className="btn btn-dark btn-lg">Log in <span className="arrow">↗</span></a>
        </Reveal>
      </div>

      <div id="faq" className="container-x grid gap-14 border-t border-[#cfcabf] pb-28 pt-16 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <h2 className="h2 text-[length:clamp(4rem,9vw,8rem)]"><MaskLines lines={['FAQs']} /></h2>
          <Reveal delay={0.1}>
            <p className="mt-4 text-[#5f5b53]">Can't find your answer? <a href="/contact" className="text-brand underline">Talk to our team</a>.</p>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          {faqs.map((f, i) => (
            <FaqItem key={i} f={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- Footer ---------------- */
const socialIcons = [
  ['instagram', FaInstagram], ['youtube', FaYoutube], ['linkedin', FaLinkedinIn], ['whatsapp', FaWhatsapp], ['discord', FaDiscord],
]

export function Footer() {
  const word = 'EndSpell'.split('')
  const wordRef = useRef(null)
  const wordSeen = useInView(wordRef, { once: true, margin: '0px 0px -40px 0px' })
  return (
    <footer className="overflow-hidden bg-ink pt-20">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="col-span-2 lg:col-span-1">
            <Logo />
            <div className="display my-4 text-[2.6rem] leading-[.9]">Learn. Build.<br /><span className="text-brand">Grow.</span></div>
            <p className="mb-5 max-w-[280px] text-sm text-muted">Practical, project-based courses with mentor support — built to get you job-ready.</p>
            <div className="flex flex-wrap gap-2.5">
              {socialIcons.map(([k, Icon]) => (
                <a key={k} href={socials[k]} aria-label={k} className="grid size-[42px] place-items-center rounded-xl border border-line bg-card transition-colors hover:border-brand hover:bg-brand">
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>
          {footerCols.map((col) => (
            <div key={col.title}>
              <h5 className="mb-4 text-[.72rem] font-medium uppercase tracking-[.14em] text-muted">{col.title}</h5>
              {col.links.map(([l, h]) => (
                <a key={l} href={h} className="mb-2.5 block text-[.92rem] text-[#d6d2ca] transition-colors hover:text-brand-2">{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap justify-between gap-3 border-t border-line py-5 text-sm text-muted">
          <span>© {new Date().getFullYear()} EndSpell. All rights reserved.</span>
          <span>Made in India</span>
        </div>
      </div>

      <div ref={wordRef} aria-hidden="true" className="display flex select-none justify-center overflow-hidden text-[length:clamp(5rem,24vw,24rem)] leading-[.78] text-brand">
        {word.map((ch, i) => (
          <motion.span
            key={i}
            initial={{ y: '100%' }}
            animate={{ y: wordSeen ? '0%' : '100%' }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.05 }}
            className="inline-block"
          >
            {ch}
          </motion.span>
        ))}
      </div>
    </footer>
  )
}
