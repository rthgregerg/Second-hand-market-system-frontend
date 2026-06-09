"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../../api/order");
const review_1 = require("../../../api/review");
const constants_1 = require("../../../utils/constants");
Page({
    data: {
        order: null,
        isBuyer: false,
        isSeller: false,
        statusColor: '',
        actions: [],
    },
    id: 0,
    onLoad(options) { this.id = Number(options.id); this.loadOrder(); },
    async loadOrder() {
        try {
            const res = await (0, order_1.getOrderDetail)(this.id);
            const app = getApp();
            const order = res.data;
            this.setData({
                order,
                isBuyer: order.buyerId === app.globalData.userId,
                isSeller: order.sellerId === app.globalData.userId,
                statusColor: constants_1.ORDER_STATUS_COLOR[order.status],
                actions: this.getActions(order),
            });
        }
        catch (_a) { }
    },
    getActions(order) {
        const map = constants_1.ORDER_ACTIONS[order.status];
        if (!map)
            return [];
        const result = [];
        if (this.data.isBuyer)
            result.push(...map.buyer);
        if (this.data.isSeller)
            result.push(...map.seller);
        return result;
    },
    getActionLabel(action) {
        const labels = {
            pay: '去支付', cancel: '取消订单', ship: '确认发货',
            confirm: '确认收货', refund: '申请退款', approveRefund: '同意退款', review: '去评价',
        };
        return labels[action] || action;
    },
    async doAction(e) {
        const action = e.currentTarget.dataset.action;
        const actions = {
            pay: async () => { await (0, order_1.payOrder)(this.id, 'WECHAT'); wx.showToast({ title: '支付成功', icon: 'success' }); },
            cancel: async () => { const r = await wx.showModal({ title: '确认取消订单？' }); if (r.confirm) {
                await (0, order_1.cancelOrder)(this.id);
                wx.showToast({ title: '已取消', icon: 'success' });
            } },
            ship: async () => { await (0, order_1.shipOrder)(this.id); wx.showToast({ title: '已发货', icon: 'success' }); },
            confirm: async () => { const r = await wx.showModal({ title: '确认已收到货？' }); if (r.confirm) {
                await (0, order_1.confirmOrder)(this.id);
                wx.showToast({ title: '已确认收货', icon: 'success' });
            } },
            refund: async () => { const r = await wx.showModal({ title: '确认申请退款？' }); if (r.confirm) {
                await (0, order_1.requestRefund)(this.id);
                wx.showToast({ title: '退款申请已提交', icon: 'success' });
            } },
            approveRefund: async () => { const r = await wx.showModal({ title: '确认同意退款？' }); if (r.confirm) {
                await (0, order_1.approveRefund)(this.id);
                wx.showToast({ title: '已退款', icon: 'success' });
            } },
            review: async () => { const r = await wx.showModal({ title: '发表评价', editable: true, placeholderText: '输入评价内容...' }); if (r.confirm) {
                await (0, review_1.createReview)(this.id, 5, r.content || undefined);
                wx.showToast({ title: '评价成功', icon: 'success' });
            } },
        };
        if (actions[action]) {
            try {
                await actions[action]();
                this.loadOrder();
            }
            catch (_a) { }
        }
    },
});
