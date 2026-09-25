import api from './api';

export const streakAPI = {
  getCurrent: () => api.get('/streaks/current'),
  getCalendar: () => api.get('/streaks/calendar')
};
