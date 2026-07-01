import { brand } from './brand'

/** Official Big Think Capital logo (image). Height controlled by className. */
export default function Logo({ className = 'h-11' }: { className?: string }) {
  return (
    <img
      src={brand.logoUrl}
      alt="Big Think Capital"
      className={`${className} w-auto object-contain`}
      loading="eager"
      decoding="async"
    />
  )
}
