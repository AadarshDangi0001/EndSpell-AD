import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  animate, motion, useMotionTemplate, useMotionValue, useScroll, useTransform,
} from 'framer-motion'
import { SiReact, SiPython, SiFigma, SiMeta } from 'react-icons/si'
import { heroMeta } from '../data/content'
import { EASE } from './ui'

/* Headline lines. `inverse` = colours used where the text sits on the orange sun */
const LINES = [
  [{ t: 'Learn skills', c: 'text-cream', ci: 'text-ink' }],
  [{ t: 'By ', c: 'text-cream', ci: 'text-ink' }, { t: 'building', c: 'text-brand', ci: 'text-cream' }],
  [{ t: 'Real things', c: 'text-outline-brand', ci: 'text-outline-ink' }],
]

function Headline({ inverse = false }) {
  return (
    <>
      {LINES.map((parts, i) => (
        <span key={i} className="block overflow-hidden pt-[0.02em] pb-[0.03em]">
          <motion.span
            className="block whitespace-nowrap"
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.15 + i * 0.12 }}
          >
            {parts.map((p, j) => (
              <span key={j} className={inverse ? p.ci : p.c}>{p.t}</span>
            ))}
          </motion.span>
        </span>
      ))}
    </>
  )
}

function useIstClock() {
  const fmt = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' })
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 10000)
    return () => clearInterval(id)
  }, [])
  return t
}

const tracks = [
  { label: 'Development', icon: SiReact },
  { label: 'Data & AI', icon: SiPython },
  { label: 'Design', icon: SiFigma },
  { label: 'Marketing', icon: SiMeta },
]

export default function Hero() {
  const boxRef = useRef(null)
  const [box, setBox] = useState({ w: 0, h: 0 })
  const time = useIstClock()

  useLayoutEffect(() => {
    const el = boxRef.current
    if (!el) return
    const update = () => setBox({ w: el.offsetWidth, h: el.offsetHeight })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  /* sun motion: gentle float + scroll parallax + spring-in scale */
  const float = useMotionValue(0)
  const scale = useMotionValue(0)
  useEffect(() => {
    const a = animate(float, [0, 24, 0], { duration: 9, repeat: Infinity, ease: 'easeInOut' })
    const b = animate(scale, 1, { type: 'spring', stiffness: 55, damping: 13, delay: 0.5 })
    return () => { a.stop(); b.stop() }
  }, [float, scale])
  const { scrollY } = useScroll()
  const parallax = useTransform(scrollY, [0, 900], [0, 150])
  const dy = useTransform(() => float.get() + parallax.get())
  const dyPx = useMotionTemplate`${dy}px`

  /* sun geometry, relative to the headline box */
  const mobile = box.w < 640
  const r = mobile ? box.w * 0.25 : Math.min(box.w * 0.2, box.h * 0.62)
  const cx = mobile ? box.w * 0.8 : box.w * 0.79
  const cy = mobile ? box.h * 0.28 : box.h * 0.46
  const clip = `circle(calc(${r}px * var(--s)) at ${cx}px calc(${cy}px + var(--dy)))`

  return (
    <section className="relative flex min-h-[calc(100svh_-_110px)] flex-col overflow-hidden pt-16">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,#000_20%,transparent_95%)]" />

      <div className="container-x relative z-10 flex flex-1 flex-col justify-center">
        {/* Headline + sun (with knock-out text over the sun) */}
        <motion.div ref={boxRef} className="relative" style={{ '--dy': dyPx, '--s': scale }}>
          {box.w > 0 && (
            <div
              aria-hidden="true"
              className="sun grain absolute rounded-full"
              style={{
                left: cx - r, top: cy - r, width: r * 2, height: r * 2,
                transform: 'translateY(var(--dy)) scale(var(--s))',
                boxShadow: '0 40px 120px -20px rgba(255,95,31,.45)',
              }}
            />
          )}
          <h1 className="display relative text-[length:clamp(4rem,13.5vw,12.5rem)]">
            <span className="sr-only">Learn skills by building real things</span>
            <span aria-hidden="true"><Headline /></span>
          </h1>
          {box.w > 0 && (
            <div
              aria-hidden="true"
              className="display pointer-events-none absolute inset-0 text-[length:clamp(4rem,13.5vw,12.5rem)]"
              style={{ clipPath: clip, WebkitClipPath: clip }}
            >
              <Headline inverse />
            </div>
          )}
        </motion.div>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}>
            <p className="max-w-[480px] text-[1.05rem] text-[#cfcbc3]">
              Job-ready courses taught by people who do the work. Real projects, live classes and mentors who help you every step of the way.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {tracks.map(({ label, icon: Icon }) => (
                <span key={label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3.5 text-sm backdrop-blur">
                  <span className="grid size-6 place-items-center rounded-full bg-brand"><Icon className="size-3 text-white" /></span>
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}>
            <a href="#courses" className="btn btn-light btn-lg">Explore courses <span className="arrow">↗</span></a>
            <a href="/contact" className="btn btn-line btn-lg">Join free class</a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="container-x relative z-10 mt-14 border-t border-line pb-8 pt-5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1 }}
      >
        <div className="mb-4 flex items-center gap-2 text-xs text-muted">
          <i className="size-[7px] animate-blink rounded-full bg-brand" />
          Learning live from India · {time} IST
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {heroMeta.map((m) => (
            <div key={m.label}>
              <small className="block text-[.7rem] uppercase tracking-[.14em] text-muted">{m.label}</small>
              <b className="text-[length:clamp(1.05rem,1.8vw,1.5rem)] font-normal">{m.value}</b>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
