# Portfolio Backend Setup Guide

This guide will help you set up the complete backend for your portfolio website.

## 🚀 Quick Start

### 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Email Configuration (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_here

# JWT Secret for Admin Authentication
JWT_SECRET=your_jwt_secret_here

# Admin Credentials (for initial setup)
ADMIN_EMAIL=admin@kashima.dev
ADMIN_PASSWORD=your_admin_password_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Supabase Setup

1. **Create a Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Get your project URL and API keys

2. **Run the Database Schema:**
   - Copy the contents of `lib/db/schema.sql`
   - Go to your Supabase dashboard → SQL Editor
   - Paste and run the schema

3. **Update Environment Variables:**
   - Replace the Supabase URLs and keys in your `.env.local`

### 3. Email Setup (Optional)

For contact form email notifications:

1. **Gmail Setup:**
   - Enable 2-factor authentication
   - Generate an App Password
   - Use the App Password in `SMTP_PASS`

2. **Other Email Providers:**
   - Update `SMTP_HOST` and `SMTP_PORT` accordingly
   - Use your provider's credentials

### 4. Initialize Database

Run the setup endpoint to create sample data:

```bash
curl -X POST http://localhost:3000/api/setup
```

Or visit: `http://localhost:3000/api/setup` in your browser

## 📁 API Endpoints

### Public Endpoints

- `GET /api/projects` - Get all projects
- `GET /api/projects?category=full-stack` - Get projects by category
- `GET /api/projects/[id]` - Get specific project
- `GET /api/certifications` - Get all certifications
- `POST /api/contact` - Send contact message

### Admin Endpoints (Requires Authentication)

- `POST /api/auth/login` - Admin login
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/contact-messages` - Get contact messages
- `POST /api/projects` - Create project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

## 🔐 Admin Authentication

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@kashima.dev","password":"your_password"}'
```

### Using Admin Token
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:3000/api/admin/dashboard
```

## 🗄️ Database Schema

### Tables Created:
- `projects` - Portfolio projects
- `certifications` - Professional certifications
- `contact_messages` - Contact form submissions
- `admin_users` - Admin user accounts

### Features:
- Automatic timestamps (`created_at`, `updated_at`)
- UUID primary keys
- Array fields for tech stacks and skills
- Status tracking for contact messages
- Role-based admin access

## 🎨 Frontend Integration

### Contact Form
The contact form component is ready to use:
```tsx
import ContactForm from '@/components/ContactForm'

// Use in your page
<ContactForm />
```

### Admin Dashboard
Access the admin dashboard at `/admin` (you'll need to create this route):
```tsx
import AdminDashboard from '@/components/AdminDashboard'

// Use in your admin page
<AdminDashboard />
```

## 🔧 Development

### Running the Backend
```bash
npm run dev
```

### Testing Endpoints
```bash
# Test projects endpoint
curl http://localhost:3000/api/projects

# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","subject":"Test","message":"Hello!"}'
```

## 📊 Features Included

✅ **Complete CRUD API** for projects and certifications  
✅ **Contact form** with email notifications  
✅ **Admin authentication** with JWT tokens  
✅ **Admin dashboard** with statistics  
✅ **Database setup** with sample data  
✅ **Email integration** with Nodemailer  
✅ **TypeScript support** throughout  
✅ **Error handling** and validation  
✅ **Responsive design** for admin interface  

## 🚨 Security Notes

- Change default admin credentials
- Use strong JWT secrets
- Enable HTTPS in production
- Validate all inputs
- Use environment variables for secrets
- Implement rate limiting for production

## 📝 Next Steps

1. Set up your Supabase project
2. Configure environment variables
3. Run the database setup
4. Test the API endpoints
5. Integrate with your frontend
6. Deploy to production

Your portfolio backend is now complete and ready to use! 🎉
