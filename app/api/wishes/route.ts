import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const NOTE_COLORS = [
  '#FFD6E0', // rose
  '#FFE4CC', // peach
  '#EDD9F7', // lilac
  '#FFF5C3', // butter
  '#FADADD', // blush
  '#D8F5E8', // mint
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
  const sender_name = body.sender_name?.trim()
  const message = body.message?.trim()

  if (!sender_name || !message) {
    return NextResponse.json({ error: 'Name and message are required' }, { status: 400 })
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
