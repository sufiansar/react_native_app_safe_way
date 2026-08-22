import { request } from '../client';

export const reportUserApi = {
  // Create Report User
  createReportUser: (data: { reportedUserId: string; reason: string }) =>
    request('/report-users', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Get All Report Users
  getAllReportUsers: () => request('/report-users'),

  // Get All Report Users By Reporter ID
  getReportUsersByReporterId: (reporterId: string) =>
    request(`/report-users/reporter/${reporterId}`),

  // Get All Report Users By Reported User ID
  getReportUsersByReportedUserId: (reportedUserId: string) =>
    request(`/report-users/reported/${reportedUserId}`),

  // Get Single Report User
  getReportUserById: (id: string) => request(`/report-users/${id}`),

  // Delete Report User
  deleteReportUser: (id: string) =>
    request(`/reportUser/${id}`, {
      method: 'DELETE',
    }),
};
