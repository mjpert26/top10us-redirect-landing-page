import { motion } from 'framer-motion'
import Logo from '../brand/Logo'
import { brand } from '../brand/brand'

export default function SuccessState({ firstName }: { firstName?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg rounded-3xl border border-slate-200/80 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm sm:p-12"
      >
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.15 }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100"
        >
          <svg className="h-9 w-9 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </motion.div>

        <h1 className="text-2xl font-semibold tracking-tight text-brand-900">
          Application received{firstName ? `, ${firstName}` : ''}!
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted">
          Thanks for completing your application with {brand.name}. One of our
          funding advisors is reviewing your details now and will reach out
          shortly with your options.
        </p>

        <div className="mt-8 rounded-xl bg-brand-50 px-5 py-4 text-sm text-brand-800">
          Questions in the meantime? Call{' '}
          <a href={`tel:${brand.supportPhone}`} className="font-semibold underline-offset-2 hover:underline">
            {brand.supportPhone}
          </a>{' '}
          or email{' '}
          <a href={`mailto:${brand.supportEmail}`} className="font-semibold underline-offset-2 hover:underline">
            {brand.supportEmail}
          </a>
          .
        </div>
      </motion.div>
    </div>
  )
}
