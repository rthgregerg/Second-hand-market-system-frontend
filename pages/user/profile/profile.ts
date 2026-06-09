Page({
  data: {
    userInfo: null as UserInfo | null,
    isAdmin: false,
  },

  onShow() {
    const app = getApp<GlobalData>();
    this.setData({ userInfo: app.globalData.userInfo, isAdmin: app.globalData.isAdmin });
  },

  onEditProfile() { wx.navigateTo({ url: '/pages/user/edit-profile/edit-profile' }); },
  onMyProducts() { wx.navigateTo({ url: '/pages/user/my-products/my-products' }); },
  onFavorites() { wx.navigateTo({ url: '/pages/user/favorites/favorites' }); },
  onReviews() {
    const app = getApp<GlobalData>();
    wx.navigateTo({ url: `/pages/user/reviews/reviews?id=${app.globalData.userId}&name=${app.globalData.userInfo?.nickname || '我'}` });
  },
  onAdmin() { wx.navigateTo({ url: '/pages/admin/panel/panel' }); },

  onLogout() {
    wx.showModal({
      title: '确认退出登录？',
      success: (res) => {
        if (!res.confirm) return;
        const app = getApp<GlobalData>();
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
