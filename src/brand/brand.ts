/**
 * Big Think Capital brand config. Matched to lp.bigthinkcapital.com.
 * The logo + trust badges are the official hosted assets; text can be
 * overridden at build time via env vars.
 */
export const brand = {
  name: 'Big Think Capital',

  // Official WordPress-hosted logo (same source the main LP uses).
  logoUrl:
    import.meta.env.VITE_LOGO_URL ||
    'https://bigthinkcapital.com/wp-content/uploads/2025/12/BTC-Logo-Blue-Sized-1.png',

  supportPhone: import.meta.env.VITE_SUPPORT_PHONE || '(888) 400-5745',
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'hello@bigthinkcapital.com',

  // Trust badges (hosted on BTC's S3 bucket, same as the main LP).
  trustBadges: [
    { src: 'https://bigthink-capital-assets.s3.us-east-1.amazonaws.com/images/companyLogo/bbb.png', alt: 'BBB Accredited Business' },
    { src: 'https://bigthink-capital-assets.s3.us-east-1.amazonaws.com/images/companyLogo/google_reviews.png', alt: 'Google Reviews' },
    { src: 'https://bigthink-capital-assets.s3.us-east-1.amazonaws.com/images/companyLogo/trustpilot.png', alt: 'Trustpilot' },
  ],

  // Stats shown in the spotlight cards (mirrors the main LP).
  stats: [
    { icon: 'dollar', value: '$1.5B+', label: 'Total Funded', spotlight: 'rgba(37, 99, 235, 0.2)', tint: 'bg-blue-100 text-blue-600' },
    { icon: 'users', value: '40,000+', label: 'Businesses Served', spotlight: 'rgba(20, 184, 166, 0.2)', tint: 'bg-teal-100 text-teal-600' },
    { icon: 'clock', value: '24 hours', label: 'Fast approvals in one day or less', spotlight: 'rgba(34, 197, 94, 0.2)', tint: 'bg-green-100 text-green-600' },
    { icon: 'trending', value: '100%', label: 'Client satisfaction guaranteed', spotlight: 'rgba(168, 85, 247, 0.2)', tint: 'bg-purple-100 text-purple-600' },
  ],

  whyChoose: [
    { title: 'Fast & simple process', desc: 'Get approved in as little as 24 hours with minimal paperwork' },
    { title: 'Flexible financing options', desc: 'Tailored solutions for business, real estate, and personal needs' },
    { title: 'Dedicated support', desc: 'Your personal funding expert guides you every step of the way' },
    { title: 'Industry-leading experience', desc: 'Fast, friendly financing for real-world businesses' },
  ],
} as const
