import React from 'react'
import Accordion from '../components/Accordion'
import { FiTarget, FiUsers, FiStar, FiLinkedin, FiTwitter } from 'react-icons/fi'

const team = [
  { name: 'Aryan Kapoor', role: 'Co-Founder & CEO', bio: 'Ex-Google engineer with 10+ years in tech. Passionate about democratizing interview prep.', emoji: '👨‍💼' },
  { name: 'Divya Sharma', role: 'Co-Founder & CTO', bio: 'MIT graduate, former Amazon SDE. Built scalable systems serving millions of users.', emoji: '👩‍💻' },
  { name: 'Kiran Patel', role: 'Head of Product', bio: 'Product guru with stints at Flipkart and Swiggy. Obsessed with user experience.', emoji: '🎯' },
  { name: 'Neha Gupta', role: 'Head of Partnerships', bio: 'Connected 150+ top engineers from FAANG to join our interviewer network.', emoji: '🤝' },
  { name: 'Rohan Sinha', role: 'Lead Engineer', bio: 'Full-stack developer and open-source enthusiast. Loves clean code and great coffee.', emoji: '⚙️' },
  { name: 'Shreya Mehta', role: 'Data & Analytics', bio: 'PhD in ML from IIT Delhi. Uses data to continuously improve interview outcomes.', emoji: '📊' },
]

const investors = [
  { name: 'Sequoia Capital India', contribution: 'Seed funding of ₹5 Cr', emoji: '🏦' },
  { name: 'Accel Partners', contribution: 'Series A lead, ₹20 Cr', emoji: '🚀' },
  { name: 'NASSCOM Startup Program', contribution: 'Strategic partner & mentorship', emoji: '🤝' },
  { name: 'Google for Startups', contribution: 'Cloud credits & accelerator', emoji: '☁️' },
]

const faqs = [
  { question: 'How does MeetConnect work?', answer: 'Sign up, schedule a mock interview by selecting the type, date, time, and interviewer. Your interviewer conducts a real-format session and provides detailed written feedback with a score within 24 hours.' },
  { question: 'Who are the interviewers?', answer: 'All interviewers are verified professionals with 4+ years of experience at top companies like Google, Amazon, Microsoft, Meta, and Flipkart. They go through a rigorous vetting process before joining.' },
  { question: 'How long is each session?', answer: 'Sessions are 45-60 minutes depending on interview type. DSA and Full-Stack interviews run 60 minutes while Behavioral interviews are 45 minutes.' },
  { question: 'What feedback will I receive?', answer: 'You receive a detailed report within 24 hours including: overall score (/10), strength and weakness breakdown, specific improvement areas, and curated resources.' },
  { question: 'Can I reschedule or cancel?', answer: 'Yes, you can reschedule up to 12 hours before your session through My Interviews. Cancellations within 12 hours may result in forfeiture of the session credit.' },
  { question: 'Is MeetConnect free?', answer: 'We offer a free first mock interview for all new users! Session packs are available starting at ₹499 per session after that.' },
]

export default function About() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="hero-bg py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-violet-600/10 rounded-full blur-3xl" />
        </div>
        <div className="page-container relative text-center">
          <span className="badge-info mb-6 inline-block">🏢 Our Story</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white max-w-3xl mx-auto mb-6 leading-tight">
            We're on a mission to{' '}
            <span className="gradient-text">democratize interview prep</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Founded in 2023 by engineers who struggled to find quality mock interview practice,
            MeetConnect connects students with industry experts for authentic, feedback-driven sessions.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="page-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: 'Mock Interviews Conducted', value: '10,000+', icon: <FiTarget /> },
            { label: 'Expert Interviewers', value: '200+', icon: <FiUsers /> },
            { label: 'Student Success Rate', value: '87%', icon: <FiStar /> },
            { label: 'Top Companies Hiring', value: '150+', icon: '🏢' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="card text-center">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-3">
                {typeof icon === 'string' ? <span className="text-xl">{icon}</span> : icon}
              </div>
              <div className="text-3xl font-black gradient-text mb-1">{value}</div>
              <div className="text-slate-400 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section id="team" className="page-container pt-0">
        <h2 className="section-title text-center">Meet the Team</h2>
        <p className="section-subtitle text-center">The people building MeetConnect</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {team.map(({ name, role, bio, emoji }) => (
            <div key={name} className="card group">
              <div className="flex items-start gap-4 mb-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-violet-500/30 border border-indigo-500/20 flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {emoji}
                </div>
                <div>
                  <h3 className="text-white font-bold">{name}</h3>
                  <p className="text-indigo-400 text-sm">{role}</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">{bio}</p>
              <div className="flex gap-2">
                {[FiLinkedin, FiTwitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-lg glass-light flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-colors">
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Investors */}
      <section className="page-container pt-0">
        <h2 className="section-title text-center">Our Investors</h2>
        <p className="section-subtitle text-center">Backed by the best in the business</p>
        <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {investors.map(({ name, contribution, emoji }) => (
            <div key={name} className="card flex items-center gap-4">
              <div className="text-4xl">{emoji}</div>
              <div>
                <h3 className="text-white font-bold">{name}</h3>
                <p className="text-slate-400 text-sm">{contribution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="page-container pt-0">
        <h2 className="section-title text-center">Frequently Asked Questions</h2>
        <p className="section-subtitle text-center">Got questions? We have answers.</p>
        <div className="max-w-3xl mx-auto">
          <Accordion items={faqs} />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="page-container pt-0">
        <div className="glass rounded-2xl p-10 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-3">Get in Touch</h2>
          <p className="text-slate-400 mb-6">Have more questions? Our team is happy to help.</p>
          <a href="mailto:hello@meetconnect.io" className="btn-primary inline-flex items-center gap-2">
            ✉️ hello@meetconnect.io
          </a>
        </div>
      </section>
    </div>
  )
}
