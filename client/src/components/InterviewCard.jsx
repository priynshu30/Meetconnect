import React from 'react'
import { FiCalendar, FiClock, FiUser, FiExternalLink, FiStar, FiCheckCircle, FiXCircle, FiBookOpen } from 'react-icons/fi'

const typeBadgeMap = {
  Frontend: 'badge-info',
  Backend: 'badge-purple',
  'Full-Stack': 'badge-warning',
  DSA: 'badge-success',
  Behavioral: 'badge-error',
}

export default function InterviewCard({ interview, type }) {
  const badgeClass = typeBadgeMap[interview.type] || 'badge-info'

  return (
    <div className="card group cursor-default">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className={`badge ${badgeClass} mb-2`}>{interview.type}</span>
          <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
            <FiCalendar size={13} />
            <span>{interview.date}</span>
            <FiClock size={13} className="ml-1" />
            <span>{interview.time}</span>
          </div>
        </div>
        {type === 'completed' && (
          <div className="flex flex-col items-end gap-1">
            {interview.result === 'Pass' ? (
              <span className="badge-success flex items-center gap-1"><FiCheckCircle size={11} /> Pass</span>
            ) : interview.result === 'Fail' ? (
              <span className="badge-error flex items-center gap-1"><FiXCircle size={11} /> Fail</span>
            ) : (
              <span className="badge-warning">Pending</span>
            )}
            {interview.score !== null && (
              <span className="flex items-center gap-1 text-amber-400 text-sm font-semibold">
                <FiStar size={12} />
                {interview.score}/10
              </span>
            )}
          </div>
        )}
        {type === 'upcoming' && (
          <span className="badge bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse">
            ● Upcoming
          </span>
        )}
      </div>

      {/* Interviewer */}
      <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-slate-800/50">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {interview.interviewer?.charAt(0) || 'I'}
        </div>
        <div>
          <p className="text-white text-sm font-medium">{interview.interviewer}</p>
          <p className="text-slate-500 text-xs flex items-center gap-1"><FiUser size={10} /> Interviewer</p>
        </div>
      </div>

      {/* Feedback (completed) */}
      {type === 'completed' && interview.feedback && (
        <div className="mb-4 p-3 rounded-xl bg-slate-800/50 border-l-2 border-indigo-500">
          <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wide">Feedback</p>
          <p className="text-slate-300 text-sm leading-relaxed">{interview.feedback}</p>
        </div>
      )}

      {/* Resources (upcoming) */}
      {type === 'upcoming' && interview.resources?.length > 0 && (
        <div>
          <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wide flex items-center gap-1">
            <FiBookOpen size={11} /> Prep Resources
          </p>
          <div className="space-y-1.5">
            {interview.resources.slice(0, 3).map((r, i) => (
              <a
                key={i}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-xs transition-colors"
              >
                <FiExternalLink size={11} className="flex-shrink-0" />
                <span className="truncate">{r.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
