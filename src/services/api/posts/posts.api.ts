import { request } from '../client';

export const postsApi = {
  // Create Post
  createPost: (data: { content: string; image?: string; tags?: string[] }) =>
    request('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Get Feed (All Posts)
  getFeed: () => request('/posts'),

  // Get Single Post
  getPostById: (postId: string) => request(`/posts/${postId}`),

  // Update Post
  updatePost: (id: string, data: Partial<{ content: string; tags: string[] }>) =>
    request(`/posts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  // Delete Post
  deletePost: (id: string) =>
    request(`/posts/${id}`, {
      method: 'DELETE',
    }),

  // Share Post (Increment Counter)
  sharePost: (postId: string) =>
    request(`/posts/${postId}/share`, {
      method: 'POST',
    }),

  // Share Post to User's Chat
  sharePostToChat: (postId: string, data: { userId: string }) =>
    request(`/posts/${postId}/share-to-user`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Reactions (Toggle Helpful / Not Helpful)
  toggleReaction: (data: { postId: string; type: 'HELPFUL' | 'UNHELPFUL' }) =>
    request('/reactions/toggle', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Comments
  addComment: (data: { postId: string; text: string; parentCommentId?: string }) =>
    request('/comments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getCommentsByPost: (postId: string) =>
    request(`/comments/${postId}`),
};
