import { getConversations, getNotifications, getUnreadCount } from '../../../api/message';
import '../../../components/empty-state/empty-state';

Page({
  data: {
    conversations: [] as Conversation[],
    notifications: [] as Notification[],
    unreadNotificationCount: 0,
    showNotifications: false,
  },

  onShow() { this.loadConversations(); this.loadUnread(); },

  async loadConversations() {
    try { const res = await getConversations(); this.setData({ conversations: res.data || [] }); } catch {}
  },

  async loadUnread() {
    try {
      const res = await getUnreadCount();
      this.setData({ unreadNotificationCount: res.data?.notificationCount || 0 });
      getApp<GlobalData>().fetchUnreadCount();
    } catch {}
  },

  async loadNotifications() {
    try { const res = await getNotifications(1, 50); this.setData({ notifications: res.data.records || [], showNotifications: true }); } catch {}
  },

  onChatTap(e: any) {
    const { id, name } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/message/chat/chat?id=${id}&name=${name}` });
  },

  hideNotifications() { this.setData({ showNotifications: false }); },
});
