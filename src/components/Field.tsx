import { motion } from 'framer-motion'
import type { FieldDef } from '../config/types'
import { formatValue } from '../lib/format'

interface FieldProps {
  field: FieldDef
  value: string
  onChange: (key: string, value: string) => void
  error?: string
  prefilled?: boolean
}

const baseInput =
  'w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-ink shadow-sm ' +
  'outline-none transition placeholder:text-muted/50 ' +
  'focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 hover:border-brand-300'

export default function Field({ field, value, onChange, error, prefilled }: FieldProps) {
  const id = `field-${field.key}`
  const invalid = Boolean(error)
  const borderState = invalid
    ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10'
    : 'border-line'

  const handle = (raw: string) => onChange(field.key, formatValue(field.type, raw))

  const inputMode =
    field.type === 'currency' || field.type === 'number' || field.type === 'percent'
      ? 'numeric'
      : field.type === 'tel' || field.type === 'ssn' || field.type === 'ein'
        ? 'tel'
        : field.type === 'email'
          ? 'email'
          : 'text'

  return (
    <div className={field.wide ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="mb-1.5 flex items-center gap-2 text-[13px] font-medium text-ink">
        <span>
          {field.label}
          {field.required && <span className="ml-0.5 text-red-500">*</span>}
        </span>
        {prefilled && (
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-emerald-700">
            <svg className="h-2.5 w-2.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.1 3.1 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
            </svg>
            Prefilled
          </span>
        )}
      </label>

      {field.type === 'select' ? (
        <div className="relative">
          <select
            id={id}
            value={value}
            onChange={(e) => onChange(field.key, e.target.value)}
            aria-invalid={invalid}
            className={`${baseInput} ${borderState} appearance-none pr-9`}
          >
            <option value="">Select…</option>
            {value && !field.options?.includes(value) && <option value={value}>{value}</option>}
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
          </svg>
        </div>
      ) : field.type === 'currency' ? (
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">$</span>
          <input
            id={id}
            value={value}
            onChange={(e) => handle(e.target.value)}
            inputMode="numeric"
            placeholder={field.placeholder}
            aria-invalid={invalid}
            className={`${baseInput} ${borderState} pl-7`}
          />
        </div>
      ) : (
        <input
          id={id}
          type={field.type === 'date' ? 'date' : 'text'}
          value={value}
          onChange={(e) => handle(e.target.value)}
          inputMode={inputMode}
          placeholder={field.placeholder}
          autoComplete={field.sensitive ? 'off' : undefined}
          aria-invalid={invalid}
          className={`${baseInput} ${borderState}`}
        />
      )}

      {(field.helpText || error) && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-1.5 text-xs ${invalid ? 'text-red-600' : 'text-muted'}`}
        >
          {error || field.helpText}
        </motion.p>
      )}
    </div>
  )
}
