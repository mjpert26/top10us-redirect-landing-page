import { motion } from 'framer-motion'
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
        <img src="/favicon.svg" alt="" aria-hidden="true" className="h-4 w-4" />
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

      {/* What happens next — larger connected 3-step flow */}
      <motion.div {...fade} transition={{ duration: 0.55, delay: 0.18 }} className="mt-10">
        <div className="mb-6 text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">
          What happens next
        </div>
        <ol className="space-y-7">
          {brand.steps.map((s, i) => (
            <li key={s.title} className="relative flex gap-5">
              {i < brand.steps.length - 1 && (
                <span className="absolute left-[27px] top-[3.75rem] -bottom-7 w-px bg-gradient-to-b from-brand-300 to-brand-100" />
              )}
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-xl font-bold text-white shadow-lg shadow-brand-600/25">
                {i + 1}
              </span>
              <div className="pt-1.5">
                <div className="text-lg font-semibold tracking-tight text-gray-900">{s.title}</div>
                <div className="mt-1 text-[15px] leading-relaxed text-gray-500">{s.desc}</div>
              </div>
            </li>
          ))}
        </ol>
      </motion.div>
    </div>
  )
}
