"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("../../../api/message");
require("../../../components/empty-state/empty-state");
Page({
    data: {
        conversations: [],
        notifications: [],
        unreadNotificationCount: 0,
        showNotifications: false,
    },
    onShow() { this.loadConversations(); this.loadUnread(); },
    async loadConversations() {
        try {
            const res = await (0, message_1.getConversations)();
            this.setData({ conversations: res.data || [] });
        }
        catch (_a) { }
    },
    async loadUnread() {
        var _a;
        try {
            const res = await (0, message_1.getUnreadCount)();
            this.setData({ unreadNotificationCount: ((_a = res.data) === null || _a === void 0 ? void 0 : _a.notificationCount) || 0 });
            getApp().fetchUnreadCount();
        }
        catch (_b) { }
    },
    async loadNotifications() {
        try {
            const res = await (0, message_1.getNotifications)(1, 50);
            this.setData({ notifications: res.data.records || [], showNotifications: true });
        }
        catch (_a) { }
    },
    onChatTap(e) {
        const { id, name } = e.currentTarget.dataset;
        wx.navigateTo({ url: `/pages/message/chat/chat?id=${id}&name=${name}` });
    },
    hideNotifications() { this.setData({ showNotifications: false }); },
});
