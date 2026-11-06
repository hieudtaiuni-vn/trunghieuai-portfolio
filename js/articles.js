/**
 * PORTFOLIO DƯƠNG TRUNG HIẾU - ARTICLES & TRAINING ACTIVITIES MODULE
 * Triển khai song song cả 2 phương án:
 * - Phương án 1: Git-based / Markdown / Local Data (Load tức thì 0ms, bảo mật tuyệt đối)
 * - Phương án 3: Cloud CMS (Google Sheets / Docs / Notion Live Sync)
 */

let ACTIVE_ARTICLES = [];

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('articles-grid');
  const filterWrap = document.querySelector('.articles-filters');
  const modal = document.getElementById('article-modal');
  const modalClose = document.getElementById('article-modal-close');
  const modalBody = document.getElementById('article-modal-content');

  if (!container) return;

  // 1. Nạp nguồn Phương án 1: Dữ liệu tĩnh từ Git / Markdown (Load tức thì 0ms)
  if (Array.isArray(window.BUILTIN_ARTICLES) && window.BUILTIN_ARTICLES.length > 0) {
    ACTIVE_ARTICLES = [...window.BUILTIN_ARTICLES];
  } else if (typeof ARTICLES_DATABASE !== 'undefined' && Array.isArray(ARTICLES_DATABASE)) {
    ACTIVE_ARTICLES = [...ARTICLES_DATABASE];
  }

  // Render khởi đầu ngay lập tức
  renderArticles('all');

  // 2. Nạp nguồn Phương án 3: Cloud CMS (Google Sheets Live Sync trong nền)
  const cloudConfig = window.PORTFOLIO_CONFIG?.cloudCms;
  if (cloudConfig?.enabled && cloudConfig?.sheetId) {
    fetchCloudArticles(cloudConfig);
  }

  // Hàm Render danh sách thẻ bài viết
  function renderArticles(categorySlug) {
    let filtered = ACTIVE_ARTICLES;
    if (categorySlug !== 'all') {
      filtered = ACTIVE_ARTICLES.filter(item => item.categorySlug === categorySlug);
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: #fff; border-radius: 16px; border: 1px dashed var(--border);">
          <div style="font-size: 36px; margin-bottom: 12px;">📝</div>
          <h4 style="color: var(--navy); margin-bottom: 6px;">Chưa có bài viết trong chuyên mục này</h4>
          <p style="color: var(--muted); font-size: 13.5px; max-width: 460px; margin: 0 auto;">Các bài viết và tài liệu đào tạo mới đang được cập nhật. Vui lòng chọn chuyên mục khác để theo dõi.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(item => `
      <article class="article-card" data-category="${item.categorySlug}">
        <div class="article-card-thumb">
          <img src="${item.thumbnail}" alt="${item.title}" loading="lazy" onerror="this.src='public/images/gallery/event1.svg'">
          <span class="article-card-category">${item.category}</span>
          ${item.source === 'google-sheets' || item.source === 'cloud' ? '<span class="article-cloud-badge">☁️ Cloud CMS</span>' : ''}
        </div>
        <div class="article-card-body">
          <div class="article-card-meta">
            <span>📅 ${item.date}</span>
            <span>⏱ ${item.readTime || '4 phút đọc'}</span>
          </div>
          <h3 class="article-card-title">${item.title}</h3>
          <p class="article-card-excerpt">${item.excerpt || ''}</p>
          <div class="article-card-footer">
            <span class="article-author-name">Tác giả: <strong>${item.author || 'Dương Trung Hiếu'}</strong></span>
            <button class="article-read-btn" data-id="${item.id}" aria-label="Đọc bài viết: ${item.title}">
              Đọc tiếp <span>→</span>
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Gắn sự kiện click mở modal cho các nút đọc tiếp
    container.querySelectorAll('.article-read-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openArticleModal(id);
      });
    });
  }

  // Lắng nghe sự kiện click trên các nút lọc danh mục
  if (filterWrap) {
    filterWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('.art-filter-btn');
      if (!btn) return;

      filterWrap.querySelectorAll('.art-filter-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.getAttribute('data-filter');
      renderArticles(filter);
    });
  }

  // Mở modal bài viết toàn văn
  function openArticleModal(id) {
    const article = ACTIVE_ARTICLES.find(a => a.id === id);
    if (!article || !modal || !modalBody) return;

    modalBody.innerHTML = `
      <div class="reader-header">
        <div class="reader-category-pill">${article.category}</div>
        <h1 class="reader-title">${article.title}</h1>
        <div class="reader-meta-bar">
          <div class="reader-author-info">
            <strong>${article.author || 'Dương Trung Hiếu'}</strong>
            <small>${article.authorRole || 'Giám đốc Đào tạo Học viện Công nghệ AIUNI'}</small>
          </div>
          <div class="reader-date-info">
            <span>📅 ${article.date}</span> · <span>⏱ ${article.readTime || '4 phút đọc'}</span>
            ${article.source === 'google-sheets' || article.source === 'cloud' ? '· <span style="color:#0284c7;font-weight:600;">☁️ Đồng bộ Cloud CMS</span>' : ''}
          </div>
        </div>
      </div>

      <div class="reader-cover-img">
        <img src="${article.thumbnail}" alt="${article.title}" onerror="this.src='public/images/gallery/event1.svg'">
      </div>

      <div class="reader-content-body">
        ${article.content}
      </div>

      ${Array.isArray(article.tags) && article.tags.length > 0 ? `
        <div class="reader-tags-bar">
          <strong>Thẻ chuyên đề:</strong>
          ${article.tags.map(t => `<span class="reader-tag">#${t}</span>`).join('')}
        </div>
      ` : ''}

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

  // 3. Hàm tải bài viết Phương án 3 (Google Sheets Live Fetch)
  async function fetchCloudArticles(cfg) {
    try {
      const cacheKey = `trunghieuai_cloud_articles_${cfg.sheetId}`;
      const cached = sessionStorage.getItem(cacheKey);

      if (cached) {
        const parsed = JSON.parse(cached);
        mergeAndRefresh(parsed);
        return;
      }

      const url = `https://docs.google.com/spreadsheets/d/${cfg.sheetId}/gviz/tq?tqx=out:json${cfg.sheetName ? '&sheet=' + encodeURIComponent(cfg.sheetName) : ''}`;
      const res = await fetch(url);
      if (!res.ok) return;

      const raw = await res.text();
      const start = raw.indexOf('{');
      const end = raw.lastIndexOf('}');
      if (start === -1 || end === -1) return;

      const data = JSON.parse(raw.slice(start, end + 1));
      const cols = data.table.cols.map(c => (c.label || c.id || '').trim().toLowerCase());
      const rows = data.table.rows;

      const cloudItems = [];
      rows.forEach(row => {
        const rowData = {};
        row.c.forEach((cell, idx) => {
          const colName = cols[idx] || `col_${idx}`;
          rowData[colName] = cell ? (cell.v !== undefined ? cell.v : cell.f || '') : '';
        });

        const title = rowData.title || rowData['tiêu đề'] || rowData['tieu de'];
        if (!title) return;

        cloudItems.push({
          id: (rowData.id || title).toString().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          title: title,
          category: rowData.category || rowData['chuyên mục'] || 'Đào tạo',
          categorySlug: rowData.categoryslug || 'dao-tao',
          date: rowData.date || rowData['ngày'] || new Date().toLocaleDateString('vi-VN'),
          author: rowData.author || rowData['tác giả'] || 'Dương Trung Hiếu',
          authorRole: rowData.authorrole || 'Giám đốc Đào tạo Học viện Công nghệ AIUNI',
          readTime: rowData.readtime || '4 phút đọc',
          thumbnail: rowData.thumbnail || rowData['ảnh'] || 'public/images/gallery/event1.svg',
          excerpt: rowData.excerpt || rowData['tóm tắt'] || '',
          tags: (rowData.tags || rowData['thẻ'] || '').toString().split(/[,;]/).map(t => t.trim()).filter(Boolean),
          source: 'cloud',
          content: rowData.content || rowData['nội dung'] || `<p>${rowData.excerpt || ''}</p>`
        });
      });

      if (cloudItems.length > 0) {
        sessionStorage.setItem(cacheKey, JSON.stringify(cloudItems));
        mergeAndRefresh(cloudItems);
      }
    } catch (err) {
      console.warn('Không thể đồng bộ bài viết từ Cloud CMS:', err);
    }
  }

  function mergeAndRefresh(newItems) {
    const existingIds = new Set(ACTIVE_ARTICLES.map(a => a.id));
    const toPrepend = newItems.filter(item => !existingIds.has(item.id));
    if (toPrepend.length > 0) {
      ACTIVE_ARTICLES = [...toPrepend, ...ACTIVE_ARTICLES];
      const activeFilter = document.querySelector('.art-filter-btn.active')?.getAttribute('data-filter') || 'all';
      renderArticles(activeFilter);
    }
  }
});
