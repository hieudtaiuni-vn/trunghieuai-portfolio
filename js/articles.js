/**
 * PORTFOLIO DƯƠNG TRUNG HIẾU - ARTICLES & TRAINING ACTIVITIES MODULE
 * Chuyên mục: Bài viết & Hoạt động đào tạo thực tế của Thầy Dương Trung Hiếu
 */

const ARTICLES_DATABASE = [
  {
    id: "tap-huan-ai-truc-ninh-cns",
    title: "Ứng dụng Generative AI trong công tác Tổ Công nghệ số cộng đồng tại xã Trực Ninh",
    category: "Đào tạo cộng đồng",
    categorySlug: "cong-dong",
    date: "31/10/2026",
    author: "Dương Trung Hiếu",
    authorRole: "Giám đốc Đào tạo Học viện Công nghệ AIUNI",
    readTime: "4 phút đọc",
    thumbnail: "public/images/gallery/event1.svg",
    excerpt: "Chuyên đề tập huấn kỹ năng ứng dụng AI tạo sinh cho đội ngũ cán bộ cơ sở và thành viên Tổ công nghệ số cộng đồng, giúp chuyển hóa công nghệ thành giá trị thiết thực phục vụ nhân dân.",
    tags: ["Generative AI", "Tổ CNS cộng đồng", "Xã Trực Ninh", "Chuyển đổi số"],
    content: `
      <h3>1. Bối cảnh: Đưa công nghệ từ chủ trương về với cơ sở</h3>
      <p>Trong khuôn khổ chương trình chuyển đổi số quốc gia, Tổ công nghệ số cộng đồng đóng vai trò là "cánh tay nối dài", trực tiếp hướng dẫn và hỗ trợ nhân dân tiếp cận các nền tảng số. Tuy nhiên, việc thiếu hụt tài liệu tuyên truyền sinh động và kỹ năng biên tập nội dung thường là rào cản lớn đối với cán bộ ở cấp cơ sở.</p>
      <p>Ngày 31/10/2026, buổi tập huấn chuyên đề <strong>"Ứng dụng Generative AI trong công việc và đời sống"</strong> do thầy Dương Trung Hiếu trực tiếp giảng dạy đã diễn ra tại xã Trực Ninh với sự tham gia đông đủ của cán bộ cơ sở và lực lượng nòng cốt Tổ công nghệ số cộng đồng.</p>

      <div class="article-quote">
        <p>"Trí tuệ nhân tạo không sinh ra để thay thế con người, mà để trao quyền cho những ai biết làm chủ nó. Khi cán bộ cơ sở nắm vững AI, công việc hành chính sẽ giảm bớt áp lực và thời gian dành cho người dân sẽ nhiều hơn."</p>
        <small>— Thầy Dương Trung Hiếu chia sẻ tại buổi tập huấn</small>
      </div>

      <h3>2. Bốn nội dung thực hành trọng tâm</h3>
      <p>Chương trình được thiết kế theo phương pháp <em>"Cầm tay chỉ việc - Học gắn liền với sản phẩm thực tế"</em>, tập trung vào 4 nhóm năng lực cốt lõi:</p>
      <ul>
        <li><strong>Kỹ năng Prompting chuẩn hóa:</strong> Hướng dẫn cấu trúc câu lệnh theo mô hình bối cảnh - nhiệm vụ - tiêu chuẩn đầu ra, giúp AI trả lời chính xác nhu cầu công việc thực tế.</li>
        <li><strong>Soạn thảo văn bản và biểu mẫu:</strong> Khai thác AI hỗ trợ biên tập nhanh các thông báo, kế hoạch sinh hoạt cộng đồng và văn bản hành chính theo thể thức chuẩn.</li>
        <li><strong>Sáng tạo ấn phẩm tuyên truyền số:</strong> Ứng dụng công cụ AI tạo hình ảnh, infographic hướng dẫn người dân kích hoạt định danh điện tử, thanh toán không dùng tiền mặt và phòng chống lừa đảo trên mạng.</li>
        <li><strong>Tra cứu quy trình thủ tục hành chính:</strong> Thiết lập quy trình tra cứu nhanh các quy định, văn bản pháp luật hỗ trợ giải đáp thắc mắc cho bà con nhân dân.</li>
      </ul>

      <h3>3. Kết quả và định hướng nhân rộng</h3>
      <p>Sau buổi tập huấn, 100% học viên tham dự đã tự tay thao tác và tạo ra được sản phẩm tuyên truyền thực tế trên điện thoại thông minh và máy tính. Đây là tiền đề quan trọng để tiếp tục lan tỏa tinh thần số hóa và đổi mới sáng tạo đến từng thôn, xóm trên địa bàn.</p>
    `
  },
  {
    id: "ai-trong-giao-duc-doi-moi-day-hoc",
    title: "Đổi mới phương pháp dạy học bằng AI: Cơ hội và lộ trình cho giáo viên",
    category: "Giáo dục 4.0",
    categorySlug: "giao-duc",
    date: "01/11/2026",
    author: "Dương Trung Hiếu",
    authorRole: "Giám đốc Đào tạo Học viện Công nghệ AIUNI",
    readTime: "5 phút đọc",
    thumbnail: "public/images/gallery/event2.svg",
    excerpt: "Tổng kết chương trình tập huấn AI dành cho cán bộ quản lý và giáo viên tại xã Trực Ninh: Tối ưu hóa thời gian soạn bài giảng chuẩn 5512 và nâng cao chất lượng học liệu số.",
    tags: ["Giáo dục số", "Kế hoạch bài dạy 5512", "EdTech", "AI Giáo viên"],
    content: `
      <h3>1. Áp lực hồ sơ sổ sách và đòi hỏi đổi mới phương pháp</h3>
      <p>Chương trình giáo dục phổ thông 2018 đặt ra yêu cầu phát triển phẩm chất và năng lực học sinh, đòi hỏi giáo viên phải liên tục sáng tạo trong hoạt động dạy học. Tuy nhiên, gánh nặng về việc chuẩn bị kế hoạch bài dạy theo Công văn 5512/BGDĐT, ma trận đề thi và làm học liệu đa phương tiện thường chiếm rất nhiều thời gian của các thầy cô giáo.</p>
      <p>Trong chương trình tập huấn ngày 01/11/2026 tại xã Trực Ninh, thầy Dương Trung Hiếu đã đồng hành cùng đội ngũ cán bộ quản lý, giáo viên các cấp trường học để giải bài toán: <strong>Làm thế nào để AI trở thành người trợ lý đắc lực đồng hành cùng giáo viên?</strong></p>

      <div class="article-quote">
        <p>"Mục tiêu lớn nhất của việc đưa AI vào giáo dục không phải để máy dạy thay người, mà là để giải phóng người thầy khỏi những tác vụ lặp lại, trả lại thời gian quý báu để thầy cô tập trung truyền cảm hứng và chăm sóc từng học sinh."</p>
        <small>— Thầy Dương Trung Hiếu</small>
      </div>

      <h3>2. Các giải pháp công nghệ được chuyển giao</h3>
      <p>Khóa tập huấn đã trang bị cho giáo viên bộ quy trình và công cụ thực tế:</p>
      <ul>
        <li><strong>Trợ lý soạn giáo án chuẩn 5512:</strong> Hướng dẫn cấu trúc hóa tiến trình 4 hoạt động dạy học (Khởi động - Khám phá - Luyện tập - Vận dụng) với gợi ý sư phạm phong phú từ AI.</li>
        <li><strong>Ngân hàng câu hỏi trắc nghiệm đa tầng:</strong> Tạo câu hỏi đánh giá theo 4 mức độ (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao) kèm lời giải chi tiết và đáp án nhiễu khoa học.</li>
        <li><strong>Học liệu trực quan tương tác:</strong> Hướng dẫn giáo viên tạo tranh minh họa bài học, kịch bản video giảng dạy và trò chơi tương tác số chỉ trong vài phút.</li>
        <li><strong>Xây dựng bảng tiêu chí đánh giá (Rubrics):</strong> Giúp giáo viên đánh giá bài làm và sản phẩm học tập của học sinh công bằng, khách quan và minh bạch.</li>
      </ul>

      <h3>3. Đạo đức AI và an toàn thông tin học đường</h3>
      <p>Bên cạnh kỹ thuật, chương trình dành thời lượng phân tích sâu về nguyên tắc bảo mật dữ liệu học sinh, tính trung thực trong học thuật và cách hướng dẫn học sinh tiếp cận AI có trách nhiệm, xây dựng văn hóa công nghệ an toàn và lành mạnh.</p>
    `
  },
  {
    id: "chien-luoc-ai-sme-quan-tri",
    title: "Tái định nghĩa mô hình kinh doanh và quản trị doanh nghiệp SME với Generative AI",
    category: "Quản trị & Doanh nghiệp",
    categorySlug: "quan-tri",
    date: "Tháng 10/2026",
    author: "Dương Trung Hiếu",
    authorRole: "Giám đốc Đào tạo Học viện Công nghệ AIUNI",
    readTime: "6 phút đọc",
    thumbnail: "public/images/gallery/event3.svg",
    excerpt: "Góc nhìn từ gần 20 năm kinh nghiệm tài chính – ngân hàng và điều hành quản trị: Chiến lược triển khai AI thực chiến, đo lường ROI và giảm thiểu rủi ro cho doanh nghiệp vừa và nhỏ.",
    tags: ["Quản trị doanh nghiệp", "Chiến lược AI", "SME", "Tự động hóa"],
    content: `
      <h3>1. Nút thắt hiệu suất của doanh nghiệp vừa và nhỏ (SME)</h3>
      <p>Doanh nghiệp SME tại Việt Nam luôn đối mặt với bài toán nan giải: Nguồn lực tài chính và nhân sự hạn chế nhưng áp lực cạnh tranh về tốc độ và chi phí ngày càng gay gắt. Nhiều nhà lãnh đạo nhận thức được tiềm năng to lớn của AI nhưng thường rơi vào hai thái cực: hoặc xem AI như trào lưu nhất thời, hoặc đầu tư dàn trải không đo lường được hiệu quả thực tế.</p>
      <p>Với nền tảng nhiều năm giữ các vị trí quản lý thẩm định tín dụng doanh nghiệp tại các ngân hàng lớn (Vietcombank, OCB, GPBank, Techcombank) và Thạc sĩ Quản trị Kinh doanh (MBA), thầy Dương Trung Hiếu tiếp cận AI dưới lăng kính <strong>hiệu quả đầu tư (ROI)</strong> và <strong>tính bền vững của dòng tiền</strong>.</p>

      <div class="article-quote">
        <p>"Doanh nghiệp không cần bắt đầu bằng những hệ thống triệu đô. Hãy bắt đầu từ những quy trình lặp lại tốn thời gian nhất: chăm sóc khách hàng, đối soát chứng từ, phân tích dữ liệu bán hàng. Đó là nơi AI mang lại lợi nhuận ngay từ tháng đầu tiên."</p>
        <small>— Thầy Dương Trung Hiếu</small>
      </div>

      <h3>2. Khung lộ trình 3 giai đoạn triển khai AI cho SME</h3>
      <p>Mô hình được đúc kết qua nhiều chương trình tư vấn thực tế cho doanh nghiệp:</p>
      <ul>
        <li><strong>Giai đoạn 1: Chuẩn hóa quy trình và tri thức số.</strong> Doanh nghiệp gom dữ liệu sản phẩm, chính sách và cẩm nang vận hành vào một kho tri thức chuẩn trước khi cho AI học hỏi.</li>
        <li><strong>Giai đoạn 2: Triển khai Trợ lý AI chuyên trách từng phòng ban.</strong> Xây dựng bot CSKH đa kênh (Zalo, Web), trợ lý hỗ trợ phòng kinh doanh soạn báo giá và trợ lý văn thư tự động hóa văn bản.</li>
        <li><strong>Giai đoạn 3: Đào tạo văn hóa số cho toàn thể nhân sự.</strong> Đưa kỹ năng sử dụng GenAI thành năng lực bắt buộc, khuyến khích nhân viên chủ động ứng dụng AI để tối ưu 30–50% thời gian làm việc mỗi ngày.</li>
      </ul>

      <h3>3. Lời kết</h3>
      <p>Generative AI chính là "đòn bẩy bình đẳng hóa" giúp doanh nghiệp quy mô nhỏ vẫn có thể sở hữu năng lực vận hành chuyên nghiệp tương đương với các tập đoàn lớn nếu biết đi đúng hướng và có lộ trình kiên định.</p>
    `
  },
  {
    id: "hands-on-ai-agent-chatbot",
    title: "Workshop thực hành: Xây dựng Trợ lý AI và Chatbot tự động hóa nghiệp vụ",
    category: "Ứng dụng AI",
    categorySlug: "ung-dung",
    date: "Tháng 09/2026",
    author: "Dương Trung Hiếu",
    authorRole: "Giám đốc Đào tạo Học viện Công nghệ AIUNI",
    readTime: "4 phút đọc",
    thumbnail: "public/images/gallery/event4.svg",
    excerpt: "Đúc kết từ khóa đào tạo thực chiến: Tự tay cấu hình System Prompt, kết nối tài liệu nghiệp vụ và vận hành AI Agent phục vụ công việc hàng ngày.",
    tags: ["AI Agent", "Chatbot", "Prompt Engineering", "Vibe Coding"],
    content: `
      <h3>1. Xu hướng từ Chatbot phản hồi tĩnh sang AI Agent hành động</h3>
      <p>Các thế hệ chatbot cũ dựa trên kịch bản từ khóa cứng nhắc đang nhanh chóng nhường chỗ cho AI Agent – những trợ lý trí tuệ nhân tạo có khả năng hiểu ngữ cảnh sâu sắc, tra cứu tài liệu nghiệp vụ và tự động thực hiện các tác vụ liên hoàn.</p>
      <p>Tại Học viện Công nghệ AIUNI, các khóa huấn luyện thực chiến do thầy Dương Trung Hiếu chủ trì tập trung hướng dẫn học viên không cần giỏi lập trình vẫn có thể tự tay xây dựng trợ lý AI cho riêng mình theo tư duy <em>Vibe Coding</em> và <em>No-Code AI</em>.</p>

      <h3>2. Ba bước làm chủ trợ lý AI thực chiến</h3>
      <ul>
        <li><strong>Bước 1 - Thiết kế chân dung và System Prompt:</strong> Định nghĩa rõ vai trò, phong cách giao tiếp và giới hạn an toàn của trợ lý (Persona & Constraints).</li>
        <li><strong>Bước 2 - Nạp kho tri thức (RAG - Knowledge Base):</strong> Đưa tài liệu PDF, biểu mẫu Excel hoặc tài liệu hướng dẫn công việc vào hệ thống để trợ lý chỉ trả lời dựa trên dữ liệu chuẩn của tổ chức.</li>
        <li><strong>Bước 3 - Kết nối kênh tiếp nhận:</strong> Đưa trợ lý lên Telegram, Zalo hoặc nhúng trực tiếp vào website để tự động phục vụ 24/7.</li>
      </ul>

      <p>Hàng trăm học viên sau khóa học đã ứng dụng thành công để giảm tải công việc thường nhật, khẳng định giá trị thực tiễn của công nghệ khi được tiếp cận đúng phương pháp.</p>
    `
  }
];

// Khởi tạo hiển thị module bài viết
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('articles-grid');
  const filterBtns = document.querySelectorAll('.art-filter-btn');
  const modal = document.getElementById('article-modal');
  const modalClose = document.getElementById('article-modal-close');
  const modalBody = document.getElementById('article-modal-content');

  if (!container) return;

  // Render danh sách thẻ bài viết
  function renderArticles(category = 'all') {
    const filtered = category === 'all' 
      ? ARTICLES_DATABASE 
      : ARTICLES_DATABASE.filter(a => a.categorySlug === category);

    if (filtered.length === 0) {
      container.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 40px; color:#64748b;">Chưa có bài viết trong danh mục này.</div>';
      return;
    }

    container.innerHTML = filtered.map(item => `
      <article class="article-card" data-id="${item.id}">
        <div class="article-card-thumb">
          <img src="${item.thumbnail}" alt="${item.title}" loading="lazy">
          <span class="article-card-category">${item.category}</span>
        </div>
        <div class="article-card-body">
          <div class="article-card-meta">
            <span>📅 ${item.date}</span>
            <span>⏱ ${item.readTime}</span>
          </div>
          <h3 class="article-card-title">${item.title}</h3>
          <p class="article-card-excerpt">${item.excerpt}</p>
          <div class="article-card-footer">
            <span class="article-author-name">✍️ ${item.author}</span>
            <button class="article-read-btn" data-id="${item.id}" aria-label="Đọc bài viết: ${item.title}">Đọc tiếp ↗</button>
          </div>
        </div>
      </article>
    `).join('');

    // Gắn sự kiện click mở bài viết chi tiết
    container.querySelectorAll('.article-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        openArticleModal(id);
      });
    });
  }

  // Lọc theo danh mục
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      renderArticles(cat);
    });
  });

  // Mở modal bài viết toàn văn
  function openArticleModal(id) {
    const article = ARTICLES_DATABASE.find(a => a.id === id);
    if (!article || !modal || !modalBody) return;

    modalBody.innerHTML = `
      <div class="reader-header">
        <div class="reader-category-pill">${article.category}</div>
        <h1 class="reader-title">${article.title}</h1>
        <div class="reader-meta-bar">
          <div class="reader-author-info">
            <strong>${article.author}</strong>
            <small>${article.authorRole}</small>
          </div>
          <div class="reader-date-info">
            <span>📅 ${article.date}</span> · <span>⏱ ${article.readTime}</span>
          </div>
        </div>
      </div>

      <div class="reader-cover-img">
        <img src="${article.thumbnail}" alt="${article.title}">
      </div>

      <div class="reader-content-body">
        ${article.content}
      </div>

      <div class="reader-tags-bar">
        <strong>Thẻ chuyên đề:</strong>
        ${article.tags.map(t => `<span class="reader-tag">#${t}</span>`).join('')}
      </div>

      <div class="reader-footer-box">
        <div class="reader-cta-text">
          <h4>Bạn quan tâm đến các chương trình đào tạo hoặc tư vấn của Thầy Hiếu?</h4>
          <p>Kết nối trực tiếp để cùng trao đổi về giải pháp ứng dụng AI phù hợp với tổ chức của bạn.</p>
        </div>
        <a href="#contact" class="btn sm" onclick="document.getElementById('article-modal').classList.remove('open');">Liên hệ hợp tác ↗</a>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modal.scrollTop = 0;
  }

  // Đóng modal
  function closeArticleModal() {
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeArticleModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeArticleModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeArticleModal();
    }
  });

  // Render khởi đầu
  renderArticles('all');
});
