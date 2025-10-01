import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/db/supabase'

// GET /api/projects - Get all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')

    let query = supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

    if (limit) {
      query = query.limit(parseInt(limit))
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ projects: data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/projects - Create a new project (Admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, tech, year, image, website, github, role, skills, category } = body

    // Validate required fields
    if (!title || !description || !tech || !year || !image || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate category
    if (!['full-stack', 'blockchain', 'ai'].includes(category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([{
        title,
        description,
        tech,
        year,
        image,
        website,
        github,
        role,
        skills,
        category
      }])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ project: data }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
