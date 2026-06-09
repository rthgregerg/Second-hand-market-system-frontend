"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../api/product");
const category_1 = require("../../api/category");
const constants_1 = require("../../utils/constants");
const time_1 = require("../../utils/time");
require("../../components/empty-state/empty-state");
Page({
    data: {
        keyword: '',
        products: [],
        categories: [],
        activeCategoryId: 0,
        conditionIndex: -1,
        conditionOptions: ['全部成色', ...Object.values(constants_1.CONDITION_MAP)],
        minPrice: '',
        maxPrice: '',
        showFilter: false,
        page: 1,
        hasMore: true,
        loading: false,
    },
    onLoad() {
        (0, category_1.getCategoryTree)().then(res => this.setData({ categories: res.data || [] })).catch(() => { });
    },
    onSearchInput(e) { this.setData({ keyword: e.detail.value }); },
    onSearchConfirm() { this.loadProducts(true); },
    onMinPriceInput(e) { this.setData({ minPrice: e.detail.value }); },
    onMaxPriceInput(e) { this.setData({ maxPrice: e.detail.value }); },
    toggleFilter() { this.setData({ showFilter: !this.data.showFilter }); },
    async loadProducts(reset = false) {
        if (this.data.loading)
            return;
        const page = reset ? 1 : this.data.page;
        this.setData({ loading: true });
        try {
            const res = await (0, product_1.searchProducts)({
                keyword: this.data.keyword || undefined,
                categoryId: this.data.activeCategoryId || undefined,
                condition: this.data.conditionIndex > 0 ? this.data.conditionIndex : undefined,
                minPrice: this.data.minPrice ? Number(this.data.minPrice) : undefined,
                maxPrice: this.data.maxPrice ? Number(this.data.maxPrice) : undefined,
                page,
                size: 20,
            });
            const list = res.data.records.map(p => (Object.assign(Object.assign({}, p), { createdAt: (0, time_1.formatTime)(p.createdAt) })));
            this.setData({
                products: reset ? list : [...this.data.products, ...list],
                page: page + 1,
                hasMore: list.length >= 20,
                loading: false,
                showFilter: false,
            });
        }
        catch (_a) {
            this.setData({ loading: false });
        }
    },
    onClear() {
        this.setData({ keyword: '', activeCategoryId: 0, conditionIndex: -1, minPrice: '', maxPrice: '' });
        this.loadProducts(true);
    },
    onCategoryTap(e) { this.setData({ activeCategoryId: e.currentTarget.dataset.id }); },
    onConditionChange(e) { this.setData({ conditionIndex: Number(e.detail.value) }); },
    onReachBottom() { if (this.data.hasMore)
        this.loadProducts(); },
    onProductTap(e) { wx.navigateTo({ url: `/pages/product/detail/detail?id=${e.currentTarget.dataset.id}` }); },
});
