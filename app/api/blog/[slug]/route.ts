import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/db/supabase'
import { requireAuth } from '@/lib/auth'

// GET /api/blog/[slug] - Get a specific blog post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Increment view count
    await supabase
      .from('blog_posts')
      .update({ views: data.views + 1 })
      .eq('id', data.id)

    return NextResponse.json({ post: { ...data, views: data.views + 1 } })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/blog/[slug] - Update a blog post (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Check authentication
    const user = requireAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { slug } = await params
    const body = await request.json()
    const { title, excerpt, content, featured_image, tags, category, status } = body

    // Validate status if provided
    if (status && !['draft', 'published', 'archived'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const updateData: any = {}
    if (title) {
      updateData.title = title
      // Generate new slug if title changed
      const newSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      updateData.slug = newSlug
    }
    if (excerpt !== undefined) updateData.excerpt = excerpt
    if (content) updateData.content = content
    if (featured_image !== undefined) updateData.featured_image = featured_image
    if (tags) updateData.tags = tags
    if (category) updateData.category = category
    if (status) {
      updateData.status = status
      // Set published_at if status changed to published
      if (status === 'published') {
        updateData.published_at = new Date().toISOString()
      }
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('slug', slug)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({ post: data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/blog/[slug] - Delete a blog post (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Check authentication
    const user = requireAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { slug } = await params

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('slug', slug)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
