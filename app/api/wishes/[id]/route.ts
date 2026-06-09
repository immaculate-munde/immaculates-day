import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const sender_name = body.sender_name?.trim()
  const message = body.message?.trim()

  if (!sender_name || !message) {
    return NextResponse.json({ error: 'Name and message are required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('wishes')
    .update({ sender_name, message })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
