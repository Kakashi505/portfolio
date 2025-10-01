const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://boqainjjrbzqshoglakb.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvcWFpbmpqcmJ6cXNob2dsYWtiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTI4OTc3NSwiZXhwIjoyMDc0ODY1Nzc1fQ.syTLpchN0B0DpdUeS4bT0P8YdG4R1RGlSrFxWtdkOso'

const supabase = createClient(supabaseUrl, supabaseKey)

async function quickSetup() {
  console.log('🚀 Quick Supabase Setup...')
  console.log('📍 URL:', supabaseUrl)
  console.log('🔑 Using Service Role Key')

  try {
    // Test connection
    console.log('📡 Testing connection...')
    const { data, error } = await supabase.from('projects').select('count').limit(1)
    
    if (error && error.message.includes('relation "projects" does not exist')) {
      console.log('❌ Database tables not found.')
      console.log('')
      console.log('🔧 SOLUTION:')
      console.log('1. Go to: https://supabase.com/dashboard/project/boqainjjrbzqshoglakb/sql')
      console.log('2. Copy the SQL from: lib/db/schema.sql')
      console.log('3. Paste and run it in the SQL Editor')
      console.log('4. Come back and run: npm run test-supabase')
      console.log('')
      console.log('📋 Or use the web setup page:')
      console.log('1. Run: npm run dev')
      console.log('2. Go to: http://localhost:3000/setup')
      console.log('3. Follow the instructions')
      return
    }

    if (error) {
      console.error('❌ Connection error:', error.message)
      return
    }

    console.log('✅ Connection successful!')
    
    // Test posts table
    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .select('count')
      .limit(1)

    if (postsError && postsError.message.includes('relation "posts" does not exist')) {
      console.log('📝 Posts table not found. Creating sample posts...')
      
      // Try to create posts table by inserting data
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
        }
      ]

      const { data: insertData, error: insertError } = await supabase
        .from('posts')
        .insert(samplePosts)
        .select()

      if (insertError) {
        console.log('❌ Cannot create posts table automatically.')
        console.log('📋 Please run the SQL schema manually:')
        console.log('1. Go to Supabase SQL Editor')
        console.log('2. Copy contents of lib/db/schema.sql')
        console.log('3. Run the SQL')
      } else {
        console.log('✅ Created posts table and inserted sample data!')
        console.log(`📄 Inserted ${insertData.length} sample posts`)
      }
    } else if (postsError) {
      console.log('❌ Posts table error:', postsError.message)
    } else {
      console.log('✅ Posts table exists and is working!')
    }

    console.log('')
    console.log('🎉 Setup complete! You can now:')
    console.log('1. Run: npm run dev')
    console.log('2. Go to: http://localhost:3000/blog')
    console.log('3. Start creating posts!')

  } catch (error) {
    console.error('❌ Setup failed:', error.message)
  }
}

quickSetup()

