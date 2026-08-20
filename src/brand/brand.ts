/**
 * Big Think Capital brand config. Matched to lp.bigthinkcapital.com.
 * The logo + trust badges are the official hosted assets; text can be
 * overridden at build time via env vars.
 */
export const brand = {
  name: 'Big Think Capital',

  // Logo hosted in the Btc-Website Supabase project (uploads bucket, public).
  logoUrl:
    import.meta.env.VITE_LOGO_URL ||
    'https://afhsvhhyfhmafzohxzss.supabase.co/storage/v1/object/public/uploads/2026/08/899d905c-8cfb-40c1-b10d-1882d5deed2a-btc-logo-dark.webp',

  // Trust badges (hosted on BTC's S3 bucket, same as the main LP).
  trustBadges: [
    { src: 'https://bigthink-capital-assets.s3.us-east-1.amazonaws.com/images/companyLogo/bbb.png', alt: 'BBB Accredited Business' },
    { src: 'https://bigthink-capital-assets.s3.us-east-1.amazonaws.com/images/companyLogo/google_reviews.png', alt: 'Google Reviews' },
    { src: 'https://bigthink-capital-assets.s3.us-east-1.amazonaws.com/images/companyLogo/trustpilot.png', alt: 'Trustpilot' },
  ],

  // Premium metric cards shown in the full-width proof bar below the hero.
  metrics: [
    { icon: 'dollar', value: '$1.5B+', label: 'Funded to businesses' },
    { icon: 'users', value: '40,000+', label: 'Businesses served' },
    { icon: 'clock', value: '24 hrs', label: 'Approvals as fast as' },
    { icon: 'advisor', value: '1:1', label: 'Dedicated funding advisors' },
  ],

  // "What happens next" — 3-step flow shown in the hero intro.
  steps: [
    { title: 'Confirm your details', desc: 'Check what we already have on file.' },
    { title: 'Submit your request', desc: 'Add the final details and send it in.' },
    { title: 'Compare with an advisor', desc: 'Review your funding options together.' },
  ],
} as const
