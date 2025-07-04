import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: 'student' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'student' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'student' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
      };
      courses: {
        Row: {
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
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          price: number;
          currency?: string;
          thumbnail_url?: string | null;
          instructor_id: string;
          category: string;
          level: 'beginner' | 'intermediate' | 'advanced';
          duration_hours: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          price?: number;
          currency?: string;
          thumbnail_url?: string | null;
          instructor_id?: string;
          category?: string;
          level?: 'beginner' | 'intermediate' | 'advanced';
          duration_hours?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      lessons: {
        Row: {
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
        };
        Insert: {
          id?: string;
          course_id: string;
          title: string;
          description?: string | null;
          video_url?: string | null;
          content?: string | null;
          order_index: number;
          duration_minutes: number;
          is_free?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string;
          title?: string;
          description?: string | null;
          video_url?: string | null;
          content?: string | null;
          order_index?: number;
          duration_minutes?: number;
          is_free?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          enrolled_at: string;
          progress: number;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          enrolled_at?: string;
          progress?: number;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          enrolled_at?: string;
          progress?: number;
          completed_at?: string | null;
        };
      };
      reviews: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          rating: number;
          comment: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          rating: number;
          comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          rating?: number;
          comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      assignments: {
        Row: {
          id: string;
          lesson_id: string;
          title: string;
          description: string;
          due_date: string | null;
          max_score: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          lesson_id: string;
          title: string;
          description: string;
          due_date?: string | null;
          max_score: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          lesson_id?: string;
          title?: string;
          description?: string;
          due_date?: string | null;
          max_score?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      submissions: {
        Row: {
          id: string;
          assignment_id: string;
          user_id: string;
          content: string;
          score: number | null;
          feedback: string | null;
          submitted_at: string;
          graded_at: string | null;
        };
        Insert: {
          id?: string;
          assignment_id: string;
          user_id: string;
          content: string;
          score?: number | null;
          feedback?: string | null;
          submitted_at?: string;
          graded_at?: string | null;
        };
        Update: {
          id?: string;
          assignment_id?: string;
          user_id?: string;
          content?: string;
          score?: number | null;
          feedback?: string | null;
          submitted_at?: string;
          graded_at?: string | null;
        };
      };
      comments: {
        Row: {
          id: string;
          lesson_id: string;
          user_id: string;
          content: string;
          parent_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          lesson_id: string;
          user_id: string;
          content: string;
          parent_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          lesson_id?: string;
          user_id?: string;
          content?: string;
          parent_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};