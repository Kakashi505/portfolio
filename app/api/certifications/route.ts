import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/db/supabase'

// GET /api/certifications - Get all certifications
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const issuer = searchParams.get('issuer')
    const limit = searchParams.get('limit')

    let query = supabase
      .from('certifications')
      .select('*')
      .order('date_issued', { ascending: false })

    if (issuer) {
      query = query.eq('issuer', issuer)
    }

    if (limit) {
      query = query.limit(parseInt(limit))
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ certifications: data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/certifications - Create a new certification (Admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, image, issuer, date_issued, credential_id, credential_url } = body

    // Validate required fields
    if (!title || !description || !image || !issuer || !date_issued) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('certifications')
      .insert([{
        title,
        description,
        image,
        issuer,
        date_issued,
        credential_id,
        credential_url
      }])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ certification: data }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
