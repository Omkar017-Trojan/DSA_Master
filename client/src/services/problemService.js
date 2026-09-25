import api from './api';

export const problemAPI = {
  getAll: (params) => api.get('/problems', { params }),
  getBySlug: (slug) => api.get(`/problems/${slug}`)
};
