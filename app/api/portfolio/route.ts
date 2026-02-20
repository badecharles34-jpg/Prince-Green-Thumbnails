import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  const supabase = createServerSupabase()
  let query = supabase.from('thumbnails').select('*').order('created_at', { ascending: false })
  
  if (category && category !== 'All') {
    query = query.eq('category', category)
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('x-admin-key')
  if (authHeader !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const supabase = createServerSupabase()

  const { data, error } = await supabase
    .from('thumbnails')
    .insert([body])
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function DELETE(request: NextRequest) {
  const authHeader = request.headers.get('x-admin-key')
  if (authHeader !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  const supabase = createServerSupabase()
  const { error } = await supabase.from('thumbnails').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
