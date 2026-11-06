/**
 * Build Articles Script - Phương án 1 (Git-based / Markdown)
 * Tự động chuyển đổi các file Markdown trong thư mục posts/ thành JSON & JS Data.
 * Chạy: node scripts/build-articles.js
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', 'posts');
const OUTPUT_JSON = path.join(__dirname, '..', 'public', 'data', 'articles.json');
const OUTPUT_JS = path.join(__dirname, '..', 'js', 'articles-data.js');

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: content };
  }

  const rawMeta = match[1];
  const body = match[2];
  const data = {};

  rawMeta.split(/\r?\n/).forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();

    // Check if array [a, b, c]
    if (val.startsWith('[') && val.endsWith(']')) {
      const items = val.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
      data[key] = items;
    } else {
      // Remove enclosing quotes
      val = val.replace(/^['"]|['"]$/g, '');
      data[key] = val;
    }
  });

  return { data, body };
}

function markdownToHtml(md) {
  const lines = md.split(/\r?\n/);
  let html = [];
  let inList = false;
  let inQuote = false;
  let quoteLines = [];

  function flushQuote() {
    if (inQuote) {
      const quoteText = quoteLines.join(' ');
      // Detect author if line starts with — or -
      const parts = quoteText.split(/(?:—|-)\s+/);
      if (parts.length > 1) {
        html.push(`<div class="article-quote"><p>${parts[0].trim()}</p><small>— ${parts.slice(1).join('—').trim()}</small></div>`);
      } else {
        html.push(`<div class="article-quote"><p>${quoteText}</p></div>`);
      }
      quoteLines = [];
      inQuote = false;
    }
  }

  function flushList() {
    if (inList) {
      html.push('</ul>');
      inList = false;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // Empty line
    if (!line) {
      flushQuote();
      flushList();
      continue;
    }

    // Blockquote
    if (line.startsWith('>')) {
      flushList();
      inQuote = true;
      quoteLines.push(line.replace(/^>\s*/, ''));
      continue;
    } else {
      flushQuote();
    }

    // Heading 3
    if (line.startsWith('### ')) {
      flushList();
      html.push(`<h3>${formatInline(line.slice(4))}</h3>`);
      continue;
    }

    // Heading 2
    if (line.startsWith('## ')) {
      flushList();
      html.push(`<h2>${formatInline(line.slice(3))}</h2>`);
      continue;
    }

    // List item
    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList) {
        html.push('<ul>');
        inList = true;
      }
      html.push(`  <li>${formatInline(line.slice(2))}</li>`);
      continue;
    } else {
      flushList();
    }

    // Regular paragraph
    html.push(`<p>${formatInline(line)}</p>`);
  }

  flushQuote();
  flushList();

  return html.join('\n');
}

function formatInline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

function buildArticles() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error('Directory not found:', POSTS_DIR);
    return;
  }

  const files = fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md') && !f.startsWith('_'));

  const articles = [];

  files.forEach(file => {
    const fullPath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(fullPath, 'utf-8');
    const { data, body } = parseFrontmatter(content);

    const article = {
      id: data.id || file.replace(/\.md$/, ''),
      title: data.title || 'Bài viết chưa có tiêu đề',
      category: data.category || 'Hoạt động đào tạo',
      categorySlug: data.categorySlug || 'dao-tao',
      date: data.date || new Date().toLocaleDateString('vi-VN'),
      author: data.author || 'Dương Trung Hiếu',
      authorRole: data.authorRole || 'Giám đốc Đào tạo Học viện Công nghệ AIUNI',
      readTime: data.readTime || '4 phút đọc',
      thumbnail: data.thumbnail || 'public/images/gallery/event1.svg',
      excerpt: data.excerpt || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      source: 'local-git', // Phân loại nguồn bài viết: local Git Markdown
      content: markdownToHtml(body)
    };

    articles.push(article);
  });

  // Sort by date (mới nhất lên đầu)
  articles.sort((a, b) => {
    const parseDate = (dStr) => {
      const parts = dStr.split('/');
      if (parts.length === 3) return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime();
      return 0;
    };
    return parseDate(b.date) - parseDate(a.date);
  });

  // Ensure output dirs exist
  fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true });
  fs.mkdirSync(path.dirname(OUTPUT_JS), { recursive: true });

  // Write JSON
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(articles, null, 2), 'utf-8');
  console.log(`✅ [Phương án 1] Đã xuất bản ${articles.length} bài viết ra ${OUTPUT_JSON}`);

  // Write JS File for zero-delay offline loading
  const jsContent = `/**
 * TỰ ĐỘNG SINH BỞI scripts/build-articles.js
 * Thời gian: ${new Date().toISOString()}
 * Nguồn: Các file Markdown trong thư mục posts/
 */
window.BUILTIN_ARTICLES = ${JSON.stringify(articles, null, 2)};
`;
  fs.writeFileSync(OUTPUT_JS, jsContent, 'utf-8');
  console.log(`✅ [Phương án 1] Đã tạo file nạp nhanh ${OUTPUT_JS}`);
}

buildArticles();
