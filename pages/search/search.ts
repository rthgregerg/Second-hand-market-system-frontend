import { searchProducts } from '../../api/product';
import { getCategoryTree } from '../../api/category';
import { CONDITION_MAP } from '../../utils/constants';
import { formatTime } from '../../utils/time';
import '../../components/empty-state/empty-state';

Page({
  data: {
    keyword: '',
    products: [] as Product[],
    categories: [] as Category[],
    activeCategoryId: 0,
    conditionIndex: -1,
    conditionOptions: ['全部成色', ...Object.values(CONDITION_MAP)],
    minPrice: '',
    maxPrice: '',
    showFilter: false,
    page: 1,
    hasMore: true,
    loading: false,
  },

  onLoad() {
    getCategoryTree().then(res => this.setData({ categories: res.data || [] })).catch(() => {});
  },

  onSearchInput(e: any) { this.setData({ keyword: e.detail.value }); },
  onSearchConfirm() { this.loadProducts(true); },
  onMinPriceInput(e: any) { this.setData({ minPrice: e.detail.value }); },
  onMaxPriceInput(e: any) { this.setData({ maxPrice: e.detail.value }); },

  toggleFilter() { this.setData({ showFilter: !this.data.showFilter }); },

  async loadProducts(reset: boolean = false) {
    if (this.data.loading) return;
    const page = reset ? 1 : this.data.page;
    this.setData({ loading: true });
    try {
      const res = await searchProducts({
        keyword: this.data.keyword || undefined,
        categoryId: this.data.activeCategoryId || undefined,
        condition: this.data.conditionIndex > 0 ? this.data.conditionIndex : undefined,
        minPrice: this.data.minPrice ? Number(this.data.minPrice) : undefined,
        maxPrice: this.data.maxPrice ? Number(this.data.maxPrice) : undefined,
        page,
        size: 20,
      });
      const list = res.data.records.map(p => ({ ...p, createdAt: formatTime(p.createdAt) }));
      this.setData({
        products: reset ? list : [...this.data.products, ...list],
        page: page + 1,
        hasMore: list.length >= 20,
        loading: false,
        showFilter: false,
      });
    } catch { this.setData({ loading: false }); }
  },

  onClear() {
    this.setData({ keyword: '', activeCategoryId: 0, conditionIndex: -1, minPrice: '', maxPrice: '' });
    this.loadProducts(true);
  },

  onCategoryTap(e: any) { this.setData({ activeCategoryId: e.currentTarget.dataset.id }); },
  onConditionChange(e: any) { this.setData({ conditionIndex: Number(e.detail.value) }); },
  onReachBottom() { if (this.data.hasMore) this.loadProducts(); },
  onProductTap(e: any) { wx.navigateTo({ url: `/pages/product/detail/detail?id=${e.currentTarget.dataset.id}` }); },
});
