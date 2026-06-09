"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../../api/product");
const time_1 = require("../../../utils/time");
require("../../../components/empty-state/empty-state");
Page({
    data: { products: [], page: 1, hasMore: true, loading: false },
    onLoad() { this.load(true); },
    async load(reset = false) {
        const page = reset ? 1 : this.data.page;
        this.setData({ loading: true });
        try {
            const res = await (0, product_1.getFavorites)(page, 20);
            const list = res.data.records.map(p => (Object.assign(Object.assign({}, p), { createdAt: (0, time_1.formatTime)(p.createdAt) })));
            this.setData({ products: reset ? list : [...this.data.products, ...list], page: page + 1, hasMore: list.length >= 20, loading: false });
        }
        catch (_a) {
            this.setData({ loading: false });
        }
    },
    onReachBottom() { if (this.data.hasMore)
        this.load(); },
    onProductTap(e) { wx.navigateTo({ url: `/pages/product/detail/detail?id=${e.currentTarget.dataset.id}` }); },
    async onUnfavorite(e) {
        try {
            await (0, product_1.unfavoriteProduct)(e.currentTarget.dataset.id);
            wx.showToast({ title: '已取消收藏', icon: 'success' });
            this.load(true);
        }
        catch (_a) { }
    },
});
