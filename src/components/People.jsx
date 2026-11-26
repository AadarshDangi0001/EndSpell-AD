import { motion } from 'framer-motion'
import { FaStar, FaRegStar } from 'react-icons/fa6'
import { mentors, reviews, reviewsAreSamples, palette, initials } from '../data/content'
import { Avatar, Reveal, SectionHead, EASE } from './ui'

/* ---------------- Mentors ---------------- */
export function Mentors() {
  return (
    <section id="mentors" className="py-28">
      <div className="container-x">
        <SectionHead
          kicker="Mentors"
          title="Built for students."
          accent="Led by mentors."
        />
        <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
          {mentors.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: EASE, delay: (i % 4) * 0.08 }}
              className="group rounded-[20px] border border-line bg-card p-3 transition-colors duration-300 hover:border-brand/60"
            >
              <div
                className="relative mb-3 grid aspect-[4/5] place-items-center overflow-hidden rounded-[14px]"
                style={{ background: `linear-gradient(170deg, ${palette[i % palette.length]}, #161616 85%)` }}
              >
                {m.photo ? (
                  <img src={m.photo} alt={m.name} className="absolute inset-0 size-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <span className="display text-6xl text-white transition-transform duration-700 group-hover:scale-110">{initials(m.name)}</span>
                )}
              </div>
              <b className="block px-1.5 font-medium">{m.name}</b>
              <small className="block px-1.5 pb-1.5 text-muted">{m.role}</small>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Reviews ---------------- */
function Stars({ n }) {
  return (
    <div className="flex gap-1 text-brand">
      {Array.from({ length: 5 }, (_, i) => (i < n ? <FaStar key={i} className="size-4" /> : <FaRegStar key={i} className="size-4" />))}
    </div>
  )
}

function ReviewCard({ r, i }) {
  return (
    <div className="rounded-[20px] border border-line bg-card p-6 transition-colors duration-300 hover:border-brand/50">
      <Stars n={r.stars} />
      <p className="mb-5 mt-3.5 text-[.95rem] leading-relaxed text-[#dcd8d0]">“{r.text}”</p>
      <div className="flex items-center gap-3">
        <Avatar name={r.name} photo={r.photo} color={palette[i % palette.length]} illustrated className="size-12" />
        <div>
          <b className="block text-[.95rem] font-medium">{r.name}</b>
          <small className="text-[.8rem] text-muted">{r.course}</small>
        </div>
      </div>
    </div>
  )
}

export function Reviews() {
  const cols = [[], [], []]
  reviews.forEach((r, i) => cols[i % 3].push([r, i]))
  const speeds = ['38s', '46s', '52s']

  return (
    <section id="reviews" className="bg-surface py-28">
      <div className="container-x">
        <SectionHead
          kicker="Reviews"
          title="What it's really like"
          accent="to learn here."
          right={
            <div className="max-w-[420px]">
              <p className="text-muted">Words from learners who finished their EndSpell course.</p>
              {reviewsAreSamples && (
                <span className="mt-3 inline-block rounded-full border border-line px-3 py-1 text-xs uppercase tracking-[.12em] text-muted">
                  Sample reviews
                </span>
              )}
            </div>
          }
        />
        <Reveal>
          <div className="fade-y pause-on-hover grid h-[640px] grid-cols-1 gap-3.5 overflow-hidden md:grid-cols-2 lg:grid-cols-3">
            {cols.map((col, c) => (
              <div
                key={c}
                className={`flex animate-marquee-up flex-col gap-3.5 ${c === 1 ? 'max-md:hidden [animation-direction:reverse]' : ''} ${c === 2 ? 'max-lg:hidden' : ''}`}
                style={{ animationDuration: speeds[c] }}
              >
                {[...col, ...col].map(([r, i], k) => <ReviewCard key={k} r={r} i={i} />)}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
