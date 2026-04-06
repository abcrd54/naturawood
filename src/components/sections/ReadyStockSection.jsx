import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import BeforeAfterSlider from '../ui/BeforeAfterSlider'
import { useLang } from '../../context/LanguageContext'

export default function ReadyStockSection({ items, loading, error }) {
  const { lang, t } = useLang()

  return (
    <section id="ready-stock" className="w-full overflow-x-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow={t.readyStock.eyebrow}
          title={t.readyStock.title}
          copy={t.readyStock.copy}
        />

        {loading ? (
          <div className="mt-14 rounded-[2rem] border border-gray-200 bg-gray-50 p-8 text-sm text-gray-600">
            {t.readyStock.loading}
          </div>
        ) : null}

        {error ? (
          <div className="mt-14 rounded-[2rem] border border-red-200 bg-red-50 p-8 text-sm text-red-700">
            {t.readyStock.error}
          </div>
        ) : null}

        {!loading && !error && !items.length ? (
          <div className="mt-14 rounded-[2rem] border border-gray-200 bg-gray-50 p-8 text-sm text-gray-600">
            {t.readyStock.empty}
          </div>
        ) : null}

        {!loading && !error && items.length ? (
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {items.map((item, index) => (
              <motion.div
                key={item.id || item.code}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="rounded-[2rem] border border-gray-200 bg-gray-50 p-4 shadow-[0_20px_80px_rgba(15,23,42,0.05)]"
              >
                <BeforeAfterSlider before={item.before} after={item.after} alt={item.displayTitle} />
                <div className="px-2 pb-2 pt-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500">{item.code}</p>
                    <span className="rounded-full bg-white px-3 py-1 text-xs text-gray-600 ring-1 ring-gray-200">
                      {t.readyStock.status}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-medium text-gray-900">{item.displayTitle}</h3>
                  <p className="mt-2 text-sm text-gray-600">{item.size}</p>
                  <p className="mt-2 text-sm text-gray-500">{lang === 'id' ? item.conditionId || item.conditionEn : item.conditionEn || item.conditionId}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
