import { Globe2, Menu } from 'lucide-react'
import { navItems } from '../../data/siteData'
import { useLang } from '../../context/LanguageContext'

export default function Header({ onOpenMenu, activeSection }) {
  const { lang, toggleLang, t } = useLang()

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4">
      <div className="mx-auto mt-4 flex w-full max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/88 px-4 py-3 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl md:px-7">
        <a href="#top" className="flex items-center gap-3">
          <img src="/logo-naturawood.png" alt="Naturawood" className="h-10 w-auto object-contain" />
        </a>

        <nav className="hidden items-center gap-2 text-sm text-white-700 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '')
            return (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 transition ${
                  isActive
                    ? 'bg-gray-900 text-white !text-white shadow-md'
                    : 'text-white-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {t.nav[item.key]}
              </a>
            )
          })}
        </nav>

        <div className="inline-flex items-center gap-3">
          <button
            type="button"
            onClick={() => lang !== 'id' && toggleLang()}
            className="relative transition"
          >
            <span
              className={`fi fi-id fis text-lg rounded-sm shadow-sm transition ${
                lang === 'id' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              }`}
            ></span>

            {lang === 'id' && (
              <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-gray-900 rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => lang !== 'en' && toggleLang()}
            className="relative transition"
          >
            <span
              className={`fi fi-us fis text-lg rounded-sm shadow-sm transition ${
                lang === 'en' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              }`}
            ></span>

            {lang === 'en' && (
              <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-gray-900 rounded-full" />
            )}
          </button>
        </div>

      </div>
    </header>
  )
}
