import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaWhatsapp, FaLocationDot, FaClock, FaCheck, FaArrowRight } from 'react-icons/fa6'
import { contact } from '../data/content'
import { Field, MaskLines, Reveal, Star, EASE } from './ui'

const EMPTY = { name: '', email: '', phone: '', message: '' }

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Please enter a valid email'
  if (!/^[6-9]\d{9}$/.test(v.phone.replace(/\D/g, '').slice(-10)) || v.phone.replace(/\D/g, '').length < 10) e.phone = 'Please enter a valid 10-digit mobile number'
  if (v.message.trim().length < 10) e.message = 'Message should be at least 10 characters'
  return e
}

function InfoRow({ icon: Icon, label, value, href }) {
  const inner = (
    <div className="group flex items-center gap-4 rounded-2xl border border-line bg-card px-5 py-4 transition-colors duration-300 hover:border-brand/60">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand-2 transition-colors group-hover:bg-brand group-hover:text-white">
        <Icon className="size-[18px]" />
      </span>
      <div className="min-w-0">
        <small className="block text-[.7rem] uppercase tracking-[.14em] text-muted">{label}</small>
        <span className="block truncate">{value}</span>
      </div>
    </div>
  )
  return href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{inner}</a> : inner
}

export default function ContactPage() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | mailto | error

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: name === 'phone' ? value.replace(/[^\d\s+]/g, '').slice(0, 15) : value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length) return

    // No form key yet → open the visitor's email app with everything filled in
    if (!contact.web3formsKey) {
      const body = `Name: ${values.name}\nEmail: ${values.email}\nPhone: +91 ${values.phone}\n\n${values.message}`
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent('Enquiry from EndSpell website')}&body=${encodeURIComponent(body)}`
      setStatus('mailto')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: contact.web3formsKey,
          subject: `New enquiry from ${values.name} — EndSpell website`,
          from_name: 'EndSpell Website',
          name: values.name,
          email: values.email,
          phone: `+91 ${values.phone}`,
          message: values.message,
        }),
      })
      const data = await res.json()
      setStatus(data.success ? 'sent' : 'error')
      if (data.success) setValues(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="relative overflow-hidden pb-28 pt-16">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,#000_10%,transparent_70%)]" />
      <motion.div
        className="sun grain pointer-events-none absolute -right-32 -top-24 size-[min(46vw,520px)] rounded-full opacity-90"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.9 }}
        transition={{ type: 'spring', stiffness: 50, damping: 14, delay: 0.3 }}
      />

      <div className="container-x relative">
        <motion.span className="kicker" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
          Contact us
        </motion.span>
        <h1 className="display mt-4 text-[length:clamp(4rem,12vw,10.5rem)]">
          <MaskLines inView={false} delay={0.1} lines={["Let's talk.", <span className="text-brand">We're listening.</span>]} />
        </h1>
        <motion.p
          className="mt-6 max-w-[520px] text-[1.05rem] text-[#cfcbc3]"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
        >
          Questions about a course, fees, batches or mentorship? Send us a message and our team will get back to you within 24 hours.
        </motion.p>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.25fr]">
          {/* Left: contact details */}
          <Reveal className="space-y-3.5">
            <InfoRow icon={FaEnvelope} label="Email" value={contact.email} href={`mailto:${contact.email}`} />
            <InfoRow icon={FaPhone} label="Phone" value={contact.phone} href={`tel:${contact.phone.replace(/\s/g, '')}`} />
            <InfoRow icon={FaWhatsapp} label="WhatsApp" value="Chat with us" href={contact.whatsapp} />
            <InfoRow icon={FaLocationDot} label="Location" value={contact.location} />
            <InfoRow icon={FaClock} label="Hours" value={contact.hours} />

            <div className="relative mt-6 overflow-hidden rounded-[22px] bg-brand p-7">
              <motion.div className="absolute -bottom-10 -right-10 w-40 opacity-30" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
                <Star white className="w-full" />
              </motion.div>
              <div className="display text-4xl leading-[.9]">Not sure which<br />course to pick?</div>
              <p className="relative mt-3 max-w-[300px] text-sm text-white/90">Tell us your goal in the message — we'll suggest the right course for you.</p>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-[28px] border border-line bg-card p-6 sm:p-9">
              <AnimatePresence mode="wait">
                {status === 'sent' || status === 'mailto' ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="flex min-h-[520px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      className="grid size-20 place-items-center rounded-full bg-brand"
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.15 }}
                    >
                      <FaCheck className="size-8 text-white" />
                    </motion.span>
                    <h2 className="display mt-6 text-5xl">{status === 'sent' ? 'Message sent!' : 'Almost done!'}</h2>
                    <p className="mt-3 max-w-[360px] text-muted">
                      {status === 'sent'
                        ? "Thanks for reaching out. Our team will get back to you within 24 hours."
                        : 'Your email app has opened with your message — just press send.'}
                    </p>
                    <button onClick={() => setStatus('idle')} className="btn btn-line mt-8">Send another message</button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    noValidate
                    onSubmit={onSubmit}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="grid gap-5"
                  >
                    <div>
                      <h2 className="display text-4xl">Send us a message</h2>
                      <p className="mt-1.5 text-sm text-muted">All fields are required.</p>
                    </div>
                    <Field label="Full name" name="name" value={values.name} error={errors.name} onChange={onChange} placeholder="Your name" autoComplete="name" />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Email" name="email" type="email" value={values.email} error={errors.email} onChange={onChange} placeholder="you@example.com" autoComplete="email" />
                      <Field label="Phone number" name="phone" type="tel" prefix="+91" value={values.phone} error={errors.phone} onChange={onChange} placeholder="98765 43210" autoComplete="tel-national" inputMode="numeric" />
                    </div>
                    <Field label="Message" name="message" textarea value={values.message} error={errors.message} onChange={onChange} placeholder="Tell us what you'd like to learn or ask…" />

                    {status === 'error' && (
                      <p className="rounded-xl border border-brand-3/50 bg-brand-3/10 px-4 py-3 text-sm text-brand-2">
                        Something went wrong. Please try again, or email us at {contact.email}.
                      </p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileTap={{ scale: 0.98 }}
                      className="btn btn-orange btn-lg mt-1 w-full disabled:opacity-70"
                    >
                      {status === 'sending' ? (
                        <>
                          <motion.span className="size-4 rounded-full border-2 border-white/40 border-t-white" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                          Sending…
                        </>
                      ) : (
                        <>Send message <FaArrowRight className="size-4" /></>
                      )}
                    </motion.button>
                    <p className="text-center text-xs text-muted">We'll only use your details to reply to your enquiry.</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
