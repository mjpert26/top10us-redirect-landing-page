import { motion } from 'framer-motion'
import Logo from '../brand/Logo'
import { brand } from '../brand/brand'

interface HeroProps {
  matched: boolean
  firstName?: string
}

export default function Hero({ matched, firstName }: HeroProps) {
  return (
    <header className="relative overflow-hidden">
      {/* decorative gradient wash */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-800 to-brand-900" />
      <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />

      <div className="mx-auto max-w-3xl px-5 pb-14 pt-8 sm:pb-20 sm:pt-10">
        <div className="rounded-xl bg-white/95 px-3 py-2 shadow-sm ring-1 ring-white/10 sm:inline-flex">
          <Logo />
        </div>

        {matched && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.15 }}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3.5 py-1.5 text-sm font-medium text-emerald-200 ring-1 ring-emerald-300/30"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.1 3.1 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
            </svg>
            You&rsquo;ve been matched with {brand.name}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: matched ? 0.3 : 0.15 }}
          className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl"
        >
          {matched && firstName ? `You're almost there, ${firstName}.` : 'Complete your funding application'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: matched ? 0.42 : 0.28 }}
          className="mt-3 max-w-xl text-[15px] leading-relaxed text-brand-100"
        >
          We&rsquo;ve pre-filled everything we already have. Review your details,
          add a few last items, and submit — a funding advisor will reach out
          shortly with your options.
        </motion.p>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-100/90"
        >
          {['Takes ~2 minutes', 'No impact to your credit', 'Bank-level encryption'].map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5">
              <svg className="h-4 w-4 text-accent-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.1 3.1 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
              </svg>
              {t}
            </li>
          ))}
        </motion.ul>
      </div>
    </header>
  )
}
