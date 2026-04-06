import { useLang } from '../../context/LanguageContext'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="w-full overflow-hidden border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-500">
      <div className="mx-auto max-w-7xl px-6 md:px-10">{t.footer.copyright}</div>
    </footer>
  )
}
