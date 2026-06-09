import Link from 'next/link'
import WishForm from '@/components/WishForm'

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden">

      {/* Corner decorations */}
      <span className="fixed top-4 left-4 text-4xl float-slow opacity-70 pointer-events-none select-none">🎀</span>
      <span className="fixed top-6 right-6 text-3xl float opacity-60 pointer-events-none select-none" style={{ animationDelay: '1s' }}>🌸</span>
      <span className="fixed bottom-8 left-8 text-3xl drift opacity-50 pointer-events-none select-none" style={{ animationDelay: '2s' }}>🦋</span>
      <span className="fixed bottom-6 right-6 text-4xl float-slow opacity-60 pointer-events-none select-none" style={{ animationDelay: '0.5s' }}>🌺</span>

      {/* Sparkle dots */}
      <span className="fixed top-1/4 left-8 text-xl twinkle opacity-60 pointer-events-none select-none" style={{ animationDelay: '0.3s' }}>✨</span>
      <span className="fixed top-1/3 right-12 text-lg twinkle opacity-50 pointer-events-none select-none" style={{ animationDelay: '1.2s' }}>✨</span>
      <span className="fixed top-3/4 left-16 text-sm twinkle opacity-40 pointer-events-none select-none" style={{ animationDelay: '0.8s' }}>✨</span>
      <span className="fixed bottom-1/4 right-16 text-xl twinkle opacity-50 pointer-events-none select-none" style={{ animationDelay: '1.8s' }}>✨</span>

      {/* Hero header */}
      <div className="relative z-10 text-center mb-10 flex flex-col items-center gap-3">

        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl heartbeat">💕</span>
          <span className="text-2xl heartbeat" style={{ animationDelay: '0.4s' }}>💕</span>
          <span className="text-2xl heartbeat" style={{ animationDelay: '0.8s' }}>💕</span>
        </div>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl text-pink-600 leading-tight"
          style={{ fontFamily: 'var(--font-dancing-script)', textShadow: '0 2px 20px rgba(220,100,140,0.25)' }}
        >
          Happy Birthday,
        </h1>
        <h1
          className="text-5xl sm:text-6xl md:text-7xl text-rose-500 leading-tight"
          style={{ fontFamily: 'var(--font-dancing-script)', textShadow: '0 2px 20px rgba(220,100,140,0.3)' }}
        >
          Immaculate! 🎂
        </h1>

        {/* Decorative divider */}
        <div className="flex items-center gap-3 my-2">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300" />
          <span className="text-pink-400 text-lg">🌸</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300" />
        </div>

        <p
          className="text-lg sm:text-xl text-pink-400 max-w-xs sm:max-w-sm text-center leading-relaxed"
          style={{ fontFamily: 'var(--font-dancing-script)' }}
        >
          Leave her a little birthday message — every wish will bloom on her board ✨
        </p>
      </div>

      {/* Form */}
      <div className="relative z-10 w-full max-w-md">
        <WishForm />
      </div>

      {/* Link to board */}
      <div className="relative z-10 mt-8">
        <Link
          href="/board"
          className="text-pink-400 hover:text-pink-600 transition-colors text-base underline underline-offset-4 decoration-pink-200 hover:decoration-pink-400"
          style={{ fontFamily: 'var(--font-dancing-script)', fontSize: '1.1rem' }}
        >
          See all the wishes → 🌸
        </Link>
      </div>

    </main>
  )
}
