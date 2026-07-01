# n8n webhooks for the Top10US landing page

Two new workflows back the landing page, plus one change to the existing intake
workflow. They live in n8n (instance: `api.bigthinkcapital.com`), not in this
repo — the JSON here is the reviewable, import-ready source of truth.

> **Prerequisite (Salesforce):** create a custom field on **Lead**
> `Landing_Page_Token__c` — **Text(36), External ID, Unique, case-sensitive**.
> Nothing below works until this exists. All three flows key off it.

All Salesforce calls reuse the existing JWT credential **"n8n API"**
(`salesforceJwtApi`, id `pHcoJZSyY1Krn3ZN`) already used by the intake workflow.

## 1. `Top10US Landing — Lookup` (GET) — [`top10us-landing-lookup.json`](top10us-landing-lookup.json)

`GET /webhook/top10us-lookup?token=…` → returns non-sensitive prefill fields.

- Sanitizes the token (alphanumeric/`-`/`_` only) before it touches SOQL.
- Queries only **non-sensitive** fields — **SSN and DOB are never selected**, so
  they can't leak to the browser.
- Returns `{ found: true, lead: { …friendly keys… } }`, or `{ found: false }`.
- CORS is handled by the Webhook node's `allowedOrigins` option (currently `*`).

## 2. `Top10US Landing — Submit` (POST) — [`top10us-landing-submit.json`](top10us-landing-submit.json)

`POST /webhook/top10us-submit` with `{ token, …fields }` → PATCHes the Lead.

- Maps friendly keys → Lead fields using the **same dictionary** as the intake
  workflow (numbers/currency coerced, Yes/No normalized, credit score routed).
- Finds the Lead Id by token, then PATCHes it. Missing token → 400,
  unknown token → 404, Salesforce error → 422, success → `{ status: "ok" }`.
- **Application-complete marker:** there's a clearly-commented placeholder in the
  `Build Update` node — set your real status field there once confirmed
  (e.g. `lead['Application_Status__c'] = 'Completed'`).

## 3. Intake workflow change — `Affiliate - top10us.com` (id `cvGEMNBelq1QObDV`)

**Not applied automatically** — this changes live production behavior, so it
needs your go-ahead. Required edits:

1. Add a **Generate Token** Code node before `Build SF Body`:
   `return { token: crypto.randomUUID() };`
2. In `Build SF Body`, add: `lead['Landing_Page_Token__c'] = $('Generate Token').item.json.token;`
3. **Enable** the currently-disabled pipeline (Normalize → Is Test? → Lookup ISO
   Agent → Build SF Body → Create Lead → responses) so the Lead is actually
   created.
4. Change `Respond Success` to return the personalized link so Top10US can show
   the "matched" message + button:
   ```js
   {
     status: 'received',
     message: "You've been matched with Big Think Capital!",
     applicationUrl: 'https://<LANDING_DOMAIN>/?token=' + $('Generate Token').item.json.token
   }
   ```

## Importing

In n8n: **Workflows → Import from File**, pick each JSON, confirm the Salesforce
credential is attached to the HTTP Request nodes, then **activate**. Before going
live: set `allowedOrigins` to the real landing domain (instead of `*`) and point
`VITE_LOOKUP_URL` / `VITE_SUBMIT_URL` in the landing page at these webhook URLs.

## End-to-end test

1. POST a lead to the intake webhook; confirm the response has `applicationUrl`
   and a Lead exists with that token (`SELECT Id FROM Lead WHERE
   Landing_Page_Token__c = '…'`).
2. `GET /webhook/top10us-lookup?token=…` → returns prefill fields, no SSN/DOB.
3. Open the landing page at `/?token=…`, complete and submit.
4. Confirm the Lead was PATCHed with the new values.
