/** 统一响应包裹 */
interface ApiResult<T = any> {
  code: number;
  message: string;
  data: T;
  timestamp: number;
}

/** 分页结果 */
interface PageResult<T> {
  records: T[];
  total: number;
  page: number;
  size: number;
}

/** 商品 */
interface Product {
  id: number;
  sellerId: number;
  sellerName: string;
  sellerAvatar: string;
  categoryId: number;
  categoryName: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  condition: number;
  status: number;
  viewCount: number;
  favoriteCount: number;
  isFavorited: boolean;
  location: string;
  images: string[];
  createdAt: string;
}

/** 用户 */
interface UserInfo {
  id: number;
  username: string;
  phone: string;
  email: string;
  avatar: string;
  nickname: string;
  bio: string;
  role: string;
  creditScore: number;
  createdAt: string;
  status?: number;
}

/** 订单 */
interface Order {
  id: number;
  orderNo: string;
  buyerId: number;
  buyerName: string;
  sellerId: number;
  sellerName: string;
  productId: number;
  productTitle: string;
  productImage: string;
  amount: number;
  status: number;
  statusText: string;
  paymentMethod: string;
  remark: string;
  paidAt: string;
  shippedAt: string;
  receivedAt: string;
  completedAt: string;
  canceledAt: string;
  createdAt: string;
}

/** 评价 */
interface Review {
  id: number;
  orderId: number;
  reviewerId: number;
  reviewerName: string;
  reviewerAvatar: string;
  revieweeId: number;
  rating: number;
  content: string;
  images: string[];
  createdAt: string;
}

/** 分类 */
interface Category {
  id: number;
  name: string;
  icon: string;
  parentId: number;
  children: Category[];
}

/** 消息会话 */
interface Conversation {
  targetUserId: number;
  targetUserName: string;
  targetUserAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

/** 聊天消息 */
interface ChatMessage {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  type: string;
  productId: number | null;
  createdAt: string;
}

/** 通知 */
interface Notification {
  id: number;
  title: string;
  content: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

/** 商品搜索参数 */
interface ProductSearchParams {
  keyword?: string;
  categoryId?: number;
  condition?: number;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
}

/** 发布/编辑商品请求 */
interface ProductRequest {
  title: string;
  description?: string;
  categoryId: number;
  price: number;
  originalPrice?: number;
  condition: number;
  location?: string;
  images?: string[];
}

/** 全局状态 */
interface GlobalData {
  token: string | null;
  userId: number | null;
  userInfo: UserInfo | null;
  unreadCount: number;
  isAdmin: boolean;
}

/** App 实例 */
interface IAppOption {
  globalData: GlobalData;
  fetchUserInfo(): void;
  fetchUnreadCount(): void;
}
