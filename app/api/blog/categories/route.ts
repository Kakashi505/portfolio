import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/db/supabase'

// GET /api/blog/categories - Get all blog categories
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('category')
      .eq('status', 'published')
      .not('category', 'is', null)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Get unique categories with counts
    const categoryCounts = data.reduce((acc: any, post) => {
      if (post.category) {
        acc[post.category] = (acc[post.category] || 0) + 1
      }
      return acc
    }, {})

    const categories = Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      count: count as number
    }))

    return NextResponse.json({ categories })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
