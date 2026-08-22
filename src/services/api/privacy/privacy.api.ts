import { request } from '../client';

export const privacyApi = {
  // Create Privacy Policy
  createPrivacyPolicy: (content: string) =>
    request('/privacy', {
      method: 'POST',
      body: JSON.stringify({ content }),
    }),

  // Get All Privacy Policies
  getAllPrivacyPolicies: () => request('/privacy'),

  // Get Single Privacy Policy
  getPrivacyPolicyById: (id: string) => request(`/privacy/${id}`),

  // Update Privacy Policy
  updatePrivacyPolicy: (id: string, content: string) =>
    request(`/privacy/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    }),

  // Delete Privacy Policy
  deletePrivacyPolicy: (id: string) =>
    request(`/privacy/${id}`, {
      method: 'DELETE',
    }),
};
