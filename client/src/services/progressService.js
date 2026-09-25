import api from './api';

export const progressAPI = {
  getAll: () => api.get('/progress'),
  update: (problemId, data) => api.put(`/progress/${problemId}`, data),
  getRevisionDue: () => api.get('/progress/revision')
};
