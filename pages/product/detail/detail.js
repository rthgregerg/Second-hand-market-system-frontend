"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../../api/product");
const order_1 = require("../../../api/order");
const order_2 = require("../../../api/order");
const constants_1 = require("../../../utils/constants");
const time_1 = require("../../../utils/time");
const url_1 = require("../../../utils/url");
Page({
    data: {
        product: null,
        isFavorited: false,
        conditionText: '',
        timeText: '',
    },
    id: 0,
    onLoad(options) {
        this.id = Number(options.id);
        this.loadDetail();
    },
    async loadDetail() {
        try {
            const res = await (0, product_1.getProductDetail)(this.id);
            this.setData({
                product: res.data,
                isFavorited: res.data.isFavorited,
                conditionText: constants_1.CONDITION_MAP[res.data.condition] || '',
                timeText: (0, time_1.formatTime)(res.data.createdAt),
            });
        }
        catch (_a) { }
    },
    async toggleFavorite() {
        if (!this.data.product)
            return;
        try {
            if (this.data.isFavorited)
                await (0, product_1.unfavoriteProduct)(this.id);
            else
                await (0, product_1.favoriteProduct)(this.id);
            this.setData({ isFavorited: !this.data.isFavorited });
        }
        catch (_a) { }
    },
    async onBuyNow() {
        const p = this.data.product;
        if (!p)
            return;
        const app = getApp();
        if (!app.globalData.token) {
            wx.navigateTo({ url: '/pages/auth/login/login' });
            return;
        }
        const r = await wx.showModal({ title: '确认购买', content: `确定要购买「${p.title}」吗？\n金额：¥${p.price}` });
        if (!r.confirm)
            return;
        try {
            wx.showLoading({ title: '创建订单...' });
            const orderRes = await (0, order_1.createOrder)(this.id);
            const orderId = orderRes.data.id;
            wx.hideLoading();
            const payR = await wx.showModal({ title: '确认支付', content: `订单已创建，金额：¥${p.price}`, confirmText: '微信支付', cancelText: '取消' });
            if (!payR.confirm)
                return;
            wx.showLoading({ title: '支付中...' });
            await (0, order_2.payOrder)(orderId, 'WECHAT');
            wx.hideLoading();
            wx.showToast({ title: '支付成功', icon: 'success' });
            setTimeout(() => { wx.redirectTo({ url: `/pages/order/detail/detail?id=${orderId}` }); }, 1000);
        }
        catch (_a) {
            wx.hideLoading();
        }
    },
    onContact() {
        if (!this.data.product)
            return;
        wx.navigateTo({ url: `/pages/message/chat/chat?id=${this.data.product.sellerId}&name=${this.data.product.sellerName}` });
    },
    onPreviewImage(e) {
        const urls = this.data.product.images.map(img => (0, url_1.fullUrl)(img));
        wx.previewImage({ current: urls[e.currentTarget.dataset.index], urls });
    },
    onSellerTap() {
        if (!this.data.product)
            return;
        wx.navigateTo({ url: `/pages/user/reviews/reviews?id=${this.data.product.sellerId}&name=${this.data.product.sellerName}` });
    },
});
