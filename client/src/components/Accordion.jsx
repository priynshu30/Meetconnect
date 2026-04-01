import React, { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

export default function Accordion({ items }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="glass rounded-xl overflow-hidden transition-all duration-300"
        >
          <button
            id={`accordion-btn-${idx}`}
            className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-slate-700/30"
            onClick={() => setOpen(open === idx ? null : idx)}
          >
            <span className="font-medium text-slate-200 pr-4">{item.question}</span>
            <FiChevronDown
              className={`flex-shrink-0 text-indigo-400 transition-transform duration-300 ${open === idx ? 'rotate-180' : ''}`}
              size={18}
            />
          </button>
          <div
            hidden={open !== idx}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              open === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-5 pb-4 pt-1 text-slate-400 text-sm leading-relaxed border-t border-slate-700/50">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
