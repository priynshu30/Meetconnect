import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { scheduleInterview, resetScheduled } from '../redux/slices/interviewSlice'
import { validateInterviewForm } from '../utils/validators'
import Banner from '../components/Banner'
import Carousel from '../components/Carousel'
import { FiCalendar, FiClock, FiUser, FiLayers, FiCheckCircle } from 'react-icons/fi'

const INTERVIEW_TYPES = ['Behavioral', 'Frontend', 'Backend', 'Full-Stack', 'DSA']

const INTERVIEWERS = [
  { id: 1, name: 'Priya Sharma', specialty: 'Frontend', company: 'Google', rating: 4.9 },
  { id: 2, name: 'Rahul Mehta', specialty: 'Backend', company: 'Amazon', rating: 4.8 },
  { id: 3, name: 'Ananya Krishnan', specialty: 'Full-Stack', company: 'Microsoft', rating: 4.7 },
  { id: 4, name: 'Vikram Singh', specialty: 'DSA', company: 'Meta', rating: 4.9 },
  { id: 5, name: 'Sneha Patel', specialty: 'Behavioral', company: 'McKinsey', rating: 4.8 },
  { id: 6, name: 'Arjun Nair', specialty: 'Frontend', company: 'Flipkart', rating: 4.6 },
]

const testimonials = [
  { quote: 'MeetConnect helped me crack my Google interview! The feedback was incredibly detailed and the interviewer really knew their stuff.', name: 'Aditya Kumar', role: 'SDE-2 @ Google', rating: 5, emoji: '🚀' },
  { quote: 'I did 5 mock interviews here before my Amazon loop. Cleared all 6 rounds. Highly recommend the DSA practice sessions!', name: 'Meera Reddy', role: 'Software Engineer @ Amazon', rating: 5, emoji: '⭐' },
  { quote: 'The behavioral interviews were a game changer for me. Learned to use the STAR method effectively. Got my dream job!', name: 'Rohit Joshi', role: 'Product Engineer @ Microsoft', rating: 5, emoji: '🎯' },
  { quote: 'Affordable, flexible, and incredibly effective. The practice resources section is a goldmine for interview prep.', name: 'Lakshmi Nair', role: 'Frontend Dev @ Flipkart', rating: 5, emoji: '💡' },
]

const getTodayDate = () => new Date().toISOString().split('T')[0]

export default function Dashboard() {
  const dispatch = useDispatch()
  const { loading, scheduled } = useSelector((state) => state.interviews)

  const [form, setForm] = useState({ type: '', date: '', time: '', interviewer: '', interviewerImage: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }))
  }

  const selectInterviewer = (interviewer) => {
    setForm((p) => ({ ...p, interviewer: interviewer.name }))
    if (errors.interviewer) setErrors((p) => ({ ...p, interviewer: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validateInterviewForm(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    const result = await dispatch(scheduleInterview(form))
    if (!result.error) {
      setSubmitted(true)
      setForm({ type: '', date: '', time: '', interviewer: '', interviewerImage: '' })
      setTimeout(() => { setSubmitted(false); dispatch(resetScheduled()) }, 5000)
    }
  }

  return (
    <div className="animate-fade-in">
      <Banner />

      {/* Schedule Section */}
      <section className="page-container">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Form */}
          <div className="glass rounded-2xl p-8 shadow-xl shadow-black/20">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                <FiCalendar className="text-indigo-400" /> Schedule Interview
              </h2>
              <p className="text-slate-400 text-sm">Fill in the details to book your mock session</p>
            </div>

            {submitted && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 mb-6 animate-slide-up">
                <FiCheckCircle className="text-emerald-400 flex-shrink-0" size={20} />
                <div>
                  <p className="text-emerald-400 font-semibold text-sm">Interview Scheduled! 🎉</p>
                  <p className="text-slate-400 text-xs">Check My Interviews to view your session.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Type */}
              <div>
                <label htmlFor="interview-type" className="label">
                  <FiLayers size={13} className="inline mr-1.5 text-indigo-400" />
                  Interview Type
                </label>
                <select
                  id="interview-type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className={`input-field ${errors.type ? 'input-error' : ''}`}
                >
                  <option value="">Select type...</option>
                  {INTERVIEW_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.type && <p className="error-text">{errors.type}</p>}
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="interview-date" className="label">
                    <FiCalendar size={13} className="inline mr-1.5 text-indigo-400" />
                    Date
                  </label>
                  <input
                    id="interview-date"
                    type="date"
                    name="date"
                    value={form.date}
                    min={getTodayDate()}
                    onChange={handleChange}
                    className={`input-field ${errors.date ? 'input-error' : ''}`}
                  />
                  {errors.date && <p className="error-text">{errors.date}</p>}
                </div>
                <div>
                  <label htmlFor="interview-time" className="label">
                    <FiClock size={13} className="inline mr-1.5 text-indigo-400" />
                    Time
                  </label>
                  <input
                    id="interview-time"
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className={`input-field ${errors.time ? 'input-error' : ''}`}
                  />
                  {errors.time && <p className="error-text">{errors.time}</p>}
                </div>
              </div>

              {/* Interviewer */}
              <div>
                <label className="label">
                  <FiUser size={13} className="inline mr-1.5 text-indigo-400" />
                  Choose Interviewer
                </label>
                {errors.interviewer && <p className="error-text mb-2">{errors.interviewer}</p>}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {INTERVIEWERS.map((iv) => (
                    <button
                      key={iv.id}
                      type="button"
                      id={`interviewer-${iv.id}`}
                      onClick={() => selectInterviewer(iv)}
                      className={`p-3 rounded-xl text-left border transition-all duration-200 ${
                        form.interviewer === iv.name
                          ? 'border-indigo-500 bg-indigo-500/15 shadow-md shadow-indigo-500/20'
                          : 'border-slate-700 bg-slate-800/40 hover:border-slate-600'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold mb-2">
                        {iv.name.charAt(0)}
                      </div>
                      <p className="text-white text-xs font-semibold leading-tight">{iv.name}</p>
                      <p className="text-indigo-400 text-xs">{iv.company}</p>
                      <p className="text-slate-500 text-xs">⭐ {iv.rating}</p>
                    </button>
                  ))}
                </div>
              </div>

              <button
                id="schedule-submit-btn"
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Schedule Interview 🚀'
                )}
              </button>
            </form>
          </div>

          {/* Right panel */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">What to expect</h2>
              <p className="text-slate-400 text-sm mb-4">Our mock interviews simulate real interview environments</p>
            </div>
            {[
              { icon: '🎯', title: 'Real Interview Experience', desc: '45-60 minute sessions mirroring actual formats from top tech companies.' },
              { icon: '💡', title: 'Expert Feedback', desc: 'Detailed written feedback with scores and improvement areas after every session.' },
              { icon: '📚', title: 'Curated Resources', desc: 'Custom prep links matched to your interview type to maximize your readiness.' },
              { icon: '📊', title: 'Track Progress', desc: 'Monitor your scores over time and identify patterns in your performance.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-4 glass rounded-xl">
                <div className="text-2xl flex-shrink-0">{icon}</div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
                  <p className="text-slate-400 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="page-container pt-0">
        <h2 className="section-title text-center">What our users say</h2>
        <p className="section-subtitle text-center">Join thousands who landed their dream jobs</p>
        <Carousel slides={testimonials} />
      </section>
    </div>
  )
}
