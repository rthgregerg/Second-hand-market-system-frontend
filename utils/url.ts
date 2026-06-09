const BASE_URL = 'http://localhost:8080';

export function fullUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return BASE_URL + (path.startsWith('/') ? '' : '/') + path;
}

export const DEFAULT_AVATAR = '/images/default-avatar.png';
export const DEFAULT_PRODUCT_IMG = '/images/default-product.png';
