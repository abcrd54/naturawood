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

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="hidden items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50 md:inline-flex"
            aria-label={t.nav.language}
          >
            <Globe2 className="h-4 w-4" />
            {lang === 'id' ? 'ID / EN' : 'EN / ID'}
          </button>
          <button
            onClick={onOpenMenu}
            className="inline-flex rounded-full border border-gray-300 bg-white p-2.5 text-gray-900 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
