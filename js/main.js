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

  // 2. AI Assistant (Siêu trợ lý SI Drawer)
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
          chatResponse.innerHTML = `<div style="margin-bottom:6px; color:#2d70b6; font-weight:700;">📌 Thông tin từ hồ sơ công khai:</div>${faqData[key]}<div style="margin-top:8px; font-size:10.5px; color:#8c9ba5; font-style:italic;">* Trích xuất từ hồ sơ chính thức của Thầy Dương Trung Hiếu.</div>`;
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

  // 5. Zalo QR Code interactive zoom & Fullscreen Modal
  const zaloQrBox = document.getElementById('zalo-qr-box');
  const zaloModal = document.getElementById('zalo-modal');
  const zaloModalClose = document.getElementById('zalo-modal-close');
  const btnOpenZaloModal = document.getElementById('btn-open-zalo-modal');

  function openZaloModal() {
    if (zaloModal) {
      zaloModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeZaloModal() {
    if (zaloModal) {
      zaloModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (zaloQrBox) {
    zaloQrBox.addEventListener('click', openZaloModal);
    zaloQrBox.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openZaloModal();
      }
    });
  }

  if (btnOpenZaloModal) {
    btnOpenZaloModal.addEventListener('click', openZaloModal);
  }

  if (zaloModalClose) {
    zaloModalClose.addEventListener('click', closeZaloModal);
  }

  if (zaloModal) {
    zaloModal.addEventListener('click', (e) => {
      if (e.target === zaloModal) {
        closeZaloModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && zaloModal && zaloModal.classList.contains('open')) {
      closeZaloModal();
    }
  });

  // 6. Interactive 3D Flip Photo Album
  const albumData = [
    {
      img: 'public/images/gallery/event1.svg',
      badge: 'SỰ KIỆN 01 / 04',
      title: 'Tập huấn Ứng dụng AI – Xã Trực Ninh',
      subtitle: 'Tổ Công nghệ số Cộng đồng · Hướng dẫn ứng dụng AI cho cán bộ và nhân dân cơ sở',
      backKicker: 'CHI TIẾT CHUYÊN ĐỀ',
      backTitle: 'Tập huấn Ứng dụng AI Cơ sở',
      backDesc: 'Chương trình trang bị kỹ năng khai thác các công cụ trí tuệ nhân tạo tạo sinh (Generative AI) vào thực tế giải quyết công việc hành chính công, phổ cập kỹ năng số và hỗ trợ đời sống cộng đồng.',
      bullets: [
        '✓ Phổ biến kỹ năng Prompting cơ bản',
        '✓ Thực hành tạo nội dung tuyên truyền',
        '✓ Hướng dẫn tra cứu văn bản quy phạm',
        '✓ Ứng dụng AI xử lý văn bản hành chính'
      ],
      time: 'Thời gian: 31/10/2026 · Địa điểm: Xã Trực Ninh'
    },
    {
      img: 'public/images/gallery/event2.svg',
      badge: 'SỰ KIỆN 02 / 04',
      title: 'AI trong Giáo dục & Đào tạo',
      subtitle: 'Tập huấn Cán bộ Quản lý & Giáo viên · Đổi mới phương pháp dạy học',
      backKicker: 'ỨNG DỤNG GIÁO DỤC',
      backTitle: 'Chuyển Đổi Số Giáo Dục Bằng AI',
      backDesc: 'Hướng dẫn giáo viên và cán bộ quản lý khai thác AI để tối ưu hóa thời gian soạn bài giảng, xây dựng ma trận đề kiểm tra và thiết kế học liệu số đa phương tiện sinh động.',
      bullets: [
        '✓ Thiết kế kế hoạch bài dạy chuẩn 5512',
        '✓ Tạo câu hỏi trắc nghiệm & rubrics chấm điểm',
        '✓ Tự động hóa slide bài giảng tương tác',
        '✓ Đổi mới phương pháp đánh giá học sinh'
      ],
      time: 'Thời gian: 01/11/2026 · Địa điểm: Xã Trực Ninh'
    },
    {
      img: 'public/images/gallery/event3.svg',
      badge: 'SỰ KIỆN 03 / 04',
      title: 'Chiến lược AI cho Nhà Lãnh đạo',
      subtitle: 'Tái định nghĩa mô hình kinh doanh với GenAI & Tự động hóa quản trị',
      backKicker: 'QUẢN TRỊ & DOANH NGHIỆP',
      backTitle: 'Tối Ưu Hóa Chi Phí & Tăng Tốc Hiệu Suất',
      backDesc: 'Chia sẻ góc nhìn chiến lược dành cho chủ doanh nghiệp SME và cấp quản lý về cách thức tích hợp AI vào quy trình vận hành, nâng cao năng suất nhân sự và giảm thiểu rủi ro.',
      bullets: [
        '✓ Phân tích ROI & chi phí ứng dụng AI',
        '✓ Tái cấu trúc quy trình công việc với AI',
        '✓ Quản trị dữ liệu & bảo mật thông tin nội bộ',
        '✓ Thiết kế trợ lý số chuyên trách từng phòng ban'
      ],
      time: 'Chuyên đề đào tạo doanh nghiệp & SME'
    },
    {
      img: 'public/images/gallery/event4.svg',
      badge: 'SỰ KIỆN 04 / 04',
      title: 'Xây dựng Trợ lý AI & Chatbot Thực chiến',
      subtitle: 'Hands-on Workshop · Thiết kế và vận hành AI Agent doanh nghiệp',
      backKicker: 'THỰC HÀNH CÔNG NGHỆ',
      backTitle: 'Làm Chủ Trợ Lý AI Trong 1 Ngày',
      backDesc: 'Khóa thực hành chuyên sâu kết nối tri thức doanh nghiệp vào các nền tảng AI Agent, tạo lập chatbot chăm sóc khách hàng và hệ thống thư ký số tự động.',
      bullets: [
        '✓ Cấu hình System Prompt chuẩn hóa',
        '✓ Tích hợp kho tài liệu và tri thức nội bộ',
        '✓ Kết nối kênh giao tiếp Telegram & Zalo',
        '✓ Thực hành kiểm thử và tối ưu câu trả lời'
      ],
      time: 'Workshop thực hành & chuyển giao giải pháp'
    }
  ];

  let currentSlide = 0;
  let autoplayTimer = null;

  const flipCard = document.getElementById('flip-card');
  const flipImg = document.getElementById('flip-img');
  const flipBadge = document.getElementById('flip-badge');
  const flipTitle = document.getElementById('flip-title');
  const flipSubtitle = document.getElementById('flip-subtitle');
  const flipBackKicker = document.getElementById('flip-back-kicker');
  const flipBackTitle = document.getElementById('flip-back-title');
  const flipBackDesc = document.getElementById('flip-back-desc');
  const flipBackBullets = document.getElementById('flip-back-bullets');
  const flipBackTime = document.getElementById('flip-back-time');
  const albumCounter = document.getElementById('album-counter');
  const btnPrev = document.getElementById('album-prev');
  const btnNext = document.getElementById('album-next');
  const btnAutoplay = document.getElementById('album-autoplay');
  const autoplayIcon = document.getElementById('autoplay-icon');
  const autoplayText = document.getElementById('autoplay-text');

  function renderSlide(index) {
    const data = albumData[index];
    if (!data) return;

    if (flipCard) flipCard.classList.remove('is-flipped');

    setTimeout(() => {
      if (flipImg) {
        flipImg.src = data.img;
        flipImg.alt = data.title;
      }
      if (flipBadge) flipBadge.textContent = data.badge;
      if (flipTitle) flipTitle.textContent = data.title;
      if (flipSubtitle) flipSubtitle.textContent = data.subtitle;
      if (flipBackKicker) flipBackKicker.textContent = data.backKicker;
      if (flipBackTitle) flipBackTitle.textContent = data.backTitle;
      if (flipBackDesc) flipBackDesc.textContent = data.backDesc;
      if (flipBackTime) flipBackTime.textContent = data.time;
      if (albumCounter) albumCounter.textContent = `${index + 1} / ${albumData.length}`;

      if (flipBackBullets) {
        flipBackBullets.innerHTML = data.bullets.map(b => `<li>${b}</li>`).join('');
      }
    }, 250);
  }

  if (flipCard) {
    flipCard.addEventListener('click', (e) => {
      if (e.target.closest('button') || e.target.closest('input')) return;
      flipCard.classList.toggle('is-flipped');
    });

    const flipBtnAction = document.getElementById('flip-btn-action');
    if (flipBtnAction) {
      flipBtnAction.addEventListener('click', (e) => {
        e.stopPropagation();
        flipCard.classList.add('is-flipped');
      });
    }

    const flipBtnBack = document.getElementById('flip-btn-back');
    if (flipBtnBack) {
      flipBtnBack.addEventListener('click', (e) => {
        e.stopPropagation();
        flipCard.classList.remove('is-flipped');
      });
    }
  }

  if (btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + albumData.length) % albumData.length;
      renderSlide(currentSlide);
    });

    btnNext.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % albumData.length;
      renderSlide(currentSlide);
    });
  }

  if (btnAutoplay) {
    btnAutoplay.addEventListener('click', () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
        if (autoplayIcon) autoplayIcon.textContent = '▶';
        if (autoplayText) autoplayText.textContent = 'Tự động lật';
        btnAutoplay.style.background = '#ffffff';
      } else {
        if (autoplayIcon) autoplayIcon.textContent = '⏸';
        if (autoplayText) autoplayText.textContent = 'Đang tự động';
        btnAutoplay.style.background = '#eaf2fa';
        
        autoplayTimer = setInterval(() => {
          if (flipCard && !flipCard.classList.contains('is-flipped')) {
            flipCard.classList.add('is-flipped');
          } else {
            currentSlide = (currentSlide + 1) % albumData.length;
            renderSlide(currentSlide);
          }
        }, 3600);
      }
    });
  }

  // 7. Video Playlist URL Dynamic Updater
  const playlistInput = document.getElementById('playlist-url-input');
  const playlistBtn = document.getElementById('playlist-update-btn');
  const playlistIframe = document.getElementById('event-playlist-iframe');

  if (playlistBtn && playlistInput && playlistIframe) {
    playlistBtn.addEventListener('click', () => {
      const url = playlistInput.value.trim();
      if (!url) {
        alert('Vui lòng dán đường dẫn danh sách phát (Playlist URL) từ YouTube.');
        return;
      }

      let listId = null;
      try {
        const parsed = new URL(url);
        listId = parsed.searchParams.get('list');
      } catch (err) {
        const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
        if (match) listId = match[1];
      }

      if (listId) {
        playlistIframe.src = `https://www.youtube.com/embed/videoseries?list=${listId}&autoplay=1&loop=1&rel=0`;
        playlistBtn.textContent = '✓ Đã cập nhật!';
        playlistBtn.style.background = '#10b981';
        playlistBtn.style.borderColor = '#10b981';
        setTimeout(() => {
          playlistBtn.textContent = 'Phát Playlist ↗';
          playlistBtn.style.background = '';
          playlistBtn.style.borderColor = '';
        }, 3000);
      } else {
        alert('Không tìm thấy mã danh sách phát (list ID) trong đường dẫn. Định dạng chuẩn: https://www.youtube.com/playlist?list=ID_DANH_SACH');
      }
    });
  }
});
