'use client'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import StickyNote from './StickyNote'
import type { Wish } from '@/lib/supabase'

type NoteLayout = {
  rotation: number
  xOffset: number
  yOffset: number
}

type Props = {
  wishes: Wish[]
  layouts: NoteLayout[]
}

export default function WishBoard({ wishes: initialWishes, layouts }: Props) {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes)

  async function handleSave(id: string, newName: string, newMessage: string) {
    const res = await fetch(`/api/wishes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender_name: newName, message: newMessage }),
    })
    if (res.ok) {
      const updated: Wish = await res.json()
      setWishes((prev) => prev.map((w) => (w.id === id ? updated : w)))
    }
  }

  if (wishes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <span className="text-6xl float">🌸</span>
        <p
          className="text-2xl text-pink-400"
          style={{ fontFamily: 'var(--font-dancing-script)' }}
        >
          No wishes yet — be the first! ✨
        </p>
      </div>
    )
  }

  return (
    <AnimatePresence>
      <div className="flex flex-wrap justify-center gap-6 px-6 pb-20 pt-4">
        {wishes.map((wish, i) => (
          <StickyNote
            key={wish.id}
            id={wish.id}
            senderName={wish.sender_name}
            message={wish.message}
            color={wish.color}
            rotation={layouts[i]?.rotation ?? 0}
            xOffset={layouts[i]?.xOffset ?? 0}
            yOffset={layouts[i]?.yOffset ?? 0}
            delay={i * 0.06}
            onSave={handleSave}
          />
        ))}
      </div>
    </AnimatePresence>
  )
}
