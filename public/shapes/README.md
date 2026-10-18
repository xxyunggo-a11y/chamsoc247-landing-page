# Thư viện shape ChămSóc247

Sáu composition độc lập, xuất từ công cụ Haikei rồi phối màu, cắt khung nhìn và bổ sung viền dựa trên chính đường contour được xuất. S01 dùng contour góc phải phía trên; S04 dùng contour góc trái phía dưới, không ghép hai góc thành một khe hẹp. Không sử dụng PNG hoặc tự vẽ lại ảnh người. Chưa áp dụng vào Block 1.

## Nguồn và quyền sử dụng

- Nguồn: https://app.haikei.app/ — Blob Scene, Layered Waves, Stacked Waves.
- Kiểm tra ngày 2026-10-18: https://haikei.app/pricing/ mục “Can I use the designs I made with Haikei for commercial work?” cho phép tải, chỉnh sửa và sử dụng thiết kế trong dự án cá nhân và thương mại của chính mình hoặc khách hàng. Không được dùng để cung cấp một dịch vụ tạo thiết kế tương tự. Mục “Do I need to credit Haikei?”: không bắt buộc ghi công.
- Điều khoản đầy đủ: https://haikei.app/terms/. Không gắn nhãn MIT/CC0 cho các tài nguyên này.
- Đây là sáu tài nguyên cố định trong một dự án website, không đóng gói lại bộ máy tạo shape Haikei.
- `sources/`: SVG gốc được xuất trực tiếp từ Haikei; `manifest.json`: đối chiếu composition với nguồn và generator.
- Haikei và Blobmaker truy cập thành công. https://www.svgbackgrounds.com trả HTTP 403 trong môi trường này, nên không lấy tài nguyên từ website đó.

## Tái sử dụng

Mỗi `.svg` có `viewBox` và đường path độc lập. Mặc định có màu thương hiệu. Dùng `<img src="/shapes/dai-ket-noi.svg" alt="" />` hoặc SVG inline.

Để đổi màu, inline SVG và đặt CSS custom properties trên phần tử cha: `--shape-orange`, `--shape-pink`, `--shape-cream`. Ảnh SVG ở thẻ `<img>` không kế thừa CSS variables từ trang; chỉnh file hoặc dùng inline để tùy biến.

Khung S01/S04 có thêm `*-mask.svg`, dùng với CSS `mask-image`, `mask-size: 100% 100%`, `mask-repeat: no-repeat`. Các mask không chứa ảnh chụp, cho phép tái sử dụng với bất kỳ ảnh nào.

Thay kích thước bằng CSS width/height. Giữ nguyên viewBox để giữ tỷ lệ; chỉ dùng `preserveAspectRatio="none"` khi chủ động kéo giãn divider. Trong design-lab, tùy chỉnh chỉ lưu vào URL để duyệt mẫu, không thay đổi trang chính.
