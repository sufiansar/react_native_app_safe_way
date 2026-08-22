import { request } from '../client';

export const reportIssueApi = {
  // Create Report Issue
  createReportIssue: (data: { title: string; description: string }) =>
    request('/report-issues', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Get All Report Issues
  getAllReportIssues: () => request('/report-issues'),

  // Get Single Report Issue
  getReportIssueById: (id: string) => request(`/report-issues/${id}`),

  // Get All Reports of User
  getReportsByUserId: (userId: string) => request(`/report-issues/user/${userId}`),

  // Delete Report Issue
  deleteReportIssue: (id: string) =>
    request(`/report-issues/${id}`, {
      method: 'DELETE',
    }),
};
