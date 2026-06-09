"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../../api/user");
const validator_1 = require("../../../utils/validator");
Page({
    data: {
        nickname: '', avatar: '', bio: '', email: '',
        oldPassword: '', newPassword: '', showPasswordForm: false,
    },
    onShow() {
        const info = getApp().globalData.userInfo;
        if (info)
            this.setData({ nickname: info.nickname || '', avatar: info.avatar || '', bio: info.bio || '', email: info.email || '' });
    },
    onNickInput(e) { this.setData({ nickname: e.detail.value }); },
    onBioInput(e) { this.setData({ bio: e.detail.value }); },
    onEmailInput(e) { this.setData({ email: e.detail.value }); },
    onOldPwInput(e) { this.setData({ oldPassword: e.detail.value }); },
    onNewPwInput(e) { this.setData({ newPassword: e.detail.value }); },
    togglePw() { this.setData({ showPasswordForm: !this.data.showPasswordForm }); },
    async onSave() {
        try {
            await (0, user_1.updateProfile)({ nickname: this.data.nickname || undefined, avatar: this.data.avatar || undefined, bio: this.data.bio || undefined, email: this.data.email || undefined });
            (0, validator_1.showToast)('保存成功', 'success');
            getApp().fetchUserInfo();
        }
        catch (_a) { }
    },
    async onChangePassword() {
        const { oldPassword, newPassword } = this.data;
        if (!oldPassword || !newPassword)
            return (0, validator_1.showToast)('请填写新旧密码');
        if (newPassword.length < 6 || newPassword.length > 32)
            return (0, validator_1.showToast)('新密码为6-32位');
        try {
            await (0, user_1.changePassword)(oldPassword, newPassword);
            (0, validator_1.showToast)('密码修改成功', 'success');
            this.setData({ oldPassword: '', newPassword: '', showPasswordForm: false });
        }
        catch (_a) { }
    },
});
