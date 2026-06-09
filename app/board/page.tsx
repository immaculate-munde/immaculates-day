import Link from 'next/link'
import { supabase, type Wish } from '@/lib/supabase'
import WishBoard from '@/components/WishBoard'

export const dynamic = 'force-dynamic'

function pseudoRandom(seed: string, n: number): number {
  let h = n * 2654435761
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 0x9e3779b9)
  }
  h ^= h >>> 16
  return ((h >>> 0) / 0xffffffff)
}

function computeLayout(wish: Wish, i: number) {
  const r1 = pseudoRandom(wish.id, i * 3 + 0)
  const r2 = pseudoRandom(wish.id, i * 3 + 1)
  const r3 = pseudoRandom(wish.id, i * 3 + 2)
  return {
    rotation: (r1 * 16) - 8,       // -8 to +8 deg
    xOffset: (r2 * 40) - 20,       // -20 to +20 px
    yOffset: (r3 * 30) - 15,       // -15 to +15 px
  }
}

export default async function BoardPage() {
  const { data: wishes, error } = await supabase
    .from('wishes')
    .select('*')
    .order('created_at', { ascending: false })

  const safeWishes: Wish[] = error ? [] : (wishes ?? [])
  const layouts = safeWishes.map((w, i) => computeLayout(w, i))

  return (
    <main className="relative min-h-screen overflow-x-hidden">

      {/* Corner decorations */}
      <span className="fixed top-4 left-4 text-4xl float-slow opacity-70 pointer-events-none select-none">🌺</span>
      <span className="fixed top-6 right-6 text-3xl float opacity-60 pointer-events-none select-none" style={{ animationDelay: '1s' }}>🎀</span>
      <span className="fixed bottom-8 left-8 text-3xl drift opacity-50 pointer-events-none select-none" style={{ animationDelay: '2s' }}>🌸</span>
      <span className="fixed bottom-6 right-6 text-3xl float-slow opacity-60 pointer-events-none select-none" style={{ animationDelay: '0.5s' }}>🦋</span>

      {/* Sparkles */}
      <span className="fixed top-1/4 left-8 text-xl twinkle opacity-50 pointer-events-none select-none" style={{ animationDelay: '0.4s' }}>✨</span>
      <span className="fixed top-1/3 right-10 text-lg twinkle opacity-40 pointer-events-none select-none" style={{ animationDelay: '1.1s' }}>✨</span>
      <span className="fixed bottom-1/3 left-14 text-sm twinkle opacity-40 pointer-events-none select-none" style={{ animationDelay: '0.7s' }}>✨</span>

      {/* Header */}
      <div className="relative z-10 text-center pt-14 pb-8 px-4 flex flex-col items-center gap-3">

        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl heartbeat">💕</span>
          <span className="text-xl heartbeat" style={{ animationDelay: '0.3s' }}>💕</span>
          <span className="text-xl heartbeat" style={{ animationDelay: '0.6s' }}>💕</span>
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl text-pink-600"
          style={{ fontFamily: 'var(--font-dancing-script)', textShadow: '0 2px 16px rgba(220,100,140,0.25)' }}
        >
          All the birthday love 🌸
        </h1>

        <div className="flex items-center gap-3 my-1">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300" />
          <span className="text-pink-400 text-base">✨</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300" />
        </div>

        {safeWishes.length > 0 && (
          <p
            className="text-pink-400 text-lg"
            style={{ fontFamily: 'var(--font-dancing-script)' }}
          >
            {safeWishes.length} {safeWishes.length === 1 ? 'wish' : 'wishes'} for Immaculate ✨
          </p>
        )}
      </div>

      {/* Sticky note board */}
      <div className="relative z-10">
        <WishBoard wishes={safeWishes} layouts={layouts} />
      </div>

      {/* Footer nav */}
      <div className="relative z-10 flex justify-center pb-16">
        <Link
          href="/"
          className="text-pink-400 hover:text-pink-600 transition-colors underline underline-offset-4 decoration-pink-200 hover:decoration-pink-400"
          style={{ fontFamily: 'var(--font-dancing-script)', fontSize: '1.1rem' }}
        >
          ← Leave your own wish 💌
        </Link>
      </div>

    </main>
  )
}
