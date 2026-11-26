# EndSpell website

React + Vite + Tailwind CSS v4, with Lenis smooth scrolling and Framer Motion animations.

## Run it

You need Node.js 18 or newer (https://nodejs.org).

```bash
cd endspell-react
npm install
npm run dev
```

Then open the link it prints (usually http://localhost:5173).

To make the final website files for hosting: `npm run build`. The output goes to the `dist/` folder. You can upload it to Vercel, Netlify or GitHub Pages.

## Edit the content

Everything is in **`src/data/content.js`**: stats, courses, tools, mentors, reviews, FAQs, footer links and social links.

### Reviews and mentors with photos
1. Put the photos in `public/reviews/` (or `public/mentors/`), for example `public/reviews/riya.jpg`.
2. In `content.js`, set `photo: '/reviews/riya.jpg'` and fill in the real name, course and review text.
3. A card without a photo shows the person's initials.

Only use real reviews from your students, with their permission.

## Pages

| URL | Page |
|---|---|
| `/` | Home |
| `/contact` | Contact form |
| `/login` · `/signup` | Log in / Sign up (email + password, or "Continue with Google") |
| `/profile` · `/profile/edit` | Profile page and edit profile (photo, name, phone, bio) |

### Login is dummy (frontend only)
There's no backend yet. Accounts and profiles are saved in the visitor's browser (localStorage),
and "Continue with Google" signs in a demo account. It's for showing the design only — not secure.
All the login logic is in `src/auth/AuthContext.jsx`, so it can be swapped for a real backend later
without touching the pages.

## Where things live

| File | Section |
|---|---|
| `src/components/Hero.jsx` | Hero headline + orange sun |
| `src/components/Why.jsx` | Orange strip, stats grid, tool logos |
| `src/components/Courses.jsx` | Course cards + filter tabs |
| `src/components/LaptopSection.jsx` | Scroll-driven laptop animation |
| `src/components/People.jsx` | Mentors + reviews |
| `src/components/Closing.jsx` | Community, CTA, FAQ, footer |
| `src/components/ContactPage.jsx` | Contact page |
| `src/components/AuthPage.jsx` | Log in + Sign up pages |
| `src/components/ProfilePage.jsx` | Profile + edit profile |
| `src/index.css` | Colours, fonts, shared styles |

Brand colours are set at the top of `src/index.css` (`--color-brand` is the main orange).
# EndSpell-AD
