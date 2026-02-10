# 💰 Expense Tracker

Ứng dụng quản lý chi tiêu cá nhân được xây dựng bằng React và Tailwind CSS. Ứng dụng giúp người dùng theo dõi thu chi, phân tích chi tiêu theo danh mục, và xuất báo cáo CSV.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.15-38B2AC?logo=tailwind-css)

## 📋 Mục lục

- [Tính năng](#-tính-năng)
- [Tech Stack](#-tech-stack)
- [Cài đặt](#-cài-đặt)
- [Sử dụng](#-sử-dụng)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Lưu ý](#-lưu-ý)

## ✨ Tính năng

### 🎯 Core Features (MVP)

1. **Quản lý giao dịch**
   - ➕ Thêm giao dịch mới (thu nhập/chi tiêu)
   - ✏️ Chỉnh sửa giao dịch hiện có
   - 🗑️ Xóa giao dịch với xác nhận
   - 📝 Thêm mô tả cho mỗi giao dịch
   - 📅 Chọn ngày (không cho phép ngày tương lai)
   - 💵 Nhập số tiền với validation (tối đa 2 chữ số thập phân)

2. **Danh mục**
   - 7 danh mục chi tiêu: 🍔 Food, 🚗 Transportation, 🎬 Entertainment, 📄 Bills, 🛍️ Shopping, 💊 Health, 📌 Other
   - 4 danh mục thu nhập: 💰 Salary, 💼 Freelance, 📈 Investment, 💵 Other
   - Mỗi danh mục có màu sắc và icon riêng biệt
   - Lọc danh mục theo loại giao dịch

3. **Dashboard**
   - 📊 Tổng quan số dư (Income - Expense = Balance)
   - 📈 Biểu đồ Pie Chart phân tích chi tiêu theo danh mục
   - 📉 Biểu đồ Pie Chart phân tích thu nhập theo danh mục
   - 🕐 Hiển thị 5 giao dịch gần nhất
   - 💡 Cảnh báo khi số dư âm

4. **Bộ lọc & Tìm kiếm**
   - 🔍 Tìm kiếm theo mô tả
   - 🏷️ Lọc theo danh mục
   - 💰 Lọc theo loại (thu nhập/chi tiêu)
   - 📅 Lọc theo khoảng thời gian:
     - Hôm nay
     - Tuần này
     - Tháng này
     - Khoảng thời gian tùy chỉnh
   - ❌ Xóa tất cả bộ lọc
   - 📋 Hiển thị tóm tắt bộ lọc đang áp dụng

5. **Xuất dữ liệu**
   - 📥 Xuất CSV với dữ liệu đã lọc
   - 📄 Tên file tự động theo khoảng thời gian
   - 📊 Format: Date, Type, Category, Amount, Description

6. **Responsive Design**
   - 📱 Mobile-first approach
   - 💻 Breakpoints: 320px (mobile), 768px (tablet), 1024px (desktop)
   - 🎨 Touch-friendly (nút tối thiểu 44x44px)
   - 🔄 Adaptive layouts cho mọi màn hình

### 🛡️ Tính năng bổ sung

- **Lưu trữ dữ liệu**: Tự động lưu vào LocalStorage
- **Dữ liệu mẫu**: 21 giao dịch mẫu để demo
- **Error Boundary**: Bắt lỗi React và hiển thị UI thân thiện
- **Loading States**: Skeleton loading và spinner
- **Validation**: Kiểm tra dữ liệu nhập vào toàn diện
- **Accessibility**: ARIA labels, keyboard navigation, focus management
- **Format tiền tệ**: Định dạng VND với dấu phân cách hàng nghìn

## 🛠️ Tech Stack

### Frontend Framework & Libraries

- **React 19.2.0** - UI library với functional components và hooks
- **Vite 5.4.21** - Build tool và dev server cực nhanh
- **React Hook Form 7.71.1** - Quản lý form và validation
- **Recharts 3.7.0** - Biểu đồ React-native cho dashboard

### Styling

- **Tailwind CSS 3.4.15** - Utility-first CSS framework
- **PostCSS 8.4.47** - CSS processor
- **Autoprefixer 10.4.20** - Tự động thêm vendor prefixes

### State Management & Data

- **React Context API** - Quản lý state toàn cục
- **LocalStorage** - Lưu trữ persistent data
- **date-fns 4.1.0** - Thao tác và format ngày tháng
- **uuid 13.0.0** - Generate unique IDs

### Code Quality

- **ESLint 9.39.2** - Linting JavaScript/React
- **Prettier 3.8.1** - Code formatting
- **eslint-plugin-react** - React-specific linting rules
- **eslint-plugin-jsx-a11y** - Accessibility linting

### UI Components

- **@headlessui/react 2.2.9** - Unstyled, accessible UI components
- **@heroicons/react 2.2.0** - SVG icon library

## 📦 Cài đặt

### Yêu cầu hệ thống

- **Node.js**: 20.11.1+ (khuyến nghị 20.19+ hoặc 22.12+)
- **npm**: 10.2.4+

### Các bước cài đặt

1. **Clone repository**

```bash
git clone <repository-url>
cd expense_tracker
```

2. **Cài đặt dependencies**

```bash
npm install
```

3. **Chạy development server**

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173/`

4. **Build cho production**

```bash
npm run build
```

5. **Preview production build**

```bash
npm run preview
```

## 🚀 Sử dụng

### Thêm giao dịch mới

1. Click nút **"+ Add Transaction"** (desktop) hoặc nút **"+"** tròn (mobile)
2. Điền thông tin:
   - **Amount**: Số tiền (VD: 50000 hoặc 50000.50)
   - **Type**: Chọn Income hoặc Expense
   - **Category**: Danh mục (tự động lọc theo Type)
   - **Date**: Ngày giao dịch (không được chọn ngày tương lai)
   - **Description**: Mô tả (tùy chọn, tối đa 200 ký tự)
3. Click **"Save"** để lưu

### Sửa/Xóa giao dịch

- Click icon ✏️ để chỉnh sửa
- Click icon 🗑️ để xóa (sẽ có xác nhận)

### Xem Dashboard

1. Click tab **"📊 Dashboard"**
2. Xem tổng quan:
   - Total Income (màu xanh)
   - Total Expenses (màu đỏ)
   - Balance (màu xanh/cam)
3. Phân tích biểu đồ theo category
4. Xem 5 giao dịch gần nhất

### Lọc giao dịch

1. Chuyển sang tab **"📝 Transactions"**
2. Sử dụng FilterBar:
   - Tìm kiếm theo mô tả
   - Chọn category
   - Chọn type (Income/Expense)
   - Chọn period hoặc custom date range
3. Click **"Clear All"** để xóa bộ lọc

### Xuất CSV

1. Áp dụng bộ lọc mong muốn (hoặc để trống để xuất tất cả)
2. Click nút **"📥 Export CSV"**
3. File sẽ tự động tải về với tên dạng `transactions_YYYY-MM-DD_to_YYYY-MM-DD.csv`

## 📁 Cấu trúc dự án

```
expense_tracker/
├── public/                     # Static assets
├── src/
│   ├── components/
│   │   ├── common/            # Reusable components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   ├── layout/            # Layout components
│   │   │   ├── Layout.jsx
│   │   │   └── Header.jsx
│   │   ├── transactions/      # Transaction components
│   │   │   ├── TransactionForm.jsx
│   │   │   ├── TransactionItem.jsx
│   │   │   ├── TransactionList.jsx
│   │   │   └── FilterBar.jsx
│   │   ├── dashboard/         # Dashboard components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── BalanceSummary.jsx
│   │   │   ├── SpendingChart.jsx
│   │   │   └── RecentTransactions.jsx
│   │   └── export/            # Export components
│   │       └── ExportButton.jsx
│   ├── context/               # React Context
│   │   └── TransactionContext.jsx
│   ├── hooks/                 # Custom hooks
│   │   ├── useTransactions.js
│   │   ├── useFilters.js
│   │   └── useLocalStorage.js
│   ├── utils/                 # Utility functions
│   │   ├── dateUtils.js
│   │   ├── currencyUtils.js
│   │   ├── validation.js
│   │   └── exportUtils.js
│   ├── data/                  # Static data & mock data
│   │   ├── categories.js
│   │   └── mockTransactions.js
│   ├── constants/             # App constants
│   │   └── index.js
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── tests/                     # Test files (placeholder)
├── .eslintrc.js              # ESLint configuration
├── .prettierrc               # Prettier configuration
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
├── vite.config.js            # Vite configuration
└── package.json              # Dependencies & scripts
```

## 📝 Lưu ý

### ⚠️ Quan trọng

1. **Dữ liệu lưu trữ**
   - Dữ liệu được lưu trong **LocalStorage** của browser
   - Xóa cache/storage sẽ **mất toàn bộ dữ liệu**
   - Khuyến nghị xuất CSV định kỳ để backup
   - Giới hạn storage: ~5-10MB (tùy browser)

2. **Node.js Version**
   - Vite 5.4.21 yêu cầu Node 20.11.1+
   - Nếu gặp lỗi `crypto.hash is not a function`, upgrade Node hoặc downgrade Vite
   - Project hiện tại đã downgrade Vite để tương thích Node 20.11.1

3. **Tailwind CSS Version**
   - Đang dùng Tailwind v3.4.15 (không phải v4)
   - Tailwind v4 yêu cầu `@tailwindcss/postcss` riêng
   - Nếu upgrade lên v4, cần cài thêm package và sửa config

### 🔧 Troubleshooting

**Lỗi: "tailwindcss directly as a PostCSS plugin"**

```bash
# Downgrade về Tailwind v3
npm install -D tailwindcss@^3.4.0
```

**Lỗi: "Node.js version too old"**

```bash
# Upgrade Node hoặc downgrade Vite
npm install -D vite@^5.4.0 @vitejs/plugin-react@^4.0.0
```

**Lỗi: "Library not loaded: libicui18n.74.dylib" (macOS)**

```bash
brew reinstall icu4c
```

**LocalStorage đầy**

- Xuất dữ liệu ra CSV
- Xóa bớt giao dịch cũ
- Xóa localStorage: `localStorage.clear()`

### 💡 Best Practices

1. **Validation**
   - Amount không được âm
   - Date không được trong tương lai
   - Description tối đa 200 ký tự
   - Số tiền tối đa 2 chữ số thập phân

2. **Performance**
   - Dùng `useMemo` cho filtered data
   - Lazy loading cho charts
   - Debounce search input (nếu có nhiều data)

3. **Accessibility**
   - Tất cả interactive elements có min 44x44px
   - Keyboard navigation support
   - ARIA labels cho screen readers
   - Focus management trong modals

4. **Mobile UX**
   - Touch targets đủ lớn
   - Modal full-screen trên mobile
   - Floating Action Button cho Add
   - Swipe-friendly card layouts

### 🔄 Backup & Restore

**Backup dữ liệu**

1. Vào tab Transactions
2. Click "Export CSV"
3. Lưu file CSV

**Restore dữ liệu**

- Hiện tại chưa có chức năng import CSV
- Có thể thêm manually qua UI
- Hoặc paste vào localStorage:

```javascript
localStorage.setItem('expense_tracker_transactions', JSON.stringify(transactions));
```

### 🚧 Known Issues

- Import CSV chưa được implement
- Không có authentication/multi-user
- Không sync giữa các thiết bị
- LocalStorage có thể bị clear bởi browser
- Chart tooltip có thể bị crop ở edge màn hình nhỏ

### 🎯 Future Enhancements

- [ ] Import từ CSV
- [ ] Export PDF report
- [ ] Recurring transactions (thu chi định kỳ)
- [ ] Budget planning
- [ ] Multi-currency support
- [ ] Cloud sync với Firebase/Supabase
- [ ] PWA support (offline mode)
- [ ] Dark mode
- [ ] Charts với nhiều loại hơn (line, bar)
- [ ] Tag system cho transactions

## 📄 License

MIT License - Free to use for personal and commercial projects.

## 👨‍💻 Author

**nguyen.duc.duyb**

---

⭐ Nếu bạn thấy project hữu ích, hãy star repo này!
