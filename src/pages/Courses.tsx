import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCourse } from '../contexts/CourseContext';
import { Search, Filter, Star, Clock, Users, BookOpen } from 'lucide-react';

const Courses: React.FC = () => {
  const { courses, loading } = useCourse();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(courses);

  const categories = [...new Set(courses.map(course => course.category))];
  const levels = [
    { value: 'beginner', label: 'مبتدئ' },
    { value: 'intermediate', label: 'متوسط' },
    { value: 'advanced', label: 'متقدم' }
  ];

  useEffect(() => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    if (selectedLevel) {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedCategory, selectedLevel]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLevel('');
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
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="hero-gradient-text">كورسات الذكاء الاصطناعي</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            اكتشف مجموعة واسعة من الكورسات المتخصصة في أحدث تقنيات الذكاء الاصطناعي
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="glass-effect p-6 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="ابحث عن كورس..."
                  className="input-field pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <select
                className="input-field"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">جميع الفئات</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Level Filter */}
              <select
                className="input-field"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="">جميع المستويات</option>
                {levels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="btn-secondary flex items-center justify-center space-x-2 space-x-reverse"
              >
                <Filter className="w-4 h-4" />
                <span>مسح الفلاتر</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <p className="text-slate-400">
            تم العثور على {filteredCourses.length} كورس
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group cursor-pointer hover:shadow-xl hover:shadow-indigo-500/10"
            >
              <Link to={`/courses/${course.id}`}>
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={course.thumbnail_url || `https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800`}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-indigo-600 text-white px-2 py-1 rounded text-sm">
                      {course.level === 'beginner' ? 'مبتدئ' : course.level === 'intermediate' ? 'متوسط' : 'متقدم'}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white text-sm">
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration_hours} ساعة</span>
                      </div>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Users className="w-4 h-4" />
                        <span>{course.enrolled_count}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-indigo-400 font-medium">{course.category}</span>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-slate-400">
                        {course.average_rating?.toFixed(1) || '0.0'}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-slate-400 text-sm line-clamp-3">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <img
                        src={course.instructor?.avatar_url || `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50`}
                        alt={course.instructor?.full_name || 'Instructor'}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm text-slate-400">
                        {course.instructor?.full_name || 'المدرب'}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-indigo-400">
                      ${course.price}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse text-sm text-slate-400">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.lessons_count} درس</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">لا توجد كورسات</h3>
            <p className="text-slate-400 mb-6">لم يتم العثور على كورسات تطابق معايير البحث</p>
            <button onClick={clearFilters} className="btn-primary">
              مسح الفلاتر
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Courses;