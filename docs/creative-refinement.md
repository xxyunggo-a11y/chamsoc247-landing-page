# Block 1 — Creative refinement

## Đối chiếu tổng thể

Mockup tạo nhịp đọc bằng hero chữ lớn trái/ảnh lớn phải, hai nhu cầu đi đôi, một dải chuyển tiếp có hướng và khung ảnh giải pháp bất đối xứng. Ảnh và khung không có cùng chức năng với một hình nền trang trí độc lập.

Bản Block 1 hiện tại đã đủ nội dung, nhưng đường biên ảnh còn tách rời nội dung, ribbon mảnh và nhịp thẻ lặp đều. S01/S04 của thư viện ban đầu là contour góc để tham khảo; áp trực tiếp sẽ cắt nhiều vùng ảnh hoặc để khung vuông ở biên. S02/S03 là các lớp chuyển tiếp, cần tổ chức lại thành dải có hướng, thay vì đặt nguyên khung SVG mẫu phía sau trang.

Các concept giữ ảnh thật và toàn bộ nội dung, logo, CTA. Shape mới có góc chuyển tiếp tròn mềm; contour ảnh tránh vùng khuôn mặt. Khung ảnh dùng SVG mask thực, có thể thay `src` ảnh độc lập. Viền riêng chồng nhẹ nhiều độ dày, cùng tỷ lệ với mask. Ribbon là các dải kín với độ rộng biến thiên và đường cubic không tuần hoàn.

## Ba phương án

- **A — Organic Editorial:** gần mockup nhất. Hero chữ trái/ảnh phải; hai nhu cầu bằng nhau; phần giải pháp chữ trái/ảnh phải. Khung ảnh lớn có đường viền mảnh nhiều lớp. Lựa chọn thích hợp nếu ưu tiên giữ bố cục tham chiếu.
- **B — Layered Storytelling:** hero ảnh trái/chữ phải và ảnh đồng hành nhỏ ở lớp sau; nhu cầu thành hai câu chuyện xen kẽ; giải pháp ảnh trái/chữ phải. Khoảng trắng và ribbon dẫn nhịp; thông tin khóa học trình bày trên một dải mở.
- **C — Expressive Premium:** headline lớn ở đầu trang, sau đó lời dẫn bên trái và ảnh chính bên phải. Hai nhu cầu lệch cao độ và tỷ lệ; tiêu đề giải pháp mạnh, nút bất đối xứng và thông tin cuối có đường phân cách thay card.

## Cấu trúc

- `src/BlockOne.jsx`: nội dung React dùng chung. Không truyền `concept` thì trang chính giữ nguyên bố cục và hình khối cũ.
- `src/CreativeConcept.jsx`: trang xem A/B/C riêng, thanh chuyển phương án và chọn để chỉnh sửa.
- `src/creative-concepts.css`: toàn bộ style mới nằm trong scope `.concept`.
- `src/CreativeComparison.jsx`: giao diện so sánh với iframe live, chuyển thiết bị, toàn màn hình, chọn và chia sẻ.
- `public/shapes/concepts`: sáu SVG mask ảnh, sáu SVG viền ảnh tương ứng và ba ribbon. Không chứa ảnh bitmap.

## Đường dẫn

- `/design-lab`: thư viện SVG cũ và khu so sánh mới.
- `/design-lab/concept-a`, `/design-lab/concept-b`, `/design-lab/concept-c`: Block 1 hoàn chỉnh.
- `?embed=1`: bỏ thanh đánh giá trong iframe; không đổi nội dung landing page.
- `?concept=b&device=mobile&chosen=b#creative-comparison`: ví dụ lưu phương án/thiết bị/lựa chọn trong URL, không áp dụng vào trang chính.

## Quyền sử dụng

Phát triển từ hướng contour S01/S04 và nhịp nhiều lớp S02/S03 đã xuất từ Haikei; đường cubic mới được tinh chỉnh riêng cho ảnh của dự án. Không trình bày các contour mới là bản xuất nguyên gốc từ Haikei. Xem `public/shapes/README.md` để biết nguồn và quyền sử dụng của thư viện nền tảng. Không tải ảnh mới, không tạo ảnh bằng AI, không thay file ảnh gốc.

## Kiểm tra

Kiểm tra Chromium production ở 1440, 1024, 768 và 390px cho từng phương án; chụp toàn trang cả ba phương án ở desktop và mobile. So sánh toàn bộ nội dung sau khi chuẩn hóa khoảng trắng; kiểm tra ảnh tải đủ, không tràn ngang hoặc tràn chữ, CTA mở và đóng hộp thông tin. Kiểm tra chuyển A/B/C, desktop/mobile, lưu lựa chọn sau tải lại, đường dẫn nguồn SVG và trang chính không bị áp dụng concept.

## Phương án đã chọn

Người dùng đã chọn A. Trang chính hiện dùng A với Be Vietnam Pro, Patrick Hand và icon Lucide. B/C giữ để tham khảo trong design lab; không tự áp dụng lựa chọn khác chỉ bằng cách bấm nút so sánh.
