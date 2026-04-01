import React from 'react'
import { Link } from 'react-router-dom'
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi'

const footerLinks = {
  Platform: [
    { label: 'Schedule Interview', to: '/dashboard' },
    { label: 'My Interviews', to: '/my-interviews' },
    { label: 'Practice Resources', to: '/practice' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Our Team', to: '/about#team' },
    { label: 'Contact', to: '/about#contact' },
  ],
  Support: [
    { label: 'FAQs', to: '/about#faq' },
    { label: 'Login', to: '/login' },
    { label: 'Sign Up', to: '/signup' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-700/50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <span className="text-white font-black text-lg">M</span>
              </div>
              <span className="text-xl font-bold gradient-text">MeetConnect</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Empowering students and professionals to ace their technical interviews through
              personalized mock sessions with industry experts.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: <FiGithub />, href: 'https://github.com', label: 'GitHub' },
                { icon: <FiTwitter />, href: 'https://twitter.com', label: 'Twitter' },
                { icon: <FiLinkedin />, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: <FiMail />, href: 'mailto:hello@meetconnect.io', label: 'Email' },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">{group}</h3>
              <ul className="space-y-3">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-slate-400 text-sm hover:text-indigo-400 transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} MeetConnect. All rights reserved.</p>
          <p>Built with ❤️ for aspiring developers</p>
        </div>
      </div>
    </footer>
  )
}
