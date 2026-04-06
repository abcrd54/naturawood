import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from '../lib/i18n'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('id')

  useEffect(() => {
    const saved = window.localStorage.getItem('naturawood-lang')
    if (saved === 'id' || saved === 'en') {
      setLang(saved)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('naturawood-lang', lang)
    document.documentElement.lang = lang === 'id' ? 'id' : 'en'
  }, [lang])

  const value = useMemo(() => ({
    lang,
    setLang,
    toggleLang: () => setLang((current) => (current === 'id' ? 'en' : 'id')),
    t: translations[lang],
  }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLang must be used inside LanguageProvider')
  return context
}
