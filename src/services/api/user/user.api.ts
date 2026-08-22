import { request } from '../client';

export const userApi = {
  // Register User
  registerUser: (data: { name: string; email: string; passwordHash: string }) =>
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

  // Submit Identity Verification
  submitIdentityVerification: (formData: any) =>
    request('/user/verify-identity/submit', {
      method: 'PATCH',
      body: JSON.stringify(formData),
    }),

  // Update Identity Verification Status
  updateIdentityVerificationStatus: (id: string, status: 'APPROVED' | 'REJECTED') =>
    request(`/user/${id}/verify-identity-status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  // Get All User
  getAllUsers: () => request('/user'),

  // Get All Admins
  getAdmins: () => request('/user/admins'),

  // Get Document Submitted Users
  getDocumentSubmitted: () => request('/user/document-submitted'),

  // Get Rejected Document Users
  getRejectedUsers: () => request('/user/rejected'),

  // Get Suspended Users
  getSuspendedUsers: () => request('/user/suspended'),

  // Get My Profile
  getMyProfile: () => request('/user/my-profile'),

  // Get Single User
  getUserById: (id: string) => request(`/user/${id}`),

  // Delete User
  deleteUser: (id: string) =>
    request(`/user/${id}`, {
      method: 'DELETE',
    }),

  // Get Identity Verified Users
  getIdentityVerifiedUsers: () => request('/user/identity-verified'),

  // Update Profile
  updateUser: (data: Partial<{ name: string; phone: string; avatar: string }>) =>
    request('/user/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  // Update User Status (Suspend / Active)
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
