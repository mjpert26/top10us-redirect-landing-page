/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOOKUP_URL: string
  readonly VITE_SUBMIT_URL: string
  readonly VITE_LOGO_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
