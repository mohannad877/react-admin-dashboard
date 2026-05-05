import { api } from '../api/ApiClientFactory';

export class UserRepository {
  async getAll(params = {}) {
    const response = await api.get('/users', { params });
    return response.data;
  }

  async getById(id) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  }

  async create(userData) {
    const response = await api.post('/users', userData);
    return response.data;
  }

  async update(id, userData) {
    const response = await api.patch(`/users/${id}`, userData);
    return response.data;
  }

  async delete(id) {
    await api.delete(`/users/${id}`);
    return true;
  }
}

export const userRepository = new UserRepository();
