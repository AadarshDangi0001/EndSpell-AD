import { forwardRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { courses, courseTabs, palette } from '../data/content'
import { SectionHead, EASE } from './ui'

const CourseCard = forwardRef(function CourseCard({ c, i }, ref) {
  const Icon = c.icon
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
      transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
      className="group flex flex-col rounded-[22px] border border-line bg-card p-3 transition-colors duration-300 hover:border-brand/60"
    >
      {c.thumb ? (
        <div className="relative aspect-video overflow-hidden rounded-[14px] bg-[#0f0f0f]">
          <img
            src={c.thumb}
            alt={c.title}
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">{c.badge}</span>
        </div>
      ) : (
        <div className="relative flex h-[190px] flex-col justify-between overflow-hidden rounded-[14px] bg-[#0f0f0f] p-4">
        <div
          className="sun grain absolute -right-10 -top-10 size-[170px] rounded-full transition-transform duration-700 ease-out group-hover:scale-125"
          style={{ background: `radial-gradient(circle at 35% 30%, #ff9a4a, ${palette[i % palette.length]} 55%, #7a1d08)` }}
        />
        <span className="relative z-10 self-start rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">{c.badge}</span>
        <div className="display relative z-10 max-w-[80%] text-[2.6rem] leading-[.85]">{c.short}</div>
        <span className="absolute bottom-4 right-4 z-10 grid size-11 place-items-center rounded-xl bg-black/40 backdrop-blur">
          <Icon className="size-6" style={{ color: c.iconColor }} />
        </span>
      </div>
      )}
      <div className="flex flex-1 flex-col px-2 pb-1.5 pt-4">
        <span className="text-xs uppercase tracking-[.12em] text-brand-2">{c.label}</span>
        <h3 className="mb-2 mt-1 text-lg font-semibold leading-snug">{c.title}</h3>
        <p className="text-sm text-muted">{c.desc}</p>
        <div className="my-4 flex flex-wrap gap-3.5 text-[.8rem] text-[#c9c5bd]">
          <span>🗓 {c.weeks}</span><span>▶ {c.lessons}</span><span>📊 {c.level}</span>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-line pt-3.5">
          <div className="display text-[1.9rem] font-extrabold leading-none">
            {c.price}
            <s className="ml-1.5 font-sans text-xs font-normal normal-case text-muted">{c.mrp}</s>
          </div>
          <a href="#" className="btn btn-orange rounded-[10px] px-4 py-2 text-[.84rem]">Enroll now</a>
        </div>
      </div>
    </motion.article>
  )
})

export default function Courses() {
  const [tab, setTab] = useState('all')
  const list = courses.filter((c) => tab === 'all' || c.cat === tab)
  // only show tabs that have at least one course
  const tabs = courseTabs.filter((t) => t.id === 'all' || courses.some((c) => c.cat === t.id))

  return (
    <section id="courses" className="bg-surface py-28">
      <div className="container-x">
        <SectionHead
          kicker="Courses"
          title="Learn something"
          accent="you can put to work."
          right={
            <div className="flex flex-wrap gap-2">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative rounded-full border px-4 py-2 text-sm transition-colors ${tab === t.id ? 'border-cream text-ink' : 'border-line text-[#d6d2ca] hover:border-brand'}`}
                >
                  {tab === t.id && (
                    <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-cream" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative">{t.label}</span>
                </button>
              ))}
            </div>
          }
        />

        <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((c, i) => <CourseCard key={c.title} c={c} i={i} />)}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}
