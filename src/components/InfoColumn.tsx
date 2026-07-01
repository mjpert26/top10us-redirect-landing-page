import { DollarSign, Users, Clock, TrendingUp, Award, Check } from 'lucide-react'
import GradientText from './reactbits/GradientText'
import SpotlightCard from './reactbits/SpotlightCard'
import { brand } from '../brand/brand'

const ICONS = { dollar: DollarSign, users: Users, clock: Clock, trending: TrendingUp } as const

export default function InfoColumn({ matched }: { matched: boolean }) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          {matched ? 'You’ve been matched with ' : 'Secure funding with '}
          <GradientText>Big Think Capital</GradientText>
        </h1>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-gray-600">
          We’ve already filled in what we have on file. Review your details, add a
          few final items, and one dedicated advisor compares offers across our
          lending network — with a single application.
        </p>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-4">
        {brand.stats.map((s) => {
          const Icon = ICONS[s.icon as keyof typeof ICONS]
          return (
            <SpotlightCard key={s.label} spotlightColor={s.spotlight}>
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2 ${s.tint.split(' ')[0]}`}>
                  <Icon className={`h-6 w-6 ${s.tint.split(' ')[1]}`} />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-gray-900">{s.value}</div>
                  <div className="text-sm leading-snug text-gray-600">{s.label}</div>
                </div>
              </div>
            </SpotlightCard>
          )
        })}
      </div>

      <div className="mb-10 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-teal-50 p-7">
        <h3 className="mb-5 flex items-center gap-2 font-semibold text-gray-900">
          <Award className="h-6 w-6 text-brand-600" />
          Why choose Big Think Capital?
        </h3>
        <div className="space-y-4">
          {brand.whyChoose.map((w) => (
            <div key={w.title} className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-white p-1 shadow-sm">
                <Check className="h-4 w-4 text-green-600" strokeWidth={3} />
              </div>
              <div>
                <div className="text-[15px] font-medium text-gray-900">{w.title}</div>
                <div className="text-sm leading-snug text-gray-600">{w.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 border-t border-gray-200 pt-6">
        {brand.trustBadges.map((b) => (
          <img
            key={b.alt}
            src={b.src}
            alt={b.alt}
            className="h-11 object-contain opacity-75 transition-opacity hover:opacity-100"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  )
}
