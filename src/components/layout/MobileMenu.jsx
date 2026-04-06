import { motion } from 'framer-motion'
import { Globe2, X } from 'lucide-react'
import { navItems } from '../../data/siteData'
import { useLang } from '../../context/LanguageContext'

export default function MobileMenu({ open, onClose, activeSection }) {
  const { lang, toggleLang, t } = useLang()
  if (!open) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -12, opacity: 0 }}
        className="mx-4 mt-4 rounded-[2rem] border border-gray-200 bg-white p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between gap-4">
          <img src="/logo-naturawood.png" alt="Naturawood" className="h-10 w-auto object-contain" />
          <button onClick={onClose} className="rounded-full border border-gray-200 p-2" aria-label="Close menu">
            <X className="h-4 w-4 text-gray-800" />
          </button>
        </div>
        <div className="mt-6 grid gap-3">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '')
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`rounded-2xl border px-4 py-3 text-sm transition ${
                  isActive
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 text-gray-800 hover:bg-gray-50'
                }`}
              >
                {t.nav[item.key]}
              </a>
            )
          })}
        </div>
        <button
          onClick={toggleLang}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900"
        >
          <Globe2 className="h-4 w-4" />
          {lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
        </button>
      </motion.div>
    </motion.div>
  )
}
