import { get, post, put } from './request';

export function createOrder(productId: number, remark?: string) {
  return post<Order>('/api/v1/orders', { productId, remark });
}

export function getOrderDetail(id: number) {
  return get<Order>(`/api/v1/orders/${id}`);
}

export function getSoldOrders(page: number = 1, size: number = 10, status?: number) {
  return get<PageResult<Order>>('/api/v1/orders/sold', { page, size, status });
}

export function getBoughtOrders(page: number = 1, size: number = 10, status?: number) {
  return get<PageResult<Order>>('/api/v1/orders/bought', { page, size, status });
}

export function payOrder(orderId: number, paymentMethod: string = 'WECHAT') {
  return post<any>('/api/v1/payment/pay', { orderId, paymentMethod });
}

export function shipOrder(id: number) {
  return put<void>(`/api/v1/orders/${id}/ship`);
}

export function confirmOrder(id: number) {
  return put<void>(`/api/v1/orders/${id}/confirm`);
}

export function cancelOrder(id: number) {
  return put<void>(`/api/v1/orders/${id}/cancel`);
}

export function requestRefund(id: number) {
  return put<void>(`/api/v1/orders/${id}/refund`);
}

export function approveRefund(id: number) {
  return put<void>(`/api/v1/orders/${id}/approve-refund`);
}
