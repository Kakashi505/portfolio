import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://boqainjjrbzqshoglakb.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvcWFpbmpqcmJ6cXNob2dsYWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyODk3NzUsImV4cCI6MjA3NDg2NTc3NX0.5AZ3mSgPABa4qsVpnxuMjaXDZvHyLInwoLVDh5zUuAs'
)

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const limit = Number(url.searchParams.get('limit') ?? '10')
    const cursor_ts = url.searchParams.get('cursor_ts')
    const cursor_id = url.searchParams.get('cursor_id')

    // Use RPC function for robust cursor-based pagination
    if (cursor_ts && cursor_id) {
      const { data, error } = await supabase.rpc('fetch_posts_before', {
        cursor_ts,
        cursor_id,
        page_size: limit
      })

      if (error) {
        console.error('RPC Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ 
        posts: data || [],
        hasMore: data && data.length === limit,
        nextCursor: data && data.length > 0 ? {
          cursor_ts: data[data.length - 1].created_at,
          cursor_id: data[data.length - 1].id
        } : null
      })
    }

    // First page - no cursor
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, body, published, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Query Error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      posts: data || [],
      hasMore: data && data.length === limit,
      nextCursor: data && data.length > 0 ? {
        cursor_ts: data[data.length - 1].created_at,
        cursor_id: data[data.length - 1].id
      } : null
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json()
    const { title, body, published = true } = requestBody

    if (!title || !body) {
      return NextResponse.json({ error: 'Title and body are required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, body, published }])
      .select()
      .single()

    if (error) {
      console.error('Insert Error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ post: data }, { status: 201 })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
