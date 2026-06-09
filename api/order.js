"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = createOrder;
exports.getOrderDetail = getOrderDetail;
exports.getSoldOrders = getSoldOrders;
exports.getBoughtOrders = getBoughtOrders;
exports.payOrder = payOrder;
exports.shipOrder = shipOrder;
exports.confirmOrder = confirmOrder;
exports.cancelOrder = cancelOrder;
exports.requestRefund = requestRefund;
exports.approveRefund = approveRefund;
const request_1 = require("./request");
function createOrder(productId, remark) {
    return (0, request_1.post)('/api/v1/orders', { productId, remark });
}
function getOrderDetail(id) {
    return (0, request_1.get)(`/api/v1/orders/${id}`);
}
function getSoldOrders(page = 1, size = 10, status) {
    return (0, request_1.get)('/api/v1/orders/sold', { page, size, status });
}
function getBoughtOrders(page = 1, size = 10, status) {
    return (0, request_1.get)('/api/v1/orders/bought', { page, size, status });
}
function payOrder(orderId, paymentMethod = 'WECHAT') {
    return (0, request_1.post)('/api/v1/payment/pay', { orderId, paymentMethod });
}
function shipOrder(id) {
    return (0, request_1.put)(`/api/v1/orders/${id}/ship`);
}
function confirmOrder(id) {
    return (0, request_1.put)(`/api/v1/orders/${id}/confirm`);
}
function cancelOrder(id) {
    return (0, request_1.put)(`/api/v1/orders/${id}/cancel`);
}
function requestRefund(id) {
    return (0, request_1.put)(`/api/v1/orders/${id}/refund`);
}
function approveRefund(id) {
    return (0, request_1.put)(`/api/v1/orders/${id}/approve-refund`);
}
