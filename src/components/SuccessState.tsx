import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Header from './Header'
import { brand } from '../brand/brand'

const next = [
  'Your advisor is reviewing your application now',
  'We compare offers across our lending network',
  'Expect a call or email — usually the same business day',
]

export default function SuccessState({ firstName }: { firstName?: string }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center px-5 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-lift sm:p-12"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.15 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
          >
            <Check className="h-9 w-9 text-green-600" strokeWidth={3} />
          </motion.div>

          <h1 className="text-2xl font-bold text-gray-900">
            Application received{firstName ? `, ${firstName}` : ''}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-gray-600">
            Thanks for completing your application with {brand.name}. Here’s what happens next:
          </p>

          <ul className="mx-auto mt-6 max-w-sm space-y-3 text-left">
            {next.map((n) => (
              <li key={n} className="flex items-start gap-2.5 text-sm text-gray-800">
                <span className="mt-0.5 rounded-full bg-green-100 p-1">
                  <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                </span>
                {n}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-xl bg-brand-50 px-5 py-4 text-sm text-brand-800">
            Need us sooner? Call{' '}
            <a href={`tel:${brand.supportPhone}`} className="font-semibold hover:underline">
              {brand.supportPhone}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
