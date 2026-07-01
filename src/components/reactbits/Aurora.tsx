import './Aurora.css'

/**
 * Aurora — a soft, slowly-drifting gradient backdrop (React Bits style),
 * implemented in pure CSS so it renders anywhere and respects
 * prefers-reduced-motion. Brand-blue with a teal/indigo lift. Meant to sit
 * behind hero content at low opacity.
 */
export default function Aurora({ className = '' }: { className?: string }) {
  return (
    <div className={`aurora ${className}`} aria-hidden="true">
      <div className="aurora__blob aurora__blob--1" />
      <div className="aurora__blob aurora__blob--2" />
      <div className="aurora__blob aurora__blob--3" />
      <div className="aurora__grain" />
    </div>
  )
}
