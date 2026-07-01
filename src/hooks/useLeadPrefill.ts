import { useEffect, useState } from 'react'
import { getLead } from '../lib/api'
import { FIELDS, PREFILLABLE_KEYS } from '../config/fields'
import { formatValue } from '../lib/format'
import type { FormValues } from '../config/types'

export type PrefillStatus = 'loading' | 'ready'

export interface PrefillState {
  status: PrefillStatus
  token: string | null
  /** True when we found a matching lead and prefilled from it. */
  matched: boolean
  /** True when a token was present but the lookup failed or found nothing. */
  lookupFailed: boolean
  initialValues: FormValues
}

function getTokenFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search)
  const token = params.get('token') || params.get('t')
  return token && token.trim() ? token.trim() : null
}

const FIELD_TYPE = new Map(FIELDS.map((f) => [f.key, f.type]))

function emptyValues(): FormValues {
  return Object.fromEntries(FIELDS.map((f) => [f.key, ''])) as FormValues
}

export function useLeadPrefill(): PrefillState {
  const [state, setState] = useState<PrefillState>({
    status: 'loading',
    token: getTokenFromUrl(),
    matched: false,
    lookupFailed: false,
    initialValues: emptyValues(),
  })

  useEffect(() => {
    const token = getTokenFromUrl()
    let cancelled = false

    if (!token) {
      setState((s) => ({ ...s, status: 'ready', token: null }))
      return
    }

    ;(async () => {
      try {
        const { found, lead } = await getLead(token)
        if (cancelled) return

        const values = emptyValues()
        if (found && lead) {
          for (const key of PREFILLABLE_KEYS) {
            const raw = lead[key]
            if (raw !== undefined && raw !== null && String(raw).length > 0) {
              values[key] = formatValue(FIELD_TYPE.get(key)!, String(raw))
            }
          }
        }

        setState({
          status: 'ready',
          token,
          matched: found,
          lookupFailed: !found,
          initialValues: values,
        })
      } catch {
        if (cancelled) return
        setState({
          status: 'ready',
          token,
          matched: false,
          lookupFailed: true,
          initialValues: emptyValues(),
        })
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
