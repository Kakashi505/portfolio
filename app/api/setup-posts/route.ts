import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://boqainjjrbzqshoglakb.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvcWFpbmpqcmJ6cXNob2dsYWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyODk3NzUsImV4cCI6MjA3NDg2NTc3NX0.5AZ3mSgPABa4qsVpnxuMjaXDZvHyLInwoLVDh5zUuAs'
)

export async function POST(req: NextRequest) {
  try {
    console.log('Setting up posts table...')

    // First, try to create the posts table
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS posts (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        published BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `

    // Try to execute the SQL (this might not work with anon key)
    try {
      const { error: sqlError } = await supabase.rpc('exec_sql', { sql: createTableSQL })
      if (sqlError) {
        console.log('SQL execution not available, trying direct table creation...')
      }
    } catch (sqlError) {
      console.log('SQL execution not available, trying direct table creation...')
    }

    // Try to insert a test post to see if table exists
    const testPost = {
      title: 'Test Post',
      body: 'This is a test post to verify the posts table is working.',
      published: true
    }

    const { data: insertData, error: insertError } = await supabase
      .from('posts')
      .insert([testPost])
      .select()

    if (insertError) {
      console.error('Insert error:', insertError)
      
      // If table doesn't exist, try to create it by inserting sample data
      if (insertError.message.includes('relation "posts" does not exist')) {
        return NextResponse.json({ 
          success: false,
          error: 'Posts table does not exist. Please run the SQL schema in your Supabase SQL editor.',
          instructions: [
            '1. Go to your Supabase dashboard',
            '2. Navigate to SQL Editor',
            '3. Copy and paste the contents of lib/db/schema.sql',
            '4. Run the SQL script',
            '5. Try again'
          ]
        }, { status: 400 })
      }
      
      return NextResponse.json({ 
        success: false,
        error: insertError.message 
      }, { status: 500 })
    }

    // If successful, insert some sample posts
    const samplePosts = [
      {
        title: 'Welcome to My Blog',
        body: 'This is my first blog post! I\'m excited to share my thoughts on web development, blockchain, and AI technologies. Stay tuned for more content!',
        published: true
      },
      {
        title: 'Next.js 15 Features',
        body: 'Next.js 15 brings amazing new features including improved performance, better developer experience, and enhanced security. Let me walk you through the key updates.',
        published: true
      },
      {
        title: 'Building Scalable APIs',
        body: 'Creating APIs that can handle thousands of requests requires careful planning. Here are the best practices for robust and scalable API development.',
        published: true
      },
      {
        title: 'Blockchain Development Guide',
        body: 'Blockchain technology is revolutionizing digital transactions. This comprehensive guide covers the fundamentals of blockchain and smart contract development.',
        published: true
      },
      {
        title: 'AI Trends 2024',
        body: 'Artificial Intelligence continues to evolve rapidly. Let\'s explore the most significant trends shaping the AI landscape this year.',
        published: true
      }
    ]

    const { data: sampleData, error: sampleError } = await supabase
      .from('posts')
      .insert(samplePosts)
      .select()

    if (sampleError) {
      console.log('Sample posts might already exist:', sampleError.message)
    }

    // Clean up the test post
    await supabase
      .from('posts')
      .delete()
      .eq('title', 'Test Post')

    return NextResponse.json({ 
      success: true,
      message: 'Posts table setup completed successfully!',
      samplePostsInserted: sampleData?.length || 0
    })

  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Setup failed: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    // Test if posts table exists and is accessible
    const { data, error } = await supabase
      .from('posts')
      .select('count')
      .limit(1)

    if (error) {
      return NextResponse.json({ 
        success: false,
        error: error.message,
        tableExists: false
      })
    }

    // Get count of posts
    const { count, error: countError } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({ 
      success: true,
      tableExists: true,
      postCount: count || 0
    })

  } catch (error) {
    return NextResponse.json({ 
      success: false,
      error: 'Test failed: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 })
  }
}
