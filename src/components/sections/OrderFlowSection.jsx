import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { useLang } from '../../context/LanguageContext'

export default function OrderFlowSection() {
  const { t } = useLang()

  return (
    <section id="order-flow" className="w-full overflow-x-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow={t.orderFlow.eyebrow}
          title={t.orderFlow.title}
          copy={t.orderFlow.copy}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {t.orderFlow.flows.map((flow, index) => (
            <motion.div
              key={flow.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="rounded-[2rem] border border-gray-200 bg-gray-50 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.05)] md:p-8"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-gray-500">0{index + 1}</p>
              <h3 className="mt-3 text-2xl font-medium tracking-tight text-gray-900">{flow.title}</h3>
              <div className="mt-6 grid gap-4">
                {flow.steps.map((step, stepIndex) => (
                  <div key={step} className="flex gap-4 rounded-[1.5rem] bg-white px-4 py-4 ring-1 ring-gray-200">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-medium text-white">
                      {stepIndex + 1}
                    </div>
                    <p className="text-sm leading-7 text-gray-600">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
