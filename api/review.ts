import { get, post } from './request';

export function createReview(orderId: number, rating: number, content?: string) {
  return post<Review>('/api/v1/reviews', { orderId, rating, content });
}

export function getUserReviews(userId: number, page: number = 1, size: number = 10) {
  return get<PageResult<Review>>(`/api/v1/reviews/user/${userId}`, { page, size });
}

export function getCreditScore(userId: number) {
  return get<number>(`/api/v1/reviews/user/${userId}/score`);
}
