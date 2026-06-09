import { getChatMessages } from '../../../api/message';
import { request } from '../../../api/request';
import { formatTime } from '../../../utils/time';

Page({
  data: {
    targetUserId: 0,
    targetUserName: '',
    messages: [] as ChatMessage[],
    inputText: '',
    scrollToView: '',
    appUserId: getApp<GlobalData>().userId,
  },
  timer: 0,

  onLoad(options: any) {
    this.setData({ targetUserId: Number(options.id), targetUserName: options.name || '对方' });
    wx.setNavigationBarTitle({ title: this.data.targetUserName });
    this.loadMessages();
    this.timer = setInterval(() => this.loadMessages(), 3000);
  },

  onUnload() { clearInterval(this.timer); },

  async loadMessages() {
    try {
      const res = await getChatMessages(this.data.targetUserId, 1, 100);
      const msgs = (res.data.records || []).map(m => ({ ...m, createdAt: formatTime(m.createdAt) }));
      this.setData({ messages: msgs.reverse(), scrollToView: msgs.length > 0 ? `msg-${msgs[msgs.length - 1].id}` : '' });
    } catch {}
  },

  onInput(e: any) { this.setData({ inputText: e.detail.value }); },

  async onSend() {
    const text = this.data.inputText.trim();
    if (!text) return;
    const msg: ChatMessage = {
      id: Date.now(), senderId: this.data.appUserId!, receiverId: this.data.targetUserId,
      content: text, type: 'TEXT', productId: null, createdAt: '刚刚',
    };
    this.setData({ messages: [...this.data.messages, msg], inputText: '', scrollToView: `msg-${msg.id}` });
    try { await request('POST', '/api/v1/messages/send', { receiverId: this.data.targetUserId, content: text, type: 'TEXT' }); } catch {}
  },
});
