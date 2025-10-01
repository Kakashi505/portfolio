import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://boqainjjrbzqshoglakb.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvcWFpbmpqcmJ6cXNob2dsYWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyODk3NzUsImV4cCI6MjA3NDg2NTc3NX0.5AZ3mSgPABa4qsVpnxuMjaXDZvHyLInwoLVDh5zUuAs'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  year: string
  image: string
  website?: string
  github?: string
  role?: string
  skills?: string[]
  category: 'full-stack' | 'blockchain' | 'ai'
  created_at: string
  updated_at: string
}

export interface Certification {
  id: string
  title: string
  description: string
  image: string
  issuer: string
  date_issued: string
  credential_id?: string
  credential_url?: string
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied'
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  email: string
  password_hash: string
  role: 'admin' | 'super_admin'
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image?: string
  tags?: string[]
  category?: string
  status: 'draft' | 'published' | 'archived'
  published_at?: string
  author_id?: string
  views: number
  likes: number
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  title: string
  body: string
  published: boolean
  created_at: string
}
