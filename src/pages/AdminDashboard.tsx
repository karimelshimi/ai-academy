import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  level: string;
  duration_hours: number;
  is_published: boolean;
  created_at: string;
  enrolled_count?: number;
  average_rating?: number;
}

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [courses, setCourses] = useState<Course[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalRevenue: 0,
    totalEnrollments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    price: 0,
    category: '',
    level: 'beginner',
    duration_hours: 0,
    is_published: false,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch courses
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (coursesError) throw coursesError;

      // Fetch users
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;

      // Fetch enrollments for stats
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select('*');

      if (enrollmentsError) throw enrollmentsError;

      // Calculate stats
      const totalUsers = usersData?.length || 0;
      const totalCourses = coursesData?.length || 0;
      const totalEnrollments = enrollmentsData?.length || 0;
      const totalRevenue = enrollmentsData?.reduce((sum, enrollment) => {
        const course = coursesData?.find(c => c.id === enrollment.course_id);
        return sum + (course?.price || 0);
      }, 0) || 0;

      // Add enrollment count to courses
      const coursesWithStats = coursesData?.map(course => ({
        ...course,
        enrolled_count: enrollmentsData?.filter(e => e.course_id === course.id).length || 0,
      })) || [];

      setCourses(coursesWithStats);
      setUsers(usersData || []);
      setStats({
        totalUsers,
        totalCourses,
        totalRevenue,
        totalEnrollments,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('خطأ في تحميل بيانات لوحة التحكم');
    } finally {
      setLoading(false);
    }
  };

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingCourse) {
        // Update existing course
        const { error } = await supabase
          .from('courses')
          .update({
            ...courseForm,
            instructor_id: profile?.id,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingCourse.id);

        if (error) throw error;
        toast.success('تم تحديث الكورس بنجاح');
      } else {
        // Create new course
        const { error } = await supabase
          .from('courses')
          .insert([{
            ...courseForm,
            instructor_id: profile?.id,
          }]);

        if (error) throw error;
        toast.success('تم إنشاء الكورس بنجاح');
      }

      setShowCourseModal(false);
      setEditingCourse(null);
      setCourseForm({
        title: '',
        description: '',
        price: 0,
        category: '',
        level: 'beginner',
        duration_hours: 0,
        is_published: false,
      });
      fetchDashboardData();
    } catch (error: any) {
      console.error('Error saving course:', error);
      toast.error(error.message || 'خطأ في حفظ الكورس');
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الكورس؟')) return;

    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId);

      if (error) throw error;
      toast.success('تم حذف الكورس بنجاح');
      fetchDashboardData();
    } catch (error: any) {
      console.error('Error deleting course:', error);
      toast.error(error.message || 'خطأ في حذف الكورس');
    }
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      price: course.price,
      category: course.category,
      level: course.level,
      duration_hours: course.duration_hours,
      is_published: course.is_published,
    });
    setShowCourseModal(true);
  };

  const toggleCoursePublish = async (courseId: string, isPublished: boolean) => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({ is_published: !isPublished })
        .eq('id', courseId);

      if (error) throw error;
      toast.success(`تم ${!isPublished ? 'نشر' : 'إخفاء'} الكورس بنجاح`);
      fetchDashboardData();
    } catch (error: any) {
      console.error('Error toggling course publish:', error);
      toast.error(error.message || 'خطأ في تحديث حالة النشر');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            لوحة تحكم <span className="hero-gradient-text">الإدارة</span>
          </h1>
          <p className="text-xl text-slate-400">
            إدارة الكورسات والمستخدمين ومتابعة الإحصائيات
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card text-center"
          >
            <Users className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-1">{stats.totalUsers}</h3>
            <p className="text-slate-400">إجمالي المستخدمين</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card text-center"
          >
            <BookOpen className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-1">{stats.totalCourses}</h3>
            <p className="text-slate-400">إجمالي الكورسات</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card text-center"
          >
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-1">{stats.totalEnrollments}</h3>
            <p className="text-slate-400">إجمالي التسجيلات</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card text-center"
          >
            <DollarSign className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-1">${stats.totalRevenue.toFixed(2)}</h3>
            <p className="text-slate-400">إجمالي الإيرادات</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <div className="flex space-x-8 space-x-reverse border-b border-slate-700">
            {[
              { id: 'overview', label: 'نظرة عامة' },
              { id: 'courses', label: 'إدارة الكورسات' },
              { id: 'users', label: 'إدارة المستخدمين' },
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-xl font-bold mb-4">أحدث التسجيلات</h3>
                <div className="space-y-3">
                  {users.slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div>
                        <p className="font-medium">{user.full_name || 'مستخدم'}</p>
                        <p className="text-sm text-slate-400">{user.email}</p>
                      </div>
                      <span className="text-xs text-slate-400">
                        {new Date(user.created_at).toLocaleDateString('ar-EG')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold mb-4">أداء الكورسات</h3>
                <div className="space-y-3">
                  {courses.slice(0, 5).map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div>
                        <p className="font-medium">{course.title}</p>
                        <p className="text-sm text-slate-400">{course.enrolled_count} طالب</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-indigo-400">${course.price}</p>
                        <p className="text-xs text-slate-400">
                          {course.is_published ? 'منشور' : 'مسودة'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">إدارة الكورسات</h3>
                <button
                  onClick={() => setShowCourseModal(true)}
                  className="btn-primary flex items-center space-x-2 space-x-reverse"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة كورس جديد</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="card">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="font-bold mb-2">{course.title}</h4>
                        <p className="text-slate-400 text-sm mb-2 line-clamp-2">
                          {course.description}
                        </p>
                        <div className="flex items-center space-x-2 space-x-reverse text-sm text-slate-400">
                          <span>{course.category}</span>
                          <span>•</span>
                          <span>{course.level}</span>
                          <span>•</span>
                          <Clock className="w-3 h-3" />
                          <span>{course.duration_hours}ساعة</span>
                        </div>
                      </div>
                      <div className="flex space-x-1 space-x-reverse">
                        <button
                          onClick={() => handleEditCourse(course)}
                          className="p-2 text-slate-400 hover:text-indigo-400 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div>
                        <p className="text-2xl font-bold text-indigo-400">${course.price}</p>
                        <p className="text-sm text-slate-400">{course.enrolled_count} طالب</p>
                      </div>
                      <button
                        onClick={() => toggleCoursePublish(course.id, course.is_published)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          course.is_published
                            ? 'bg-green-600 text-white'
                            : 'bg-slate-600 text-slate-300'
                        }`}
                      >
                        {course.is_published ? 'منشور' : 'مسودة'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">إدارة المستخدمين</h3>
              <div className="card overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-right p-4">الاسم</th>
                      <th className="text-right p-4">البريد الإلكتروني</th>
                      <th className="text-right p-4">الدور</th>
                      <th className="text-right p-4">تاريخ التسجيل</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-slate-700/50">
                        <td className="p-4">{user.full_name || 'غير محدد'}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.role === 'admin' 
                              ? 'bg-purple-600 text-white' 
                              : 'bg-slate-600 text-slate-300'
                          }`}>
                            {user.role === 'admin' ? 'مدير' : 'طالب'}
                          </span>
                        </td>
                        <td className="p-4 text-slate-400">
                          {new Date(user.created_at).toLocaleDateString('ar-EG')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl m-4 p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editingCourse ? 'تعديل الكورس' : 'إضافة كورس جديد'}
              </h2>
              <button
                onClick={() => {
                  setShowCourseModal(false);
                  setEditingCourse(null);
                  setCourseForm({
                    title: '',
                    description: '',
                    price: 0,
                    category: '',
                    level: 'beginner',
                    duration_hours: 0,
                    is_published: false,
                  });
                }}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCourseSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">عنوان الكورس</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">وصف الكورس</label>
                <textarea
                  required
                  rows={4}
                  className="input-field resize-none"
                  value={courseForm.description}
                  onChange={(e) => setCourseForm(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">السعر ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    className="input-field"
                    value={courseForm.price}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">المدة (ساعة)</label>
                  <input
                    type="number"
                    min="0"
                    required
                    className="input-field"
                    value={courseForm.duration_hours}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, duration_hours: parseInt(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">الفئة</label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={courseForm.category}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, category: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">المستوى</label>
                  <select
                    className="input-field"
                    value={courseForm.level}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, level: e.target.value }))}
                  >
                    <option value="beginner">مبتدئ</option>
                    <option value="intermediate">متوسط</option>
                    <option value="advanced">متقدم</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_published"
                  className="ml-2"
                  checked={courseForm.is_published}
                  onChange={(e) => setCourseForm(prev => ({ ...prev, is_published: e.target.checked }))}
                />
                <label htmlFor="is_published" className="text-sm">نشر الكورس فوراً</label>
              </div>

              <div className="flex space-x-4 space-x-reverse pt-4">
                <button type="submit" className="btn-primary flex-1">
                  {editingCourse ? 'تحديث الكورس' : 'إنشاء الكورس'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCourseModal(false);
                    setEditingCourse(null);
                  }}
                  className="btn-secondary flex-1"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;