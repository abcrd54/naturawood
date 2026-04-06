import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { useLang } from '../../context/LanguageContext'

export default function AboutSection() {
  const { t } = useLang()

  return (
    <section id="about" className="w-full overflow-x-hidden bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid gap-6"
          >
            <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} copy={t.about.copy} />

            <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-[0_20px_80px_rgba(15,23,42,0.05)]">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">{t.about.storyTitle}</p>
              <p className="mt-4 text-sm leading-8 text-gray-600">{t.about.storyCopy}</p>
            </div>

            <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-[0_20px_80px_rgba(15,23,42,0.05)] md:p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">{t.about.ownerEyebrow}</p>
              <h3 className="mt-3 text-2xl font-medium tracking-tight text-gray-900 md:text-3xl">
                {t.about.ownerTitle}
              </h3>
              <p className="mt-4 text-sm leading-8 text-gray-600">{t.about.ownerCopy}</p>
              <div className="mt-6 inline-flex rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-gray-700">
                {t.about.ownerBadge}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid gap-6 lg:grid-rows-[auto_1fr]"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-[0_20px_80px_rgba(15,23,42,0.05)]">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500">{t.about.addressTitle}</p>
                <p className="mt-4 whitespace-pre-line text-sm leading-8 text-gray-600">{t.about.addressCopy}</p>
              </div>
              <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-[0_20px_80px_rgba(15,23,42,0.05)]">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500">{t.about.serveTitle}</p>
                <p className="mt-4 text-sm leading-8 text-gray-600">{t.about.serveCopy}</p>
              </div>
            </div>

            <div className="flex items-end justify-end lg:pt-8">
              <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.05)] lg:ml-auto lg:w-[82%]">
                <img src="/owner-naturawood.png" alt={t.about.ownerAlt} className="aspect-[4/5] w-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
