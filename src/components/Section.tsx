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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-[13px] font-semibold text-white">
          {index + 1}
        </span>
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight text-gray-900">{section.title}</h3>
          {section.description && (
            <p className="text-[13px] leading-snug text-gray-500">{section.description}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">{children}</div>
    </motion.section>
  )
}
