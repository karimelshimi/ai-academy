import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useCourse } from '../contexts/CourseContext';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award, TrendingUp, Play, Star } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { profile } = useAuth();
  const { enrolledCourses, loading } = useCourse();
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalHours: 0,
    averageProgress: 0,
  });

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      const totalCourses = enrolledCourses.length;
      const completedCourses = enrolledCourses.filter(course => (course.progress || 0) >= 100).length;
      const totalHours = enrolledCourses.reduce((sum, course) => sum + course.duration_hours, 0);
      const averageProgress = enrolledCourses.reduce((sum, course) => sum + (course.progress || 0), 0) / totalCourses;

      setStats({
        totalCourses,
        completedCourses,
        totalHours,
        averageProgress: Math.round(averageProgress),
      });
    }
  }, [enrolledCourses]);

  const inProgressCourses = enrolledCourses.filter(course => (course.progress || 0) > 0 && (course.progress || 0) < 100);
  const recentCourses = enrolledCourses.slice(0, 3);

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
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            مرحباً، <span className="hero-gradient-text">{profile?.full_name || 'الطالب'}</span>
          </h1>
          <p className="text-xl text-slate-400">
            استمر في رحلة التعلم وحقق أهدافك في عالم الذكاء الاصطناعي
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
            <BookOpen className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-1">{stats.totalCourses}</h3>
            <p className="text-slate-400">كورس مسجل</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card text-center"
          >
            <Award className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-1">{stats.completedCourses}</h3>
            <p className="text-slate-400">كورس مكتمل</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card text-center"
          >
            <Clock className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-1">{stats.totalHours}</h3>
            <p className="text-slate-400">ساعة تعلم</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card text-center"
          >
            <TrendingUp className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-1">{stats.averageProgress}%</h3>
            <p className="text-slate-400">متوسط التقدم</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">استمر في التعلم</h2>
              
              {inProgressCourses.length > 0 ? (
                <div className="space-y-4">
                  {inProgressCourses.map((course) => (
                    <div key={course.id} className="card">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <img
                          src={course.thumbnail_url || `https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=200`}
                          alt={course.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold mb-1">{course.title}</h3>
                          <p className="text-slate-400 text-sm mb-2">{course.category}</p>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress || 0}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-slate-400 mt-1">{course.progress || 0}% مكتمل</p>
                        </div>
                        <Link
                          to={`/courses/${course.id}`}
                          className="btn-primary flex items-center space-x-2 space-x-reverse"
                        >
                          <Play className="w-4 h-4" />
                          <span>متابعة</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card text-center py-12">
                  <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">لا توجد كورسات قيد التقدم</h3>
                  <p className="text-slate-400 mb-6">ابدأ كورس جديد لتظهر هنا</p>
                  <Link to="/courses" className="btn-primary">
                    تصفح الكورسات
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Recent Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-6">الكورسات الحديثة</h2>
              
              {recentCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentCourses.map((course) => (
                    <div key={course.id} className="card">
                      <img
                        src={course.thumbnail_url || `https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400`}
                        alt={course.title}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-bold mb-2">{course.title}</h3>
                      <p className="text-slate-400 text-sm mb-3 line-clamp-2">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-indigo-400">{course.category}</span>
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-slate-400">
                            {course.average_rating?.toFixed(1) || '0.0'}
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`/courses/${course.id}`}
                        className="btn-primary w-full mt-4"
                      >
                        عرض الكورس
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card text-center py-12">
                  <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">لم تسجل في أي كورس بعد</h3>
                  <p className="text-slate-400 mb-6">ابدأ رحلة التعلم الآن</p>
                  <Link to="/courses" className="btn-primary">
                    تصفح الكورسات
                  </Link>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="card"
            >
              <h3 className="text-xl font-bold mb-4">إجراءات سريعة</h3>
              <div className="space-y-3">
                <Link
                  to="/courses"
                  className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  <span>تصفح الكورسات</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                  <Award className="w-5 h-5 text-green-400" />
                  <span>الملف الشخصي</span>
                </Link>
                <Link
                  to="/pricing"
                  className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <span>ترقية الحساب</span>
                </Link>
              </div>
            </motion.div>

            {/* Learning Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="card"
            >
              <h3 className="text-xl font-bold mb-4">تقدم التعلم</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">التقدم الإجمالي</span>
                    <span className="text-sm font-bold">{stats.averageProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${stats.averageProgress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-slate-400">
                  <p>الكورسات المكتملة: {stats.completedCourses}/{stats.totalCourses}</p>
                  <p>ساعات التعلم: {stats.totalHours}</p>
                </div>
              </div>
            </motion.div>

            {/* Community */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="card"
            >
              <h3 className="text-xl font-bold mb-4">انضم للمجتمع</h3>
              <p className="text-slate-400 text-sm mb-4">
                تواصل مع زملائك الطلاب واحصل على الدعم
              </p>
              <a
                href="https://t.me/+WrGesCy1dh83MGU0"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full text-center"
              >
                انضم لتليجرام
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;