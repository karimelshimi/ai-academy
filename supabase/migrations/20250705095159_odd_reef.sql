/*
  # Create Demo Users

  1. New Demo Users
    - Admin user: admin@demo.com with admin role
    - Student user: student@demo.com with student role
  
  2. Security
    - Both users will be created in the profiles table
    - Passwords will need to be set manually in Supabase Auth dashboard
  
  3. Notes
    - These are demo accounts for testing purposes
    - The actual authentication records need to be created in Supabase Auth dashboard
    - This migration only creates the profile records
*/

-- Insert demo admin user profile
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
) ON CONFLICT (email) DO NOTHING;

-- Insert demo student user profile  
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
) ON CONFLICT (email) DO NOTHING;