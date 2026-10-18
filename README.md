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
- `public/images/`: toàn bộ ảnh và logo đã tối ưu WebP, tên ngắn không dấu.
- `public/images/goc/`: 23 bản gốc được di chuyển từ thư mục gốc repository, không đưa vào bản build triển khai.
- `public/images/danh-muc.json`: đối chiếu tên cũ, tên mới, nhóm nội dung, kích thước và vị trí dùng trong Block 1.

Đã bỏ hình minh họa người và logo tự dựng. Block 1 sử dụng 4 ảnh được cung cấp trên GitHub, chuyển sang WebP trong `public/images/` để tối ưu dung lượng, có `srcSet` cho điện thoại; bản gốc được giữ nguyên nội dung trong `public/images/goc/`. Header sử dụng hai file logo mới được cung cấp, tối ưu WebP và giữ nguyên tỷ lệ. Nội dung chương trình được chép theo ảnh tham chiếu. Các nút đăng ký và tìm hiểu mở hộp thông tin; chưa kết nối dịch vụ đăng ký và chưa thu thập dữ liệu.

## Triển khai Vercel bằng trình duyệt

1. Đăng nhập https://vercel.com bằng tài khoản GitHub.
2. Chọn **Add New → Project**, cấp quyền truy cập repository `xxyunggo-a11y/chamsoc247-landing-page`, rồi chọn **Import**.
3. Chọn nhánh `main`, framework **Vite**, Root Directory để mặc định (thư mục gốc).
4. Build Command: `npm run build`; Output Directory: `dist`; Install Command: `npm ci`. Không cần biến môi trường.
5. Chọn **Deploy**. Khi hoàn tất, mở địa chỉ `.vercel.app` do Vercel cung cấp.

Những lần đẩy commit tiếp theo lên nhánh `main` sẽ tự triển khai lại nếu tích hợp GitHub vẫn được bật.

## Bố cục Block 1

Trang phủ toàn bộ viewport; mỗi phần nội dung có `width: 100%`, giới hạn `max-width: 1440px`, với padding responsive. `body` và `#root` không đặt chiều rộng cố định hay giới hạn max-width. Nền và wave phủ toàn màn hình.

- Desktop trên 1100px: hero và phần kết nối dùng CSS Grid hai cột; hai thẻ nhu cầu bằng nhau; bốn thẻ thông tin trên một hàng.
- Tablet 701–1100px: giữ hai cột, điều chỉnh typography, khoảng cách và crop ảnh.
- Mobile đến 700px: các phần chính xếp dọc, thông tin nhanh chia hai cột.

Đã kiểm tra bản production bằng Chromium tại 1440, 1024, 768 và 390px: chiều rộng container bằng viewport ở cả bốn mức, không tràn ngang, ảnh tải đầy đủ, menu và hộp thông tin hoạt động.

## Design lab — thư viện shape

Mở `/design-lab` để so sánh 6 mẫu SVG độc lập, thử ảnh thật, chỉnh màu, tỷ lệ và lưu lựa chọn trong URL. Trang chính chưa áp dụng các mẫu này. Có nút tải SVG theo màu đã chọn và xem mã nguồn.

- `public/shapes/*.svg`: 6 composition chính và 2 mask ảnh, có CSS variables để đổi màu.
- `public/shapes/sources/`: bản SVG xuất từ Haikei trước khi phối màu và tinh chỉnh.
- `public/shapes/manifest.json`: nguồn, generator, vị trí gợi ý của từng mẫu.
- `public/shapes/README.md`: quyền sử dụng và hướng dẫn tái sử dụng.
- `vercel.json`: rewrite cho `/design-lab` để mở trực tiếp hoặc tải lại trên Vercel.

Nguồn: Haikei (quyền dùng trong dự án thương mại theo FAQ tại https://haikei.app/pricing/). SVG Backgrounds bị chặn HTTP 403; không sử dụng tài nguyên từ nguồn đó.
