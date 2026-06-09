"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_ACTIONS = exports.ORDER_STATUS_COLOR = exports.ORDER_STATUS = exports.CONDITION_MAP = exports.PRODUCT_STATUS = void 0;
exports.PRODUCT_STATUS = {
    1: '在售',
    2: '已售',
    3: '已下架',
};
exports.CONDITION_MAP = {
    1: '全新',
    2: '几乎全新',
    3: '轻微使用',
    4: '明显使用',
};
exports.ORDER_STATUS = {
    1: '待付款',
    2: '已付款',
    3: '已发货',
    4: '已收货',
    5: '已完成',
    6: '已取消',
    7: '退款中',
    8: '已退款',
};
exports.ORDER_STATUS_COLOR = {
    1: '#FF9500',
    2: '#2B7BD6',
    3: '#2B7BD6',
    4: '#2B7BD6',
    5: '#34C759',
    6: '#8E8E93',
    7: '#FF3B30',
    8: '#8E8E93',
};
exports.ORDER_ACTIONS = {
    1: { buyer: ['pay', 'cancel'], seller: [] },
    2: { buyer: ['refund'], seller: ['ship'] },
    3: { buyer: ['confirm'], seller: [] },
    4: { buyer: ['review'], seller: [] },
    5: { buyer: [], seller: [] },
    6: { buyer: [], seller: [] },
    7: { buyer: [], seller: ['approveRefund'] },
    8: { buyer: [], seller: [] },
};
