import { getOrderDetail, payOrder, shipOrder, confirmOrder, cancelOrder, requestRefund, approveRefund } from '../../../api/order';
import { createReview } from '../../../api/review';
import { ORDER_STATUS_COLOR, ORDER_ACTIONS } from '../../../utils/constants';

Page({
  data: {
    order: null as Order | null,
    isBuyer: false,
    isSeller: false,
    statusColor: '',
    actions: [] as string[],
  },
  id: 0,

  onLoad(options: any) { this.id = Number(options.id); this.loadOrder(); },

  async loadOrder() {
    try {
      const res = await getOrderDetail(this.id);
      const app = getApp<GlobalData>();
      const order = res.data;
      this.setData({
        order,
        isBuyer: order.buyerId === app.globalData.userId,
        isSeller: order.sellerId === app.globalData.userId,
        statusColor: ORDER_STATUS_COLOR[order.status],
        actions: this.getActions(order),
      });
    } catch {}
  },

  getActions(order: Order): string[] {
    const map = ORDER_ACTIONS[order.status];
    if (!map) return [];
    const result: string[] = [];
    if (this.data.isBuyer) result.push(...map.buyer);
    if (this.data.isSeller) result.push(...map.seller);
    return result;
  },

  getActionLabel(action: string): string {
    const labels: Record<string, string> = {
      pay: '去支付', cancel: '取消订单', ship: '确认发货',
      confirm: '确认收货', refund: '申请退款', approveRefund: '同意退款', review: '去评价',
    };
    return labels[action] || action;
  },

  async doAction(e: any) {
    const action = e.currentTarget.dataset.action;
    const actions: Record<string, () => Promise<void>> = {
      pay: async () => { await payOrder(this.id, 'WECHAT'); wx.showToast({ title: '支付成功', icon: 'success' }); },
      cancel: async () => { const r = await wx.showModal({ title: '确认取消订单？' }); if (r.confirm) { await cancelOrder(this.id); wx.showToast({ title: '已取消', icon: 'success' }); } },
      ship: async () => { await shipOrder(this.id); wx.showToast({ title: '已发货', icon: 'success' }); },
      confirm: async () => { const r = await wx.showModal({ title: '确认已收到货？' }); if (r.confirm) { await confirmOrder(this.id); wx.showToast({ title: '已确认收货', icon: 'success' }); } },
      refund: async () => { const r = await wx.showModal({ title: '确认申请退款？' }); if (r.confirm) { await requestRefund(this.id); wx.showToast({ title: '退款申请已提交', icon: 'success' }); } },
      approveRefund: async () => { const r = await wx.showModal({ title: '确认同意退款？' }); if (r.confirm) { await approveRefund(this.id); wx.showToast({ title: '已退款', icon: 'success' }); } },
      review: async () => { const r = await wx.showModal({ title: '发表评价', editable: true, placeholderText: '输入评价内容...' }); if (r.confirm) { await createReview(this.id, 5, r.content || undefined); wx.showToast({ title: '评价成功', icon: 'success' }); } },
    };
    if (actions[action]) { try { await actions[action](); this.loadOrder(); } catch {} }
  },
});
