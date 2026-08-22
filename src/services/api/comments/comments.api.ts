import { request } from '../client';

export const commentsApi = {
  // Add Comment (or Reply)
  addComment: (data: { postId: string; text: string; parentCommentId?: string }) =>
    request('/comments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Get Comments for a Post
  getCommentsForPost: (postId: string) =>
    request(`/comments/${postId}`),
};
