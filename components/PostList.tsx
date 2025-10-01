"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Loader2, Settings } from 'lucide-react'
import Link from 'next/link'
import { Post } from '@/lib/db/supabase'

interface PostListProps {
  initialPosts?: Post[]
  showPagination?: boolean
  limit?: number
}

interface PostsResponse {
  posts: Post[]
  hasMore: boolean
  nextCursor: {
    cursor_ts: string
    cursor_id: string
  } | null
  message?: string
  error?: string
}

export default function PostList({ initialPosts = [], showPagination = true, limit = 10 }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [nextCursor, setNextCursor] = useState<{cursor_ts: string, cursor_id: string} | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initialPosts.length === 0) {
      fetchPosts()
    } else {
      // If we have initial posts, we need to determine if there are more
      setHasMore(initialPosts.length === limit)
    }
  }, [])

  const fetchPosts = async (cursor?: {cursor_ts: string, cursor_id: string}) => {
    setLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams({
        limit: limit.toString()
      })
      
      if (cursor) {
        params.append('cursor_ts', cursor.cursor_ts)
        params.append('cursor_id', cursor.cursor_id)
      }
      
      const response = await fetch(`/api/posts?${params.toString()}`)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }
      
      const data: PostsResponse = await response.json()
      
      // Check if there's a message about missing table
      if (data.message) {
        console.warn('Database setup needed:', data.message)
      }
      
      if (cursor) {
        // Loading more posts
        setPosts(prev => [...prev, ...data.posts])
      } else {
        // First load
        setPosts(data.posts)
      }
      
      setHasMore(data.hasMore)
      setNextCursor(data.nextCursor)
      
    } catch (error) {
      console.error('Error fetching posts:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch posts')
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const loadMore = () => {
    if (nextCursor && hasMore) {
      setLoadingMore(true)
      fetchPosts(nextCursor)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading && posts.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading posts...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => fetchPosts()} variant="outline">
          Try Again
        </Button>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <p className="text-gray-600 mb-4">No posts found.</p>
          <p className="text-sm text-gray-500 mb-4">
            If you're seeing this and expecting posts, the database might not be set up yet.
          </p>
          <div className="flex gap-2 justify-center">
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
              size="sm"
            >
              Refresh
            </Button>
            <Link href="/setup">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Setup Database
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="grid gap-6"
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                  {post.title}
                </CardTitle>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(post.created_at)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {post.body.length > 200 
                      ? `${post.body.substring(0, 200)}...` 
                      : post.body
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {showPagination && hasMore && (
        <div className="text-center py-6">
          <Button
            onClick={loadMore}
            disabled={loadingMore}
            variant="outline"
            className="px-8"
          >
            {loadingMore ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading more...
              </>
            ) : (
              'Load More Posts'
            )}
          </Button>
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <div className="text-center py-6">
          <p className="text-gray-500">You've reached the end of the posts!</p>
        </div>
      )}
    </div>
  )
}
