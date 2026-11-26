import { motion } from 'framer-motion'
import { stats, stripWords, tools, palette } from '../data/content'
import { Counter, Reveal, SectionHead, Star, EASE } from './ui'

/* Tilted orange marquee strip */
export function Strip() {
  const words = [...stripWords, ...stripWords]
  return (
    <div className="overflow-hidden py-6" aria-hidden="true">
      <div className="-mx-[2%] w-[104%] -rotate-[1.5deg] bg-brand py-4 text-white">
        <div className="flex w-max animate-marquee gap-10 [animation-duration:30s]">
          {words.map((w, i) => (
            <span key={i} className="display flex items-center gap-10 whitespace-nowrap text-4xl">
              {w}
              <Star white className="size-6" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Tile({ className = '', children, delay = 0, orange = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      whileHover={{ y: -4 }}
      className={`relative overflow-hidden rounded-[22px] p-6 transition-colors duration-300 ${orange ? 'bg-brand' : 'border border-line bg-card hover:border-brand/60'} ${className}`}
    >
      {children}
    </motion.div>
  )
}

const Num = ({ children }) => <div className="display text-[length:clamp(3.4rem,6vw,5rem)] leading-[.9]">{children}</div>

function ToolPill({ tool }) {
  const Icon = tool.icon
  return (
    <div className="group flex items-center gap-3 whitespace-nowrap rounded-2xl border border-line bg-card px-5 py-3.5 text-[.95rem] text-[#e4e0d8] transition-colors hover:border-white/25">
      <Icon className="size-6 transition-transform duration-300 group-hover:scale-110" style={{ color: tool.color }} />
      {tool.name}
    </div>
  )
}

export default function Why() {
  const half = Math.ceil(tools.length / 2)
  const rowA = tools.slice(0, half)
  const rowB = tools.slice(half)

  return (
    <section id="why" className="py-28">
      <div className="container-x">
        <SectionHead
          kicker="Why EndSpell"
          title="Find your path."
          accent="Build your future."
          right={<p className="max-w-[460px] text-muted">Learn the skill. Build the project. Get the job — with a community that learns alongside you.</p>}
        />

        <div className="grid auto-rows-[minmax(210px,auto)] grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          <Tile className="min-h-[330px] sm:row-span-2">
            <Num><Counter to={stats.learners} suffix="+" /></Num>
            <p className="mt-1.5 text-[#dcd8d0]">Learners in the community</p>
            <div className="absolute inset-x-6 bottom-6 grid grid-cols-5 gap-2">
              {Array.from({ length: 15 }, (_, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0.4, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.5 + 0.5 * (((i * 7) % 10) / 10) }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.3 + i * 0.035 }}
                  className="grid aspect-square place-items-center rounded-full text-[.7rem] font-semibold"
                  style={{ background: palette[i % palette.length] }}
                >
                  {String.fromCharCode(65 + ((i * 5) % 26))}
                </motion.span>
              ))}
            </div>
          </Tile>

          <Tile className="sm:col-span-2" delay={0.08}>
            <Num><Counter to={stats.courses} suffix="+" /></Num>
            <p className="mt-1.5 text-[#dcd8d0]">Industry-ready courses</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Full Stack', 'Data Science', 'UI/UX', 'DSA', 'AI Tools', 'Marketing'].map((c) => (
                <span key={c} className="rounded-[10px] border border-line bg-card2 px-3 py-1.5 text-[.82rem] text-[#ddd]">{c}</span>
              ))}
            </div>
          </Tile>

          <Tile orange className="min-h-[330px] sm:row-span-2" delay={0.16}>
            <Num><Counter to={stats.completion} suffix="%" /></Num>
            <p className="mt-1.5 text-white/95">Course completion rate</p>
            <p className="mt-1.5 text-sm text-white/85">Short lessons, weekly goals and mentors who keep you on track.</p>
            <motion.div
              className="absolute -bottom-9 -right-9 w-44 opacity-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            >
              <Star white className="w-full" />
            </motion.div>
          </Tile>

          <Tile delay={0.24}>
            <Num><Counter to={stats.projects} suffix="+" /></Num>
            <p className="mt-1.5 text-[#dcd8d0]">Hands-on projects</p>
            <p className="mt-1.5 text-sm text-muted">A portfolio you can actually show.</p>
          </Tile>

          <Tile delay={0.32}>
            <Num>3</Num>
            <p className="mt-1.5 text-[#dcd8d0]">Learning tracks</p>
            <div className="mt-4 grid gap-2">
              {[['Build', 'Web, app & software'], ['Analyse', 'Data, AI & ML']].map(([b, s]) => (
                <div key={b} className="flex items-center gap-3 rounded-xl bg-card2 px-3 py-2.5">
                  <Star className="size-5" />
                  <span><b className="block text-sm font-medium">{b}</b><small className="text-xs text-muted">{s}</small></span>
                </div>
              ))}
            </div>
          </Tile>
        </div>

        <Reveal>
          <p className="mb-5 mt-16 text-xs tracking-[.14em] text-muted">TOOLS &amp; SKILLS YOU'LL MASTER</p>
        </Reveal>
      </div>

      <div className="fade-x pause-on-hover space-y-3.5 overflow-hidden">
        <div className="flex w-max animate-marquee gap-3.5 [animation-duration:55s]">
          {[...rowA, ...rowA].map((t, i) => <ToolPill key={i} tool={t} />)}
        </div>
        <div className="flex w-max animate-marquee gap-3.5 [animation-direction:reverse] [animation-duration:60s]">
          {[...rowB, ...rowB].map((t, i) => <ToolPill key={i} tool={t} />)}
        </div>
      </div>
    </section>
  )
}
