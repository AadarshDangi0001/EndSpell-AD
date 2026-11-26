import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import { FaCamera, FaEnvelope, FaPhone, FaPen, FaRightFromBracket, FaTrash, FaCheck, FaQuoteLeft } from 'react-icons/fa6'
import { useAuth } from '../auth/AuthContext'
import { navigate } from '../router'
import { Avatar, Field, Star, EASE } from './ui'

const BIO_MAX = 200

/* Crop the chosen image to a square and shrink it so it stays small */
function resizeImage(file, size = 320) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const c = document.createElement('canvas')
      c.width = size
      c.height = size
      const s = Math.min(img.width, img.height)
      c.getContext('2d').drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size)
      URL.revokeObjectURL(img.src)
      resolve(c.toDataURL('image/jpeg', 0.85))
    }
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}

function Cover() {
  return (
    <div className="relative h-[200px] overflow-hidden rounded-[28px] border border-line bg-card sm:h-[240px]">
      <div className="grid-bg absolute inset-0" />
      <motion.div
        className="sun grain absolute -right-16 -top-28 size-[380px] rounded-full"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 50, damping: 14 }}
      />
      <motion.div className="absolute left-8 top-8 w-10 opacity-80" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
        <Star className="w-full" />
      </motion.div>
    </div>
  )
}

function InfoCard({ icon: Icon, label, value, empty, className = '' }) {
  return (
    <div className={`rounded-[22px] border border-line bg-card p-6 ${className}`}>
      <div className="flex items-center gap-2 text-[.7rem] uppercase tracking-[.14em] text-muted">
        <Icon className="size-3.5 text-brand" /> {label}
      </div>
      <p className={`mt-3 break-words text-[1.05rem] ${value ? '' : 'text-muted'}`}>{value || empty}</p>
    </div>
  )
}

export default function ProfilePage({ edit = false }) {
  const { user, profile, loading, saveProfile, logOut } = useAuth()
  const fileRef = useRef(null)
  const [form, setForm] = useState(null)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')

  /* not logged in → login page */
  useEffect(() => { if (!loading && !user) navigate('/login') }, [loading, user])

  /* fill the edit form */
  useEffect(() => {
    if (edit && profile) {
      setForm({ name: profile.name || '', phone: profile.phone || '', bio: profile.bio || '', photo: profile.photo || '' })
      setErrors({})
      setError('')
    }
  }, [edit, profile])

  useEffect(() => {
    if (!toast) return undefined
    const t = setTimeout(() => setToast(''), 2800)
    return () => clearTimeout(t)
  }, [toast])

  if (loading || !profile) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <motion.span className="size-8 rounded-full border-2 border-line border-t-brand" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
      </div>
    )
  }

  const displayName = profile.name || profile.email.split('@')[0]

  const onPhoto = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) { setError('Please choose an image file.'); return }
    try {
      const photo = await resizeImage(file)
      setForm((f) => ({ ...f, photo }))
      setError('')
    } catch {
      setError("Couldn't read that image. Please try another one.")
    }
  }

  const onChange = (e) => {
    const { name, value } = e.target
    const v = name === 'phone' ? value.replace(/[^\d\s]/g, '').slice(0, 11) : name === 'bio' ? value.slice(0, BIO_MAX) : value
    setForm((f) => ({ ...f, [name]: v }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSave = async (e) => {
    e.preventDefault()
    const errs = {}
    if (form.name.trim().length < 2) errs.name = 'Please enter your name'
    const digits = form.phone.replace(/\D/g, '')
    if (digits && !/^[6-9]\d{9}$/.test(digits)) errs.phone = 'Please enter a valid 10-digit mobile number'
    setErrors(errs)
    if (Object.keys(errs).length) return
    setSaving(true)
    try {
      await saveProfile({ name: form.name.trim(), phone: digits, bio: form.bio.trim(), photo: form.photo })
      setToast('Profile updated')
      navigate('/profile')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const onLogout = async () => {
    await logOut()
    navigate('/')
  }

  const phonePretty = profile.phone ? `+91 ${profile.phone.slice(0, 5)} ${profile.phone.slice(5)}` : ''

  return (
    <section className="relative pb-28 pt-10">
      <div className="container-x">
        <Cover />

        <AnimatePresence mode="wait">
          {!edit ? (
            /* ---------------- VIEW ---------------- */
            <motion.div key="view" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6, ease: EASE }}>
              <div className="relative z-10 flex flex-wrap items-start justify-between gap-6 px-2 sm:px-8">
                <div className="flex flex-wrap items-start gap-x-6 gap-y-3">
                  <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }} className="relative -mt-16 shrink-0 rounded-full ring-[6px] ring-ink sm:-mt-20">
                    <Avatar name={displayName} photo={profile.photo} color="#ff5f1f" className="size-32 sm:size-40" textClass="text-4xl" />
                  </motion.div>
                  <div className="min-w-0 pt-5">
                    <h1 className="display break-words text-[length:clamp(2.8rem,6vw,4.5rem)] leading-[.95]">{displayName}</h1>
                    <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                      {profile.provider === 'google' && <FcGoogle className="size-4" />}
                      EndSpell learner
                    </p>
                  </div>
                </div>
                <div className="flex gap-2.5 pt-5">
                  <a href="/profile/edit" className="btn btn-orange"><FaPen className="size-3.5" /> Edit profile</a>
                  <button onClick={onLogout} className="btn btn-line"><FaRightFromBracket className="size-3.5" /> Log out</button>
                </div>
              </div>

              <div className="mt-10 grid gap-3.5 md:grid-cols-2">
                <InfoCard icon={FaEnvelope} label="Email" value={profile.email} />
                <InfoCard icon={FaPhone} label="Phone" value={phonePretty} empty="Add your phone number" />
                <InfoCard icon={FaQuoteLeft} label="Bio" value={profile.bio} empty="Tell other learners a little about yourself." className="md:col-span-2" />
              </div>
            </motion.div>
          ) : (
            /* ---------------- EDIT ---------------- */
            form && (
              <motion.form
                key="edit"
                noValidate
                onSubmit={onSave}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6, ease: EASE }}
                className="relative z-10 mx-auto -mt-16 max-w-[760px] sm:-mt-20"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="group relative rounded-full ring-[6px] ring-ink">
                    <Avatar name={form.name || displayName} photo={form.photo} color="#ff5f1f" className="size-32 sm:size-40" textClass="text-4xl" />
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="absolute inset-0 grid place-items-center rounded-full bg-black/55 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label="Change photo"
                    >
                      <FaCamera className="size-7 text-white" />
                    </button>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPhoto} />
                  <div className="mt-4 flex gap-2.5">
                    <button type="button" onClick={() => fileRef.current?.click()} className="btn btn-line px-4 py-2 text-sm"><FaCamera className="size-3.5" /> Change photo</button>
                    {form.photo && (
                      <button type="button" onClick={() => setForm((f) => ({ ...f, photo: '' }))} className="btn btn-line px-4 py-2 text-sm"><FaTrash className="size-3.5" /> Remove</button>
                    )}
                  </div>
                  <h1 className="display mt-6 text-5xl">Edit profile</h1>
                </div>

                <div className="mt-8 grid gap-5 rounded-[28px] border border-line bg-card p-6 sm:p-9">
                  <Field label="Full name" name="name" value={form.name} error={errors.name} onChange={onChange} placeholder="Your name" autoComplete="name" />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Email" name="email" value={profile.email} onChange={() => {}} disabled hint="Email can't be changed" />
                    <Field label="Phone number" name="phone" type="tel" prefix="+91" value={form.phone} error={errors.phone} onChange={onChange} placeholder="98765 43210" inputMode="numeric" autoComplete="tel-national" />
                  </div>
                  <div>
                    <Field label="Bio" name="bio" textarea value={form.bio} onChange={onChange} placeholder="What are you learning? What do you want to build?" />
                    <span className="mt-1.5 block text-right text-xs text-muted">{form.bio.length}/{BIO_MAX}</span>
                  </div>

                  {error && <p className="rounded-xl border border-brand-3/50 bg-brand-3/10 px-4 py-3 text-sm text-brand-2" role="alert">{error}</p>}

                  <div className="flex flex-wrap justify-end gap-2.5">
                    <a href="/profile" className="btn btn-line">Cancel</a>
                    <motion.button type="submit" disabled={saving} whileTap={{ scale: 0.98 }} className="btn btn-orange disabled:opacity-70">
                      {saving ? (
                        <>
                          <motion.span className="size-4 rounded-full border-2 border-white/40 border-t-white" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                          Saving…
                        </>
                      ) : (
                        <><FaCheck className="size-3.5" /> Save changes</>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.form>
            )
          )}
        </AnimatePresence>
      </div>

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-cream px-5 py-3 text-sm font-medium text-ink shadow-2xl"
          >
            <span className="grid size-5 place-items-center rounded-full bg-brand"><FaCheck className="size-2.5 text-white" /></span>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
