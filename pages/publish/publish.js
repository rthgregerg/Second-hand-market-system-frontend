"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../api/product");
const upload_1 = require("../../api/upload");
const category_1 = require("../../api/category");
const constants_1 = require("../../utils/constants");
const validator_1 = require("../../utils/validator");
Page({
    data: {
        isEdit: false,
        editId: 0,
        images: [],
        title: '',
        description: '',
        categoryId: 0,
        categoryName: '请选择分类',
        categories: [],
        showCategoryPicker: false,
        price: '',
        originalPrice: '',
        condition: 0,
        conditionName: '请选择成色',
        conditionOptions: ['', ...Object.values(constants_1.CONDITION_MAP)],
        location: '',
        submitting: false,
    },
    onLoad(options) {
        this.loadCategories();
        if (options.id) {
            this.setData({ isEdit: true, editId: Number(options.id) });
            wx.setNavigationBarTitle({ title: '编辑商品' });
            this.loadProduct(Number(options.id));
        }
    },
    async loadProduct(id) {
        try {
            const res = await (0, product_1.getProductDetail)(id);
            const p = res.data;
            this.setData({
                images: p.images || [], title: p.title, description: p.description || '',
                categoryId: p.categoryId, categoryName: p.categoryName,
                price: String(p.price), originalPrice: p.originalPrice ? String(p.originalPrice) : '',
                condition: p.condition, conditionName: constants_1.CONDITION_MAP[p.condition], location: p.location || '',
            });
        }
        catch (_a) { }
    },
    async loadCategories() {
        try {
            const res = await (0, category_1.getCategoryTree)();
            this.setData({ categories: res.data || [] });
        }
        catch (_a) { }
    },
    onChooseImages() {
        const max = 9;
        wx.chooseMedia({
            count: max - this.data.images.length, mediaType: ['image'],
            success: (res) => { this.setData({ images: [...this.data.images, ...res.tempFiles.map(f => f.tempFilePath)] }); },
        });
    },
    onDeleteImage(e) {
        const imgs = [...this.data.images];
        imgs.splice(e.currentTarget.dataset.index, 1);
        this.setData({ images: imgs });
    },
    onTitleInput(e) { this.setData({ title: e.detail.value }); },
    onDescInput(e) { this.setData({ description: e.detail.value }); },
    onPriceInput(e) { this.setData({ price: e.detail.value }); },
    onOriginalInput(e) { this.setData({ originalPrice: e.detail.value }); },
    onLocationInput(e) { this.setData({ location: e.detail.value }); },
    onCategoryTap() { this.setData({ showCategoryPicker: true }); },
    onClosePicker() { this.setData({ showCategoryPicker: false }); },
    onCategorySelect(e) {
        const cat = this.data.categories[e.currentTarget.dataset.index];
        this.setData({ categoryId: cat.id, categoryName: cat.name, showCategoryPicker: false });
    },
    onConditionChange(e) {
        const idx = Number(e.detail.value);
        this.setData({ condition: idx, conditionName: this.data.conditionOptions[idx] || '' });
    },
    async onSubmit() {
        const { title, categoryId, price, condition, images, description, originalPrice, location } = this.data;
        if (!title.trim())
            return (0, validator_1.showToast)('请输入标题');
        if (!categoryId)
            return (0, validator_1.showToast)('请选择分类');
        if (!price || isNaN(Number(price)) || Number(price) <= 0)
            return (0, validator_1.showToast)('请输入正确价格');
        if (!condition)
            return (0, validator_1.showToast)('请选择成色');
        if (images.length === 0)
            return (0, validator_1.showToast)('请上传图片');
        this.setData({ submitting: true });
        wx.showLoading({ title: '发布中...' });
        try {
            const localPaths = images.filter(i => !i.startsWith('http'));
            let urls = images.filter(i => i.startsWith('http'));
            if (localPaths.length > 0) {
                const uploaded = await (0, upload_1.uploadMultipleImages)(localPaths);
                urls = [...urls, ...uploaded];
            }
            const data = {
                title: title.trim(), description: description.trim() || undefined,
                categoryId, price: Number(price),
                originalPrice: originalPrice ? Number(originalPrice) : undefined,
                condition, location: location.trim() || undefined, images: urls,
            };
            if (this.data.isEdit)
                await (0, product_1.updateProduct)(this.data.editId, data);
            else
                await (0, product_1.publishProduct)(data);
            wx.hideLoading();
            (0, validator_1.showToast)('发布成功', 'success');
            setTimeout(() => { wx.switchTab({ url: '/pages/index/index' }); }, 1500);
        }
        catch (_a) {
            wx.hideLoading();
        }
        this.setData({ submitting: false });
    },
});
