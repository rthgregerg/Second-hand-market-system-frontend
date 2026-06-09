import { get } from './request';

export function getCategoryTree() {
  return get<Category[]>('/api/v1/categories');
}

export function getCategoryChildren(parentId: number) {
  return get<Category[]>(`/api/v1/categories/${parentId}/children`);
}
