// Test Supabase Connection
// Run this script to test your Supabase connection

const { createClient } = require('@supabase/supabase-js')

// Your Supabase credentials
const supabaseUrl = 'https://boqainjjrbzqshoglakb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvcWFpbmpqcmJ6cXNob2dsYWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyODk3NzUsImV4cCI6MjA3NDg2NTc3NX0.5AZ3mSgPABa4qsVpnxuMjaXDZvHyLInwoLVDh5zUuAs'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('🔍 Testing Supabase connection...')
  console.log('📍 URL:', supabaseUrl)
  console.log('🔑 Key:', supabaseKey.substring(0, 20) + '...')
  console.log('')
  
  try {
    // Test basic connection
    const { data, error } = await supabase.from('projects').select('count').limit(1)
    
    if (error) {
      console.log('❌ Connection failed:', error.message)
      console.log('')
      console.log('🔧 Troubleshooting:')
      console.log('1. Check if your Supabase project is active')
      console.log('2. Verify the URL and API key are correct')
      console.log('3. Make sure you have run the database schema')
      return false
    }
    
    console.log('✅ Connection successful!')
    console.log('📊 Database is accessible')
    
    // Test blog posts table
    const { data: blogData, error: blogError } = await supabase.from('blog_posts').select('count').limit(1)
    
    if (blogError) {
      console.log('⚠️  Blog table not found. Please run the database schema.')
      console.log('📝 Run the contents of lib/db/schema.sql in Supabase SQL Editor')
    } else {
      console.log('✅ Blog table is ready!')
    }
    
    return true
    
  } catch (error) {
    console.log('❌ Unexpected error:', error.message)
    return false
  }
}

testConnection()
