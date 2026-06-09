import { getMyProducts, offShelf, onShelf } from '../../../api/product';
import { formatTime } from '../../../utils/time';
import { PRODUCT_STATUS } from '../../../utils/constants';
import '../../../components/empty-state/empty-state';

Page({
  data: {
    products: [] as Product[],
    statusFilter: 0,
    statusMap: PRODUCT_STATUS,
    page: 1, hasMore: true, loading: false,
  },
  onLoad() { this.load(true); },
  onStatusTap(e: any) { this.setData({ statusFilter: Number(e.currentTarget.dataset.status) }); this.load(true); },
  async load(reset = false) {
    const page = reset ? 1 : this.data.page;
    this.setData({ loading: true });
    try {
      const res = await getMyProducts(page, 20, this.data.statusFilter || undefined);
      const list = res.data.records.map(p => ({ ...p, createdAt: formatTime(p.createdAt) }));
      this.setData({ products: reset ? list : [...this.data.products, ...list], page: page + 1, hasMore: list.length >= 20, loading: false });
    } catch { this.setData({ loading: false }); }
  },
  async toggleShelf(e: any) {
    const p: Product = e.currentTarget.dataset.product;
    try { if (p.status === 1) await offShelf(p.id); else if (p.status === 3) await onShelf(p.id); wx.showToast({ title: '操作成功', icon: 'success' }); this.load(true); } catch {}
  },
  onEdit(e: any) { wx.navigateTo({ url: `/pages/publish/publish?id=${e.currentTarget.dataset.id}` }); },
  onReachBottom() { if (this.data.hasMore) this.load(); },
});
