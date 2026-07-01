import { brand } from './brand'

/**
 * PLACEHOLDER logo mark. Replace the <svg> below with the official Big Think
 * Capital logo (inline SVG keeps it crisp and recolorable). The wordmark reads
 * from brand.name so it stays in sync.
 */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        className="h-8 w-8 shrink-0"
        aria-hidden="true"
      >
        <rect width="64" height="64" rx="14" className="fill-brand-800" />
        <path
          d="M20 42V22h9.5c4.4 0 7.2 2.2 7.2 5.6 0 2.4-1.4 4-3.6 4.6 2.7.5 4.4 2.3 4.4 5 0 3.7-3 5.8-7.7 5.8H20Zm5-12h4c1.7 0 2.7-.8 2.7-2.2s-1-2.1-2.7-2.1h-4V30Zm0 8.3h4.3c1.9 0 3-.9 3-2.4 0-1.5-1.1-2.3-3-2.3H25v4.7Z"
          className="fill-accent-500"
        />
      </svg>
      <span className="text-lg font-semibold tracking-tight text-brand-800">
        {brand.name}
      </span>
    </div>
  )
}
