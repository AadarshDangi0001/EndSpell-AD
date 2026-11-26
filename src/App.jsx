import { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { navigate, usePath } from './router'
import Navbar, { Announcement } from './components/Navbar'
import Hero from './components/Hero'
import Why, { Strip } from './components/Why'
import Courses from './components/Courses'
import LaptopSection from './components/LaptopSection'
import { Mentors, Reviews } from './components/People'
import { Community, CtaFaq, Footer } from './components/Closing'
import ContactPage from './components/ContactPage'
import AuthPage from './components/AuthPage'
import ProfilePage from './components/ProfilePage'
import { AuthProvider } from './auth/AuthContext'

/* Handles every link click:
   • "#section"  → smooth-scroll on the home page (or go home first)
   • "/contact"  → switch page without reloading                            */
function LinkHandler({ path }) {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    const onClick = (e) => {
      const a = e.target.closest('a[href]')
      if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey) return
      const href = a.getAttribute('href')

      if (href.startsWith('#')) {
        e.preventDefault()
        if (window.location.pathname !== '/') {
          navigate('/')
          if (href !== '#') setTimeout(() => lenis.scrollTo(href, { offset: -80, duration: 1.4 }), 120)
          return
        }
        if (href === '#') lenis.scrollTo(0)
        else lenis.scrollTo(href, { offset: -80, duration: 1.4 })
        return
      }

      if (href.startsWith('/') && !href.startsWith('//')) {
        e.preventDefault()
        if (href !== window.location.pathname) navigate(href)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [lenis])

  /* new page → jump to top + update the tab title */
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true })
    const titles = { '/contact': 'Contact us', '/login': 'Log in', '/signup': 'Sign up', '/profile': 'My profile', '/profile/edit': 'Edit profile' }
    document.title = titles[path] ? `${titles[path]} — EndSpell` : 'EndSpell — Learn skills by building real things'
  }, [path, lenis])

  return null
}

function Home() {
  return (
    <main>
      <Hero />
      <Strip />
      <Why />
      <Courses />
      <LaptopSection />
      <Mentors />
      <Reviews />
      <Community />
      <CtaFaq />
    </main>
  )
}

function Page({ path }) {
  switch (path) {
    case '/contact': return <main><ContactPage /></main>
    case '/login': return <main><AuthPage mode="login" /></main>
    case '/signup': return <main><AuthPage mode="signup" /></main>
    case '/profile': return <main><ProfilePage /></main>
    case '/profile/edit': return <main><ProfilePage edit /></main>
    default: return <Home />
  }
}

export default function App() {
  const raw = usePath()
  const path = raw.length > 1 ? raw.replace(/\/+$/, '') : raw

  return (
    <AuthProvider>
      <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
        <LinkHandler path={path} />
        <Announcement />
        <Navbar />
        <Page path={path} />
        <Footer />
      </ReactLenis>
    </AuthProvider>
  )
}
