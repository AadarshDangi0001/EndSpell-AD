import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import { FaEye, FaEyeSlash, FaArrowRight, FaCheck } from 'react-icons/fa6'
import { useAuth } from '../auth/AuthContext'
import { navigate } from '../router'
import { Field, MaskLines, Star, EASE } from './ui'

const COPY = {
  login: {
    lines: ['Welcome', <span className="text-ink">back.</span>],
    title: 'Log in',
    sub: 'Continue your learning journey.',
    button: 'Log in',
    switchText: "Don't have an account?",
    switchLink: ['Sign up', '/signup'],
  },
  signup: {
    lines: ['Start', <span className="text-ink">building.</span>],
    title: 'Create your account',
    sub: 'Join EndSpell and start learning today.',
    button: 'Create account',
    switchText: 'Already have an account?',
    switchLink: ['Log in', '/login'],
  },
}

const perks = ['Live classes + recordings', 'Real projects for your portfolio', 'Mentor support & doubt sessions', 'Certificate on completion']

function PasswordToggle({ show, onClick }) {
  return (
    <button type="button" onClick={onClick} className="grid size-9 place-items-center rounded-lg text-muted transition-colors hover:text-cream" aria-label={show ? 'Hide password' : 'Show password'}>
      {show ? <FaEyeSlash className="size-4" /> : <FaEye className="size-4" />}
    </button>
  )
}

export default function AuthPage({ mode = 'login' }) {
  const { user, loading, signUp, logIn, logInWithGoogle } = useAuth()
  const copy = COPY[mode]
  const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [busy, setBusy] = useState(false)
  const [show, setShow] = useState(false)

  /* already logged in → go to profile */
  useEffect(() => { if (!loading && user) navigate('/profile') }, [loading, user])

  /* reset when switching between login and signup */
  useEffect(() => { setErrors({}); setFormError(''); setShow(false) }, [mode])

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
    if (formError) setFormError('')
  }

  const validate = () => {
    const e = {}
    if (mode === 'signup' && values.name.trim().length < 2) e.name = 'Please enter your name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) e.email = 'Please enter a valid email'
    if (values.password.length < 6) e.password = 'Password should be at least 6 characters'
    if (mode === 'signup' && values.confirm !== values.password) e.confirm = "Passwords don't match"
    return e
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return
    setBusy(true)
    try {
      if (mode === 'signup') await signUp({ name: values.name.trim(), email: values.email, password: values.password })
      else await logIn({ email: values.email, password: values.password })
      navigate('/profile')
    } catch (err) {
      setFormError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const onGoogle = async () => {
    setFormError('')
    setBusy(true)
    try {
      await logInWithGoogle()
      navigate('/profile')
    } catch (err) {
      setFormError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,#000_10%,transparent_70%)]" />
      <div className="container-x relative grid gap-6 lg:grid-cols-[1fr_1.05fr]">
        {/* Brand panel */}
        <motion.div
          key={`panel-${mode}`}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative hidden min-h-[620px] flex-col justify-between overflow-hidden rounded-[28px] bg-brand p-10 lg:flex"
        >
          <motion.div
            className="sun grain absolute -bottom-36 -right-24 size-[440px] rounded-full"
            style={{ background: 'radial-gradient(circle at 35% 30%, #ffb27a, #ff8a2b 45%, #f2381d 100%)' }}
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div className="absolute right-10 top-10 w-16" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
            <Star white className="w-full" />
          </motion.div>
          <h1 className="display relative text-[length:clamp(5rem,9vw,8.5rem)] text-white">
            <MaskLines key={mode} inView={false} delay={0.15} lines={copy.lines} />
          </h1>
          <ul className="relative grid gap-3 text-white">
            {perks.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: EASE }}
                className="flex items-center gap-3"
              >
                <span className="grid size-6 place-items-center rounded-full bg-white/20"><FaCheck className="size-3" /></span>
                {p}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Form card */}
        <motion.div
          key={`form-${mode}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="rounded-[28px] border border-line bg-card p-6 sm:p-10"
        >
          <h2 className="display text-5xl">{copy.title}</h2>
          <p className="mt-2 text-muted">{copy.sub}</p>

          <button
            type="button"
            onClick={onGoogle}
            disabled={busy}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-3.5 font-medium text-ink transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-12px_rgba(255,255,255,.5)] disabled:opacity-60"
          >
            <FcGoogle className="size-5" /> Continue with Google
          </button>

          <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-[.14em] text-muted">
            <span className="h-px flex-1 bg-line" /> or with email <span className="h-px flex-1 bg-line" />
          </div>

          <form noValidate onSubmit={onSubmit} className="grid gap-4">
            <AnimatePresence initial={false}>
              {mode === 'signup' && (
                <motion.div key="name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <Field label="Full name" name="name" value={values.name} error={errors.name} onChange={onChange} placeholder="Your name" autoComplete="name" />
                </motion.div>
              )}
            </AnimatePresence>
            <Field label="Email" name="email" type="email" value={values.email} error={errors.email} onChange={onChange} placeholder="you@example.com" autoComplete="email" />
            <Field
              label="Password"
              name="password"
              type={show ? 'text' : 'password'}
              value={values.password}
              error={errors.password}
              onChange={onChange}
              placeholder={mode === 'signup' ? 'At least 6 characters' : 'Your password'}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              suffix={<PasswordToggle show={show} onClick={() => setShow((s) => !s)} />}
            />
            <AnimatePresence initial={false}>
              {mode === 'signup' && (
                <motion.div key="confirm" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <Field label="Confirm password" name="confirm" type={show ? 'text' : 'password'} value={values.confirm} error={errors.confirm} onChange={onChange} placeholder="Type it again" autoComplete="new-password" />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {formError && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="rounded-xl border border-brand-3/50 bg-brand-3/10 px-4 py-3 text-sm text-brand-2"
                  role="alert"
                >
                  {formError}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button type="submit" disabled={busy} whileTap={{ scale: 0.98 }} className="btn btn-orange btn-lg mt-2 w-full disabled:opacity-70">
              {busy ? (
                <>
                  <motion.span className="size-4 rounded-full border-2 border-white/40 border-t-white" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                  Please wait…
                </>
              ) : (
                <>{copy.button} <FaArrowRight className="size-4" /></>
              )}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            {copy.switchText}{' '}
            <a href={copy.switchLink[1]} className="font-medium text-brand-2 hover:underline">{copy.switchLink[0]}</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
