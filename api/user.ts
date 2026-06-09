import { get, put } from './request';

export function getProfile() {
  return get<UserInfo>('/api/v1/user/profile');
}

export function updateProfile(data: { nickname?: string; avatar?: string; bio?: string; email?: string }) {
  return put<void>('/api/v1/user/profile', data);
}

export function changePassword(oldPassword: string, newPassword: string) {
  return put<void>('/api/v1/user/password', { oldPassword, newPassword });
}

export function getUserInfo(userId: number) {
  return get<UserInfo>(`/api/v1/user/info/${userId}`);
}
