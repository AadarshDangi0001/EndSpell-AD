import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  motion, useMotionTemplate, useMotionValueEvent, useScroll, useSpring, useTransform, easeInOut,
} from 'framer-motion'
import { SiGooglechrome, SiFigma, SiSpotify, SiNotion, SiYoutube, SiWhatsapp } from 'react-icons/si'
import { FaFolder, FaFingerprint, FaApple, FaWifi, FaBatteryFull, FaMagnifyingGlass, FaPlay, FaPause, FaCode, FaLock } from 'react-icons/fa6'
import { Reveal, SectionHead, Star, EASE } from './ui'

/* ===================================================================
   MacBook section
   • Realistic MacBook drawn at a fixed 1500 × 902 design size and scaled.
   • Pinned while you scroll: lid opens, background fades to dark,
     Touch ID fills with your scroll, then it unlocks to the dashboard.
   =================================================================== */

const DESIGN_W = 1500
const DESIGN_H = 902

function useIstNow() {
  const get = () => new Date()
  const [now, setNow] = useState(get)
  useEffect(() => {
    const id = setInterval(() => setNow(get()), 10000)
    return () => clearInterval(id)
  }, [])
  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' })
  const date = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Asia/Kolkata' })
  const short = now.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata' })
  return { time, date, short }
}

/* ---------------- Lock screen ---------------- */
function LockScreen({ stage, unlock, clock }) {
  const label = useTransform(unlock, (v) => (v >= 0.999 ? 'Unlocked' : 'Keep scrolling to unlock'))
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center overflow-hidden text-white"
      initial={false}
      animate={
        stage === 'off' ? { opacity: 0, scale: 1.04, filter: 'blur(0px)' }
          : stage === 'lock' ? { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: -60, scale: 1.02, filter: 'blur(14px)' }
      }
      transition={{ duration: 0.8, ease: EASE }}
      style={{ background: 'radial-gradient(circle at 72% 18%, #ff9a4a, #f2381d 38%, #4a0f05 82%)' }}
    >
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:64px_64px]" />
      <Star white className="absolute -bottom-40 -left-24 w-[520px] opacity-10" />
      <div className="relative mt-[88px] text-[26px] font-medium">{clock.date}</div>
      <div className="relative text-[170px] font-semibold leading-none tracking-[-4px]">{clock.time}</div>

      <div className="absolute bottom-[60px] flex flex-col items-center gap-3">
        <div className="grid size-[84px] place-items-center rounded-full bg-white/20 backdrop-blur-md">
          <Star white className="size-11" />
        </div>
        <b className="text-xl font-medium">EndSpell Student</b>
        <div className="relative mt-1 grid size-[72px] place-items-center">
          <svg viewBox="0 0 72 72" className="absolute inset-0 -rotate-90">
            <circle cx="36" cy="36" r="33" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="3" />
            <motion.circle cx="36" cy="36" r="33" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" style={{ pathLength: unlock }} />
          </svg>
          <FaFingerprint className="size-9" />
        </div>
        <motion.small className="text-[15px] opacity-85">{label}</motion.small>
      </div>
    </motion.div>
  )
}

/* ---------------- Unlocked desktop ---------------- */
const item = {
  hide: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

const dockApps = [
  { icon: FaFolder, bg: 'linear-gradient(#5ac8fa,#0a84ff)', color: '#fff' },
  { icon: SiGooglechrome, bg: '#fff', color: '#4285F4' },
  { icon: FaCode, bg: 'linear-gradient(#3b82f6,#1d4ed8)', color: '#fff' },
  { icon: SiFigma, bg: '#1e1e1e', color: '#F24E1E' },
  { icon: SiNotion, bg: '#fff', color: '#000' },
  { icon: SiYoutube, bg: '#fff', color: '#FF0000' },
  { icon: SiWhatsapp, bg: 'linear-gradient(#5ef08a,#1fb954)', color: '#fff' },
  { icon: SiSpotify, bg: '#111', color: '#1ED760' },
  { star: true, bg: '#0e0e0e' },
]

function Desktop({ stage, clock }) {
  const on = stage === 'app'
  const [playing, setPlaying] = useState(false)
  useEffect(() => { if (!on) setPlaying(false) }, [on])

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={false}
      animate={on ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0, scale: 1.06, filter: 'blur(12px)' }}
      transition={{ duration: 0.9, ease: EASE }}
      style={{ background: 'radial-gradient(circle at 20% 110%, #ff8a2b, #c2410c 30%, #1a0805 70%)' }}
    >
      {/* macOS menu bar */}
      <div className="flex h-[30px] items-center justify-between bg-black/35 px-5 text-[14px] text-white/90 backdrop-blur-md">
        <div className="flex items-center gap-5"><FaApple className="size-4" /><b className="font-semibold">Chrome</b><span>File</span><span>Edit</span><span>View</span><span>History</span></div>
        <div className="flex items-center gap-4"><FaWifi /><FaBatteryFull className="size-5" /><FaMagnifyingGlass /><span>{clock.short} {clock.time}</span></div>
      </div>

      {/* Browser window */}
      <motion.div
        className="absolute inset-x-[36px] bottom-[104px] top-[48px] overflow-hidden rounded-[14px] border border-white/10 bg-[#1b1b1b] shadow-[0_30px_80px_rgba(0,0,0,.55)]"
        initial={false}
        animate={on ? { y: 0, scale: 1, opacity: 1 } : { y: 40, scale: 0.96, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, delay: on ? 0.15 : 0 }}
      >
        <div className="flex h-[46px] items-center gap-4 border-b border-white/10 bg-[#262626] px-4">
          <div className="flex gap-2">{['#ff5f57', '#febc2e', '#28c840'].map((c) => <i key={c} className="block size-3 rounded-full" style={{ background: c }} />)}</div>
          <div className="mx-auto flex h-[30px] w-[520px] items-center gap-2 rounded-lg bg-[#171717] px-3.5 text-[14px] text-white/60">
            <FaLock className="size-3" /> endspell.com/dashboard
          </div>
        </div>

        <motion.div
          className="grid h-[calc(100%_-_46px)] grid-cols-[210px_1fr]"
          initial={false}
          animate={on ? 'show' : 'hide'}
          variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.45 } }, hide: {} }}
        >
          <motion.aside variants={item} className="border-r border-white/10 bg-[#151515] px-4 py-5 text-[15px] text-[#cfcbc3]">
            <div className="mb-6 flex items-center gap-2 text-[20px] font-semibold text-white"><Star className="size-6" />EndSpell</div>
            {[['My Courses', true], ['Live Classes'], ['Projects'], ['Certificates'], ['Mentors'], ['Community']].map(([l, act]) => (
              <div key={l} className={`mb-1 rounded-lg px-3 py-2.5 ${act ? 'bg-brand/15 text-brand-2' : ''}`}>{l}</div>
            ))}
          </motion.aside>

          <div className="overflow-hidden px-7 py-6 text-white">
            <motion.h4 variants={item} className="display text-[46px] leading-none">Welcome back 👋</motion.h4>
            <motion.p variants={item} className="mb-5 mt-1.5 text-[15px] text-muted">Pick up where you left off — you're on a 12-day streak.</motion.p>

            <div className="grid grid-cols-[1.6fr_1fr] gap-4">
              {/* Player */}
              <motion.div variants={item} className="relative">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]">
                  <div className="relative h-[232px] overflow-hidden" style={{ background: 'radial-gradient(circle at 75% 30%, #ff8a2b, #c2410c 45%, #1a0a05 90%)' }}>
                    <pre className="absolute inset-0 p-5 font-mono text-[14px] leading-relaxed text-white/30">{`function buildProject() {
  const skills = learn("React");
  const portfolio = ship(skills);
  return getHired(portfolio);
}`}</pre>
                    <motion.div
                      className="absolute left-1/2 top-1/2 grid size-[70px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-brand-3 shadow-[0_10px_30px_rgba(0,0,0,.4)]"
                      animate={playing ? { scale: [1, 0.85, 1] } : { scale: 1 }}
                      transition={{ duration: 0.35 }}
                    >
                      {playing ? <FaPause className="size-6" /> : <FaPlay className="ml-1 size-6" />}
                    </motion.div>
                    {playing && (
                      <div className="absolute bottom-4 left-5 flex h-6 items-end gap-1">
                        {[0, 1, 2, 3, 4].map((b) => (
                          <motion.i
                            key={b}
                            className="block w-1.5 rounded-sm bg-white"
                            animate={{ height: ['30%', '100%', '45%', '80%', '30%'] }}
                            transition={{ duration: 0.9, repeat: Infinity, delay: b * 0.12 }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="px-5 py-3.5 text-[15px]">
                    <b className="font-semibold">Full Stack Web Development</b>
                    <small className="block text-[13px] text-muted">Module 7 · Building a REST API with Node.js</small>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#333]">
                      <motion.i
                        className="block h-full rounded-full bg-linear-to-r from-brand-2 to-brand-3"
                        initial={false}
                        animate={{ width: on ? (playing ? '68%' : '64%') : '0%' }}
                        transition={{ duration: playing ? 6 : 1.2, ease: playing ? 'linear' : EASE, delay: on && !playing ? 0.8 : 0 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Fake cursor that clicks "play" */}
                <motion.svg
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute left-[calc(50%_-_4px)] top-[116px] z-10 size-7 drop-shadow-[0_2px_4px_rgba(0,0,0,.5)]"
                  initial={false}
                  animate={on ? { x: [320, 320, 0, 0], y: [260, 260, 0, 0], opacity: [0, 1, 1, 1], scale: [1, 1, 1, 0.8] } : { opacity: 0 }}
                  transition={on ? { duration: 2, times: [0, 0.35, 0.85, 1], ease: 'easeInOut', delay: 0.9 } : { duration: 0.2 }}
                  onAnimationComplete={() => { if (on) setPlaying(true) }}
                >
                  <path d="M4 2l15 9-6.5 1.6L9.5 19z" fill="#fff" stroke="#000" strokeWidth="1.3" strokeLinejoin="round" />
                </motion.svg>
              </motion.div>

              {/* Side cards */}
              <div className="grid gap-2.5">
                {[
                  ['●', 'Live class today', 'Doubt session · 7:00 PM', '#ff5f1f'],
                  ['◆', 'Project due', 'Portfolio website · 2 days', '#3a3a3a'],
                  ['★', 'Certificate', '64% complete', '#c2410c'],
                  ['✦', 'Mentor review', 'Feedback ready', '#3a3a3a'],
                ].map(([ic, t, s, bg]) => (
                  <motion.div key={t} variants={item} className="flex items-center gap-3 rounded-xl bg-[#262626] px-4 py-3 text-[15px]">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg text-lg" style={{ background: bg }}>{ic}</span>
                    <div><b className="font-medium">{t}</b><small className="block text-[13px] text-muted">{s}</small></div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3.5">
              {[['UI/UX Design', 82, '82% complete'], ['DSA & Placement', 35, '35% complete'], ['Generative AI', 12, 'Just started']].map(([t, w, s]) => (
                <motion.div key={t} variants={item} className="rounded-xl bg-[#262626] px-4 py-3.5 text-[15px]">
                  {t}
                  <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#333]">
                    <motion.i className="block h-full rounded-full bg-linear-to-r from-brand-2 to-brand-3" initial={false} animate={{ width: on ? `${w}%` : '0%' }} transition={{ duration: 1.4, ease: EASE, delay: on ? 1 : 0 }} />
                  </div>
                  <small className="mt-2 block text-[13px] text-muted">{s}</small>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Dock */}
      <motion.div
        className="absolute bottom-[14px] left-1/2 flex -translate-x-1/2 items-end gap-2.5 rounded-[22px] border border-white/15 bg-white/15 px-3 py-2.5 backdrop-blur-xl"
        initial={false}
        animate={on ? 'show' : 'hide'}
        variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.25 } }, hide: {} }}
      >
        {dockApps.map((a, i) => {
          const Icon = a.icon
          return (
            <motion.span
              key={i}
              variants={{ hide: { y: 50, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 380, damping: 22 } } }}
              className="relative grid size-[54px] place-items-center rounded-[14px]"
              style={{ background: a.bg }}
            >
              {a.star ? <Star className="size-8" /> : <Icon className="size-7" style={{ color: a.color }} />}
              {(i === 1 || a.star) && <i className="absolute -bottom-1.5 size-1 rounded-full bg-white/80" />}
            </motion.span>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

/* ---------------- MacBook hardware ---------------- */
/* rounded top edge of the lid: [left, top, width, height, rotate(rad), shadeA, shadeB] */
const EDGE = [
  [-5.68, 20.47, 6.52, 9.27, -1.51, 0.28, 0.257], [-5.1, 13.51, 6.52, 11.76, -1.37, 0.257, 0.233],
  [-3.93, 6.83, 6.52, 14.08, -1.24, 0.233, 0.21], [-2.2, 0.64, 6.52, 16.1, -1.11, 0.21, 0.187],
  [0.06, -4.87, 6.52, 17.7, -0.98, 0.187, 0.163], [2.8, -9.47, 6.52, 18.73, -0.85, 0.163, 0.14],
  [5.99, -12.94, 6.52, 19, -0.72, 0.14, 0.117], [9.57, -15.69, 6.52, 19, -0.59, 0.117, 0.093],
  [13.48, -17.94, 6.52, 19, -0.46, 0.093, 0.07], [17.65, -19.67, 6.52, 19, -0.33, 0.07, 0.047],
  [22.01, -20.84, 6.52, 19, -0.2, 0.047, 0.023], [26.49, -21.43, 6.52, 19, -0.07, 0.023, 0],
  [31.6, -21.5, 1256.8, 19, 0, null, null],
  [1287, -21.43, 6.52, 19, 0.07, 0, 0.023], [1291.47, -20.84, 6.52, 19, 0.2, 0.023, 0.047],
  [1295.83, -19.67, 6.52, 19, 0.33, 0.047, 0.07], [1300, -17.94, 6.52, 19, 0.46, 0.07, 0.093],
  [1303.91, -15.69, 6.52, 19, 0.59, 0.093, 0.117], [1307.49, -12.94, 6.52, 19, 0.72, 0.117, 0.14],
  [1310.68, -9.47, 6.52, 18.73, 0.85, 0.14, 0.163], [1313.43, -4.87, 6.52, 17.7, 0.98, 0.163, 0.187],
  [1315.68, 0.64, 6.52, 16.1, 1.11, 0.187, 0.21], [1317.41, 6.83, 6.52, 14.08, 1.24, 0.21, 0.233],
  [1318.58, 13.51, 6.52, 11.76, 1.37, 0.233, 0.257], [1319.17, 20.47, 6.52, 9.27, 1.51, 0.257, 0.28],
]

export function MacBook({ lidDeg, screenDark, glareX, children }) {
  const wrapRef = useRef(null)
  const [scale, setScale] = useState(0.5)
  useLayoutEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const update = () => setScale(el.clientWidth / DESIGN_W)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const lidTransform = useMotionTemplate`perspective(7358.57px) rotateX(${lidDeg}deg)`

  return (
    <div ref={wrapRef} className="macbook absolute inset-0">
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})` }}>
        {/* Base */}
        <div className="absolute left-0 w-full" style={{ top: 850, height: 52 }}>
          <div className="macbook-hinge absolute left-1/2 top-0 -translate-x-1/2" style={{ width: 1320, height: 8 }} />
          <div className="macbook-base absolute inset-x-0 top-[6px] h-[40px]" />
          <div className="macbook-base-shade absolute inset-x-0 top-[6px] h-[40px]" />
          <div className="macbook-scoop absolute left-1/2 top-[6px] h-[14px] w-[260px] -translate-x-1/2 rounded-b-[16px]" />
          <div className="absolute bottom-0 left-[8%] h-[6px] w-[100px] rounded-b-[6px] bg-[var(--mac-foot)]" />
          <div className="absolute bottom-0 right-[8%] h-[6px] w-[100px] rounded-b-[6px] bg-[var(--mac-foot)]" />
        </div>

        {/* Lid */}
        <motion.div
          className="absolute will-change-transform"
          style={{ left: 90, top: 0, width: 1320, height: 850, transformOrigin: '50% calc(100% + 6px)', transform: lidTransform, transformStyle: 'preserve-3d' }}
        >
          {EDGE.map(([l, t, w, h, r, a, b], i) => (
            <div
              key={i}
              className="macbook-edge"
              style={{
                left: l, top: t, width: w, height: h,
                transform: `rotate(${r}rad) rotateX(90deg)`,
                backgroundImage: a === null
                  ? 'linear-gradient(transparent, transparent), var(--mac-edge)'
                  : `linear-gradient(to right, rgb(0 0 0 / ${a}), rgb(0 0 0 / ${b})), var(--mac-edge)`,
              }}
            />
          ))}
          <div className="macbook-bezel absolute inset-0 rounded-b-[12px] rounded-t-[32px]" />
          <div className="absolute overflow-hidden rounded-b-[4px] rounded-t-[16px] bg-black" style={{ left: 18, top: 18, width: 1284, height: 808 }}>
            {children}
            <motion.div className="macbook-screen-off pointer-events-none absolute inset-0" style={{ opacity: screenDark }} />
            {glareX && (
              <motion.div
                className="pointer-events-none absolute inset-y-0 w-[60%] bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,.08)_50%,transparent_70%)]"
                style={{ x: glareX }}
              />
            )}
          </div>
          <div className="absolute left-1/2 top-[14px] h-[28px] w-[170px] -translate-x-1/2 rounded-b-[12px] bg-[var(--mac-bezel)]" />
        </motion.div>
      </div>
    </div>
  )
}

/* ---------------- Section (pinned, scroll-driven) ----------------
   0.00 – 0.36  lid opens, laptop settles, background fades cream → dark
   0.28 – 0.40  screen wakes
   0.42 – 0.60  Touch ID ring fills as you scroll
   0.60 +       unlocked → desktop, dashboard, dock, cursor clicks play  */
export default function LaptopSection() {
  const trackRef = useRef(null)
  const [stage, setStage] = useState('off')
  const clock = useIstNow()

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.35, restDelta: 0.0005 })

  const lidDeg = useTransform(p, [0, 0.36], [-90, 0], { ease: easeInOut })
  const macScale = useTransform(p, [0, 0.36], [0.9, 1], { ease: easeInOut })
  const macY = useTransform(p, [0, 0.36], ['-34%', '0%'], { ease: easeInOut })
  const shadowOpacity = useTransform(p, [0, 0.36], [0.15, 0.7])
  const shadowScale = useTransform(p, [0, 0.36], [0.85, 1])
  const screenDark = useTransform(p, [0.28, 0.4], [1, 0])
  const glareX = useTransform(p, [0.2, 1], ['-70%', '170%'])
  const unlock = useTransform(p, [0.42, 0.6], [0, 1], { clamp: true })
  const bg = useTransform(p, [0.08, 0.34], ['rgba(10,10,10,0)', 'rgba(10,10,10,1)'])
  const capColor = useTransform(p, [0.08, 0.34], ['#131313', '#f4f1ea'])
  const glow = useTransform(p, [0.35, 0.65], [0, 0.5])

  useMotionValueEvent(p, 'change', (v) => {
    const s = v < 0.3 ? 'off' : v < 0.6 ? 'lock' : 'app'
    setStage((prev) => (prev === s ? prev : s))
  })

  const steps = [['01', 'Open', 'off'], ['02', 'Unlock', 'lock'], ['03', 'Start learning', 'app']]

  return (
    <section className="bg-paper text-ink">
      <div className="container-x relative z-10 pt-28">
        <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_1fr]">
          <SectionHead dark kicker="How it works" title="Your next step," accent="with a little guidance." />
          <Reveal className="mb-14">
            <div className="grid gap-3.5 text-[#3c3a36]">
              {[
                'Pick a course that matches your goal — a job, freelancing or your own product.',
                'Learn with short lessons, hands-on assignments and real projects.',
                'Get mentor feedback, earn your certificate and prepare for interviews.',
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-[#bbb6ab] text-xs">{i + 1}</span>
                  <p>{t}</p>
                </div>
              ))}
            </div>
            <a href="#courses" className="btn btn-dark mt-6">Start learning <span className="arrow">↗</span></a>
          </Reveal>
        </div>
      </div>

      {/* Tall scroll track (pulled up under the text) with a pinned stage */}
      <div ref={trackRef} className="relative -mt-[34svh] h-[260vh] max-sm:-mt-[18svh] max-sm:h-[210vh]">
        <motion.div className="pointer-events-none sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden" style={{ backgroundColor: bg }}>
          {/* orange glow behind the laptop once it's on */}
          <motion.div className="sun pointer-events-none absolute left-1/2 top-1/2 size-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" style={{ opacity: glow }} />

          <motion.div
            className="relative"
            style={{ width: 'min(1040px, 88vw, calc((100svh - 200px) * 1.6))', scale: macScale, y: macY }}
            role="img"
            aria-label="A laptop opens as you scroll, unlocks with Touch ID and shows the EndSpell student dashboard."
          >
            <div className="relative w-full" style={{ aspectRatio: '1500 / 902' }}>
              <MacBook lidDeg={lidDeg} screenDark={screenDark} glareX={glareX}>
                <LockScreen stage={stage} unlock={unlock} clock={clock} />
                <Desktop stage={stage} clock={clock} />
              </MacBook>
            </div>
            <motion.div
              className="mx-auto -mt-2 h-8 w-[92%] rounded-[50%] bg-black blur-2xl"
              style={{ opacity: shadowOpacity, scaleX: shadowScale }}
            />
          </motion.div>

          {/* step captions */}
          <motion.div className="mt-4 flex gap-6 text-xs uppercase tracking-[.14em] sm:gap-10" style={{ color: capColor }}>
            {steps.map(([n, label, s]) => (
              <span key={n} className={`flex items-center gap-2 transition-opacity duration-500 ${stage === s ? 'opacity-100' : 'opacity-35'}`}>
                <span className={`size-1.5 rounded-full transition-colors duration-500 ${stage === s ? 'bg-brand' : 'bg-current'}`} />
                {n} {label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
