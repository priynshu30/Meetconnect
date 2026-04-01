import React, { useState, useEffect, useCallback } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function Carousel({ slides, autoPlay = true, interval = 5000 }) {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [slides.length])
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [next, autoPlay, interval])

  return (
    <div className="relative overflow-hidden rounded-2xl glass">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="min-w-full p-8 md:p-12">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="text-4xl">{slide.emoji}</div>
              <blockquote className="text-slate-200 text-lg md:text-xl italic leading-relaxed max-w-2xl">
                "{slide.quote}"
              </blockquote>
              <div>
                <p className="text-white font-semibold">{slide.name}</p>
                <p className="text-indigo-400 text-sm">{slide.role}</p>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, si) => (
                  <span key={si} className={`text-sm ${si < slide.rating ? 'text-amber-400' : 'text-slate-600'}`}>★</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-light flex items-center justify-center text-slate-400 hover:text-white transition-colors"
      >
        <FiChevronLeft />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-light flex items-center justify-center text-slate-400 hover:text-white transition-colors"
      >
        <FiChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-indigo-400' : 'w-1.5 bg-slate-600'}`}
          />
        ))}
      </div>
    </div>
  )
}
