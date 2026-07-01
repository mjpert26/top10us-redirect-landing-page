import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { SectionDef } from '../config/types'

interface SectionProps {
  section: SectionDef
  index: number
  children: ReactNode
}

export default function Section({ section, index, children }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 * index }}
      className="rounded-2xl border border-slate-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-8"
    >
      <div className="mb-6 flex items-start gap-3">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-800 text-xs font-semibold text-white">
          {index + 1}
        </span>
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-brand-900">
            {section.title}
          </h2>
          {section.description && (
            <p className="mt-0.5 text-sm text-muted">{section.description}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">{children}</div>
    </motion.section>
  )
}
