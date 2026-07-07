import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Mail, Phone } from 'lucide-react'
import Header from './Header'
import { brand } from '../brand/brand'
import type { Agent } from '../config/types'

const next = [
  'Your advisor is reviewing your application now',
  'We compare offers across our lending network',
  'Expect a call or email — usually the same business day',
]

function initials(name?: string | null) {
  if (!name) return '👤'
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || '')
    .join('')
}

function AgentCard({ agent }: { agent: Agent }) {
  const [imgOk, setImgOk] = useState(true)
  const showImg = Boolean(agent.photoUrl) && imgOk

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="mx-auto mt-8 max-w-md rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50/70 to-white p-5 text-left"
    >
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
        Your dedicated advisor
      </div>
      <div className="flex items-center gap-4">
        {showImg ? (
          <img
            src={agent.photoUrl as string}
            alt={agent.name || 'Advisor'}
            onError={() => setImgOk(false)}
            className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-white shadow-md"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-600 text-lg font-semibold text-white ring-2 ring-white shadow-md">
            {initials(agent.name)}
          </div>
        )}
        <div className="min-w-0">
          {agent.name && <div className="truncate text-base font-semibold text-gray-900">{agent.name}</div>}
          {agent.title && <div className="truncate text-[13px] text-gray-500">{agent.title}</div>}
        </div>
      </div>

      {(agent.phone || agent.email) && (
        <div className="mt-4 space-y-2 border-t border-brand-100 pt-4">
          {agent.phone && (
            <a
              href={`tel:${agent.phone}`}
              className="flex items-center gap-2.5 text-sm font-medium text-brand-700 hover:underline"
            >
              <Phone className="h-4 w-4 shrink-0 text-brand-500" />
              {agent.phone}
            </a>
          )}
          {agent.email && (
            <a
              href={`mailto:${agent.email}`}
              className="flex items-center gap-2.5 text-sm font-medium text-brand-700 hover:underline"
            >
              <Mail className="h-4 w-4 shrink-0 text-brand-500" />
              <span className="truncate">{agent.email}</span>
            </a>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default function SuccessState({ firstName, agent }: { firstName?: string; agent?: Agent | null }) {
  const hasAgent = Boolean(agent && (agent.name || agent.email || agent.phone))

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
            Thanks for completing your application with {brand.name}.
            {hasAgent ? ' Your advisor will be in touch shortly.' : ' Here’s what happens next:'}
          </p>

          {hasAgent && <AgentCard agent={agent as Agent} />}

          <ul className="mx-auto mt-8 max-w-sm space-y-3 text-left">
            {next.map((n) => (
              <li key={n} className="flex items-start gap-2.5 text-sm text-gray-800">
                <span className="mt-0.5 rounded-full bg-green-100 p-1">
                  <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                </span>
                {n}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
