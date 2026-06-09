import { updateProfile, changePassword } from '../../../api/user';
import { showToast } from '../../../utils/validator';

Page({
  data: {
    nickname: '', avatar: '', bio: '', email: '',
    oldPassword: '', newPassword: '', showPasswordForm: false,
  },
  onShow() {
    const info = getApp<GlobalData>().userInfo;
    if (info) this.setData({ nickname: info.nickname || '', avatar: info.avatar || '', bio: info.bio || '', email: info.email || '' });
  },
  onNickInput(e: any) { this.setData({ nickname: e.detail.value }); },
  onBioInput(e: any) { this.setData({ bio: e.detail.value }); },
  onEmailInput(e: any) { this.setData({ email: e.detail.value }); },
  onOldPwInput(e: any) { this.setData({ oldPassword: e.detail.value }); },
  onNewPwInput(e: any) { this.setData({ newPassword: e.detail.value }); },
  togglePw() { this.setData({ showPasswordForm: !this.data.showPasswordForm }); },

  async onSave() {
    try {
      await updateProfile({ nickname: this.data.nickname || undefined, avatar: this.data.avatar || undefined, bio: this.data.bio || undefined, email: this.data.email || undefined });
      showToast('保存成功', 'success');
      getApp<GlobalData>().fetchUserInfo();
    } catch {}
  },

  async onChangePassword() {
    const { oldPassword, newPassword } = this.data;
    if (!oldPassword || !newPassword) return showToast('请填写新旧密码');
    if (newPassword.length < 6 || newPassword.length > 32) return showToast('新密码为6-32位');
    try { await changePassword(oldPassword, newPassword); showToast('密码修改成功', 'success'); this.setData({ oldPassword: '', newPassword: '', showPasswordForm: false }); } catch {}
  },
});
