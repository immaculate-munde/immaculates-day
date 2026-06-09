'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function WishForm() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) {
      setError('Please fill in both your name and your wish 💕')
      return
    }
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender_name: name.trim(), message: message.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')

      setSubmitted(true)
      setTimeout(() => router.push('/board'), 1800)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 py-10"
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="text-6xl"
          >
            🎀
          </motion.span>
          <p
            className="text-2xl text-center"
            style={{ color: '#4A6B3A', fontFamily: 'var(--font-dancing)' }}
          >
            Your wish has been sent with love!
            <br />
            <span className="text-lg" style={{ color: '#8A9E7A' }}>Taking you to the board... ✨</span>
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          onSubmit={handleSubmit}
          className="w-full max-w-md mx-auto flex flex-col gap-5"
          style={{
            background: 'rgba(255, 255, 252, 0.58)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(160, 190, 140, 0.45)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 40px rgba(100, 150, 90, 0.12)',
          }}
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              style={{ fontFamily: 'var(--font-dancing)', fontSize: '1.1rem', color: '#5A8A50' }}
            >
              Your name ✨
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              placeholder="e.g. Sarah"
              className="w-full px-4 py-2.5 rounded-xl outline-none text-gray-700 placeholder-pink-200 text-sm transition-all duration-200"
              style={{
                background: 'rgba(240,248,236,0.8)',
                border: '1.5px solid rgba(160,190,140,0.4)',
                fontFamily: 'var(--font-dancing)',
                fontSize: '1rem',
              }}
              onFocus={(e) =>
                (e.target.style.border = '1.5px solid rgba(100,150,80,0.7)')
              }
              onBlur={(e) =>
                (e.target.style.border = '1.5px solid rgba(160,190,140,0.4)')
              }
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="message"
              style={{ fontFamily: 'var(--font-dancing)', fontSize: '1.1rem', color: '#5A8A50' }}
            >
              Your birthday wish 💌
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={280}
              rows={4}
              placeholder="Write something sweet..."
              className="w-full px-4 py-2.5 rounded-xl outline-none text-gray-700 placeholder-pink-200 text-sm resize-none transition-all duration-200"
              style={{
                background: 'rgba(240,248,236,0.8)',
                border: '1.5px solid rgba(160,190,140,0.4)',
                fontFamily: 'var(--font-dancing)',
                fontSize: '1rem',
                lineHeight: '1.6',
              }}
              onFocus={(e) =>
                (e.target.style.border = '1.5px solid rgba(100,150,80,0.7)')
              }
              onBlur={(e) =>
                (e.target.style.border = '1.5px solid rgba(160,190,140,0.4)')
              }
            />
            <span className="text-xs text-right pr-1" style={{ color: '#A8B898' }}>
              {message.length}/280
            </span>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-center"
                style={{ color: '#B06858', fontFamily: 'var(--font-dancing)', fontSize: '1rem' }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-xl text-white font-semibold text-base tracking-wide transition-opacity disabled:opacity-60"
            style={{
              background: 'linear-gradient(135deg, #7AAE6A, #5A9A50, #4A8A42)',
              boxShadow: '0 4px 20px rgba(90, 154, 80, 0.35)',
              fontFamily: 'var(--font-dancing)',
              fontSize: '1.15rem',
              letterSpacing: '0.04em',
            }}
          >
            {loading ? 'Sending with love... 💕' : 'Leave a wish 🎀'}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
