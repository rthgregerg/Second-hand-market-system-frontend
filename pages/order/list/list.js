"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../../api/order");
const constants_1 = require("../../../utils/constants");
const time_1 = require("../../../utils/time");
require("../../../components/empty-state/empty-state");
Page({
    data: {
        tabIndex: 0,
        statusFilter: 0,
        statusMap: constants_1.ORDER_STATUS,
        statusColor: constants_1.ORDER_STATUS_COLOR,
        statusOptions: ['全部', '待付款', '已付款', '已发货', '已收货', '已完成', '已取消', '退款中', '已退款'],
        orders: [],
        page: 1, hasMore: true, loading: false,
    },
    onLoad() { this.loadOrders(true); },
    onTabChange(e) { this.setData({ tabIndex: Number(e.currentTarget.dataset.tab), statusFilter: 0 }); this.loadOrders(true); },
    onStatusFilter(e) { this.setData({ statusFilter: Number(e.currentTarget.dataset.status) }); this.loadOrders(true); },
    async loadOrders(reset = false) {
        if (this.data.loading)
            return;
        const page = reset ? 1 : this.data.page;
        this.setData({ loading: true });
        try {
            const fn = this.data.tabIndex === 0 ? order_1.getBoughtOrders : order_1.getSoldOrders;
            const res = await fn(page, 10, this.data.statusFilter || undefined);
            const list = res.data.records.map(o => (Object.assign(Object.assign({}, o), { createdAt: (0, time_1.formatTime)(o.createdAt) })));
            this.setData({ orders: reset ? list : [...this.data.orders, ...list], page: page + 1, hasMore: list.length >= 10, loading: false });
        }
        catch (_a) {
            this.setData({ loading: false });
        }
    },
    onReachBottom() { if (this.data.hasMore)
        this.loadOrders(); },
    onOrderTap(e) { wx.navigateTo({ url: `/pages/order/detail/detail?id=${e.currentTarget.dataset.id}` }); },
});
