import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCourse } from '../contexts/CourseContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  CheckCircle,
  Lock
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  content: string | null;
  order_index: number;
  duration_minutes: number;
  is_free: boolean;
  created_at: string;
  updated_at: string;
}

interface Review {
  id: string;
  user_id: string;
  course_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  user: {
    full_name: string;
    avatar_url: string | null;
  };
}

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { fetchCourseById, fetchCourseLessons, enrollInCourse, isEnrolled } = useCourse();
  
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    if (id) {
      loadCourseData();
    }
  }, [id]);

  const loadCourseData = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const courseData = await fetchCourseById(id);
      if (courseData) {
        setCourse(courseData);
        const lessonsData = await fetchCourseLessons(id);
        setLessons(lessonsData);
        // Load reviews (mock data for now)
        setReviews([
          {
            id: '1',
            user_id: '1',
            course_id: id,
            rating: 5,
            comment: 'كورس ممتاز ومفيد جداً، الشرح واضح والأمثلة عملية',
            created_at: '2024-01-15',
            user: {
              full_name: 'أحمد محمد',
              avatar_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100'
            }
          },
          {
            id: '2',
            user_id: '2',
            course_id: id,
            rating: 4,
            comment: 'محتوى قيم ومنظم بشكل جيد',
            created_at: '2024-01-10',
            user: {
              full_name: 'فاطمة علي',
              avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
            }
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading course data:', error);
      toast.error('خطأ في تحميل بيانات الكورس');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!id) return;
    await enrollInCourse(id);
  };

  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.is_free || isEnrolled(course?.id)) {
      setSelectedLesson(lesson);
    } else {
      toast.error('يجب التسجيل في الكورس أولاً');
    }
  };

  const submitReview = async () => {
    if (!user || !course) {
      toast.error('يجب تسجيل الدخول أولاً');
      return;
    }

    if (!newReview.comment.trim()) {
      toast.error('يرجى كتابة تعليق');
      return;
    }

    // Mock submission - in real app, this would call Supabase
    const review: Review = {
      id: Date.now().toString(),
      user_id: user.id,
      course_id: course.id,
      rating: newReview.rating,
      comment: newReview.comment,
      created_at: new Date().toISOString(),
      user: {
        full_name: user.user_metadata?.full_name || 'مستخدم',
        avatar_url: null
      }
    };

    setReviews(prev => [review, ...prev]);
    setNewReview({ rating: 5, comment: '' });
    toast.success('تم إضافة التقييم بنجاح');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">الكورس غير موجود</h2>
          <Link to="/courses" className="btn-primary">
            العودة للكورسات
          </Link>
        </div>
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Course Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
        >
          <div className="lg:col-span-2">
            <div className="mb-4">
              <span className="text-indigo-400 font-medium">{course.category}</span>
              <span className="mx-2">•</span>
              <span className="text-slate-400">
                {course.level === 'beginner' ? 'مبتدئ' : course.level === 'intermediate' ? 'متوسط' : 'متقدم'}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl text-slate-400 mb-6">{course.description}</p>
            
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-bold">{course.average_rating?.toFixed(1) || '0.0'}</span>
                <span className="text-slate-400">({reviews.length} تقييم)</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Users className="w-5 h-5 text-slate-400" />
                <span>{course.enrolled_count} طالب</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Clock className="w-5 h-5 text-slate-400" />
                <span>{course.duration_hours} ساعة</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <BookOpen className="w-5 h-5 text-slate-400" />
                <span>{lessons.length} درس</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <img
                src={course.instructor?.avatar_url || `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100`}
                alt={course.instructor?.full_name || 'Instructor'}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-bold">{course.instructor?.full_name || 'المدرب'}</p>
                <p className="text-slate-400 text-sm">مدرب معتمد</p>
              </div>
            </div>
          </div>

          {/* Course Card */}
          <div className="card">
            <img
              src={course.thumbnail_url || `https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600`}
              alt={course.title}
              className="w-full h-48 object-cover rounded-lg mb-6"
            />
            
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-indigo-400 mb-2">
                ${course.price}
              </div>
              <p className="text-slate-400">دفعة واحدة</p>
            </div>

            {enrolled ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 space-x-reverse text-green-400 mb-4">
                  <CheckCircle className="w-5 h-5" />
                  <span>مسجل في الكورس</span>
                </div>
                <button
                  onClick={() => setActiveTab('lessons')}
                  className="btn-primary w-full"
                >
                  بدء التعلم
                </button>
              </div>
            ) : (
              <button
                onClick={handleEnroll}
                className="btn-primary w-full mb-4"
              >
                التسجيل في الكورس
              </button>
            )}

            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 space-x-reverse">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>وصول مدى الحياة</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>شهادة إتمام</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>دعم مباشر</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>مشاريع عملية</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex space-x-8 space-x-reverse border-b border-slate-700">
            {[
              { id: 'overview', label: 'نظرة عامة' },
              { id: 'lessons', label: 'الدروس' },
              { id: 'reviews', label: 'التقييمات' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-indigo-400 border-b-2 border-indigo-400'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="card mb-8">
                  <h2 className="text-2xl font-bold mb-4">ماذا ستتعلم؟</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'أساسيات الذكاء الاصطناعي',
                      'أدوات التصميم بالذكاء الاصطناعي',
                      'إنشاء المحتوى التلقائي',
                      'استراتيجيات الربح',
                      'مشاريع عملية متقدمة',
                      'أحدث التقنيات والأدوات'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 space-x-reverse">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <h2 className="text-2xl font-bold mb-4">متطلبات الكورس</h2>
                  <ul className="space-y-2 text-slate-400">
                    <li>• لا توجد خبرة مسبقة مطلوبة</li>
                    <li>• جهاز كمبيوتر أو هاتف ذكي</li>
                    <li>• اتصال بالإنترنت</li>
                    <li>• الرغبة في التعلم والتطبيق</li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="card">
                  <h3 className="text-xl font-bold mb-4">إحصائيات الكورس</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">المستوى</span>
                      <span className="font-medium">
                        {course.level === 'beginner' ? 'مبتدئ' : course.level === 'intermediate' ? 'متوسط' : 'متقدم'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">المدة</span>
                      <span className="font-medium">{course.duration_hours} ساعة</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">عدد الدروس</span>
                      <span className="font-medium">{lessons.length} درس</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">الطلاب</span>
                      <span className="font-medium">{course.enrolled_count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">التقييم</span>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{course.average_rating?.toFixed(1) || '0.0'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'lessons' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {selectedLesson ? (
                  <div className="card">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">{selectedLesson.title}</h2>
                      <button
                        onClick={() => setSelectedLesson(null)}
                        className="text-slate-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    
                    {selectedLesson.video_url ? (
                      <div className="aspect-video bg-slate-800 rounded-lg mb-4 flex items-center justify-center">
                        <Play className="w-16 h-16 text-indigo-400" />
                      </div>
                    ) : (
                      <div className="aspect-video bg-slate-800 rounded-lg mb-4 flex items-center justify-center">
                        <div className="text-center">
                          <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-2" />
                          <p className="text-slate-400">محتوى نصي</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="prose prose-invert max-w-none">
                      <p>{selectedLesson.description || 'وصف الدرس غير متوفر'}</p>
                      {selectedLesson.content && (
                        <div dangerouslySetInnerHTML={{ __html: selectedLesson.content }} />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="card text-center py-12">
                    <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">اختر درساً للمشاهدة</h3>
                    <p className="text-slate-400">انقر على أي درس من القائمة لبدء التعلم</p>
                  </div>
                )}
              </div>

              <div>
                <div className="card">
                  <h3 className="text-xl font-bold mb-4">محتوى الكورس</h3>
                  <div className="space-y-2">
                    {lessons.map((lesson, index) => (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonClick(lesson)}
                        className={`w-full text-right p-3 rounded-lg transition-colors ${
                          selectedLesson?.id === lesson.id
                            ? 'bg-indigo-600 text-white'
                            : 'hover:bg-slate-700/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            {lesson.is_free || enrolled ? (
                              <Play className="w-4 h-4 text-green-400" />
                            ) : (
                              <Lock className="w-4 h-4 text-slate-400" />
                            )}
                            <span className="text-sm font-medium">
                              {index + 1}. {lesson.title}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse text-xs text-slate-400">
                            <Clock className="w-3 h-3" />
                            <span>{lesson.duration_minutes} دقيقة</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="card">
                      <div className="flex items-start space-x-4 space-x-reverse">
                        <img
                          src={review.user.avatar_url || `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100`}
                          alt={review.user.full_name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold">{review.user.full_name}</h4>
                            <div className="flex items-center space-x-1 space-x-reverse">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-slate-400'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-slate-400 mb-2">{review.comment}</p>
                          <p className="text-xs text-slate-500">
                            {new Date(review.created_at).toLocaleDateString('ar-EG')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {user && enrolled && (
                  <div className="card">
                    <h3 className="text-xl font-bold mb-4">أضف تقييمك</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">التقييم</label>
                        <div className="flex space-x-1 space-x-reverse">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                              className={`p-1 ${
                                rating <= newReview.rating ? 'text-yellow-400' : 'text-slate-400'
                              }`}
                            >
                              <Star className="w-6 h-6 fill-current" />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">التعليق</label>
                        <textarea
                          value={newReview.comment}
                          onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                          className="input-field h-24 resize-none"
                          placeholder="شاركنا رأيك في الكورس..."
                        />
                      </div>
                      <button
                        onClick={submitReview}
                        className="btn-primary w-full"
                      >
                        إضافة التقييم
                      </button>
                    </div>
                  </div>
                )}

                <div className="card">
                  <h3 className="text-xl font-bold mb-4">ملخص التقييمات</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold">{course.average_rating?.toFixed(1) || '0.0'}</span>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.round(course.average_rating || 0) ? 'text-yellow-400 fill-current' : 'text-slate-400'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-400">{reviews.length} تقييم</p>
                    
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = reviews.filter(r => r.rating === rating).length;
                      const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                      
                      return (
                        <div key={rating} className="flex items-center space-x-3 space-x-reverse">
                          <span className="text-sm w-8">{rating}</span>
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <div className="flex-1 bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-slate-400 w-8">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CourseDetail;