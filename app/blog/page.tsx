"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BlogList from '@/components/BlogList'
import PostList from '@/components/PostList'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Tag, Filter, Plus, Home } from 'lucide-react'
import Link from 'next/link'

interface Category {
  name: string
  count: number
}

interface Tag {
  name: string
  count: number
}

export default function BlogPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchCategories()
    fetchTags()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/blog/categories')
      const data = await response.json()
      if (response.ok) {
        setCategories(data.categories)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/blog/tags')
      const data = await response.json()
      if (response.ok) {
        setTags(data.tags)
      }
    } catch (error) {
      console.error('Error fetching tags:', error)
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <section className="pt-20 pb-12 px-4 sm:px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Thoughts, tutorials, and insights on web development, blockchain, AI, and technology
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Homepage
                </Button>
              </Link>
              
              <Link href="/blog/new">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Post
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category.name} value={category.name}>
                            {category.name} ({category.count})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tag
                    </label>
                    <Select value={selectedTag} onValueChange={setSelectedTag}>
                      <SelectTrigger>
                        <SelectValue placeholder="All tags" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All tags</SelectItem>
                        {tags.slice(0, 10).map((tag) => (
                          <SelectItem key={tag.name} value={tag.name}>
                            {tag.name} ({tag.count})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button
                      onClick={() => {
                        setSelectedCategory('all')
                        setSelectedTag('all')
                        setSearchQuery('')
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="posts">Latest Posts</TabsTrigger>
                <TabsTrigger value="blog">Blog Articles</TabsTrigger>
              </TabsList>
              
              <TabsContent value="posts" className="space-y-6">
                <PostList showPagination={true} limit={10} />
              </TabsContent>
              
              <TabsContent value="blog" className="space-y-6">
                <BlogList 
                  showPagination={true} 
                  limit={9} 
                  category={selectedCategory}
                  tag={selectedTag}
                  searchQuery={searchQuery}
                />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Categories Sidebar */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {/* Blog posts will be rendered here by BlogList component */}
            </div>
            
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="border-0 shadow-lg sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Tag className="h-5 w-5" />
                      Popular Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {tags.slice(0, 15).map((tag) => (
                        <Badge
                          key={tag.name}
                          variant="outline"
                          className="cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          onClick={() => setSelectedTag(tag.name)}
                        >
                          {tag.name} ({tag.count})
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
