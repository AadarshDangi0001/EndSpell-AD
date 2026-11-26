/* =====================================================================
   ENDSPELL — EDIT ALL WEBSITE CONTENT HERE
   ===================================================================== */
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs,
  SiExpress, SiPython, SiMongodb, SiMysql, SiGit, SiGithub, SiFigma, SiTailwindcss,
  SiDocker, SiTensorflow, SiPandas, SiNumpy, SiJupyter, SiFirebase, SiMeta,
  SiGoogleads, SiGoogleanalytics, SiNotion, SiGooglegemini, SiVite, SiPostman,
} from 'react-icons/si'

/* ---------- Hero ---------- */
export const heroMeta = [
  { label: 'Format', value: 'Live + Recorded' },
  { label: 'Language', value: 'Hindi & English' },
  { label: 'Focus', value: 'Job-ready skills' },
  { label: 'Access', value: 'Lifetime' },
]

export const stripWords = ['Learn by building', 'Live classes', 'Real projects', 'Mentor support', 'Get certified', 'Get hired']

/* ---------- Stats (replace with your real numbers) ---------- */
export const stats = {
  learners: 10000,
  courses: 50,
  completion: 95,
  projects: 100,
}

/* ---------- Tools & skills (real logos via react-icons / Simple Icons) ---------- */
export const tools = [
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS', icon: SiCss, color: '#1572B6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'Express', icon: SiExpress, color: '#FFFFFF' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Vite', icon: SiVite, color: '#A855F7' },
  { name: 'Python', icon: SiPython, color: '#4B8BBE' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, color: '#FFFFFF' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
  { name: 'Pandas', icon: SiPandas, color: '#E70488' },
  { name: 'NumPy', icon: SiNumpy, color: '#4DABCF' },
  { name: 'Jupyter', icon: SiJupyter, color: '#F37626' },
  { name: 'Gemini', icon: SiGooglegemini, color: '#8E75B2' },
  { name: 'Meta Ads', icon: SiMeta, color: '#0866FF' },
  { name: 'Google Ads', icon: SiGoogleads, color: '#4285F4' },
  { name: 'Google Analytics', icon: SiGoogleanalytics, color: '#E37400' },
  { name: 'Notion', icon: SiNotion, color: '#FFFFFF' },
]

/* ---------- Courses ----------
   cat: dev | data | design | marketing
   thumb: image in /public/courses (16:9 works best). Without it, the card shows the orange design.                                    */
export const courseTabs = [
  { id: 'all', label: 'All' },
  { id: 'dev', label: 'Development' },
  { id: 'data', label: 'Data & AI' },
  { id: 'design', label: 'Design' },
  { id: 'marketing', label: 'Marketing' },
]

export const courses = [
  { cat: 'dev', label: 'Development', title: 'Full Stack Web Development', thumb: '/courses/full-stack.jpg', short: 'Full Stack', desc: 'Go from HTML basics to deploying full MERN apps.', weeks: '24 weeks', lessons: '180+ lessons', level: 'Beginner', price: '₹4,999', mrp: '₹12,999', badge: 'Bestseller', icon: SiReact, iconColor: '#61DAFB' },
  { cat: 'data', label: 'Data & AI', title: 'Data Science & Machine Learning', thumb: '/courses/data-science.jpg', short: 'Data Science', desc: 'Python, statistics, ML models and real datasets.', weeks: '20 weeks', lessons: '150+ lessons', level: 'Intermediate', price: '₹5,999', mrp: '₹14,999', badge: 'New', icon: SiPython, iconColor: '#FFD43B' },
  { cat: 'dev', label: 'Development', title: 'DSA & Placement Preparation', thumb: '/courses/dsa-placement.jpg', short: 'DSA + Placement', desc: 'Crack coding rounds with 300+ curated problems.', weeks: '16 weeks', lessons: '120+ lessons', level: 'All levels', price: '₹3,499', mrp: '₹8,999', badge: 'Popular', icon: SiJavascript, iconColor: '#F7DF1E' },
  // HIDDEN FOR NOW — remove the "// " to show again
  // { cat: 'design', label: 'Design', title: 'UI/UX Design with Figma', short: 'UI / UX Design', desc: 'Design beautiful apps and build a case-study portfolio.', weeks: '12 weeks', lessons: '90+ lessons', level: 'Beginner', price: '₹3,999', mrp: '₹9,999', badge: 'Trending', icon: SiFigma, iconColor: '#F24E1E' },
  // HIDDEN FOR NOW — remove the "// " to show again
  // { cat: 'data', label: 'Data & AI', title: 'Generative AI & Prompt Engineering', short: 'Generative AI', desc: 'Use AI tools to work faster and build AI apps.', weeks: '8 weeks', lessons: '60+ lessons', level: 'Beginner', price: '₹2,499', mrp: '₹6,999', badge: 'Hot', icon: SiGooglegemini, iconColor: '#C4B5FD' },
  // HIDDEN FOR NOW — remove the "// " to show again
  // { cat: 'marketing', label: 'Marketing', title: 'Digital Marketing & Meta Ads', short: 'Digital Marketing', desc: 'SEO, social media, performance ads and analytics.', weeks: '10 weeks', lessons: '80+ lessons', level: 'Beginner', price: '₹2,999', mrp: '₹7,999', badge: 'New', icon: SiMeta, iconColor: '#0866FF' },
]

/* ---------- Mentors ----------
   Put photos in /public/mentors and set photo: '/mentors/file.jpg'        */
export const mentors = [
  { name: 'Aadarsh Dangi', role: 'Full Stack Developer', photo: '/mentors/aadarsh-dangi.jpg' },
  { name: 'Abhishek Namedeo', role: 'AI Engineer', photo: '/mentors/abhishek-namedeo.jpg' },
  { name: 'Manav Khare', role: 'SDE-1', photo: '/mentors/manav-khare.jpg' },
  { name: 'Rohit Singh', role: 'Growth Marketer', photo: '/mentors/rohit-singh.jpg' },
]

/* ---------- Reviews ----------
   SAMPLE / MOCK DATA for design only — these people are not real.
   Before launch: replace with REAL reviews from your students (with permission)
   and set  reviewsAreSamples = false  — that also hides the "Sample reviews" tag.
   No photo → an illustrated cartoon avatar is generated from the name.
   Real photos: put them in /public/reviews and set photo: '/reviews/file.jpg'. */
export const reviewsAreSamples = true

export const reviews = [
  { name: 'Aarav Sharma', course: 'Full Stack Web Development', stars: 5, photo: '', text: 'Pehle sirf tutorials dekhta tha, yahan pe actually projects banaye. Mera portfolio ab 4 live apps ke saath ready hai.' },
  { name: 'Priya Iyer', course: 'Data Science & ML', stars: 4, photo: '', text: 'Concepts bahut simple tarike se samjhaye gaye. Pandas aur ML models finally clear hue, doubt sessions were super helpful.' },
  { name: 'Rohan Verma', course: 'DSA & Placement Prep', stars: 5, photo: '', text: 'Daily problem sheet aur mock interviews ne confidence badhaya. Coding rounds ab darawne nahi lagte.' },
  { name: 'Sneha Kulkarni', course: 'UI/UX Design', stars: 4, photo: '', text: 'Figma se lekar case study tak sab step by step. Bas advanced prototyping pe thoda aur content hota toh perfect tha.' },
  { name: 'Kabir Malhotra', course: 'Generative AI', stars: 4, photo: '', text: 'AI tools ko kaam mein use karna seekha. Short lessons hain, busy schedule mein bhi follow kar paaya.' },
  { name: 'Ananya Reddy', course: 'Digital Marketing', stars: 5, photo: '', text: 'Meta Ads ka practical setup live dikhaya gaya. Ab apne side business ke liye khud campaigns chala rahi hoon.' },
  { name: 'Vikram Singh', course: 'Full Stack Web Development', stars: 4, photo: '', text: 'Hindi + English mix mein padhaya, toh kuch bhi miss nahi hua. Node.js aur MongoDB ab comfortable lagta hai.' },
  { name: 'Ishita Patel', course: 'DSA & Placement Prep', stars: 5, photo: '', text: 'Structured roadmap mila jo YouTube pe nahi milta. Live session miss ho jaye toh recordings hamesha available hain.' },
  { name: 'Arjun Nair', course: 'Data Science & ML', stars: 5, photo: '', text: 'Real datasets pe kaam karna best part tha. Capstone project interview mein discuss karne ke liye perfect raha.' },
]

/* ---------- FAQs ---------- */
export const faqs = [
  { q: 'What is EndSpell?', a: 'EndSpell is an ed-tech platform offering practical, project-based courses in development, data & AI, design and marketing. Every course comes with a clear roadmap, real projects and mentor support.' },
  { q: 'Which course should I start with?', a: "Start with the track that matches your goal. If you're unsure, join a free class or talk to our team and we'll help you pick the right course." },
  { q: 'Do I need any prior experience?', a: 'No. Most courses start from the basics. Each course clearly mentions its level — Beginner, Intermediate or All levels.' },
  { q: 'Are the lectures in Hindi or English?', a: 'Lectures are explained in simple Hindi and English, so learners from every background can follow along comfortably.' },
  { q: 'Will I get a certificate?', a: "Yes. You'll receive an EndSpell certificate after completing the course and its final project, which you can add to your resume and LinkedIn." },
  { q: 'How does mentor support work?', a: 'Join live doubt-solving sessions, ask questions in the community, and get feedback on your projects from experienced mentors.' },
  { q: "What if I don't like the course?", a: 'Please check our Refund Policy for full details on eligibility and timelines.' },
]

/* ---------- Contact page ----------
   Fill in your real details.
   web3formsKey: get a FREE key at https://web3forms.com (just enter your email).
   With a key, form messages arrive straight in your inbox.
   Without a key, the form opens the visitor's email app instead.          */
export const contact = {
  email: 'hello@endspell.com',
  phone: '+91 00000 00000',
  whatsapp: 'https://wa.me/910000000000',
  location: 'India · Online classes',
  hours: 'Mon – Sat, 10 AM – 7 PM IST',
  web3formsKey: '',
}

/* ---------- Footer ---------- */
export const footerCols = [
  { title: 'Courses', links: [['Development', '#courses'], ['Data & AI', '#courses'], ['Design', '#courses'], ['Marketing', '#courses'], ['Free classes', '/contact']] },
  { title: 'Company', links: [['About us', '#why'], ['Mentors', '#mentors'], ['Become a mentor', '/contact'], ['Careers', '#'], ['Contact', '/contact']] },
  { title: 'Resources', links: [['Blog', '#'], ['Roadmaps', '#'], ['Certificates', '#'], ['FAQs', '#faq']] },
  { title: 'Legal', links: [['Privacy Policy', '#'], ['Terms of Use', '#'], ['Refund Policy', '#']] },
]

export const socials = {
  instagram: '#',
  youtube: '#',
  linkedin: '#',
  whatsapp: '#',
  discord: '#',
}

export const palette = ['#ff5f1f', '#f2381d', '#ff8a2b', '#c2410c', '#ea580c', '#fb923c', '#9a3412', '#f97316']
export const initials = (n) => n.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
