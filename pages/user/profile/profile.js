"use strict";
Page({
    data: {
        userInfo: null,
        isAdmin: false,
    },
    onShow() {
        const app = getApp();
        this.setData({ userInfo: app.globalData.userInfo, isAdmin: app.globalData.isAdmin });
    },
    onEditProfile() { wx.navigateTo({ url: '/pages/user/edit-profile/edit-profile' }); },
    onMyProducts() { wx.navigateTo({ url: '/pages/user/my-products/my-products' }); },
    onFavorites() { wx.navigateTo({ url: '/pages/user/favorites/favorites' }); },
    onReviews() {
        var _a;
        const app = getApp();
        wx.navigateTo({ url: `/pages/user/reviews/reviews?id=${app.globalData.userId}&name=${((_a = app.globalData.userInfo) === null || _a === void 0 ? void 0 : _a.nickname) || '我'}` });
    },
    onAdmin() { wx.navigateTo({ url: '/pages/admin/panel/panel' }); },
    onLogout() {
        wx.showModal({
            title: '确认退出登录？',
            success: (res) => {
                if (!res.confirm)
                    return;
                const app = getApp();
                app.globalData.token = null;
                app.globalData.userId = null;
                app.globalData.userInfo = null;
                app.globalData.isAdmin = false;
                wx.removeStorageSync('token');
                wx.removeStorageSync('userId');
                wx.reLaunch({ url: '/pages/auth/login/login' });
            },
        });
    },
});
