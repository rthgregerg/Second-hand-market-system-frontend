import { getUsers, toggleUserStatus, getStatistics } from '../../../api/admin';

Page({
  data: {
    tabIndex: 0,
    stats: {} as Record<string, any>,
    users: [] as UserInfo[],
    keyword: '',
    page: 1, hasMore: true, loading: false,
  },
  onLoad() { this.loadStats(); },
  async loadStats() { try { const res = await getStatistics(); this.setData({ stats: res.data || {} }); } catch {} },
  onTabChange(e: any) { this.setData({ tabIndex: Number(e.currentTarget.dataset.tab) }); if (this.data.tabIndex === 1) this.loadUsers(true); },
  onKeywordInput(e: any) { this.setData({ keyword: e.detail.value }); },

  async loadUsers(reset = false) {
    const page = reset ? 1 : this.data.page;
    this.setData({ loading: true });
    try {
      const res = await getUsers(page, 20, this.data.keyword || undefined);
      this.setData({ users: reset ? res.data.records : [...this.data.users, ...res.data.records], page: page + 1, hasMore: res.data.records.length >= 20, loading: false });
    } catch { this.setData({ loading: false }); }
  },

  onSearch() { this.loadUsers(true); },
  onReachBottom() { if (this.data.hasMore && this.data.tabIndex === 1) this.loadUsers(); },

  async onToggleUser(e: any) {
    const u: UserInfo = e.currentTarget.dataset.user;
    const newStatus = (u.status ?? 0) === 0 ? 1 : 0;
    try { await toggleUserStatus(u.id, newStatus); wx.showToast({ title: '操作成功', icon: 'success' }); this.loadUsers(true); } catch {}
  },
});
