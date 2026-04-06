import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { useLang } from '../../context/LanguageContext'

function PortfolioCard({ item, onOpen, archivedLabel }) {
  const isArchived = item.category === 'Sold Out Product'

  return (
    <motion.button
      whileHover={{ y: -6 }}
      onClick={() => onOpen(item.slug)}
      className="group block w-full overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-3 text-left shadow-[0_20px_80px_rgba(15,23,42,0.06)] transition"
    >
      <div className="overflow-hidden rounded-[1.5rem]">
        <img
          src={item.after}
          alt={item.title}
          className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="px-2 pb-2 pt-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.28em] text-gray-500">{item.categoryLabel || item.category}</p>
          <p className="text-xs text-gray-400">{item.size}</p>
        </div>
        <h3 className="mt-3 text-xl font-medium text-gray-900">{item.title}</h3>
        <p className="mt-2 text-sm text-gray-600">{item.material}</p>
        <p className="mt-4 text-sm leading-7 text-gray-600">{item.description}</p>
        {isArchived ? (
          <div className="mt-4 inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-gray-600">
            {archivedLabel}
          </div>
        ) : null}
      </div>
    </motion.button>
  )
}

export default function PortfolioSection({ items, onOpen }) {
  const { t } = useLang()

  return (
    <section id="portfolio" className="w-full overflow-x-hidden bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <SectionHeading
          eyebrow={t.portfolio.eyebrow}
          title={t.portfolio.title}
          copy={t.portfolio.copy}
        />

        {items.length === 0 ? (
          <div className="mt-14 rounded-[2rem] border border-dashed border-gray-300 bg-white px-6 py-12 text-center text-sm leading-7 text-gray-600">
            {t.portfolio.empty}
          </div>
        ) : null}

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <PortfolioCard item={item} onOpen={onOpen} archivedLabel={t.portfolio.archivedBadge} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
