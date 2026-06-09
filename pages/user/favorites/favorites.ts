import { getFavorites, unfavoriteProduct } from '../../../api/product';
import { formatTime } from '../../../utils/time';
import '../../../components/empty-state/empty-state';

Page({
  data: { products: [] as Product[], page: 1, hasMore: true, loading: false },
  onLoad() { this.load(true); },
  async load(reset = false) {
    const page = reset ? 1 : this.data.page;
    this.setData({ loading: true });
    try {
      const res = await getFavorites(page, 20);
      const list = res.data.records.map(p => ({ ...p, createdAt: formatTime(p.createdAt) }));
      this.setData({ products: reset ? list : [...this.data.products, ...list], page: page + 1, hasMore: list.length >= 20, loading: false });
    } catch { this.setData({ loading: false }); }
  },
  onReachBottom() { if (this.data.hasMore) this.load(); },
  onProductTap(e: any) { wx.navigateTo({ url: `/pages/product/detail/detail?id=${e.currentTarget.dataset.id}` }); },
  async onUnfavorite(e: any) {
    try { await unfavoriteProduct(e.currentTarget.dataset.id); wx.showToast({ title: '已取消收藏', icon: 'success' }); this.load(true); } catch {}
  },
});
