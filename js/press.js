/**
 * PORTFOLIO DƯƠNG TRUNG HIẾU - PRESS & MEDIA HIGHLIGHTS MODULE
 * Quản lý hiển thị, tìm kiếm và lọc danh mục 37+ bài viết báo chí & đối tác nói về AIUNI.
 */

document.addEventListener('DOMContentLoaded', () => {
  const pressGrid = document.getElementById('press-grid');
  const searchInput = document.getElementById('press-search-input');
  const filterButtons = document.querySelectorAll('.press-filter-btn');
  const loadMoreBtn = document.getElementById('press-load-more');
  const countBadge = document.getElementById('press-count-badge');

  if (!pressGrid) return;

  const ALL_ITEMS = Array.isArray(window.PRESS_DATA) ? window.PRESS_DATA : [];
  let currentFilter = 'all';
  let searchQuery = '';
  let itemsPerPage = 8;
  let visibleCount = itemsPerPage;

  function filterItems() {
    return ALL_ITEMS.filter(item => {
      // Filter by category or type
      let matchesFilter = true;
      if (currentFilter === 'gov') {
        matchesFilter = item.type === 'gov';
      } else if (currentFilter === 'press') {
        matchesFilter = item.type === 'press';
      } else if (currentFilter !== 'all') {
        matchesFilter = item.categorySlug === currentFilter;
      }

      // Filter by search query
      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        matchesSearch =
          (item.title && item.title.toLowerCase().includes(q)) ||
          (item.sourceName && item.sourceName.toLowerCase().includes(q)) ||
          (item.category && item.category.toLowerCase().includes(q)) ||
          (item.summary && item.summary.toLowerCase().includes(q));
      }

      return matchesFilter && matchesSearch;
    });
  }

  function renderPress() {
    const filtered = filterItems();
    const toShow = filtered.slice(0, visibleCount);

    if (countBadge) {
      countBadge.textContent = `${filtered.length} bài viết`;
    }

    if (filtered.length === 0) {
      pressGrid.innerHTML = `
        <div class="press-empty-state">
          <div style="font-size: 38px; margin-bottom: 8px;">🔍</div>
          <h4 style="color: var(--navy); margin-bottom: 6px;">Không tìm thấy bài viết phù hợp</h4>
          <p style="color: var(--muted); font-size: 13.5px;">Thử nhập từ khóa khác (ví dụ: Nhân Dân, Cát Hải, VietNamNet, Kiến An, Lào Cai...)</p>
        </div>
      `;
      if (loadMoreBtn) loadMoreBtn.style.display = 'none';
      return;
    }

    pressGrid.innerHTML = toShow.map(item => `
      <article class="press-card reveal-item" data-type="${item.type}">
        <div class="press-card-header">
          <span class="press-badge-tag">${item.badge || 'Báo chí'}</span>
          <span class="press-category-pill">${item.category}</span>
        </div>
        <div class="press-source-name">
          <span class="press-source-icon">${item.type === 'gov' ? '🏛️' : '📰'}</span>
          <strong>${item.sourceName}</strong>
        </div>
        <h3 class="press-card-title">
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" title="${item.title}">
            ${item.title}
          </a>
        </h3>
        <p class="press-card-summary">${item.summary || ''}</p>
        <div class="press-card-footer">
          <span class="press-source-verify">✓ Nguồn chính thức</span>
          <a class="press-read-link" href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="Xem bài viết: ${item.title}">
            Xem bài viết gốc <span class="arrow">↗</span>
          </a>
        </div>
      </article>
    `).join('');

    // Update Load More Button
    if (loadMoreBtn) {
      if (visibleCount < filtered.length) {
        loadMoreBtn.style.display = 'inline-flex';
        loadMoreBtn.innerHTML = `Xem thêm bài viết (${filtered.length - visibleCount} bài còn lại) <span style="margin-left: 6px;">↓</span>`;
      } else {
        loadMoreBtn.style.display = 'none';
      }
    }
  }

  // Event Listeners for Filters
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      visibleCount = itemsPerPage;
      renderPress();
    });
  });

  // Event Listener for Search
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      visibleCount = itemsPerPage;
      renderPress();
    });
  }

  // Event Listener for Load More
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleCount += itemsPerPage;
      renderPress();
    });
  }

  // Initial Render
  renderPress();
});
