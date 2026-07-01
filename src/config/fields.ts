import type { FieldDef, SectionDef } from './types'

/**
 * Application field model. Mirrors the field mapping in the n8n
 * "Affiliate - top10us.com" intake workflow (Build SF Body node) so the
 * friendly `key` values line up with what the lookup/submit webhooks expect.
 *
 * `prefill: true`  → may arrive from Top10US's first form (seeded on load).
 * `sensitive: true` → collected here only; the lookup endpoint must not echo it.
 */

export const SECTIONS: SectionDef[] = [
  {
    id: 'contact',
    title: 'Your contact details',
    description: 'How your funding advisor will reach you.',
  },
  {
    id: 'business',
    title: 'About your business',
    description: 'Tell us about the company seeking funding.',
  },
  {
    id: 'financials',
    title: 'Funding & financials',
    description: 'This helps us match you to the right offer.',
  },
  {
    id: 'owner',
    title: 'Ownership & identity',
    description: 'Required to verify the primary business owner.',
  },
]

// Standard Salesforce Industry values. The <Select> also injects any prefilled
// value that isn't in this list, so an org-specific value still round-trips.
const INDUSTRIES = [
  'Agriculture', 'Apparel', 'Automotive', 'Banking', 'Biotechnology',
  'Chemicals', 'Communications', 'Construction', 'Consulting', 'Education',
  'Electronics', 'Energy', 'Engineering', 'Entertainment', 'Environmental',
  'Finance', 'Food & Beverage', 'Government', 'Healthcare', 'Hospitality',
  'Insurance', 'Machinery', 'Manufacturing', 'Media', 'Not For Profit',
  'Real Estate', 'Recreation', 'Retail', 'Shipping', 'Technology',
  'Telecommunications', 'Transportation', 'Utilities', 'Other',
]

const ENTITY_TYPES = [
  'Corporation', 'LLC', 'LLP', 'Ltd. Partnership', 'Partnership',
  'Sole Proprietor',
]

export const FIELDS: FieldDef[] = [
  // ---- Contact ----
  { key: 'firstname', label: 'First name', type: 'text', section: 'contact', salesforce: 'FirstName', prefill: true, required: true },
  { key: 'lastname', label: 'Last name', type: 'text', section: 'contact', salesforce: 'LastName', prefill: true, required: true },
  { key: 'email', label: 'Email', type: 'email', section: 'contact', salesforce: 'Email', prefill: true, required: true, wide: true },
  { key: 'phone', label: 'Business phone', type: 'tel', section: 'contact', salesforce: 'Phone', prefill: true, required: true },
  { key: 'mobilephone', label: 'Mobile phone', type: 'tel', section: 'contact', salesforce: 'MobilePhone', prefill: true },

  // ---- Business ----
  { key: 'company', label: 'Legal business name', type: 'text', section: 'business', salesforce: 'Company', prefill: true, required: true, wide: true },
  { key: 'entitytype', label: 'Entity type', type: 'select', section: 'business', salesforce: 'csbs__Entity_Type__c', prefill: true, options: ENTITY_TYPES, required: true },
  { key: 'industry', label: 'Industry', type: 'select', section: 'business', salesforce: 'Industry', prefill: true, options: INDUSTRIES },
  { key: 'ein', label: 'EIN (Tax ID)', type: 'ein', section: 'business', salesforce: 'EIN__c', prefill: false, placeholder: '12-3456789' },
  { key: 'timeinbusiness', label: 'Time in business', type: 'text', section: 'business', salesforce: 'csbs__Time_in_Business__c', prefill: true, placeholder: 'e.g. 3 years' },
  { key: 'businessstreet', label: 'Business street address', type: 'text', section: 'business', salesforce: 'Street', prefill: true, wide: true },
  { key: 'businesscity', label: 'City', type: 'text', section: 'business', salesforce: 'City', prefill: true },
  { key: 'businessstate', label: 'State', type: 'text', section: 'business', salesforce: 'State', prefill: true, placeholder: 'e.g. NY' },
  { key: 'businesszip', label: 'ZIP code', type: 'text', section: 'business', salesforce: 'PostalCode', prefill: true, placeholder: '10001' },

  // ---- Financials ----
  { key: 'amountrequested', label: 'Amount requested', type: 'currency', section: 'financials', salesforce: 'csbs__Amount_Requested__c', prefill: true, required: true },
  { key: 'useofproceeds', label: 'Use of proceeds', type: 'text', section: 'financials', salesforce: 'csbs__Use_of_Proceeds__c', prefill: false, placeholder: 'e.g. Inventory, expansion, payroll', wide: true },
  { key: 'annualrevenue', label: 'Annual revenue', type: 'currency', section: 'financials', salesforce: 'AnnualRevenue', prefill: true },
  { key: 'monthlyrevenue', label: 'Average monthly revenue', type: 'currency', section: 'financials', salesforce: 'csbs__Monthly_Revenue__c', prefill: true },
  { key: 'averagedailybalance', label: 'Average daily bank balance', type: 'currency', section: 'financials', salesforce: 'Average_Daily_Balance__c', prefill: true },
  { key: 'hasexistingloans', label: 'Any open business loans?', type: 'select', section: 'financials', salesforce: 'Do_you_have_open_business_loans__c', prefill: true, options: ['Yes', 'No'] },
  { key: 'creditscore', label: 'Estimated credit score', type: 'number', section: 'financials', salesforce: 'csbs__CreditScore__c', prefill: false, placeholder: 'e.g. 680' },

  // ---- Ownership & identity ----
  { key: 'ownershippercentage', label: 'Ownership %', type: 'percent', section: 'owner', salesforce: 'csbs__Ownership_Percentage__c', prefill: false, placeholder: 'e.g. 100' },
  { key: 'ssn', label: 'Social Security Number', type: 'ssn', section: 'owner', salesforce: 'csbs__Social_Security_Number_Unencrypted__c', prefill: false, sensitive: true, placeholder: '•••-••-••••', helpText: 'Used only for underwriting. Encrypted in transit.' },
  { key: 'dob', label: 'Date of birth', type: 'date', section: 'owner', salesforce: 'csbs__Birthdate__c', prefill: false, sensitive: true },
  { key: 'homestreet', label: 'Home street address', type: 'text', section: 'owner', salesforce: 'csbs__Home_Address_Street__c', prefill: false, wide: true },
  { key: 'homecity', label: 'City', type: 'text', section: 'owner', salesforce: 'csbs__Home_Address_City__c', prefill: false },
  { key: 'homestate', label: 'State', type: 'text', section: 'owner', salesforce: 'csbs__Home_Address_State__c', prefill: false, placeholder: 'e.g. NY' },
]

/** Keys the lookup endpoint is allowed to prefill (defense-in-depth on the client). */
export const PREFILLABLE_KEYS = FIELDS.filter((f) => f.prefill && !f.sensitive).map((f) => f.key)

export const FIELDS_BY_SECTION = (sectionId: string) =>
  FIELDS.filter((f) => f.section === sectionId)
