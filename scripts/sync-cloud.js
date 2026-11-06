/**
 * Cloud Sync Script - Phương án 3 (Notion / Google Docs / Google Sheets CMS)
 * Kéo dữ liệu bài viết từ Cloud về tạo thành các file Markdown trong posts/
 * Chạy: node scripts/sync-cloud.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const CONFIG_PATH = path.join(__dirname, '..', 'cloud-config.json');
const POSTS_DIR = path.join(__dirname, '..', 'posts');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 Portfolio-Sync-Bot' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchUrl(res.headers.location));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP status ${res.statusCode} from ${url}`));
      }
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => resolve(raw));
    }).on('error', reject);
  });
}

async function syncGoogleSheets(sheetId, sheetName) {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json${sheetName ? '&sheet=' + encodeURIComponent(sheetName) : ''}`;
  console.log(`🌐 Đang kết nối Google Sheets: ${sheetId}...`);

  const responseText = await fetchUrl(url);

  // Google gviz response format is: /*O_o*/ google.visualization.Query.setResponse({...});
  const jsonStart = responseText.indexOf('{');
  const jsonEnd = responseText.lastIndexOf('}');
  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error('Dữ liệu trả về từ Google Sheets không đúng định dạng');
  }

  const jsonStr = responseText.slice(jsonStart, jsonEnd + 1);
  const data = JSON.parse(jsonStr);

  const cols = data.table.cols.map(c => (c.label || c.id || '').trim().toLowerCase());
  const rows = data.table.rows;

  console.log(`📊 Tìm thấy ${rows.length} dòng dữ liệu trên Google Sheets`);
  let count = 0;

  for (const row of rows) {
    const rowData = {};
    row.c.forEach((cell, idx) => {
      const colName = cols[idx] || `col_${idx}`;
      rowData[colName] = cell ? (cell.v !== undefined ? cell.v : cell.f || '') : '';
    });

    const title = rowData.title || rowData['tiêu đề'] || rowData['tieu de'];
    if (!title) continue;

    const id = (rowData.id || title.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')).trim();

    const category = rowData.category || rowData['chuyên mục'] || 'Đào tạo';
    const categorySlug = rowData.categoryslug || 'dao-tao';
    const date = rowData.date || rowData['ngày'] || new Date().toLocaleDateString('vi-VN');
    const author = rowData.author || rowData['tác giả'] || 'Dương Trung Hiếu';
    const authorRole = rowData.authorrole || 'Giám đốc Đào tạo Học viện Công nghệ AIUNI';
    const readTime = rowData.readtime || '4 phút đọc';
    const thumbnail = rowData.thumbnail || rowData['ảnh'] || 'public/images/gallery/event1.svg';
    const excerpt = rowData.excerpt || rowData['tóm tắt'] || '';
    const tags = (rowData.tags || rowData['thẻ'] || 'AI, Đào tạo').toString().split(/[,;]/).map(t => t.trim());
    const content = rowData.content || rowData['nội dung'] || '';

    const mdContent = `---
id: ${id}
title: "${title.replace(/"/g, '\\"')}"
category: "${category}"
categorySlug: "${categorySlug}"
date: "${date}"
author: "${author}"
authorRole: "${authorRole}"
readTime: "${readTime}"
thumbnail: "${thumbnail}"
tags: [${tags.map(t => `"${t}"`).join(', ')}]
excerpt: "${excerpt.replace(/"/g, '\\"')}"
source: "google-sheets"
---

${content}
`;

    const filePath = path.join(POSTS_DIR, `${id}.md`);
    fs.writeFileSync(filePath, mdContent, 'utf-8');
    console.log(`  ➕ Đã đồng bộ bài viết: [${id}] ${title}`);
    count++;
  }

  return count;
}

async function run() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error('Không tìm thấy file cấu hình cloud-config.json');
    return;
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));

  if (!config.enabled) {
    console.log('ℹ️ Phương án 3 (Cloud Sync) hiện đang ở chế độ chờ kích hoạt trong cloud-config.json.');
    console.log('👉 Bạn có thể mở cloud-config.json và đặt "enabled": true kèm ID Google Sheet để tự động đồng bộ.');
    return;
  }

  try {
    let synced = 0;
    if (config.provider === 'google-sheets' && config.googleSheets?.sheetId) {
      synced = await syncGoogleSheets(config.googleSheets.sheetId, config.googleSheets.sheetName);
    } else if (config.provider === 'notion' && config.notion?.apiUrl) {
      console.log(`🌐 Đang kết nối Notion API...`);
      // Notion sync implementation
    }

    console.log(`\n🎉 Đã đồng bộ thành công ${synced} bài viết từ Cloud về thư mục posts/!`);
    console.log('Đang chạy build-articles để cập nhật dữ liệu trang web...');
    require('./build-articles');
  } catch (err) {
    console.error('❌ Lỗi khi đồng bộ từ Cloud:', err.message);
  }
}

run();
