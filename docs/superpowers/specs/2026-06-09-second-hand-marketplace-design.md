# 二手交易平台微信小程序 — 设计文档

**日期**: 2026-06-09
**目标用户**: 大学生
**定位**: 简约高级的 C2C 二手交易平台，支持线上支付 + 线下面交

---

## 1. 技术选型

- **框架**: 微信小程序原生（WXML + WXSS + TypeScript）
- **开发工具**: 微信开发者工具（WeChat DevTools）
- **后端 API**: 本地 Spring Boot 服务 `http://localhost:8080`，JWT Bearer 认证
- **基础库版本**: 3.16.1+
- **AppID**: `wx22cd46dbded910aa`

## 2. 底部导航 (TabBar)

5 个 Tab，覆盖核心用户路径：

| Tab | 页面路径 | 图标含义 |
|-----|---------|---------|
| 首页 | `pages/index/index` | 发现商品 |
| 消息 | `pages/message/list` | 私聊 + 通知，带未读角标 |
| 发布 | `pages/publish/publish` | 中心突出 ⊕ 按钮 |
| 订单 | `pages/order/list` | 买/卖双视角 |
| 我的 | `pages/user/profile` | 个人中心 + 管理入口 |

## 3. 页面架构

### 3.1 首页模块
| 页面 | 路径 | 功能 |
|------|------|------|
| 首页瀑布流 | `pages/index/index` | 双列瀑布流商品卡片，下拉刷新，上拉加载更多，顶部搜索栏 + 分类筛选入口 |
| 商品详情 | `pages/product/detail` | 图片轮播、价格、卖家信息、描述、位置、发布时间、收藏/联系卖家/立即购买操作栏 |
| 搜索结果 | `pages/search/search` | 关键词搜索 + 分类 + 条件筛选（价格区间、成色），结果列表 |

### 3.2 发布模块
| 页面 | 路径 | 功能 |
|------|------|------|
| 发布商品 | `pages/publish/publish` | 多图上传（支持微信图片选择器）、标题、描述、分类选择、价格/原价、成色、位置 |
| 编辑商品 | `pages/publish/edit` | 复用发布表单，回填已有数据 |

### 3.3 消息模块
| 页面 | 路径 | 功能 |
|------|------|------|
| 消息列表 | `pages/message/list` | 顶部系统通知入口（带未读数），下方私聊会话列表（最新消息预览 + 时间） |
| 聊天窗口 | `pages/message/chat` | 文字消息 + 商品卡片分享 + 图片消息，通过 WebSocket 或轮询实现实时消息 |

### 3.4 订单模块
| 页面 | 路径 | 功能 |
|------|------|------|
| 订单列表 | `pages/order/list` | 顶部「我买到的」「我卖出的」双 Tab，每个 Tab 下按状态次级筛选 |
| 订单详情 | `pages/order/detail` | 订单全信息 + 状态时间线 + 操作按钮（支付/发货/确认收货/评价/取消/退款） |

### 3.5 用户模块
| 页面 | 路径 | 功能 |
|------|------|------|
| 个人中心 | `pages/user/profile` | 头像、昵称、信誉分、我的发布/收藏/评价入口、管理员入口（仅管理员可见） |
| 编辑资料 | `pages/user/edit-profile` | 昵称、头像、简介、邮箱、密码修改 |
| 我的收藏 | `pages/user/favorites` | 收藏商品列表 |
| 我的发布 | `pages/user/my-products` | 按状态筛选的已发布商品列表 |
| 用户评价 | `pages/user/reviews` | 某用户的评价列表 + 信誉分详情 |

### 3.6 管理模块
| 页面 | 路径 | 功能 |
|------|------|------|
| 管理面板 | `pages/admin/panel` | 用户列表（搜索+禁用）、商品列表（强制下架）、平台统计概览 |

### 3.7 认证模块
| 页面 | 路径 | 功能 |
|------|------|------|
| 登录注册 | `pages/auth/login` | 单页切换登录/注册，手机号+密码登录，注册需用户名+手机号+密码 |

## 4. 视觉设计语言

### 4.1 配色
```
主背景:    #F5F5F5  页面底色
卡片白:    #FFFFFF  卡片/列表项背景
主文字:    #1A1A1A  标题、价格
辅文字:    #8E8E93  描述、时间、地点
强调色:    #2B7BD6  按钮、链接、可点击元素
成功色:    #34C759  支付成功、交易完成
危险色:    #FF3B30  取消、退款
分割线:    #E8E8ED  列表分隔
标签背景:  #F2F2F7  商品状态标签
```

### 4.2 字体规范
- 商品标题: 17px 加粗，单行截断
- 价格: 20px 加粗，纯黑色 `#1A1A1A`
- 描述文字: 14px 常规，`#8E8E93`
- 辅助信息（时间/地点）: 13px，`#8E8E93`
- 系统默认字体: PingFang SC (iOS) / 系统字体 (Android)

### 4.3 组件样式
- **卡片**: 圆角 12px，图片 4:3 比例，下方文字区域 12px 内边距
- **图片轮播**: 商品卡片内多图左右滑动，指示器小圆点
- **按钮**: 胶囊形圆角 24px，纯色填充无阴影
  - 主按钮: `#2B7BD6` 白字
  - 危险按钮: `#FF3B30` 白字
  - 次按钮: `#F2F2F7` 黑字
- **输入框**: 灰色背景 `#F2F2F7` 填充，圆角 8px，无边框
- **导航栏**: 白色背景 + 黑色文字，无多余装饰线
- **底部弹出**: 微信原生 ActionSheet 风格，选择器、确认弹窗从底部滑出

### 4.4 商品卡片（首页核心组件）
```
┌──────────────────────┐
│  [图1] [图2] [图3]  │  ← 4:3 图片轮播，小圆点指示器
│       ○ ○ ●         │
├──────────────────────┤
│ ¥1,999              │  ← 20px 黑色加粗
│ iPhone 15 99新      │  ← 17px 黑色单行
│ 北京 · 3天前        │  ← 13px 浅灰
└──────────────────────┘
```

## 5. 数据层架构

### 5.1 目录结构
```
project/
├── app.ts                      # 应用入口，全局状态
├── app.json                    # 路由 + TabBar + 窗口配置
├── app.wxss                    # 全局样式变量
├── pages/                      # 页面目录
│   ├── index/                  # 首页
│   ├── product/                # 商品
│   ├── publish/                # 发布
│   ├── message/               # 消息
│   ├── order/                 # 订单
│   ├── user/                  # 用户
│   ├── admin/                 # 管理
│   └── auth/                  # 认证
├── components/                 # 公共组件
│   ├── product-card/          # 商品卡片
│   ├── image-swiper/          # 图片轮播
│   ├── empty-state/           # 空状态
│   ├── loading/               # 加载中
│   └── star-rating/           # 星级评分
├── api/                        # API 封装层
│   ├── request.ts             # wx.request Promise 封装
│   ├── auth.ts                # 认证接口
│   ├── product.ts             # 商品接口
│   ├── order.ts               # 订单接口
│   ├── category.ts            # 分类接口
│   ├── message.ts             # 消息接口
│   ├── review.ts              # 评价接口
│   ├── upload.ts              # 文件上传
│   └── admin.ts               # 管理接口
└── utils/                      # 工具函数
    ├── validator.ts           # 表单校验
    ├── time.ts                # 时间格式化
    ├── url.ts                 # 图片URL处理
    └── constants.ts           # 常量（状态码映射等）
```

### 5.2 网络层封装
```typescript
// api/request.ts — 核心请求函数
request(method, url, data, options)
  ├── 自动拼接 baseUrl (http://localhost:8080)
  ├── 自动注入 Authorization: Bearer <token>
  ├── 统一解析 JSON
  ├── code !== 200 → 显示错误提示
  ├── 401 → 清除 token，跳转登录页
  └── 返回 Promise<data>
```

### 5.3 全局状态 (app.globalData)
```typescript
{
  token: string | null,         // JWT Token
  userId: number | null,       // 当前用户ID
  userInfo: UserVO | null,     // 用户信息缓存
  unreadCount: number,         // 未读消息数（用于 TabBar 角标）
  isAdmin: boolean,            // 是否管理员
}
```

### 5.4 图片上传流程
```
wx.chooseMedia (选择多图)
  → wx.compressImage (压缩)
  → POST /api/v1/files/upload (wx.uploadFile, 多文件)
  → 获得 url[] 
  → 提交表单时附带 url[]
```

### 5.5 关键数据流
```
首页浏览:
  GET /api/v1/categories → 分类树（顶部筛选栏）
  GET /api/v1/products?keyword=&categoryId=&condition=... → 搜索/瀑布流

商品详情:
  GET /api/v1/products/{id} → 商品信息 + 卖家信息
  POST /api/v1/products/{id}/favorite → 收藏
  DELETE /api/v1/products/{id}/favorite → 取消收藏

下单支付:
  POST /api/v1/orders {productId, remark} → 创建订单
  POST /api/v1/payment/pay {orderId, paymentMethod: "WECHAT"} → 模拟支付
  PUT /api/v1/orders/{id}/ship → 卖家发货
  PUT /api/v1/orders/{id}/confirm → 买家确认收货
  PUT /api/v1/orders/{id}/cancel → 取消订单（仅待付款）

线下面交:
  下单 → 支付 → 消息约定地点 → 见面验货 → 确认收货/取消
  （流程与线上一致，只是物流变为面交）

退款:
  PUT /api/v1/orders/{id}/refund → 申请退款
  PUT /api/v1/orders/{id}/approve-refund → 卖家同意退款

评价:
  POST /api/v1/reviews {orderId, rating, content} → 发表评价
  GET /api/v1/reviews/user/{userId} → 用户评价列表
  GET /api/v1/reviews/user/{userId}/score → 信誉分

消息:
  GET /api/v1/messages/conversations → 会话列表
  GET /api/v1/messages/chat/{targetUserId} → 聊天记录
  GET /api/v1/messages/unread → 未读数
  GET /api/v1/messages/notifications → 通知列表
  PUT /api/v1/messages/notifications/{id}/read → 标记已读
```

## 6. 订单状态流转

```
待付款(1) ──支付──→ 已付款(2) ──发货──→ 已发货(3) ──确认收货──→ 已收货(4) ──评价──→ 已完成(5)
  │                    │                    │
  └──取消──→ 已取消(6)  └──退款申请──→ 退款中(7) ──卖家同意──→ 已退款(8)
```

- 待付款状态可取消
- 已付款后可申请退款（需卖家同意）
- 线下面交：发货步骤改为卖家确认"约定见面"，买家当面验货后确认收货

## 7. 关键交互细节

### 7.1 首页
- 双列瀑布流（CSS `column-count: 2` 或 flex 分两列），左右卡片高度自适应
- 下拉刷新 → 重新加载第1页
- 触底加载更多 → 翻页
- 顶部粘性搜索栏 + 分类横向滚动选择器

### 7.2 商品详情
- 图片轮播撑满屏幕宽度，4:3 比例
- 收藏按钮在右上角，心形图标，已收藏实心蓝色，未收藏空心
- 底部固定操作栏：「收藏」「联系卖家」「立即购买」
- 卖家信息行可点击跳转卖家主页（评价+信誉分）
- 浏览数 + 收藏数展示

### 7.3 聊天窗口
- 标准聊天界面：气泡消息，对方左对齐灰色，自己右对齐蓝色
- 支持发送文字
- 商品卡片可分享到聊天（引用商品信息）
- 新消息自动滚动到底部

### 7.4 订单操作
- 订单详情页顶部状态时间线（横向步骤条）
- 根据当前状态显示不同操作按钮组合
- 面交订单额外显示「约定地点」备注区域

## 8. 未覆盖内容（预留扩展）

不在首版但预留结构：
- WebSocket 实时聊天（首版可用轮询）
- 微信支付真实接入（当前使用模拟支付接口）
- 位置定位（LBS 附近商品）
- 消息推送模板

---

## 自我审查

- [x] 无 TBD / TODO 占位符
- [x] 页面列表与导航结构一致
- [x] 数据流与后端 API 完全对应
- [x] 订单状态流转完整覆盖
- [x] 视觉规范具体可执行
- [x] 目录结构清晰，可直接作为脚手架
