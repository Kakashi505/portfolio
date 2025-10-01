// Database Setup Script
// Run this script to initialize your Supabase database

const { createClient } = require('@supabase/supabase-js')

// Your Supabase credentials
const supabaseUrl = 'https://boqainjjrbzqshoglakb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvcWFpbmpqcmJ6cXNob2dsYWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyODk3NzUsImV4cCI6MjA3NDg2NTc3NX0.5AZ3mSgPABa4qsVpnxuMjaXDZvHyLInwoLVDh5zUuAs'

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupDatabase() {
  console.log('🚀 Setting up Supabase database...')
  
  try {
    // Test connection
    const { data, error } = await supabase.from('projects').select('count').limit(1)
    
    if (error) {
      console.log('❌ Database connection failed. Please run the SQL schema first.')
      console.log('📝 Go to Supabase Dashboard → SQL Editor and run the contents of lib/db/schema.sql')
      return
    }
    
    console.log('✅ Database connection successful!')
    console.log('🎉 Your blog feature is ready to use!')
    console.log('')
    console.log('📋 Next steps:')
    console.log('1. Create .env.local file with your credentials')
    console.log('2. Run: npm run dev')
    console.log('3. Visit: http://localhost:3000/blog')
    console.log('4. Test API: http://localhost:3000/api/blog')
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message)
  }
}

setupDatabase()
