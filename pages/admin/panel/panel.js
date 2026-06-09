"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = require("../../../api/admin");
require("../../../components/empty-state/empty-state");
Page({
    data: {
        tabIndex: 0,
        stats: {},
        users: [],
        keyword: '',
        page: 1, hasMore: true, loading: false,
    },
    onLoad() { this.loadStats(); },
    async loadStats() { try {
        const res = await (0, admin_1.getStatistics)();
        this.setData({ stats: res.data || {} });
    }
    catch (_a) { } },
    onTabChange(e) { this.setData({ tabIndex: Number(e.currentTarget.dataset.tab) }); if (this.data.tabIndex === 1)
        this.loadUsers(true); },
    onKeywordInput(e) { this.setData({ keyword: e.detail.value }); },
    async loadUsers(reset = false) {
        const page = reset ? 1 : this.data.page;
        this.setData({ loading: true });
        try {
            const res = await (0, admin_1.getUsers)(page, 20, this.data.keyword || undefined);
            this.setData({ users: reset ? res.data.records : [...this.data.users, ...res.data.records], page: page + 1, hasMore: res.data.records.length >= 20, loading: false });
        }
        catch (_a) {
            this.setData({ loading: false });
        }
    },
    onSearch() { this.loadUsers(true); },
    onReachBottom() { if (this.data.hasMore && this.data.tabIndex === 1)
        this.loadUsers(); },
    async onToggleUser(e) {
        var _a;
        const u = e.currentTarget.dataset.user;
        const newStatus = ((_a = u.status) !== null && _a !== void 0 ? _a : 0) === 0 ? 1 : 0;
        try {
            await (0, admin_1.toggleUserStatus)(u.id, newStatus);
            wx.showToast({ title: '操作成功', icon: 'success' });
            this.loadUsers(true);
        }
        catch (_b) { }
    },
});
