import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

/* =====================================================================
   DUMMY AUTH — frontend only, no backend.
   Accounts and profiles are saved in this browser's localStorage so
   every screen works for demos. Nothing is sent anywhere and it is
   NOT secure — swap this file for a real backend before launch.
   ===================================================================== */

const AuthCtx = createContext(null)
export const useAuth = () => useContext(AuthCtx)

const USERS_KEY = 'endspell_users'
const SESSION_KEY = 'endspell_session'

const readUsers = () => { try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {} } catch { return {} } }
const writeUsers = (u) => localStorage.setItem(USERS_KEY, JSON.stringify(u))
const wait = (ms) => new Promise((r) => setTimeout(r, ms)) // fake network delay
const fail = (msg) => new Error(msg)

async function hash(text) {
  if (window.crypto?.subtle) {
    const buf = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
  }
  return btoa(unescape(encodeURIComponent(text)))
}
// eslint-disable-next-line no-unused-vars
const publicProfile = ({ passHash, ...rest }) => rest
const blankProfile = (email, name = '', extra = {}) => ({ name, email, phone: '', bio: '', photo: '', provider: 'email', ...extra })

/* Dummy Google account used by "Continue with Google" */
const GOOGLE_DEMO = { email: 'demo.student@gmail.com', name: 'Demo Student' }

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null) // { name, email, phone, bio, photo, provider }
  const [loading, setLoading] = useState(true)

  /* restore session on page load */
  useEffect(() => {
    const email = localStorage.getItem(SESSION_KEY)
    const users = readUsers()
    if (email && users[email]) setProfile(publicProfile(users[email]))
    setLoading(false)
  }, [])

  const startSession = (record) => {
    localStorage.setItem(SESSION_KEY, record.email)
    setProfile(publicProfile(record))
  }

  const signUp = useCallback(async ({ name, email, password }) => {
    await wait(600)
    email = email.trim().toLowerCase()
    const users = readUsers()
    if (users[email]) throw fail('An account with this email already exists.')
    if (password.length < 6) throw fail('Password should be at least 6 characters.')
    users[email] = { ...blankProfile(email, name), passHash: await hash(password) }
    writeUsers(users)
    startSession(users[email])
  }, [])

  const logIn = useCallback(async ({ email, password }) => {
    await wait(600)
    email = email.trim().toLowerCase()
    const users = readUsers()
    if (!users[email]) throw fail('No account found with this email. Please sign up first.')
    if (users[email].passHash !== (await hash(password))) throw fail('Wrong email or password.')
    startSession(users[email])
  }, [])

  const logInWithGoogle = useCallback(async () => {
    await wait(700)
    const users = readUsers()
    const { email, name } = GOOGLE_DEMO
    if (!users[email]) {
      users[email] = blankProfile(email, name, { provider: 'google' })
      writeUsers(users)
    }
    startSession(users[email])
  }, [])

  const logOut = useCallback(async () => {
    localStorage.removeItem(SESSION_KEY)
    setProfile(null)
  }, [])

  const saveProfile = useCallback(async (changes) => {
    if (!profile) return
    await wait(500)
    const users = readUsers()
    users[profile.email] = { ...users[profile.email], ...changes }
    try { writeUsers(users) } catch { throw fail('Photo is too large to save. Please choose a smaller image.') }
    setProfile(publicProfile(users[profile.email]))
  }, [profile])

  const value = useMemo(
    () => ({ user: profile, profile, loading, signUp, logIn, logInWithGoogle, logOut, saveProfile }),
    [profile, loading, signUp, logIn, logInWithGoogle, logOut, saveProfile],
  )
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}
