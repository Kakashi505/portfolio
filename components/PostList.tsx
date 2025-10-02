"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Loader2, Settings, Edit, Trash2, Eye } from 'lucide-react'
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
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

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

  const handleDelete = async (postId: string) => {
    setDeleting(postId)
    try {
      const response = await fetch(`/api/posts?id=${postId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete post')
      }

      // Remove the post from the local state
      setPosts(prev => prev.filter(post => post.id !== postId))
      setDeleteConfirm(null)
    } catch (error) {
      console.error('Error deleting post:', error)
      setError(error instanceof Error ? error.message : 'Failed to delete post')
    } finally {
      setDeleting(null)
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
                <div className="prose prose-gray max-w-none mb-4">
                  <p className="text-gray-700 leading-relaxed">
                    {post.body.length > 200 
                      ? `${post.body.substring(0, 200)}...` 
                      : post.body
                    }
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      post.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    
                    <Link href={`/blog/edit/${post.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setDeleteConfirm(post.id)}
                      disabled={deleting === post.id}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      {deleting === post.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </>
                      )}
                    </Button>
                  </div>
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

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setDeleteConfirm(null)}
                disabled={deleting === deleteConfirm}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleting === deleteConfirm}
              >
                {deleting === deleteConfirm ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete Post'
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
