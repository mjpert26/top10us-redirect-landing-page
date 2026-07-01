import { useState } from 'react'
import Hero from './components/Hero'
import ApplicationForm from './components/ApplicationForm'
import LoadingState from './components/LoadingState'
import SuccessState from './components/SuccessState'
import { useLeadPrefill } from './hooks/useLeadPrefill'
import { brand } from './brand/brand'

export default function App() {
  const prefill = useLeadPrefill()
  const [submitted, setSubmitted] = useState(false)

  const firstName = prefill.initialValues.firstname || undefined

  if (prefill.status === 'loading') return <LoadingState />
  if (submitted) return <SuccessState firstName={firstName} />

  return (
    <div className="min-h-screen">
      <Hero matched={prefill.matched} firstName={firstName} />

      {prefill.lookupFailed && (
        <div className="mx-auto -mt-8 max-w-3xl px-5">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            We couldn&rsquo;t automatically load your saved details, but you can
            still complete your application below.
          </div>
        </div>
      )}

      <main>
        <ApplicationForm
          token={prefill.token}
          initialValues={prefill.initialValues}
          onSubmitted={() => setSubmitted(true)}
        />
      </main>

      <footer className="border-t border-slate-200/70 bg-white/40 py-8">
        <div className="mx-auto max-w-3xl px-5 text-center text-xs leading-relaxed text-muted">
          <p>
            &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p className="mt-1">
            Need help? Call{' '}
            <a href={`tel:${brand.supportPhone}`} className="font-medium text-brand-700 hover:underline">
              {brand.supportPhone}
            </a>{' '}
            or email{' '}
            <a href={`mailto:${brand.supportEmail}`} className="font-medium text-brand-700 hover:underline">
              {brand.supportEmail}
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  )
}
