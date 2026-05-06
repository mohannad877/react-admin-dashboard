/**
 * 👤 UserRepository
 *
 * يدعم مصدرَي بيانات بشكل شفاف:
 *  - JSON Server (التطوير المحلي): عند VITE_DATA_SOURCE=json-server أو لم يُعدّ Supabase
 *  - Supabase (الإنتاج): عند VITE_DATA_SOURCE=supabase وتوافر المفاتيح
 *
 * الطبقات الأعلى (Pages, Hooks) لا تعرف أي مصدر يُستخدم — هذا جوهر Repository Pattern.
 */
import { api } from '../api/ApiClientFactory';
import { supabase, isSupabaseConfigured } from '../config/supabase';

const useSupabase = isSupabaseConfigured && import.meta.env.VITE_DATA_SOURCE === 'supabase';

export class UserRepository {
  // ─── قراءة ───────────────────────────────────────────────────────────────

  async getAll(params = {}) {
    if (useSupabase) {
      let query = supabase.from('users').select('*');
      if (params.role) query = query.eq('role', params.role);
      if (params.status) query = query.eq('status', params.status);
      if (params._sort) {
        query = query.order(params._sort, { ascending: params._order !== 'desc' });
      }
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data ?? [];
    }
    // --- JSON Server fallback ---
    const response = await api.get('/users', { params });
    return response.data;
  }

  async getById(id) {
    if (useSupabase) {
      const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
      if (error) throw new Error(error.message);
      return data;
    }
    const response = await api.get(`/users/${id}`);
    return response.data;
  }

  // ─── كتابة ───────────────────────────────────────────────────────────────

  async create(userData) {
    if (useSupabase) {
      const { data, error } = await supabase.from('users').insert(userData).select().single();
      if (error) throw new Error(error.message);
      return data;
    }
    const response = await api.post('/users', userData);
    return response.data;
  }

  async update(id, userData) {
    if (useSupabase) {
      const { data, error } = await supabase.from('users').update(userData).eq('id', id).select().single();
      if (error) throw new Error(error.message);
      return data;
    }
    const response = await api.patch(`/users/${id}`, userData);
    return response.data;
  }

  async delete(id) {
    if (useSupabase) {
      const { error } = await supabase.from('users').delete().eq('id', id);
      if (error) throw new Error(error.message);
      return true;
    }
    await api.delete(`/users/${id}`);
    return true;
  }
}

export const userRepository = new UserRepository();
