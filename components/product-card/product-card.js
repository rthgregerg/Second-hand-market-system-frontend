"use strict";
Component({
    properties: {
        product: {
            type: Object,
            value: {},
        },
    },
    methods: {
        onTap() {
            wx.navigateTo({ url: `/pages/product/detail/detail?id=${this.data.product.id}` });
        },
    },
});
