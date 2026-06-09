import { get, post, put, del } from './request';

export function searchProducts(params: ProductSearchParams) {
  return get<PageResult<Product>>('/api/v1/products', params);
}

export function getProductDetail(id: number) {
  return get<Product>(`/api/v1/products/${id}`);
}

export function publishProduct(data: ProductRequest) {
  return post<Product>('/api/v1/products', data);
}

export function updateProduct(id: number, data: ProductRequest) {
  return put<Product>(`/api/v1/products/${id}`, data);
}

export function favoriteProduct(id: number) {
  return post<void>(`/api/v1/products/${id}/favorite`);
}

export function unfavoriteProduct(id: number) {
  return del<void>(`/api/v1/products/${id}/favorite`);
}

export function onShelf(id: number) {
  return put<void>(`/api/v1/products/${id}/on-shelf`);
}

export function offShelf(id: number) {
  return put<void>(`/api/v1/products/${id}/off-shelf`);
}

export function getMyProducts(page: number = 1, size: number = 10, status?: number) {
  return get<PageResult<Product>>('/api/v1/products/my', { page, size, status });
}

export function getFavorites(page: number = 1, size: number = 10) {
  return get<PageResult<Product>>('/api/v1/products/favorites', { page, size });
}
