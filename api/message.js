"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAllNotificationsRead = exports.markNotificationRead = exports.getNotifications = exports.getUnreadCount = exports.getChatMessages = exports.getConversations = void 0;
const request_1 = require("./request");
function getConversations() {
    return (0, request_1.get)('/api/v1/messages/conversations');
}
exports.getConversations = getConversations;
function getChatMessages(targetUserId, page = 1, size = 50) {
    return (0, request_1.get)(`/api/v1/messages/chat/${targetUserId}`, { page, size });
}
exports.getChatMessages = getChatMessages;
function getUnreadCount() {
    return (0, request_1.get)('/api/v1/messages/unread');
}
exports.getUnreadCount = getUnreadCount;
function getNotifications(page = 1, size = 20) {
    return (0, request_1.get)('/api/v1/messages/notifications', { page, size });
}
exports.getNotifications = getNotifications;
function markNotificationRead(id) {
    return (0, request_1.put)(`/api/v1/messages/notifications/${id}/read`);
}
exports.markNotificationRead = markNotificationRead;
function markAllNotificationsRead() {
    return (0, request_1.put)('/api/v1/messages/notifications/read-all');
}
exports.markAllNotificationsRead = markAllNotificationsRead;
