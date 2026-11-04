# PORTFOLIO DƯƠNG TRUNG HIẾU — trunghieuai.io.vn

> **Brand line:** AI · TECHNOLOGY · INNOVATION  
> **Slogan:** *Kiến tạo giá trị mới bằng AI và công nghệ.*  
> **Domain mục tiêu:** [https://trunghieuai.io.vn](https://trunghieuai.io.vn)  
> **Phiên bản:** MVP 1.0 (Ready for Vercel)

---

## 1. Tổng quan dự án

Website Portfolio chính thức cho thương hiệu **DƯƠNG TRUNG HIẾU**, xây dựng theo chuẩn hiện đại, siêu nhẹ, tốc độ tải tức thì (100% Core Web Vitals), chuẩn SEO, responsive hoàn chỉnh trên Mobile / Tablet / Desktop.

### Bốn trụ cột năng lực cốt lõi
1. **AI Strategy & Education:** Đào tạo Generative AI, thiết kế chương trình và phát triển năng lực ứng dụng AI bài bản.
2. **AI Solutions & Automation:** Trợ lý AI, chatbot, AI Agent, hệ thống tri thức và tự động hóa quy trình nghiệp vụ.
3. **Digital Transformation:** Ứng dụng công nghệ trong giáo dục, quản trị, hành chính và đổi mới mô hình vận hành.
4. **Business Management:** Nền tảng tài chính – ngân hàng, thẩm định tín dụng, quản trị rủi ro và quản trị doanh nghiệp.

---

## 2. Cấu trúc thư mục

```text
PORTFOLIO TRUNG HIEU/
├── index.html                  # Giao diện chính responsive, semantic HTML5, Schema JSON-LD
├── css/
│   └── styles.css              # Hệ thống style Light theme (Navy/Blue/White), tối ưu CSS variables
├── js/
│   └── main.js                 # Xử lý điều hướng, mobile menu, fallback ảnh chân dung & demo Trợ lý AI
├── public/
│   ├── images/
│   │   ├── portrait.svg        # Vector placeholder nghệ thuật khi chưa nạp ảnh chụp thật
│   │   ├── og-cover.svg        # Ảnh xem trước chia sẻ mạng xã hội (Facebook, Zalo, LinkedIn)
│   │   └── README.md           # Hướng dẫn thay thế ảnh
│   ├── favicon.svg             # Favicon vector sắc nét
│   ├── robots.txt              # Chỉ dẫn crawler & liên kết sitemap
│   └── sitemap.xml             # Sitemap chuẩn hóa cho domain trunghieuai.io.vn
├── favicon.svg                 # Root favicon fallback
├── robots.txt                  # Root robots.txt
├── sitemap.xml                 # Root sitemap.xml
├── vercel.json                 # Cấu hình tối ưu bảo mật, cleanUrls và caching headers trên Vercel
├── package.json                # Cấu hình script npm dev/build
├── .gitignore                  # Bỏ qua file rác, biến môi trường và cache
├── README.md                   # Tài liệu hướng dẫn toàn diện
└── PORTFOLIO_DEPLOYMENT_BRIEF_DUONG_TRUNG_HIEU.md # Tài liệu đặc tả bàn giao gốc
```

---

## 3. Hướng dẫn chạy thử nghiệm tại máy cá nhân (Local Development)

### Cách 1: Sử dụng Python (khuyên dùng, không cần cài đặt thêm)
Mở PowerShell hoặc Command Prompt tại thư mục dự án và chạy:
```bash
python -m http.server 3000
```
Truy cập trình duyệt: `http://localhost:3000`

### Cách 2: Sử dụng Node.js / npx
```bash
npx serve . -p 3000
```
Truy cập trình duyệt: `http://localhost:3000`

---

## 4. Hướng dẫn Triển khai lên Vercel (Deployment)

Dự án được tối ưu tĩnh (Static Site), tương thích 100% với Vercel mà không cần cấu hình build phức tạp.

### Phương án A: Triển khai qua GitHub (Khuyến nghị để cập nhật tự động)
1. Khởi tạo Git và đẩy mã nguồn lên GitHub của bạn:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit for Duong Trung Hieu portfolio MVP"
   git branch -M main
   # Đổi link dưới thành repo GitHub của bạn:
   git remote add origin https://github.com/<tai-khoan-cua-ban>/trunghieuai-portfolio.git
   git push -u origin main
   ```
2. Đăng nhập [vercel.com](https://vercel.com).
3. Bấm **Add New...** → **Project** → Chọn kho lưu trữ `trunghieuai-portfolio`.
4. Tại mục **Framework Preset**, chọn **Other** (mặc định cho static site).
5. Bấm **Deploy**. Sau 15-30 giây, Vercel sẽ cung cấp một đường dẫn xem trước (ví dụ: `https://trunghieuai-portfolio.vercel.app`).

### Phương án B: Triển khai trực tiếp bằng Vercel CLI
1. Mở terminal tại thư mục này.
2. Chạy lệnh:
   ```bash
   vercel
   ```
3. Đăng nhập tài khoản Vercel theo hướng dẫn trong terminal và chọn triển khai (Deploy).
4. Để xuất bản bản production:
   ```bash
   vercel --prod
   ```

---

## 5. Hướng dẫn Cấu hình Tên miền `trunghieuai.io.vn`

> ⚠️ **LƯU Ý AN TOÀN BẮT BUỘC:**  
> Tuyệt đối không cung cấp mật khẩu tài khoản Mắt Bão hay Vercel cho bất kỳ bên thứ ba hay AI nào. Chủ website tự thực hiện các bước đối chiếu dưới đây:

### Bước 1: Khai báo Domain trên Vercel
1. Đăng nhập Vercel, mở Project Portfolio vừa tạo.
2. Vào **Settings** → **Domains**.
3. Nhập `trunghieuai.io.vn` vào ô và nhấn **Add**.
4. Vercel sẽ gợi ý thêm cả bản ghi cho `www.trunghieuai.io.vn` (bạn nên chọn phương án redirect `www` về domain gốc hoặc ngược lại theo đề xuất của Vercel).

### Bước 2: Xem các bản ghi DNS mà Vercel yêu cầu
Vercel sẽ hiển thị bảng trạng thái và cung cấp chính xác các bản ghi DNS cần cấu hình, thông thường gồm:
- Bản ghi cho Apex Domain (`@` hoặc `trunghieuai.io.vn`):
  - **Type:** `A`
  - **Name / Host:** `@`
  - **Value / Points to:** `76.76.21.21` (hoặc giá trị Vercel ghi trên màn hình của bạn)
- Bản ghi cho Subdomain `www`:
  - **Type:** `CNAME`
  - **Name / Host:** `www`
  - **Value / Points to:** `cname.vercel-dns.com.` (hoặc theo chỉ định của Vercel)

### Bước 3: Cấu hình DNS tại Mắt Bão
1. Đăng nhập trang quản lý dịch vụ tại **id.matbao.net**.
2. Chọn mục **Quản lý tên miền** → Chọn tên miền `trunghieuai.io.vn` → **Quản lý DNS**.
3. Nhập chính xác các giá trị `Type`, `Host` và `Giá trị IP/CNAME` mà Vercel đã hiển thị ở Bước 2.
4. Bấm **Lưu cấu hình**.

### Bước 4: Kiểm tra và Kích hoạt SSL
- Thời gian cập nhật DNS thường mất từ 5 phút đến 24 giờ.
- Sau khi DNS nhận diện, Vercel sẽ tự động cấp chứng chỉ SSL miễn phí (HTTPS) cho domain `trunghieuai.io.vn`.

---

## 6. Danh sách Dữ liệu & Trạng thái Kiểm toán Nội dung

| STT | Hạng mục | Tệp / Vị trí | Trạng thái | Ghi chú chi tiết |
|:---:|---|---|---|---|
| 1 | **Ảnh chân dung thật** | `public/images/portrait.jpeg` | ✅ **Đã nạp ảnh thật** | File `portrait.jpeg` đã được kết nối tự động trên giao diện Hero |
| 2 | **Email liên hệ** | `index.html` (#contact) | ✅ **Đã xác thực** | `hieudt.aiuni@gmail.com` |
| 3 | **Kênh Zalo & SĐT** | `index.html` (#contact) | ✅ **Đã cấu hình mã QR** | Không công khai SĐT; hiển thị mã QR `public/images/zalohieu.jpg` |
| 4 | **Liên kết Mạng xã hội** | `index.html` (#contact & footer) | ✅ **Đã kết nối** | Facebook cá nhân: `https://www.facebook.com/share/19d3eRzBgQ/?mibextid=wwXIfr` |
| 5 | **Chức danh hiện tại** | `index.html` (#about, hero, schema) | ✅ **Đã xác nhận** | Giám đốc Đào tạo · Học viện Công nghệ AIUNI |
| 6 | **Dự án & Giải pháp** | `index.html` (#projects) | ⚠️ Đang xác minh trạng thái | Chọn 3–5 dự án có sản phẩm/demo thực tế và được phép công bố |
| 7 | **Hoạt động đào tạo** | `index.html` (#training) | ⚠️ Cần xác nhận vai trò và tư liệu | Bổ sung hình ảnh thực tế và xác nhận vai trò tại Trực Ninh |

---

## 7. Kiến trúc Trợ lý AI (Kế hoạch Mở rộng Tương lai)

Trong phiên bản MVP hiện tại:
- Trợ lý **Trung AI** hoạt động ở chế độ **UI Demo**: tra cứu nhanh các thông tin đã được kiểm chứng từ chính hồ sơ công khai, có thông báo minh bạch `Chưa kết nối mô hình AI`.
- **Tuyệt đối không nhúng API Key hoặc mật khẩu vào mã frontend.**

### Khi sẵn sàng nâng cấp AI thực thụ:
1. Tạo một Vercel Serverless Function hoặc Next.js API Route tại `/api/chat`.
2. Lưu API Key trong **Vercel Dashboard → Project Settings → Environment Variables** (ví dụ `GEMINI_API_KEY` hoặc `OPENAI_API_KEY`).
3. Tích hợp RAG (Retrieval-Augmented Generation) truy xuất từ bộ hồ sơ cá nhân đã được phê duyệt.
