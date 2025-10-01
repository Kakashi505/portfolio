"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Loader2, Database, Code, Copy } from 'lucide-react'
import Link from 'next/link'

export default function SetupPage() {
  const [testing, setTesting] = useState(false)
  const [settingUp, setSettingUp] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)
  const [setupResult, setSetupResult] = useState<any>(null)

  const testDatabase = async () => {
    setTesting(true)
    setTestResult(null)
    
    try {
      const response = await fetch('/api/setup-posts')
      const data = await response.json()
      setTestResult(data)
    } catch (error) {
      setTestResult({ success: false, error: 'Failed to test database' })
    } finally {
      setTesting(false)
    }
  }

  const setupDatabase = async () => {
    setSettingUp(true)
    setSetupResult(null)
    
    try {
      const response = await fetch('/api/setup-posts', { method: 'POST' })
      const data = await response.json()
      setSetupResult(data)
    } catch (error) {
      setSetupResult({ success: false, error: 'Failed to setup database' })
    } finally {
      setSettingUp(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const sqlSchema = `-- Posts table (simplified for cursor pagination)
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index to support ordering by created_at,id (keyset pagination)
CREATE INDEX IF NOT EXISTS idx_posts_created_at_id ON posts (created_at DESC, id DESC);

-- RPC function for cursor-based pagination (keyset pagination)
CREATE OR REPLACE FUNCTION public.fetch_posts_before(cursor_ts timestamptz, cursor_id uuid, page_size int)
RETURNS SETOF public.posts AS $$
  SELECT * FROM public.posts
  WHERE (created_at, id) < (cursor_ts, cursor_id)
  ORDER BY created_at DESC, id DESC
  LIMIT page_size;
$$ LANGUAGE sql STABLE;

-- Grant execute permission to anon role for client-side usage
GRANT EXECUTE ON FUNCTION public.fetch_posts_before(timestamptz, uuid, int) TO anon;

-- Insert sample posts for testing
INSERT INTO posts (title, body, published, created_at) VALUES
('Welcome to My Blog', 'This is my first blog post! I''m excited to share my thoughts on web development, blockchain, and AI technologies. Stay tuned for more content!', true, NOW() - INTERVAL '1 hour'),
('Next.js 15 Features', 'Next.js 15 brings amazing new features including improved performance, better developer experience, and enhanced security. Let me walk you through the key updates.', true, NOW() - INTERVAL '2 hours'),
('Building Scalable APIs', 'Creating APIs that can handle thousands of requests requires careful planning. Here are the best practices for robust and scalable API development.', true, NOW() - INTERVAL '3 hours'),
('Blockchain Development Guide', 'Blockchain technology is revolutionizing digital transactions. This comprehensive guide covers the fundamentals of blockchain and smart contract development.', true, NOW() - INTERVAL '4 hours'),
('AI Trends 2024', 'Artificial Intelligence continues to evolve rapidly. Let''s explore the most significant trends shaping the AI landscape this year.', true, NOW() - INTERVAL '5 hours');`

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Blog Database Setup
            </h1>
            <p className="text-xl text-gray-600">
              Set up your blog system with cursor-based pagination
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Database Test */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={testDatabase} 
                  disabled={testing}
                  className="w-full"
                >
                  {testing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    'Test Database Connection'
                  )}
                </Button>

                {testResult && (
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      {testResult.success ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      <span className="font-medium">
                        {testResult.success ? 'Database Ready' : 'Database Not Ready'}
                      </span>
                    </div>
                    
                    {testResult.success ? (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">
                          Posts table exists and is accessible
                        </p>
                        <Badge variant="outline" className="text-green-600">
                          {testResult.postCount} posts found
                        </Badge>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-red-600 mb-2">
                          {testResult.error}
                        </p>
                        <Badge variant="outline" className="text-red-600">
                          Setup Required
                        </Badge>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Database Setup */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Database Setup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={setupDatabase} 
                  disabled={settingUp}
                  className="w-full"
                >
                  {settingUp ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Setting up...
                    </>
                  ) : (
                    'Auto Setup Database'
                  )}
                </Button>

                {setupResult && (
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      {setupResult.success ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      <span className="font-medium">
                        {setupResult.success ? 'Setup Complete' : 'Setup Failed'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      {setupResult.message || setupResult.error}
                    </p>
                    
                    {setupResult.instructions && (
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-2">Manual Setup Required:</p>
                        <ol className="text-sm text-gray-600 space-y-1">
                          {setupResult.instructions.map((instruction: string, index: number) => (
                            <li key={index}>{instruction}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* SQL Schema */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  SQL Schema
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(sqlSchema)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy SQL
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Copy and paste this SQL into your Supabase SQL Editor to create the posts table and sample data:
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{sqlSchema}</code>
              </pre>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <Link href="/blog">
              <Button variant="outline">
                Go to Blog
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">
                Back to Homepage
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
