import { getChatMessages } from '../../../api/message';
import { formatTime } from '../../../utils/time';
import '../../../components/empty-state/empty-state';

Page({
  data: {
    targetUserId: 0,
    targetUserName: '',
    messages: [] as ChatMessage[],
    inputText: '',
    scrollToView: '',
    appUserId: getApp<IAppOption>().globalData.userId,
    wsConnected: false,
  },
  socketTask: null as WechatMiniprogram.SocketTask | null,
  timer: 0,

  onLoad(options: any) {
    this.setData({ targetUserId: Number(options.id), targetUserName: options.name || '对方' });
    wx.setNavigationBarTitle({ title: this.data.targetUserName });
    this.loadMessages();
    this.connectWebSocket();
    // 轮询作为 WebSocket 断开时的 fallback
    this.timer = setInterval(() => {
      if (!this.data.wsConnected) this.loadMessages();
    }, 5000);
  },

  onUnload() {
    clearInterval(this.timer);
    if (this.socketTask) this.socketTask.close({});
  },

  /** WebSocket 连接: ws://localhost:8080/ws/chat/{userId}?token={jwtToken} */
  connectWebSocket() {
    const app = getApp<IAppOption>();
    const token = app.globalData.token || '';
    const userId = app.globalData.userId;
    if (!token || !userId) return;

    this.socketTask = wx.connectSocket({
      url: `ws://localhost:8080/ws/chat/${userId}?token=${token}`,
    });

    this.socketTask.onOpen(() => {
      this.setData({ wsConnected: true });
    });

    this.socketTask.onMessage((res) => {
      try {
        const data = JSON.parse(res.data as string);
        // 收到新消息
        if (data.fromUserId && data.content) {
          const msg: ChatMessage = {
            id: data.id || Date.now(),
            senderId: data.fromUserId,
            receiverId: data.toUserId,
            content: data.content,
            type: data.messageType === 1 ? 'TEXT' : 'PRODUCT',
            productId: data.productId || null,
            createdAt: '刚刚',
          };
          this.setData({
            messages: [...this.data.messages, msg],
            scrollToView: `msg-${msg.id}`,
          });
        }
      } catch {}
    });

    this.socketTask.onClose(() => {
      this.setData({ wsConnected: false });
      // 3秒后自动重连
      setTimeout(() => {
        if (this.data.targetUserId > 0) this.connectWebSocket();
      }, 3000);
    });

    this.socketTask.onError(() => {
      this.setData({ wsConnected: false });
    });
  },

  async loadMessages() {
    try {
      const res = await getChatMessages(this.data.targetUserId, 1, 100);
      const msgs = (res.data.records || []).map(m => ({ ...m, createdAt: formatTime(m.createdAt) }));
      this.setData({
        messages: msgs.reverse(),
        scrollToView: msgs.length > 0 ? `msg-${msgs[msgs.length - 1].id}` : '',
      });
    } catch {}
  },

  onInput(e: any) { this.setData({ inputText: e.detail.value }); },

  /** 通过 WebSocket 发送消息 */
  onSend() {
    const text = this.data.inputText.trim();
    if (!text) return;

    const payload = {
      toUserId: this.data.targetUserId,
      content: text,
      messageType: 1, // 1=TEXT
    };

    // 乐观更新
    const msg: ChatMessage = {
      id: Date.now(),
      senderId: this.data.appUserId!,
      receiverId: this.data.targetUserId,
      content: text,
      type: 'TEXT',
      productId: null,
      createdAt: '刚刚',
    };
    this.setData({
      messages: [...this.data.messages, msg],
      inputText: '',
      scrollToView: `msg-${msg.id}`,
    });

    if (this.socketTask && this.data.wsConnected) {
      this.socketTask.send({ data: JSON.stringify(payload) });
    }
  },
});
