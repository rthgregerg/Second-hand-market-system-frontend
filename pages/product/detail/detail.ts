import { getProductDetail, favoriteProduct, unfavoriteProduct } from '../../../api/product';
import { createOrder } from '../../../api/order';
import { payOrder } from '../../../api/order';
import { CONDITION_MAP } from '../../../utils/constants';
import { formatTime } from '../../../utils/time';
import { fullUrl } from '../../../utils/url';

Page({
  data: {
    product: null as Product | null,
    isFavorited: false,
    conditionText: '',
    timeText: '',
  },
  id: 0,

  onLoad(options: any) {
    this.id = Number(options.id);
    this.loadDetail();
  },

  async loadDetail() {
    try {
      const res = await getProductDetail(this.id);
      this.setData({
        product: res.data,
        isFavorited: res.data.isFavorited,
        conditionText: CONDITION_MAP[res.data.condition] || '',
        timeText: formatTime(res.data.createdAt),
      });
    } catch {}
  },

  async toggleFavorite() {
    if (!this.data.product) return;
    try {
      if (this.data.isFavorited) await unfavoriteProduct(this.id);
      else await favoriteProduct(this.id);
      this.setData({ isFavorited: !this.data.isFavorited });
    } catch {}
  },

  async onBuyNow() {
    const p = this.data.product;
    if (!p) return;
    const app = getApp<IAppOption>();
    if (!app.globalData.token) { wx.navigateTo({ url: '/pages/auth/login/login' }); return; }
    const r = await wx.showModal({ title: '确认购买', content: `确定要购买「${p.title}」吗？\n金额：¥${p.price}` });
    if (!r.confirm) return;
    try {
      wx.showLoading({ title: '创建订单...' });
      const orderRes = await createOrder(this.id);
      const orderId = orderRes.data.id;
      wx.hideLoading();
      const payR = await wx.showModal({ title: '确认支付', content: `订单已创建，金额：¥${p.price}`, confirmText: '微信支付', cancelText: '取消' });
      if (!payR.confirm) return;
      wx.showLoading({ title: '支付中...' });
      await payOrder(orderId, 'WECHAT');
      wx.hideLoading();
      wx.showToast({ title: '支付成功', icon: 'success' });
      setTimeout(() => { wx.redirectTo({ url: `/pages/order/detail/detail?id=${orderId}` }); }, 1000);
    } catch { wx.hideLoading(); }
  },

  onContact() {
    if (!this.data.product) return;
    wx.navigateTo({ url: `/pages/message/chat/chat?id=${this.data.product.sellerId}&name=${this.data.product.sellerName}` });
  },

  onPreviewImage(e: any) {
    const urls = this.data.product!.images.map(img => fullUrl(img));
    wx.previewImage({ current: urls[e.currentTarget.dataset.index], urls });
  },

  onSellerTap() {
    if (!this.data.product) return;
    wx.navigateTo({ url: `/pages/user/reviews/reviews?id=${this.data.product.sellerId}&name=${this.data.product.sellerName}` });
  },
});
