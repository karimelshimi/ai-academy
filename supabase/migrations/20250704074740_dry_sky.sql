/*
  # Sample Data for AI Learning Academy

  This migration adds sample data for testing and demonstration purposes.
*/

-- Insert sample courses (without instructor_id initially)
INSERT INTO courses (id, title, description, price, category, level, duration_hours, is_published) VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'أساسيات الذكاء الاصطناعي للمبتدئين',
    'تعلم أساسيات الذكاء الاصطناعي من الصفر، بما في ذلك المفاهيم الأساسية وأهم الأدوات المستخدمة في هذا المجال المثير.',
    49.99,
    'أساسيات الذكاء الاصطناعي',
    'beginner',
    12,
    true
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'تصميم الصور بالذكاء الاصطناعي',
    'اكتشف كيفية إنشاء صور مذهلة باستخدام أدوات الذكاء الاصطناعي مثل Midjourney و DALL-E وغيرها من الأدوات المتقدمة.',
    79.99,
    'التصميم والإبداع',
    'intermediate',
    18,
    true
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'إنشاء المحتوى التلقائي',
    'تعلم كيفية استخدام الذكاء الاصطناعي لإنشاء محتوى تلقائي عالي الجودة للمواقع والمدونات ووسائل التواصل الاجتماعي.',
    99.99,
    'إنتاج المحتوى',
    'advanced',
    25,
    true
  )
ON CONFLICT (id) DO NOTHING;

-- Insert sample lessons for first course
INSERT INTO lessons (course_id, title, description, order_index, duration_minutes, is_free) VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'مقدمة عن الذكاء الاصطناعي',
    'في هذا الدرس سنتعرف على مفهوم الذكاء الاصطناعي وتاريخه وأهميته في العصر الحديث.',
    1,
    45,
    true
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    'أنواع الذكاء الاصطناعي',
    'تعرف على الأنواع المختلفة للذكاء الاصطناعي وتطبيقاتها في الحياة العملية.',
    2,
    60,
    false
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    'أدوات الذكاء الاصطناعي الأساسية',
    'استكشف أهم الأدوات والمنصات المستخدمة في مجال الذكاء الاصطناعي.',
    3,
    75,
    false
  )
ON CONFLICT (id) DO NOTHING;

-- Insert sample lessons for second course
INSERT INTO lessons (course_id, title, description, order_index, duration_minutes, is_free) VALUES
  (
    '22222222-2222-2222-2222-222222222222',
    'مقدمة في تصميم الصور بالذكاء الاصطناعي',
    'تعرف على أساسيات تصميم الصور باستخدام الذكاء الاصطناعي.',
    1,
    40,
    true
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'استخدام Midjourney للتصميم',
    'تعلم كيفية استخدام Midjourney لإنشاء صور احترافية.',
    2,
    90,
    false
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'تقنيات متقدمة في DALL-E',
    'اكتشف التقنيات المتقدمة في استخدام DALL-E لإنشاء صور مبتكرة.',
    3,
    85,
    false
  )
ON CONFLICT (id) DO NOTHING;

-- Insert sample lessons for third course
INSERT INTO lessons (course_id, title, description, order_index, duration_minutes, is_free) VALUES
  (
    '33333333-3333-3333-3333-333333333333',
    'أساسيات إنتاج المحتوى التلقائي',
    'تعرف على المبادئ الأساسية لإنتاج المحتوى باستخدام الذكاء الاصطناعي.',
    1,
    50,
    true
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'استخدام ChatGPT لكتابة المحتوى',
    'تعلم كيفية استخدام ChatGPT بفعالية لإنشاء محتوى عالي الجودة.',
    2,
    80,
    false
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'أتمتة إنتاج المحتوى',
    'اكتشف كيفية أتمتة عملية إنتاج المحتوى لتوفير الوقت والجهد.',
    3,
    95,
    false
  )
ON CONFLICT (id) DO NOTHING;