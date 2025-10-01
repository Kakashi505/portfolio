-- Portfolio Database Schema for Supabase

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tech TEXT[] NOT NULL,
    year VARCHAR(10) NOT NULL,
    image TEXT NOT NULL,
    website TEXT,
    github TEXT,
    role VARCHAR(100),
    skills TEXT[],
    category VARCHAR(20) NOT NULL CHECK (category IN ('full-stack', 'blockchain', 'ai')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certifications table
CREATE TABLE IF NOT EXISTS certifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    date_issued DATE NOT NULL,
    credential_id VARCHAR(255),
    credential_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Posts table (simplified for cursor pagination)
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts table (legacy - keeping for compatibility)
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    tags TEXT[],
    category VARCHAR(100),
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMP WITH TIME ZONE,
    author_id UUID REFERENCES admin_users(id),
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_certifications_issuer ON certifications(issuer);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

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

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON certifications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO projects (title, description, tech, year, image, website, github, role, skills, category) VALUES
('E-Commerce Platform', 'Full-featured e-commerce platform with React, Node.js, MongoDB, and Stripe integration', 
 ARRAY['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'], '2024', 
 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
 'https://ecommerceparadise.com', 'https://github.com/Micklitodev/Paradise-Ecom', 'Full-Stack Developer',
 ARRAY['E-commerce', 'Payment Gateway', 'User Authentication', 'Database Management'], 'full-stack'),

('DeFi Trading Platform', 'Decentralized finance platform built on Solana blockchain with automated trading strategies',
 ARRAY['Solana', 'Rust', 'React', 'Web3.js', 'Anchor'], '2024',
 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600',
 'https://defitrading.com', 'https://github.com/Micklitodev/DeFi-Trading', 'Blockchain Developer',
 ARRAY['Smart Contracts', 'DeFi', 'Automated Trading', 'Solana Development'], 'blockchain'),

('AI-Powered Translation Website', 'Multilingual web platform with real-time AI translation supporting 50+ languages',
 ARRAY['Next.js', 'OpenAI API', 'React', 'TypeScript', 'Tailwind CSS'], '2024',
 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
 'https://aitranslate.com', 'https://github.com/Micklitodev/AI-Translate', 'AI Developer',
 ARRAY['Natural Language Processing', 'Machine Learning', 'Real-time Translation', 'API Integration'], 'ai');

INSERT INTO certifications (title, description, image, issuer, date_issued, credential_id) VALUES
('Angular Developer Certification', 'Professional certification in Angular framework development', '/Angular.png', 'Google', '2024-01-15', 'ANG-2024-001'),
('Python Programming Certification', 'Advanced Python programming and data science certification', '/Python.png', 'Python Institute', '2024-02-20', 'PYT-2024-002'),
('React Developer Certification', 'Modern React development with hooks and advanced patterns', '/React.png', 'Meta', '2024-03-10', 'REA-2024-003'),
('Software Engineering Certification', 'Comprehensive software engineering and system design certification', '/Software.png', 'IEEE', '2024-04-05', 'SWE-2024-004');

-- Insert sample blog posts
-- Insert sample posts for cursor pagination testing
INSERT INTO posts (title, body, published, created_at) VALUES
('Welcome to My Blog', 'This is my first blog post! I''m excited to share my thoughts on web development, blockchain, and AI technologies. Stay tuned for more content!', true, NOW() - INTERVAL '1 hour'),
('Next.js 15 Features', 'Next.js 15 brings amazing new features including improved performance, better developer experience, and enhanced security. Let me walk you through the key updates.', true, NOW() - INTERVAL '2 hours'),
('Building Scalable APIs', 'Creating APIs that can handle thousands of requests requires careful planning. Here are the best practices for robust and scalable API development.', true, NOW() - INTERVAL '3 hours'),
('Blockchain Development Guide', 'Blockchain technology is revolutionizing digital transactions. This comprehensive guide covers the fundamentals of blockchain and smart contract development.', true, NOW() - INTERVAL '4 hours'),
('AI Trends 2024', 'Artificial Intelligence continues to evolve rapidly. Let''s explore the most significant trends shaping the AI landscape this year.', true, NOW() - INTERVAL '5 hours'),
('React Best Practices', 'React development has evolved significantly. Here are the modern patterns and best practices every React developer should know.', true, NOW() - INTERVAL '6 hours'),
('Database Optimization', 'Database performance is crucial for application success. Learn the essential techniques for optimizing your database queries.', true, NOW() - INTERVAL '7 hours'),
('Web Security Essentials', 'Security should be a top priority in web development. Here are the essential security practices every developer should implement.', true, NOW() - INTERVAL '8 hours'),
('TypeScript Advanced Patterns', 'TypeScript offers powerful features for building robust applications. Let''s explore advanced patterns and techniques.', true, NOW() - INTERVAL '9 hours'),
('DeFi Development', 'Decentralized Finance is transforming traditional financial services. Learn how to build DeFi applications on blockchain platforms.', true, NOW() - INTERVAL '10 hours');

INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, tags, category, status, published_at) VALUES
('Getting Started with Next.js 15', 'getting-started-nextjs-15', 'Learn the latest features and improvements in Next.js 15', 'Next.js 15 brings exciting new features including improved performance, better developer experience, and enhanced security. In this comprehensive guide, we''ll explore the key updates and how to migrate your existing applications...', 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['Next.js', 'React', 'Web Development', 'Tutorial'], 'Web Development', 'published', NOW() - INTERVAL '1 day'),

('Building Scalable APIs with Node.js', 'building-scalable-apis-nodejs', 'Best practices for creating robust and scalable APIs', 'Creating APIs that can handle thousands of requests per second requires careful planning and implementation. In this article, we''ll cover essential patterns, middleware, error handling, and performance optimization techniques...', 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['Node.js', 'API', 'Backend', 'Performance'], 'Backend Development', 'published', NOW() - INTERVAL '2 days'),

('Introduction to Blockchain Development', 'introduction-blockchain-development', 'A beginner''s guide to blockchain and smart contract development', 'Blockchain technology is revolutionizing how we think about digital transactions and decentralized applications. This comprehensive guide covers the fundamentals of blockchain, smart contracts, and how to get started with development...', 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['Blockchain', 'Smart Contracts', 'Web3', 'Cryptocurrency'], 'Blockchain', 'published', NOW() - INTERVAL '3 days'),

('AI and Machine Learning Trends 2024', 'ai-ml-trends-2024', 'Exploring the latest trends and innovations in AI and ML', 'Artificial Intelligence continues to evolve rapidly, with new breakthroughs happening regularly. In this article, we explore the most significant trends shaping the AI landscape in 2024, from large language models to computer vision...', 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['AI', 'Machine Learning', 'Technology', 'Innovation'], 'Artificial Intelligence', 'published', NOW() - INTERVAL '4 days');
