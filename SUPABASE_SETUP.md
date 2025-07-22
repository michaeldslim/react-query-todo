# Supabase Setup Guide

This guide will help you set up Supabase as the backend for your React Query Todo app.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `react-query-todo`
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to you
6. Click "Create new project"

## 2. Create the Todos Table

Once your project is created, go to the SQL Editor and run this SQL:

```sql
-- Create the todos table
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now
-- In production, you'd want more restrictive policies
CREATE POLICY "Allow all operations on todos" ON todos
  FOR ALL USING (true);
```

## 3. Get Your Project Credentials

1. Go to **Settings** → **API**
2. Copy your **Project URL** and **anon public** key

## 4. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## 5. Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open the app and try creating a todo
3. Check your Supabase dashboard to see if the data appears in the `todos` table

## 6. Optional: Initialize Sample Data

The app includes a method to automatically add sample todos if the table is empty. This will run automatically when you first load the app.

## Database Schema

```sql
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Features Enabled

- ✅ Real-time database operations
- ✅ Automatic UUID generation
- ✅ Timestamp tracking
- ✅ Error handling
- ✅ TypeScript support
- ✅ React Query integration

## Troubleshooting

### Common Issues:

1. **"Invalid API key"**: Make sure your environment variables are correct
2. **"Table doesn't exist"**: Run the SQL commands in the Supabase SQL Editor
3. **"RLS policy"**: Ensure Row Level Security policies are set up correctly

### Debug Tips:

- Check the browser console for error messages
- Verify your `.env.local` file is in the project root
- Make sure to restart the dev server after changing environment variables
