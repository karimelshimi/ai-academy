import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCourse } from '../contexts/CourseContext';
import { Play, Users, BookOpen, Star, ArrowLeft } from 'lucide-react';

const Home: React.FC = () => {
  const { courses, loading } = useCourse();
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    hours: 0,
  });

  useEffect(() => {
    // Animate counters
    const animateCounter = (target: number, setter: (value: number) => void) => {
      let current = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 20);
    };

    animateCounter(1500, (value) => setStats(prev => ({ ...prev, students: value })));
    animateCounter(courses.length, (value) => setStats(prev => ({ ...prev, courses: value })));
    animateCounter(120, (value) => setStats(prev => ({ ...prev, hours: value })));
  }, [courses.length]);

  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="animated-bg">
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-7xl font-extrabold leading-tight mb-6">
              <span className="hero-gradient-text">
                جاهز تبقى فنان في الذكاء الاصطناعي؟
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              هنا هتتعلم كل أدوات الذكاء الاصطناعي الجديدة، وتعرف إزاي تكسب منها وتعمل بيها حاجات مبتكرة محدش عملها قبلك.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/courses" className="btn-primary">
                ابدأ التعلم الآن
              </Link>
              <Link to="/pricing" className="btn-secondary">
                اعرف أكتر
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="card"
            >
              <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">{stats.students.toLocaleString()}+</h3>
              <p className="text-slate-400">طالب راضٍ</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card"
            >
              <BookOpen className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">{stats.courses}+</h3>
              <p className="text-slate-400">كورس متخصص</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card"
            >
              <Play className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">{stats.hours}+</h3>
              <p className="text-slate-400">ساعة محتوى</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">ماذا ستتعلم وتكسب معنا؟</h2>
            <p className="max-w-2xl mx-auto text-slate-400">
              محتوى حصري ومحدث باستمرار يفتح لك أبواب الإبداع والربح.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="card text-center"
            >
              <div className="bg-indigo-500/20 text-indigo-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-laptop-code text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-3">أحدث أدوات AI</h3>
              <p className="text-slate-400">
                شروحات عملية لأقوى الأدوات في تصميم الصور، الفيديو، الصوت، والكتابة الإبداعية.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card text-center"
            >
              <div className="bg-pink-500/20 text-pink-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-dollar-sign text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-3">استراتيجيات الربح</h3>
              <p className="text-slate-400">
                طرق حقيقية ومجربة لتحويل مهاراتك في الذكاء الاصطناعي إلى مصدر دخل ثابت.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card text-center"
            >
              <div className="bg-purple-500/20 text-purple-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-lightbulb text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-3">مشاريع مبتكرة</h3>
              <p className="text-slate-400">
                تعلم كيف تبني مشاريع كاملة وغير مسبوقة باستخدام مجموعة من أدوات الذكاء الاصطناعي.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">الكورسات المميزة</h2>
            <p className="max-w-2xl mx-auto text-slate-400">
              اكتشف أحدث كورساتنا في مجال الذكاء الاصطناعي
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="card group cursor-pointer"
                >
                  <Link to={`/courses/${course.id}`}>
                    <div className="relative overflow-hidden rounded-lg mb-4">
                      <img
                        src={course.thumbnail_url || `https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800`}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="bg-indigo-600 text-white px-2 py-1 rounded text-sm">
                          {course.level === 'beginner' ? 'مبتدئ' : course.level === 'intermediate' ? 'متوسط' : 'متقدم'}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-slate-400 mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-slate-400">
                          {course.average_rating?.toFixed(1) || '0.0'}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-indigo-400">
                        ${course.price}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link to="/courses" className="btn-primary inline-flex items-center space-x-2 space-x-reverse">
              <span>عرض جميع الكورسات</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">آراء طلابنا</h2>
            <p className="max-w-2xl mx-auto text-slate-400">
              نفخر بثقة مجتمعنا، وهذه بعض من شهاداتهم.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'محمد علي',
                avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
                rating: 5,
                comment: 'بصراحة الكورس غير تفكيري تمامًا، الشرح بسيط ومباشر ومفيش أي تعقيد. بقيت بعمل تصميمات بالذكاء الاصطناعي محدش مصدق إني اللي عاملها.'
              },
              {
                name: 'فاطمة السيد',
                avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
                rating: 5,
                comment: 'المحتوى بيتحدث باستمرار ودي أهم حاجة في مجال الذكاء الاصطناعي. كل يوم في أداة جديدة بنتعلمها، والدعم ممتاز جدًا.'
              },
              {
                name: 'أحمد خالد',
                avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100',
                rating: 5,
                comment: 'أحسن استثمار عملته في نفسي. قدرت أستخدم اللي اتعلمته في شغلي كمسوق والنتائج كانت مبهرة. شكرًا يا حسام على المجهود ده.'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ml-4"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-400">{testimonial.comment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              جاهز تبدأ رحلتك في عالم الذكاء الاصطناعي؟
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              انضم لآلاف الطلاب الذين غيروا مستقبلهم المهني معنا
            </p>
            <Link to="/courses" className="bg-white text-indigo-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              ابدأ الآن مجاناً
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;