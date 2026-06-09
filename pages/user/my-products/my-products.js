"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../../api/product");
const time_1 = require("../../../utils/time");
const constants_1 = require("../../../utils/constants");
require("../../../components/empty-state/empty-state");
Page({
    data: {
        products: [],
        statusFilter: 0,
        statusMap: constants_1.PRODUCT_STATUS,
        page: 1, hasMore: true, loading: false,
    },
    onLoad() { this.load(true); },
    onStatusTap(e) { this.setData({ statusFilter: Number(e.currentTarget.dataset.status) }); this.load(true); },
    async load(reset = false) {
        const page = reset ? 1 : this.data.page;
        this.setData({ loading: true });
        try {
            const res = await (0, product_1.getMyProducts)(page, 20, this.data.statusFilter || undefined);
            const list = res.data.records.map(p => (Object.assign(Object.assign({}, p), { createdAt: (0, time_1.formatTime)(p.createdAt) })));
            this.setData({ products: reset ? list : [...this.data.products, ...list], page: page + 1, hasMore: list.length >= 20, loading: false });
        }
        catch (_a) {
            this.setData({ loading: false });
        }
    },
    async toggleShelf(e) {
        const p = e.currentTarget.dataset.product;
        try {
            if (p.status === 1)
                await (0, product_1.offShelf)(p.id);
            else if (p.status === 3)
                await (0, product_1.onShelf)(p.id);
            wx.showToast({ title: '操作成功', icon: 'success' });
            this.load(true);
        }
        catch (_a) { }
    },
    onEdit(e) { wx.navigateTo({ url: `/pages/publish/publish?id=${e.currentTarget.dataset.id}` }); },
    onReachBottom() { if (this.data.hasMore)
        this.load(); },
});
