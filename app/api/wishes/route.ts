import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const NOTE_COLORS = [
  '#EDF3E8', // sage
  '#FBF0E4', // warm cream
  '#F5E3DC', // dusty rose
  '#EAE0F0', // soft lavender
  '#FBF5DC', // butter
  '#E4EEF5', // misty blue
]

export async function GET() {
  const { data, error } = await supabase
    .from('wishes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()
  const sender_name = body.sender_name?.trim() || 'A friend'
  const message = body.message?.trim()

  if (!message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 })
  }

  const color = NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)]

  const { data, error } = await supabase
    .from('wishes')
    .insert([{ sender_name, message, color }])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
