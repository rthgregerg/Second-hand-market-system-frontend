export function isValidPhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone);
}

export function isValidPassword(pwd: string): boolean {
  return pwd.length >= 6 && pwd.length <= 32;
}

export function isValidPrice(val: any): boolean {
  const n = Number(val);
  return !isNaN(n) && n > 0 && n < 100000000;
}

export function showToast(title: string, icon: 'success' | 'error' | 'none' = 'none') {
  wx.showToast({ title, icon, duration: 2000 });
}
