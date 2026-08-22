import { request } from '../client';

export const userApi = {
  // Register User
  register: (data: { name: string; email: string; passwordHash: string }) =>
    request('/user', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Create Admin
  createAdmin: (data: { name: string; email: string; passwordHash: string }) =>
    request('/user/create-admin', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Get My Profile
  getMyProfile: () => request('/user/my-profile'),

  // Update Profile
  updateProfile: (data: Partial<{ name: string; phone: string; avatar: string }>) =>
    request('/user/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  // Get All Users
  getAllUsers: () => request('/user'),

  // Get Admins
  getAdmins: () => request('/user/admins'),

  // Get Document Submitted Users
  getDocumentSubmitted: () => request('/user/document-submitted'),

  // Get Rejected Users
  getRejectedUsers: () => request('/user/rejected'),

  // Get Suspended Users
  getSuspendedUsers: () => request('/user/suspended'),

  // Get Identity Verified Users
  getIdentityVerifiedUsers: () => request('/user/identity-verified'),

  // Get Single User by ID
  getUserById: (id: string) => request(`/user/${id}`),

  // Delete User
  deleteUser: (id: string) =>
    request(`/user/${id}`, {
      method: 'DELETE',
    }),

  // Update User Status (Suspend / Activate)
  updateUserStatus: (id: string, status: 'ACTIVE' | 'SUSPENDED') =>
    request(`/user/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  // Update FCM Token
  updateFcmToken: (fcmToken: string) =>
    request('/user/fcm-token', {
      method: 'PATCH',
      body: JSON.stringify({ fcmToken }),
    }),
};
