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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_certifications_issuer ON certifications(issuer);

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
