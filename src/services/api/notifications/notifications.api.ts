import { request } from '../client';

export const notificationsApi = {
  // Get My Notifications
  getMyNotifications: () => request('/notification'),

  // Mark Notification as Read
  markAsRead: (notificationId: string) =>
    request(`/notification/${notificationId}`, {
      method: 'PATCH',
    }),
};
