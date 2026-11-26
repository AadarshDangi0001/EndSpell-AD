import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useInView } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1]

/* EndSpell 4-point star */
export function Star({ className = '', white = false }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF8A2B" />
          <stop offset="1" stopColor="#F2381D" />
        </linearGradient>
      </defs>
      <path
        fill={white ? '#fff' : `url(#g${id})`}
        d="M50 0C55 32 68 45 100 50C68 55 55 68 50 100C45 68 32 55 0 50C32 45 45 32 50 0Z"
      />
    </svg>
  )
}

export function Logo({ className = '' }) {
  return (
    <a href="#" className={`flex items-center gap-2.5 text-[1.35rem] font-semibold tracking-tight ${className}`} aria-label="EndSpell home">
      <Star className="size-7" />
      EndSpell
    </a>
  )
}

/* Fade-up on scroll */
export function Reveal({ children, delay = 0, y = 40, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/* Big heading where each line slides up from a mask.
   The in-view check is done on the (unclipped) wrapper — not on the
   hidden lines — otherwise the browser never reports them as visible. */
export function MaskLines({ lines, className = '', delay = 0, inView = true }) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  const show = inView ? seen : true
  return (
    <span ref={ref} className={`block ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.04em]">
          <motion.span
            className="block"
            initial={{ y: '110%' }}
            animate={{ y: show ? '0%' : '110%' }}
            transition={{ duration: 1, ease: EASE, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* Number that counts up when visible */
export function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.8, ease: EASE, onUpdate: (v) => setVal(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  const fmt = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K` : n)
  return (
    <span ref={ref}>
      {fmt(val)}
      {suffix}
    </span>
  )
}

/* Section heading row: kicker + big title (+ optional right side) */
export function SectionHead({ kicker, title, accent, right, dark = false }) {
  return (
    <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
      <div>
        <Reveal y={20}>
          <span className="kicker" style={dark ? { color: '#6f6b63' } : undefined}>{kicker}</span>
        </Reveal>
        <h2 className="h2">
          <MaskLines lines={[title, <span className="text-brand">{accent}</span>]} />
        </h2>
      </div>
      {right && <Reveal delay={0.2}>{right}</Reveal>}
    </div>
  )
}

/* Avatar: real photo if provided → otherwise an illustrated (cartoon) avatar
   generated from the name → otherwise initials if offline */
export const illustratedAvatar = (name) =>
  `https://api.dicebear.com/10.x/notionists/svg?seed=${encodeURIComponent(name)}`

export function Avatar({ name, photo, color, illustrated = false, className = 'size-11', textClass = 'text-sm' }) {
  const [broken, setBroken] = useState(false)
  const ini = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
  const src = photo || (illustrated ? illustratedAvatar(name) : '')
  if (src && !broken) {
    return (
      <img
        src={src}
        alt={name}
        loading="lazy"
        onError={() => setBroken(true)}
        className={`${className} shrink-0 rounded-full object-cover`}
        style={photo ? undefined : { background: color }}
      />
    )
  }
  return (
    <span className={`${className} ${textClass} grid shrink-0 place-items-center rounded-full font-semibold text-white`} style={{ background: color }}>
      {ini}
    </span>
  )
}

/* Form field used by Contact, Login, Sign up and Profile pages */
export function Field({ label, name, value, error, onChange, type = 'text', textarea = false, prefix, suffix, hint, ...rest }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <label className="block">
      {label && <span className="mb-2 block text-sm text-[#cfcbc3]">{label}</span>}
      <div
        className={`flex rounded-2xl border bg-ink/60 transition-colors duration-300 focus-within:border-brand ${error ? 'border-brand-3' : 'border-line'}`}
      >
        {prefix && <span className="flex items-center border-r border-line pl-4 pr-3 text-[.95rem] text-muted">{prefix}</span>}
        <Tag
          name={name}
          value={value}
          onChange={onChange}
          type={textarea ? undefined : type}
          rows={textarea ? 5 : undefined}
          className={`w-full resize-none bg-transparent px-4 py-3.5 text-[.95rem] text-cream placeholder:text-[#6f6b63] focus:outline-none disabled:cursor-not-allowed disabled:text-muted ${textarea ? 'min-h-[140px]' : ''}`}
          {...rest}
        />
        {suffix && <span className="flex items-center pr-3">{suffix}</span>}
      </div>
      {hint && !error && <span className="mt-1.5 block text-xs text-muted">{hint}</span>}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="mt-1.5 block text-xs text-brand-2"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  )
}
