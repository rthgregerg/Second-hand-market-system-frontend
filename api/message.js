"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConversations = getConversations;
exports.getChatMessages = getChatMessages;
exports.getUnreadCount = getUnreadCount;
exports.getNotifications = getNotifications;
exports.markNotificationRead = markNotificationRead;
exports.markAllNotificationsRead = markAllNotificationsRead;
const request_1 = require("./request");
function getConversations() {
    return (0, request_1.get)('/api/v1/messages/conversations');
}
function getChatMessages(targetUserId, page = 1, size = 50) {
    return (0, request_1.get)(`/api/v1/messages/chat/${targetUserId}`, { page, size });
}
function getUnreadCount() {
    return (0, request_1.get)('/api/v1/messages/unread');
}
function getNotifications(page = 1, size = 20) {
    return (0, request_1.get)('/api/v1/messages/notifications', { page, size });
}
function markNotificationRead(id) {
    return (0, request_1.put)(`/api/v1/messages/notifications/${id}/read`);
}
function markAllNotificationsRead() {
    return (0, request_1.put)('/api/v1/messages/notifications/read-all');
}
