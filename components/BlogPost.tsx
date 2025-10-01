"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Eye, Heart, Tag, ArrowLeft, Share2, Home } from 'lucide-react'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image?: string
  tags?: string[]
  category?: string
  published_at?: string
  views: number
  likes: number
  created_at: string
  updated_at: string
}

interface BlogPostProps {
  slug: string
}

export default function BlogPost({ slug }: BlogPostProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPost()
  }, [slug])

  const fetchPost = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`/api/blog/${slug}`)
      const data = await response.json()
      
      if (response.ok) {
        setPost(data.post)
      } else {
        setError(data.error || 'Post not found')
      }
    } catch (error) {
      setError('Failed to load post')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || '',
          url: window.location.href
        })
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href)
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex gap-4">
              <Link href="/blog">
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
              
              <Link href="/">
                <Button variant="outline">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Homepage
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!post) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <Link href="/blog">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
          
          <Link href="/">
            <Button variant="ghost">
              <Home className="h-4 w-4 mr-2" />
              Back to Homepage
            </Button>
          </Link>
        </div>
      </div>

      <article className="prose prose-lg max-w-none">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            {post.category && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {post.category}
              </Badge>
            )}
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              {post.published_at && formatDate(post.published_at)}
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {post.featured_image && (
            <div className="mb-8">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {post.views} views
              </div>
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-1" />
                {post.likes} likes
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <div 
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }}
          />
        </div>

        {post.tags && post.tags.length > 0 && (
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </footer>
        )}
      </article>
    </motion.div>
  )
}
