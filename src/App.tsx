import { useState } from 'react'
import Header from './components/Header'
import HeroIntro from './components/HeroIntro'
import ProofBar from './components/ProofBar'
import ApplicationForm from './components/ApplicationForm'
import LoadingState from './components/LoadingState'
import SuccessState from './components/SuccessState'
import Footer from './components/Footer'
import Aurora from './components/reactbits/Aurora'
import { useLeadPrefill } from './hooks/useLeadPrefill'

export default function App() {
  const prefill = useLeadPrefill()
  const [submitted, setSubmitted] = useState(false)

  const firstName = prefill.initialValues.firstname || undefined

  if (prefill.status === 'loading') return <LoadingState />
  if (submitted) return <SuccessState firstName={firstName} />

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero + application */}
      <section className="relative isolate overflow-hidden">
        {/* animated aurora backdrop (React Bits style) */}
        <Aurora className="-z-10" />

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          {prefill.lookupFailed && (
            <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              We couldn’t automatically load your saved details, but you can still
              complete your application below.
            </div>
          )}

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-14">
            <div className="lg:order-1">
              <HeroIntro matched={prefill.matched} />
            </div>
            <div className="lg:order-2">
              <ApplicationForm
                token={prefill.token}
                matched={prefill.matched}
                initialValues={prefill.initialValues}
                onSubmitted={() => setSubmitted(true)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Full-width proof section */}
      <ProofBar />

      <Footer />
    </div>
  )
}
