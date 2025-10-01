import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/db/supabase'
import { requireAuth } from '@/lib/auth'

// GET /api/admin/dashboard - Get dashboard statistics (Admin only)
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = requireAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get statistics
    const [
      projectsResult,
      certificationsResult,
      contactMessagesResult,
      recentMessagesResult
    ] = await Promise.all([
      supabase.from('projects').select('id, category, created_at'),
      supabase.from('certifications').select('id, issuer, created_at'),
      supabase.from('contact_messages').select('id, status, created_at'),
      supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(5)
    ])

    if (projectsResult.error || certificationsResult.error || contactMessagesResult.error || recentMessagesResult.error) {
      return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 })
    }

    // Calculate statistics
    const totalProjects = projectsResult.data?.length || 0
    const totalCertifications = certificationsResult.data?.length || 0
    const totalMessages = contactMessagesResult.data?.length || 0
    
    // Projects by category
    const projectsByCategory = projectsResult.data?.reduce((acc: any, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1
      return acc
    }, {}) || {}

    // Messages by status
    const messagesByStatus = contactMessagesResult.data?.reduce((acc: any, message) => {
      acc[message.status] = (acc[message.status] || 0) + 1
      return acc
    }, {}) || {}

    // Recent activity (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentProjects = projectsResult.data?.filter(p => 
      new Date(p.created_at) > thirtyDaysAgo
    ).length || 0

    const recentMessages = contactMessagesResult.data?.filter(m => 
      new Date(m.created_at) > thirtyDaysAgo
    ).length || 0

    return NextResponse.json({
      statistics: {
        totalProjects,
        totalCertifications,
        totalMessages,
        recentProjects,
        recentMessages
      },
      breakdown: {
        projectsByCategory,
        messagesByStatus
      },
      recentMessages: recentMessagesResult.data
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
