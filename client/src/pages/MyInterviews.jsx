import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInterviews } from '../redux/slices/interviewSlice'
import InterviewCard from '../components/InterviewCard'
import { FiList, FiFilter, FiCalendar, FiCheckSquare } from 'react-icons/fi'

const TYPES = ['All', 'Behavioral', 'Frontend', 'Backend', 'Full-Stack', 'DSA']

export default function MyInterviews() {
  const dispatch = useDispatch()
  const { upcoming, completed, loading } = useSelector((state) => state.interviews)
  const [tab, setTab] = useState('upcoming')
  const [filterType, setFilterType] = useState('All')

  useEffect(() => {
    dispatch(fetchInterviews({ status: tab }))
  }, [dispatch, tab])

  const interviews = tab === 'upcoming' ? upcoming : completed
  const filtered = filterType === 'All' ? interviews : interviews.filter((i) => i.type === filterType)

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="section-title flex items-center gap-3">
          <FiList className="text-indigo-400" /> My Interviews
        </h1>
        <p className="section-subtitle mb-0">Track all your scheduled and completed mock interviews</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 p-1 glass rounded-xl w-fit">
        <button
          id="tab-upcoming"
          onClick={() => { setTab('upcoming'); setFilterType('All') }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            tab === 'upcoming'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FiCalendar size={14} /> Upcoming
          {upcoming.length > 0 && (
            <span className={`ml-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
              tab === 'upcoming' ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-300'
            }`}>
              {upcoming.length}
            </span>
          )}
        </button>
        <button
          id="tab-completed"
          onClick={() => { setTab('completed'); setFilterType('All') }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            tab === 'completed'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FiCheckSquare size={14} /> Completed
          {completed.length > 0 && (
            <span className={`ml-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
              tab === 'completed' ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-300'
            }`}>
              {completed.length}
            </span>
          )}
        </button>
      </div>

      {/* Filter by type */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <FiFilter size={14} className="text-slate-500" />
        {TYPES.map((t) => (
          <button
            key={t}
            id={`filter-${t.toLowerCase().replace('-', '')}`}
            onClick={() => setFilterType(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              filterType === t
                ? 'bg-indigo-600 text-white'
                : 'glass-light text-slate-400 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass rounded-2xl h-48 animate-pulse bg-slate-800/40" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 glass rounded-2xl">
          <div className="text-6xl mb-4">{tab === 'upcoming' ? '📅' : '✅'}</div>
          <h3 className="text-xl font-bold text-white mb-2">
            {tab === 'upcoming' ? 'No upcoming interviews' : 'No completed interviews'}
          </h3>
          <p className="text-slate-400 text-sm">
            {tab === 'upcoming'
              ? 'Schedule your first mock interview from the Dashboard!'
              : 'Complete some interviews to see your results here.'}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 animate-slide-up">
          {filtered.map((interview) => (
            <InterviewCard key={interview._id} interview={interview} type={tab} />
          ))}
        </div>
      )}
    </div>
  )
}
