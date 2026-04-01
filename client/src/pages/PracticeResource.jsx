import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuestions, fetchBlogs } from '../redux/slices/resourceSlice'
import Pagination from '../components/Pagination'
import { FiBook, FiExternalLink, FiAlertCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi'

const CATEGORIES = ['Frontend', 'Backend', 'Full-Stack', 'Behavioral']
const difficultyColors = {
  Easy: 'badge-success',
  Medium: 'badge-warning',
  Hard: 'badge-error',
}

function QuestionCard({ q, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="glass rounded-xl overflow-hidden transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-3 hover:bg-slate-700/20 transition-colors"
      >
        <div className="flex items-start gap-3 flex-1">
          <span className="text-indigo-400 font-bold text-sm w-6 flex-shrink-0 mt-0.5">Q{index}.</span>
          <div>
            <p className="text-slate-200 text-sm leading-relaxed">{q.question}</p>
            <span className={`badge ${difficultyColors[q.difficulty]} mt-1.5 text-xs`}>{q.difficulty}</span>
          </div>
        </div>
        {open ? <FiChevronUp className="text-slate-400 flex-shrink-0 mt-1" /> : <FiChevronDown className="text-slate-400 flex-shrink-0 mt-1" />}
      </button>
      {open && (
        <div className="px-5 pb-4 pt-1 border-t border-slate-700/50 animate-slide-up">
          <p className="text-slate-300 text-sm leading-relaxed pl-9">{q.answer}</p>
        </div>
      )}
    </div>
  )
}

export default function PracticeResource() {
  const dispatch = useDispatch()
  const { questions, blogs, totalPages, currentPage, total, loading, blogsLoading } = useSelector((s) => s.resources)
  const [category, setCategory] = useState('Frontend')
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(fetchQuestions({ category, page, limit: 10 }))
  }, [dispatch, category, page])

  useEffect(() => {
    dispatch(fetchBlogs({ category }))
  }, [dispatch, category])

  const handleCategoryChange = (cat) => {
    setCategory(cat)
    setPage(1)
  }

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="section-title flex items-center gap-3">
          <FiBook className="text-indigo-400" /> Practice Resources
        </h1>
        <p className="section-subtitle mb-0">Browse interview questions and curated learning materials</p>
      </div>

      {/* Category selector */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            id={`category-${cat.toLowerCase().replace('-', '')}`}
            onClick={() => handleCategoryChange(cat)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              category === cat
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105'
                : 'glass text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Questions (left 2/3) */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">{category} Interview Questions</h2>
            {!loading && <span className="text-slate-500 text-sm">{total} questions</span>}
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="glass rounded-xl h-16 animate-pulse bg-slate-800/40" />
              ))}
            </div>
          ) : questions.length === 0 ? (
            <div className="glass rounded-xl p-10 text-center">
              <FiAlertCircle size={32} className="text-slate-500 mx-auto mb-3" />
              <p className="text-slate-400">No questions found for this category.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {questions.map((q, i) => (
                <QuestionCard key={q._id || i} q={q} index={(currentPage - 1) * 10 + i + 1} />
              ))}
            </div>
          )}

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
        </div>

        {/* Blogs sidebar (right 1/3) */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Related Articles</h2>
          {blogsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => <div key={i} className="glass rounded-xl h-28 animate-pulse bg-slate-800/40" />)}
            </div>
          ) : (
            <div className="space-y-3 lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto lg:pr-1 scrollbar-thin">
              {blogs.map((blog) => (
                <a
                  key={blog.id}
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block glass rounded-xl p-4 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-white text-sm font-semibold group-hover:text-indigo-300 transition-colors leading-snug">
                      {blog.title}
                    </h3>
                    <FiExternalLink size={13} className="text-slate-500 flex-shrink-0 mt-0.5 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-2">{blog.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{blog.author}</span>
                    <span>{blog.readTime}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
