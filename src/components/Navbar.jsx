import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { FaUserPen, FaRightFromBracket, FaUser } from 'react-icons/fa6'
import { useAuth } from '../auth/AuthContext'
import { navigate } from '../router'
import { Avatar, Logo, EASE } from './ui'

const links = [
  ['Courses', '#courses'],
  ['Why EndSpell', '#why'],
  ['Mentors', '#mentors'],
  ['Reviews', '#reviews'],
  ['FAQs', '#faq'],
]

export function Announcement() {
  return (
    <div className="bg-brand px-3 py-2.5 text-center text-sm font-medium text-white">
      <a href="#courses" className="hover:underline">New batches are open — reserve your seat today →</a>
    </div>
  )
}

/* Profile circle + dropdown (shown when logged in) */
function UserMenu() {
  const { profile, logOut } = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const name = profile.name || profile.email.split('@')[0]

  useEffect(() => {
    if (!open) return undefined
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    const esc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc) }
  }, [open])

  const onLogout = async () => {
    setOpen(false)
    await logOut()
    navigate('/')
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`rounded-full ring-2 ring-offset-2 ring-offset-ink transition-all duration-300 hover:ring-brand ${open ? 'ring-brand' : 'ring-transparent'}`}
        aria-label="Account menu"
        aria-expanded={open}
      >
        <Avatar name={name} photo={profile.photo} color="#ff5f1f" className="size-10" textClass="text-sm" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute right-0 top-[calc(100%+12px)] w-64 origin-top-right overflow-hidden rounded-2xl border border-line bg-card p-2 shadow-[0_24px_60px_-12px_rgba(0,0,0,.7)]"
          >
            <a href="/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-card2">
              <Avatar name={name} photo={profile.photo} color="#ff5f1f" className="size-10" />
              <span className="min-w-0">
                <b className="block truncate text-sm font-medium">{name}</b>
                <small className="block truncate text-xs text-muted">{profile.email}</small>
              </span>
            </a>
            <div className="my-1.5 h-px bg-line" />
            <a href="/profile/edit" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-card2">
              <FaUserPen className="size-4 text-brand-2" /> Edit profile
            </a>
            <button onClick={onLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-card2">
              <FaRightFromBracket className="size-4 text-brand-2" /> Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const { user, loading, logOut } = useAuth()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > prev && y > 300 && !open)
  })

  return (
    <motion.header
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.45, ease: EASE }}
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        scrolled ? 'border-white/10 bg-ink/80' : 'border-transparent bg-ink/40'
      }`}
    >
      <div className="container-x flex h-[70px] items-center justify-between">
        <Logo />
        <nav className="hidden gap-8 text-[.92rem] text-[#cfcbc3] md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="group relative transition-colors hover:text-white">
              {label}
              <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          {!loading && !user && <a href="/login" className="btn btn-orange hidden px-[18px] py-[9px] text-[.88rem] md:inline-flex">Log in</a>}
          <a href="/contact" className="btn btn-light hidden px-[18px] py-[9px] text-[.88rem] md:inline-flex">Contact Us</a>
          {!loading && user && <UserMenu />}
        <button
          onClick={() => setOpen((o) => !o)}
          className="grid size-11 place-items-center rounded-xl border border-line md:hidden"
          aria-label="Toggle menu"
        >
          <div className="relative h-3.5 w-5">
            <motion.span animate={open ? { rotate: 45, top: 6 } : { rotate: 0, top: 0 }} className="absolute left-0 h-0.5 w-5 bg-white" />
            <motion.span animate={{ opacity: open ? 0 : 1 }} className="absolute left-0 top-1.5 h-0.5 w-5 bg-white" />
            <motion.span animate={open ? { rotate: -45, top: 6 } : { rotate: 0, top: 12 }} className="absolute left-0 h-0.5 w-5 bg-white" />
          </div>
        </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <div className="container-x flex flex-col py-3">
              {links.map(([label, href], i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                  className="border-b border-line py-3.5"
                >
                  {label}
                </motion.a>
              ))}
              <a href="/contact" onClick={() => setOpen(false)} className="btn btn-light mt-4">Contact Us</a>
              {user ? (
                <>
                  <a href="/profile" onClick={() => setOpen(false)} className="btn btn-line mt-2.5"><FaUser className="size-3.5" /> My profile</a>
                  <button onClick={async () => { setOpen(false); await logOut(); navigate('/') }} className="btn btn-orange mt-2.5">Logout</button>
                </>
              ) : (
                <a href="/login" onClick={() => setOpen(false)} className="btn btn-orange mt-2.5">Log in</a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
