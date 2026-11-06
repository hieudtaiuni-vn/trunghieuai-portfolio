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

  // 2. AI Assistant (ELON MUSK Live Chat Drawer)
  const chatLaunch = document.getElementById('chatlaunch');
  const chatBox = document.getElementById('chatbox');
  const chatClose = document.getElementById('chatclose');
  const chatMessages = document.getElementById('chat-messages-container');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const quickPills = document.querySelectorAll('.chat-quick-btn');

  // Lịch sử hội thoại
  const chatHistory = [
    {
      role: 'assistant',
      text: 'Xin chào! Tôi là ELON MUSK - Trợ lý AI trên Portfolio chính thức của Thầy Dương Trung Hiếu. Tôi có thể hỗ trợ gì cho bạn về các khóa học, công nghệ hay kế hoạch chuyển đổi số?'
    }
  ];

  const GEMINI_API_KEY_FALLBACK = '';
  const GEMINI_MODEL_FALLBACK = 'gemini-flash-lite-latest';
  const SYSTEM_INSTRUCTION_TEXT = `Bạn là ELON MUSK - Trợ lý AI cao cấp trên website Portfolio của Thầy DƯƠNG TRUNG HIẾU (trunghieuai.io.vn).
Nắm vững toàn bộ hồ sơ của Thầy Hiếu:
- Giám đốc Đào tạo Học viện Công nghệ AIUNI (2025 - nay).
- Cử nhân ĐH Kinh tế Quốc dân (K44), Thạc sĩ QTKD (MBA) ĐH FPT.
- Gần 20 năm kinh nghiệm tài chính - ngân hàng & quản lý cấp cao (Vietcombank, OCB, GPBank, Techcombank).
- 4 Trụ cột chuyên môn: AI Strategy & Education, AI Solutions & Automation, Digital Transformation, Business Management & Financial Analysis.
- Các khóa học tiêu biểu: Ứng dụng GenAI cho Tổ CNS cộng đồng, Đổi mới dạy học chuẩn Công văn 5512 cho giáo viên, Lộ trình GenAI tinh gọn cho SME, Workshop Xây dựng Trợ lý ảo trong 1 ngày.
- Tư vấn nhiệt tình, chuyên nghiệp, thông tuệ, trả lời bằng Tiếng Việt rõ ràng với gạch đầu dòng và in đậm.
- Khi cần kết nối hợp tác, hướng dẫn gửi email hieudt.aiuni@gmail.com hoặc quét mã QR Zalo trên web.`;

  // Toggle mở/đóng hộp chat
  if (chatLaunch && chatBox && chatClose) {
    chatLaunch.addEventListener('click', () => {
      const isOpen = chatBox.classList.contains('open');
      if (isOpen) {
        chatBox.classList.remove('open');
        chatLaunch.setAttribute('aria-expanded', 'false');
      } else {
        chatBox.classList.add('open');
        chatLaunch.setAttribute('aria-expanded', 'true');
        setTimeout(() => {
          if (chatInput) chatInput.focus();
        }, 150);
      }
    });

    chatClose.addEventListener('click', () => {
      chatBox.classList.remove('open');
      chatLaunch.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && chatBox.classList.contains('open')) {
        chatBox.classList.remove('open');
        chatLaunch.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Xử lý bấm vào các câu hỏi gợi ý nhanh
  quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const query = pill.getAttribute('data-query');
      if (query && chatInput) {
        chatInput.value = query;
        sendMessage(query);
      }
    });
  });

  // Xử lý gửi tin nhắn từ form
  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (!message) return;
      sendMessage(message);
    });
  }

  function formatMarkdown(text) {
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // Links
    html = html.replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#2d70b6;text-decoration:underline;">$1</a>');

    // Lists and paragraphs
    const lines = html.split(/\r?\n/);
    let inList = false;
    const formattedLines = [];

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ')) {
        if (!inList) {
          formattedLines.push('<ul style="margin:6px 0 8px 18px;padding:0;">');
          inList = true;
        }
        formattedLines.push(`<li>${trimmed.replace(/^[-•*]\s*/, '')}</li>`);
      } else {
        if (inList) {
          formattedLines.push('</ul>');
          inList = false;
        }
        if (trimmed.length > 0) {
          formattedLines.push(`<p style="margin:0 0 6px 0;">${trimmed}</p>`);
        }
      }
    });

    if (inList) {
      formattedLines.push('</ul>');
    }

    return formattedLines.join('');
  }

  async function sendMessage(text) {
    if (!text || !chatMessages) return;

    // Reset input
    if (chatInput) {
      chatInput.value = '';
    }

    // 1. Thêm tin nhắn của User
    const userMsgEl = document.createElement('div');
    userMsgEl.className = 'chat-msg user';
    userMsgEl.textContent = text;
    chatMessages.appendChild(userMsgEl);

    // 2. Thêm chỉ báo AI đang suy nghĩ
    const thinkingEl = document.createElement('div');
    thinkingEl.className = 'chat-thinking';
    thinkingEl.id = 'chat-thinking-indicator';
    thinkingEl.innerHTML = `
      <span>Elon Musk đang trả lời</span>
      <div class="chat-thinking-dots">
        <span></span><span></span><span></span>
      </div>
    `;
    chatMessages.appendChild(thinkingEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Disable send button
    if (chatSendBtn) chatSendBtn.disabled = true;
    if (chatInput) chatInput.disabled = true;

    try {
      let replyText = '';

      // Thử gọi qua Vercel Serverless Function /api/chat trước
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, history: chatHistory })
        });

        if (response.ok) {
          const resData = await response.json();
          if (resData.reply) {
            replyText = resData.reply;
          }
        }
      } catch (err) {
        console.warn('Không gọi được /api/chat, chuyển sang gọi trực tiếp Google AI API:', err);
      }

      // Nếu /api/chat không có sẵn (khi chạy local test), fallback gọi trực tiếp Google Gemini API
      if (!replyText) {
        const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL_FALLBACK}:generateContent?key=${GEMINI_API_KEY_FALLBACK}`;
        const contents = [];

        chatHistory.slice(-4).forEach(h => {
          contents.push({
            role: h.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: h.text }]
          });
        });
        contents.push({
          role: 'user',
          parts: [{ text: text }]
        });

        const directRes = await fetch(googleUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION_TEXT }] },
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1024
            }
          })
        });

        if (directRes.ok) {
          const directData = await directRes.json();
          replyText = directData?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        } else {
          const errDetail = await directRes.text();
          console.error('Lỗi Gemini Direct API:', errDetail);
        }
      }

      // Xóa chỉ báo suy nghĩ
      const currentThinking = document.getElementById('chat-thinking-indicator');
      if (currentThinking) currentThinking.remove();

      if (!replyText) {
        replyText = 'Xin lỗi bạn, kết nối tới máy chủ AI đang bận. Bạn vui lòng thử lại sau vài giây hoặc liên hệ trực tiếp với Thầy Hiếu qua email: hieudt.aiuni@gmail.com.';
      }

      // Lưu vào lịch sử hội thoại
      chatHistory.push({ role: 'user', text: text });
      chatHistory.push({ role: 'assistant', text: replyText });

      // Hiển thị tin nhắn trả lời của Elon Musk
      const aiMsgEl = document.createElement('div');
      aiMsgEl.className = 'chat-msg assistant';
      aiMsgEl.innerHTML = formatMarkdown(replyText);
      chatMessages.appendChild(aiMsgEl);

    } catch (error) {
      console.error('Chat error:', error);
      const currentThinking = document.getElementById('chat-thinking-indicator');
      if (currentThinking) currentThinking.remove();

      const errMsgEl = document.createElement('div');
      errMsgEl.className = 'chat-msg assistant';
      errMsgEl.innerHTML = '<p style="color:#dc2626;">Đã xảy ra sự cố khi kết nối tới AI. Vui lòng kiểm tra lại kết nối mạng.</p>';
      chatMessages.appendChild(errMsgEl);
    } finally {
      if (chatSendBtn) chatSendBtn.disabled = false;
      if (chatInput) {
        chatInput.disabled = false;
        chatInput.focus();
      }
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
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

  // 3b. Interactive 3D Tilt & Parallax for Hero Portrait Card (Phương án 2)
  const portraitCard = document.getElementById('portrait-card');
  if (portraitCard && window.matchMedia('(hover: hover)').matches) {
    let bounds = null;

    function updateBounds() {
      bounds = portraitCard.getBoundingClientRect();
    }

    portraitCard.addEventListener('mouseenter', () => {
      updateBounds();
      portraitCard.style.transition = 'transform 0.12s ease-out, box-shadow 0.3s ease';
    });

    portraitCard.addEventListener('mousemove', (e) => {
      if (!bounds) updateBounds();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;
      const xPct = (mouseX / bounds.width) - 0.5;
      const yPct = (mouseY / bounds.height) - 0.5;

      const maxRotate = 7; // độ nghiêng 3D tối đa
      const rotX = -yPct * maxRotate;
      const rotY = xPct * maxRotate;

      portraitCard.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    portraitCard.addEventListener('mouseleave', () => {
      portraitCard.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease';
      portraitCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      bounds = null;
    });

    window.addEventListener('resize', () => {
      bounds = null;
    });
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
