import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCalendar, FiUsers, FiTrendingUp } from 'react-icons/fi'

const stats = [
  { label: 'Mock Interviews', value: '10,000+', icon: <FiCalendar /> },
  { label: 'Expert Interviewers', value: '200+', icon: <FiUsers /> },
  { label: 'Success Rate', value: '87%', icon: <FiTrendingUp /> },
]

export default function Banner() {
  return (
    <section className="relative overflow-hidden hero-bg py-20 md:py-28">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center mb-6 animate-fade-in">
          <span className="badge-info text-xs font-semibold tracking-wider uppercase py-1 px-4">
            🚀 Land Your Dream Tech Job
          </span>
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight mb-6 animate-slide-up text-shadow">
            Ace Your{' '}
            <span className="gradient-text">Technical Interviews</span>
            {' '}with Confidence
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed animate-fade-in max-w-2xl mx-auto">
            Schedule personalized mock interviews with industry experts from Google, Amazon, Microsoft and more.
            Get real feedback, track your progress, and land the job.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up">
            <Link
              to="/dashboard"
              id="hero-schedule-btn"
              className="btn-primary flex items-center justify-center gap-2 text-base py-4 px-8"
            >
              Schedule Free Interview <FiArrowRight />
            </Link>
            <Link
              to="/practice"
              id="hero-practice-btn"
              className="btn-secondary flex items-center justify-center gap-2 text-base py-4 px-8"
            >
              Browse Practice Resources
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {stats.map(({ label, value, icon }) => (
            <div key={label} className="glass rounded-2xl p-6 text-center animate-fade-in">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-3">
                {icon}
              </div>
              <div className="text-3xl font-black gradient-text mb-1">{value}</div>
              <div className="text-slate-400 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
