"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import PostEditor from '@/components/PostEditor'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NewBlogPostPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()

  React.useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('admin_token')
    if (token) {
      setIsAuthenticated(true)
    }
    setIsChecking(false)
  }, [])

  const handleSave = (post: any) => {
    // Redirect to the blog post or blog list
    router.push(`/blog/${post.slug}`)
  }

  const handleCancel = () => {
    router.push('/blog')
  }

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Admin Access Required
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                You need to be logged in as an admin to create blog posts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/blog">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Blog
                  </Button>
                </Link>
                
                <Link href="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Home className="h-4 w-4 mr-2" />
                    Back to Homepage
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <Link href="/blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            
            <Link href="/">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Homepage
              </Button>
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Blog Post
          </h1>
          <p className="text-gray-600 mt-2">
            Share your thoughts, tutorials, and insights with the world
          </p>
        </motion.div>

        <PostEditor onSave={handleSave} onCancel={handleCancel} />
      </div>
    </div>
  )
}
