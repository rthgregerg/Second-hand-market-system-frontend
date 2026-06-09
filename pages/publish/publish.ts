import { publishProduct, updateProduct, getProductDetail } from '../../api/product';
import { uploadMultipleImages } from '../../api/upload';
import { getCategoryTree } from '../../api/category';
import { CONDITION_MAP } from '../../utils/constants';
import { showToast } from '../../utils/validator';

Page({
  data: {
    isEdit: false,
    editId: 0,
    images: [] as string[],
    title: '',
    description: '',
    categoryId: 0,
    categoryName: '请选择分类',
    categories: [] as Category[],
    showCategoryPicker: false,
    price: '',
    originalPrice: '',
    condition: 0,
    conditionName: '请选择成色',
    conditionOptions: ['', ...Object.values(CONDITION_MAP)],
    location: '',
    submitting: false,
  },

  onLoad(options: any) {
    this.loadCategories();
    if (options.id) {
      this.setData({ isEdit: true, editId: Number(options.id) });
      wx.setNavigationBarTitle({ title: '编辑商品' });
      this.loadProduct(Number(options.id));
    }
  },

  async loadProduct(id: number) {
    try {
      const res = await getProductDetail(id);
      const p = res.data;
      this.setData({
        images: p.images || [], title: p.title, description: p.description || '',
        categoryId: p.categoryId, categoryName: p.categoryName,
        price: String(p.price), originalPrice: p.originalPrice ? String(p.originalPrice) : '',
        condition: p.condition, conditionName: CONDITION_MAP[p.condition], location: p.location || '',
      });
    } catch {}
  },

  async loadCategories() {
    try { const res = await getCategoryTree(); this.setData({ categories: res.data || [] }); } catch {}
  },

  onChooseImages() {
    const max = 9;
    wx.chooseMedia({
      count: max - this.data.images.length, mediaType: ['image'],
      success: (res) => { this.setData({ images: [...this.data.images, ...res.tempFiles.map(f => f.tempFilePath)] }); },
    });
  },

  onDeleteImage(e: any) {
    const imgs = [...this.data.images]; imgs.splice(e.currentTarget.dataset.index, 1); this.setData({ images: imgs });
  },

  onTitleInput(e: any) { this.setData({ title: e.detail.value }); },
  onDescInput(e: any) { this.setData({ description: e.detail.value }); },
  onPriceInput(e: any) { this.setData({ price: e.detail.value }); },
  onOriginalInput(e: any) { this.setData({ originalPrice: e.detail.value }); },
  onLocationInput(e: any) { this.setData({ location: e.detail.value }); },

  onCategoryTap() { this.setData({ showCategoryPicker: true }); },
  onClosePicker() { this.setData({ showCategoryPicker: false }); },
  onCategorySelect(e: any) {
    const cat = this.data.categories[e.currentTarget.dataset.index];
    this.setData({ categoryId: cat.id, categoryName: cat.name, showCategoryPicker: false });
  },

  onConditionChange(e: any) {
    const idx = Number(e.detail.value);
    this.setData({ condition: idx, conditionName: this.data.conditionOptions[idx] || '' });
  },

  async onSubmit() {
    const { title, categoryId, price, condition, images, description, originalPrice, location } = this.data;
    if (!title.trim()) return showToast('请输入标题');
    if (!categoryId) return showToast('请选择分类');
    if (!price || isNaN(Number(price)) || Number(price) <= 0) return showToast('请输入正确价格');
    if (!condition) return showToast('请选择成色');
    if (images.length === 0) return showToast('请上传图片');

    this.setData({ submitting: true });
    wx.showLoading({ title: '发布中...' });

    try {
      const localPaths = images.filter(i => !i.startsWith('http'));
      let urls = images.filter(i => i.startsWith('http'));
      if (localPaths.length > 0) {
        const uploaded = await uploadMultipleImages(localPaths);
        urls = [...urls, ...uploaded];
      }
      const data: ProductRequest = {
        title: title.trim(), description: description.trim() || undefined,
        categoryId, price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        condition, location: location.trim() || undefined, images: urls,
      };
      if (this.data.isEdit) await updateProduct(this.data.editId, data);
      else await publishProduct(data);
      wx.hideLoading();
      showToast('发布成功', 'success');
      setTimeout(() => { wx.switchTab({ url: '/pages/index/index' }); }, 1500);
    } catch { wx.hideLoading(); }
    this.setData({ submitting: false });
  },
});
