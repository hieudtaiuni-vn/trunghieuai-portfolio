/**
 * PORTFOLIO DƯƠNG TRUNG HIẾU - ARTICLES & TRAINING ACTIVITIES MODULE
 * Triển khai song song cả 2 phương án:
 * - Phương án 1: Git-based / Markdown / Local Data (Load tức thì 0ms, bảo mật tuyệt đối)
 * - Phương án 3: Cloud CMS (Google Sheets Live Sync - Tự động cập nhật / thêm / sửa / XÓA)
 */

let ACTIVE_ARTICLES = [];
let currentCategory = 'all';
let articlesVisibleCount = 6;
const ARTICLES_PAGE_SIZE = 6;

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('articles-grid');
  const filterWrap = document.querySelector('.articles-filters');
  const loadMoreBtn = document.getElementById('articles-load-more');
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

  // 2. Nạp nguồn Phương án 3: Cloud CMS (Google Sheets Live Fetch trong nền)
  const cloudConfig = window.PORTFOLIO_CONFIG?.cloudCms;
  if (cloudConfig?.enabled && cloudConfig?.sheetId) {
    fetchCloudArticles(cloudConfig);
  }

  // Hàm Render danh sách thẻ bài viết
  function renderArticles(categorySlug) {
    currentCategory = categorySlug;
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
      if (loadMoreBtn) loadMoreBtn.style.display = 'none';
      return;
    }

    const toShow = filtered.slice(0, articlesVisibleCount);

    container.innerHTML = toShow.map(item => `
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

    // Update Load More Button
    if (loadMoreBtn) {
      if (articlesVisibleCount < filtered.length) {
        loadMoreBtn.style.display = 'inline-flex';
        loadMoreBtn.innerHTML = `Xem thêm bài viết (${filtered.length - articlesVisibleCount} bài còn lại) <span style="margin-left:6px;">↓</span>`;
      } else {
        loadMoreBtn.style.display = 'none';
      }
    }

    // Gắn sự kiện click mở modal cho các nút đọc tiếp
    container.querySelectorAll('.article-read-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openArticleModal(id);
      });
    });
  }

  // Lắng nghe sự kiện click trên nút Tải thêm bài viết
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      articlesVisibleCount += ARTICLES_PAGE_SIZE;
      renderArticles(currentCategory);
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
      articlesVisibleCount = ARTICLES_PAGE_SIZE;
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
  }

  // Đóng modal
  function closeArticleModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeArticleModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeArticleModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) {
      closeArticleModal();
    }
  });

  // PHƯƠNG ÁN 3: Nạp dữ liệu tự động từ Cloud CMS (Google Sheets)
  async function fetchCloudArticles(cfg) {
    try {
      const sheetName = encodeURIComponent(cfg.sheetName || 'Articles');
      const url = `https://docs.google.com/spreadsheets/d/${cfg.sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
      
      const response = await fetch(url);
      if (!response.ok) return;

      const csvText = await response.text();
      const rows = parseCSV(csvText);

      if (rows.length < 2) return;

      const headers = rows[0].map(h => h.trim().toLowerCase());
      const cloudArticles = [];

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.length === 0 || !row[0]) continue;

        const entry = {};
        headers.forEach((h, idx) => {
          entry[h] = row[idx] ? row[idx].trim() : '';
        });

        // Bỏ qua nếu status không phải published hoặc active
        if (entry.status && entry.status.toLowerCase() !== 'published' && entry.status.toLowerCase() !== 'active') {
          continue;
        }

        if (entry.title) {
          cloudArticles.push({
            id: entry.id || `cloud-${i}`,
            title: entry.title,
            category: entry.category || 'Đào tạo',
            categorySlug: entry.categoryslug || 'dao-tao',
            date: entry.date || new Date().toLocaleDateString('vi-VN'),
            author: entry.author || 'Dương Trung Hiếu',
            authorRole: entry.authorrole || 'Giám đốc Đào tạo Học viện Công nghệ AIUNI',
            readTime: entry.readtime || '4 phút đọc',
            thumbnail: entry.thumbnail || 'public/images/gallery/event1.svg',
            excerpt: entry.excerpt || '',
            tags: entry.tags ? entry.tags.split(',').map(t => t.trim()) : [],
            source: 'google-sheets',
            content: entry.content || `<p>${entry.excerpt || ''}</p>`
          });
        }
      }

      if (cloudArticles.length > 0) {
        ACTIVE_ARTICLES = [...cloudArticles];
        renderArticles(currentCategory);
        console.log(`[Cloud CMS] Đã đồng bộ thành công ${cloudArticles.length} bài viết.`);
      }
    } catch (err) {
      console.warn('[Cloud CMS] Giữ dữ liệu tĩnh dự phòng:', err);
    }
  }

  // Helper hàm tách dòng CSV chuẩn
  function parseCSV(text) {
    const lines = [];
    let row = [];
    let inQuotes = false;
    let current = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const next = text[i + 1];

      if (char === '"') {
        if (inQuotes && next === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push(current);
        current = '';
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (char === '\r' && next === '\n') i++;
        row.push(current);
        lines.push(row);
        row = [];
        current = '';
      } else {
        current += char;
      }
    }

    if (row.length > 0 || current) {
      row.push(current);
      lines.push(row);
    }

    return lines;
  }
});
