"use strict";
Component({
    properties: {
        rating: { type: Number, value: 0 },
        max: { type: Number, value: 5 },
        size: { type: Number, value: 32 },
        readonly: { type: Boolean, value: true },
    },
    data: { stars: [] },
    observers: {
        'rating, max'(rating, max) {
            const stars = [];
            for (let i = 1; i <= max; i++) {
                stars.push(i <= rating ? 1 : 0);
            }
            this.setData({ stars });
        },
    },
    methods: {
        onTap(e) {
            if (this.data.readonly)
                return;
            const idx = e.currentTarget.dataset.index;
            this.triggerEvent('change', { rating: idx + 1 });
        },
    },
});
