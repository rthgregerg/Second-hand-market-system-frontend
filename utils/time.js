"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTime = formatTime;
exports.formatDateTime = formatDateTime;
function formatTime(dateStr) {
    if (!dateStr)
        return '';
    const date = new Date(dateStr.replace(/-/g, '/'));
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const sec = Math.floor(diff / 1000);
    const min = Math.floor(sec / 60);
    const hour = Math.floor(min / 60);
    const day = Math.floor(hour / 24);
    if (sec < 60)
        return '刚刚';
    if (min < 60)
        return `${min}分钟前`;
    if (hour < 24)
        return `${hour}小时前`;
    if (day === 1)
        return '昨天';
    if (day < 7)
        return `${day}天前`;
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}
function formatDateTime(dateStr) {
    if (!dateStr)
        return '';
    const date = new Date(dateStr.replace(/-/g, '/'));
    const y = date.getFullYear();
    const M = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return `${y}-${M}-${d} ${h}:${m}`;
}
