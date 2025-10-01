import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/db/supabase'

// GET /api/blog/tags - Get all blog tags
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('tags')
      .eq('status', 'published')
      .not('tags', 'is', null)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Flatten all tags and count occurrences
    const allTags = data.flatMap(post => post.tags || [])
    const tagCounts = allTags.reduce((acc: any, tag) => {
      acc[tag] = (acc[tag] || 0) + 1
      return acc
    }, {})

    const tags = Object.entries(tagCounts).map(([name, count]) => ({
      name,
      count: count as number
    }))

    return NextResponse.json({ tags })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
