/**
 * PORTFOLIO CONFIGURATION - DƯƠNG TRUNG HIẾU
 * Cấu hình kết nối Cloud CMS (Phương án 3: Google Sheets / Docs / Notion)
 */
window.PORTFOLIO_CONFIG = {
  // Phương án 3: Tự động đồng bộ bài viết từ Google Sheets trực tiếp trên trình duyệt
  cloudCms: {
    enabled: false, // Đổi thành true khi Thầy Hiếu muốn kết nối bảng Google Sheet bài viết
    provider: 'google-sheets',
    sheetId: '', // Nhập ID bảng tính Google Sheet tại đây
    sheetName: '', // Để trống sẽ lấy trang tính đầu tiên
    autoMergeWithGit: true // Tự động gộp bài từ Cloud với bài viết Markdown trên Git
  }
};
