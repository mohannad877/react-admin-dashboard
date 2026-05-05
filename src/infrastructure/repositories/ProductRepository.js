import { api } from '../api/ApiClientFactory';

export class ProductRepository {
  async getAll(params = {}) {
    const response = await api.get('/products', { params });
    return response.data;
  }

  async getById(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }

  async create(productData) {
    const response = await api.post('/products', productData);
    return response.data;
  }

  async update(id, productData) {
    const response = await api.patch(`/products/${id}`, productData);
    return response.data;
  }

  async delete(id) {
    await api.delete(`/products/${id}`);
    return true;
  }
}

export const productRepository = new ProductRepository();
