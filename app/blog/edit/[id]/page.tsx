"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PostEditor from '@/components/PostEditor'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Post } from '@/lib/db/supabase'

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { id } = await params
        const response = await fetch(`/api/posts/${id}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch post')
        }
        
        const data = await response.json()
        setPost(data.post)
      } catch (err) {
        console.error('Error fetching post:', err)
        setError(err instanceof Error ? err.message : 'Failed to load post')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params])

  const handleSave = async (updatedPost: any) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: post?.id,
          title: updatedPost.title,
          body: updatedPost.body,
          published: updatedPost.published
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update post')
      }

      // Redirect to the blog list to see the updated post
      router.push('/blog')
    } catch (error) {
      console.error('Error updating post:', error)
      setError(error instanceof Error ? error.message : 'Failed to update post')
    }
  }

  const handleCancel = () => {
    router.push('/blog')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="max-w-md mx-auto p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm">
              <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
              <p className="text-red-600 mb-4">{error}</p>
              <div className="flex gap-4 justify-center">
                <Link href="/blog">
                  <Button>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Blog
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline">
                    <Home className="h-4 w-4 mr-2" />
                    Homepage
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="max-w-md mx-auto p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
              <h1 className="text-2xl font-bold text-gray-600 mb-4">Post Not Found</h1>
              <p className="text-gray-600 mb-4">The post you're looking for doesn't exist.</p>
              <div className="flex gap-4 justify-center">
                <Link href="/blog">
                  <Button>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Blog
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline">
                    <Home className="h-4 w-4 mr-2" />
                    Homepage
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
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
            Edit Blog Post
          </h1>
          <p className="text-gray-600 mt-2">
            Update your blog post content and settings
          </p>
        </motion.div>

        <PostEditor 
          onSave={handleSave} 
          onCancel={handleCancel}
          initialPost={{
            id: post.id,
            title: post.title,
            body: post.body,
            published: post.published
          }}
        />
      </div>
    </div>
  )
}
