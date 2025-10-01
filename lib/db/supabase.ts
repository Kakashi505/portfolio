import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

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
