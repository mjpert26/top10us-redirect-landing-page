// ── n8n Code node: "Build Lead + Token" ──────────────────────────────────────
// Intake branch for the top10us.com webhook. Normalizes the Top10US payload,
// generates a unique landing-page token, builds the Salesforce Lead body, and
// composes the personalized application URL returned to Top10US.
//
// Verified against test payload (execution 1179789):
//   firstname,lastname,company,email,phone,amountRequested,monthlyRevenue,
//   creditScore,timeInBusiness,entityType,industry,businessState
//
// PREREQUISITE: Lead.Landing_Page_Token__c must exist (Text, External ID, Unique).
// TODO: set LANDING_BASE to the deployed landing-page domain.

const LANDING_BASE = 'https://go.bigthinkcapital.com';

const body = $json.body || {};

// Top10US sends camelCase — normalize keys to lowercase so mapping is stable.
const src = {};
for (const k in body) src[String(k).toLowerCase()] = body[k];

// Unique token (Web Crypto if available, else a UUID-ish fallback).
let token;
try { token = crypto.randomUUID(); }
catch (e) {
  token = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
}

const lead = {};
const set = (f, v) => { if (v !== undefined && v !== null && String(v).trim() !== '') lead[f] = v; };
const num = (v) => { const n = Number(String(v).replace(/[^0-9.-]/g, '')); return isFinite(n) ? n : undefined; };

// Contact
set('FirstName', src.firstname);
set('LastName', src.lastname);
set('Company', src.company);
set('Email', src.email);
set('Phone', src.phone);
set('MobilePhone', src.mobilephone);

// Financials (banded strings land in text fields; amounts parse to numbers)
set('csbs__Amount_Requested__c', num(src.amountrequested));
set('csbs__Monthly_Revenue__c', src.monthlyrevenue);   // Text(255)
set('AnnualRevenue', num(src.annualrevenue));
set('csbs__Time_in_Business__c', src.timeinbusiness);  // Text(255)
set('csbs__Use_of_Proceeds__c', src.useofproceeds);

// Credit score: numeric -> number field, banded string -> text field
if (src.creditscore != null && String(src.creditscore).trim() !== '') {
  const cs = String(src.creditscore).trim();
  if (/^[0-9]{2,4}$/.test(cs)) set('csbs__CreditScore__c', Number(cs));
  else set('Credit_Score_Application__c', cs.slice(0, 100));
}

// Entity type (restricted picklist) — pass through only known-valid values
const ENTITY = ['Corporation', 'LLC', 'LLP', 'Ltd. Partnership', 'Partnership', 'Sole Proprietor'];
if (src.entitytype && ENTITY.indexOf(String(src.entitytype).trim()) !== -1) {
  set('csbs__Entity_Type__c', String(src.entitytype).trim());
}

// Industry (restricted picklist) — map Top10US taxonomy -> standard SF values;
// omit (never fail the insert) if we can't map it, and keep the raw value so it
// can be surfaced/synced later.
const IND_MAP = {
  'transportation & logistics': 'Transportation', 'transportation': 'Transportation', 'logistics': 'Transportation',
  'construction': 'Construction', 'retail': 'Retail', 'healthcare': 'Healthcare', 'technology': 'Technology',
  'manufacturing': 'Manufacturing', 'finance': 'Finance', 'financial services': 'Finance', 'hospitality': 'Hospitality',
  'food & beverage': 'Food & Beverage', 'restaurant': 'Food & Beverage', 'real estate': 'Real Estate',
  'education': 'Education', 'agriculture': 'Agriculture', 'automotive': 'Automotive', 'entertainment': 'Entertainment',
  'insurance': 'Insurance', 'energy': 'Energy', 'telecommunications': 'Telecommunications',
};
const SF_INDUSTRIES = ['Agriculture','Apparel','Automotive','Banking','Biotechnology','Chemicals','Communications','Construction','Consulting','Education','Electronics','Energy','Engineering','Entertainment','Environmental','Finance','Food & Beverage','Government','Healthcare','Hospitality','Insurance','Machinery','Manufacturing','Media','Not For Profit','Real Estate','Recreation','Retail','Shipping','Technology','Telecommunications','Transportation','Utilities','Other'];
let unmappedIndustry = null;
if (src.industry) {
  const raw = String(src.industry).trim();
  const mapped = IND_MAP[raw.toLowerCase()] || raw;
  if (SF_INDUSTRIES.indexOf(mapped) !== -1) set('Industry', mapped);
  else unmappedIndustry = raw;
}

// State -> 2-letter code (works with or without State/Country picklists)
const STATES = { alabama:'AL',alaska:'AK',arizona:'AZ',arkansas:'AR',california:'CA',colorado:'CO',connecticut:'CT',delaware:'DE','district of columbia':'DC',florida:'FL',georgia:'GA',hawaii:'HI',idaho:'ID',illinois:'IL',indiana:'IN',iowa:'IA',kansas:'KS',kentucky:'KY',louisiana:'LA',maine:'ME',maryland:'MD',massachusetts:'MA',michigan:'MI',minnesota:'MN',mississippi:'MS',missouri:'MO',montana:'MT',nebraska:'NE',nevada:'NV','new hampshire':'NH','new jersey':'NJ','new mexico':'NM','new york':'NY','north carolina':'NC','north dakota':'ND',ohio:'OH',oklahoma:'OK',oregon:'OR',pennsylvania:'PA','rhode island':'RI','south carolina':'SC','south dakota':'SD',tennessee:'TN',texas:'TX',utah:'UT',vermont:'VT',virginia:'VA',washington:'WA','west virginia':'WV',wisconsin:'WI',wyoming:'WY' };
if (src.businessstate) {
  const st = String(src.businessstate).trim();
  set('State', st.length === 2 ? st.toUpperCase() : (STATES[st.toLowerCase()] || st));
}

// Optional address passthrough if Top10US ever sends it
set('Street', src.businessstreet);
set('City', src.businesscity);
set('PostalCode', src.businesszip || src.zip);

// Provenance + token
// NOTE: LeadSource is a restricted picklist — only set it once a "Top10US"
// value exists, otherwise it fails the whole insert. Left off for now.
// set('LeadSource', 'Top10US');
set('Landing_Page_Token__c', token);

// Path-based personalized link: https://<domain>/<token>
const applicationUrl = LANDING_BASE.replace(/\/+$/, '') + '/' + encodeURIComponent(token);

return { lead, token, applicationUrl, unmappedIndustry };
