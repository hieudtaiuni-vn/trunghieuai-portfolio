const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Helper to extract content inside tags
function extractInner(html, startTag, endTag) {
  const startIdx = html.indexOf(startTag);
  if (startIdx === -1) return '';
  const contentStart = startIdx + startTag.length;
  const endIdx = html.indexOf(endTag, contentStart);
  if (endIdx === -1) return '';
  return html.substring(contentStart, endIdx);
}

// Extract projects content
const projectsInner = extractInner(indexHtml, '<section id="projects">', '</section>');

// Extract training content
const trainingInner = extractInner(indexHtml, '<section class="training" id="training">', '</section>');

// Extract articles content
const articlesInner = extractInner(indexHtml, '<section id="articles" class="articles-section">', '</section>');

// Extract press content
const pressInner = extractInner(indexHtml, '<section id="press" class="press-section">', '</section>');

// Extract album content
const albumInner = extractInner(indexHtml, '<section id="album" class="album-section">', '</section>');

// Extract media content
const mediaInner = extractInner(indexHtml, '<section id="media" class="media-section">', '</section>');

// Extract partners content
const partnersInner = extractInner(indexHtml, '<section id="partners" class="partners-section">', '</section>');

// Extract contact content
const contactInner = extractInner(indexHtml, '<section id="contact">', '</section>');

// Extract chatbox
const chatboxHtml = indexHtml.substring(
  indexHtml.indexOf('<!-- AI Assistant Launcher Button -->'),
  indexHtml.indexOf('</aside>') + '</aside>'.length
);

// Extract modals
const articleModalHtml = extractInner(indexHtml, '<!-- Article Reader Fullscreen Modal -->', '<!-- Zalo QR Code Fullscreen Modal Lightbox -->');
const zaloModalHtml = indexHtml.substring(
  indexHtml.indexOf('<!-- Zalo QR Code Fullscreen Modal Lightbox -->'),
  indexHtml.indexOf('<!-- Press & Media Coverage Data & Controller -->')
);

const dossierPageHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  
  <title>Hồ Sơ & Chi Tiết Toàn Diện | Dương Trung Hiếu - Giám Đốc Đào Tạo AIUNI</title>
  <meta name="title" content="Hồ Sơ & Chi Tiết Toàn Diện | Dương Trung Hiếu - Giám Đốc Đào Tạo AIUNI">
  <meta name="description" content="Hồ sơ năng lực chuyên sâu, triết lý quản trị, hành trình 20+ năm ngân hàng, 4 khung chương trình đào tạo chuẩn, hệ sinh thái dự án AI, tin tức, video và đối tác của Dương Trung Hiếu.">
  <meta name="keywords" content="Dương Trung Hiếu, hồ sơ năng lực, Đào tạo AI, AIUNI, Giáo án 5512, Chuyển đổi số, MBA FPT, Vietcombank, Quản trị SME">
  <meta name="author" content="Dương Trung Hiếu">
  <meta name="robots" content="index, follow">

  <link rel="canonical" href="https://trunghieuai.io.vn/ho-so-chi-tiet.html">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <link rel="apple-touch-icon" href="favicon.svg">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://trunghieuai.io.vn/ho-so-chi-tiet.html">
  <meta property="og:title" content="Hồ Sơ & Chi Tiết Toàn Diện | Dương Trung Hiếu - Giám Đốc Đào Tạo AIUNI">
  <meta property="og:description" content="Hồ sơ năng lực chuyên sâu, triết lý quản trị, 4 khung đào tạo chuẩn, hệ sinh thái dự án AI và 37+ báo chí nói về AIUNI.">
  <meta property="og:image" content="https://trunghieuai.io.vn/public/images/og-cover.png">
  <meta property="og:locale" content="vi_VN">
  <meta property="og:site_name" content="Dương Trung Hiếu Portfolio">

  <!-- Fonts & Stylesheet -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;850;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css?v=5.5">
</head>
<body class="detail-page-body">
  <!-- Scroll Progress Bar -->
  <div id="scroll-progress" class="scroll-progress-bar" aria-hidden="true"></div>

  <!-- Ambient Pointer Glow -->
  <div id="pointer-glow" class="pointer-glow" aria-hidden="true"></div>

  <!-- Fixed Video Background cho toàn bộ trang (Neo lại không bị trôi khi cuộn) -->
  <div class="site-fixed-video-bg" aria-hidden="true">
    <video autoplay loop muted playsinline poster="public/images/video-nen-poster.jpg" id="hero-bg-video">
      <source src="public/videos/video-nen.mp4" type="video/mp4">
    </video>
  </div>
  <div class="site-fixed-video-overlay" aria-hidden="true"></div>

  

  <!-- Navigation Header -->
  <header class="nav">
    <div class="wrap navin">
      <a class="brand" href="index.html" aria-label="Về Trang chủ Dương Trung Hiếu">
        <div class="brand-row">
          <div class="brand-icon">TH</div>
          <span>DƯƠNG TRUNG HIẾU</span>
        </div>
        <small>HỒ SƠ NĂNG LỰC & CHI TIẾT</small>
      </a>

      <nav class="nav-links" id="navlinks" aria-label="Menu điều hướng">
        <a href="index.html" style="color: #0284c7; font-weight: 750;">← Về Trang Chủ</a>
        <a href="#gioi-thieu">Giới thiệu</a>
        <a href="#hanh-trinh">Hành trình</a>
        <a href="#nang-luc">Năng lực</a>
        <a href="#du-an">Dự án</a>
        <a href="#dao-tao">Đào tạo</a>
        <a href="#tin-tuc">Tin tức</a>
        <a href="#bao-chi">Báo chí</a>
        <a href="#doi-tac">Đối tác</a>
        <a href="#lien-he">Liên hệ</a>
      </nav>

      <a class="btn nav-cta" href="#lien-he">Liên hệ hợp tác ↗</a>
      <button class="menu-toggle" id="menubtn" aria-label="Mở menu điều hướng" aria-expanded="false" aria-controls="navlinks">☰</button>
    </div>
  </header>

  <main class="detail-page-wrapper">
    <!-- Top Dossier Header Banner -->
    <div class="wrap" style="margin-bottom: 36px;">
      <div class="frosted-card" style="padding: 38px 44px; text-align: center; border-radius: 24px;">
        <span class="eyebrow" style="display:inline-block; margin-bottom:12px;">EXECUTIVE DOSSIER · HỒ SƠ TOÀN DIỆN</span>
        <h1 style="font-size: 32px; font-weight: 850; color: var(--navy); margin-bottom: 12px; line-height: 1.25;">Hồ Sơ Năng Lực & Hệ Sinh Thái Chi Tiết</h1>
        <p style="font-size: 15.5px; color: #334155; max-width: 820px; margin: 0 auto 22px; line-height: 1.6;">Dương Trung Hiếu – Giám đốc Đào tạo Học viện Công nghệ AIUNI. Tổng hợp đầy đủ triết lý quản trị, hành trình 20+ năm ngân hàng, 4 trụ cột năng lực, 4 khung đào tạo chuẩn mực, bài viết, báo chí truyền thông và hệ sinh thái đối tác.</p>
        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
          <a href="index.html" class="btn sm" style="background:#ffffff; color:var(--navy); border:1.5px solid #cbd5e1; box-shadow: 0 4px 14px rgba(0,0,0,0.06);">← Quay lại Trang Chủ Tinh Gọn</a>
          <a href="#lien-he" class="btn sm" style="background:linear-gradient(135deg, #0284c7, #2563eb); color:#ffffff; box-shadow: 0 6px 20px rgba(2,132,199,0.35);">Đăng Ký Tư Vấn / Mời Giảng ↗</a>
        </div>
      </div>
    </div>

    <!-- Main Layout with Sticky Sidebar Table of Contents -->
    <div class="wrap detail-layout">
      
      <!-- Sticky Sidebar Table of Contents -->
      <aside class="detail-sidebar-toc frosted-card" aria-label="Mục lục hồ sơ">
        <div class="toc-header">
          <span>📑</span>
          <span>MỤC LỤC HỒ SƠ</span>
        </div>
        <ul class="toc-nav-list" id="toc-nav-list">
          <li><a href="#gioi-thieu" class="toc-nav-link active"><span class="toc-nav-icon">🧭</span><span>1. Giới thiệu & Triết lý</span></a></li>
          <li><a href="#hanh-trinh" class="toc-nav-link"><span class="toc-nav-icon">🏛️</span><span>2. Hành trình & Bằng cấp</span></a></li>
          <li><a href="#nang-luc" class="toc-nav-link"><span class="toc-nav-icon">⚡</span><span>3. 4 Trụ cột Năng lực</span></a></li>
          <li><a href="#du-an" class="toc-nav-link"><span class="toc-nav-icon">🚀</span><span>4. Dự án & Giải pháp AI</span></a></li>
          <li><a href="#dao-tao" class="toc-nav-link"><span class="toc-nav-icon">🎓</span><span>5. 4 Khung Đào tạo Chuẩn</span></a></li>
          <li><a href="#tin-tuc" class="toc-nav-link"><span class="toc-nav-icon">📰</span><span>6. Tin tức & Chuyên môn</span></a></li>
          <li><a href="#video" class="toc-nav-link"><span class="toc-nav-icon">🎥</span><span>7. Video & Bài giảng 1080p</span></a></li>
          <li><a href="#album" class="toc-nav-link"><span class="toc-nav-icon">📸</span><span>8. Album Ảnh Hoạt động</span></a></li>
          <li><a href="#bao-chi" class="toc-nav-link"><span class="toc-nav-icon">📰</span><span>9. 37+ Báo chí nói về AIUNI</span></a></li>
          <li><a href="#doi-tac" class="toc-nav-link"><span class="toc-nav-icon">🤝</span><span>10. Đối tác & Đồng hành</span></a></li>
          <li><a href="#lien-he" class="toc-nav-link"><span class="toc-nav-icon">📬</span><span>11. Thông tin Liên hệ</span></a></li>
        </ul>
        <div class="toc-back-home">
          <a href="index.html" class="toc-back-link">
            <span>←</span>
            <span>Về Trang Chủ Tinh Gọn</span>
          </a>
        </div>
      </aside>

      <!-- Main Detailed Content Sections -->
      <div class="detail-main-content">

        <!-- 1. Giới thiệu & Triết lý -->
        <section id="gioi-thieu" class="detail-section-block frosted-card">
          <div class="section-head" style="margin-bottom: 24px;">
            <div>
              <span class="kicker">ABOUT PHILOSOPHY</span>
              <h2>Giới thiệu & Triết lý quản trị</h2>
            </div>
            <p>Định hướng đưa AI từ công nghệ đơn thuần thành năng lực cốt lõi và giải pháp giải quyết vấn đề thực tiễn cho tổ chức.</p>
          </div>

          <div class="about-grid" style="display:grid; grid-template-columns: 1fr 1fr; gap: 32px;">
            <div class="about-panel" style="background: rgba(2, 132, 199, 0.05); padding: 28px; border-radius: 18px; border: 1px solid rgba(2, 132, 199, 0.15);">
              <span class="kicker" style="color: #0284c7;">CORE VISION</span>
              <div class="big" style="font-size: 26px; font-weight: 850; color: var(--navy); margin: 12px 0;">Tư duy quản trị.<br>Ứng dụng công nghệ.</div>
              <p style="color: #334155; line-height: 1.6;">Hoạt động trong lĩnh vực đào tạo và ứng dụng trí tuệ nhân tạo tạo sinh, chuyển đổi số và quản trị doanh nghiệp. Luôn đặt hiệu quả kinh tế và giải quyết bài toán thực tiễn của học viên lên hàng đầu.</p>
            </div>

            <div class="about-copy">
              <span class="kicker" style="color: #0284c7;">EXECUTIVE STATEMENT</span>
              <h3 style="font-size: 20px; font-weight: 800; color: var(--navy); margin: 6px 0 14px;">Dương Trung Hiếu</h3>
              <p style="color: #334155; line-height: 1.65; margin-bottom: 14px;">Nền tảng nghề nghiệp được hình thành và tôi luyện qua gần hai thập kỷ trong lĩnh vực tài chính – ngân hàng, thẩm định và quản lý điều hành.</p>
              <p style="color: #334155; line-height: 1.65;">Hiện tại trên cương vị Giám đốc Đào tạo Học viện Công nghệ AIUNI, Thầy Dương Trung Hiếu trực tiếp thiết kế các chương trình chuyển đổi số, tập huấn AI cho các cơ quan Đảng, chính quyền, sở ban ngành, trường học và cộng đồng doanh nghiệp trên cả nước.</p>
            </div>
          </div>
        </section>

        <!-- 2. Hành trình & Bằng cấp -->
        <section id="hanh-trinh" class="detail-section-block frosted-card">
          <div class="section-head" style="margin-bottom: 24px;">
            <div>
              <span class="kicker">CREDENTIALS & BACKGROUND</span>
              <h2>Hành trình nghề nghiệp & Bằng cấp</h2>
            </div>
            <p>Hơn 20 năm kinh nghiệm quản trị tài chính - ngân hàng và nghiên cứu đào tạo công nghệ AI.</p>
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 32px;">
            <!-- Bằng cấp -->
            <div>
              <h3 style="font-size: 18px; font-weight: 800; color: var(--navy); margin-bottom: 16px; display:flex; align-items:center; gap:8px;">
                <span>🎓</span> Nền Tảng Học Vấn
              </h3>
              <div class="edu-box" style="display:flex; flex-direction:column; gap:14px;">
                <div class="edu-item" style="padding:16px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px;">
                  <strong style="color:var(--navy); font-size:15px; display:block; margin-bottom:4px;">🎓 Đại học Kinh tế Quốc dân (2002 – 2006)</strong>
                  <span style="color:#0284c7; font-weight:600;">Cử nhân Kinh tế · Khoa Quản trị Kinh doanh</span>
                </div>
                <div class="edu-item" style="padding:16px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px;">
                  <strong style="color:var(--navy); font-size:15px; display:block; margin-bottom:4px;">🎓 Đại học FPT (2017 – 2019)</strong>
                  <span style="color:#0284c7; font-weight:600;">Thạc sĩ Quản trị Kinh doanh (MBA)</span>
                </div>
              </div>
            </div>

            <!-- Hành trình công tác -->
            <div>
              <h3 style="font-size: 18px; font-weight: 800; color: var(--navy); margin-bottom: 16px; display:flex; align-items:center; gap:8px;">
                <span>🏛️</span> Hành Trình Ngân Hàng & Quản Trị
              </h3>
              <div class="timeline">
                <div class="tl">
                  <strong>2025 – nay · Học viện Công nghệ AIUNI</strong>
                  <span>Giám đốc Đào tạo</span>
                </div>
                <div class="tl">
                  <strong>2019 – 2025 · Vietcombank</strong>
                  <span>Team Lead Thẩm định Khách hàng Doanh nghiệp</span>
                </div>
                <div class="tl">
                  <strong>2016 – 2019 · OCB</strong>
                  <span>Trưởng phòng SME</span>
                </div>
                <div class="tl">
                  <strong>2009 – 2015 · GPBank</strong>
                  <span>Trưởng phòng Giao dịch</span>
                </div>
                <div class="tl">
                  <strong>2006 – 2009 · Techcombank</strong>
                  <span>Chuyên viên Quản lý Khách hàng</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 3. 4 Trụ cột Năng lực Chi Tiết -->
        <section id="nang-luc" class="detail-section-block frosted-card">
          <div class="section-head" style="margin-bottom: 24px;">
            <div>
              <span class="kicker">WHAT I DO</span>
              <h2>4 Trụ cột năng lực chuyên môn</h2>
            </div>
            <p>Kết hợp nền tảng quản trị với tư duy công nghệ để phát triển các giải pháp AI có khả năng ứng dụng thực tế cao.</p>
          </div>

          <div class="grid4" style="gap:20px;">
            <article class="card pillar-card" style="background:#ffffff; border:1px solid #e2e8f0;">
              <div class="icon">✳</div>
              <h3 style="color:var(--navy);">AI Strategy & Education</h3>
              <p style="color:#334155;">Đào tạo Generative AI, thiết kế chương trình và phát triển năng lực ứng dụng AI bài bản cho cá nhân và tổ chức.</p>
            </article>

            <article class="card pillar-card" style="background:#ffffff; border:1px solid #e2e8f0;">
              <div class="icon">⌘</div>
              <h3 style="color:var(--navy);">AI Solutions & Automation</h3>
              <p style="color:#334155;">Trợ lý AI, chatbot, AI Agent, hệ thống tri thức và tự động hóa quy trình nghiệp vụ thông minh.</p>
            </article>

            <article class="card pillar-card" style="background:#ffffff; border:1px solid #e2e8f0;">
              <div class="icon">◈</div>
              <h3 style="color:var(--navy);">Digital Transformation</h3>
              <p style="color:#334155;">Ứng dụng công nghệ trong giáo dục, quản trị, hành chính và đổi mới mô hình vận hành kinh doanh.</p>
            </article>

            <article class="card pillar-card" style="background:#ffffff; border:1px solid #e2e8f0;">
              <div class="icon">▥</div>
              <h3 style="color:var(--navy);">Business Management</h3>
              <p style="color:#334155;">Nền tảng tài chính – ngân hàng, thẩm định tín dụng, quản trị rủi ro và quản trị doanh nghiệp vững chắc.</p>
            </article>
          </div>
        </section>

        <!-- 4. Dự án & Giải pháp AI -->
        <section id="du-an" class="detail-section-block frosted-card">
          ${projectsInner}
        </section>

        <!-- 5. 4 Khung Chương trình Đào tạo Chuẩn -->
        <section id="dao-tao" class="detail-section-block frosted-card">
          ${trainingInner}
        </section>

        <!-- 6. Tin tức & Chuyên môn (Render qua js/articles.js) -->
        <section id="tin-tuc" class="detail-section-block frosted-card articles-section">
          ${articlesInner}
        </section>

        <!-- 7. Video Bài Giảng 1080p -->
        <section id="video" class="detail-section-block frosted-card media-section">
          ${mediaInner}
        </section>

        <!-- 8. Album Ảnh Hoạt Động (Render qua js/main.js) -->
        <section id="album" class="detail-section-block frosted-card album-section">
          ${albumInner}
        </section>

        <!-- 9. 37+ Báo chí nói về AIUNI (Render qua js/press.js) -->
        <section id="bao-chi" class="detail-section-block frosted-card press-section">
          ${pressInner}
        </section>

        <!-- 10. Đối tác & Hệ sinh thái Đồng hành -->
        <section id="doi-tac" class="detail-section-block frosted-card partners-section">
          ${partnersInner}
        </section>

        <!-- 11. Khối Liên Hệ Hợp Tác -->
        <section id="lien-he" class="detail-section-block frosted-card">
          ${contactInner}
        </section>

      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer>
    <div class="wrap footin">
      <div class="foot-left">
        <div class="brand-row">
          <div class="brand-icon">TH</div>
          <span>DƯƠNG TRUNG HIẾU</span>
        </div>
        <small>Giám đốc Đào tạo · Học viện Công nghệ AIUNI</small>
        <div style="margin-top: 10px; font-size: 13px; color: var(--muted); line-height: 1.5;">
          Hồ sơ năng lực & hệ sinh thái chuyển đổi số toàn diện.
        </div>
      </div>
      <div class="foot-center">AI · TECHNOLOGY · INNOVATION</div>
      <div class="foot-right">
        <a href="index.html" style="color: var(--blue); font-weight: 600;">← Về Trang Chủ</a>
        <a href="https://www.facebook.com/share/19d3eRzBgQ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style="color: var(--blue); font-weight: 600;">Facebook ↗</a>
        <span>© 2026 Dương Trung Hiếu</span>
        <a href="#home" id="backtotop" class="back-to-top" aria-label="Lên đầu trang">↑ Đầu trang</a>
      </div>
    </div>
  </footer>

  ${chatboxHtml}

  <!-- Portfolio Config & Cloud CMS Settings -->
  <script src="js/config.js?v=5.5"></script>

  <!-- Pre-compiled Articles Data -->
  <script src="js/articles-data.js?v=5.5"></script>

  <!-- Articles Module -->
  <script src="js/articles.js?v=5.5"></script>

  <!-- Press & Media Data & Controller -->
  <script src="js/press-data.js?v=5.5"></script>
  <script src="js/press.js?v=5.5"></script>

  <!-- Main JavaScript File -->
  <script src="js/main.js?v=5.5"></script>

  <!-- Article Reader Fullscreen Modal -->
  <div id="article-modal" class="article-modal-backdrop" role="dialog" aria-modal="true" aria-label="Đọc bài viết chi tiết">
    <div class="article-modal-window">
      <button class="article-modal-close" id="article-modal-close" aria-label="Đóng bài viết">✕</button>
      <div class="article-modal-content" id="article-modal-content">
        <!-- Nội dung bài viết chi tiết được nạp động tại đây -->
      </div>
    </div>
  </div>

  ${zaloModalHtml}
</body>
</html>
`;

fs.writeFileSync('ho-so-chi-tiet.html', dossierPageHtml, 'utf8');
console.log('Successfully regenerated clean ho-so-chi-tiet.html');
