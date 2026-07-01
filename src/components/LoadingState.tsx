import Logo from '../brand/Logo'

export default function LoadingState() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 px-6">
      <Logo className="h-12" />
      <div className="flex items-center gap-3 text-gray-500">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
        <span className="text-sm">Loading your application…</span>
      </div>
    </div>
  )
}
