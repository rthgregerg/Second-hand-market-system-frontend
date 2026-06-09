"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./api/request");
App({
    globalData: {
        token: wx.getStorageSync('token') || null,
        userId: wx.getStorageSync('userId') || null,
        userInfo: null,
        unreadCount: 0,
        isAdmin: false,
    },
    onLaunch() {
        if (this.globalData.token) {
            this.fetchUserInfo();
            this.fetchUnreadCount();
        }
    },
    fetchUserInfo() {
        (0, request_1.request)('GET', '/api/v1/user/profile').then((res) => {
            this.globalData.userInfo = res.data;
            this.globalData.isAdmin = res.data.role === 'ADMIN';
            this.globalData.userId = res.data.id;
        }).catch(() => { });
    },
    fetchUnreadCount() {
        (0, request_1.request)('GET', '/api/v1/messages/unread').then((res) => {
            const total = Object.values(res.data || {}).reduce((a, b) => a + b, 0);
            this.globalData.unreadCount = total;
            if (total > 0) {
                wx.setTabBarBadge({ index: 1, text: total > 99 ? '99+' : String(total) });
            }
            else {
                wx.removeTabBarBadge({ index: 1 });
            }
        }).catch(() => { });
    },
});
