import { motion } from 'framer-motion'
import { DollarSign, Users, Clock, Headset } from 'lucide-react'
import { brand } from '../brand/brand'

const ICONS = { dollar: DollarSign, users: Users, clock: Clock, advisor: Headset } as const

export default function ProofBar() {
  return (
    <section className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
          Trusted by businesses across the country
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {brand.metrics.map((m, i) => {
            const Icon = ICONS[m.icon as keyof typeof ICONS]
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
              >
                {/* soft brand wash on hover */}
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-100/0 blur-2xl transition group-hover:bg-brand-100/70" />
                <div className="relative flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md shadow-brand-600/20">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <div className="text-2xl font-bold tracking-tight text-gray-900">{m.value}</div>
                    <div className="text-[13px] leading-snug text-gray-500">{m.label}</div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 border-t border-gray-100 pt-8">
          {brand.trustBadges.map((b) => (
            <img
              key={b.alt}
              src={b.src}
              alt={b.alt}
              className="h-10 object-contain opacity-70 transition-opacity hover:opacity-100"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
