import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zeldhmbgpzdmxysnpjhr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplbGRobWJncHpkbXh5c25wamhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MzI0NzAsImV4cCI6MjAyNTQwODQ3MH0.KgNdWWrxhKeRPHDqYEYKwXRCXL0HhzTQGSq_0H6_5Qc';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);