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

    console.log('Posts API called with:', { limit, cursor_ts, cursor_id })

    // Check if posts table exists first
    const { data: tableCheck, error: tableError } = await supabase
      .from('posts')
      .select('count')
      .limit(1)

    if (tableError) {
      console.error('Table check error:', tableError)
      // If table doesn't exist, return empty result instead of error
      return NextResponse.json({ 
        posts: [],
        hasMore: false,
        nextCursor: null,
        message: 'Posts table not found. Please run the database setup.'
      })
    }

    // Use RPC function for robust cursor-based pagination (if available)
    if (cursor_ts && cursor_id) {
      try {
        const { data, error } = await supabase.rpc('fetch_posts_before', {
          cursor_ts,
          cursor_id,
          page_size: limit
        })

        if (error) {
          console.error('RPC Error, falling back to simple query:', error)
          // Fall back to simple query if RPC fails
        } else {
          return NextResponse.json({ 
            posts: data || [],
            hasMore: data && data.length === limit,
            nextCursor: data && data.length > 0 ? {
              cursor_ts: data[data.length - 1].created_at,
              cursor_id: data[data.length - 1].id
            } : null
          })
        }
      } catch (rpcError) {
        console.error('RPC function not available, using simple query:', rpcError)
      }
    }

    // Simple query (works without RPC function)
    let query = supabase
      .from('posts')
      .select('id, title, body, published, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    // Add cursor filter if provided
    if (cursor_ts) {
      query = query.lt('created_at', cursor_ts)
    }

    const { data, error } = await query

    if (error) {
      console.error('Query Error:', error)
      return NextResponse.json({ 
        error: error.message,
        posts: [],
        hasMore: false,
        nextCursor: null
      }, { status: 500 })
    }

    console.log('Query successful, found posts:', data?.length || 0)

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
    return NextResponse.json({ 
      error: 'Internal server error',
      posts: [],
      hasMore: false,
      nextCursor: null
    }, { status: 500 })
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

export async function PUT(req: NextRequest) {
  try {
    const requestBody = await req.json()
    const { id, title, body, published } = requestBody

    if (!id || !title || !body) {
      return NextResponse.json({ error: 'ID, title and body are required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('posts')
      .update({ title, body, published })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Update Error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ post: data }, { status: 200 })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Delete Error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
