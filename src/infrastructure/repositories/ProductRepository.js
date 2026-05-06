/**
 * 📦 ProductRepository
 *
 * يدعم مصدرَي بيانات بشكل شفاف:
 *  - JSON Server (التطوير المحلي)
 *  - Supabase (الإنتاج)
 *
 * لتفعيل Supabase: ضع VITE_DATA_SOURCE=supabase في .env.local
 */
import { api } from '../api/ApiClientFactory';
import { supabase, isSupabaseConfigured } from '../config/supabase';

const useSupabase = isSupabaseConfigured && import.meta.env.VITE_DATA_SOURCE === 'supabase';

export class ProductRepository {
  // ─── قراءة ───────────────────────────────────────────────────────────────

  async getAll(params = {}) {
    if (useSupabase) {
      let query = supabase.from('products').select('*');
      if (params.category) query = query.eq('category', params.category);
      if (params.price_gte !== undefined) query = query.gte('price', params.price_gte);
      if (params.price_lte !== undefined) query = query.lte('price', params.price_lte);
      if (params.stock_lte !== undefined) query = query.lte('stock', params.stock_lte);
      if (params._sort) {
        query = query.order(params._sort, { ascending: params._order !== 'desc' });
      }
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data ?? [];
    }
    // --- JSON Server fallback ---
    const response = await api.get('/products', { params });
    return response.data;
  }

  async getById(id) {
    if (useSupabase) {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (error) throw new Error(error.message);
      return data;
    }
    const response = await api.get(`/products/${id}`);
    return response.data;
  }

  // ─── كتابة ───────────────────────────────────────────────────────────────

  async create(productData) {
    if (useSupabase) {
      const { data, error } = await supabase.from('products').insert(productData).select().single();
      if (error) throw new Error(error.message);
      return data;
    }
    const response = await api.post('/products', productData);
    return response.data;
  }

  async update(id, productData) {
    if (useSupabase) {
      const { data, error } = await supabase.from('products').update(productData).eq('id', id).select().single();
      if (error) throw new Error(error.message);
      return data;
    }
    const response = await api.patch(`/products/${id}`, productData);
    return response.data;
  }

  async delete(id) {
    if (useSupabase) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw new Error(error.message);
      return true;
    }
    await api.delete(`/products/${id}`);
    return true;
  }
}

export const productRepository = new ProductRepository();
