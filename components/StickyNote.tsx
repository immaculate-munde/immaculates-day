'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  id: string
  senderName: string
  message: string
  color: string
  rotation: number
  xOffset: number
  yOffset: number
  delay?: number
  onSave: (id: string, newName: string, newMessage: string) => Promise<void>
}

export default function StickyNote({
  id,
  senderName,
  message,
  color,
  rotation,
  xOffset,
  yOffset,
  delay = 0,
  onSave,
}: Props) {
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState(senderName)
  const [editMessage, setEditMessage] = useState(message)
  const [saving, setSaving] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (editing) textareaRef.current?.focus()
  }, [editing])

  function handleEdit(e: React.MouseEvent) {
    e.stopPropagation()
    setEditName(senderName)
    setEditMessage(message)
    setEditing(true)
  }

  function handleCancel(e: React.MouseEvent) {
    e.stopPropagation()
    setEditing(false)
  }

  async function handleSave(e: React.MouseEvent) {
    e.stopPropagation()
    if (!editName.trim() || !editMessage.trim()) return
    setSaving(true)
    await onSave(id, editName.trim(), editMessage.trim())
    setSaving(false)
    setEditing(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4, y: 60, rotate: rotation - 15 }}
      animate={{ opacity: 1, scale: 1, y: yOffset, rotate: editing ? 0 : rotation, x: xOffset }}
      transition={{ type: 'spring', stiffness: 160, damping: 14, delay }}
      whileHover={editing ? {} : {
        scale: 1.1,
        rotate: 0,
        y: yOffset - 14,
        zIndex: 50,
        boxShadow: '0 16px 48px rgba(220, 100, 150, 0.45), 0 0 0 2px rgba(255,182,193,0.6)',
        transition: { duration: 0.18 },
      }}
      style={{
        backgroundColor: color,
        boxShadow: editing
          ? '0 20px 60px rgba(220, 100, 150, 0.35), 0 0 0 2px rgba(255,150,180,0.5)'
          : '3px 6px 18px rgba(180, 80, 120, 0.18), 0 0 0 1px rgba(0,0,0,0.04)',
        position: 'relative',
        zIndex: editing ? 100 : 1,
        cursor: editing ? 'default' : 'pointer',
      }}
      className="relative w-44 min-h-[148px] p-4 pt-6 rounded-sm flex flex-col justify-between shrink-0 group"
    >
      {/* pin */}
      <div
        className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #f9a8c9, #c06080)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
        }}
      />

      {/* fold corner */}
      {!editing && (
        <div
          className="absolute bottom-0 right-0 w-6 h-6"
          style={{ background: `linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.07) 50%)` }}
        />
      )}

      {/* pencil edit button — visible on hover */}
      {!editing && (
        <button
          onClick={handleEdit}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-base leading-none p-0.5 rounded hover:scale-110 active:scale-95"
          title="Edit this wish"
          style={{ color: '#c06080' }}
        >
          ✏️
        </button>
      )}

      <AnimatePresence mode="wait">
        {editing ? (
          <motion.div
            key="edit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-2 flex-1"
          >
            <textarea
              ref={textareaRef}
              value={editMessage}
              onChange={(e) => setEditMessage(e.target.value)}
              maxLength={280}
              rows={4}
              className="w-full text-sm text-gray-700 rounded-md px-2 py-1.5 resize-none outline-none"
              style={{
                background: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(200,100,140,0.3)',
                fontFamily: 'var(--font-dancing-script)',
                fontSize: '0.9rem',
                lineHeight: '1.5',
              }}
            />
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              maxLength={50}
              placeholder="Your name"
              className="w-full text-xs rounded-md px-2 py-1 outline-none"
              style={{
                background: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(200,100,140,0.3)',
                fontFamily: 'var(--font-dancing-script)',
                fontSize: '0.85rem',
                color: '#b05070',
              }}
            />
            <div className="flex gap-1.5 mt-1">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 text-xs py-1 rounded-md text-white transition-opacity disabled:opacity-60"
                style={{
                  background: 'linear-gradient(135deg, #f472b6, #db6895)',
                  fontFamily: 'var(--font-dancing-script)',
                  fontSize: '0.85rem',
                }}
              >
                {saving ? '...' : 'Save ✓'}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 text-xs py-1 rounded-md transition-opacity"
                style={{
                  background: 'rgba(0,0,0,0.07)',
                  fontFamily: 'var(--font-dancing-script)',
                  fontSize: '0.85rem',
                  color: '#888',
                }}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col flex-1 justify-between"
          >
            <p
              className="text-[15px] leading-relaxed text-gray-700 break-words whitespace-pre-wrap flex-1"
              style={{ fontFamily: 'var(--font-dancing-script)' }}
            >
              {message}
            </p>
            <p
              className="text-sm mt-3 text-right"
              style={{ fontFamily: 'var(--font-dancing-script)', color: '#b05070' }}
            >
              — {senderName}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
