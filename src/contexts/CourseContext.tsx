import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  thumbnail_url: string | null;
  instructor_id: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration_hours: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  instructor?: {
    full_name: string;
    avatar_url: string | null;
  };
  lessons_count?: number;
  enrolled_count?: number;
  average_rating?: number;
}

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

interface CourseContextType {
  courses: Course[];
  enrolledCourses: Course[];
  loading: boolean;
  fetchCourses: () => Promise<void>;
  fetchCourseById: (id: string) => Promise<Course | null>;
  fetchCourseLessons: (courseId: string) => Promise<Lesson[]>;
  enrollInCourse: (courseId: string) => Promise<void>;
  isEnrolled: (courseId: string) => boolean;
  updateProgress: (courseId: string, progress: number) => Promise<void>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (user) {
      fetchEnrolledCourses();
    } else {
      setEnrolledCourses([]);
    }
  }, [user]);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          profiles:instructor_id (
            full_name,
            avatar_url
          )
        `)
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const coursesWithStats = await Promise.all(
        data.map(async (course) => {
          // Get lessons count
          const { count: lessonsCount } = await supabase
            .from('lessons')
            .select('*', { count: 'exact', head: true })
            .eq('course_id', course.id);

          // Get enrolled count
          const { count: enrolledCount } = await supabase
            .from('enrollments')
            .select('*', { count: 'exact', head: true })
            .eq('course_id', course.id);

          // Get average rating
          const { data: reviews } = await supabase
            .from('reviews')
            .select('rating')
            .eq('course_id', course.id);

          const averageRating = reviews && reviews.length > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
            : 0;

          return {
            ...course,
            instructor: course.profiles,
            lessons_count: lessonsCount || 0,
            enrolled_count: enrolledCount || 0,
            average_rating: averageRating,
          };
        })
      );

      setCourses(coursesWithStats);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('خطأ في تحميل الكورسات');
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrolledCourses = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses (
            *,
            profiles:instructor_id (
              full_name,
              avatar_url
            )
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const enrolled = data.map(enrollment => ({
        ...enrollment.courses,
        instructor: enrollment.courses.profiles,
        progress: enrollment.progress,
      }));

      setEnrolledCourses(enrolled);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    }
  };

  const fetchCourseById = async (id: string): Promise<Course | null> => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          profiles:instructor_id (
            full_name,
            avatar_url
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      // Get additional stats
      const { count: lessonsCount } = await supabase
        .from('lessons')
        .select('*', { count: 'exact', head: true })
        .eq('course_id', id);

      const { count: enrolledCount } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true })
        .eq('course_id', id);

      const { data: reviews } = await supabase
        .from('reviews')
        .select('rating')
        .eq('course_id', id);

      const averageRating = reviews && reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;

      return {
        ...data,
        instructor: data.profiles,
        lessons_count: lessonsCount || 0,
        enrolled_count: enrolledCount || 0,
        average_rating: averageRating,
      };
    } catch (error) {
      console.error('Error fetching course:', error);
      return null;
    }
  };

  const fetchCourseLessons = async (courseId: string): Promise<Lesson[]> => {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching lessons:', error);
      return [];
    }
  };

  const enrollInCourse = async (courseId: string) => {
    if (!user) {
      toast.error('يجب تسجيل الدخول أولاً');
      return;
    }

    try {
      const { error } = await supabase
        .from('enrollments')
        .insert([
          {
            user_id: user.id,
            course_id: courseId,
            progress: 0,
          },
        ]);

      if (error) throw error;

      toast.success('تم التسجيل في الكورس بنجاح!');
      await fetchEnrolledCourses();
    } catch (error: any) {
      console.error('Error enrolling in course:', error);
      if (error.code === '23505') {
        toast.error('أنت مسجل في هذا الكورس بالفعل');
      } else {
        toast.error('خطأ في التسجيل في الكورس');
      }
    }
  };

  const isEnrolled = (courseId: string): boolean => {
    return enrolledCourses.some(course => course.id === courseId);
  };

  const updateProgress = async (courseId: string, progress: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('enrollments')
        .update({ 
          progress,
          completed_at: progress >= 100 ? new Date().toISOString() : null
        })
        .eq('user_id', user.id)
        .eq('course_id', courseId);

      if (error) throw error;

      // Update local state
      setEnrolledCourses(prev =>
        prev.map(course =>
          course.id === courseId
            ? { ...course, progress }
            : course
        )
      );
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const value = {
    courses,
    enrolledCourses,
    loading,
    fetchCourses,
    fetchCourseById,
    fetchCourseLessons,
    enrollInCourse,
    isEnrolled,
    updateProgress,
  };

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
};