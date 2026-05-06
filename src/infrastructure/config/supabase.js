/**
 * 🗄️ إعداد Supabase Database
 *
 * Supabase هي قاعدة بياناتنا الحقيقية في الإنتاج (PostgreSQL).
 * تحل محل JSON Server الذي يُستخدم في التطوير المحلي فقط.
 *
 * الاستخدام في الـ Repositories:
 *   import { supabase, isSupabaseConfigured } from '../config/supabase';
 *   if (isSupabaseConfigured) {
 *     const { data } = await supabase.from('users').select('*');
 *   }
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

let supabase = null;

if (isSupabaseConfigured) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn(
    '[Supabase] لم يتم إعداد Supabase بعد. ' +
    'أضف VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY في .env.local. ' +
    'سيتم الاعتماد على JSON Server في التطوير.'
  );
}

export { supabase };
export default supabase;
