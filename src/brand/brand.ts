/**
 * Brand configuration — PLACEHOLDER values.
 *
 * Replace these (and the colors in src/index.css, and the logo in
 * src/brand/Logo.tsx / public/favicon.svg) with the real Big Think Capital
 * assets. Text values can also be overridden at build time via env vars
 * without touching this file.
 */
export const brand = {
  name: import.meta.env.VITE_BRAND_NAME || 'Big Think Capital',
  tagline: 'Smart capital for growing businesses',
  supportPhone: import.meta.env.VITE_SUPPORT_PHONE || '(000) 000-0000',
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'hello@bigthinkcapital.com',
} as const
