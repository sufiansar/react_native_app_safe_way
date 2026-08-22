import { request } from '../client';

export const adminDashboardApi = {
  // Get Admin Dashboard Stats
  getAdminStats: () => request('/dashboard/admin-stats'),
};
