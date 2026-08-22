import { request } from '../client';

export const chatApi = {
  // Create 1-on-1 Conversation
  createDirectConversation: (recipientId: string) =>
    request('/chats/conversation', {
      method: 'POST',
      body: JSON.stringify({ recipientId }),
    }),

  // Create Group Conversation
  createGroupConversation: (data: { name: string; memberIds: string[] }) =>
    request('/chats/conversation/group', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Get My Conversations
  getMyConversations: () => request('/chats/conversations'),

  // Delete Conversation
  deleteConversation: (conversationId: string) =>
    request(`/chats/conversations/${conversationId}`, {
      method: 'DELETE',
    }),

  // Delete Group Conversation
  deleteGroupConversation: (conversationId: string) =>
    request(`/chats/conversations/group/${conversationId}`, {
      method: 'DELETE',
    }),

  // Get Group Members
  getGroupMembers: (conversationId: string) =>
    request(`/chats/conversations/${conversationId}/members`),

  // Get Messages
  getMessages: (conversationId: string) =>
    request(`/chats/conversations/${conversationId}/messages`),

  // Add Members to Group
  addMembersToGroup: (conversationId: string, memberIds: string[]) =>
    request(`/chats/conversations/${conversationId}/add-members`, {
      method: 'PATCH',
      body: JSON.stringify({ memberIds }),
    }),

  // Remove Member from Group
  removeMemberFromGroup: (conversationId: string, memberId: string) =>
    request(`/chats/conversations/${conversationId}/remove-member`, {
      method: 'PATCH',
      body: JSON.stringify({ memberId }),
    }),

  // Leave Group
  leaveGroup: (conversationId: string) =>
    request(`/chats/conversations/${conversationId}/leave`, {
      method: 'PATCH',
    }),

  // Update Group Info
  updateGroup: (conversationId: string, data: { name?: string; avatar?: string }) =>
    request(`/chats/conversations/${conversationId}/update`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  // Make Admin
  makeGroupAdmin: (conversationId: string, memberId: string) =>
    request(`/chats/conversations/${conversationId}/make-admin`, {
      method: 'PATCH',
      body: JSON.stringify({ memberId }),
    }),

  // Mute / Unmute Group Chat
  toggleMuteChat: (conversationId: string, isMuted: boolean) =>
    request(`/chats/conversations/${conversationId}/mute`, {
      method: 'PATCH',
      body: JSON.stringify({ isMuted }),
    }),

  // Get Unread Count
  getUnreadCount: () => request('/chats/unread-count'),
};
