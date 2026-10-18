# ChămSóc247 — Landing page

Block 1 được xây dựng bằng React 19, Vite 7, Tailwind CSS 4 và SVG nội bộ.

## Chạy dự án

Yêu cầu Node.js 20.19+ hoặc 22.12+.

```bash
npm ci
npm run dev -- --port 5173
```

Trong môi trường cloud, mở cổng 5173 bằng chức năng chuyển tiếp cổng của trình soạn thảo nếu có. Trên máy cá nhân, mở địa chỉ Vite hiển thị trong terminal.

```bash
npm run build
npm run preview -- --port 4173
```

## Nội dung

- `src/main.jsx`: Block 1, menu, hộp thông tin và icon SVG.
- `src/style.css`: màu sắc, bố cục responsive, wave và shape.
- `public/images/`: thư mục dành cho ảnh thật và logo chính thức khi được cung cấp.

Đã bỏ hình minh họa người và logo tự dựng. Các khung ảnh hiện để trống; tên thương hiệu hiển thị bằng chữ trong khi chờ file logo chính thức. Nội dung chương trình được chép theo ảnh tham chiếu. Các nút đăng ký và tìm hiểu mở hộp thông tin; chưa kết nối dịch vụ đăng ký và chưa thu thập dữ liệu.

## Triển khai Vercel bằng trình duyệt

1. Đăng nhập https://vercel.com bằng tài khoản GitHub.
2. Chọn **Add New → Project**, cấp quyền truy cập repository `xxyunggo-a11y/chamsoc247-landing-page`, rồi chọn **Import**.
3. Chọn nhánh `main`, framework **Vite**, Root Directory để mặc định (thư mục gốc).
4. Build Command: `npm run build`; Output Directory: `dist`; Install Command: `npm ci`. Không cần biến môi trường.
5. Chọn **Deploy**. Khi hoàn tất, mở địa chỉ `.vercel.app` do Vercel cung cấp.

Những lần đẩy commit tiếp theo lên nhánh `main` sẽ tự triển khai lại nếu tích hợp GitHub vẫn được bật.
