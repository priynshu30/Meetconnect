import React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        id="prev-page-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-slate-400
                   hover:text-white hover:bg-slate-700/50 disabled:opacity-40 disabled:cursor-not-allowed
                   transition-all duration-200"
      >
        <FiChevronLeft size={16} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          id={`page-btn-${page}`}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-200 ${
            page === currentPage
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
              : 'glass-light text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        id="next-page-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-slate-400
                   hover:text-white hover:bg-slate-700/50 disabled:opacity-40 disabled:cursor-not-allowed
                   transition-all duration-200"
      >
        <FiChevronRight size={16} />
      </button>
    </div>
  )
}
