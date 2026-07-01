import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import Field from './Field'
import { FIELDS, FIELDS_BY_SECTION, SECTIONS } from '../config/fields'
import { serializeValue } from '../lib/format'
import { submitApplication } from '../lib/api'
import type { FormValues } from '../config/types'
import { brand } from '../brand/brand'

interface ApplicationFormProps {
  token: string | null
  initialValues: FormValues
  onSubmitted: () => void
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

export default function ApplicationForm({ token, initialValues, onSubmitted }: ApplicationFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Which fields arrived pre-populated (drives the "Prefilled" chip).
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

    // Serialize only the fields the applicant actually provided.
    const payload: FormValues = {}
    for (const [key, val] of Object.entries(values)) {
      const trimmed = (val ?? '').trim()
      if (!trimmed) continue
      payload[key] = serializeValue(FIELD_BY_KEY.get(key)!.type, trimmed)
    }

    setSubmitting(true)
    try {
      await submitApplication(token ?? '', payload)
      onSubmitted()
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto -mt-8 max-w-3xl px-5 pb-20 sm:-mt-12">
      <div className="space-y-5">
        {SECTIONS.map((section, i) => (
          <Section key={section.id} section={section} index={i}>
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

      <div className="mt-8 flex flex-col items-center gap-3">
        <motion.button
          type="submit"
          disabled={submitting}
          whileTap={{ scale: 0.98 }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-800 px-6 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-brand-800/20 transition hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-500/30 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {submitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Submitting…
            </>
          ) : (
            <>
              Submit application
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h9.19L9.7 6.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.24-3.22H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </motion.button>
        <p className="max-w-md text-center text-xs leading-relaxed text-muted">
          By submitting, you agree to be contacted by {brand.name} about your
          funding request. Your information is encrypted in transit and used only
          to process your application.
        </p>
      </div>
    </form>
  )
}
