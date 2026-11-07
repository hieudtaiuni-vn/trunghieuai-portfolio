// Helper: Tự động chọn chủ đề trong form liên hệ
window.selectTrainingTopic = function(topicName) {
  const select = document.getElementById('form-topic');
  if (select && topicName) {
    select.value = topicName;
  }
};

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

    // 6. Interactive 3D Flip Photo Album (17 ảnh thực tế)
  const albumData = [
    {
      img: 'public/images/gallery/4.11.2026.jpg',
      badge: 'SỰ KIỆN 01 / 17',
      title: 'Đảng ủy phường Kiến An: App Gần Dân Sát Dân & Trợ Lý AI',
      subtitle: 'Thường trực Đảng ủy làm việc cùng Học viện AIUNI và Công ty ADT',
      backKicker: 'CHUYỂN ĐỔI SỐ CƠ SỞ',
      backTitle: 'Ứng Dụng Số Phục Vụ Nhân Dân & Đảng Vụ',
      backDesc: 'Buổi làm việc chính thức tại phòng họp Đảng ủy phường Kiến An về vận hành ứng dụng di động "Gần dân, sát dân" và triển khai trợ lý ảo AI hỗ trợ chỉ đạo điều hành.',
      bullets: [
        '✓ Vận hành App di động "Đảng ủy phường Kiến An - Gần dân, sát dân"',
        '✓ Huấn luyện Trợ lý AI tra cứu điều lệ Đảng & thủ tục hành chính',
        '✓ Tiếp nhận và phân loại tự động ý kiến cử tri theo tổ dân phố',
        '✓ Đào tạo chuyển giao kỹ năng số cho cán bộ Đảng ủy cơ sở'
      ],
      time: 'Thời gian: 04/11/2026 · Địa điểm: Trụ sở Đảng ủy phường Kiến An, Hải Phòng'
    },
    {
      img: 'public/images/gallery/4.11.2026_2.jpg',
      badge: 'SỰ KIỆN 02 / 17',
      title: 'Thuyết Trình Giải Pháp Trợ Lý AI tại Đảng Ủy Kiến An',
      subtitle: 'Thầy Dương Trung Hiếu trực tiếp trình bày kiến trúc hệ thống và demo tính năng',
      backKicker: 'TRÌNH DIỄN CÔNG NGHỆ',
      backTitle: 'Kiến Trúc Trợ Lý Ảo Điều Hành Cấp Xã/Phường',
      backDesc: 'Phiên trao đổi nghiệp vụ chuyên sâu về cách thức tích hợp kho dữ liệu văn bản quy phạm và tiếp nhận phản ánh nhân dân vào mô hình trợ lý ảo.',
      bullets: [
        '✓ Báo cáo giải pháp số hóa quy trình tiếp nhận ý kiến nhân dân',
        '✓ Demo hệ thống hỏi đáp quy định hành chính tự động 24/7',
        '✓ Lắng nghe góp ý của các đồng chí Thường trực Đảng ủy phường',
        '✓ Thống nhất lộ trình tập huấn thực chiến cho các chi bộ'
      ],
      time: 'Thời gian: 04/11/2026 · Phòng họp Đảng ủy phường Kiến An'
    },
    {
      img: 'public/images/gallery/5.11.2026.jpg',
      badge: 'SỰ KIỆN 03 / 17',
      title: 'Tập Huấn Quản Trị & AI Doanh Nghiệp tại Lào Cai',
      subtitle: 'NATEC (Bộ KH&CN) · Trung tâm KH, CN & ĐMST Tỉnh Lào Cai · Học viện AIUNI',
      backKicker: 'HỢP TÁC BỘ KH&CN',
      backTitle: 'Ứng Dụng AI Thúc Đẩy Tăng Trưởng Doanh Nghiệp',
      backDesc: 'Khóa tập huấn chuyên sâu trang bị kiến thức và kỹ năng thực hành ứng dụng AI trong quản trị, vận hành và tự động hóa marketing cho cộng đồng doanh nghiệp trẻ Lào Cai.',
      bullets: [
        '✓ Tự động hóa marketing và chăm sóc khách hàng đa kênh',
        '✓ Ứng dụng Generative AI phân tích thị trường và đối thủ',
        '✓ Tối ưu hóa quy trình quản trị và chi phí vận hành SME',
        '✓ Thực hành trực tiếp trên máy tính thiết lập kịch bản trợ lý ảo'
      ],
      time: 'Thời gian: 05/11/2026 · TP Lào Cai, Tỉnh Lào Cai'
    },
    {
      img: 'public/images/gallery/1.11.2026.jpg',
      badge: 'SỰ KIỆN 04 / 17',
      title: 'Tập Huấn AI Cán Bộ Quản Lý & Giáo Viên Trực Ninh',
      subtitle: 'UBND Xã Trực Ninh · Trung tâm KHCN-ĐMST-CĐS Ninh Bình · AIUNI',
      backKicker: 'CHUYỂN ĐỔI SỐ GIÁO DỤC',
      backTitle: 'Đổi Mới Dạy Học Bằng Trí Tuệ Nhân Tạo',
      backDesc: 'Hội nghị tập huấn chuyên đề cho cán bộ quản lý, giáo viên, nhân viên các trường Mầm non, Tiểu học, THCS trên địa bàn toàn xã ứng dụng AI trong giáo dục.',
      bullets: [
        '✓ Ứng dụng AI thiết kế kế hoạch bài dạy chuẩn CV 5512',
        '✓ Xây dựng đề kiểm tra và thang rubrics chấm điểm chuẩn',
        '✓ Tự động hóa slide bài giảng đa phương tiện sinh động',
        '✓ Đổi mới phương pháp tương tác và đánh giá năng lực học sinh'
      ],
      time: 'Thời gian: 01/11/2026 · Hội trường Đảng ủy xã Trực Ninh'
    },
    {
      img: 'public/images/gallery/31.10.2026.jpg',
      badge: 'SỰ KIỆN 05 / 17',
      title: 'Tập Huấn AI Tổ Công Nghệ Số Cộng Đồng Thôn',
      subtitle: 'UBND Xã Trực Ninh · Sở KH&CN Tỉnh Ninh Bình · Học viện AIUNI',
      backKicker: 'TỔ CÔNG NGHỆ SỐ CỘNG ĐỒNG',
      backTitle: 'Phổ Cập Kỹ Năng Số Cơ Sở',
      backDesc: 'Chương trình tập huấn thực hành bộ 5 công cụ AI hàng đầu: ChatGPT, Gemini, NotebookLM, Canva, VbeeAI cho đội ngũ nòng cốt các thôn xóm.',
      bullets: [
        '✓ Huấn luyện kỹ năng đặt câu lệnh (Prompting) thực chiến',
        '✓ Hướng dẫn làm video tuyên truyền và thiết kế infographic số',
        '✓ Ứng dụng AI tra cứu chính sách và thủ tục hành chính công',
        '✓ Hướng dẫn kỹ năng an toàn thông tin số trong cộng đồng'
      ],
      time: 'Thời gian: 31/10/2026 · Trường Tiểu học Trực Ninh'
    },
    {
      img: 'public/images/gallery/31.10.2026_1.jpg',
      badge: 'SỰ KIỆN 06 / 17',
      title: 'Tọa Đàm Hướng Dẫn Thực Hành Công Nghệ Bàn Tròn',
      subtitle: 'Thầy Dương Trung Hiếu cùng cán bộ chuyên môn địa phương trao đổi nghiệp vụ',
      backKicker: 'TẬP HUẤN CẦM TAY CHỈ VIỆC',
      backTitle: 'Thực Hành Trực Tiếp Trên Thiết Bị',
      backDesc: 'Phiên làm việc bàn tròn thực hành chi tiết từng thao tác công nghệ số, giải đáp thắc mắc thực tế từ cán bộ phụ trách các ban ngành đoàn thể xã.',
      bullets: [
        '✓ Hướng dẫn cài đặt và sử dụng ứng dụng AI trên điện thoại',
        '✓ Thao tác xử lý dữ liệu và văn bản số thực tế tại phòng họp',
        '✓ Giải đáp các vướng mắc của tổ công nghệ số cơ sở',
        '✓ Đúc kết bài học thực tiễn để nhân rộng toàn xã'
      ],
      time: 'Thời gian: 31/10/2026 · Phòng họp Trực Ninh'
    },
    {
      img: 'public/images/gallery/27.10.2026.jpg',
      badge: 'SỰ KIỆN 07 / 17',
      title: 'Hội Thảo Đổi Mới Sáng Tạo Doanh Nghiệp Ninh Bình',
      subtitle: 'Sở KH&CN Tỉnh Ninh Bình · Trung tâm KHCN, ĐMST và Chuyển đổi số',
      backKicker: 'DOANH NGHIỆP ĐỔI MỚI SÁNG TẠO',
      backTitle: 'Ứng Dụng AI Thúc Đẩy Marketing Online',
      backDesc: 'Hội thảo quy mô lớn quy tụ đông đảo doanh nghiệp trên địa bàn tỉnh tham gia tìm hiểu và thực hành ứng dụng AI tạo sinh vào kinh doanh.',
      bullets: [
        '✓ Cập nhật xu hướng AI marketing và tự động hóa bán hàng',
        '✓ Xây dựng nội dung quảng bá sản phẩm tự động với AI',
        '✓ Kết nối giao thương và hợp tác giữa các doanh nghiệp địa phương',
        '✓ Định hướng chuyển đổi số thiết thực, tiết kiệm chi phí'
      ],
      time: 'Thời gian: 27/10/2026 · Hội trường Sở KH&CN Tỉnh Ninh Bình'
    },
    {
      img: 'public/images/gallery/27.10.2026_1.jpg',
      badge: 'SỰ KIỆN 08 / 17',
      title: 'Đội Ngũ Chuyên Gia AIUNI tại Sự Kiện Ninh Bình',
      subtitle: 'Hội nghị tập huấn Đổi mới sáng tạo cho doanh nghiệp tỉnh Ninh Bình',
      backKicker: 'CHUYÊN GIA ĐÀO TẠO',
      backTitle: 'Đội Ngũ Đồng Hành Cùng Doanh Nghiệp',
      backDesc: 'Hình ảnh lưu niệm của Thầy Dương Trung Hiếu và đội ngũ chuyên gia đào tạo tại Hội trường tầng 7, Số 1A Trần Tế Xương.',
      bullets: [
        '✓ Đội ngũ giảng viên thực chiến từ Học viện Công nghệ AIUNI',
        '✓ Tư vấn trực tiếp 1-1 cho các chủ doanh nghiệp tại sự kiện',
        '✓ Chia sẻ tài liệu hướng dẫn ứng dụng AI độc quyền',
        '✓ Cam kết hỗ trợ kỹ thuật lâu dài cho học viên'
      ],
      time: 'Thời gian: 27/10/2026 · Nam Định - Ninh Bình'
    },
    {
      img: 'public/images/gallery/26.10.2026.jpg',
      badge: 'SỰ KIỆN 09 / 17',
      title: 'Bồi Dưỡng Chuyển Đổi Số & Bán Hàng Online Thái Nguyên',
      subtitle: 'SATI (Bộ KH&CN) · Sở KH&CN Thái Nguyên · Học viện AIUNI',
      backKicker: 'KỸ NĂNG THƯƠNG MẠI ĐIỆN TỬ',
      backTitle: 'Phát Triển Thị Trường Trên Môi Trường Số',
      backDesc: 'Khóa bồi dưỡng toàn diện kỹ năng chuyển đổi số, marketing, phát triển thị trường trực tuyến cho các hợp tác xã và hộ sản xuất tiêu biểu.',
      bullets: [
        '✓ Bồi dưỡng kỹ năng livestream và bán hàng trên sàn TMĐT',
        '✓ Xây dựng video ngắn quảng bá sản vật quê hương với AI',
        '✓ Tối ưu hóa gian hàng số và trải nghiệm mua sắm',
        '✓ Đẩy mạnh tiêu thụ sản phẩm OCOP địa phương'
      ],
      time: 'Thời gian: 26/10/2026 · Tỉnh Thái Nguyên'
    },
    {
      img: 'public/images/gallery/26.10.2026_1.jpg',
      badge: 'SỰ KIỆN 10 / 17',
      title: 'Sân Khấu Màn Hình LED Hiện Đại tại Thái Nguyên',
      subtitle: 'Chương trình bồi dưỡng chuyển đổi số, marketing & bán hàng online',
      backKicker: 'CHƯƠNG TRÌNH ĐÀO TẠO',
      backTitle: 'Học Liệu Số & Bài Giảng Trực Quan',
      backDesc: 'Sân khấu chương trình bồi dưỡng kiến thức, kỹ năng về chuyển đổi số, marketing, bán hàng online và phát triển thị trường trên môi trường số.',
      bullets: [
        '✓ Khung chương trình chuẩn hóa của Bộ Khoa học và Công nghệ',
        '✓ Học liệu số và bài giảng tương tác trực quan cao',
        '✓ 100% học viên thực hành ra sản phẩm ngay tại lớp',
        '✓ Hỗ trợ kết nối cộng đồng doanh nghiệp số Thái Nguyên'
      ],
      time: 'Thời gian: 26/10/2026 · Tỉnh Thái Nguyên'
    },
    {
      img: 'public/images/gallery/17.10.2026.jpg',
      badge: 'SỰ KIỆN 11 / 17',
      title: 'Toàn Cảnh Hội Trường Giảng Dạy AI Xã Trực Ninh',
      subtitle: 'Thầy Dương Trung Hiếu đứng lớp trước sự tập trung của đông đảo cán bộ công chức',
      backKicker: 'TRUYỀN CẢM HỨNG CÔNG NGHỆ',
      backTitle: 'Hội Trường Đông Đủ Đại Biểu Cán Bộ',
      backDesc: 'Góc nhìn toàn cảnh hội trường với hơn 100 cán bộ, công chức, viên chức chăm chú theo dõi bài giảng và các ví dụ thực tế về ứng dụng AI.',
      bullets: [
        '✓ Không khí học tập sôi nổi và tập trung cao độ',
        '✓ Kết nối các tình huống thực tế của bộ máy chính quyền cơ sở',
        '✓ Hướng dẫn trực quan từng bước dễ hiểu cho mọi độ tuổi',
        '✓ Giải đáp các thắc mắc về bảo mật và quy định pháp lý AI'
      ],
      time: 'Thời gian: 17/10/2026 · Hội trường lớn Xã Trực Ninh'
    },
    {
      img: 'public/images/gallery/17.10.2026_1.jpg',
      badge: 'SỰ KIỆN 12 / 17',
      title: 'Hội Nghị Tập Huấn AI Cán Bộ Công Chức Trực Ninh',
      subtitle: 'Đảng ủy - HĐND - UBND - Ủy ban MTTQ Việt Nam Xã Trực Ninh năm 2026',
      backKicker: 'ĐÀO TẠO HỆ THỐNG CHÍNH TRỊ',
      backTitle: 'Nâng Cao Hiệu Quả Quản Lý Nhà Nước',
      backDesc: 'Hội nghị tập huấn đào tạo ứng dụng trí tuệ nhân tạo (AI) cho cán bộ, công chức, viên chức thuộc các cơ quan, đơn vị của xã Trực Ninh.',
      bullets: [
        '✓ Nâng cao chất lượng soạn thảo công văn, tờ trình, báo cáo',
        '✓ Rút ngắn thời gian tra cứu luật và xử lý hồ sơ hành chính',
        '✓ Thống nhất tư duy hành động trong kỷ nguyên số',
        '✓ Ảnh lưu niệm cùng Thường trực Đảng ủy và lãnh đạo UBND xã'
      ],
      time: 'Thời gian: 17/10/2026 · Trụ sở UBND Xã Trực Ninh'
    },
    {
      img: 'public/images/gallery/15.10.2026.jpg',
      badge: 'SỰ KIỆN 13 / 17',
      title: 'Lớp Tập Huấn Chuyển Đổi Số & AI Thái Nguyên',
      subtitle: 'Trung tâm Phát triển Khoa học Công nghệ & Đổi mới sáng tạo Thái Nguyên',
      backKicker: 'ĐÀO TẠO CHUYÊN ĐỀ SỐ',
      backTitle: 'Bồi Dưỡng Kiến Thức Số Hóa Sản Xuất',
      backDesc: 'Lớp tập huấn trang bị kỹ năng số thực tiễn giúp nâng tầm thương hiệu nông sản và sản phẩm làng nghề truyền thống trên internet.',
      bullets: [
        '✓ Trang bị tư duy bán hàng hiện đại không phụ thuộc thương lái',
        '✓ Thực hành chụp ảnh, thiết kế bao bì và tạo content với AI',
        '✓ Xây dựng kênh truyền thông số bài bản cho cơ sở sản xuất',
        '✓ Ảnh lưu niệm kết thúc khóa học tràn đầy năng lượng'
      ],
      time: 'Thời gian: 15/10/2026 · Tỉnh Thái Nguyên'
    },
    {
      img: 'public/images/gallery/14.10.2026.jpg',
      badge: 'SỰ KIỆN 14 / 17',
      title: 'Chuyển Đổi Số Ngành Chè Thái Nguyên',
      subtitle: 'SATI - Bộ KH&CN phối hợp Sở KH&CN Thái Nguyên & AIUNI',
      backKicker: 'NÔNG NGHIỆP CÔNG NGHỆ CAO',
      backTitle: 'Số Hóa Chuỗi Giá Trị Trà Thái Nguyên',
      backDesc: 'Khóa đào tạo chuyên sâu về ứng dụng công nghệ thông tin và chuyển đổi số trong chuỗi sản xuất, chế biến và phân phối trà danh tiếng của Thái Nguyên.',
      bullets: [
        '✓ Hướng dẫn ứng dụng AI nhận diện và quảng bá thương hiệu trà',
        '✓ Xây dựng kênh bán hàng online đưa chè Thái đi muôn nơi',
        '✓ Truy xuất nguồn gốc và minh bạch thông tin sản phẩm',
        '✓ Cùng bà con nông dân bắt tay làm chủ công nghệ mới'
      ],
      time: 'Thời gian: 14/10/2026 · Tỉnh Thái Nguyên'
    },
    {
      img: 'public/images/gallery/13.10.2026.jpg',
      badge: 'SỰ KIỆN 15 / 17',
      title: 'Tôn Vinh Doanh Nhân & Giảng Viên Đổi Mới Sáng Tạo',
      subtitle: 'UBND Tỉnh Nghệ An · Trường Đại học Nghệ An (NAU) · Chúc mừng 13/10',
      backKicker: 'VINH DANH CHUYÊN GIA',
      backTitle: 'Ngày Doanh Nhân Việt Nam 13/10',
      backDesc: 'Thầy Dương Trung Hiếu cùng các giảng viên, doanh nhân đổi mới sáng tạo nhận hoa chúc mừng tại lễ kỷ niệm Ngày Doanh nhân Việt Nam.',
      bullets: [
        '✓ Tôn vinh các đóng góp đào tạo nguồn nhân lực số',
        '✓ Gắn kết hợp tác giữa trường đại học và viện công nghệ',
        '✓ Lan tỏa khát vọng khởi nghiệp sáng tạo đến sinh viên',
        '✓ Khẳng định vai trò đồng hành của AIUNI tại miền Trung'
      ],
      time: 'Thời gian: 13/10/2026 · Đại học Nghệ An (NAU)'
    },
    {
      img: 'public/images/gallery/3.10.2026.jpg',
      badge: 'SỰ KIỆN 16 / 17',
      title: 'Buổi Làm Việc Tạo Sản Phẩm & Đào Tạo Thực Chiến',
      subtitle: 'Học viện Công nghệ AIUNI · Chia nhóm nghiệp vụ thực tế & Trao giải pháp số',
      backKicker: 'VĂN HÓA AIUNI',
      backTitle: 'Học Đi Đôi Với Hành · Tạo Sản Phẩm Thật',
      backDesc: 'Phiên làm việc chuyên sâu phân tích quy trình nghiệp vụ và xây dựng giải pháp AI ứng dụng, nhận hoa chúc mừng từ đại diện các tổ chức đối tác.',
      bullets: [
        '✓ Bám sát triết lý giáo dục: Tạo ra sản phẩm ngay trong khóa',
        '✓ Giải quyết trực tiếp các bài toán nan giải của đơn vị',
        '✓ Chuyển giao công nghệ và tài liệu hướng dẫn chi tiết',
        '✓ Khẳng định uy tín học viện hàng đầu về AI thực chiến'
      ],
      time: 'Thời gian: 03/10/2026 · Học viện Công nghệ AIUNI'
    },
    {
      img: 'public/images/gallery/12.8.2026.jpg',
      badge: 'SỰ KIỆN 17 / 17',
      title: 'Tập Huấn Ứng Dụng AI Trong Thiết Kế & Chuyển Đổi Số',
      subtitle: 'Sở KH&CN Tỉnh Ninh Bình · Hội Quảng Cáo Ninh Bình · AIUNI',
      backKicker: 'DOANH NGHIỆP QUẢNG CÁO',
      backTitle: 'Nâng Tầm Thiết Kế Bằng Trí Tuệ Nhân Tạo',
      backDesc: 'Chương trình tập huấn chuyên đề đột phá ứng dụng AI tạo sinh trong ngành mỹ thuật quảng cáo, thiết kế đồ họa truyền thông và chuyển đổi số doanh nghiệp.',
      bullets: [
        '✓ Nắm bắt công nghệ dẫn đầu xu hướng thiết kế tương lai',
        '✓ Nâng cao năng lực sáng tạo và tăng tốc tiến độ thực hiện',
        '✓ Tối ưu chi phí sản xuất và gia tăng lợi nhuận doanh nghiệp',
        '✓ Kết nối học hỏi và phát triển cộng đồng quảng cáo tỉnh nhà'
      ],
      time: 'Thời gian: 12/08/2026 · TP Ninh Bình'
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

      // Cập nhật trạng thái active trên danh sách thumbnail
      const thumbItems = document.querySelectorAll('.album-thumb-item');
      thumbItems.forEach((th, idx) => {
        if (idx === index) {
          th.classList.add('active');
          th.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
          th.classList.remove('active');
        }
      });
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

  // Khởi tạo thanh thumbnail cho Album 17 ảnh
  const thumbsContainer = document.getElementById('album-thumbs-container');
  if (thumbsContainer) {
    thumbsContainer.innerHTML = albumData.map((item, idx) => `
      <div class="album-thumb-item ${idx === 0 ? 'active' : ''}" data-index="${idx}" title="${item.title}">
        <img src="${item.img}" alt="${item.title}" loading="lazy">
        <span class="thumb-idx">${idx + 1}</span>
      </div>
    `).join('');

    thumbsContainer.addEventListener('click', (e) => {
      const item = e.target.closest('.album-thumb-item');
      if (!item) return;
      const idx = parseInt(item.getAttribute('data-index'), 10);
      if (!isNaN(idx)) {
        currentSlide = idx;
        renderSlide(currentSlide);
      }
    });
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

  
  // Hero Video Background Sound Controller
  const heroSoundToggle = document.getElementById('hero-sound-toggle');
  const heroBgVideo = document.getElementById('hero-bg-video');
  if (heroSoundToggle && heroBgVideo) {
    heroSoundToggle.addEventListener('click', () => {
      heroBgVideo.muted = !heroBgVideo.muted;
      const soundIcon = heroSoundToggle.querySelector('.sound-icon');
      const soundLabel = heroSoundToggle.querySelector('.sound-label');
      if (heroBgVideo.muted) {
        if (soundIcon) soundIcon.textContent = '🔇';
        if (soundLabel) soundLabel.textContent = 'Bật âm thanh';
        heroSoundToggle.classList.remove('active');
      } else {
        if (soundIcon) soundIcon.textContent = '🔊';
        if (soundLabel) soundLabel.textContent = 'Tắt âm thanh';
        heroSoundToggle.classList.add('active');
        heroBgVideo.play().catch(e => console.log('Video play error:', e));
      }
    });
  }

  // 7. Video Playlist URL Dynamic Updater
  
  // Switch between Intro Video and Continuous Training Playlist
  
  // ==========================================================================
  // YOUTUBE IFRAME API: ÉP CHẤT LƯỢNG PHÁT LUÔN ĐẠT 1080p FULL HD (hd1080)
  // ==========================================================================
  let ytPlayerInstance = null;

  function loadYouTubeIframeApi() {
    if (window.YT && window.YT.Player) {
      initYTPlayer();
      return;
    }
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(tag, firstScript);
    } else {
      document.head.appendChild(tag);
    }
  }

  function initYTPlayer() {
    const iframe = document.getElementById('event-playlist-iframe');
    if (!iframe) return;

    try {
      ytPlayerInstance = new YT.Player('event-playlist-iframe', {
        events: {
          'onReady': function(event) {
            event.target.setPlaybackQuality('hd1080');
          },
          'onStateChange': function(event) {
            if (event.data === YT.PlayerState.PLAYING || event.data === YT.PlayerState.BUFFERING) {
              event.target.setPlaybackQuality('hd1080');
            }
          }
        }
      });
    } catch (e) {
      console.log('[YouTube Player API] Note:', e.message);
    }
  }

  window.onYouTubeIframeAPIReady = function() {
    initYTPlayer();
  };

  loadYouTubeIframeApi();

  window.switchVideoChannel = function(type) {
    const iframe = document.getElementById('event-playlist-iframe');
    const btnIntro = document.getElementById('tab-video-intro');
    const btnPlaylist = document.getElementById('tab-video-playlist');
    const badge = document.getElementById('video-badge');
    const title = document.getElementById('video-title');
    const desc = document.getElementById('video-desc');
    if (!iframe) return;

    if (type === 'intro') {
      iframe.src = 'https://www.youtube.com/embed/W2YSUnCU5yE?si=jzDo9hyCT0G9aMIK&autoplay=1&vq=hd1080&rel=0&enablejsapi=1';
      if (btnIntro) { btnIntro.classList.add('active'); btnIntro.classList.remove('ghost'); }
      if (btnPlaylist) { btnPlaylist.classList.remove('active'); btnPlaylist.classList.add('ghost'); }
      if (badge) badge.textContent = 'VIDEO TIÊU ĐIỂM · CHÍNH THỨC';
      if (title) title.textContent = 'GIỚI THIỆU HỌC VIỆN CÔNG NGHỆ AIUNI';
      if (desc) desc.textContent = 'Khám phá tầm nhìn, sứ mệnh phổ cập AI toàn dân, phong trào Bình dân học vụ số, đào tạo 1.000 Giảng viên GenAI và hệ sinh thái giải pháp AI ứng dụng thực chiến của Học viện Công nghệ AIUNI cùng Thầy Dương Trung Hiếu.';
    } else {
      iframe.src = 'https://www.youtube.com/embed/videoseries?list=PLr6-GrHGF5mNH00jAfi4o4R0a_8_YqX9J&autoplay=1&loop=1&rel=0&vq=hd1080&enablejsapi=1';
      if (btnPlaylist) { btnPlaylist.classList.add('active'); btnPlaylist.classList.remove('ghost'); }
      if (btnIntro) { btnIntro.classList.remove('active'); btnIntro.classList.add('ghost'); }
      if (badge) badge.textContent = 'DANH SÁCH PHÁT CHẠY LIÊN TỤC (PLAYLIST)';
      if (title) title.textContent = 'Kho Video Đào tạo, Hội thảo & Ứng dụng AI';
      if (desc) desc.textContent = 'Tổng hợp các video ghi lại bài giảng, hội thảo chuyên đề và khoảnh khắc tập huấn ứng dụng AI thực tế. Hỗ trợ phát tuần tự liên tục theo danh sách phát.';
    }
  };

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


  // ==========================================================================
  // GÓI B: UI MOTION, SCROLL-DRIVEN PARALLAX & 3D INTERACTIVE CANVAS
  // ==========================================================================

  // B1. Scroll Progress Bar & Smart Sticky Navbar
  const progressBar = document.getElementById('scroll-progress');
  const mainNav = document.querySelector('.nav');

  function handleScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }

    if (mainNav) {
      if (scrollTop > 35) {
        mainNav.classList.add('scrolled');
      } else {
        mainNav.classList.remove('scrolled');
      }
    }
  }
  window.addEventListener('scroll', handleScrollProgress, { passive: true });
  handleScrollProgress();

  // B2. Ambient Pointer Glow (Desktop Mouse Following)
  const pointerGlow = document.getElementById('pointer-glow');
  if (pointerGlow && window.matchMedia('(hover: hover)').matches) {
    let mouseX = -500;
    let mouseY = -500;
    let currentX = -500;
    let currentY = -500;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      pointerGlow.style.opacity = '1';
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      pointerGlow.style.opacity = '0';
    });

    function animatePointerGlow() {
      // Smooth lerp
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      pointerGlow.style.left = `${currentX}px`;
      pointerGlow.style.top = `${currentY}px`;
      requestAnimationFrame(animatePointerGlow);
    }
    animatePointerGlow();
  }

  // B3. Hero Neural Mesh Interactive Canvas
  const neuralCanvas = document.getElementById('hero-neural-canvas');
  const heroSection = document.getElementById('hero-section');

  if (neuralCanvas && heroSection) {
    const ctx = neuralCanvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];
    let isHeroVisible = true;
    let mouse = { x: -1000, y: -1000, active: false };

    function resizeCanvas() {
      width = heroSection.offsetWidth;
      height = heroSection.offsetHeight;
      neuralCanvas.width = width;
      neuralCanvas.height = height;
      initParticles();
    }

    function initParticles() {
      particles = [];
      const particleCount = Math.floor(Math.min(50, Math.max(25, width / 30)));
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius: Math.random() * 1.5 + 1.2,
          alpha: Math.random() * 0.5 + 0.3
        });
      }
    }

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    });

    // Pause animation when hero is off-screen to preserve battery & CPU
    const heroObserver = new IntersectionObserver((entries) => {
      isHeroVisible = entries[0].isIntersecting;
      if (isHeroVisible) {
        requestAnimationFrame(renderNeural);
      }
    }, { threshold: 0.05 });
    heroObserver.observe(heroSection);

    function renderNeural() {
      if (!isHeroVisible) return;

      ctx.clearRect(0, 0, width, height);

      // Update & Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse gentle interaction
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            p.x += (dx / dist) * force * 1.2;
            p.y += (dy / dist) * force * 1.2;
          }
        }

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(45, 112, 182, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Connect to mouse cursor
        if (mouse.active) {
          const mDist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (mDist < 140) {
            const mAlpha = (1 - mDist / 140) * 0.45;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${mAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(renderNeural);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
  }

  // B4. Scroll-Driven Reveal on Scroll
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // B5. Animated Numeric Counters (Stats HUD)
  const statsHud = document.querySelector('.hero-stats-hud');
  if (statsHud) {
    let hasAnimated = false;
    const counters = statsHud.querySelectorAll('.stat-counter');

    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
          const duration = 1600; // ms
          const startTime = performance.now();

          function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeOut * target);

            counter.textContent = currentVal;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              counter.textContent = target;
            }
          }
          requestAnimationFrame(updateCount);
        });
      }
    }, { threshold: 0.3 });

    statsObserver.observe(statsHud);
  }

  // B6. 3D Tilt for 4 Pillar Cards
  const pillarCards = document.querySelectorAll('.pillar-card');
  if (pillarCards.length > 0 && window.matchMedia('(hover: hover)').matches) {
    pillarCards.forEach(card => {
      let b = null;

      card.addEventListener('mouseenter', () => {
        b = card.getBoundingClientRect();
        card.style.transition = 'transform 0.12s ease-out, box-shadow 0.3s ease';
      });

      card.addEventListener('mousemove', (e) => {
        if (!b) b = card.getBoundingClientRect();
        const x = e.clientX - b.left;
        const y = e.clientY - b.top;
        const xPct = (x / b.width) - 0.5;
        const yPct = (y / b.height) - 0.5;

        const rotX = -yPct * 8; // degrees
        const rotY = xPct * 8;

        card.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      });

            card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease';
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        b = null;
      });
    });
  }

  // 12. Xử lý Form gửi yêu cầu đào tạo & hợp tác (Theo Đề xuất UI/UX)
  const collabForm = document.getElementById('collaboration-form');
  const formToast = document.getElementById('form-success-toast');

  if (collabForm) {
    collabForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = document.getElementById('form-fullname')?.value.trim();
      const org = document.getElementById('form-organization')?.value.trim();
      const phone = document.getElementById('form-phone')?.value.trim();
      const topic = document.getElementById('form-topic')?.value;
      const message = document.getElementById('form-message')?.value.trim();

      if (!fullName || !org || !phone || !topic) {
        alert('Vui lòng điền đầy đủ các thông tin có dấu sao (*).');
        return;
      }

      // Lưu trữ cục bộ
      const requests = JSON.parse(localStorage.getItem('trunghieuai_leads') || '[]');
      requests.push({
        fullName, org, phone, topic, message,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('trunghieuai_leads', JSON.stringify(requests));

      // Hiển thị thông báo thành công
      if (formToast) {
        formToast.style.display = 'block';
        formToast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Chuẩn bị link mailto hỗ trợ gửi email ngay
      const subject = encodeURIComponent(`[Đăng ký Hợp tác / Mời giảng] từ ${fullName} - ${org}`);
      const body = encodeURIComponent(
        `Kính gửi Thầy Dương Trung Hiếu và Học viện Công nghệ AIUNI,\n\n` +
        `Tôi tên là: ${fullName}\n` +
        `Đơn vị công tác: ${org}\n` +
        `Số điện thoại / Zalo: ${phone}\n` +
        `Chương trình quan tâm: ${topic}\n` +
        `Nội dung chi tiết / Yêu cầu dự kiến:\n${message || '(Chưa điền)'}\n\n` +
        `Rất mong sớm nhận được phản hồi từ Thầy và Học viện.\nTrân trọng!`
      );
      
      const mailtoLink = `mailto:hieudt.aiuni@gmail.com?subject=${subject}&body=${body}`;

      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 1200);

      collabForm.reset();
    });
  }

});