import { motion } from 'framer-motion'
import { Sparkles, Users2 } from 'lucide-react'
import GradientText from './reactbits/GradientText'
import { brand } from '../brand/brand'

const fade = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
}

export default function HeroIntro({ matched }: { matched: boolean }) {
  return (
    <div className="lg:sticky lg:top-24">
      <motion.div
        {...fade}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1 text-[13px] font-semibold text-brand-700 shadow-sm backdrop-blur"
      >
        <Sparkles className="h-3.5 w-3.5 text-brand-600" />
        {matched ? 'Matched with Big Think Capital' : 'Big Think Capital'}
      </motion.div>

      <motion.h1
        {...fade}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="mt-5 text-[2.15rem] font-bold leading-[1.08] tracking-tight text-gray-900 sm:text-[2.6rem]"
      >
        Your business funding request,{' '}
        <GradientText>already started</GradientText>
      </motion.h1>

      <motion.p
        {...fade}
        transition={{ duration: 0.55, delay: 0.16 }}
        className="mt-4 max-w-md text-[15px] leading-relaxed text-gray-600 sm:text-base"
      >
        Review what we found, add the final details, and get matched with funding
        options.
      </motion.p>

      {/* What happens next — connected 3-step flow */}
      <motion.div
        {...fade}
        transition={{ duration: 0.55, delay: 0.24 }}
        className="mt-9"
      >
        <div className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
          What happens next
        </div>
        <ol className="relative space-y-5 border-l border-dashed border-brand-200 pl-6">
          {brand.steps.map((s, i) => (
            <li key={s.title} className="relative">
              <span className="absolute -left-[33px] flex h-6 w-6 items-center justify-center rounded-full border border-brand-200 bg-white text-[12px] font-semibold text-brand-700 shadow-sm">
                {i + 1}
              </span>
              <div className="text-[15px] font-semibold text-gray-900">{s.title}</div>
              <div className="text-[13px] leading-snug text-gray-500">{s.desc}</div>
            </li>
          ))}
        </ol>
      </motion.div>

      {/* Trust line */}
      <motion.div
        {...fade}
        transition={{ duration: 0.55, delay: 0.32 }}
        className="mt-8 flex items-start gap-3 rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50/80 to-white p-4"
      >
        <span className="mt-0.5 rounded-lg bg-white p-2 shadow-sm">
          <Users2 className="h-4 w-4 text-brand-600" />
        </span>
        <p className="text-[13.5px] leading-relaxed text-gray-700">
          One application. Multiple funding options. A dedicated advisor to help
          you compare.
        </p>
      </motion.div>
    </div>
  )
}
