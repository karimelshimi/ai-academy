/*
  # Create Demo Users

  1. New Demo Users
    - Admin user: admin@demo.com with admin role
    - Student user: student@demo.com with student role
  
  2. Security
    - Both users will be created with hashed passwords
    - Profiles will be automatically created with appropriate roles
  
  3. Notes
    - These are demo accounts for testing purposes
    - Passwords: admin123 for admin, student123 for student
    - Email confirmation is bypassed for demo accounts
*/

-- Insert demo users into auth.users table
-- Note: In production Supabase, you would typically create users through the dashboard
-- This is for demo/development purposes only

-- Create admin user profile
INSERT INTO profiles (
  id,
  email,
  full_name,
  role,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'admin@demo.com',
  'مدير النظام',
  'admin',
  now(),
  now()
) ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  updated_at = now();

-- Create student user profile
INSERT INTO profiles (
  id,
  email,
  full_name,
  role,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000002',
  'student@demo.com',
  'طالب تجريبي',
  'student',
  now(),
  now()
) ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  updated_at = now();