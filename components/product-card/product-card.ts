Component({
  properties: {
    product: {
      type: Object,
      value: {} as Product,
    },
  },
  methods: {
    onTap() {
      wx.navigateTo({ url: `/pages/product/detail/detail?id=${this.data.product.id}` });
    },
  },
});
