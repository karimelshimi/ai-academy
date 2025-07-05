/*
  # Create Demo Accounts

  1. Demo Users
    - Admin user: admin@demo.com / password: admin123
    - Student user: student@demo.com / password: student123
  
  2. Security
    - These are demo accounts for testing purposes
    - Profiles are created with appropriate roles
    - Sample enrollments for the student account
*/

-- Insert demo admin user
-- Note: In production, you would use Supabase Auth API to create users
-- This is a simplified approach for demo purposes
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
)
SELECT 
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'admin@demo.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "مدير النظام"}',
  false,
  'authenticated'
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'admin@demo.com'
);

-- Insert demo student user
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
)
SELECT 
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'student@demo.com',
  crypt('student123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "طالب تجريبي"}',
  false,
  'authenticated'
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'student@demo.com'
);

-- Create profile for admin user
INSERT INTO profiles (id, email, full_name, role, created_at, updated_at)
SELECT 
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid,
  'admin@demo.com',
  'مدير النظام',
  'admin',
  now(),
  now()
WHERE NOT EXISTS (
  SELECT 1 FROM profiles WHERE id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid
);

-- Create profile for student user
INSERT INTO profiles (id, email, full_name, role, created_at, updated_at)
SELECT 
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid,
  'student@demo.com',
  'طالب تجريبي',
  'student',
  now(),
  now()
WHERE NOT EXISTS (
  SELECT 1 FROM profiles WHERE id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid
);

-- Update courses to have the admin as instructor
UPDATE courses 
SET instructor_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid
WHERE instructor_id IS NULL;

-- Create sample enrollments for the student
INSERT INTO enrollments (user_id, course_id, progress, enrolled_at)
SELECT * FROM (VALUES
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid,
    '11111111-1111-1111-1111-111111111111'::uuid,
    75.0::numeric(5,2),
    now() - interval '10 days'
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid,
    '22222222-2222-2222-2222-222222222222'::uuid,
    30.0::numeric(5,2),
    now() - interval '5 days'
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid,
    '33333333-3333-3333-3333-333333333333'::uuid,
    100.0::numeric(5,2),
    now() - interval '15 days'
  )
) AS new_enrollments(user_id, course_id, progress, enrolled_at)
WHERE NOT EXISTS (
  SELECT 1 FROM enrollments 
  WHERE enrollments.user_id = new_enrollments.user_id 
  AND enrollments.course_id = new_enrollments.course_id
);

-- Create sample progress records for the student
INSERT INTO progress (user_id, lesson_id, completed, completed_at, watch_time_seconds)
SELECT 
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid,
  l.id,
  CASE 
    WHEN l.course_id = '11111111-1111-1111-1111-111111111111'::uuid AND l.order_index <= 2 THEN true
    WHEN l.course_id = '22222222-2222-2222-2222-222222222222'::uuid AND l.order_index = 1 THEN true
    WHEN l.course_id = '33333333-3333-3333-3333-333333333333'::uuid THEN true
    ELSE false
  END,
  CASE 
    WHEN l.course_id = '11111111-1111-1111-1111-111111111111'::uuid AND l.order_index <= 2 THEN now() - interval '8 days'
    WHEN l.course_id = '22222222-2222-2222-2222-222222222222'::uuid AND l.order_index = 1 THEN now() - interval '3 days'
    WHEN l.course_id = '33333333-3333-3333-3333-333333333333'::uuid THEN now() - interval '12 days'
    ELSE null
  END,
  l.duration_minutes * 60
FROM lessons l
WHERE NOT EXISTS (
  SELECT 1 FROM progress p 
  WHERE p.user_id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid 
  AND p.lesson_id = l.id
);

-- Create sample reviews from the student
INSERT INTO reviews (user_id, course_id, rating, comment, created_at)
SELECT * FROM (VALUES
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid,
    '33333333-3333-3333-3333-333333333333'::uuid,
    5,
    'كورس ممتاز! استفدت منه كثيراً في تعلم إنتاج المحتوى بالذكاء الاصطناعي. الشرح واضح والأمثلة عملية.',
    now() - interval '12 days'
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid,
    '11111111-1111-1111-1111-111111111111'::uuid,
    4,
    'كورس جيد للمبتدئين، يغطي الأساسيات بشكل مفهوم.',
    now() - interval '5 days'
  )
) AS new_reviews(user_id, course_id, rating, comment, created_at)
WHERE NOT EXISTS (
  SELECT 1 FROM reviews 
  WHERE reviews.user_id = new_reviews.user_id 
  AND reviews.course_id = new_reviews.course_id
);