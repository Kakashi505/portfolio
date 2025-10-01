import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/db/supabase'
import { requireAuth } from '@/lib/auth'

// GET /api/blog - Get all blog posts (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'published'
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    const search = searchParams.get('search')
    const limit = searchParams.get('limit')
    const page = searchParams.get('page') || '1'
    const pageSize = parseInt(limit || '10')

    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('status', status)
      .order('published_at', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

    if (tag) {
      query = query.contains('tags', [tag])
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`)
    }

    // Add pagination
    const from = (parseInt(page) - 1) * pageSize
    const to = from + pageSize - 1
    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      posts: data,
      pagination: {
        page: parseInt(page),
        pageSize,
        total: count,
        totalPages: Math.ceil((count || 0) / pageSize)
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/blog - Create a new blog post (Admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = requireAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, excerpt, content, featured_image, tags, category, status } = body

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Check if slug already exists
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .single()

    let finalSlug = slug
    if (existingPost) {
      finalSlug = `${slug}-${Date.now()}`
    }

    const postData: any = {
      title,
      slug: finalSlug,
      content,
      author_id: user.id,
      status: status || 'draft'
    }

    if (excerpt) postData.excerpt = excerpt
    if (featured_image) postData.featured_image = featured_image
    if (tags) postData.tags = tags
    if (category) postData.category = category

    // Set published_at if status is published
    if (status === 'published') {
      postData.published_at = new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([postData])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ post: data }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
