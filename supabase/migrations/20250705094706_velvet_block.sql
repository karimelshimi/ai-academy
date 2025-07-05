/*
  # Sample Data Migration

  1. Sample Data
    - Insert sample courses with proper conflict handling
    - Insert sample lessons for each course
    - Use proper unique constraints for conflict resolution

  2. Notes
    - Uses INSERT with proper conflict resolution
    - Ensures data consistency
    - Handles existing data gracefully
*/

-- Insert sample courses (without instructor_id initially)
INSERT INTO courses (id, title, description, price, category, level, duration_hours, is_published) 
SELECT * FROM (VALUES
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    'أساسيات الذكاء الاصطناعي للمبتدئين',
    'تعلم أساسيات الذكاء الاصطناعي من الصفر، بما في ذلك المفاهيم الأساسية وأهم الأدوات المستخدمة في هذا المجال المثير.',
    49.99::numeric(10,2),
    'أساسيات الذكاء الاصطناعي',
    'beginner'::text,
    12,
    true
  ),
  (
    '22222222-2222-2222-2222-222222222222'::uuid,
    'تصميم الصور بالذكاء الاصطناعي',
    'اكتشف كيفية إنشاء صور مذهلة باستخدام أدوات الذكاء الاصطناعي مثل Midjourney و DALL-E وغيرها من الأدوات المتقدمة.',
    79.99::numeric(10,2),
    'التصميم والإبداع',
    'intermediate'::text,
    18,
    true
  ),
  (
    '33333333-3333-3333-3333-333333333333'::uuid,
    'إنشاء المحتوى التلقائي',
    'تعلم كيفية استخدام الذكاء الاصطناعي لإنشاء محتوى تلقائي عالي الجودة للمواقع والمدونات ووسائل التواصل الاجتماعي.',
    99.99::numeric(10,2),
    'إنتاج المحتوى',
    'advanced'::text,
    25,
    true
  )
) AS new_courses(id, title, description, price, category, level, duration_hours, is_published)
WHERE NOT EXISTS (
  SELECT 1 FROM courses WHERE courses.id = new_courses.id
);

-- Insert sample lessons for first course
INSERT INTO lessons (course_id, title, description, order_index, duration_minutes, is_free)
SELECT * FROM (VALUES
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    'مقدمة عن الذكاء الاصطناعي',
    'في هذا الدرس سنتعرف على مفهوم الذكاء الاصطناعي وتاريخه وأهميته في العصر الحديث.',
    1,
    45,
    true
  ),
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    'أنواع الذكاء الاصطناعي',
    'تعرف على الأنواع المختلفة للذكاء الاصطناعي وتطبيقاتها في الحياة العملية.',
    2,
    60,
    false
  ),
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    'أدوات الذكاء الاصطناعي الأساسية',
    'استكشف أهم الأدوات والمنصات المستخدمة في مجال الذكاء الاصطناعي.',
    3,
    75,
    false
  )
) AS new_lessons(course_id, title, description, order_index, duration_minutes, is_free)
WHERE NOT EXISTS (
  SELECT 1 FROM lessons 
  WHERE lessons.course_id = new_lessons.course_id 
  AND lessons.order_index = new_lessons.order_index
);

-- Insert sample lessons for second course
INSERT INTO lessons (course_id, title, description, order_index, duration_minutes, is_free)
SELECT * FROM (VALUES
  (
    '22222222-2222-2222-2222-222222222222'::uuid,
    'مقدمة في تصميم الصور بالذكاء الاصطناعي',
    'تعرف على أساسيات تصميم الصور باستخدام الذكاء الاصطناعي.',
    1,
    40,
    true
  ),
  (
    '22222222-2222-2222-2222-222222222222'::uuid,
    'استخدام Midjourney للتصميم',
    'تعلم كيفية استخدام Midjourney لإنشاء صور احترافية.',
    2,
    90,
    false
  ),
  (
    '22222222-2222-2222-2222-222222222222'::uuid,
    'تقنيات متقدمة في DALL-E',
    'اكتشف التقنيات المتقدمة في استخدام DALL-E لإنشاء صور مبتكرة.',
    3,
    85,
    false
  )
) AS new_lessons(course_id, title, description, order_index, duration_minutes, is_free)
WHERE NOT EXISTS (
  SELECT 1 FROM lessons 
  WHERE lessons.course_id = new_lessons.course_id 
  AND lessons.order_index = new_lessons.order_index
);

-- Insert sample lessons for third course
INSERT INTO lessons (course_id, title, description, order_index, duration_minutes, is_free)
SELECT * FROM (VALUES
  (
    '33333333-3333-3333-3333-333333333333'::uuid,
    'أساسيات إنتاج المحتوى التلقائي',
    'تعرف على المبادئ الأساسية لإنتاج المحتوى باستخدام الذكاء الاصطناعي.',
    1,
    50,
    true
  ),
  (
    '33333333-3333-3333-3333-333333333333'::uuid,
    'استخدام ChatGPT لكتابة المحتوى',
    'تعلم كيفية استخدام ChatGPT بفعالية لإنشاء محتوى عالي الجودة.',
    2,
    80,
    false
  ),
  (
    '33333333-3333-3333-3333-333333333333'::uuid,
    'أتمتة إنتاج المحتوى',
    'اكتشف كيفية أتمتة عملية إنتاج المحتوى لتوفير الوقت والجهد.',
    3,
    95,
    false
  )
) AS new_lessons(course_id, title, description, order_index, duration_minutes, is_free)
WHERE NOT EXISTS (
  SELECT 1 FROM lessons 
  WHERE lessons.course_id = new_lessons.course_id 
  AND lessons.order_index = new_lessons.order_index
);