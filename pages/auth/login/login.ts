import { login, register } from '../../../api/auth';
import { isValidPhone, isValidPassword, showToast } from '../../../utils/validator';

Page({
  data: {
    mode: 'login' as 'login' | 'register',
    account: '',
    password: '',
    username: '',
    phone: '',
  },

  switchMode() {
    this.setData({ mode: this.data.mode === 'login' ? 'register' : 'login' });
  },

  onAccountInput(e: any) { this.setData({ account: e.detail.value }); },
  onPasswordInput(e: any) { this.setData({ password: e.detail.value }); },
  onUsernameInput(e: any) { this.setData({ username: e.detail.value }); },
  onPhoneInput(e: any) { this.setData({ phone: e.detail.value }); },

  async onSubmit() {
    const { mode, account, password, username, phone } = this.data;

    if (mode === 'login') {
      if (!isValidPhone(account)) return showToast('请输入正确的手机号');
      if (!isValidPassword(password)) return showToast('密码为6-32位');
      try {
        const res = await login(account, password);
        this.saveAuth(res.data);
      } catch {}
    } else {
      if (!username || username.length < 2) return showToast('用户名至少2个字符');
      if (!isValidPhone(phone)) return showToast('请输入正确的手机号');
      if (!isValidPassword(password)) return showToast('密码为6-32位');
      try {
        const res = await register(username, password, phone);
        this.saveAuth(res.data);
      } catch {}
    }
  },

  saveAuth(data: { token: string; userId: number; username: string; role: string }) {
    const app = getApp<GlobalData>();
    app.globalData.token = data.token;
    app.globalData.userId = data.userId;
    app.globalData.isAdmin = data.role === 'ADMIN';
    wx.setStorageSync('token', data.token);
    wx.setStorageSync('userId', data.userId);
    app.fetchUserInfo();
    app.fetchUnreadCount();
    wx.switchTab({ url: '/pages/index/index' });
  },
});
