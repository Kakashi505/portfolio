"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import PostEditor from '@/components/PostEditor'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NewBlogPostPage() {
  const router = useRouter()

  const handleSave = (post: any) => {
    // Redirect to the blog list to see the new post
    router.push('/blog')
  }

  const handleCancel = () => {
    router.push('/blog')
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
