import { get, put } from './request';

export function getConversations() {
  return get<Conversation[]>('/api/v1/messages/conversations');
}

export function getChatMessages(targetUserId: number, page: number = 1, size: number = 50) {
  return get<PageResult<ChatMessage>>(`/api/v1/messages/chat/${targetUserId}`, { page, size });
}

export function getUnreadCount() {
  return get<Record<string, number>>('/api/v1/messages/unread');
}

export function getNotifications(page: number = 1, size: number = 20) {
  return get<PageResult<Notification>>('/api/v1/messages/notifications', { page, size });
}

export function markNotificationRead(id: number) {
  return put<void>(`/api/v1/messages/notifications/${id}/read`);
}

export function markAllNotificationsRead() {
  return put<void>('/api/v1/messages/notifications/read-all');
}
