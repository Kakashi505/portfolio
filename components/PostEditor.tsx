"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Loader2, Save, X } from 'lucide-react'

interface PostEditorProps {
  onSave?: (post: any) => void
  onCancel?: () => void
  initialPost?: {
    title: string
    body: string
    published: boolean
  }
}

export default function PostEditor({ onSave, onCancel, initialPost }: PostEditorProps) {
  const [title, setTitle] = useState(initialPost?.title || '')
  const [body, setBody] = useState(initialPost?.body || '')
  const [published, setPublished] = useState(initialPost?.published ?? true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    if (!title.trim() || !body.trim()) {
      setError('Title and body are required')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
          published
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save post')
      }

      const data = await response.json()
      
      if (onSave) {
        onSave(data.post)
      }
    } catch (error) {
      console.error('Error saving post:', error)
      setError(error instanceof Error ? error.message : 'Failed to save post')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {initialPost ? 'Edit Post' : 'Create New Post'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Content</Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your post content here..."
              rows={12}
              className="resize-none"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={published}
              onCheckedChange={setPublished}
            />
            <Label htmlFor="published">
              {published ? 'Published' : 'Draft'}
            </Label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              onClick={handleSave}
              disabled={loading || !title.trim() || !body.trim()}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {initialPost ? 'Update Post' : 'Create Post'}
                </>
              )}
            </Button>
            
            <Button
              onClick={handleCancel}
              variant="outline"
              disabled={loading}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
