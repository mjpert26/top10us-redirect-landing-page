import { useState } from 'react'
import Header from './components/Header'
import InfoColumn from './components/InfoColumn'
import ApplicationForm from './components/ApplicationForm'
import LoadingState from './components/LoadingState'
import SuccessState from './components/SuccessState'
import Footer from './components/Footer'
import GradientText from './components/reactbits/GradientText'
import { useLeadPrefill } from './hooks/useLeadPrefill'

export default function App() {
  const prefill = useLeadPrefill()
  const [submitted, setSubmitted] = useState(false)

  const firstName = prefill.initialValues.firstname || undefined

  if (prefill.status === 'loading') return <LoadingState />
  if (submitted) return <SuccessState firstName={firstName} />

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        {/* Mobile headline */}
        <div className="mb-6 lg:hidden">
          <h1 className="text-2xl font-bold leading-tight text-gray-900">
            {prefill.matched ? 'You’ve been matched with ' : 'Secure funding with '}
            <GradientText>Big Think Capital</GradientText>
          </h1>
        </div>

        {prefill.lookupFailed && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            We couldn’t automatically load your saved details, but you can still
            complete your application below.
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Form (right on desktop, first on mobile) */}
          <div className="lg:order-2">
            <ApplicationForm
              token={prefill.token}
              matched={prefill.matched}
              initialValues={prefill.initialValues}
              onSubmitted={() => setSubmitted(true)}
            />
          </div>

          {/* Info (left on desktop, hidden on mobile) — sticky so it tracks the long form */}
          <div className="hidden lg:order-1 lg:block lg:sticky lg:top-24 lg:self-start">
            <InfoColumn matched={prefill.matched} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
