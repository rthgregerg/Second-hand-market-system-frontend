"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../api/product");
const category_1 = require("../../api/category");
const time_1 = require("../../utils/time");
require("../../components/product-card/product-card");
require("../../components/empty-state/empty-state");
Page({
    data: {
        products: [],
        categories: [],
        activeCategoryId: 0,
        keyword: '',
        page: 1,
        hasMore: true,
        loading: false,
        refreshing: false,
        leftList: [],
        rightList: [],
    },
    onLoad() {
        this.loadCategories();
        this.loadProducts();
    },
    onShow() {
        getApp().fetchUnreadCount();
    },
    async loadCategories() {
        try {
            const res = await (0, category_1.getCategoryTree)();
            this.setData({ categories: res.data || [] });
        }
        catch (_a) { }
    },
    async loadProducts(reset = false) {
        if (this.data.loading)
            return;
        const page = reset ? 1 : this.data.page;
        this.setData({ loading: true });
        try {
            const res = await (0, product_1.searchProducts)({
                keyword: this.data.keyword || undefined,
                categoryId: this.data.activeCategoryId || undefined,
                page,
                size: 20,
            });
            const records = res.data.records.map(p => (Object.assign(Object.assign({}, p), { createdAt: (0, time_1.formatTime)(p.createdAt) })));
            const products = reset ? records : [...this.data.products, ...records];
            const [left, right] = this.splitWaterfall(products);
            this.setData({
                products,
                leftList: left,
                rightList: right,
                page: page + 1,
                hasMore: records.length >= 20,
                loading: false,
                refreshing: false,
            });
        }
        catch (_a) {
            this.setData({ loading: false, refreshing: false });
        }
    },
    splitWaterfall(list) {
        const left = [];
        const right = [];
        let leftH = 0, rightH = 0;
        list.forEach(p => {
            const h = 300 + (p.title.length * 0.8) + (p.description ? 50 : 0);
            if (leftH <= rightH) {
                left.push(p);
                leftH += h;
            }
            else {
                right.push(p);
                rightH += h;
            }
        });
        return [left, right];
    },
    onRefresh() {
        this.setData({ refreshing: true });
        this.loadProducts(true);
    },
    onReachBottom() {
        if (this.data.hasMore)
            this.loadProducts();
    },
    onSearch() {
        wx.navigateTo({ url: '/pages/search/search' });
    },
    onCategoryTap(e) {
        const id = e.currentTarget.dataset.id;
        this.setData({ activeCategoryId: id === this.data.activeCategoryId ? 0 : id });
        this.loadProducts(true);
    },
});
