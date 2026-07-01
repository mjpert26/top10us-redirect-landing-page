import Logo from '../brand/Logo'

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center px-4 py-2.5 sm:px-6 lg:px-8">
        <Logo className="h-10 sm:h-11" />
      </div>
    </header>
  )
}
