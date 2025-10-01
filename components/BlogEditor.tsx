"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Save, Eye, Send, Plus, X } from 'lucide-react'

interface BlogPost {
  id?: string
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image?: string
  tags?: string[]
  category?: string
  status: 'draft' | 'published' | 'archived'
}

interface BlogEditorProps {
  post?: BlogPost
  onSave?: (post: BlogPost) => void
  onCancel?: () => void
}

export default function BlogEditor({ post, onSave, onCancel }: BlogEditorProps) {
  const [formData, setFormData] = useState<BlogPost>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    tags: [],
    category: '',
    status: 'draft'
  })
  const [newTag, setNewTag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (post) {
      setFormData(post)
    }
  }, [post])

  const handleInputChange = (field: keyof BlogPost, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Auto-generate slug from title
    if (field === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData(prev => ({
        ...prev,
        slug
      }))
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }))
  }

  const handleSubmit = async (status: 'draft' | 'published') => {
    setIsSubmitting(true)
    setError('')

    try {
      const submitData = { ...formData, status }
      const url = post?.id ? `/api/blog/${post.slug}` : '/api/blog'
      const method = post?.id ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(submitData)
      })

      if (response.ok) {
        const data = await response.json()
        onSave?.(data.post)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to save post')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const categories = [
    'Web Development',
    'Backend Development',
    'Frontend Development',
    'Blockchain',
    'Artificial Intelligence',
    'Mobile Development',
    'DevOps',
    'Data Science',
    'Tutorial',
    'News',
    'Opinion'
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {post ? 'Edit Blog Post' : 'Create New Blog Post'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <Input
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter blog post title"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug *
            </label>
            <Input
              value={formData.slug}
              onChange={(e) => handleInputChange('slug', e.target.value)}
              placeholder="url-friendly-slug"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt
            </label>
            <Textarea
              value={formData.excerpt}
              onChange={(e) => handleInputChange('excerpt', e.target.value)}
              placeholder="Brief description of the post"
              className="w-full"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image URL
            </label>
            <Input
              value={formData.featured_image}
              onChange={(e) => handleInputChange('featured_image', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
              />
              <Button onClick={addTag} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags?.map((tag, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-2 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <Textarea
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Write your blog post content here..."
              className="w-full min-h-[400px]"
            />
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <Button
              onClick={() => handleSubmit('draft')}
              disabled={isSubmitting || !formData.title || !formData.content}
              variant="outline"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Saving...' : 'Save Draft'}
            </Button>

            <Button
              onClick={() => handleSubmit('published')}
              disabled={isSubmitting || !formData.title || !formData.content}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Publishing...' : 'Publish'}
            </Button>

            {onCancel && (
              <Button onClick={onCancel} variant="ghost">
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
