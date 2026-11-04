/**
 * PORTFOLIO DƯƠNG TRUNG HIẾU - MAIN JAVASCRIPT
 * Brand: DƯƠNG TRUNG HIẾU | trunghieuai.io.vn
 * Description: Lightweight, vanilla JavaScript for UI interactions, accessibility, and AI demo drawer.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const menuBtn = document.getElementById('menubtn');
  const navLinks = document.getElementById('navlinks');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!isExpanded));
      navLinks.classList.toggle('show');
      menuBtn.innerHTML = !isExpanded ? '✕' : '☰';
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.innerHTML = '☰';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuBtn.contains(e.target) && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.innerHTML = '☰';
      }
    });
  }

  // 2. AI Assistant (Trung AI Demo Drawer)
  const chatLaunch = document.getElementById('chatlaunch');
  const chatBox = document.getElementById('chatbox');
  const chatClose = document.getElementById('chatclose');
  const chatResponse = document.getElementById('chatresponse');
  const faqChips = document.querySelectorAll('.chip-btn');

  const faqData = {
    'dinhvi': '<strong>Định vị thương hiệu:</strong> Dương Trung Hiếu hiện là <em>Giám đốc Đào tạo Học viện Công nghệ AIUNI</em>, hoạt động chuyên sâu trong lĩnh vực Đào tạo và Ứng dụng AI tạo sinh, Chuyển đổi số và Quản trị doanh nghiệp, với slogan: <em>"Kiến tạo giá trị mới bằng AI và công nghệ."</em>',
    'trucot': '<strong>4 Trụ cột chuyên môn chính:</strong><br>1. AI Strategy & Education<br>2. AI Solutions & Automation<br>3. Digital Transformation<br>4. Business Management (Nền tảng tài chính - ngân hàng & quản trị).',
    'hocvan': '<strong>Học vấn & Vị trí hiện tại:</strong><br>• Giám đốc Đào tạo · Học viện Công nghệ AIUNI (2025 – nay)<br>• Cử nhân Đại học Kinh tế Quốc dân (2002–2006)<br>• Thạc sĩ QTKD (MBA) Đại học FPT (2017–2019)<br>• Gần 20 năm kinh nghiệm trong lĩnh vực tài chính - ngân hàng và quản lý cấp cao.',
    'lienhe': '<strong>Kênh liên hệ chính thức:</strong><br>• Email: <a href="mailto:hieudt.aiuni@gmail.com" style="color:#2d70b6;font-weight:700;">hieudt.aiuni@gmail.com</a><br>• Zalo: Quét mã QR chính thức tại mục Kết nối<br>• Facebook cá nhân: <a href="https://www.facebook.com/share/19d3eRzBgQ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style="color:#2d70b6;font-weight:700;">Dương Trung Hiếu ↗</a>'
  };

  if (chatLaunch && chatBox && chatClose) {
    chatLaunch.addEventListener('click', () => {
      const isOpen = chatBox.classList.contains('open');
      if (isOpen) {
        chatBox.classList.remove('open');
        chatLaunch.setAttribute('aria-expanded', 'false');
      } else {
        chatBox.classList.add('open');
        chatLaunch.setAttribute('aria-expanded', 'true');
      }
    });

    chatClose.addEventListener('click', () => {
      chatBox.classList.remove('open');
      chatLaunch.setAttribute('aria-expanded', 'false');
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && chatBox.classList.contains('open')) {
        chatBox.classList.remove('open');
        chatLaunch.setAttribute('aria-expanded', 'false');
      }
    });

    // Handle FAQ interactive chips
    faqChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const key = chip.getAttribute('data-faq');
        if (chatResponse && faqData[key]) {
          chatResponse.innerHTML = `<div style="margin-bottom:6px; color:#2d70b6; font-weight:700;">📌 Thông tin từ hồ sơ công khai:</div>${faqData[key]}<div style="margin-top:8px; font-size:10.5px; color:#8c9ba5; font-style:italic;">* Lưu ý: Đây là câu trả lời tĩnh từ bản giới thiệu MVP; chưa kết nối API AI.</div>`;
          chatResponse.classList.add('active');
          chatResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });
  }

  // 3. Fallback for Portrait Image (check if real photo portrait.jpg exists)
  const portraitImg = document.getElementById('portrait-real-img');
  const portraitFallback = document.getElementById('portrait-vector-placeholder');

  if (portraitImg && portraitFallback) {
    const testImg = new Image();
    testImg.src = portraitImg.getAttribute('src');
    testImg.onload = () => {
      portraitImg.style.display = 'block';
      portraitFallback.style.display = 'none';
    };
    testImg.onerror = () => {
      portraitImg.style.display = 'none';
      portraitFallback.style.display = 'block';
    };
  }

  // 4. Back to top smooth scroll
  const backToTopBtn = document.getElementById('backtotop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. Zalo QR Code interactive zoom on click / touch
  const zaloQrBox = document.getElementById('zalo-qr-box');
  if (zaloQrBox) {
    zaloQrBox.addEventListener('click', (e) => {
      e.stopPropagation();
      zaloQrBox.classList.toggle('zoomed');
    });

    document.addEventListener('click', (e) => {
      if (!zaloQrBox.contains(e.target)) {
        zaloQrBox.classList.remove('zoomed');
      }
    });

    zaloQrBox.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        zaloQrBox.classList.toggle('zoomed');
      }
    });
  }
});
