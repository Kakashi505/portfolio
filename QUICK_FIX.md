# Quick Fix for Blog 500 Error

## 🚨 Issue: HTTP error! status: 500

The 500 error occurs because the `posts` table doesn't exist in your Supabase database yet.

## 🔧 Quick Fix Options

### Option 1: Use the Setup Page (Recommended)
1. Go to: `http://localhost:3000/setup`
2. Click "Test Database Connection" to confirm the issue
3. Click "Auto Setup Database" to try automatic setup
4. If auto-setup fails, follow the manual instructions shown

### Option 2: Manual Database Setup
1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy and paste this SQL:

```sql
-- Posts table (simplified for cursor pagination)
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
('AI Trends 2024', 'Artificial Intelligence continues to evolve rapidly. Let''s explore the most significant trends shaping the AI landscape this year.', true, NOW() - INTERVAL '5 hours');
```

4. Click **Run** to execute the SQL
5. Go back to `http://localhost:3000/blog` and refresh

### Option 3: Use the Setup Script
```bash
npm run setup-posts
```

## ✅ Verification

After setup, you should see:
- No more 500 errors
- Sample posts appearing in the "Latest Posts" tab
- Ability to create new posts via "Create New Post" button

## 🎯 Next Steps

Once the database is set up:
1. **Test Posting**: Go to `/blog/new` and create a test post
2. **View Posts**: Check `/blog` to see your posts with cursor pagination
3. **Daily Blogging**: Start posting daily content!

## 🆘 Still Having Issues?

1. Check your Supabase connection in `.env.local`
2. Verify the SQL executed successfully in Supabase dashboard
3. Check the browser console for any additional errors
4. Try the setup page at `/setup` for detailed diagnostics

---

**The blog system is ready - just needs the database table!** 🚀
