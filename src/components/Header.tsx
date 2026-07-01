import { Phone } from 'lucide-react'
import Logo from '../brand/Logo'
import { brand } from '../brand/brand'

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        <Logo className="h-10 sm:h-11" />
        <a
          href={`tel:${brand.supportPhone}`}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-semibold text-brand-700 transition hover:border-brand-300 hover:bg-brand-50"
        >
          <Phone className="h-4 w-4" />
          <span className="hidden sm:inline">{brand.supportPhone}</span>
          <span className="sm:hidden">Call</span>
        </a>
      </div>
    </header>
  )
}
