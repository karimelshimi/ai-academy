/*
  # Create Demo Users

  1. Demo Users
    - Creates admin and student demo user profiles
    - Handles existing users gracefully with ON CONFLICT
    - Uses both id and email constraints for proper conflict resolution

  2. Security
    - Maintains existing RLS policies
    - No changes to authentication system
*/

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
) ON CONFLICT (email) DO UPDATE SET
  id = EXCLUDED.id,
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
) ON CONFLICT (email) DO UPDATE SET
  id = EXCLUDED.id,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  updated_at = now();