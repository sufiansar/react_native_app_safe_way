import { request } from '../client';

export const reactionsApi = {
  // Toggle Reaction (Helpful / Not Helpful)
  toggleReaction: (data: { postId: string; type: 'HELPFUL' | 'UNHELPFUL' }) =>
    request('/reactions/toggle', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
