import { post } from './request';

export function login(account: string, password: string) {
  return post<{ token: string; userId: number; username: string; role: string }>('/api/v1/auth/login', { account, password });
}

export function register(username: string, password: string, phone: string, email?: string) {
  return post<{ token: string; userId: number; username: string; role: string }>('/api/v1/auth/register', { username, password, phone, email });
}
