import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import BeforeAfterSlider from './BeforeAfterSlider'
import { useLang } from '../../context/LanguageContext'

export default function ProjectDialog({ project, onClose }) {
  const { t } = useLang()
  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl md:p-8"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">{project.categoryLabel || project.category}</p>
              <h3 className="mt-2 text-2xl font-medium tracking-tight text-gray-900 md:text-4xl">{project.title}</h3>
            </div>
            <button onClick={onClose} className="rounded-full border border-gray-300 bg-white p-2.5" aria-label={t.dialog.close}>
              <X className="h-4 w-4 text-gray-800" />
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <BeforeAfterSlider before={project.before} after={project.after} alt={project.title} aspect="aspect-[5/4]" />
            <div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-gray-200 bg-gray-50 p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-500">{t.dialog.material}</p>
                  <p className="mt-3 text-lg font-medium text-gray-900">{project.material}</p>
                </div>
                <div className="rounded-[1.5rem] border border-gray-200 bg-gray-50 p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-500">{t.dialog.dimensions}</p>
                  <p className="mt-3 text-lg font-medium text-gray-900">{project.size}</p>
                </div>
              </div>
              <p className="mt-6 text-sm leading-8 text-gray-600">{project.longDescription}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium !text-white transition hover:bg-gray-800"
                >
                  {t.dialog.inquire} <ArrowRight className="h-4 w-4" />
                </a>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
                >
                  {t.dialog.close}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
