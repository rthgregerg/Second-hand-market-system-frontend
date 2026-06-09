import { getUserReviews, getCreditScore } from '../../../api/review';
import { formatTime } from '../../../utils/time';

Page({
  data: { userId: 0, userName: '', reviews: [] as Review[], creditScore: 0, page: 1, hasMore: true, loading: false },
  onLoad(options: any) {
    this.setData({ userId: Number(options.id), userName: options.name || '' });
    wx.setNavigationBarTitle({ title: `${this.data.userName}的评价` });
    this.loadScore();
    this.loadReviews(true);
  },
  async loadScore() { try { const res = await getCreditScore(this.data.userId); this.setData({ creditScore: res.data }); } catch {} },
  async loadReviews(reset = false) {
    const page = reset ? 1 : this.data.page;
    this.setData({ loading: true });
    try {
      const res = await getUserReviews(this.data.userId, page, 20);
      const list = res.data.records.map(r => ({ ...r, createdAt: formatTime(r.createdAt) }));
      this.setData({ reviews: reset ? list : [...this.data.reviews, ...list], page: page + 1, hasMore: list.length >= 20, loading: false });
    } catch { this.setData({ loading: false }); }
  },
  onReachBottom() { if (this.data.hasMore) this.loadReviews(); },
});
