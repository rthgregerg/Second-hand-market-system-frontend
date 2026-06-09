"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const review_1 = require("../../../api/review");
const time_1 = require("../../../utils/time");
require("../../../components/empty-state/empty-state");
require("../../../components/star-rating/star-rating");
Page({
    data: { userId: 0, userName: '', reviews: [], creditScore: 0, page: 1, hasMore: true, loading: false },
    onLoad(options) {
        this.setData({ userId: Number(options.id), userName: options.name || '' });
        wx.setNavigationBarTitle({ title: `${this.data.userName}的评价` });
        this.loadScore();
        this.loadReviews(true);
    },
    async loadScore() { try {
        const res = await (0, review_1.getCreditScore)(this.data.userId);
        this.setData({ creditScore: res.data });
    }
    catch (_a) { } },
    async loadReviews(reset = false) {
        const page = reset ? 1 : this.data.page;
        this.setData({ loading: true });
        try {
            const res = await (0, review_1.getUserReviews)(this.data.userId, page, 20);
            const list = res.data.records.map(r => (Object.assign(Object.assign({}, r), { createdAt: (0, time_1.formatTime)(r.createdAt) })));
            this.setData({ reviews: reset ? list : [...this.data.reviews, ...list], page: page + 1, hasMore: list.length >= 20, loading: false });
        }
        catch (_a) {
            this.setData({ loading: false });
        }
    },
    onReachBottom() { if (this.data.hasMore)
        this.loadReviews(); },
});
