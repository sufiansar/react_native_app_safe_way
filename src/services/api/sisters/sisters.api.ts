import { request } from '../client';

export const sistersApi = {
  // Send Sister Request
  sendSisterRequest: (data: { recipientId: string }) =>
    request('/sisters/request', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Accept Sister Request
  acceptSisterRequest: (requestId: string) =>
    request(`/sisters/request/${requestId}/accept`, {
      method: 'PATCH',
    }),

  // Cancel Sister Request
  cancelSisterRequest: (id: string) =>
    request(`/sisters/request/${id}/cancel`, {
      method: 'DELETE',
    }),

  // Reject Sister Request
  rejectSisterRequest: (requestId: string) =>
    request(`/sisters/request/${requestId}/reject`, {
      method: 'PATCH',
    }),

  // Remove a Sister
  removeSister: (sisterId: string) =>
    request(`/sisters/${sisterId}`, {
      method: 'DELETE',
    }),

  // List Pending Sister Requests
  getPendingRequests: () => request('/sisters/requests'),

  // List All Sisters (with optional search)
  getAllSisters: (searchTerm?: string) => {
    const query = searchTerm ? `?searchTerm=${encodeURIComponent(searchTerm)}` : '';
    return request(`/sisters${query}`);
  },
};
