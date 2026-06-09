"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveRefund = exports.requestRefund = exports.cancelOrder = exports.confirmOrder = exports.shipOrder = exports.payOrder = exports.getBoughtOrders = exports.getSoldOrders = exports.getOrderDetail = exports.createOrder = void 0;
const request_1 = require("./request");
function createOrder(productId, remark) {
    return (0, request_1.post)('/api/v1/orders', { productId, remark });
}
exports.createOrder = createOrder;
function getOrderDetail(id) {
    return (0, request_1.get)(`/api/v1/orders/${id}`);
}
exports.getOrderDetail = getOrderDetail;
function getSoldOrders(page = 1, size = 10, status) {
    return (0, request_1.get)('/api/v1/orders/sold', { page, size, status });
}
exports.getSoldOrders = getSoldOrders;
function getBoughtOrders(page = 1, size = 10, status) {
    return (0, request_1.get)('/api/v1/orders/bought', { page, size, status });
}
exports.getBoughtOrders = getBoughtOrders;
function payOrder(orderId, paymentMethod = 'WECHAT') {
    return (0, request_1.post)('/api/v1/payment/pay', { orderId, paymentMethod });
}
exports.payOrder = payOrder;
function shipOrder(id) {
    return (0, request_1.put)(`/api/v1/orders/${id}/ship`);
}
exports.shipOrder = shipOrder;
function confirmOrder(id) {
    return (0, request_1.put)(`/api/v1/orders/${id}/confirm`);
}
exports.confirmOrder = confirmOrder;
function cancelOrder(id) {
    return (0, request_1.put)(`/api/v1/orders/${id}/cancel`);
}
exports.cancelOrder = cancelOrder;
function requestRefund(id) {
    return (0, request_1.put)(`/api/v1/orders/${id}/refund`);
}
exports.requestRefund = requestRefund;
function approveRefund(id) {
    return (0, request_1.put)(`/api/v1/orders/${id}/approve-refund`);
}
exports.approveRefund = approveRefund;
