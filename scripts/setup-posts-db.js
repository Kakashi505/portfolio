const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://boqainjjrbzqshoglakb.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvcWFpbmpqcmJ6cXNob2dsYWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyODk3NzUsImV4cCI6MjA3NDg2NTc3NX0.5AZ3mSgPABa4qsVpnxuMjaXDZvHyLInwoLVDh5zUuAs'

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupPostsDatabase() {
  console.log('🚀 Setting up posts database...')

  try {
    // Test connection
    console.log('📡 Testing Supabase connection...')
    const { data, error } = await supabase.from('projects').select('count').limit(1)
    
    if (error) {
      console.error('❌ Connection failed:', error.message)
      return
    }
    
    console.log('✅ Connected to Supabase successfully!')

    // Create posts table
    console.log('📝 Creating posts table...')
    const createTableSQL = `
      -- Posts table (simplified for cursor pagination)
      CREATE TABLE IF NOT EXISTS posts (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          title TEXT NOT NULL,
          body TEXT NOT NULL,
          published BOOLEAN DEFAULT true,
          created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `
    
    const { error: tableError } = await supabase.rpc('exec_sql', { sql: createTableSQL })
    
    if (tableError) {
      console.log('ℹ️  Table might already exist or using different method...')
    }

    // Create index
    console.log('🔍 Creating index for cursor pagination...')
    const createIndexSQL = `
      CREATE INDEX IF NOT EXISTS idx_posts_created_at_id ON posts (created_at DESC, id DESC);
    `
    
    const { error: indexError } = await supabase.rpc('exec_sql', { sql: createIndexSQL })
    
    if (indexError) {
      console.log('ℹ️  Index might already exist or using different method...')
    }

    // Create RPC function
    console.log('⚙️  Creating RPC function for cursor pagination...')
    const createRPCSQL = `
      CREATE OR REPLACE FUNCTION public.fetch_posts_before(cursor_ts timestamptz, cursor_id uuid, page_size int)
      RETURNS SETOF public.posts AS $$
        SELECT * FROM public.posts
        WHERE (created_at, id) < (cursor_ts, cursor_id)
        ORDER BY created_at DESC, id DESC
        LIMIT page_size;
      $$ LANGUAGE sql STABLE;
    `
    
    const { error: rpcError } = await supabase.rpc('exec_sql', { sql: createRPCSQL })
    
    if (rpcError) {
      console.log('ℹ️  RPC function might already exist or using different method...')
    }

    // Grant permissions
    console.log('🔐 Setting up permissions...')
    const grantSQL = `
      GRANT EXECUTE ON FUNCTION public.fetch_posts_before(timestamptz, uuid, int) TO anon;
    `
    
    const { error: grantError } = await supabase.rpc('exec_sql', { sql: grantSQL })
    
    if (grantError) {
      console.log('ℹ️  Permissions might already be set or using different method...')
    }

    // Insert sample posts
    console.log('📄 Inserting sample posts...')
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

    const { data: insertData, error: insertError } = await supabase
      .from('posts')
      .insert(samplePosts)
      .select()

    if (insertError) {
      console.log('ℹ️  Sample posts might already exist:', insertError.message)
    } else {
      console.log(`✅ Inserted ${insertData?.length || 0} sample posts`)
    }

    // Test the RPC function
    console.log('🧪 Testing cursor pagination...')
    const { data: testData, error: testError } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(3)

    if (testError) {
      console.error('❌ Test query failed:', testError.message)
    } else {
      console.log(`✅ Found ${testData?.length || 0} published posts`)
      if (testData && testData.length > 0) {
        console.log('📋 Sample post:', testData[0].title)
      }
    }

    console.log('🎉 Posts database setup completed!')
    console.log('')
    console.log('📋 Next steps:')
    console.log('1. Run the SQL schema in your Supabase SQL editor')
    console.log('2. Test the /api/posts endpoint')
    console.log('3. Create posts using the /blog/new page')

  } catch (error) {
    console.error('❌ Setup failed:', error.message)
  }
}

setupPostsDatabase()
