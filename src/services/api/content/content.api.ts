import { request } from '../client';

export const contentApi = {
  // Terms and Conditions
  getTerms: () => request('/terms'),
  getTermsById: (id: string) => request(`/terms/${id}`),
  createTerms: (content: string) =>
    request('/terms', { method: 'POST', body: JSON.stringify({ content }) }),
  updateTerms: (id: string, content: string) =>
    request(`/terms/${id}`, { method: 'PATCH', body: JSON.stringify({ content }) }),
  deleteTerms: (id: string) =>
    request(`/terms/${id}`, { method: 'DELETE' }),

  // Privacy Policy
  getPrivacyPolicy: () => request('/privacy'),
  getPrivacyPolicyById: (id: string) => request(`/privacy/${id}`),
  createPrivacyPolicy: (content: string) =>
    request('/privacy', { method: 'POST', body: JSON.stringify({ content }) }),
  updatePrivacyPolicy: (id: string, content: string) =>
    request(`/privacy/${id}`, { method: 'PATCH', body: JSON.stringify({ content }) }),
  deletePrivacyPolicy: (id: string) =>
    request(`/privacy/${id}`, { method: 'DELETE' }),

  // Announcements
  getAnnouncements: () => request('/announcements'),
  getAnnouncementById: (id: string) => request(`/announcements/${id}`),
  createAnnouncement: (data: { title: string; content: string }) =>
    request('/announcements', { method: 'POST', body: JSON.stringify(data) }),
  updateAnnouncement: (id: string, data: Partial<{ title: string; content: string }>) =>
    request(`/announcements/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteAnnouncement: (id: string) =>
    request(`/announcements/${id}`, { method: 'DELETE' }),

  // Report Issues
  getReportIssues: () => request('/report-issues'),
  createReportIssue: (data: { title: string; description: string }) =>
    request('/report-issues', { method: 'POST', body: JSON.stringify(data) }),
  getReportIssuesByUser: (userId: string) => request(`/report-issues/user/${userId}`),
  deleteReportIssue: (id: string) =>
    request(`/report-issues/${id}`, { method: 'DELETE' }),

  // Report User
  getReportedUsers: () => request('/report-users'),
  createReportUser: (data: { reportedUserId: string; reason: string }) =>
    request('/report-users', { method: 'POST', body: JSON.stringify(data) }),
  deleteReportUser: (id: string) =>
    request(`/reportUser/${id}`, { method: 'DELETE' }),

  // Admin Dashboard Stats
  getAdminStats: () => request('/dashboard/admin-stats'),
};
