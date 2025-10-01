import { NextResponse } from 'next/server'
import { setupDatabase } from '@/lib/db/setup'

// POST /api/setup - Initialize database with sample data
export async function POST() {
  try {
    const result = await setupDatabase()
    
    if (result.success) {
      return NextResponse.json({ 
        message: 'Database setup completed successfully',
        success: true 
      })
    } else {
      return NextResponse.json({ 
        error: 'Database setup failed',
        success: false 
      }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ 
      error: 'Internal server error',
      success: false 
    }, { status: 500 })
  }
}
