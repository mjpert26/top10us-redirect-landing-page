import Logo from '../brand/Logo'
import { brand } from '../brand/brand'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Logo className="h-9" />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-gray-600">
            <a href={`tel:${brand.supportPhone}`} className="font-medium text-gray-900 hover:text-brand-700">
              {brand.supportPhone}
            </a>
            <a href={`mailto:${brand.supportEmail}`} className="hover:text-brand-700">
              {brand.supportEmail}
            </a>
          </div>
        </div>
        <p className="mt-6 text-[11.5px] leading-relaxed text-gray-400">
          {brand.name} is a business financing marketplace, not a lender. Funding amounts, rates,
          and terms are provided by third-party lending partners and are subject to approval,
          verification, and eligibility. Submitting this application does not guarantee an offer.
          All information is transmitted over an encrypted connection and used solely to process
          your funding request.
        </p>
        <p className="mt-3 text-[11.5px] text-gray-400">
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
