import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, ArrowRight } from 'lucide-react'
import Section from './Section'
import Field from './Field'
import { FIELDS, FIELDS_BY_SECTION, SECTIONS } from '../config/fields'
import { serializeValue } from '../lib/format'
import { submitApplication } from '../lib/api'
import type { Agent, FormValues } from '../config/types'
import { brand } from '../brand/brand'

interface ApplicationFormProps {
  token: string | null
  matched: boolean
  initialValues: FormValues
  onSubmitted: (agent: Agent | null) => void
}

const FIELD_BY_KEY = new Map(FIELDS.map((f) => [f.key, f]))

function validate(values: FormValues): Record<string, string> {
  const errors: Record<string, string> = {}
  for (const field of FIELDS) {
    const raw = (values[field.key] ?? '').trim()
    if (field.required && !raw) {
      errors[field.key] = `${field.label} is required`
      continue
    }
    if (!raw) continue
    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) {
      errors[field.key] = 'Enter a valid email address'
    }
    if (field.type === 'ssn' && raw.replace(/\D/g, '').length !== 9) {
      errors[field.key] = 'SSN must be 9 digits'
    }
    if (field.type === 'ein' && raw.replace(/\D/g, '').length !== 9) {
      errors[field.key] = 'EIN must be 9 digits'
    }
  }
  return errors
}

export default function ApplicationForm({ token, matched, initialValues, onSubmitted }: ApplicationFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const prefilledKeys = useMemo(
    () => new Set(Object.entries(initialValues).filter(([, v]) => v).map(([k]) => k)),
    [initialValues],
  )

  const setValue = (key: string, value: string) => {
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((e) => (e[key] ? { ...e, [key]: '' } : e))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    const found = validate(values)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      const firstKey = FIELDS.find((f) => found[f.key])?.key
      if (firstKey) {
        document.getElementById(`field-${firstKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    const payload: FormValues = {}
    for (const [key, val] of Object.entries(values)) {
      const trimmed = (val ?? '').trim()
      if (!trimmed) continue
      payload[key] = serializeValue(FIELD_BY_KEY.get(key)!.type, trimmed)
    }

    setSubmitting(true)
    try {
      const { agent } = await submitApplication(token ?? '', payload)
      onSubmitted(agent)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      id="application"
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card sm:p-8"
    >
      <div className="mb-6 border-b border-gray-100 pb-5">
        {matched && (
          <span className="animate-pulse-glow mb-3 inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-[13px] font-semibold text-teal-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
            </span>
            You’ve been matched with Big Think Capital
          </span>
        )}
        <h2 className="text-xl font-bold text-gray-900">Complete your application</h2>
        <p className="mt-1 text-sm text-gray-600">
          Everything we already have is filled in and marked{' '}
          <span className="font-medium text-emerald-700">Prefilled</span>. Just review, finish the
          rest, and submit.
        </p>
      </div>

      <div className="space-y-8">
        {SECTIONS.map((section, i) => (
          <div key={section.id}>
            {i > 0 && <hr className="mb-8 border-gray-100" />}
            <Section section={section} index={i}>
              {FIELDS_BY_SECTION(section.id).map((field) => (
                <Field
                  key={field.key}
                  field={field}
                  value={values[field.key] ?? ''}
                  onChange={setValue}
                  error={errors[field.key]}
                  prefilled={prefilledKeys.has(field.key)}
                />
              ))}
            </Section>
          </div>
        ))}
      </div>

      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {submitError}
        </motion.div>
      )}

      <div className="mt-8">
        <motion.button
          type="submit"
          disabled={submitting}
          whileTap={{ scale: 0.99 }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-3.5 text-[15px] font-semibold text-white shadow-md transition hover:from-brand-700 hover:to-brand-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-500/30 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Submitting…
            </>
          ) : (
            <>
              Submit application
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </motion.button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-gray-500">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          Secured &amp; encrypted. By submitting you agree to be contacted by {brand.name}.
        </p>
      </div>
    </form>
  )
}
