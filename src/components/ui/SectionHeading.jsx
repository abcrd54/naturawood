export default function SectionHeading({ eyebrow, title, copy, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-gray-500">{eyebrow}</p>
      <h2 className="text-3xl font-medium tracking-tight text-gray-900 md:text-5xl">{title}</h2>
      <p className="mt-5 text-sm leading-7 text-gray-600 md:text-base">{copy}</p>
    </div>
  )
}
