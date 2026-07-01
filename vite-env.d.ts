/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOOKUP_URL: string
  readonly VITE_SUBMIT_URL: string
  readonly VITE_LOGO_URL?: string
  readonly VITE_SUPPORT_PHONE?: string
  readonly VITE_SUPPORT_EMAIL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
