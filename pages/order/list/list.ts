import { getBoughtOrders, getSoldOrders } from '../../../api/order';
import { ORDER_STATUS, ORDER_STATUS_COLOR } from '../../../utils/constants';
import { formatTime } from '../../../utils/time';

Page({
  data: {
    tabIndex: 0,
    statusFilter: 0,
    statusMap: ORDER_STATUS,
    statusColor: ORDER_STATUS_COLOR,
    statusOptions: ['全部', '待付款', '已付款', '已发货', '已收货', '已完成', '已取消', '退款中', '已退款'],
    orders: [] as Order[],
    page: 1, hasMore: true, loading: false,
  },

  onLoad() { this.loadOrders(true); },

  onTabChange(e: any) { this.setData({ tabIndex: Number(e.currentTarget.dataset.tab), statusFilter: 0 }); this.loadOrders(true); },

  onStatusFilter(e: any) { this.setData({ statusFilter: Number(e.currentTarget.dataset.status) }); this.loadOrders(true); },

  async loadOrders(reset: boolean = false) {
    if (this.data.loading) return;
    const page = reset ? 1 : this.data.page;
    this.setData({ loading: true });
    try {
      const fn = this.data.tabIndex === 0 ? getBoughtOrders : getSoldOrders;
      const res = await fn(page, 10, this.data.statusFilter || undefined);
      const list = res.data.records.map(o => ({ ...o, createdAt: formatTime(o.createdAt) }));
      this.setData({ orders: reset ? list : [...this.data.orders, ...list], page: page + 1, hasMore: list.length >= 10, loading: false });
    } catch { this.setData({ loading: false }); }
  },

  onReachBottom() { if (this.data.hasMore) this.loadOrders(); },
  onOrderTap(e: any) { wx.navigateTo({ url: `/pages/order/detail/detail?id=${e.currentTarget.dataset.id}` }); },
});
