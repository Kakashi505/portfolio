"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Eye, Heart, Tag, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  featured_image?: string
  tags?: string[]
  category?: string
  published_at?: string
  views: number
  likes: number
}

interface BlogListProps {
  initialPosts?: BlogPost[]
  showPagination?: boolean
  limit?: number
  category?: string
  tag?: string
  searchQuery?: string
}

export default function BlogList({ initialPosts = [], showPagination = true, limit = 6, category, tag, searchQuery }: BlogListProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    if (initialPosts.length === 0) {
      fetchPosts()
    }
  }, [])

  useEffect(() => {
    if (category !== undefined || tag !== undefined || searchQuery !== undefined) {
      fetchPosts(1)
    }
  }, [category, tag, searchQuery])

  const fetchPosts = async (page = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      })
      
      if (category && category !== 'all') {
        params.append('category', category)
      }
      
      if (tag && tag !== 'all') {
        params.append('tag', tag)
      }
      
      if (searchQuery) {
        params.append('search', searchQuery)
      }
      
      const response = await fetch(`/api/blog?${params.toString()}`)
      const data = await response.json()
      
      if (response.ok) {
        setPosts(data.posts)
        setTotalPages(data.pagination.totalPages)
        setCurrentPage(page)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  if (loading && posts.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="border-0 shadow-lg">
            <div className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {posts.map((post, index) => (
          <motion.div key={post.id} variants={fadeInUp}>
            <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
              {post.featured_image && (
                <div className="relative overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
              
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  {post.category && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                      {post.category}
                    </Badge>
                  )}
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.published_at && formatDate(post.published_at)}
                  </div>
                </div>
                
                <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
                
                {post.excerpt && (
                  <p className="text-sm text-gray-600 line-clamp-3 mt-2">
                    {post.excerpt}
                  </p>
                )}
              </CardHeader>
              
              <CardContent className="pt-0">
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs px-2 py-1">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs px-2 py-1 bg-gray-50 text-gray-600">
                        +{post.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {post.views}
                    </div>
                    <div className="flex items-center">
                      <Heart className="h-3 w-3 mr-1" />
                      {post.likes}
                    </div>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                      Read More
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {showPagination && totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchPosts(currentPage - 1)}
              disabled={currentPage === 1 || loading}
            >
              Previous
            </Button>
            
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => fetchPosts(i + 1)}
                disabled={loading}
              >
                {i + 1}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchPosts(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
