import { supabase } from './supabase'
import bcrypt from 'bcryptjs'

export async function setupDatabase() {
  try {
    console.log('Setting up database...')

    // Check if admin user exists
    const { data: existingAdmin } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', process.env.ADMIN_EMAIL || 'admin@kashima.dev')
      .single()

    if (!existingAdmin) {
      // Create admin user
      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD || 'admin123',
        12
      )

      const { error: adminError } = await supabase
        .from('admin_users')
        .insert([{
          email: process.env.ADMIN_EMAIL || 'admin@kashima.dev',
          password_hash: hashedPassword,
          role: 'super_admin'
        }])

      if (adminError) {
        console.error('Error creating admin user:', adminError)
      } else {
        console.log('Admin user created successfully')
      }
    }

    // Check if we have sample data
    const { data: projects } = await supabase
      .from('projects')
      .select('id')
      .limit(1)

    if (!projects || projects.length === 0) {
      console.log('Adding sample data...')
      
      // Add sample projects
      const sampleProjects = [
        {
          title: "E-Commerce Platform",
          description: "Full-featured e-commerce platform with React, Node.js, MongoDB, and Stripe integration",
          tech: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
          year: "2024",
          image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
          website: "https://ecommerceparadise.com",
          github: "https://github.com/Micklitodev/Paradise-Ecom",
          role: "Full-Stack Developer",
          skills: ["E-commerce", "Payment Gateway", "User Authentication", "Database Management"],
          category: "full-stack"
        },
        {
          title: "DeFi Trading Platform",
          description: "Decentralized finance platform built on Solana blockchain with automated trading strategies",
          tech: ["Solana", "Rust", "React", "Web3.js", "Anchor"],
          year: "2024",
          image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600",
          website: "https://defitrading.com",
          github: "https://github.com/Micklitodev/DeFi-Trading",
          role: "Blockchain Developer",
          skills: ["Smart Contracts", "DeFi", "Automated Trading", "Solana Development"],
          category: "blockchain"
        },
        {
          title: "AI-Powered Translation Website",
          description: "Multilingual web platform with real-time AI translation supporting 50+ languages",
          tech: ["Next.js", "OpenAI API", "React", "TypeScript", "Tailwind CSS"],
          year: "2024",
          image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600",
          website: "https://aitranslate.com",
          github: "https://github.com/Micklitodev/AI-Translate",
          role: "AI Developer",
          skills: ["Natural Language Processing", "Machine Learning", "Real-time Translation", "API Integration"],
          category: "ai"
        }
      ]

      const { error: projectsError } = await supabase
        .from('projects')
        .insert(sampleProjects)

      if (projectsError) {
        console.error('Error adding sample projects:', projectsError)
      } else {
        console.log('Sample projects added successfully')
      }

      // Add sample certifications
      const sampleCertifications = [
        {
          title: "Angular Developer Certification",
          description: "Professional certification in Angular framework development",
          image: "/Angular.png",
          issuer: "Google",
          date_issued: "2024-01-15",
          credential_id: "ANG-2024-001"
        },
        {
          title: "Python Programming Certification",
          description: "Advanced Python programming and data science certification",
          image: "/Python.png",
          issuer: "Python Institute",
          date_issued: "2024-02-20",
          credential_id: "PYT-2024-002"
        },
        {
          title: "React Developer Certification",
          description: "Modern React development with hooks and advanced patterns",
          image: "/React.png",
          issuer: "Meta",
          date_issued: "2024-03-10",
          credential_id: "REA-2024-003"
        },
        {
          title: "Software Engineering Certification",
          description: "Comprehensive software engineering and system design certification",
          image: "/Software.png",
          issuer: "IEEE",
          date_issued: "2024-04-05",
          credential_id: "SWE-2024-004"
        }
      ]

      const { error: certsError } = await supabase
        .from('certifications')
        .insert(sampleCertifications)

      if (certsError) {
        console.error('Error adding sample certifications:', certsError)
      } else {
        console.log('Sample certifications added successfully')
      }
    }

    console.log('Database setup completed successfully!')
    return { success: true }
  } catch (error) {
    console.error('Database setup failed:', error)
    return { success: false, error }
  }
}
