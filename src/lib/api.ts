import type { FormValues, LeadLookupResponse } from '../config/types'

const LOOKUP_URL = import.meta.env.VITE_LOOKUP_URL
const SUBMIT_URL = import.meta.env.VITE_SUBMIT_URL

export class ApiConfigError extends Error {}

/**
 * Look up the referred lead by token and return the fields to prefill.
 * The token is the only credential; treat a miss as "no prefill" rather than
 * a hard error so the applicant can still complete the form manually.
 */
export async function getLead(token: string): Promise<LeadLookupResponse> {
  if (!LOOKUP_URL) throw new ApiConfigError('VITE_LOOKUP_URL is not configured')

  const url = `${LOOKUP_URL}${LOOKUP_URL.includes('?') ? '&' : '?'}token=${encodeURIComponent(token)}`
  const res = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })

  if (res.status === 404) return { found: false }
  if (!res.ok) throw new Error(`Lookup failed (${res.status})`)

  const data = (await res.json()) as LeadLookupResponse
  return { found: Boolean(data.found), lead: data.lead ?? {} }
}

/** Submit the completed application. The token ties it back to the Lead. */
export async function submitApplication(
  token: string,
  values: FormValues,
): Promise<void> {
  if (!SUBMIT_URL) throw new ApiConfigError('VITE_SUBMIT_URL is not configured')

  const res = await fetch(SUBMIT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ token, ...values }),
  })

  if (!res.ok) {
    let detail = ''
    try {
      const body = await res.json()
      detail = body?.detail || body?.message || ''
    } catch {
      /* ignore parse errors */
    }
    throw new Error(detail || `Submission failed (${res.status})`)
  }
}
