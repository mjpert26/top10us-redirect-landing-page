export type FieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'currency'
  | 'number'
  | 'percent'
  | 'date'
  | 'select'
  | 'ssn'
  | 'ein'

export interface FieldDef {
  /** Friendly key used in the lookup/submit payloads. Must match the n8n
   *  normalize dictionary so the same mapping can be reused server-side. */
  key: string
  label: string
  type: FieldType
  section: string
  /** Salesforce Lead field API name — for documentation / server mapping. */
  salesforce: string
  /** Whether Top10US's intake may have already populated this (so we prefill). */
  prefill: boolean
  /** Sensitive data that must NEVER be returned by the lookup endpoint. */
  sensitive?: boolean
  required?: boolean
  placeholder?: string
  helpText?: string
  options?: string[]
  /** Span 2 columns on the desktop grid. */
  wide?: boolean
}

export interface SectionDef {
  id: string
  title: string
  description?: string
}

/** Shape of the lookup response the page consumes. */
export interface LeadLookupResponse {
  found: boolean
  lead?: Record<string, string | number | null>
}

export type FormValues = Record<string, string>
