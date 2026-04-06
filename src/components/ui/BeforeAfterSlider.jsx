import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function BeforeAfterSlider({
  before,
  after,
  alt,
  aspect = 'aspect-[4/3]',
}) {
  const [position, setPosition] = useState(52)

  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-gray-200 bg-gray-100 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
      <div className={`relative ${aspect} w-full select-none overflow-hidden`}>
        <img src={after} alt={`${alt} after`} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
          <img src={before} alt={`${alt} before`} className="h-full w-full object-cover" />
        </div>

        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${position}%` }}>
          <div className="relative -ml-px h-full w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.45)]" />
          <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/95 text-gray-800 shadow-lg backdrop-blur">
            <ChevronLeft className="h-4 w-4" />
            <ChevronRight className="-ml-1 h-4 w-4" />
          </div>
        </div>

        <input
          aria-label="Before after slider"
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
        />

        <div className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white">
          Before
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gray-900">
          After
        </div>
      </div>
    </div>
  )
}
