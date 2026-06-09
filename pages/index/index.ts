import { searchProducts } from '../../api/product';
import { getCategoryTree } from '../../api/category';
import { formatTime } from '../../utils/time';
import '../../components/product-card/product-card';
import '../../components/empty-state/empty-state';

Page({
  data: {
    products: [] as Product[],
    categories: [] as Category[],
    activeCategoryId: 0,
    keyword: '',
    page: 1,
    hasMore: true,
    loading: false,
    refreshing: false,
    leftList: [] as Product[],
    rightList: [] as Product[],
  },

  onLoad() {
    this.loadCategories();
    this.loadProducts();
  },

  onShow() {
    getApp<IAppOption>().fetchUnreadCount();
  },

  async loadCategories() {
    try {
      const res = await getCategoryTree();
      this.setData({ categories: res.data || [] });
    } catch {}
  },

  async loadProducts(reset: boolean = false) {
    if (this.data.loading) return;
    const page = reset ? 1 : this.data.page;
    this.setData({ loading: true });

    try {
      const res = await searchProducts({
        keyword: this.data.keyword || undefined,
        categoryId: this.data.activeCategoryId || undefined,
        page,
        size: 20,
      });
      const records = res.data.records.map(p => ({
        ...p,
        createdAt: formatTime(p.createdAt),
      }));
      const products = reset ? records : [...this.data.products, ...records];
      const [left, right] = this.splitWaterfall(products);
      this.setData({
        products,
        leftList: left as Product[],
        rightList: right as Product[],
        page: page + 1,
        hasMore: records.length >= 20,
        loading: false,
        refreshing: false,
      });
    } catch {
      this.setData({ loading: false, refreshing: false });
    }
  },

  splitWaterfall(list: Product[]): [Product[], Product[]] {
    const left: Product[] = [];
    const right: Product[] = [];
    let leftH = 0, rightH = 0;
    list.forEach(p => {
      const h = 300 + (p.title.length * 0.8) + (p.description ? 50 : 0);
      if (leftH <= rightH) { left.push(p); leftH += h; }
      else { right.push(p); rightH += h; }
    });
    return [left, right];
  },

  onRefresh() {
    this.setData({ refreshing: true });
    this.loadProducts(true);
  },

  onReachBottom() {
    if (this.data.hasMore) this.loadProducts();
  },

  onSearch() {
    wx.navigateTo({ url: '/pages/search/search' });
  },

  onCategoryTap(e: any) {
    const id = e.currentTarget.dataset.id;
    this.setData({ activeCategoryId: id === this.data.activeCategoryId ? 0 : id });
    this.loadProducts(true);
  },
});
