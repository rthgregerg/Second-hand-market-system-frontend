"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../../../api/auth");
const validator_1 = require("../../../utils/validator");
Page({
    data: {
        mode: 'login',
        account: '',
        password: '',
        username: '',
        phone: '',
    },
    switchMode() {
        this.setData({ mode: this.data.mode === 'login' ? 'register' : 'login' });
    },
    onAccountInput(e) { this.setData({ account: e.detail.value }); },
    onPasswordInput(e) { this.setData({ password: e.detail.value }); },
    onUsernameInput(e) { this.setData({ username: e.detail.value }); },
    onPhoneInput(e) { this.setData({ phone: e.detail.value }); },
    async onSubmit() {
        const { mode, account, password, username, phone } = this.data;
        if (mode === 'login') {
            if (!(0, validator_1.isValidPhone)(account))
                return (0, validator_1.showToast)('请输入正确的手机号');
            if (!(0, validator_1.isValidPassword)(password))
                return (0, validator_1.showToast)('密码为6-32位');
            try {
                const res = await (0, auth_1.login)(account, password);
                this.saveAuth(res.data);
            }
            catch (_a) { }
        }
        else {
            if (!username || username.length < 2)
                return (0, validator_1.showToast)('用户名至少2个字符');
            if (!(0, validator_1.isValidPhone)(phone))
                return (0, validator_1.showToast)('请输入正确的手机号');
            if (!(0, validator_1.isValidPassword)(password))
                return (0, validator_1.showToast)('密码为6-32位');
            try {
                const res = await (0, auth_1.register)(username, password, phone);
                this.saveAuth(res.data);
            }
            catch (_b) { }
        }
    },
    saveAuth(data) {
        const app = getApp();
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
