import { notFound } from 'next/navigation'
import BlogPost from '@/components/BlogPost'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  // Fetch the post to check if it exists
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/blog/${slug}`, {
      cache: 'no-store' // Ensure fresh data
    })
    
    if (!response.ok) {
      notFound()
    }
  } catch (error) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <BlogPost slug={slug} />
    </div>
  )
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/blog/${slug}`)
    
    if (response.ok) {
      const data = await response.json()
      const post = data.post
      
      return {
        title: `${post.title} | Kashima Hideyuki Blog`,
        description: post.excerpt || `Read ${post.title} on Kashima Hideyuki's blog`,
        openGraph: {
          title: post.title,
          description: post.excerpt || `Read ${post.title} on Kashima Hideyuki's blog`,
          images: post.featured_image ? [post.featured_image] : [],
          type: 'article',
          publishedTime: post.published_at,
          authors: ['Kashima Hideyuki'],
          tags: post.tags || []
        },
        twitter: {
          card: 'summary_large_image',
          title: post.title,
          description: post.excerpt || `Read ${post.title} on Kashima Hideyuki's blog`,
          images: post.featured_image ? [post.featured_image] : []
        }
      }
    }
  } catch (error) {
    // Fallback metadata
  }
  
  return {
    title: 'Blog Post | Kashima Hideyuki',
    description: 'Read the latest blog post from Kashima Hideyuki'
  }
}
