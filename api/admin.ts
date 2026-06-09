import { get, put } from './request';

export function getUsers(page: number = 1, size: number = 20, keyword?: string) {
  return get<PageResult<UserInfo>>('/api/v1/admin/users', { page, size, keyword });
}

export function toggleUserStatus(id: number, status: number) {
  return put<void>(`/api/v1/admin/users/${id}/status?status=${status}`);
}

export function forceOffShelf(id: number) {
  return put<void>(`/api/v1/admin/products/${id}/off-shelf`);
}

export function getAllProducts(params: ProductSearchParams) {
  return get<PageResult<Product>>('/api/v1/admin/products', params);
}

export function getStatistics() {
  return get<Record<string, any>>('/api/v1/admin/statistics');
}
