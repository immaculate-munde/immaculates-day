'use client'
import { motion } from 'framer-motion'

type Props = {
  senderName: string
  message: string
  color: string
  rotation: number
  xOffset: number
  yOffset: number
  delay?: number
}

export default function StickyNote({
  senderName,
  message,
  color,
  rotation,
  xOffset,
  yOffset,
  delay = 0,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4, y: 60, rotate: rotation - 15 }}
      animate={{ opacity: 1, scale: 1, y: yOffset, rotate: rotation, x: xOffset }}
      transition={{ type: 'spring', stiffness: 160, damping: 14, delay }}
      whileHover={{
        scale: 1.1,
        rotate: 0,
        y: yOffset - 14,
        zIndex: 50,
        boxShadow: '0 16px 48px rgba(100, 150, 80, 0.35), 0 0 0 2px rgba(160,200,140,0.55)',
        transition: { duration: 0.18 },
      }}
      style={{
        backgroundColor: color,
        boxShadow: '3px 6px 18px rgba(80, 110, 60, 0.15), 0 0 0 1px rgba(0,0,0,0.04)',
        position: 'relative',
        zIndex: 1,
        cursor: 'default',
      }}
      className="relative w-44 min-h-[148px] p-4 pt-6 rounded-sm flex flex-col justify-between shrink-0"
    >
      {/* pin */}
      <div
        className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #B8D8A8, #6A9A58)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
        }}
      />

      {/* fold corner */}
      <div
        className="absolute bottom-0 right-0 w-6 h-6"
        style={{ background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.07) 50%)' }}
      />

      <p
        className="text-[15px] leading-relaxed text-gray-700 break-words whitespace-pre-wrap flex-1"
        style={{ fontFamily: 'var(--font-dancing-script)' }}
      >
        {message}
      </p>

      <p
        className="text-sm mt-3 text-right"
        style={{ fontFamily: 'var(--font-dancing-script)', color: '#7A6A50' }}
      >
        — {senderName}
      </p>
    </motion.div>
  )
}
