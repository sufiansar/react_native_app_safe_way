import { request } from '../client';

export const announcementApi = {
  // Create Announcement
  createAnnouncement: (data: { title: string; content: string }) =>
    request('/announcements', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Get All Announcements
  getAllAnnouncements: () => request('/announcements'),

  // Get Single Announcement
  getAnnouncementById: (id: string) => request(`/announcements/${id}`),

  // Update Announcement
  updateAnnouncement: (id: string, data: Partial<{ title: string; content: string }>) =>
    request(`/announcements/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  // Delete Announcement
  deleteAnnouncement: (id: string) =>
    request(`/announcements/${id}`, {
      method: 'DELETE',
    }),
};
