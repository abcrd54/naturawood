import { motion } from 'framer-motion'
import { Instagram, Mail, MapPin, Phone } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { useLang } from '../../context/LanguageContext'

const icons = [Phone, Mail, Instagram, MapPin]

export default function ContactSection() {
  const { t } = useLang()

  return (
    <section id="contact" className="w-full overflow-x-hidden bg-gray-50 py-24 text-gray-900">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} copy={t.contact.copy} />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {t.contact.items.map((item, index) => {
            const Icon = icons[index]
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-[0_20px_80px_rgba(15,23,42,0.05)]"
              >
                <div className="inline-flex rounded-full bg-gray-100 p-3 text-gray-900">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.25em] text-gray-500">{item.label}</p>
                <p className="mt-3 text-lg font-medium tracking-tight text-gray-900">{item.value}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
