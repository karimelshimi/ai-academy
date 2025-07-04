import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useCourse } from '../contexts/CourseContext';
import { User, Mail, Calendar, Award, BookOpen, Clock, Star } from 'lucide-react';

const Profile: React.FC = () => {
  const { profile, updateProfile } = useAuth();
  const { enrolledCourses } = useCourse();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    avatar_url: profile?.avatar_url || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      // Error handled in context
    }
  };

  const completedCourses = enrolledCourses.filter(course => (course.progress || 0) >= 100);
  const inProgressCourses = enrolledCourses.filter(course => (course.progress || 0) > 0 && (course.progress || 0) < 100);
  const totalHours = enrolledCourses.reduce((sum, course) => sum + course.duration_hours, 0);
  const averageProgress = enrolledCourses.length > 0 
    ? enrolledCourses.reduce((sum, course) => sum + (course.progress || 0), 0) / enrolledCourses.length 
    : 0;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Profile Header */}
          <div className="card mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 md:space-x-reverse">
              <div className="relative">
                <div className="w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.full_name || 'User'}
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  ) : (
                    <User size={48} className="text-white" />
                  )}
                </div>
              </div>

              <div className="flex-1 text-center md:text-right">
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">الاسم الكامل</label>
                      <input
                        type="text"
                        className="input-field"
                        value={formData.full_name}
                        onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">رابط الصورة الشخصية</label>
                      <input
                        type="url"
                        className="input-field"
                        value={formData.avatar_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, avatar_url: e.target.value }))}
                      />
                    </div>
                    <div className="flex space-x-4 space-x-reverse">
                      <button type="submit" className="btn-primary">
                        حفظ التغييرات
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="btn-secondary"
                      >
                        إلغاء
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold mb-2">{profile?.full_name || 'المستخدم'}</h1>
                    <div className="flex items-center justify-center md:justify-start space-x-2 space-x-reverse text-slate-400 mb-4">
                      <Mail className="w-4 h-4" />
                      <span>{profile?.email}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start space-x-2 space-x-reverse text-slate-400 mb-6">
                      <Calendar className="w-4 h-4" />
                      <span>عضو منذ {new Date(profile?.created_at || '').toLocaleDateString('ar-EG')}</span>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn-primary"
                    >
                      تعديل الملف الشخصي
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card text-center"
            >
              <BookOpen className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold mb-1">{enrolledCourses.length}</h3>
              <p className="text-slate-400">كورس مسجل</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card text-center"
            >
              <Award className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold mb-1">{completedCourses.length}</h3>
              <p className="text-slate-400">كورس مكتمل</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card text-center"
            >
              <Clock className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold mb-1">{totalHours}</h3>
              <p className="text-slate-400">ساعة تعلم</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card text-center"
            >
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold mb-1">{Math.round(averageProgress)}%</h3>
              <p className="text-slate-400">متوسط التقدم</p>
            </motion.div>
          </div>

          {/* Learning Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Completed Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="card"
            >
              <h2 className="text-2xl font-bold mb-6">الكورسات المكتملة</h2>
              {completedCourses.length > 0 ? (
                <div className="space-y-4">
                  {completedCourses.map((course) => (
                    <div key={course.id} className="flex items-center space-x-4 space-x-reverse p-4 bg-slate-700/30 rounded-lg">
                      <img
                        src={course.thumbnail_url || `https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=100`}
                        alt={course.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold">{course.title}</h3>
                        <p className="text-sm text-slate-400">{course.category}</p>
                      </div>
                      <div className="flex items-center space-x-1 space-x-reverse text-green-400">
                        <Award className="w-4 h-4" />
                        <span className="text-sm font-medium">مكتمل</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-400">لم تكمل أي كورس بعد</p>
                </div>
              )}
            </motion.div>

            {/* In Progress Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="card"
            >
              <h2 className="text-2xl font-bold mb-6">الكورسات قيد التقدم</h2>
              {inProgressCourses.length > 0 ? (
                <div className="space-y-4">
                  {inProgressCourses.map((course) => (
                    <div key={course.id} className="p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-4 space-x-reverse mb-3">
                        <img
                          src={course.thumbnail_url || `https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=100`}
                          alt={course.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold">{course.title}</h3>
                          <p className="text-sm text-slate-400">{course.category}</p>
                        </div>
                        <span className="text-sm font-medium text-indigo-400">
                          {course.progress || 0}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-400">لا توجد كورسات قيد التقدم</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* All Enrolled Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="card mt-8"
          >
            <h2 className="text-2xl font-bold mb-6">جميع الكورسات المسجلة</h2>
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="p-4 bg-slate-700/30 rounded-lg">
                    <img
                      src={course.thumbnail_url || `https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400`}
                      alt={course.title}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-bold mb-2">{course.title}</h3>
                    <p className="text-slate-400 text-sm mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-indigo-400">{course.category}</span>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-slate-400">
                          {course.average_rating?.toFixed(1) || '0.0'}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-slate-400">{course.progress || 0}% مكتمل</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">لم تسجل في أي كورس بعد</h3>
                <p className="text-slate-400 mb-6">ابدأ رحلة التعلم الآن</p>
                <a href="/courses" className="btn-primary">
                  تصفح الكورسات
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;