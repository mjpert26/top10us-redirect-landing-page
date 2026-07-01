import type { FieldType } from '../config/types'

const digits = (v: string) => v.replace(/\D/g, '')

/** Format a raw input value for display, per field type (light-touch masking). */
export function formatValue(type: FieldType, value: string): string {
  if (value == null) return ''
  switch (type) {
    case 'currency': {
      const n = digits(value)
      if (!n) return ''
      return Number(n).toLocaleString('en-US')
    }
    case 'tel': {
      const d = digits(value).slice(0, 10)
      const p = []
      if (d.length > 0) p.push('(' + d.slice(0, 3))
      if (d.length >= 4) p[0] = '(' + d.slice(0, 3) + ') '
      if (d.length >= 4) p.push(d.slice(3, 6))
      if (d.length >= 7) p.push('-' + d.slice(6, 10))
      return p.join('')
    }
    case 'ssn': {
      const d = digits(value).slice(0, 9)
      const parts = [d.slice(0, 3), d.slice(3, 5), d.slice(5, 9)].filter(Boolean)
      return parts.join('-')
    }
    case 'ein': {
      const d = digits(value).slice(0, 9)
      if (d.length <= 2) return d
      return d.slice(0, 2) + '-' + d.slice(2)
    }
    case 'percent':
    case 'number': {
      return value.replace(/[^\d.]/g, '')
    }
    default:
      return value
  }
}

/** Strip formatting to the value we send to the webhook (server re-normalizes). */
export function serializeValue(type: FieldType, value: string): string {
  if (value == null) return ''
  switch (type) {
    case 'currency':
      return digits(value)
    case 'ssn':
    case 'ein':
    case 'tel':
      return digits(value)
    default:
      return value.trim()
  }
}
