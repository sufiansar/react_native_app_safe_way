import { request } from '../client';

export const termsApi = {
  // Create Terms
  createTerms: (content: string) =>
    request('/terms', {
      method: 'POST',
      body: JSON.stringify({ content }),
    }),

  // Get All Terms
  getAllTerms: () => request('/terms'),

  // Get Single Terms
  getTermsById: (id: string) => request(`/terms/${id}`),

  // Update Terms
  updateTerms: (id: string, content: string) =>
    request(`/terms/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    }),

  // Delete Terms
  deleteTerms: (id: string) =>
    request(`/terms/${id}`, {
      method: 'DELETE',
    }),
};
