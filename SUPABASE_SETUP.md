# Supabase Configuration Guide

## Environment Variables Setup

Create a `.env.local` file in your project root with the following content:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://boqainjjrbzqshoglakb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvcWFpbmpqcmJ6cXNob2dsYWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyODk3NzUsImV4cCI6MjA3NDg2NTc3NX0.5AZ3mSgPABa4qsVpnxuMjaXDZvHyLInwoLVDh5zUuAs
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Email Configuration (Nodemailer) - Optional
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

## Steps to Complete Setup:

### 1. Create .env.local File
Create a file named `.env.local` in your project root directory and add the content above.

### 2. Get Service Role Key
1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: `boqainjjrbzqshoglakb`
3. Go to Settings → API
4. Copy the "service_role" key (not the anon key)
5. Replace `your_service_role_key_here` in the .env.local file

### 3. Set Up Database Schema
Run the SQL schema from `lib/db/schema.sql` in your Supabase SQL Editor:

1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste the contents of `lib/db/schema.sql`
3. Click "Run" to execute the schema

### 4. Initialize Database
After setting up the environment variables, run:

```bash
curl -X POST http://localhost:3000/api/setup
```

Or visit: `http://localhost:3000/api/setup` in your browser

### 5. Test the Setup
Start your development server:

```bash
npm run dev
```

Then test the blog functionality:
- Visit `http://localhost:3000/blog` to see the blog
- Visit `http://localhost:3000/api/blog` to test the API

## Security Notes:

- Never commit the `.env.local` file to version control
- The service role key has full database access - keep it secure
- Change the default admin credentials before going to production
- Use strong JWT secrets for production

## Troubleshooting:

### Common Issues:
1. **"supabaseUrl is required"** - Make sure NEXT_PUBLIC_SUPABASE_URL is set
2. **"Invalid API key"** - Verify your anon key is correct
3. **Database errors** - Ensure the schema has been run in Supabase
4. **CORS issues** - Check Supabase project settings

### Testing API Endpoints:
```bash
# Test blog posts
curl http://localhost:3000/api/blog

# Test categories
curl http://localhost:3000/api/blog/categories

# Test tags
curl http://localhost:3000/api/blog/tags
```

Your Supabase project is now configured and ready to use with the blog feature!
